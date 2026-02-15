'use client'

import { useState } from 'react'
import Link from 'next/link'

type ReportType = 'checkout' | 'housekeeping' | 'police_local' | 'police_foreign'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const reports = [
    {
      id: 'checkout' as ReportType,
      title: 'Guest Checked Out Detail',
      description: 'Complete breakdown of all guests who checked out',
      icon: '📤',
      color: 'blue',
    },
    {
      id: 'housekeeping' as ReportType,
      title: 'Housekeeping Report',
      description: 'Room cleaning status and housekeeping activities',
      icon: '🧹',
      color: 'green',
    },
    {
      id: 'police_local' as ReportType,
      title: 'Local Police Report',
      description: 'Guest registration report for local authorities',
      icon: '🚓',
      color: 'purple',
    },
    {
      id: 'police_foreign' as ReportType,
      title: 'Foreign Police Report',
      description: 'International guest registration for immigration',
      icon: '🛂',
      color: 'orange',
    },
  ]

  const handlePrint = () => {
    window.print()
  }

  const handleGenerateReport = () => {
    if (!selectedReport || !startDate || !endDate) {
      alert('Please select report type and date range')
      return
    }
    alert(`Generating ${reports.find(r => r.id === selectedReport)?.title}...`)
  }

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

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Front Desk Reports</h1>
        <p className="text-slate-600 mt-2">View and print all department reports</p>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-6 rounded-lg border-2 text-left transition ${
              selectedReport === report.id
                ? `border-${report.color}-500 bg-${report.color}-50`
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{report.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1">{report.title}</h3>
                <p className="text-sm text-slate-600">{report.description}</p>
              </div>
              {selectedReport === report.id && (
                <div className="text-2xl text-blue-600">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Date Range Filter */}
      {selectedReport && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="font-bold text-lg text-slate-900 mb-4">Report Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerateReport}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Generate Report
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Print
            </button>
            <button
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Export PDF
            </button>
            <button
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Export Excel
            </button>
          </div>
        </div>
      )}

      {/* Report Preview */}
      {selectedReport && startDate && endDate && (
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {reports.find(r => r.id === selectedReport)?.title}
            </h2>
            <p className="text-slate-600">
              Report Period: {startDate} to {endDate}
            </p>
          </div>

          <div className="space-y-4">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Guest Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Room</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Check-in</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Check-out</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm text-slate-700">Guest {i}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">10{i}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{startDate}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{endDate}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">₦165,000</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <div className="text-right">
                <div className="text-sm text-slate-600">Total</div>
                <div className="text-2xl font-bold text-slate-900">₦825,000</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
