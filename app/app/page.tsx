'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { mockOrganization, mockLocation, mockRooms, mockReservations } from '@/lib/mock-data'

export default function DashboardPage() {
  const [selectedLocation] = useState(mockLocation)
  const { role, hasPermission } = useAuth()

  // Role-based permission checks for 8+ departments
  const isAdmin = role?.name === 'Admin'
  const isManager = role?.name === 'Manager'
  const isFrontDesk = role?.name === 'Front Desk'
  const isHousekeeping = role?.name === 'Housekeeping'
  const isKitchen = role?.name === 'Kitchen'
  const isAccounting = role?.name === 'Accounting'
  const isMarketing = role?.name === 'Marketing'
  const isHR = role?.name === 'HR'

  // Permission-based visibility for all departments
  const canViewFinancials = isAdmin || isManager || isAccounting || hasPermission('view_reports')
  const canViewReservations = isAdmin || isManager || isFrontDesk || hasPermission('manage_reservations')
  const canViewHousekeeping = isAdmin || isManager || isHousekeeping || hasPermission('manage_tasks')
  const canViewRestaurant = isAdmin || isManager || isKitchen || hasPermission('manage_orders')
  const canViewInventory = isAdmin || isManager || hasPermission('manage_inventory')
  const canViewStaff = isAdmin || isManager || isHR || hasPermission('manage_staff')
  const canViewOrganizations = isAdmin || isMarketing || hasPermission('manage_organizations')

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{mockOrganization.name}</h1>
        <p className="text-slate-600 mt-2">
          {selectedLocation.name} • {selectedLocation.city}, {selectedLocation.state}
        </p>
        <p className="text-sm text-slate-500 mt-1">Role: <span className="font-semibold text-slate-700">{role?.name || 'Guest'}</span></p>
      </div>

      {/* Operations Overview - All Users */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Operations Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Occupancy Rate - All */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
            <div className="text-sm text-slate-600 mb-2">Occupancy Rate</div>
            <div className="text-3xl font-bold text-blue-600">{occupancyRate}%</div>
            <p className="text-xs text-slate-500 mt-2">{roomStats.occupied} of {roomStats.total} rooms</p>
          </div>

          {/* Revenue - Finance & Management */}
          {canViewFinancials && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Today's Revenue</div>
              <div className="text-3xl font-bold text-green-600">₦165,000</div>
              <p className="text-xs text-slate-500 mt-2">From {mockReservations.length} reservations</p>
            </div>
          )}

          {/* Housekeeping Tasks - Operations & Housekeeping */}
          {canViewHousekeeping && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Pending Tasks</div>
              <div className="text-3xl font-bold text-orange-600">8</div>
              <p className="text-xs text-slate-500 mt-2">Housekeeping items</p>
            </div>
          )}

          {/* Active Guests - Front Desk */}
          {canViewReservations && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Active Guests</div>
              <div className="text-3xl font-bold text-purple-600">{mockReservations.length}</div>
              <p className="text-xs text-slate-500 mt-2">Currently checked in</p>
            </div>
          )}

          {/* Restaurant Orders - Kitchen */}
          {canViewRestaurant && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Orders Today</div>
              <div className="text-3xl font-bold text-red-600">12</div>
              <p className="text-xs text-slate-500 mt-2">5 pending, 7 completed</p>
            </div>
          )}

          {/* Inventory Items - Operations */}
          {canViewInventory && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Low Stock Items</div>
              <div className="text-3xl font-bold text-yellow-600">3</div>
              <p className="text-xs text-slate-500 mt-2">Requires reordering</p>
            </div>
          )}

          {/* Staff On Duty - HR & Management */}
          {canViewStaff && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Staff On Duty</div>
              <div className="text-3xl font-bold text-indigo-600">14</div>
              <p className="text-xs text-slate-500 mt-2">Out of 25 total</p>
            </div>
          )}

          {/* Organizations - Marketing */}
          {canViewOrganizations && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="text-sm text-slate-600 mb-2">Active Organizations</div>
              <div className="text-3xl font-bold text-pink-600">7</div>
              <p className="text-xs text-slate-500 mt-2">Government, NGO, Corporate</p>
            </div>
          )}
        </div>
      </section>

      {/* Room Status Overview */}
      {(canViewReservations || canViewHousekeeping) && (
        <section className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Room Status Overview</h2>
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
        </section>
      )}

      {/* Department-Specific Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Quick Actions by Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Front Desk */}
          {(canViewReservations || isFrontDesk) && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Front Desk</h3>
              <div className="space-y-2">
                <Link href="/dashboard/reservations">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    📅 New Reservation
                  </button>
                </Link>
                <Link href="/dashboard/guests">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    👥 Check-in Guest
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Housekeeping */}
          {canViewHousekeeping && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Housekeeping</h3>
              <div className="space-y-2">
                <Link href="/dashboard/housekeeping">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    🧹 View Tasks
                  </button>
                </Link>
                <Link href="/dashboard/maintenance">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    🔧 Maintenance
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Restaurant & Kitchen */}
          {canViewRestaurant && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Restaurant</h3>
              <div className="space-y-2">
                <Link href="/dashboard/orders">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    🍽️ Order Queue
                  </button>
                </Link>
                <Link href="/dashboard/menu">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    📋 Menu
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Finance */}
          {canViewFinancials && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Finance</h3>
              <div className="space-y-2">
                <Link href="/dashboard/accounting">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    💳 Transactions
                  </button>
                </Link>
                <Link href="/dashboard/billing">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    🧾 Billing
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Inventory */}
          {canViewInventory && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Inventory</h3>
              <div className="space-y-2">
                <Link href="/dashboard/inventory">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    📦 Stock
                  </button>
                </Link>
                <Link href="/dashboard/suppliers">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    🚚 Suppliers
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Human Resources */}
          {canViewStaff && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Human Resources</h3>
              <div className="space-y-2">
                <Link href="/dashboard/staff">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    👨‍💼 Staff
                  </button>
                </Link>
                <Link href="/dashboard/payroll">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    💰 Payroll
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Marketing */}
          {canViewOrganizations && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Marketing</h3>
              <div className="space-y-2">
                <Link href="/dashboard/organizations">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    🏢 Organizations
                  </button>
                </Link>
                <Link href="/dashboard/marketing">
                  <button className="w-full px-3 py-2 text-left border border-slate-300 rounded text-sm hover:bg-slate-50 transition">
                    📢 Campaigns
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Reservations - Only for authorized staff */}
      {canViewReservations && (
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
      )}
    </div>
  )
}
