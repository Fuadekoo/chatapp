"use server";
import prisma from "@/lib/db";
import { z } from "zod";

export async function updateUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        photo: true,
        password: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { message: "User not found", status: false };
    }
    // Here you can add logic to update the user profile if needed
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: user.name, // You can update this with new data
        phone: user.phone, // You can update this with new data
        email: user.email, // You can update this with new data
        photo: user.photo, // You can update this with new data
        password: user.password, // You can update this with new data
      },
    });

    return { message: "User profile updated successfully", status: true };
  } catch (error) {
    // console.error("Error fetching user profile:", error);
    return { message: "Error fetching user profile", status: false };
  }
}
