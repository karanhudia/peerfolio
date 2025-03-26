"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportSchema } from "@/lib/validations";
import { reportReview } from "@/lib/actions/reviews";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("reviewId") || "";
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: "",
      reviewId,
    },
  });

  async function onSubmit(data: z.infer<typeof reportSchema>) {
    if (!data.reviewId) {
      setError("No review ID provided. Please try again from the review page.");
      return;
    }
    
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await reportReview(data);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result.success) {
        setSuccess(result.success);
        setTimeout(() => {
          router.back();
        }, 3000);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!reviewId) {
    return (
      <div className="container max-w-md mx-auto py-10">
        <div className="card">
          <h1 className="text-xl font-bold mb-4">Invalid Request</h1>
          <p className="text-gray-600 mb-4">
            No review ID was provided. Please navigate to a review to report it.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="card">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Report Review</h1>
          <p className="text-gray-600 mt-2">
            Please let us know why you think this review violates our guidelines.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("reviewId")} />

          <FormControl>
            <FormLabel htmlFor="reason">Reason for reporting</FormLabel>
            <Textarea
              id="reason"
              rows={6}
              placeholder="Please describe why this review violates our guidelines..."
              {...register("reason")}
            />
            <FormDescription>
              Examples: misinformation, offensive content, spam, privacy violation, etc.
            </FormDescription>
            {errors.reason && (
              <FormMessage>{errors.reason.message}</FormMessage>
            )}
          </FormControl>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 