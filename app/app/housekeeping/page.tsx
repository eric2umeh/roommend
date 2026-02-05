'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { mockHousekeepingTasks } from '@/lib/mock-data'

export default function HousekeepingPage() {
  return (
    <ProtectedRoute requiredPermissions={['manage_tasks']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Housekeeping</h1>
            <p className="text-slate-600 mt-1">Manage cleaning and maintenance tasks</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ New Task</Button>
        </div>

        <div className="grid gap-4">
          {mockHousekeepingTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>
                      {task.task_type === 'cleaning'
                        ? '🧹'
                        : task.task_type === 'maintenance'
                          ? '🔧'
                          : '✅'}{' '}
                      {task.task_type.charAt(0).toUpperCase() + task.task_type.slice(1)}
                    </CardTitle>
                    <CardDescription>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.slice(1)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{task.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
