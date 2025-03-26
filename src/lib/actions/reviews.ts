"use server";

import { prisma } from "@/lib/prisma";
import { reviewSchema, reportSchema } from "@/lib/validations";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { normalizeLinkedInUrl, generateProfileInfoFromUrl } from "@/lib/linkedin-utils";

export async function createReview(values: z.infer<typeof reviewSchema>) {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return { error: "You must be logged in to submit a review." };
  }
  
  const validatedFields = reviewSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input." };
  }
  
  const { linkedinUrl: rawUrl, relationship, rating, content, interactionDate, tags } = validatedFields.data;
  
  // Normalize LinkedIn URL
  const linkedinUrl = normalizeLinkedInUrl(rawUrl) || rawUrl;
  
  try {
    // Check if the person already exists in our database
    let person = await prisma.person.findUnique({
      where: {
        linkedinUrl,
      },
    });
    
    // If not, create a new person record with generated info
    if (!person) {
      const profileInfo = generateProfileInfoFromUrl(linkedinUrl);
      
      person = await prisma.person.create({
        data: {
          linkedinUrl,
          name: profileInfo?.name,
          title: profileInfo?.title,
        },
      });
    }
    
    // Create the review
    const review = await prisma.review.create({
      data: {
        rating,
        content,
        relationship,
        interactionDate,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        person: {
          connect: {
            id: person.id,
          },
        },
        // Auto-approve for MVP, but in production would be moderated
        isApproved: true,
      },
    });
    
    // Add tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Find or create tag
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
        });
        
        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName },
          });
        }
        
        // Connect the tag to the review
        await prisma.review.update({
          where: { id: review.id },
          data: {
            tags: {
              connect: { id: tag.id },
            },
          },
        });
      }
    }
    
    revalidatePath(`/person/${person.id}`);
    return { success: "Review submitted successfully!" };
  } catch (error) {
    console.error("Error creating review:", error);
    return { error: "Error submitting review. Please try again later." };
  }
}

export async function getPersonByLinkedInUrl(linkedinUrl: string) {
  try {
    // Normalize the LinkedIn URL
    const normalizedUrl = normalizeLinkedInUrl(linkedinUrl) || linkedinUrl;
    
    // Try to find the person in the database
    let person = await prisma.person.findUnique({
      where: { linkedinUrl: normalizedUrl },
      include: {
        reviews: {
          where: { isApproved: true },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            tags: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    
    // If person exists but doesn't have a name or title, try to generate it from the URL
    if (person && (!person.name || !person.title)) {
      const profileInfo = generateProfileInfoFromUrl(normalizedUrl);
      
      if (profileInfo) {
        // Update the person with the generated information
        person = await prisma.person.update({
          where: { id: person.id },
          data: {
            name: person.name || profileInfo.name,
            title: person.title || profileInfo.title,
          },
          include: {
            reviews: {
              where: { isApproved: true },
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                tags: true,
              },
              orderBy: { createdAt: "desc" },
            },
          },
        });
      }
    }
    
    // If person doesn't exist in the database, return generated profile info
    if (!person) {
      const profileInfo = generateProfileInfoFromUrl(normalizedUrl);
      
      if (profileInfo) {
        return {
          linkedinUrl: normalizedUrl,
          name: profileInfo.name,
          title: profileInfo.title,
          reviews: [],
        };
      }
    }
    
    return person;
  } catch (error) {
    console.error("Error fetching person:", error);
    return null;
  }
}

export async function getPersonById(id: string) {
  try {
    return await prisma.person.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { isApproved: true },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            tags: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching person:", error);
    return null;
  }
}

export async function searchPeople(query: string) {
  if (!query || query.length < 2) return [];
  
  try {
    return await prisma.person.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { title: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
      take: 10,
    });
  } catch (error) {
    console.error("Error searching people:", error);
    return [];
  }
}

export async function reportReview(values: z.infer<typeof reportSchema>) {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return { error: "You must be logged in to report a review." };
  }
  
  const validatedFields = reportSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input." };
  }
  
  const { reason, reviewId } = validatedFields.data;
  
  try {
    await prisma.report.create({
      data: {
        reason,
        reporter: {
          connect: {
            id: session.user.id,
          },
        },
        review: {
          connect: {
            id: reviewId,
          },
        },
      },
    });
    
    return { success: "Review reported successfully. Our team will review it." };
  } catch (error) {
    console.error("Error reporting review:", error);
    return { error: "Error reporting review. Please try again later." };
  }
} 