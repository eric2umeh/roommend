'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { mockRoles } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProtectedRoute } from '@/components/protected-route'

// Available permissions in the system
const AVAILABLE_PERMISSIONS = [
  { id: 'manage_users', label: 'Manage Users', category: 'User Management' },
  { id: 'manage_roles', label: 'Manage Roles', category: 'User Management' },
  { id: 'manage_rooms', label: 'Manage Rooms', category: 'Room Management' },
  { id: 'manage_reservations', label: 'Manage Reservations', category: 'Booking' },
  { id: 'view_guests', label: 'View Guests', category: 'Guest Management' },
  { id: 'manage_guests', label: 'Manage Guests', category: 'Guest Management' },
  { id: 'check_in', label: 'Check-in Guests', category: 'Booking' },
  { id: 'check_out', label: 'Check-out Guests', category: 'Booking' },
  { id: 'manage_menu', label: 'Manage Menu Items', category: 'Restaurant' },
  { id: 'manage_orders', label: 'Manage Orders', category: 'Restaurant' },
  { id: 'update_order_status', label: 'Update Order Status', category: 'Restaurant' },
  { id: 'manage_inventory', label: 'Manage Inventory', category: 'Inventory' },
  { id: 'manage_staff', label: 'Manage Staff', category: 'Staff' },
  { id: 'update_room_status', label: 'Update Room Status', category: 'Room Management' },
  { id: 'manage_tasks', label: 'Manage Housekeeping Tasks', category: 'Housekeeping' },
  { id: 'view_reports', label: 'View Reports', category: 'Analytics' },
  { id: 'access_settings', label: 'Access Settings', category: 'System' },
]

export default function RoleManagementPage() {
  const { hasPermission } = useAuth()
  const [roles, setRoles] = useState(mockRoles)
  const [showNewRoleForm, setShowNewRoleForm] = useState(false)
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  })

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return

    const role = {
      id: `role_${Date.now()}`,
      organization_id: 'org_grand_bohabs_001',
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      is_system_role: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setRoles([...roles, role])
    setNewRole({ name: '', description: '', permissions: [] })
    setShowNewRoleForm(false)
  }

  const togglePermission = (permissionId: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const deleteRole = (roleId: string) => {
    setRoles(roles.filter((r) => r.id !== roleId))
  }

  const canManageRoles = hasPermission('manage_roles')

  return (
    <ProtectedRoute requiredPermissions={['manage_roles']}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/app" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Role Management</h1>
            <p className="text-slate-600 mt-1">Create and manage custom roles for your team</p>
          </div>
          {canManageRoles && (
            <Button
              onClick={() => setShowNewRoleForm(!showNewRoleForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showNewRoleForm ? 'Cancel' : '+ New Role'}
            </Button>
          )}
        </div>

        {/* Create New Role Form */}
        {showNewRoleForm && canManageRoles && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Create New Role</CardTitle>
              <CardDescription>Define a custom role for your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="e.g., Kitchen Manager, Night Manager"
                  value={newRole.name}
                  onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
                  className="border-blue-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Input
                  id="role-description"
                  placeholder="What does this role do?"
                  value={newRole.description}
                  onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
                  className="border-blue-300"
                />
              </div>

              <div className="space-y-4">
                <Label>Permissions</Label>
                {Array.from(new Set(AVAILABLE_PERMISSIONS.map((p) => p.category))).map((category) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-slate-700 text-sm">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-2">
                      {AVAILABLE_PERMISSIONS.filter((p) => p.category === category).map((perm) => (
                        <label key={perm.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newRole.permissions.includes(perm.id)}
                            onChange={() => togglePermission(perm.id)}
                            className="rounded"
                          />
                          <span className="text-sm text-slate-700">{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateRole} className="bg-blue-600 hover:bg-blue-700">
                  Create Role
                </Button>
                <Button
                  onClick={() => setShowNewRoleForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Roles List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Current Roles ({roles.length})</h2>
          <div className="grid gap-4">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {role.name}
                        {role.is_system_role && (
                          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                            System
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{role.description || 'No description'}</CardDescription>
                    </div>
                    {!role.is_system_role && canManageRoles && (
                      <Button
                        onClick={() => deleteRole(role.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                      Permissions ({role.permissions.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.length > 0 ? (
                        role.permissions.map((perm) => {
                          const permLabel = AVAILABLE_PERMISSIONS.find((p) => p.id === perm)?.label || perm
                          return (
                            <span
                              key={perm}
                              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium"
                            >
                              {permLabel}
                            </span>
                          )
                        })
                      ) : (
                        <span className="text-sm text-slate-500 italic">No permissions assigned</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Permissions Reference */}
        <Card className="bg-slate-50">
          <CardHeader>
            <CardTitle className="text-lg">Available Permissions Reference</CardTitle>
            <CardDescription>All permissions you can assign to roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(AVAILABLE_PERMISSIONS.map((p) => p.category))).map((category) => (
                <div key={category}>
                  <h4 className="font-semibold text-slate-900 mb-2">{category}</h4>
                  <ul className="space-y-1 ml-4">
                    {AVAILABLE_PERMISSIONS.filter((p) => p.category === category).map((perm) => (
                      <li key={perm.id} className="text-sm text-slate-600">
                        <code className="bg-slate-200 px-2 py-1 rounded text-xs">{perm.id}</code> -{' '}
                        {perm.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
