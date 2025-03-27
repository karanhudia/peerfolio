import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    console.log('Debug - LinkedIn URL API - Requested user ID:', id);
    
    // Get the current session
    const session = await getSession();
    console.log('Debug - LinkedIn URL API - Session:', {
      exists: !!session,
      userId: session?.user?.id
    });

    // Check if user is authenticated
    if (!session?.user?.id) {
      console.log('Debug - LinkedIn URL API - No session found');
      return NextResponse.json(
        { error: "You must be logged in to access this endpoint." },
        { status: 401 }
      );
    }

    // Only allow users to fetch their own LinkedIn URL for security
    if (session.user.id !== id) {
      console.log('Debug - LinkedIn URL API - User ID mismatch', {
        sessionUserId: session.user.id,
        requestedId: id
      });
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
    console.log('Debug - LinkedIn URL API - User from database:', user);

    if (!user) {
      console.log('Debug - LinkedIn URL API - User not found');
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user's LinkedIn URL
    console.log('Debug - LinkedIn URL API - Returning LinkedIn URL:', user.linkedinUrl);
    return NextResponse.json({ linkedinUrl: user.linkedinUrl });
  } catch (error) {
    console.error("Error fetching user LinkedIn URL:", error);
    if (error instanceof Error) {
      console.error('Debug - LinkedIn URL API - Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch user LinkedIn URL" },
      { status: 500 }
    );
  }
} 