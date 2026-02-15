'use client'

import { DataTable, type Column } from '@/components/data-table'

interface GuestBilling {
  id: string
  guest_name: string
  room: string
  check_in: string
  check_out: string
  room_charge: number
  extras: number
  total: number
  status: 'pending' | 'paid'
}

const mockBilling: GuestBilling[] = [
  { id: '1', guest_name: 'Mr. Ahmad Hassan', room: '101', check_in: '2024-02-08', check_out: '2024-02-11', room_charge: 165000, extras: 8500, total: 173500, status: 'paid' },
  { id: '2', guest_name: 'Mrs. Aisha Mohammed', room: '205', check_in: '2024-02-10', check_out: '2024-02-15', room_charge: 275000, extras: 12000, total: 287000, status: 'pending' },
  { id: '3', guest_name: 'Dr. Emeka Okafor', room: '301', check_in: '2024-02-01', check_out: '2024-02-11', room_charge: 550000, extras: 25000, total: 575000, status: 'paid' },
  { id: '4', guest_name: 'Ms. Folake Adeyemi', room: '102', check_in: '2024-02-09', check_out: '2024-02-13', room_charge: 220000, extras: 5500, total: 225500, status: 'pending' },
]

export default function BillingPage() {
  const columns: Column<GuestBilling>[] = [
    { key: 'guest_name', label: 'Guest Name', sortable: true, searchable: true },
    { key: 'room', label: 'Room', sortable: true },
    { key: 'check_in', label: 'Check-in', sortable: true },
    { key: 'check_out', label: 'Check-out', sortable: true },
    { key: 'total', label: 'Total Amount', sortable: true, render: (v) => <span className="font-semibold">₦{v.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded text-xs ${v === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{v}</span> },
  ]

  const filters = [
    {
      key: 'status',
      label: 'Payment Status',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Guest Billing</h1>
        <p className="text-slate-600 mt-2">Manage guest invoices and payments</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable data={mockBilling} columns={columns} itemsPerPage={10} searchPlaceholder="Search guest billing..." filters={filters} mobileColumns={['guest_name', 'total', 'status']} />
      </div>
    </div>
  )
}
