'use client'

import React from "react"

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
  requireAny?: boolean
}

export function ProtectedRoute({
  children,
  requiredPermissions = [],
  requireAny = false,
}: ProtectedRouteProps) {
  const { isLoggedIn, isLoading, hasPermission, hasAnyPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login')
      return
    }

    if (requiredPermissions.length > 0 && !isLoading) {
      const hasAccess = requireAny
        ? hasAnyPermission(requiredPermissions)
        : requiredPermissions.every((p) => hasPermission(p))

      if (!hasAccess) {
        router.push('/app/unauthorized')
      }
    }
  }, [isLoggedIn, isLoading, requiredPermissions, requireAny, hasPermission, hasAnyPermission, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null // Router will handle redirect
  }

  return <>{children}</>
}
