'use client'

import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/app/settings/roles">
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Role Management</h2>
            <p className="text-slate-600">Create and manage custom user roles</p>
          </div>
        </Link>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">General Settings</h2>
          <p className="text-slate-600">Coming soon...</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Billing</h2>
          <p className="text-slate-600">Coming soon...</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Integrations</h2>
          <p className="text-slate-600">Coming soon...</p>
        </div>
      </div>
    </div>
  )
}
