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
  
  // Trim whitespace
  url = url.trim();
  
  // Try to extract the username with regex
  const linkedInRegex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
  const match = url.match(linkedInRegex);
  
  if (match && match[1]) {
    // Return a standardized URL
    return `https://www.linkedin.com/in/${match[1]}/`;
  }
  
  return null;
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