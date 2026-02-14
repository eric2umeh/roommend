'use client'

import { useState } from 'react'

type Event = {
  id: number
  organization_name: string
  contact_person: string
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  description?: string
  categories: string[]
  participants: number
  revenue: number
  status: 'pending' | 'confirmed' | 'cancelled'
}

const mockEvents: Event[] = [
  {
    id: 1,
    organization_name: 'MTN Nigeria',
    contact_person: 'Grace Okonkwo',
    start_date: '2025-02-01',
    start_time: '09:00',
    end_date: '2025-02-01',
    end_time: '17:00',
    description: 'Annual sales conference',
    categories: ['room_booking', 'hall_booking', 'launch_buffet'],
    participants: 150,
    revenue: 2500000,
    status: 'confirmed',
  },
  {
    id: 2,
    organization_name: 'Nigerian Bar Association',
    contact_person: 'Barrister Adeyemi',
    start_date: '2025-02-05',
    start_time: '10:00',
    end_date: '2025-02-07',
    end_time: '18:00',
    description: 'Legal practitioners summit',
    categories: ['room_booking', 'hall_booking', 'tea_break', 'launch_buffet', 'dinner_buffet'],
    participants: 200,
    revenue: 4500000,
    status: 'confirmed',
  },
]

export default function EventsManagementPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const eventSummary = {
    total: mockEvents.length,
    upcoming: mockEvents.filter(e => e.status === 'confirmed').length,
    today: mockEvents.filter(e => e.start_date === new Date().toISOString().split('T')[0]).length,
    pending: mockEvents.filter(e => e.status === 'pending').length,
    confirmed: mockEvents.filter(e => e.status === 'confirmed').length,
    cancelled: mockEvents.filter(e => e.status === 'cancelled').length,
    participants: mockEvents.reduce((sum, e) => sum + e.participants, 0),
    revenue: mockEvents.reduce((sum, e) => sum + e.revenue, 0),
  }

  const categoryOptions = [
    { value: 'room_booking', label: 'Room Booking' },
    { value: 'hall_booking', label: 'Hall Booking' },
    { value: 'tea_break', label: 'Tea Break' },
    { value: 'launch_buffet', label: 'Launch Buffet' },
    { value: 'dinner_buffet', label: 'Dinner Buffet' },
    { value: 'swimming_pool', label: 'Swimming Pool' },
    { value: 'other', label: 'Other' },
  ]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Events Management</h1>
          <p className="text-slate-600 mt-2">Manage conferences, meetings, and corporate events</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Create New Event
        </button>
      </div>

      {/* Event Summary Dropdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Total Events</div>
          <div className="text-2xl font-bold text-slate-900">{eventSummary.total}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Upcoming</div>
          <div className="text-2xl font-bold text-blue-600">{eventSummary.upcoming}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Today</div>
          <div className="text-2xl font-bold text-green-600">{eventSummary.today}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{eventSummary.pending}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">{eventSummary.confirmed}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{eventSummary.cancelled}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Participants</div>
          <div className="text-2xl font-bold text-purple-600">{eventSummary.participants}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-xs text-slate-600 mb-1">Revenue</div>
          <div className="text-xl font-bold text-green-600">₦{(eventSummary.revenue / 1000000).toFixed(1)}M</div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{event.organization_name}</h3>
                  <p className="text-sm text-slate-600">{event.contact_person}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    event.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : event.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {event.status}
                </span>
              </div>

              {event.description && (
                <p className="text-sm text-slate-600 mb-4">{event.description}</p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-medium">Start:</span>
                  <span>{event.start_date} at {event.start_time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-medium">End:</span>
                  <span>{event.end_date} at {event.end_time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-medium">Participants:</span>
                  <span className="text-blue-600 font-semibold">{event.participants}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-medium">Revenue:</span>
                  <span className="text-green-600 font-semibold">₦{event.revenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-600 mb-2">Services</div>
                <div className="flex flex-wrap gap-1">
                  {event.categories.map(cat => (
                    <span
                      key={cat}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {categoryOptions.find(c => c.value === cat)?.label || cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Event</h2>
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setSelectedCategories([])
                }}
                className="text-slate-600 hover:text-slate-900 text-2xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Participants <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Event Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Categories (Select multiple) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categoryOptions.map(option => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition ${
                          selectedCategories.includes(option.value)
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-300 hover:border-blue-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(option.value)}
                          onChange={() => toggleCategory(option.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setSelectedCategories([])
                  }}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault()
                    if (selectedCategories.length === 0) {
                      alert('Please select at least one category')
                      return
                    }
                    alert('Event created successfully!')
                    setShowCreateForm(false)
                    setSelectedCategories([])
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
