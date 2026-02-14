'use client'

import { useState } from 'react'
import { DataTable, type Column } from '@/components/data-table'

type SubSection = 'orders' | 'menu'

const mockMenuItems = [
  { id: 1, name: 'Jollof Rice', category: 'Mains', price: 2500, availability: 'available' },
  { id: 2, name: 'Egusi Soup', category: 'Soups', price: 3000, availability: 'available' },
  { id: 3, name: 'Pounded Yam', category: 'Sides', price: 1500, availability: 'available' },
]

const mockOrders = [
  { id: 1, order_number: 'ORD-001', guest_name: 'John Doe', room: '101', items: 3, total: 12500, status: 'pending', time: '10:30 AM' },
  { id: 2, order_number: 'ORD-002', guest_name: 'Jane Smith', room: '205', items: 2, total: 8000, status: 'completed', time: '09:15 AM' },
]

export default function RestaurantPage() {
  const [activeSection, setActiveSection] = useState<SubSection>('orders')

  const menuColumns: Column<typeof mockMenuItems[0]>[] = [
    { key: 'name', label: 'Dish Name', sortable: true, searchable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price (₦)', sortable: true, render: (v) => `₦${v.toLocaleString()}` },
    {
      key: 'availability',
      label: 'Status',
      render: (v) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${v === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {v === 'available' ? 'Available' : 'Unavailable'}
        </span>
      ),
    },
  ]

  const orderColumns: Column<typeof mockOrders[0]>[] = [
    { key: 'order_number', label: 'Order No', sortable: true, searchable: true },
    { key: 'guest_name', label: 'Guest Name', searchable: true },
    { key: 'room', label: 'Room', sortable: true },
    { key: 'items', label: 'Items', sortable: true },
    { key: 'total', label: 'Total', sortable: true, render: (v) => `₦${v.toLocaleString()}` },
    { key: 'time', label: 'Time' },
    {
      key: 'status',
      label: 'Status',
      render: (v) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${v === 'completed' ? 'bg-green-100 text-green-800' : v === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
          {v}
        </span>
      ),
    },
  ]

  const menuFilters = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'Mains', label: 'Mains' },
        { value: 'Soups', label: 'Soups' },
        { value: 'Sides', label: 'Sides' },
      ],
    },
    {
      key: 'availability',
      label: 'Availability',
      options: [
        { value: 'available', label: 'Available' },
        { value: 'unavailable', label: 'Unavailable' },
      ],
    },
  ]

  const orderFilters = [
    {
      key: 'status',
      label: 'Order Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'preparing', label: 'Preparing' },
        { value: 'completed', label: 'Completed' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Restaurant Management</h1>
        <p className="text-slate-600 mt-2">Manage menu items and restaurant orders</p>
      </div>

      {/* Sub-navigation */}
      <div className="bg-white rounded-lg border border-slate-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeSection === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>🍽️</span>
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveSection('menu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeSection === 'menu' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>📋</span>
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        {activeSection === 'orders' && (
          <DataTable
            data={mockOrders}
            columns={orderColumns}
            itemsPerPage={10}
            searchPlaceholder="Search orders..."
            filters={orderFilters}
            mobileColumns={['order_number', 'guest_name', 'status']}
          />
        )}

        {activeSection === 'menu' && (
          <DataTable
            data={mockMenuItems}
            columns={menuColumns}
            itemsPerPage={10}
            searchPlaceholder="Search menu items..."
            filters={menuFilters}
            mobileColumns={['name', 'price', 'availability']}
          />
        )}
      </div>
    </div>
  )
}
