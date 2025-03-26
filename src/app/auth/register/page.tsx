"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations";
import { registerUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      linkedinUrl: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  useEffect(() => {
    if (success) {
      showToast(success, "success");
    }
    if (error) {
      showToast(error, "error");
    }
  }, [success, error, showToast]);

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await registerUser(data);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result.success) {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="card">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-600 mt-2">Sign up to join our community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
            />
            {errors.name && (
              <FormMessage>{errors.name.message}</FormMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <FormMessage>{errors.email.message}</FormMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="linkedinUrl">LinkedIn Profile URL</FormLabel>
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/username"
              {...register("linkedinUrl")}
            />
            {errors.linkedinUrl && (
              <FormMessage>{errors.linkedinUrl.message}</FormMessage>
            )}
            <FormDescription>
              Your LinkedIn profile is required to verify your identity.
            </FormDescription>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register("password")}
            />
            {errors.password && (
              <FormMessage>{errors.password.message}</FormMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <FormMessage>{errors.confirmPassword.message}</FormMessage>
            )}
          </FormControl>

          <FormControl>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  {...register("acceptTerms")}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline" target="_blank">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline" target="_blank">
                    Privacy Policy
                  </Link>
                </label>
                {errors.acceptTerms && (
                  <FormMessage>{errors.acceptTerms.message}</FormMessage>
                )}
              </div>
            </div>
          </FormControl>

          <Button 
            type="submit" 
            variant="enhanced"
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
