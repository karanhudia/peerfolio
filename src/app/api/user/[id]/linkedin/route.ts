import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object as it's now a Promise in Next.js 15
    const { id } = await context.params;
    
    // Get the current session
    const session = await getSession();

    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to access this endpoint." },
        { status: 401 }
      );
    }

    // Only allow users to fetch their own LinkedIn URL for security
    if (session.user.id !== id) {
      return NextResponse.json(
        { error: "You can only access your own user data." },
        { status: 403 }
      );
    }

    // Get the user's LinkedIn URL from the database
    const user = await prisma.user.findUnique({
      where: { id },
      select: { linkedinUrl: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user's LinkedIn URL
    return NextResponse.json({ linkedinUrl: user.linkedinUrl });
  } catch (error) {
    console.error("Error fetching user LinkedIn URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch user LinkedIn URL" },
      { status: 500 }
    );
  }
} 