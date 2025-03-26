'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting if the current viewport matches a media query
 * 
 * @param query The media query to check against (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if the viewport matches the query
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null to indicate we don't know the match yet
  // This avoids hydration mismatches when rendering on the server
  const [matches, setMatches] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Set initial value once mounted
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    // Define listener function
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Add listener
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }
    
    // Cleanup
    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', listener);
      } else {
        // Fallback for older browsers
        media.removeListener(listener);
      }
    };
  }, [query]);
  
  // Return false as a fallback while initializing to avoid hydration issues
  return matches ?? false;
}

// Predefined breakpoint helpers
export const useIsMobile = () => useMediaQuery('(max-width: 639px)'); // sm
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)'); // md to lg
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)'); // lg and above
export const useIsSmallScreen = () => useMediaQuery('(max-width: 1023px)'); // smaller than lg 