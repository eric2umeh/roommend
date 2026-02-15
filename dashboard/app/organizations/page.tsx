"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";
import { DataTable, type Column } from "../../components/data-table";

interface Organization {
  id: string;
  name: string;
  type: "Government" | "NGO" | "Corporate" | "Individual";
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  total_rooms: number;
  documents_count: number;
  created_at: string;
  status: "active" | "inactive";
}

// Mock Organizations
const mockOrganizations: Organization[] = [
  {
    id: "org_001",
    name: "Federal Ministry of Tourism",
    type: "Government",
    contact_person: "Mrs. Abiola Johnson",
    email: "abiola@tourism.gov.ng",
    phone: "+234 701 234 5678",
    address: "5 Yakubu Gowon Crescent, Lagos",
    total_rooms: 45,
    documents_count: 8,
    created_at: "2024-01-15",
    status: "active",
  },
  {
    id: "org_002",
    name: "Nigerian Red Cross Society",
    type: "NGO",
    contact_person: "Dr. Chuka Okonkwo",
    email: "chuka@redcross.ng",
    phone: "+234 702 345 6789",
    address: "12 Broad Street, Lagos Island",
    total_rooms: 30,
    documents_count: 12,
    created_at: "2024-01-20",
    status: "active",
  },
  {
    id: "org_003",
    name: "Dangote Group PLC",
    type: "Corporate",
    contact_person: "Engr. Emeka Eze",
    email: "emeka@dangote.com",
    phone: "+234 703 456 7890",
    address: "FIRS Complex, Lekki, Lagos",
    total_rooms: 120,
    documents_count: 25,
    created_at: "2024-01-18",
    status: "active",
  },
  {
    id: "org_004",
    name: "World Bank - Nigeria Office",
    type: "Government",
    contact_person: "Ms. Folake Adebayo",
    email: "folake@worldbank.org",
    phone: "+234 704 567 8901",
    address: "Plot 1112A, Aguyi Ironsi Street, Maitama",
    total_rooms: 60,
    documents_count: 18,
    created_at: "2024-02-01",
    status: "active",
  },
  {
    id: "org_005",
    name: "ActionAid Nigeria",
    type: "NGO",
    contact_person: "Prof. Tunde Awotona",
    email: "tunde@actionaid.ng",
    phone: "+234 705 678 9012",
    address: "44 Muri Okunola Street, VI, Lagos",
    total_rooms: 25,
    documents_count: 15,
    created_at: "2024-01-25",
    status: "active",
  },
  {
    id: "org_006",
    name: "Tech Innovators Limited",
    type: "Corporate",
    contact_person: "Mr. Bola Adeyemi",
    email: "bola@techinnovators.com",
    phone: "+234 706 789 0123",
    address: "18 Allen Avenue, Ikeja, Lagos",
    total_rooms: 50,
    documents_count: 10,
    created_at: "2024-02-05",
    status: "active",
  },
  {
    id: "org_007",
    name: "Dr. Abdulrahman Rasheed (Individual)",
    type: "Individual",
    contact_person: "Dr. Abdulrahman Rasheed",
    email: "abdulrahman@email.com",
    phone: "+234 707 890 1234",
    address: "Ikoyi, Lagos",
    total_rooms: 15,
    documents_count: 5,
    created_at: "2024-02-10",
    status: "active",
  },
];

export default function OrganizationsPage() {
  const { hasPermission } = useAuth();
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showForm, setShowForm] = useState(false);

  const canManageOrganizations = hasPermission("manage_organizations");

  const filters = [
    {
      key: "type",
      label: "Organization Type",
      options: [
        { value: "Government", label: "Government" },
        { value: "NGO", label: "NGO" },
        { value: "Corporate", label: "Corporate" },
        { value: "Individual", label: "Individual" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  const columns: Column<Organization>[] = [
    {
      key: "name",
      label: "Organization Name",
      sortable: true,
      searchable: true,
      render: (value) => (
        <div className="font-medium text-slate-900">{value}</div>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Government"
              ? "bg-blue-100 text-blue-800"
              : value === "NGO"
                ? "bg-green-100 text-green-800"
                : value === "Corporate"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "contact_person",
      label: "Contact Person",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      searchable: true,
    },
    {
      key: "total_rooms",
      label: "Rooms Booked",
      sortable: true,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: "documents_count",
      label: "Documents",
      sortable: true,
      render: (value) => <span className="text-slate-600">{value} files</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {value === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Organizations</h1>
          <p className="text-slate-600 mt-2">
            Manage organizations and their hosted events
          </p>
        </div>
        {canManageOrganizations && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Organization
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Organizations</div>
          <div className="text-3xl font-bold text-slate-900">
            {mockOrganizations.length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Government</div>
          <div className="text-3xl font-bold text-blue-600">
            {mockOrganizations.filter((o) => o.type === "Government").length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">NGOs</div>
          <div className="text-3xl font-bold text-green-600">
            {mockOrganizations.filter((o) => o.type === "NGO").length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Corporate</div>
          <div className="text-3xl font-bold text-purple-600">
            {mockOrganizations.filter((o) => o.type === "Corporate").length}
          </div>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockOrganizations}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search organizations..."
          filters={filters}
          onView={(org) => setSelectedOrg(org)}
          viewButtonText="View"
          mobileColumns={["name", "type", "documents_count"]}
        />
      </div>

      {/* Organization Details Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedOrg.name}
              </h2>
              <button
                onClick={() => setSelectedOrg(null)}
                className="text-slate-500 hover:text-slate-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Organization Type
                </label>
                <p className="text-slate-900 mt-1">{selectedOrg.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Contact Person
                </label>
                <p className="text-slate-900 mt-1">
                  {selectedOrg.contact_person}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <p className="text-slate-900 mt-1">{selectedOrg.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <p className="text-slate-900 mt-1">{selectedOrg.phone}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Address
                </label>
                <p className="text-slate-900 mt-1">{selectedOrg.address}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Total Rooms Booked
                </label>
                <p className="text-slate-900 mt-1 font-semibold">
                  {selectedOrg.total_rooms} rooms
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Documents
                </label>
                <p className="text-slate-900 mt-1">
                  {selectedOrg.documents_count} files uploaded
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-2">
                <button
                  onClick={() => setSelectedOrg(null)}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 font-medium"
                >
                  Close
                </button>
                <Link href={`/app/organizations/${selectedOrg.id}`}>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    View Documents
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
