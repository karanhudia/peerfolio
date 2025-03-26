"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPendingReviews, moderateReview } from "@/lib/actions/admin";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const result = await getPendingReviews();
        
        if (result.error) {
          setError(result.error);
          setReviews([]);
        } else {
          setReviews(result);
        }
      } catch (err) {
        setError("Failed to load pending reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchReviews();
  }, []);

  async function handleApprove(reviewId: string) {
    setProcessingId(reviewId);
    
    try {
      const result = await moderateReview(reviewId, true);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Remove the approved review from the list
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      }
    } catch (err) {
      setError("Failed to approve review");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(reviewId: string) {
    setProcessingId(reviewId);
    
    try {
      const result = await moderateReview(reviewId, false);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Remove the rejected review from the list
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      }
    } catch (err) {
      setError("Failed to reject review");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Reviews</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Back to Dashboard
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="card bg-gray-50 text-center py-8">
          <h2 className="text-xl font-medium mb-2">No pending reviews</h2>
          <p className="text-gray-600">All reviews have been moderated.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    Review for: {review.person.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Submitted by: {review.author.name} ({review.author.email})
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {formatDate(review.createdAt)}
                  </p>
                </div>
                <div className="text-yellow-400 font-bold">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="whitespace-pre-line">{review.content}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleReject(review.id)}
                  disabled={processingId === review.id}
                >
                  {processingId === review.id ? "Processing..." : "Reject"}
                </Button>
                <Button
                  onClick={() => handleApprove(review.id)}
                  disabled={processingId === review.id}
                >
                  {processingId === review.id ? "Processing..." : "Approve"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 