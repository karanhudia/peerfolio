"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/lib/validations";
import { createReview, getPersonByLinkedInUrl } from "@/lib/actions/reviews";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectOption } from "@/components/ui/select";
import { FormControl, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { StarRating } from "@/components/StarRating";
import { normalizeLinkedInUrl } from "@/lib/linkedin-utils";

// Relationship options
const relationshipOptions = [
  { value: "mentor", label: "Mentor" },
  { value: "interviewer", label: "Interviewer" },
  { value: "manager", label: "Manager" },
  { value: "colleague", label: "Colleague" },
  { value: "employee", label: "Employee" },
  { value: "client", label: "Client" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Other" },
];

// Sample tags
const availableTags = [
  "Technical Skills",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Teamwork",
  "Mentorship",
];

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUrlParam = searchParams.get("linkedin") || "";
  const initialLinkedInUrl = normalizeLinkedInUrl(initialUrlParam) || initialUrlParam;
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [personInfo, setPersonInfo] = useState<{ name?: string; title?: string } | null>(null);
  const [isCheckingLinkedIn, setIsCheckingLinkedIn] = useState(false);
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      linkedinUrl: initialLinkedInUrl,
      personName: "",
      personTitle: "",
      isAnonymous: false,
      relationship: "",
      rating: 0,
      content: "",
      interactionDate: new Date(),
      tags: [],
    },
  });

  const currentLinkedInUrl = watch("linkedinUrl");
  const currentRating = watch("rating");
  
  // Check for LinkedIn URL in query params on initial load
  useEffect(() => {
    if (initialLinkedInUrl && initialLinkedInUrl.includes("linkedin.com/in/")) {
      setValue("linkedinUrl", initialLinkedInUrl);
      
      // Fetch person info for the passed LinkedIn URL
      const fetchPerson = async () => {
        setIsCheckingLinkedIn(true);
        setLinkedInError(null);
        try {
          const person = await getPersonByLinkedInUrl(initialLinkedInUrl);
          if (person && !person.error) {
            // Setup personInfo state based on what fields exist
            const personInfoData: { name?: string; title?: string } = {};
            
            if (person.name) {
              personInfoData.name = person.name;
              setValue("personName", person.name);
            }
            
            if (person.title) {
              personInfoData.title = person.title;
              setValue("personTitle", person.title);
            }
            
            setPersonInfo(personInfoData);
            
            // Set appropriate message if needed
            if (!person.name) {
              setLinkedInError("Profile found but name is missing. Please enter a name below.");
            }
          } else {
            setPersonInfo(null);
            setValue("personName", "");
            setValue("personTitle", "");
            setLinkedInError("Could not fetch profile information. Please continue with the review.");
          }
        } catch (error) {
          console.error("Error fetching LinkedIn profile:", error);
          setPersonInfo(null);
          setValue("personName", "");
          setValue("personTitle", "");
          setLinkedInError("Error fetching profile. Please continue with the review.");
        } finally {
          setIsCheckingLinkedIn(false);
        }
      };
      
      fetchPerson();
    }
  }, [initialLinkedInUrl, setValue]);

  // Fetch LinkedIn profile info when URL changes
  useEffect(() => {
    const fetchPersonInfo = async () => {
      if (!currentLinkedInUrl || currentLinkedInUrl === linkedinUrl) return;
      
      // Only proceed if URL is likely valid
      if (!currentLinkedInUrl.includes("linkedin.com/in/")) return;
      
      setIsCheckingLinkedIn(true);
      setLinkedinUrl(currentLinkedInUrl);
      setLinkedInError(null);
      
      try {
        const person = await getPersonByLinkedInUrl(currentLinkedInUrl);
        if (person && !person.error) {
          // Setup personInfo state based on what fields exist
          const personInfoData: { name?: string; title?: string } = {};
          
          if (person.name) {
            personInfoData.name = person.name;
            setValue("personName", person.name);
          }
          
          if (person.title) {
            personInfoData.title = person.title;
            setValue("personTitle", person.title);
          }
          
          setPersonInfo(personInfoData);
          
          // Set appropriate message if needed
          if (!person.name) {
            setLinkedInError("Profile found but name is missing. Please enter a name below.");
          }
        } else {
          setPersonInfo(null);
          setValue("personName", "");
          setValue("personTitle", "");
          setLinkedInError("Could not fetch profile information. You can still submit your review.");
        }
      } catch (error) {
        console.error("Error fetching LinkedIn profile:", error);
        setPersonInfo(null);
        setValue("personName", "");
        setValue("personTitle", "");
        setLinkedInError("Error fetching profile. You can still submit your review.");
      } finally {
        setIsCheckingLinkedIn(false);
      }
    };

    // Debounce the fetch to avoid too many requests
    const timer = setTimeout(() => {
      fetchPersonInfo();
    }, 800);

    return () => clearTimeout(timer);
  }, [currentLinkedInUrl, linkedinUrl, setValue]);

  async function onSubmit(data: z.infer<typeof reviewSchema>) {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Ensure name is provided
      if (!personInfo?.name && !data.personName) {
        setError("Person's name is required to submit a review.");
        setIsLoading(false);
        return;
      }

      data.tags = selectedTags;
      const result = await createReview(data);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result.success) {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRatingChange = (rating: number) => {
    setValue("rating", rating);
  };

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
          {success}
          <div className="mt-2">
            <Button onClick={() => router.push("/profile")} size="sm">
              View My Reviews
            </Button>
          </div>
        </div>
      )}
      
      {!success && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Professional Information</h2>
            
            <FormControl>
              <FormLabel htmlFor="linkedinUrl">LinkedIn Profile URL</FormLabel>
              <Input
                id="linkedinUrl"
                placeholder="https://linkedin.com/in/username"
                {...register("linkedinUrl")}
                className={errors.linkedinUrl ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {isCheckingLinkedIn && (
                <p className="text-blue-600 text-sm mt-1">Checking profile...</p>
              )}
              {linkedInError && (
                <p className="text-amber-600 text-sm mt-1">{linkedInError}</p>
              )}
              {personInfo && personInfo.name && (
                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                  <p className="font-medium">Profile found: {personInfo.name}</p>
                  {personInfo.title && (
                    <p className="text-sm text-gray-600">{personInfo.title}</p>
                  )}
                  <p className="text-xs mt-1 text-blue-600">
                    This profile is already in our database.
                  </p>
                </div>
              )}
              {personInfo && !personInfo.name && personInfo.title && (
                <div className="mt-2 p-3 bg-amber-50 rounded-md">
                  <p className="text-sm text-gray-600">Position: {personInfo.title}</p>
                  <p className="text-xs mt-1 text-amber-600">
                    Please provide a name for this profile.
                  </p>
                </div>
              )}
              {personInfo && !personInfo.name && !personInfo.title && (
                <div className="mt-2 p-3 bg-amber-50 rounded-md">
                  <p className="text-sm text-amber-600">
                    New profile. Please provide name and position details.
                  </p>
                </div>
              )}
              <FormMessage>{errors.linkedinUrl?.message}</FormMessage>
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="personName">Person's Name</FormLabel>
              <Input
                id="personName"
                placeholder="Enter the person's name"
                {...register("personName")}
                className={errors.personName ? "border-red-500" : ""}
                disabled={isLoading || (personInfo && !!personInfo.name)}
              />
              {personInfo && personInfo.name ? (
                <FormDescription>
                  Name is automatically populated from existing profile and cannot be changed.
                </FormDescription>
              ) : (
                <FormDescription>
                  Please provide the person's full name.
                </FormDescription>
              )}
              <FormMessage>{errors.personName?.message}</FormMessage>
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="personTitle">Position / Title <span className="text-gray-500 text-sm">(Optional)</span></FormLabel>
              <Input
                id="personTitle"
                placeholder="Enter the person's job title or position"
                {...register("personTitle")}
                className={errors.personTitle ? "border-red-500" : ""}
                disabled={isLoading || (personInfo && !!personInfo.title)}
              />
              {personInfo && personInfo.title ? (
                <FormDescription>
                  Title is automatically populated from existing profile and cannot be changed.
                </FormDescription>
              ) : (
                <FormDescription>
                  E.g., "Software Engineer", "Product Manager", etc.
                </FormDescription>
              )}
              <FormMessage>{errors.personTitle?.message}</FormMessage>
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="relationship">Your Relationship</FormLabel>
              <Select id="relationship" {...register("relationship")}>
                <SelectOption value="">Select relationship type</SelectOption>
                {relationshipOptions.map((option) => (
                  <SelectOption key={option.value} value={option.value}>
                    {option.label}
                  </SelectOption>
                ))}
              </Select>
              {errors.relationship && (
                <FormMessage>{errors.relationship.message}</FormMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="rating">Rating</FormLabel>
              <div className="my-2">
                <StarRating 
                  rating={currentRating} 
                  onChange={handleRatingChange} 
                  size="lg" 
                />
              </div>
              {errors.rating && (
                <FormMessage>{errors.rating.message}</FormMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="interactionDate">When did you interact?</FormLabel>
              <Input
                id="interactionDate"
                type="date"
                {...register("interactionDate", {
                  setValueAs: (value) => new Date(value),
                })}
              />
              {errors.interactionDate && (
                <FormMessage>{errors.interactionDate.message}</FormMessage>
              )}
            </FormControl>
            
            <FormControl>
              <div className="flex items-start py-2">
                <div className="flex items-center h-5">
                  <input
                    id="isAnonymous"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    {...register("isAnonymous")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isAnonymous" className="text-gray-600 font-medium">
                    Post this review anonymously
                  </label>
                  <p className="text-gray-500 text-xs mt-1">
                    Your name won't be displayed with this review. The review will still be associated with your account, but only you and admins can see that you wrote it.
                  </p>
                </div>
              </div>
            </FormControl>

            <FormControl>
              <FormLabel>Tags (Optional)</FormLabel>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-normal break-words ${
                      selectedTags.includes(tag)
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <FormDescription>
                Select tags that best describe this person&apos;s skills and attributes.
              </FormDescription>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="content">Your Review</FormLabel>
              <Textarea
                id="content"
                rows={6}
                placeholder="Please share your experience with this person. What were their strengths and areas for improvement? Your honest feedback helps others."
                {...register("content")}
              />
              {errors.content && (
                <FormMessage>{errors.content.message}</FormMessage>
              )}
            </FormControl>
          </div>
          
          <Button 
            type="submit" 
            variant="enhanced"
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}
    </div>
  );
} 