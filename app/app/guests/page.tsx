'use client'

import { mockGuests } from '@/lib/mock-data'

export default function GuestsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Guest Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockGuests.map((guest) => (
          <div key={guest.id} className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900">{guest.first_name} {guest.last_name}</h3>
            <p className="text-sm text-slate-600 mt-2">{guest.email}</p>
            <p className="text-sm text-slate-600">{guest.phone}</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">Total Stays: {guest.total_stays}</p>
              <p className="text-xs text-slate-500">Total Spent: ₦{guest.total_spent_naira.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
