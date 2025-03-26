import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Profile | PeerFolio",
  description: "View and manage your PeerFolio profile and reviews.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/login");
  }
  
  // Get reviews written by the user
  const myReviews = await prisma.review.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      person: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  // Get reviews received by the user (if their profile has been reviewed)
  const receivedReviews = await prisma.review.findMany({
    where: {
      reviewedUserId: user.id,
      isApproved: true,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your reviews and profile information
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl mr-4">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user.name || "Anonymous"}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-gray-600 text-sm">
                Member since {formatDate(user.createdAt || new Date())}
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-600">{myReviews.length}</p>
                  <p className="text-xs text-gray-500">Reviews Written</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-600">{receivedReviews.length}</p>
                  <p className="text-xs text-gray-500">Reviews Received</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/review">
                <Button className="w-full">Write a Review</Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="w-full">Search People</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Reviews Written Section */}
          <div className="card">
            <h3 className="font-medium mb-4">Reviews You've Written</h3>
            
            {myReviews.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <p className="text-gray-500">You haven't written any reviews yet.</p>
                <Link href="/review" className="text-blue-600 hover:underline mt-2 inline-block">
                  Write your first review
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          href={`/person/${review.person.id}`}
                          className="font-medium hover:text-blue-600"
                        >
                          {review.person.name || "Professional"}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <div className="text-yellow-400">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-2">
                      {review.content}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {review.isApproved ? "Approved" : "Pending approval"}
                      </span>
                      <Link 
                        href={`/person/${review.person.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View full review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Reviews Received Section */}
          {receivedReviews.length > 0 && (
            <div className="card">
              <h3 className="font-medium mb-4">Reviews About You</h3>
              <div className="space-y-4">
                {receivedReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {review.author.name || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <div className="text-yellow-400">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="mt-2">
                      {review.content}
                    </p>
                    {review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {review.tags.map((tag) => (
                          <span 
                            key={tag.id} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 