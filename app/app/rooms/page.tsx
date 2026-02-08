'use client'

import { useState } from 'react'
import { mockRooms, mockRoomTypes } from '@/lib/mock-data'
import { DataTable, type Column } from '@/components/data-table'

const statusColors: Record<string, string> = {
  clean: 'bg-green-100 text-green-800',
  dirty: 'bg-yellow-100 text-yellow-800',
  maintenance: 'bg-red-100 text-red-800',
  occupied: 'bg-blue-100 text-blue-800',
}

interface RoomWithType {
  id: string
  room_number: string
  floor: number
  status: string
  notes?: string
  type_name?: string
  base_price_naira?: number
  room_type_id?: string
}

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomWithType | null>(null)
  // Enrich rooms with type info
  const enrichedRooms: RoomWithType[] = mockRooms.map((room) => {
    const type = mockRoomTypes.find((t) => t.id === (room as any).room_type_id)
    return {
      ...room,
      type_name: type?.name || 'Unknown',
      base_price_naira: type?.base_price_naira || 0,
    }
  })

  const columns: Column<RoomWithType>[] = [
    {
      key: 'room_number',
      label: 'Room Number',
      sortable: true,
      searchable: true,
    },
    {
      key: 'floor',
      label: 'Floor',
      sortable: true,
      render: (value) => `Floor ${value}`,
    },
    {
      key: 'type_name',
      label: 'Type',
      sortable: true,
    },
    {
      key: 'base_price_naira',
      label: 'Price/Night',
      render: (value) => `₦${value.toLocaleString()}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[value]}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (value) => value || '-',
    },
  ]

  const floorOptions = Array.from({ length: 4 }).map((_, i) => ({
    label: `Floor ${i}`,
    value: String(i),
  }))

  const priceOptions = [
    { label: 'Budget (₦82,500)', value: '82500' },
    { label: 'Mid-Range (₦165,000)', value: '165000' },
    { label: 'Luxury (₦330,000)', value: '330000' },
  ]

  const filters = [
    {
      label: 'Filter by Floor',
      key: 'floor',
      options: floorOptions,
    },
    {
      label: 'Filter by Status',
      key: 'status',
      options: [
        { label: 'Clean', value: 'clean' },
        { label: 'Dirty', value: 'dirty' },
        { label: 'Occupied', value: 'occupied' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
    },
    {
      label: 'Filter by Price',
      key: 'base_price_naira',
      options: priceOptions,
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Rooms & Inventory</h1>

      {/* Room Types Summary */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Room Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRoomTypes.map((type) => (
            <div key={type.id} className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">{type.name}</h3>
              <p className="text-sm text-slate-600 mb-4">Capacity: {type.capacity} guests</p>
              <div className="text-xl font-bold text-blue-600">₦{type.base_price_naira.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">per night</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Rooms Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">All Rooms ({enrichedRooms.length})</h2>
        <DataTable
          data={enrichedRooms}
          columns={columns}
          itemsPerPage={20}
          searchPlaceholder="Search by room number..."
          filters={filters}
          onView={(room) => setSelectedRoom(room)}
          viewButtonText="View"
        />
      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-96 overflow-y-auto">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Room {selectedRoom.room_number}</h2>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-slate-500 hover:text-slate-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Room Type</label>
                <p className="text-slate-900">{selectedRoom.type_name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Floor</label>
                <p className="text-slate-900">Floor {selectedRoom.floor}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Price per Night</label>
                <p className="text-slate-900 text-lg font-semibold text-blue-600">
                  ₦{selectedRoom.base_price_naira?.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Status</label>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full font-medium capitalize mt-1 ${
                    statusColors[selectedRoom.status]
                  }`}
                >
                  {selectedRoom.status}
                </span>
              </div>

              {selectedRoom.notes && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Notes</label>
                  <p className="text-slate-900">{selectedRoom.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex gap-2">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 font-medium"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Edit Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
