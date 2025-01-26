"use client";

import * as actions from "@/actions"; // Assuming actions are available
import { Source } from "@prisma/client";
import AdminRow from "./adminRow";

interface Lead {
  id: number;
  name: string;
  email: string;
  source: Source; // Use the actual `Source` enum type
  salesperson?: Salesperson | null; // `salesperson` can be null if not assigned
  salespersonId?: number | null; // `salesperson` can be null if not assigned
}

interface Salesperson {
  id: number;
  name: string;
}

interface AdminClientComponentProps {
  leads: Lead[];
  salespeople: Salesperson[];
}

export default function AdminClientComponent({
  leads,
  salespeople,
}: AdminClientComponentProps) {
  // State to manage the selected salesperson for assignment
  //   const [selectedSalesperson, setSelectedSalesperson] = useState<number | null>(
  //     null
  //   );

  const handleAssignSalesperson = async (
    leadId: number,
    salespersonId: number | null
  ) => {
    const result = await actions.assignSalesperson({ leadId, salespersonId });

    if (result?.message) {
      // Handle success or failure message
      alert(result.message);
    }
  };

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Source</th>
            <th className="border p-2">Assigned Salesperson</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <AdminRow
              key={lead.id}
              lead={lead}
              salespeople={salespeople}
              onAssign={handleAssignSalesperson}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
