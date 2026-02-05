'use client'

import React from "react"

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const SIDEBAR_MENU = [
  {
    label: 'Dashboard',
    href: '/app',
    icon: '📊',
    permissions: [],
  },
  {
    label: 'Reservations',
    href: '/app/reservations',
    icon: '📅',
    permissions: ['manage_reservations', 'view_guests'],
  },
  {
    label: 'Rooms',
    href: '/app/rooms',
    icon: '🏨',
    permissions: ['manage_rooms'],
  },
  {
    label: 'Guests',
    href: '/app/guests',
    icon: '👥',
    permissions: ['view_guests', 'manage_guests'],
  },
  {
    label: 'Restaurant',
    href: '/app/orders',
    icon: '🍽️',
    permissions: ['manage_orders', 'manage_menu'],
  },
  {
    label: 'Inventory',
    href: '/app/inventory',
    icon: '📦',
    permissions: ['manage_inventory'],
  },
  {
    label: 'Housekeeping',
    href: '/app/housekeeping',
    icon: '🧹',
    permissions: ['manage_tasks'],
  },
  {
    label: 'Staff',
    href: '/app/staff',
    icon: '👨‍💼',
    permissions: ['manage_staff'],
  },
  {
    label: 'Reports',
    href: '/app/reports',
    icon: '📈',
    permissions: ['view_reports'],
  },
  {
    label: 'Settings',
    href: '/app/settings',
    icon: '⚙️',
    permissions: ['access_settings', 'manage_roles'],
  },
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, role, isLoggedIn, isLoading, logout, hasAnyPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, isLoading, router])

  if (!isLoggedIn || isLoading) {
    return null
  }

  const visibleMenuItems = SIDEBAR_MENU.filter(
    (item) => item.permissions.length === 0 || hasAnyPermission(item.permissions)
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 hidden md:flex flex-col border-r border-slate-800`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <Link href="/app" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🏨</span>
            {sidebarOpen && <span>Roommend</span>}
          </Link>
        </div>

        {/* Navigation Menu */}
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

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {sidebarOpen && (
            <div className="text-xs text-slate-400 truncate">
              <div className="font-semibold text-white truncate">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-slate-500 truncate">{role?.name}</div>
            </div>
          )}
          <Button
            onClick={logout}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm"
          >
            {sidebarOpen ? 'Sign Out' : '⬅️'}
          </Button>
        </div>

        {/* Toggle Sidebar */}
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
        {/* Top Bar */}
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
              <Button onClick={logout} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
