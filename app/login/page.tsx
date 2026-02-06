'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-slate-900 mb-2">
            <span className="text-blue-600">Room</span>mend
          </div>
          <p className="text-slate-600">Hotel & Restaurant Management</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
          <p className="text-slate-600 text-sm mb-6">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-800 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-400"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-slate-700">Demo Accounts:</p>
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.email}
                onClick={() => quickLogin(cred.email)}
                className="w-full p-3 text-left text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="font-medium text-slate-900">{cred.role}</div>
                <div className="text-xs text-slate-500">{cred.email}</div>
              </button>
            ))}
          </div>
        </div>

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
