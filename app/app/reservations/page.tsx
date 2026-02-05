'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'

export default function ReservationsPage() {
  return (
    <ProtectedRoute requiredPermissions={['manage_reservations']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Reservations</h1>
            <p className="text-slate-600 mt-1">Manage guest bookings and check-ins</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ New Reservation</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This module is under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              The reservations module will include booking management, check-in/check-out,
              pricing calculations, and conflict detection.
            </p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
