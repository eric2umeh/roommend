'use client'

import { DataTable, type Column } from '@/components/data-table'

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  availability: 'available' | 'unavailable'
  description: string
}

const mockMenuItems: MenuItem[] = [
  { id: '1', name: 'Jollof Rice', category: 'Mains', price: 2500, availability: 'available', description: 'Spiced rice cooked in tomato sauce' },
  { id: '2', name: 'Pepper Soup', category: 'Soups', price: 1500, availability: 'available', description: 'Traditional Nigerian soup' },
  { id: '3', name: 'Grilled Chicken', category: 'Mains', price: 3500, availability: 'available', description: 'Tender grilled chicken breast' },
  { id: '4', name: 'Fried Rice', category: 'Mains', price: 2200, availability: 'available', description: 'Mixed fried rice with vegetables' },
  { id: '5', name: 'Egusi Soup', category: 'Soups', price: 2000, availability: 'unavailable', description: 'Out of stock' },
  { id: '6', name: 'Suya', category: 'Appetizers', price: 1200, availability: 'available', description: 'Spiced grilled meat' },
  { id: '7', name: 'Pounded Yam', category: 'Sides', price: 800, availability: 'available', description: 'Smooth pounded yam' },
]

export default function MenuPage() {
  const columns: Column<MenuItem>[] = [
    { key: 'name', label: 'Dish Name', sortable: true, searchable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price (₦)', sortable: true, render: (v) => `₦${v.toLocaleString()}` },
    {
      key: 'availability',
      label: 'Status',
      render: (v) => <span className={`px-2 py-1 rounded text-xs font-medium ${v === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{v === 'available' ? 'Available' : 'Unavailable'}</span>,
    },
  ]

  const filters = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'Mains', label: 'Mains' },
        { value: 'Soups', label: 'Soups' },
        { value: 'Appetizers', label: 'Appetizers' },
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Menu Management</h1>
        <p className="text-slate-600 mt-2">Create and manage restaurant menu items</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable data={mockMenuItems} columns={columns} itemsPerPage={10} searchPlaceholder="Search menu items..." filters={filters} mobileColumns={['name', 'price', 'availability']} />
      </div>
    </div>
  )
}
