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
  
  const { name, email, password } = validatedFields.data;
  
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
      },
    });
    
    return { success: "Account created successfully! Please log in." };
  } catch (error) {
    return { error: "Error creating account. Please try again later." };
  }
} 