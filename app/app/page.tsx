'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockOrganization, mockLocation, mockRooms, mockReservations } from '@/lib/mock-data'

// Room status colors
const statusColors: Record<string, string> = {
  clean: 'bg-green-100 text-green-800',
  dirty: 'bg-yellow-100 text-yellow-800',
  maintenance: 'bg-red-100 text-red-800',
  occupied: 'bg-blue-100 text-blue-800',
}

export default function DashboardPage() {
  const [selectedLocation] = useState(mockLocation)

  // Calculate room statistics
  const roomStats = {
    total: mockRooms.length,
    occupied: mockRooms.filter((r) => r.status === 'occupied').length,
    clean: mockRooms.filter((r) => r.status === 'clean').length,
    dirty: mockRooms.filter((r) => r.status === 'dirty').length,
    maintenance: mockRooms.filter((r) => r.status === 'maintenance').length,
  }

  const occupancyRate = Math.round((roomStats.occupied / roomStats.total) * 100)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">
            <span className="text-blue-600">Room</span>mend Dashboard
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Mock Data Mode</span>
            <Link href="/">
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {mockOrganization.name}
          </h1>
          <p className="text-slate-600">
            {selectedLocation.name} • {selectedLocation.city}, {selectedLocation.state}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{occupancyRate}%</div>
              <p className="text-xs text-slate-500 mt-1">
                {roomStats.occupied} of {roomStats.total} rooms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Today's Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">₦165,000</div>
              <p className="text-xs text-slate-500 mt-1">From {mockReservations.length} active reservations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">3</div>
              <p className="text-xs text-slate-500 mt-1">Housekeeping items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{mockReservations.length}</div>
              <p className="text-xs text-slate-500 mt-1">Currently checked in</p>
            </CardContent>
          </Card>
        </div>

        {/* Room Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Room Status Overview</CardTitle>
              <CardDescription>Current status of all {roomStats.total} rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">{roomStats.occupied}</div>
                  <div className="text-sm text-blue-800 mt-1">Occupied</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-3xl font-bold text-green-600">{roomStats.clean}</div>
                  <div className="text-sm text-green-800 mt-1">Clean</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600">{roomStats.dirty}</div>
                  <div className="text-sm text-yellow-800 mt-1">Dirty</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="text-3xl font-bold text-red-600">{roomStats.maintenance}</div>
                  <div className="text-sm text-red-800 mt-1">Maintenance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/app/reservations/new">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  ➕ New Reservation
                </Button>
              </Link>
              <Link href="/app/guests">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  👥 Manage Guests
                </Button>
              </Link>
              <Link href="/app/rooms">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  🏨 View All Rooms
                </Button>
              </Link>
              <Link href="/app/orders">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  🍽️ POS Orders
                </Button>
              </Link>
              <Link href="/app/housekeeping">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  🧹 Housekeeping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reservations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>Latest bookings and check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Room {res.room_id}</div>
                    <div className="text-sm text-slate-600">
                      {res.check_in_date} to {res.check_out_date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900">₦{res.total_price_naira.toLocaleString()}</div>
                    <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${
                      res.status === 'checked_in' ? 'bg-blue-100 text-blue-800' :
                      res.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
