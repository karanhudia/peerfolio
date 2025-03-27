"use server";

import { prisma } from "@/lib/db";
import { reviewSchema, reportSchema } from "@/lib/validations";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { normalizeLinkedInUrl, isSelfReview } from "@/lib/linkedin-utils";

export async function createReview(values: z.infer<typeof reviewSchema>) {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return { error: "You must be logged in to submit a review." };
  }
  
  const validatedFields = reviewSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input." };
  }
  
  const { linkedinUrl: rawUrl, personName, personTitle, isAnonymous, relationship, rating, content, tags } = validatedFields.data;
  
  // Normalize LinkedIn URL
  const linkedinUrl = normalizeLinkedInUrl(rawUrl) || rawUrl;
  
  try {
    // Check if user is trying to review themselves using the utility function
    const selfReviewCheck = await isSelfReview(session.user.id, linkedinUrl);
    if (selfReviewCheck.isSelf) {
      return { error: selfReviewCheck.error };
    }
    
    // Check if the person already exists in our database
    let person = await prisma.person.findUnique({
      where: {
        linkedinUrl,
      },
    });
    
    // If not, create a new person record with the provided name or generated info
    if (!person) {
      // Use provided name and title
      let name = personName;
      let title = personTitle || undefined;
      
      person = await prisma.person.create({
        data: {
          linkedinUrl,
          name,
          title,
        },
      });
    }
    // If person exists but doesn't have a name and personName is provided, update it
    else if (!person.name && personName) {
      const updateData: any = { name: personName };
      
      // If person doesn't have a title and personTitle is provided, update that too
      if (!person.title && personTitle) {
        updateData.title = personTitle;
      }
      
      person = await prisma.person.update({
        where: { id: person.id },
        data: updateData
      });
    }
    // If person exists, has a name, but no title and personTitle is provided, update the title
    else if (person.name && !person.title && personTitle) {
      person = await prisma.person.update({
        where: { id: person.id },
        data: { title: personTitle }
      });
    }

    // Check if the user has already reviewed this person
    const existingReview = await prisma.review.findFirst({
      where: {
        authorId: session.user.id,
        personId: person.id,
      },
    });

    if (existingReview) {
      return { 
        error: "You have already reviewed this person. You can edit your existing review instead.",
        existingReviewId: existingReview.id 
      };
    }
    
    // Create the review
    const review = await prisma.review.create({
      data: {
        rating,
        content,
        relationship,
        isAnonymous,
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

export async function updateReview(reviewId: string, values: z.infer<typeof reviewSchema>) {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return { error: "You must be logged in to update a review." };
  }
  
  try {
    // Verify that the review belongs to the current user
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { person: true }
    });
    
    if (!review) {
      return { error: "Review not found." };
    }
    
    if (review.authorId !== session.user.id) {
      return { error: "You can only edit your own reviews." };
    }
    
    const validatedFields = reviewSchema.safeParse(values);
    
    if (!validatedFields.success) {
      return { error: "Invalid fields. Please check your input." };
    }
    
    const { linkedinUrl: rawUrl, isAnonymous, relationship, rating, content, tags } = validatedFields.data;
    
    // Normalize the LinkedIn URL
    const linkedinUrl = normalizeLinkedInUrl(rawUrl) || rawUrl;
    
    // Check if user is trying to review themselves using the utility function
    const selfReviewCheck = await isSelfReview(session.user.id, linkedinUrl);
    if (selfReviewCheck.isSelf) {
      return { error: selfReviewCheck.error };
    }
    
    // Ensure the LinkedIn URL hasn't changed
    if (linkedinUrl !== review.person.linkedinUrl) {
      return { error: "You cannot change the LinkedIn URL when updating a review." };
    }
    
    // Update the review
    await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating,
        content,
        relationship,
        isAnonymous,
        updatedAt: new Date(),
      },
    });
    
    // Update tags
    if (tags) {
      // First, disconnect all existing tags
      await prisma.review.update({
        where: { id: reviewId },
        data: {
          tags: {
            set: [], // Clear all existing connections
          },
        },
      });
      
      // Then add the new tags
      for (const tagName of tags) {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
        });
        
        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName },
          });
        }
        
        await prisma.review.update({
          where: { id: reviewId },
          data: {
            tags: {
              connect: { id: tag.id },
            },
          },
        });
      }
    }
    
    revalidatePath(`/person/${review.person.id}`);
    return { success: "Review updated successfully!" };
  } catch (error) {
    console.error("Error updating review:", error);
    return { error: "Error updating review. Please try again later." };
  }
}

export async function getUserReviewForPerson(personId: string) {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return null;
  }
  
  try {
    return await prisma.review.findFirst({
      where: {
        authorId: session.user.id,
        personId: personId,
      },
      include: {
        tags: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user review:", error);
    return null;
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
    
    // If person exists, just return them with the id field
    if (person) {
      return person;
    }
    
    // If person doesn't exist in the database, return object without id
    return {
      linkedinUrl: normalizedUrl,
      reviews: [],
    };
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