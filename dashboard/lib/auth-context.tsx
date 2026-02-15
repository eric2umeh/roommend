'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Role } from './types'

interface AuthContextType {
  user: User | null
  role: Role | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('role')

    if (storedUser && storedRole) {
      try {
        setUser(JSON.parse(storedUser))
        setRole(JSON.parse(storedRole))
      } catch (error) {
        console.error('Failed to parse stored auth data')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In production, this would call your auth API
      const { authUtils } = await import('./auth-utils')
      const result = await authUtils.login(email, password)

      if (result) {
        setUser(result.user)
        setRole(result.role)
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('role', JSON.stringify(result.role))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setRole(null)
    localStorage.removeItem('user')
    localStorage.removeItem('role')
  }

  const hasPermission = (permission: string): boolean => {
    return role?.permissions.includes(permission) ?? false
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some((p) => hasPermission(p))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        isLoggedIn: !!user,
        login,
        logout,
        hasPermission,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
