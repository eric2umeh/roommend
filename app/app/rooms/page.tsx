'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { mockRooms, mockRoomTypes } from '@/lib/mock-data'

const statusColors: Record<string, string> = {
  clean: 'bg-green-100 text-green-800',
  dirty: 'bg-yellow-100 text-yellow-800',
  maintenance: 'bg-red-100 text-red-800',
  occupied: 'bg-blue-100 text-blue-800',
}

export default function RoomsPage() {
  return (
    <ProtectedRoute requiredPermissions={['manage_rooms']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Rooms & Inventory</h1>
            <p className="text-slate-600 mt-1">Manage room types and room instances</p>
          </div>
        </div>

        {/* Room Types */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Room Types</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {mockRoomTypes.map((rt) => (
              <Card key={rt.id}>
                <CardHeader>
                  <CardTitle>{rt.name}</CardTitle>
                  <CardDescription>Capacity: {rt.capacity} guests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">₦{rt.base_price_naira.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">per night</div>
                  </div>
                  <div className="text-sm text-slate-600">{rt.description}</div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">All Rooms</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {mockRooms.map((room) => (
              <Card key={room.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Room {room.room_number}</CardTitle>
                  <CardDescription>Floor {room.floor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`px-3 py-1 rounded text-xs font-medium text-center ${statusColors[room.status]}`}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
