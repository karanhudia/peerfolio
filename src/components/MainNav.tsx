import Link from "next/link";
import { User } from "next-auth";
import { Button } from "./ui/button";

interface MainNavProps {
  user: User | null;
}

export function MainNav({ user }: MainNavProps) {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold text-primary">
          PeerFolio
        </Link>
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
      <div className="flex items-center space-x-4">
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
    </nav>
  );
} 