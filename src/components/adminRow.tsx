"use client";
import { Source } from "@prisma/client";
import { useState } from "react";

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

export default function AdminRow({
  lead,
  salespeople,
  onAssign,
}: {
  lead: Lead;
  salespeople: Salesperson[];
  onAssign: (leadId: number, salespersonId: number | null) => void;
}) {
  const [selectedSalesperson, setSelectedSalesperson] = useState<number | null>(
    lead?.salespersonId ?? null
  );

  const handleAssignClick = () => {
    // When the button is clicked, call the onAssign function with the selected salesperson
    onAssign(lead.id, selectedSalesperson);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const salespersonId = e.target.value ? Number(e.target.value) : null;
    setSelectedSalesperson(salespersonId);
  };

  return (
    <tr>
      <td className="border p-2">{lead.name}</td>
      <td className="border p-2">{lead.email}</td>
      <td className="border p-2">{lead.source}</td>
      <td className="border p-2">{lead?.salesperson?.name || "Unassigned"}</td>
      <td className="border p-2">
        <select
          className="border p-2"
          onChange={handleChange}
          value={selectedSalesperson || ""}
        >
          <option value="">Assign Salesperson</option>
          {salespeople.map((salesperson) => (
            <option key={salesperson.id} value={salesperson.id}>
              {salesperson.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
          onClick={handleAssignClick}
        >
          Assign
        </button>
      </td>
    </tr>
  );
}
