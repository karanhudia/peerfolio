"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { z } from "zod";

export async function registerUser(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input." };
  }
  
  const { name, email, password, acceptTerms } = validatedFields.data;
  
  // Ensure terms are accepted
  if (!acceptTerms) {
    return { error: "You must accept the Terms of Service and Privacy Policy." };
  }
  
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  
  if (existingUser) {
    return { error: "Email already in use. Please use a different email or login." };
  }
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        termsAccepted: new Date(), // Store when they accepted terms
      },
    });
    
    return { success: "Account created successfully! Please log in." };
  } catch (error) {
    return { error: "Error creating account. Please try again later." };
  }
} 