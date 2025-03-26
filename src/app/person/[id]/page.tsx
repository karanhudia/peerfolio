import { getPersonById } from "@/lib/actions/reviews";
import { calculateAverageRating, formatDate } from "@/lib/utils";
import { extractLinkedInUsername } from "@/lib/linkedin-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { StarRating } from "@/components/StarRating";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const person = await getPersonById(params.id);
  
  if (!person) {
    return {
      title: "Profile Not Found",
    };
  }
  
  return {
    title: `${person.name || extractLinkedInUsername(person.linkedinUrl) || "Professional"}'s Profile | PeerFolio`,
    description: `View reviews and feedback for ${person.name || "this professional"} on PeerFolio.`,
  };
}

export default async function PersonPage({ params }: { params: { id: string } }) {
  const person = await getPersonById(params.id);
  const currentUser = await getCurrentUser();
  
  if (!person) {
    notFound();
  }
  
  const ratings = person.reviews.map((review) => review.rating);
  const averageRating = calculateAverageRating(ratings);
  
  // Group reviews by tags
  const tagCounts: Record<string, number> = {};
  person.reviews.forEach((review) => {
    review.tags.forEach((tag) => {
      tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
    });
  });
  
  // Sort tags by frequency
  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  
  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                {person.name ? person.name.charAt(0).toUpperCase() : "?"}
              </div>
              <Link 
                href={person.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
                <span className="inline-block">View LinkedIn</span>
              </Link>
            </div>
            
            <h1 className="text-2xl font-bold">
              {person.name || extractLinkedInUsername(person.linkedinUrl) || "Professional"}
            </h1>
            
            {person.title && (
              <p className="text-gray-600">{person.title}</p>
            )}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center mb-2">
                <div className="text-2xl font-bold text-blue-600 mr-2">{averageRating.toFixed(1)}</div>
                <StarRating rating={averageRating} readOnly size="md" />
                <div className="text-gray-500 text-sm ml-2">({person.reviews.length} reviews)</div>
              </div>
              
              {sortedTags.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Top Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {sortedTags.map(([tag, count]) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs whitespace-normal"
                      >
                        {tag} ({count})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {currentUser && (
            <div className="card bg-blue-50 border-blue-100">
              <h3 className="font-medium mb-2">Share your experience</h3>
              <p className="text-sm text-gray-600 mb-4">
                Have you worked with this person? Help others by sharing your experience.
              </p>
              <Link href={`/review?linkedin=${encodeURIComponent(person.linkedinUrl)}`}>
                <Button className="w-full py-2.5 whitespace-normal">Write a Review</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Reviews Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Reviews ({person.reviews.length})</h2>
            
            {person.reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {person.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                      <div>
                        <div className="flex items-center">
                          <StarRating rating={review.rating} readOnly size="sm" />
                          <span className="text-sm text-gray-500 ml-2">
                            as {review.relationship}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1">
                          By {review.isAnonymous ? "Anonymous" : (review.author.name || "User")} on {formatDate(review.createdAt)}
                        </p>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Interaction date: {formatDate(review.interactionDate)}
                      </p>
                    </div>
                    
                    <p className="text-gray-700 my-3 whitespace-pre-line">{review.content}</p>
                    
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
                    
                    {currentUser && currentUser.id !== review.author.id && (
                      <div className="mt-3 text-right">
                        <Link 
                          href={`/report?reviewId=${review.id}`}
                          className="text-sm text-gray-500 hover:text-red-600"
                        >
                          Report this review
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 