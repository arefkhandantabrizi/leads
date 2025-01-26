import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed salespersons
  const salespersons = [
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Smith", email: "bob.smith@example.com" },
    { name: "Charlie Brown", email: "charlie.brown@example.com" },
  ];

  for (const salesperson of salespersons) {
    await prisma.salesperson.create({
      data: salesperson,
    });
  }

  console.log("Salespersons seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
