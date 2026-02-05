'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Your role doesn't have the required permissions for this action. Contact your administrator if you
            believe this is a mistake.
          </p>
          <Link href="/app">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Back to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
