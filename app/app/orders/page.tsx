'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'

export default function OrdersPage() {
  return (
    <ProtectedRoute requiredPermissions={['manage_orders']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Restaurant & POS</h1>
            <p className="text-slate-600 mt-1">Manage orders and kitchen queue</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ New Order</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>POS system under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Full point-of-sale system with menu management, order taking, kitchen queue,
              bill splitting, and room charging.
            </p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
