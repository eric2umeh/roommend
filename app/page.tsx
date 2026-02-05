'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">
            <span className="text-blue-600">Room</span>mend
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/app">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 text-balance">
          Modern Hotel & Restaurant
          <span className="text-blue-600"> Management</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto text-balance">
          Manage rooms, reservations, guests, restaurant orders, inventory, and staff—all from one
          beautiful dashboard. Free for your first 5 users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/app">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Start Free Trial
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>🏨 Room Management</CardTitle>
              <CardDescription>Track rooms, availability, and status in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              Manage room types, pricing, capacity, and occupancy with automatic conflict detection.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📅 Reservations</CardTitle>
              <CardDescription>Handle bookings from guests and staff</CardDescription>
            </CardHeader>
            <CardContent>
              Create, modify, and cancel reservations with intelligent pricing and availability
              calculations.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👥 Guest CRM</CardTitle>
              <CardDescription>Build lasting guest relationships</CardDescription>
            </CardHeader>
            <CardContent>
              Track guest preferences, stay history, and VIP status. Merge duplicate profiles
              automatically.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🍽️ Restaurant & POS</CardTitle>
              <CardDescription>Full-featured point-of-sale system</CardDescription>
            </CardHeader>
            <CardContent>
              Manage menus, take orders, track kitchen queue, split bills, and charge to guest rooms.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📦 Inventory</CardTitle>
              <CardDescription>Control stock levels and costs</CardDescription>
            </CardHeader>
            <CardContent>
              Track inventory items, set reorder levels, monitor costs, and get low-stock alerts.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👨‍💼 Staff & Payroll</CardTitle>
              <CardDescription>Manage your team efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              Track attendance, manage roles with custom permissions, and generate payslips
              automatically.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🧹 Housekeeping</CardTitle>
              <CardDescription>Organize cleaning and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              Auto-generate cleaning tasks, assign staff, track progress, and manage maintenance
              requests.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💬 Team Messaging</CardTitle>
              <CardDescription>Communicate with your staff</CardDescription>
            </CardHeader>
            <CardContent>
              Create groups, send messages, share files, and track read receipts—all built-in.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Analytics</CardTitle>
              <CardDescription>Data-driven insights</CardDescription>
            </CardHeader>
            <CardContent>
              Occupancy rates, revenue reports, average daily rate, restaurant sales, and more.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">₦0</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Up to 5 users</li>
                <li>✓ 1 location</li>
                <li>✓ All core features</li>
                <li>✓ Basic support</li>
                <li>✗ No advanced analytics</li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                Start Free
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-600 border-2">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For growing hotels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">₦163,350<span className="text-sm font-normal text-slate-600">/mo</span></div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Unlimited users</li>
                <li>✓ Multiple locations</li>
                <li>✓ All features</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large chains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">Custom</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ White-label solution</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated support</li>
                <li>✓ SLA guarantee</li>
                <li>✓ Training & onboarding</li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your property?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hotels across Africa using Roommend. Free for first 5 users.
          </p>
          <Link href="/app">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-lg font-bold mb-4">
                <span className="text-blue-600">Room</span>mend
              </div>
              <p className="text-sm text-slate-600">Modern hotel management for Africa</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#features" className="hover:text-slate-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>© 2024 Roommend Inc. All rights reserved. Open source project.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
