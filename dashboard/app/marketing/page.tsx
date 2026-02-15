"use client";

import { DataTable, type Column } from "../../components/data-table";

interface Campaign {
  id: string;
  name: string;
  type: string;
  start_date: string;
  end_date: string;
  target_audience: string;
  status: "active" | "draft" | "completed";
  reach: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Valentine Weekend Special",
    type: "Promotional",
    start_date: "2024-02-10",
    end_date: "2024-02-20",
    target_audience: "Corporate Couples",
    status: "active",
    reach: 1250,
  },
  {
    id: "2",
    name: "NGO Bulk Booking Offer",
    type: "B2B",
    start_date: "2024-02-01",
    end_date: "2024-03-31",
    target_audience: "NGOs",
    status: "active",
    reach: 450,
  },
  {
    id: "3",
    name: "Government Conference Hosting",
    type: "Proposal",
    start_date: "2024-02-15",
    end_date: "2024-04-15",
    target_audience: "Federal Ministry",
    status: "draft",
    reach: 0,
  },
  {
    id: "4",
    name: "Holiday Season Campaign",
    type: "Email",
    start_date: "2024-12-01",
    end_date: "2025-01-05",
    target_audience: "Past Guests",
    status: "completed",
    reach: 3500,
  },
];

export default function MarketingPage() {
  const columns: Column<Campaign>[] = [
    { key: "name", label: "Campaign Name", sortable: true, searchable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "start_date", label: "Start Date", sortable: true },
    { key: "target_audience", label: "Target Audience" },
    {
      key: "reach",
      label: "Reach",
      sortable: true,
      render: (v) => (v > 0 ? v.toLocaleString() : "-"),
    },
    {
      key: "status",
      label: "Status",
      render: (v) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${v === "active" ? "bg-green-100 text-green-800" : v === "draft" ? "bg-slate-100 text-slate-800" : "bg-blue-100 text-blue-800"}`}
        >
          {v}
        </span>
      ),
    },
  ];

  const filters = [
    {
      key: "type",
      label: "Campaign Type",
      options: [
        { value: "Promotional", label: "Promotional" },
        { value: "B2B", label: "B2B" },
        { value: "Email", label: "Email" },
        { value: "Proposal", label: "Proposal" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft" },
        { value: "completed", label: "Completed" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Marketing Campaigns
        </h1>
        <p className="text-slate-600 mt-2">
          Manage promotional campaigns and outreach
        </p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockCampaigns}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search campaigns..."
          filters={filters}
          mobileColumns={["name", "type", "status"]}
        />
      </div>
    </div>
  );
}
