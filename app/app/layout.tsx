'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'

const SIDEBAR_MENU = [
  // Core Operations
  { label: 'Dashboard', href: '/app', icon: '📊', permissions: [] },
  { label: 'Reservations', href: '/app/reservations', icon: '📅', permissions: ['manage_reservations'] },
  { label: 'Rooms', href: '/app/rooms', icon: '🏨', permissions: ['manage_rooms'] },
  { label: 'Guests', href: '/app/guests', icon: '👥', permissions: ['view_guests'] },
  
  // Restaurant & Food Service
  { label: 'Restaurant Orders', href: '/app/orders', icon: '🍽️', permissions: ['manage_orders'] },
  { label: 'Menu', href: '/app/menu', icon: '📋', permissions: ['manage_menu'] },
  
  // Inventory & Supplies
  { label: 'Inventory', href: '/app/inventory', icon: '📦', permissions: ['manage_inventory'] },
  { label: 'Suppliers', href: '/app/suppliers', icon: '🚚', permissions: ['manage_suppliers'] },
  
  // Housekeeping & Maintenance
  { label: 'Housekeeping', href: '/app/housekeeping', icon: '🧹', permissions: ['manage_tasks'] },
  { label: 'Maintenance', href: '/app/maintenance', icon: '🔧', permissions: ['manage_maintenance'] },
  
  // Human Resources
  { label: 'Staff', href: '/app/staff', icon: '👨‍💼', permissions: ['manage_staff'] },
  { label: 'Payroll', href: '/app/payroll', icon: '💰', permissions: ['manage_payroll'] },
  { label: 'Attendance', href: '/app/attendance', icon: '📍', permissions: ['manage_attendance'] },
  
  // Finance & Accounting
  { label: 'Accounting', href: '/app/accounting', icon: '💳', permissions: ['manage_accounting'] },
  { label: 'Billing', href: '/app/billing', icon: '🧾', permissions: ['manage_billing'] },
  
  // Marketing & Organizations
  { label: 'Marketing', href: '/app/marketing', icon: '📢', permissions: ['manage_marketing'] },
  { label: 'Organizations', href: '/app/organizations', icon: '🏢', permissions: ['manage_organizations'] },
  
  // Analytics & Reports
  { label: 'Reports', href: '/app/reports', icon: '📈', permissions: ['view_reports'] },
  { label: 'Analytics', href: '/app/analytics', icon: '📉', permissions: ['view_analytics'] },
  
  // Admin
  { label: 'Settings', href: '/app/settings', icon: '⚙️', permissions: ['access_settings'] },
  { label: 'Roles & Permissions', href: '/app/settings/roles', icon: '🔐', permissions: ['manage_roles'] },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, role, isLoggedIn, isLoading, logout, hasAnyPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log('[v0] Auth check: not logged in, redirecting to login')
      router.push('/login')
    }
  }, [isLoggedIn, isLoading, router])

  if (!isLoggedIn || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏨</div>
          <p className="text-slate-600">Loading Roommend...</p>
        </div>
      </div>
    )
  }

  const visibleMenuItems = SIDEBAR_MENU.filter(
    (item) => item.permissions.length === 0 || hasAnyPermission(item.permissions)
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 hidden md:flex flex-col border-r border-slate-800`}>
        <div className="p-4 border-b border-slate-800">
          <Link href="/app" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🏨</span>
            {sidebarOpen && <span>Roommend</span>}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          {sidebarOpen && (
            <div className="text-xs text-slate-400 truncate">
              <div className="font-semibold text-white truncate">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-slate-500 truncate">{role?.name}</div>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition"
          >
            {sidebarOpen ? 'Sign Out' : '⬅️'}
          </button>
        </div>

        <div className="p-2 border-t border-slate-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              >
                {sidebarOpen ? '✕' : '☰'}
              </button>
              <h1 className="text-xl font-semibold text-slate-900">
                {user?.first_name} {user?.last_name}
              </h1>
            </div>
            <div className="text-sm text-slate-600 flex items-center gap-2">
              <span className="hidden sm:inline">Role: {role?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
