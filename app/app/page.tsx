'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockOrganization, mockLocation, mockRooms, mockReservations } from '@/lib/mock-data'

export default function DashboardPage() {
  const [selectedLocation] = useState(mockLocation)

  const roomStats = {
    total: mockRooms.length,
    occupied: mockRooms.filter((r) => r.status === 'occupied').length,
    clean: mockRooms.filter((r) => r.status === 'clean').length,
    dirty: mockRooms.filter((r) => r.status === 'dirty').length,
    maintenance: mockRooms.filter((r) => r.status === 'maintenance').length,
  }

  const occupancyRate = Math.round((roomStats.occupied / roomStats.total) * 100)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{mockOrganization.name}</h1>
        <p className="text-slate-600 mt-2">
          {selectedLocation.name} • {selectedLocation.city}, {selectedLocation.state}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Occupancy Rate</div>
          <div className="text-3xl font-bold text-slate-900">{occupancyRate}%</div>
          <p className="text-xs text-slate-500 mt-2">{roomStats.occupied} of {roomStats.total} rooms</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Today's Revenue</div>
          <div className="text-3xl font-bold text-slate-900">₦165,000</div>
          <p className="text-xs text-slate-500 mt-2">From {mockReservations.length} active reservations</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Pending Tasks</div>
          <div className="text-3xl font-bold text-slate-900">3</div>
          <p className="text-xs text-slate-500 mt-2">Housekeeping items</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="text-sm text-slate-600 mb-2">Active Guests</div>
          <div className="text-3xl font-bold text-slate-900">{mockReservations.length}</div>
          <p className="text-xs text-slate-500 mt-2">Currently checked in</p>
        </div>
      </div>

      {/* Room Status Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Room Status Overview</h2>
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
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/app/reservations">
              <button className="w-full px-4 py-2 text-left border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm">
                ➕ New Reservation
              </button>
            </Link>
            <Link href="/app/guests">
              <button className="w-full px-4 py-2 text-left border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm">
                👥 Manage Guests
              </button>
            </Link>
            <Link href="/app/rooms">
              <button className="w-full px-4 py-2 text-left border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm">
                🏨 View All Rooms
              </button>
            </Link>
            <Link href="/app/orders">
              <button className="w-full px-4 py-2 text-left border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm">
                🍽️ POS Orders
              </button>
            </Link>
            <Link href="/app/housekeeping">
              <button className="w-full px-4 py-2 text-left border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm">
                🧹 Housekeeping
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Reservations</h2>
        <div className="space-y-4">
          {mockReservations.map((res) => (
            <div key={res.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50">
              <div className="flex-1">
                <div className="font-medium text-slate-900">Room {res.room_id}</div>
                <div className="text-sm text-slate-600">{res.check_in_date} to {res.check_out_date}</div>
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
      </div>
    </div>
  )
}
