'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DataTable, type Column } from '@/components/data-table'
import { mockRooms } from '@/lib/mock-data'
import { useAuth } from '@/lib/auth-context'

type OutOfOrderRoom = {
  room_number: string
  room_type: string
  reason: string
  reported_date: string
  expected_completion: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed'
}

const mockOutOfOrder: OutOfOrderRoom[] = mockRooms
  .filter(r => r.status === 'maintenance')
  .map(room => ({
    room_number: room.room_number,
    room_type: room.room_type,
    reason: 'Plumbing issues',
    reported_date: '2025-01-15',
    expected_completion: '2025-01-20',
    priority: 'high' as const,
    status: 'in_progress' as const,
  }))

export default function OutOfOrderPage() {
  const { role } = useAuth()
  const isAdmin = role?.name === 'Admin'

  if (!isAdmin) {
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

      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
          <p className="text-slate-600">Only administrators can access Out of Order management</p>
        </div>
      </div>
    </div>
  }

  const columns: Column<OutOfOrderRoom>[] = [
    { key: 'room_number', label: 'Room Number', sortable: true, searchable: true },
    { key: 'room_type', label: 'Room Type', sortable: true },
    { key: 'reason', label: 'Reason', searchable: true },
    { key: 'reported_date', label: 'Reported Date', sortable: true },
    { key: 'expected_completion', label: 'Expected Completion', sortable: true },
    {
      key: 'priority',
      label: 'Priority',
      render: (v) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            v === 'high'
              ? 'bg-red-100 text-red-800'
              : v === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {v}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (v) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            v === 'completed'
              ? 'bg-green-100 text-green-800'
              : v === 'in_progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          {v.replace('_', ' ')}
        </span>
      ),
    },
  ]

  const filters = [
    {
      key: 'priority',
      label: 'Priority',
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Out of Order Rooms</h1>
          <p className="text-slate-600 mt-2">Rooms unavailable due to maintenance or repairs</p>
        </div>
        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
          Admin Only
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Total Out of Order</div>
          <div className="text-2xl font-bold text-red-600">{mockOutOfOrder.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">High Priority</div>
          <div className="text-2xl font-bold text-orange-600">
            {mockOutOfOrder.filter(r => r.priority === 'high').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {mockOutOfOrder.filter(r => r.status === 'in_progress').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-slate-600">
            {mockOutOfOrder.filter(r => r.status === 'pending').length}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable
          data={mockOutOfOrder}
          columns={columns}
          itemsPerPage={10}
          searchPlaceholder="Search out of order rooms..."
          filters={filters}
          mobileColumns={['room_number', 'priority', 'status']}
        />
      </div>
    </div>
  )
}
