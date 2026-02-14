'use client'

import { useState } from 'react'
import { DataTable, type Column } from '@/app/components/data-table'
import { mockGuests } from '@/lib/mock-data'

export default function GuestDatabasePage() {
  const [selectedGuest, setSelectedGuest] = useState<typeof mockGuests[0] | null>(null)

  const columns: Column<typeof mockGuests[0]>[] = [
    { key: 'first_name', label: 'First Name', sortable: true, searchable: true },
    { key: 'last_name', label: 'Last Name', sortable: true, searchable: true },
    { key: 'email', label: 'Email', searchable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'nationality', label: 'Nationality' },
    { key: 'total_stays', label: 'Total Stays', sortable: true },
    { key: 'total_spent', label: 'Total Spent', sortable: true, render: (v) => `₦${v.toLocaleString()}` },
  ]

  const filters = [
    {
      key: 'nationality',
      label: 'Nationality',
      options: [
        { value: 'Nigerian', label: 'Nigerian' },
        { value: 'American', label: 'American' },
        { value: 'British', label: 'British' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Guest Database</h1>
        <p className="text-slate-600 mt-2">Complete history and profile of all guests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Guests</div>
          <div className="text-2xl font-bold text-slate-900">{mockGuests.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Frequent Guests</div>
          <div className="text-2xl font-bold text-blue-600">
            {mockGuests.filter(g => g.total_stays > 3).length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-green-600">
            ₦{mockGuests.reduce((sum, g) => sum + g.total_spent, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Avg Stay Value</div>
          <div className="text-2xl font-bold text-purple-600">
            ₦{Math.round(mockGuests.reduce((sum, g) => sum + g.total_spent, 0) / mockGuests.length).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockGuests}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search guests..."
          filters={filters}
          onView={(guest) => setSelectedGuest(guest)}
          viewButtonText="View History"
          mobileColumns={['first_name', 'email', 'total_stays']}
        />
      </div>

      {/* Guest History Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Guest History</h2>
              <button
                onClick={() => setSelectedGuest(null)}
                className="text-slate-600 hover:text-slate-900 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-600">Full Name</div>
                  <div className="font-semibold text-slate-900">
                    {selectedGuest.first_name} {selectedGuest.last_name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Email</div>
                  <div className="font-semibold text-slate-900">{selectedGuest.email}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Phone</div>
                  <div className="font-semibold text-slate-900">{selectedGuest.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Nationality</div>
                  <div className="font-semibold text-slate-900">{selectedGuest.nationality}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Total Stays</div>
                  <div className="font-semibold text-blue-600">{selectedGuest.total_stays}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Total Spent</div>
                  <div className="font-semibold text-green-600">
                    ₦{selectedGuest.total_spent.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Recent Stays</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Room 10{i}</div>
                        <div className="text-sm text-slate-600">2 nights</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">₦165,000</div>
                        <div className="text-sm text-slate-600">Jan {10 + i}, 2025</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
