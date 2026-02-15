'use client'

import { DataTable, type Column } from '@/components/data-table'

interface AttendanceRecord {
  id: string
  staff_name: string
  position: string
  date: string
  check_in: string
  check_out: string
  hours_worked: number
  status: 'present' | 'absent' | 'late' | 'half_day'
}

const mockAttendance: AttendanceRecord[] = [
  { id: '1', staff_name: 'John Okoro', position: 'Manager', date: '2024-02-11', check_in: '08:00', check_out: '16:30', hours_worked: 8.5, status: 'present' },
  { id: '2', staff_name: 'Chioma Eze', position: 'Front Desk', date: '2024-02-11', check_in: '08:15', check_out: '16:00', hours_worked: 7.75, status: 'late' },
  { id: '3', staff_name: 'Tunde Adeyemi', position: 'Chef', date: '2024-02-11', check_in: '09:00', check_out: '15:00', hours_worked: 6, status: 'half_day' },
  { id: '4', staff_name: 'Grace Obi', position: 'Housekeeper', date: '2024-02-11', check_in: '07:00', check_out: '15:30', hours_worked: 8.5, status: 'present' },
  { id: '5', staff_name: 'Amara Nwankwo', position: 'Front Desk', date: '2024-02-11', check_in: '-', check_out: '-', hours_worked: 0, status: 'absent' },
]

export default function AttendancePage() {
  const columns: Column<AttendanceRecord>[] = [
    { key: 'staff_name', label: 'Staff Name', sortable: true, searchable: true },
    { key: 'position', label: 'Position' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'check_in', label: 'Check-in' },
    { key: 'check_out', label: 'Check-out' },
    { key: 'hours_worked', label: 'Hours', render: (v) => v > 0 ? `${v}h` : '-' },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 rounded text-xs font-medium ${v === 'present' ? 'bg-green-100 text-green-800' : v === 'absent' ? 'bg-red-100 text-red-800' : v === 'late' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'}`}>{v.replace('_', ' ')}</span> },
  ]

  const filters = [
    {
      key: 'position',
      label: 'Position',
      options: [
        { value: 'Manager', label: 'Manager' },
        { value: 'Front Desk', label: 'Front Desk' },
        { value: 'Chef', label: 'Chef' },
        { value: 'Housekeeper', label: 'Housekeeper' },
      ],
    },
    {
      key: 'status',
      label: 'Attendance Status',
      options: [
        { value: 'present', label: 'Present' },
        { value: 'absent', label: 'Absent' },
        { value: 'late', label: 'Late' },
        { value: 'half_day', label: 'Half Day' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Staff Attendance</h1>
        <p className="text-slate-600 mt-2">Track daily staff attendance and work hours</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <DataTable data={mockAttendance} columns={columns} itemsPerPage={10} searchPlaceholder="Search attendance..." filters={filters} mobileColumns={['staff_name', 'check_in', 'status']} />
      </div>
    </div>
  )
}
