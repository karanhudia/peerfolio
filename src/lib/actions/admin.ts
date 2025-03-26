"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

// Get all pending reviews that need approval
export async function getPendingReviews() {
  const session = await getSession();
  
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access." };
  }
  
  try {
    const pendingReviews = await prisma.review.findMany({
      where: { isApproved: false },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        person: true,
      },
      orderBy: { createdAt: "asc" },
    });
    
    return pendingReviews;
  } catch (error) {
    console.error("Error fetching pending reviews:", error);
    return { error: "Error fetching pending reviews." };
  }
}

// Get all reports that need to be reviewed
export async function getReports() {
  const session = await getSession();
  
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access." };
  }
  
  try {
    const reports = await prisma.report.findMany({
      where: { resolved: false },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        review: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            person: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });
    
    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return { error: "Error fetching reports." };
  }
}

// Approve or reject a review
export async function moderateReview(reviewId: string, approve: boolean) {
  const session = await getSession();
  
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access." };
  }
  
  try {
    if (approve) {
      await prisma.review.update({
        where: { id: reviewId },
        data: { isApproved: true },
      });
    } else {
      await prisma.review.delete({
        where: { id: reviewId },
      });
    }
    
    revalidatePath("/admin/reviews");
    return { success: approve ? "Review approved successfully." : "Review rejected successfully." };
  } catch (error) {
    console.error("Error moderating review:", error);
    return { error: "Error processing review moderation." };
  }
}

// Resolve a report
export async function resolveReport(reportId: string, removeReview: boolean) {
  const session = await getSession();
  
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Unauthorized access." };
  }
  
  try {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      select: { reviewId: true },
    });
    
    if (!report) {
      return { error: "Report not found." };
    }
    
    if (removeReview) {
      await prisma.review.delete({
        where: { id: report.reviewId },
      });
    }
    
    await prisma.report.update({
      where: { id: reportId },
      data: { resolved: true },
    });
    
    revalidatePath("/admin/reports");
    return { 
      success: removeReview 
        ? "Report resolved and review removed successfully." 
        : "Report marked as resolved."
    };
  } catch (error) {
    console.error("Error resolving report:", error);
    return { error: "Error processing report resolution." };
  }
} 