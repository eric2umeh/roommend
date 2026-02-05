'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authUtils } from '@/lib/auth-utils'

const DEMO_CREDENTIALS = [
  { email: 'eric@grandbohabs.com', role: 'Admin', password: 'demo' },
  { email: 'aisha@grandbohabs.com', role: 'Front Desk', password: 'demo' },
  { email: 'john@grandbohabs.com', role: 'Housekeeping', password: 'demo' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await authUtils.login(email, password)
      if (result) {
        // In production, set secure session
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('role', JSON.stringify(result.role))
        router.push('/app')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('demo')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-slate-900 mb-2">
            <span className="text-blue-600">Room</span>mend
          </div>
          <p className="text-slate-600">Hotel & Restaurant Management</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="mt-1"
                />
              </div>

              {error && <div className="p-3 rounded-md bg-red-50 text-red-800 text-sm">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium text-slate-700">Demo Accounts:</p>
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.email}
                  onClick={() => quickLogin(cred.email)}
                  className="w-full p-2 text-left text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="font-medium text-slate-900">{cred.role}</div>
                  <div className="text-xs text-slate-500">{cred.email}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-600">
          Back to{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            home
          </Link>
        </div>
      </div>
    </div>
  )
}
