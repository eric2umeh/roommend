'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { mockUsers } from '@/lib/mock-data'

export default function StaffPage() {
  return (
    <ProtectedRoute requiredPermissions={['manage_staff']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
            <p className="text-slate-600 mt-1">Manage users and payroll</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Add Staff Member</Button>
        </div>

        <div className="grid gap-4">
          {mockUsers.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>
                      {user.first_name} {user.last_name}
                    </CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-600">Phone</div>
                  <div className="font-medium text-slate-900">{user.phone || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Status</div>
                  <div className={`text-sm font-medium ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {user.is_active ? '✓ Active' : '✗ Inactive'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
