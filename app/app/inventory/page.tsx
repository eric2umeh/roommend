'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'

export default function InventoryPage() {
  return (
    <ProtectedRoute requiredPermissions={['manage_inventory']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
            <p className="text-slate-600 mt-1">Track stock levels and supplies</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Add Item</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Inventory tracking system under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Track inventory items, set reorder levels, monitor costs, and get low-stock alerts.
            </p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
