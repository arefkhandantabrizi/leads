"use server";

import { db } from "@/db";
import { Source } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLead(
  formState: { message: string } | undefined,
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const source = formData.get("source"); // This will be a string from the formData

    if (
      typeof source !== "string" ||
      !Object.values(Source).includes(source as Source)
    ) {
      return { message: "Invalid source provided" };
    }

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

    // If source is valid, proceed to create the lead
    const validSource: Source = source as Source; // Cast it to Source enum

    // Create a new record in the database
    await db.lead.create({
      data: {
        name,
        email,
        source: validSource,
      },
    });
    return {
      message: "The lead has been saved successfully",
    };
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

export async function seedSalesPersons() {
  const salespersons = [
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Smith", email: "bob.smith@example.com" },
    { name: "Charlie Brown", email: "charlie.brown@example.com" },
  ];

  for (const person of salespersons) {
    await db.salesperson.create({ data: person });
  }
}

export async function assignSalesperson({
  leadId,
  salespersonId,
}: {
  leadId: number;
  salespersonId: number | null;
}) {
  try {
    // Update the lead and associate it with the salesperson
    await db.lead.update({
      where: {
        id: leadId,
      },
      data: {
        // Use connect to link the salesperson to the lead
        // salesperson: {
        // connect: {
        salespersonId: salespersonId, // Connect to the salesperson by their ID
      },
      // },
      // },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: `Error assigning salesperson: ${error.message}`,
      };
    }
    return {
      message: "An unknown error occurred while assigning the salesperson.",
    };
  }
  revalidatePath("/admins");
  redirect("/admins");
}
