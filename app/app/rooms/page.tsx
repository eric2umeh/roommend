'use client'

import { mockRooms, mockRoomTypes } from '@/lib/mock-data'

const statusColors: Record<string, string> = {
  clean: 'bg-green-100 text-green-800',
  dirty: 'bg-yellow-100 text-yellow-800',
  maintenance: 'bg-red-100 text-red-800',
  occupied: 'bg-blue-100 text-blue-800',
}

export default function RoomsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Rooms & Inventory</h1>

      {/* Room Types */}
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

      {/* Room Instances */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">All Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Room {room.room_number}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[room.status]}`}>
                  {room.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">Floor {room.floor}</p>
              {room.notes && <p className="text-xs text-slate-500 mt-2">{room.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
