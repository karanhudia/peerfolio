import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      
      <p className="text-gray-600 max-w-md mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            Go Home
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link href="/search">
            Search People
          </Link>
        </Button>
      </div>
    </div>
  );
} 