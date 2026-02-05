'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { mockGuests } from '@/lib/mock-data'

export default function GuestsPage() {
  return (
    <ProtectedRoute requiredPermissions={['view_guests']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Guest Management</h1>
            <p className="text-slate-600 mt-1">View and manage guest profiles</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Add Guest</Button>
        </div>

        <div className="grid gap-4">
          {mockGuests.map((guest) => (
            <Card key={guest.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>
                      {guest.first_name} {guest.last_name}
                      {guest.is_vip && <span className="text-yellow-500 ml-2">⭐ VIP</span>}
                    </CardTitle>
                    <CardDescription>{guest.email}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-600">Total Stays</div>
                  <div className="text-2xl font-bold text-slate-900">{guest.total_stays}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Total Spent</div>
                  <div className="text-2xl font-bold text-blue-600">₦{guest.total_spent_naira.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Country</div>
                  <div className="text-lg font-semibold text-slate-900">{guest.country}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
