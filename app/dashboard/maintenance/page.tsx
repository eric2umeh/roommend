'use client'

import { DataTable, type Column } from '@/components/data-table'

interface MaintenanceRequest {
  id: string
  room: string
  issue: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed'
  reported_by: string
  date: string
}

const mockRequests: MaintenanceRequest[] = [
  { id: '1', room: '101', issue: 'Air conditioner not working', priority: 'high', status: 'in_progress', reported_by: 'Front Desk', date: '2024-02-11' },
  { id: '2', room: '205', issue: 'Broken window latch', priority: 'medium', status: 'pending', reported_by: 'Housekeeping', date: '2024-02-10' },
  { id: '3', room: '301', issue: 'Faulty bathroom light', priority: 'low', status: 'completed', reported_by: 'Guest', date: '2024-02-09' },
  { id: '4', room: '102', issue: 'Leaking toilet', priority: 'high', status: 'pending', reported_by: 'Housekeeping', date: '2024-02-11' },
]

export default function MaintenancePage() {
  const columns: Column<MaintenanceRequest>[] = [
    { key: 'room', label: 'Room', sortable: true },
    { key: 'issue', label: 'Issue', searchable: true },
    { key: 'priority', label: 'Priority', sortable: true, render: (v) => <span className={`px-2 py-1 rounded text-xs font-medium ${v === 'high' ? 'bg-red-100 text-red-800' : v === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{v}</span> },
    { key: 'status', label: 'Status', sortable: true, render: (v) => <span className={`px-2 py-1 rounded text-xs ${v === 'completed' ? 'bg-green-100 text-green-800' : v === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>{v.replace('_', ' ')}</span> },
    { key: 'date', label: 'Date' },
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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Maintenance Requests</h1>
        <p className="text-slate-600 mt-2">Track and manage facility maintenance</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable data={mockRequests} columns={columns} itemsPerPage={10} searchPlaceholder="Search requests..." filters={filters} mobileColumns={['room', 'issue', 'status']} />
      </div>
    </div>
  )
}
