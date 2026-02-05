'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredPermissions={['view_reports']}>
      <div className="space-y-8">
        <div>
          <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">Business intelligence and insights</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Analytics dashboard under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              View occupancy rates, revenue reports, guest metrics, inventory valuation, and more.
            </p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
