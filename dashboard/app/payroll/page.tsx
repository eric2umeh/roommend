"use client";

import { DataTable, type Column } from "../../components/data-table";

interface PayrollRecord {
  id: string;
  staff_name: string;
  position: string;
  salary: number;
  deductions: number;
  net_pay: number;
  status: "pending" | "paid";
  payment_date: string;
}

const mockPayroll: PayrollRecord[] = [
  {
    id: "1",
    staff_name: "John Okoro",
    position: "Manager",
    salary: 150000,
    deductions: 15000,
    net_pay: 135000,
    status: "paid",
    payment_date: "2024-02-10",
  },
  {
    id: "2",
    staff_name: "Chioma Eze",
    position: "Front Desk",
    salary: 80000,
    deductions: 8000,
    net_pay: 72000,
    status: "paid",
    payment_date: "2024-02-10",
  },
  {
    id: "3",
    staff_name: "Tunde Adeyemi",
    position: "Chef",
    salary: 120000,
    deductions: 12000,
    net_pay: 108000,
    status: "pending",
    payment_date: "2024-02-28",
  },
  {
    id: "4",
    staff_name: "Grace Obi",
    position: "Housekeeper",
    salary: 60000,
    deductions: 6000,
    net_pay: 54000,
    status: "pending",
    payment_date: "2024-02-28",
  },
];

export default function PayrollPage() {
  const columns: Column<PayrollRecord>[] = [
    {
      key: "staff_name",
      label: "Staff Name",
      sortable: true,
      searchable: true,
    },
    { key: "position", label: "Position" },
    {
      key: "salary",
      label: "Salary",
      sortable: true,
      render: (v) => `₦${v.toLocaleString()}`,
    },
    {
      key: "deductions",
      label: "Deductions",
      render: (v) => `₦${v.toLocaleString()}`,
    },
    {
      key: "net_pay",
      label: "Net Pay",
      render: (v) => (
        <span className="font-semibold">₦{v.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (v) => (
        <span
          className={`px-2 py-1 rounded text-xs ${v === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
        >
          {v}
        </span>
      ),
    },
  ];

  const filters = [
    {
      key: "position",
      label: "Position",
      options: [
        { value: "Manager", label: "Manager" },
        { value: "Front Desk", label: "Front Desk" },
        { value: "Chef", label: "Chef" },
        { value: "Housekeeper", label: "Housekeeper" },
      ],
    },
    {
      key: "status",
      label: "Payment Status",
      options: [
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Payroll Management
        </h1>
        <p className="text-slate-600 mt-2">
          Manage staff salaries and payments
        </p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockPayroll}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search payroll..."
          filters={filters}
          mobileColumns={["staff_name", "net_pay", "status"]}
        />
      </div>
    </div>
  );
}
