/**
 * LinkedIn URL utilities for standardizing and extracting information from LinkedIn profile URLs
 */

/**
 * Normalizes different formats of LinkedIn URLs to a standard format
 * Handles various LinkedIn URL formats and returns a standardized version
 *
 * @param url LinkedIn URL in any format
 * @returns Standardized LinkedIn URL or null if invalid
 */
export function normalizeLinkedInUrl(url: string): string | null {
  if (!url) return null;

  try {
    // Extract the username part after /in/
    const match = url.match(/linkedin\.com\/in\/([^\/\?#]+)/i);
    if (!match) return null;

    const username = match[1].toLowerCase();
    return `https://linkedin.com/in/${username}`;
  } catch (error) {
    return null;
  }
}

/**
 * Extracts the username portion from a LinkedIn URL
 *
 * @param url LinkedIn URL
 * @returns Username portion of the URL or null if invalid
 */
export function extractLinkedInUsername(url: string): string | null {
  if (!url) return null;

  const normalizedUrl = normalizeLinkedInUrl(url);
  if (!normalizedUrl) return null;

  // Extract username from normalized URL
  const parts = normalizedUrl.split('/');
  // The username should be at the 5th position (0-indexed) after splitting by '/'
  // https:/, www.linkedin.com, in, username, ''
  if (parts.length >= 5) {
    return parts[4];
  }

  return null;
}

/**
 * Validates if a string is a valid LinkedIn profile URL
 *
 * @param url String to validate
 * @returns Boolean indicating if the string is a valid LinkedIn URL
 */
export function isValidLinkedInUrl(url: string): boolean {
  return normalizeLinkedInUrl(url) !== null;
}

/**
 * Generate a name from a LinkedIn username
 * This is a mock function since we can't actually scrape LinkedIn
 * In a real application, this would use LinkedIn's API or another method
 *
 * @param url LinkedIn URL
 * @returns Object with name and title, or null if invalid URL
 */
export function generateProfileInfoFromUrl(url: string): { name: string; title: string } | null {
  const username = extractLinkedInUsername(url);
  if (!username) return null;

  // Convert username to a proper name
  // For example, "john-doe" becomes "John Doe"
  const nameParts = username.split(/[-_]/);
  const formattedName = nameParts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  // Generate a mock title based on the username
  const possibleTitles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'Marketing Manager',
    'Project Manager',
    'Business Analyst',
    'Sales Executive'
  ];

  // Use the length of the username to pick a title (deterministic but seems random)
  const titleIndex = username.length % possibleTitles.length;
  const title = possibleTitles[titleIndex];

  return {
    name: formattedName,
    title
  };
}

/**
 * Check if a user is attempting to review themselves
 * @param userId The current user's LinkedIn URL
 * @param targetLinkedInUrl The LinkedIn URL being reviewed
 * @returns Boolean indicating if this is a self-review attempt and error message if it is
 */
export async function isSelfReview(userId: string, targetLinkedInUrl: string): Promise<{ isSelf: boolean; error: string }> {
  if (!userId || !targetLinkedInUrl) {
    return { isSelf: false, error: "" };
  }

  try {
    // Import prisma inside the function to avoid circular dependencies
    const { prisma } = await import("@/lib/db");

    // Get current user's LinkedIn URL from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { linkedinUrl: true }
    });

    if (!user?.linkedinUrl) {
      return { isSelf: false, error: "" };
    }

    // Normalize both URLs for comparison
    const normalizedUserUrl = normalizeLinkedInUrl(user.linkedinUrl) || user.linkedinUrl;
    const normalizedTargetUrl = normalizeLinkedInUrl(targetLinkedInUrl) || targetLinkedInUrl;

    // Compare the normalized URLs
    if (normalizedUserUrl === normalizedTargetUrl) {
      return {
        isSelf: true,
        error: "You cannot write a review about yourself."
      };
    }

    return { isSelf: false, error: "" };
  } catch (error) {
    console.error("Error checking for self-review:", error);
    return { isSelf: false, error: "" };
  }
}

// Client-side version that doesn't require database access
export function isSelfReviewClient(userLinkedInUrl: string | null | undefined, targetLinkedInUrl: string): { isSelf: boolean; error: string } {
  if (!userLinkedInUrl || !targetLinkedInUrl) {
    return { isSelf: false, error: "" };
  }

  // Normalize both URLs for comparison
  const normalizedUserUrl = normalizeLinkedInUrl(userLinkedInUrl) || userLinkedInUrl;
  const normalizedTargetUrl = normalizeLinkedInUrl(targetLinkedInUrl) || targetLinkedInUrl;

  // Only consider fully formed LinkedIn URLs to avoid partial matches during typing
  if (normalizedTargetUrl.includes("linkedin.com/in/") && normalizedUserUrl === normalizedTargetUrl) {
    return {
      isSelf: true,
      error: "You cannot write a review about yourself."
    };
  }

  return { isSelf: false, error: "" };
}
