'use client'

import Link from 'next/link'

export default function LandingPage() {
  const features = [
    {
      title: '🏨 Room Management',
      description: 'Track room status, types, and availability in real-time.'
    },
    {
      title: '📅 Reservations',
      description: 'Manage bookings with instant conflict detection and pricing.'
    },
    {
      title: '👥 Guest CRM',
      description: 'Store guest profiles, preferences, and history. Zero duplication.'
    },
    {
      title: '🍽️ Restaurant & POS',
      description: 'Complete order management with kitchen queue and billing.'
    },
    {
      title: '📦 Inventory',
      description: 'Track stock levels with low-stock alerts and monthly counters.'
    },
    {
      title: '👨‍💼 Staff & Payroll',
      description: 'Manage roles, attendance, and generate payslips automatically.'
    }
  ]

  const pricing = [
    {
      tier: 'Free',
      price: '₦0',
      features: ['Up to 5 users', 'All core features', 'Community support']
    },
    {
      tier: 'Pro',
      price: '₦163,350',
      features: ['Unlimited users', 'Priority support', 'Advanced analytics', 'Custom roles']
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      features: ['Dedicated support', 'Custom integration', 'SLA guarantee', 'On-premise option']
    }
  ]

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
              <button className="px-4 py-2 text-slate-700 hover:text-slate-900 transition">Sign In</button>
            </Link>
            <Link href="/app">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Get Started
              </button>
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
          Manage rooms, reservations, guests, restaurant orders, inventory, and staff—all from one beautiful dashboard. Free for your first 5 users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/app">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg">
              Start Free Trial
            </button>
          </Link>
          <Link href="#features">
            <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition font-medium text-lg">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-slate-200 p-8 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.tier}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}<span className="text-sm text-slate-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-slate-600 flex items-center gap-2">
                    <span className="text-green-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-medium transition ${
                idx === 1 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}>
                {idx === 2 ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Property?</h2>
          <p className="text-xl mb-8 opacity-90">Join 100+ properties already using Roommend</p>
          <Link href="/app">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-slate-100 transition font-medium text-lg">
              Start Free Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-slate-900 mb-4">
                <span className="text-blue-600">Room</span>mend
              </div>
              <p className="text-slate-600 text-sm">Modern hotel management for African properties.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-slate-600 text-sm">
            <p>&copy; 2025 Roommend. All rights reserved. • Designed by Eric Umeh</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
