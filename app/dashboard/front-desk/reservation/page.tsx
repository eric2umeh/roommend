'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/toast-provider'
import { DataTable, type Column } from '@/components/data-table'

interface Reservation {
  id: string
  reservation_number: string
  guest_name: string
  room_number: string
  check_in: string
  check_out: string
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  total_amount: number
  nights: number
  adults: number
  children: number
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    reservation_number: 'RES-001',
    guest_name: 'Chukwu Okonkwo',
    room_number: '101',
    check_in: '2025-02-15',
    check_out: '2025-02-18',
    status: 'confirmed',
    total_amount: 450000,
    nights: 3,
    adults: 2,
    children: 1,
  },
  {
    id: '2',
    reservation_number: 'RES-002',
    guest_name: 'Amara Obi',
    room_number: '205',
    check_in: '2025-02-16',
    check_out: '2025-02-20',
    status: 'confirmed',
    total_amount: 600000,
    nights: 4,
    adults: 1,
    children: 0,
  },
  {
    id: '3',
    reservation_number: 'RES-003',
    guest_name: 'David Kalu',
    room_number: '310',
    check_in: '2025-02-14',
    check_out: '2025-02-17',
    status: 'checked_in',
    total_amount: 525000,
    nights: 3,
    adults: 2,
    children: 2,
  },
]

export default function ReservationPage() {
  const { hasPermission } = useAuth()
  const { showToast } = useToast()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    guestName: '',
    checkIn: '',
    checkOut: '',
    roomNumber: '',
    adults: 1,
    children: 0,
  })

  const canCreateReservation = hasPermission('manage_reservations')

  const columns: Column<Reservation>[] = [
    { key: 'reservation_number', label: 'Reservation #', sortable: true, searchable: true },
    { key: 'guest_name', label: 'Guest Name', sortable: true, searchable: true },
    { key: 'room_number', label: 'Room', sortable: true },
    { key: 'check_in', label: 'Check-in', sortable: true },
    { key: 'check_out', label: 'Check-out', sortable: true },
    { key: 'nights', label: 'Nights', sortable: true, render: (v) => `${v}N` },
    { key: 'total_amount', label: 'Total', sortable: true, render: (v) => `₦${v.toLocaleString()}` },
    {
      key: 'status',
      label: 'Status',
      render: (v) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          v === 'confirmed' ? 'bg-blue-100 text-blue-800' :
          v === 'checked_in' ? 'bg-green-100 text-green-800' :
          v === 'checked_out' ? 'bg-slate-100 text-slate-800' :
          'bg-red-100 text-red-800'
        }`}>
          {v.replace('_', ' ')}
        </span>
      ),
    },
  ]

  const filters = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'checked_in', label: 'Checked In' },
        { value: 'checked_out', label: 'Checked Out' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
  ]

  const handleCreateReservation = () => {
    if (!formData.guestName || !formData.checkIn || !formData.checkOut || !formData.roomNumber) {
      showToast('Please fill in all required fields', 'error')
      return
    }
    showToast('Reservation created successfully!', 'success')
    setShowCreateForm(false)
    setFormData({
      guestName: '',
      checkIn: '',
      checkOut: '',
      roomNumber: '',
      adults: 1,
      children: 0,
    })
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/front-desk"
        className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
      >
        <span>←</span>
        <span>Back to Front Desk</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reservations</h1>
          <p className="text-slate-600 mt-2">Manage guest reservations and bookings</p>
        </div>
        {canCreateReservation && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {showCreateForm ? 'Cancel' : '+ New Reservation'}
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Reservations</div>
          <div className="text-2xl font-bold text-blue-600">{mockReservations.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">
            {mockReservations.filter(r => r.status === 'confirmed').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Checked In</div>
          <div className="text-2xl font-bold text-blue-600">
            {mockReservations.filter(r => r.status === 'checked_in').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-green-600">
            ₦{mockReservations.reduce((sum, r) => sum + r.total_amount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Create Reservation Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Create New Reservation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Guest Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter guest name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Room Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Check-in Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Check-out Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Adults
              </label>
              <input
                type="number"
                min="1"
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Children
              </label>
              <input
                type="number"
                min="0"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreateReservation}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create Reservation
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reservations Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockReservations}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search reservations..."
          filters={filters}
          onView={(reservation) => {
            setSelectedReservation(reservation)
            setShowModal(true)
          }}
          viewButtonText="View"
          mobileColumns={['reservation_number', 'guest_name', 'status']}
        />
      </div>

      {/* Reservation Details Modal */}
      {showModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Reservation Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-600 hover:text-slate-900 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-slate-600 mb-1">Reservation Number</div>
                <div className="font-bold text-slate-900">{selectedReservation.reservation_number}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Guest Name</div>
                <div className="font-bold text-slate-900">{selectedReservation.guest_name}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Room</div>
                <div className="font-bold text-blue-600">{selectedReservation.room_number}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Status</div>
                <div className={`font-bold ${
                  selectedReservation.status === 'confirmed' ? 'text-blue-600' :
                  selectedReservation.status === 'checked_in' ? 'text-green-600' :
                  selectedReservation.status === 'checked_out' ? 'text-slate-600' :
                  'text-red-600'
                }`}>
                  {selectedReservation.status.replace('_', ' ')}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Check-in</div>
                <div className="font-semibold text-slate-900">{selectedReservation.check_in}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Check-out</div>
                <div className="font-semibold text-slate-900">{selectedReservation.check_out}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Nights</div>
                <div className="font-semibold text-slate-900">{selectedReservation.nights}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Guests</div>
                <div className="font-semibold text-slate-900">
                  {selectedReservation.adults} adults, {selectedReservation.children} children
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Total Amount</div>
                <div className="font-bold text-green-600">₦{selectedReservation.total_amount.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
