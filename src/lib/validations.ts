import { z } from "zod";
import { isValidLinkedInUrl } from "./linkedin-utils";

// Regex for LinkedIn profile URLs
const linkedinUrlRegex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[\w\-]+\/?$/i;

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const reviewSchema = z.object({
  linkedinUrl: z
    .string()
    .min(1, { message: "LinkedIn URL is required." })
    .refine(url => isValidLinkedInUrl(url), {
      message: "Please enter a valid LinkedIn profile URL (https://linkedin.com/in/profile-name)."
    }),
  relationship: z.string().min(1, { message: "Please select your relationship to this person." }),
  rating: z.number().min(1).max(5, { message: "Please provide a rating between 1 and 5." }),
  content: z.string().min(20, { message: "Please provide a detailed review (minimum 20 characters)." }),
  interactionDate: z.date({ required_error: "Please select when you interacted with this person." }),
  tags: z.array(z.string()).optional(),
});

export const reportSchema = z.object({
  reason: z.string().min(10, { message: "Please provide a reason for reporting this review." }),
  reviewId: z.string(),
}); 