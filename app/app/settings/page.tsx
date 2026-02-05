'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/components/protected-route'

const SETTINGS_SECTIONS = [
  {
    title: 'Organization Settings',
    description: 'Manage your organization details',
    href: '/app/settings/organization',
    icon: '🏢',
  },
  {
    title: 'Role Management',
    description: 'Create and manage custom roles',
    href: '/app/settings/roles',
    icon: '👤',
  },
  {
    title: 'Locations',
    description: 'Manage hotel locations',
    href: '/app/settings/locations',
    icon: '📍',
  },
  {
    title: 'Billing',
    description: 'Manage subscription and billing',
    href: '/app/settings/billing',
    icon: '💳',
  },
]

export default function SettingsPage() {
  return (
    <ProtectedRoute requiredPermissions={['access_settings']}>
      <div className="space-y-8">
        <div>
          <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Configure your system</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {SETTINGS_SECTIONS.map((section) => (
            <Card key={section.href} className="hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{section.icon}</span>
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={section.href}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Open {section.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
