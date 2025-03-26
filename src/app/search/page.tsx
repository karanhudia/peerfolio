"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchPeople } from "@/lib/actions/reviews";
import { calculateAverageRating } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { useSession } from "next-auth/react";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const searchResults = await searchPeople(query);
      setResults(searchResults);
      
      // Update URL with search query
      const params = new URLSearchParams();
      params.set("q", query);
      router.push(`/search?${params.toString()}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Find Professionals</h1>

        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search by name or title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading} className="py-2 whitespace-normal">
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {searched && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">
              {results.length > 0
                ? `Search Results (${results.length})`
                : "No results found"}
            </h2>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((person) => {
                  const ratings = person.reviews.map((review: any) => review.rating);
                  const averageRating = calculateAverageRating(ratings);

                  return (
                    <div key={person.id} className="card hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <Link href={`/person/${person.id}`} className="flex-1">
                          <div>
                            <h3 className="text-lg font-semibold">{person.name || "Professional"}</h3>
                            {person.title && (
                              <p className="text-gray-600 text-sm">{person.title}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-bold text-blue-600 mr-2">
                              {averageRating.toFixed(1)}
                            </span>
                            <StarRating rating={averageRating} readOnly size="sm" />
                            <span className="text-sm text-gray-500 ml-2">
                              ({person.reviews.length})
                            </span>
                          </div>
                        </Link>
                        
                        {!isSessionLoading && session?.user && (
                          <div className="ml-4 flex-shrink-0">
                            <Link href={`/review?linkedin=${encodeURIComponent(person.linkedinUrl)}`}>
                              <Button variant="outline" size="sm" className="whitespace-normal text-center min-w-[100px]">
                                Write a Review
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="card bg-gray-50">
                <p>No professionals found matching your search criteria.</p>
                <p className="text-sm text-gray-600 mt-2">
                  Try searching with a different name or browse through our discover page.
                </p>
                <div className="mt-4">
                  <Link href="/discover">
                    <Button variant="outline" className="py-2 px-4 whitespace-normal">
                      Browse All Professionals
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 