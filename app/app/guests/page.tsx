'use client'

import { mockGuests } from '@/lib/mock-data'
import { DataTable, type Column } from '@/components/data-table'
import { useAuth } from '@/lib/auth-context'

interface GuestWithDisplay {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  total_stays: number
  total_spent_naira: number
  is_vip: boolean
}

export default function GuestsPage() {
  const { hasPermission } = useAuth()
  // Only show financial data to admins and managers
  const canViewFinancials = hasPermission('view_reports') || hasPermission('manage_guests')

  const columns: Column<GuestWithDisplay>[] = [
    {
      key: 'first_name',
      label: 'First Name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'last_name',
      label: 'Last Name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      searchable: true,
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
    },
    {
      key: 'total_stays',
      label: 'Total Stays',
      sortable: true,
      render: (value) => value,
    },
    ...(canViewFinancials
      ? [
          {
            key: 'total_spent_naira' as const,
            label: 'Total Spent',
            sortable: true,
            render: (value: number) => `₦${value.toLocaleString()}`,
          },
        ]
      : []),
    {
      key: 'is_vip',
      label: 'VIP',
      sortable: true,
      render: (value) => (value ? '⭐ VIP' : '-'),
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Guest Management</h1>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">All Guests ({mockGuests.length})</h2>
        <DataTable
          data={mockGuests as GuestWithDisplay[]}
          columns={columns}
          itemsPerPage={20}
          searchPlaceholder="Search by name, email, or phone..."
          mobileColumns={['first_name', 'email', 'total_stays']}
        />
      </div>
    </div>
  )
}
