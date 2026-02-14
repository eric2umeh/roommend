'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavTab {
  id: string
  label: string
  icon: string
  href: string
  adminOnly?: boolean
}

interface FrontDeskMobileNavProps {
  tabs: NavTab[]
  isAdmin: boolean
}

export function FrontDeskMobileNav({ tabs, isAdmin }: FrontDeskMobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Filter tabs based on admin access
  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin)

  // Get current active tab
  const currentTab = visibleTabs.find(tab => pathname?.includes(tab.id)) || visibleTabs[0]

  // Handle scroll for arrow buttons
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Mobile dropdown view
  if (isMobile) {
    return (
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="p-3 flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 flex items-center justify-between px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{currentTab?.icon}</span>
              <span className="font-medium text-slate-900">{currentTab?.label}</span>
            </span>
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="bg-slate-50 border-t border-slate-200 py-2 px-3 space-y-1 max-h-64 overflow-y-auto">
            {visibleTabs.map(tab => (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentTab?.id === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Desktop scrollable tabs view
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="flex items-center gap-2 px-3">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 p-2 hover:bg-slate-100 rounded-lg transition"
          aria-label="Scroll left"
        >
          ←
        </button>

        {/* Scrollable tabs container */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
          style={{ scrollBehavior: 'smooth' }}
        >
          {visibleTabs.map(tab => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg whitespace-nowrap transition border-b-2 ${
                currentTab?.id === tab.id
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 p-2 hover:bg-slate-100 rounded-lg transition"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
