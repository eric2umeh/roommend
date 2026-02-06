'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { mockRoles, mockPermissions } from '@/lib/mock-data'

const PERMISSION_CATEGORIES = {
  'Reservations': ['manage_reservations', 'view_guests'],
  'Rooms': ['manage_rooms'],
  'Guests': ['view_guests', 'manage_guests'],
  'Orders': ['manage_orders', 'manage_menu'],
  'Inventory': ['manage_inventory'],
  'Tasks': ['manage_tasks'],
  'Staff': ['manage_staff'],
  'Settings': ['access_settings', 'manage_roles'],
}

export default function RolesPage() {
  const { role: userRole } = useAuth()
  const [newRole, setNewRole] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const handleCreateRole = () => {
    if (newRole.trim()) {
      console.log('Creating role:', newRole, 'with permissions:', selectedPermissions)
      setNewRole('')
      setSelectedPermissions([])
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Role Management</h1>

      {/* Create New Role */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Create New Role</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="e.g., Front Desk Manager"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-4">Permissions</label>
          <div className="space-y-4">
            {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{category}</h3>
                <div className="space-y-2 ml-4">
                  {permissions.map(perm => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                      <span className="text-sm text-slate-700">{perm.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateRole}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Create Role
        </button>
      </div>

      {/* Existing Roles */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Existing Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRoles.map((r) => (
            <div key={r.id} className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">{r.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{r.permissions.length} permissions</p>
              <div className="text-xs text-slate-600 space-y-1">
                {r.permissions.slice(0, 3).map(p => (
                  <div key={p}>✓ {p.replace('_', ' ')}</div>
                ))}
                {r.permissions.length > 3 && (
                  <div className="text-slate-500">+{r.permissions.length - 3} more</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
