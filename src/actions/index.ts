"use server";

// import { redirect } from 'next/navigation';
import { db } from "@/db";

export async function createLead(
  formState: { message: string } | undefined,
  formData: FormData
) {
  try {
    console.log(formData);
    // Check the user's inputs and make sure they're valid
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const source = formData.get("source");

    if (name && name?.toString().length < 3) {
      return {
        message: "name must be longer",
      };
    }
    if (email && email.toString().length < 10) {
      return {
        message: "email must be longer",
      };
    }
    if (source && source?.toString().length < 1) {
      return {
        message: "source must be longer",
      };
    }

    // Create a new record in the database
    await db.lead.create({
      data: {
        name,
        email,
        source: "GOOGLE",
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
}
