'use client'

import { DataTable, type Column } from '@/components/data-table'

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
  status: 'pending' | 'completed'
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-02-11', description: 'Room revenue - Reservations', category: 'Income', amount: 165000, type: 'income', status: 'completed' },
  { id: '2', date: '2024-02-11', description: 'Staff salary payments', category: 'Expenses', amount: 45000, type: 'expense', status: 'completed' },
  { id: '3', date: '2024-02-10', description: 'Food & beverage inventory', category: 'Expenses', amount: 28500, type: 'expense', status: 'completed' },
  { id: '4', date: '2024-02-10', description: 'POS system payment', category: 'Income', amount: 12500, type: 'income', status: 'completed' },
  { id: '5', date: '2024-02-09', description: 'Utility bills - Electric', category: 'Expenses', amount: 18000, type: 'expense', status: 'pending' },
]

export default function AccountingPage() {
  const columns: Column<Transaction>[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description', searchable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, render: (v, row) => <span className={row.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>₦{v.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded text-xs ${v === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{v}</span> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Accounting</h1>
        <p className="text-slate-600 mt-2">Track financial transactions and reports</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable data={mockTransactions} columns={columns} itemsPerPage={10} searchPlaceholder="Search transactions..." mobileColumns={['date', 'description', 'amount']} />
      </div>
    </div>
  )
}
