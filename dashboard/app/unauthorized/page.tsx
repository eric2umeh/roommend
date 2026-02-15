'use client'

import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-slate-200 shadow-lg p-8">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-4">You don't have permission to access this page</p>
          <p className="text-slate-600 mb-6">
            Your role doesn't have the required permissions for this action. Contact your administrator if you believe this is a mistake.
          </p>
          <Link href="/app">
            <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
