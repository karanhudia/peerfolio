import { prisma } from "@/lib/db";
import { calculateAverageRating } from "@/lib/utils";
import Link from "next/link";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Discover Top Professionals | PeerFolio",
  description: "Browse and discover highly-rated professionals across various fields.",
};

async function getTopRatedPeople() {
  try {
    // Get all people with their reviews
    const people = await prisma.person.findMany({
      where: {
        reviews: {
          some: {
            isApproved: true,
          },
        },
      },
      include: {
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
      take: 50, // Limit to 50 for better performance
    });

    // Calculate average rating for each person
    const ratedPeople = people.map((person) => {
      const ratings = person.reviews.map((review) => review.rating);
      const averageRating = calculateAverageRating(ratings);
      return {
        ...person,
        averageRating,
        reviewCount: ratings.length,
      };
    });

    // Sort by rating (highest first)
    return ratedPeople.sort((a, b) => b.averageRating - a.averageRating);
  } catch (error) {
    console.error("Error getting top rated people:", error);
    return [];
  }
}

export default async function DiscoverPage() {
  const topPeople = await getTopRatedPeople();
  const currentUser = await getCurrentUser();

  return (
    <div className="container py-10">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Discover Top Professionals</h1>
        <p className="text-gray-600">
          Browse through our highest-rated professionals across various fields.
          Find the right mentor, interviewer, or colleague based on authentic reviews.
        </p>
      </div>

      {topPeople.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPeople.map((person) => (
            <div key={person.id} className="card hover:border-blue-300 transition-colors h-full flex flex-col">
              <Link href={`/person/${person.id}`} className="block flex-grow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0">
                    {person.name ? person.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <h3 className="font-semibold">{person.name || "Professional"}</h3>
                    {person.title && <p className="text-gray-600 text-sm">{person.title}</p>}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center">
                  <div className="text-xl font-bold text-blue-600 mr-2">
                    {person.averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={person.averageRating} readOnly size="sm" />
                  <span className="text-sm text-gray-500 ml-2">
                    ({person.reviewCount} reviews)
                  </span>
                </div>
              </Link>
              
              {currentUser && (
                <div className="mt-4 pt-4 border-t">
                  <Link href={`/review?linkedin=${encodeURIComponent(person.linkedinUrl)}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Write a Review
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-gray-50 max-w-xl mx-auto text-center py-8">
          <h2 className="text-xl font-medium mb-2">No professionals found</h2>
          <p className="text-gray-600 mb-4">
            Be the first to add a review for a professional on PeerFolio!
          </p>
          <Link href="/review">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Write a Review
            </button>
          </Link>
        </div>
      )}
    </div>
  );
} 