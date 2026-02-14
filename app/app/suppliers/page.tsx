'use client'

import { DataTable, type Column } from '@/components/data-table'

interface Supplier {
  id: string
  name: string
  category: string
  contact: string
  email: string
  payment_terms: string
  status: 'active' | 'inactive'
}

const mockSuppliers: Supplier[] = [
  { id: '1', name: 'ABC Foods Limited', category: 'Food & Beverages', contact: '+234 701 234 5678', email: 'sales@abcfoods.com', payment_terms: 'Net 30', status: 'active' },
  { id: '2', name: 'Nigerian Linen Company', category: 'Linens & Textiles', contact: '+234 702 345 6789', email: 'info@niglinen.com', payment_terms: 'Net 45', status: 'active' },
  { id: '3', name: 'Premium Cleaning Supplies', category: 'Cleaning', contact: '+234 703 456 7890', email: 'sales@premiumclean.ng', payment_terms: 'COD', status: 'active' },
  { id: '4', name: 'Tech Equipment Distributors', category: 'Equipment', contact: '+234 704 567 8901', email: 'support@techtrade.ng', payment_terms: 'Net 60', status: 'inactive' },
]

export default function SuppliersPage() {
  const columns: Column<Supplier>[] = [
    { key: 'name', label: 'Supplier Name', sortable: true, searchable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'contact', label: 'Contact', searchable: true },
    { key: 'email', label: 'Email' },
    { key: 'payment_terms', label: 'Payment Terms' },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded text-xs ${v === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{v === 'active' ? 'Active' : 'Inactive'}</span> },
  ]

  const filters = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'Food & Beverages', label: 'Food & Beverages' },
        { value: 'Linens & Textiles', label: 'Linens & Textiles' },
        { value: 'Cleaning', label: 'Cleaning' },
        { value: 'Equipment', label: 'Equipment' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Suppliers</h1>
        <p className="text-slate-600 mt-2">Manage your supplier relationships and orders</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable data={mockSuppliers} columns={columns} itemsPerPage={10} searchPlaceholder="Search suppliers..." filters={filters} mobileColumns={['name', 'category', 'status']} />
      </div>
    </div>
  )
}
