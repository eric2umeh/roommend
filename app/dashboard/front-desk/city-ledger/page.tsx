'use client'

import { useState } from 'react'
import { DataTable, type Column } from '@/app/components/data-table'

type CityLedgerAccount = {
  id: number
  company_name: string
  contact_person: string
  city: string
  hotel_representative: string
  phone_number: string
  credit_limit: number
  balance: number
  status: 'active' | 'inactive'
}

const mockCityLedger: CityLedgerAccount[] = [
  {
    id: 1,
    company_name: 'Nigerian National Petroleum Corporation',
    contact_person: 'Adewale Johnson',
    city: 'Abuja',
    hotel_representative: 'Sarah Ahmed',
    phone_number: '+234-803-123-4567',
    credit_limit: 5000000,
    balance: 1250000,
    status: 'active',
  },
  {
    id: 2,
    company_name: 'Booking.com',
    contact_person: 'David Chen',
    city: 'Lagos',
    hotel_representative: 'Ibrahim Musa',
    phone_number: '+234-805-987-6543',
    credit_limit: 3000000,
    balance: 0,
    status: 'active',
  },
  {
    id: 3,
    company_name: 'MTN Nigeria',
    contact_person: 'Grace Okonkwo',
    city: 'Port Harcourt',
    hotel_representative: 'Emmanuel Eze',
    phone_number: '+234-806-456-7890',
    credit_limit: 2000000,
    balance: 850000,
    status: 'active',
  },
]

export default function CityLedgerPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const columns: Column<CityLedgerAccount>[] = [
    { key: 'company_name', label: 'Company Name', sortable: true, searchable: true },
    { key: 'contact_person', label: 'Contact Person', searchable: true },
    { key: 'city', label: 'City', sortable: true },
    { key: 'hotel_representative', label: 'Hotel Rep', sortable: true },
    { key: 'phone_number', label: 'Phone Number' },
    {
      key: 'credit_limit',
      label: 'Credit Limit',
      sortable: true,
      render: (v) => `₦${v.toLocaleString()}`,
    },
    {
      key: 'balance',
      label: 'Balance',
      sortable: true,
      render: (v) => (
        <span className={`font-semibold ${v > 0 ? 'text-orange-600' : 'text-green-600'}`}>
          ₦{v.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (v) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            v === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
          }`}
        >
          {v}
        </span>
      ),
    },
  ]

  const filters = [
    {
      key: 'city',
      label: 'City',
      options: [
        { value: 'Abuja', label: 'Abuja' },
        { value: 'Lagos', label: 'Lagos' },
        { value: 'Port Harcourt', label: 'Port Harcourt' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">City Ledger</h1>
          <p className="text-slate-600 mt-2 max-w-3xl">
            City Ledger accounts are used for credit sales, typically known as "Direct Billing" accounts. 
            These include corporate accounts, travel agents, reservation websites, and other organizations 
            that maintain credit arrangements with the hotel for room bookings and services.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
        >
          + Create New Account
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Accounts</div>
          <div className="text-2xl font-bold text-slate-900">{mockCityLedger.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Active Accounts</div>
          <div className="text-2xl font-bold text-green-600">
            {mockCityLedger.filter(a => a.status === 'active').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Credit</div>
          <div className="text-2xl font-bold text-blue-600">
            ₦{mockCityLedger.reduce((sum, a) => sum + a.credit_limit, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Outstanding Balance</div>
          <div className="text-2xl font-bold text-orange-600">
            ₦{mockCityLedger.reduce((sum, a) => sum + a.balance, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockCityLedger}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search city ledger accounts..."
          filters={filters}
          mobileColumns={['company_name', 'balance', 'status']}
        />
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New City Ledger Account</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-slate-600 hover:text-slate-900 text-2xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hotel Representative <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Credit Limit (₦) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('City Ledger account created!')
                    setShowCreateForm(false)
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
