import { db } from "@/db";
import * as actions from "@/actions";
import AdminClientComponent from "@/components/adminComponent"; // Client component

export default async function AdminPage() {
  // Fetch the leads and salespeople from the database
  const leads = await db.lead.findMany({
    include: {
      salesperson: true,
    },
  });

  let salespeople = await db.salesperson.findMany();

  if (salespeople.length < 1) {
    await actions.seedSalesPersons();

    salespeople = await db.salesperson.findMany();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Leads</h1>
      <AdminClientComponent leads={leads} salespeople={salespeople} />
    </div>
  );
}
