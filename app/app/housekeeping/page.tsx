'use client'

import { mockHousekeepingTasks } from '@/lib/mock-data'

export default function HousekeepingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Housekeeping & Maintenance</h1>

      <div className="grid gap-4">
        {mockHousekeepingTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900">
                  {task.task_type === 'cleaning'
                    ? '🧹'
                    : task.task_type === 'maintenance'
                      ? '🔧'
                      : '✅'}{' '}
                  {task.task_type.charAt(0).toUpperCase() + task.task_type.slice(1)}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </p>
              </div>
              <div className={`px-3 py-1 rounded text-xs font-medium ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.slice(1)}
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
