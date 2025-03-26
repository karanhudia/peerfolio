'use client';

import Link from "next/link";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useIsSmallScreen } from "@/hooks/useMediaQuery";

interface MainNavProps {
  user: User | null;
}

export function MainNav({ user }: MainNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSmallScreen = useIsSmallScreen();
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isSmallScreen) {
      setIsMenuOpen(false);
    }
  }, [isSmallScreen]);
  
  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="relative bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        {/* Logo/Branding */}
        <div className="flex-shrink-0 z-10">
          <Link href="/" className="text-xl font-bold text-primary">
            PeerFolio
          </Link>
        </div>
        
        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
          <Link href="/discover" className="text-sm text-gray-600 hover:text-primary">
            Discover
          </Link>
          <Link href="/search" className="text-sm text-gray-600 hover:text-primary">
            Search
          </Link>
          <Link href="/review" className="text-sm text-gray-600 hover:text-primary">
            Write a Review
          </Link>
        </div>
        
        {/* Auth Controls on right */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          {user ? (
            <>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-sm text-gray-600 hover:text-primary">
                  Admin
                </Link>
              )}
              <Link href="/profile" className="text-sm text-gray-600 hover:text-primary">
                Profile
              </Link>
              <form action="/api/auth/signout" method="post">
                <Button variant="outline" size="sm" type="submit">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu (shown when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 border-t shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="flex flex-col space-y-3 mb-4">
            <Link 
              href="/discover" 
              className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            <Link 
              href="/search" 
              className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Link 
              href="/review" 
              className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Write a Review
            </Link>
            
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link 
                    href="/admin" 
                    className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  href="/profile" 
                  className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <form action="/api/auth/signout" method="post" className="py-2">
                  <Button variant="outline" size="sm" type="submit" className="w-full px-4 py-2">
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="outline" size="sm" className="w-full px-4 py-2">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button size="sm" className="w-full px-4 py-2">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 