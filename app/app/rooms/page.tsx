'use client'

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
}

export default function RoomsPage() {
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
        />
      </div>
    </div>
  )
}
