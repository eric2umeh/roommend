'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { mockRooms, mockRoomTypes } from '@/lib/mock-data'

type ViewMode = 'card' | 'table'
type SubSection = 'overview' | 'walk-in' | 'reservation' | 'events' | 'out-of-order' | 'city-ledger' | 'guest-database' | 'reports'

interface EnrichedRoom {
  id: string
  room_number: string
  floor: number
  status: 'clean' | 'dirty' | 'maintenance' | 'occupied'
  notes?: string
  room_type: string
  base_price_naira: number
  room_type_id: string
}

export default function FrontDeskPage() {
  const { role, hasPermission } = useAuth()
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [activeSection, setActiveSection] = useState<SubSection>('overview')
  const [selectedFloor, setSelectedFloor] = useState(1)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  
  // Reservation form state
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [nights, setNights] = useState(1)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [roomType, setRoomType] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [breakfastIncluded, setBreakfastIncluded] = useState(false)

  const isAdmin = role?.name === 'Admin'
  const isFrontDesk = role?.name === 'Front Desk' || hasPermission('manage_reservations')

  // Enrich rooms with type information
  const enrichedRooms: EnrichedRoom[] = mockRooms.map((room) => {
    const type = mockRoomTypes.find((t) => t.id === room.room_type_id)
    return {
      ...room,
      room_type: type?.name || 'Unknown',
      base_price_naira: type?.base_price_naira || 0,
      room_type_id: room.room_type_id,
    }
  })

  // Calculate nights when dates change
  const calculateNights = (arrival: string, departure: string) => {
    if (arrival && departure) {
      const diff = new Date(departure).getTime() - new Date(arrival).getTime()
      const nightsCount = Math.ceil(diff / (1000 * 60 * 60 * 24))
      setNights(nightsCount > 0 ? nightsCount : 1)
    }
  }

  // Get available and clean rooms
  const availableRooms = enrichedRooms.filter(room => 
    room.status === 'clean' && 
    (roomType === '' || room.room_type === roomType)
  )

  const roomTypes = Array.from(new Set(enrichedRooms.map(r => r.room_type)))

  const resetModal = () => {
    setShowReservationModal(false)
    setWizardStep(1)
    setArrivalDate('')
    setDepartureDate('')
    setNights(1)
    setAdults(1)
    setChildren(0)
    setRoomType('')
    setSelectedRoom('')
    setBreakfastIncluded(false)
  }

  // Group rooms by floor
  const floors = [1, 2, 3, 4]
  const roomsByFloor = floors.map(floor => ({
    floor,
    rooms: enrichedRooms.filter(room => room.floor === floor)
  }))

  const currentFloorRooms = roomsByFloor.find(f => f.floor === selectedFloor)?.rooms || []

  const subSections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'walk-in', label: 'Walk-in', icon: '🚶' },
    { id: 'reservation', label: 'Reservation', icon: '📅' },
    { id: 'events', label: 'Events Management', icon: '🎉' },
    { id: 'out-of-order', label: 'Out of Order', icon: '🚫', adminOnly: true },
    { id: 'city-ledger', label: 'City Ledger', icon: '💼' },
    { id: 'guest-database', label: 'Guest Database', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ]

  const visibleSections = subSections.filter(section => !section.adminOnly || isAdmin)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Front Desk</h1>
          <p className="text-slate-600 mt-2">Comprehensive hotel, apartments and restaurant management</p>
        </div>
        <button
          onClick={() => setShowReservationModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + New Reservation
        </button>
      </div>

      {/* Sub-navigation */}
      <div className="bg-white rounded-lg border border-slate-200 p-2">
        <div className="flex gap-2 overflow-x-auto">
          {visibleSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as SubSection)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active section */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Room Status Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          {/* Floor Tabs */}
          <div className="flex gap-2 border-b border-slate-200">
            {floors.map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-6 py-3 font-medium transition ${
                  selectedFloor === floor
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>

          {/* Card View */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentFloorRooms.map(room => (
                <div
                  key={room.room_number}
                  className={`rounded-lg border-2 p-4 transition hover:shadow-lg cursor-pointer ${
                    room.status === 'occupied'
                      ? 'border-red-300 bg-red-50'
                      : room.status === 'clean'
                      ? 'border-green-300 bg-green-50'
                      : room.status === 'dirty'
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-orange-300 bg-orange-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl font-bold text-slate-900">{room.room_number}</div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        room.status === 'occupied'
                          ? 'bg-red-600 text-white'
                          : room.status === 'clean'
                          ? 'bg-green-600 text-white'
                          : room.status === 'dirty'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-orange-600 text-white'
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="font-medium">{room.room_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Price:</span>
                      <span className="font-medium">₦{room.base_price_naira.toLocaleString()}</span>
                    </div>
                    {room.status === 'occupied' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Reservation:</span>
                          <span className="font-medium">#RES-{Math.floor(Math.random() * 9000) + 1000}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Arrival:</span>
                          <span className="font-medium">Today</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Room Number</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Room Type</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Status</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Price</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Reservation No</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">Arrival Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentFloorRooms.map(room => (
                      <tr key={room.room_number} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{room.room_number}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{room.room_type}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              room.status === 'occupied'
                                ? 'bg-red-100 text-red-800'
                                : room.status === 'clean'
                                ? 'bg-green-100 text-green-800'
                                : room.status === 'dirty'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {room.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">₦{room.base_price_naira.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {room.status === 'occupied' ? `#RES-${Math.floor(Math.random() * 9000) + 1000}` : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {room.status === 'occupied' ? 'Today' : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Other sections will be implemented in sub-pages */}
      {activeSection !== 'overview' && (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <div className="text-6xl mb-4">
            {subSections.find(s => s.id === activeSection)?.icon}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {subSections.find(s => s.id === activeSection)?.label}
          </h2>
          <p className="text-slate-600 mb-6">This section is under development</p>
          <Link
            href={`/dashboard/front-desk/${activeSection}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Go to {subSections.find(s => s.id === activeSection)?.label}
          </Link>
        </div>
      )}

      {/* Reservation Wizard Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 my-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">New Reservation</h2>
                <p className="text-sm text-slate-600 mt-1">Step {wizardStep} of 2</p>
              </div>
              <button
                onClick={resetModal}
                className="text-slate-600 hover:text-slate-900 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className={`flex-1 h-2 rounded ${wizardStep >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                <div className={`flex-1 h-2 rounded ${wizardStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              </div>
              <div className="flex justify-between mt-2 text-xs font-medium">
                <span className={wizardStep >= 1 ? 'text-blue-600' : 'text-slate-400'}>Walk-in Info</span>
                <span className={wizardStep >= 2 ? 'text-blue-600' : 'text-slate-400'}>Select Room</span>
              </div>
            </div>

            {/* Step 1: Walk-in Info */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Arrival Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => {
                        setArrivalDate(e.target.value)
                        calculateNights(e.target.value, departureDate)
                      }}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Departure Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => {
                        setDepartureDate(e.target.value)
                        calculateNights(arrivalDate, e.target.value)
                      }}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Number of Nights:</span> {nights}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Adults <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Children
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={resetModal}
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setWizardStep(2)}
                    disabled={!arrivalDate || !departureDate || adults < 1}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Next: Select Room
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Room */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Room Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => {
                      setRoomType(e.target.value)
                      setSelectedRoom('')
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {roomType && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Available Rooms <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                      {availableRooms.length > 0 ? (
                        availableRooms.map(room => (
                          <button
                            key={room.room_number}
                            onClick={() => setSelectedRoom(room.room_number)}
                            className={`p-4 border-2 rounded-lg text-left transition ${
                              selectedRoom === room.room_number
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-slate-300 hover:border-blue-400'
                            }`}
                          >
                            <div className="font-bold text-lg text-slate-900">{room.room_number}</div>
                            <div className="text-sm text-slate-600 mt-1">₦{room.base_price_naira.toLocaleString()}/night</div>
                          </button>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8 text-slate-600">
                          No available rooms for selected type
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={breakfastIncluded}
                      onChange={(e) => setBreakfastIncluded(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Include complimentary breakfast</span>
                  </label>
                </div>

                {selectedRoom && (() => {
                  const selectedRoomData = enrichedRooms.find(r => r.room_number === selectedRoom)
                  const totalPrice = (selectedRoomData?.base_price_naira || 0) * nights
                  
                  return (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">Reservation Summary</h3>
                      <div className="space-y-1 text-sm text-slate-700">
                        <div className="flex justify-between">
                          <span>Room:</span>
                          <span className="font-medium">{selectedRoom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-in:</span>
                          <span className="font-medium">{arrivalDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-out:</span>
                          <span className="font-medium">{departureDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nights:</span>
                          <span className="font-medium">{nights}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span className="font-medium">{adults} adults, {children} children</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Breakfast:</span>
                          <span className="font-medium">{breakfastIncluded ? 'Included' : 'Not included'}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-300 mt-2">
                          <span className="font-semibold">Estimated Total:</span>
                          <span className="font-bold text-lg text-blue-600">
                            ₦{totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                <div className="flex justify-between gap-3 pt-4">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                  >
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={resetModal}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert('Reservation created successfully!')
                        resetModal()
                      }}
                      disabled={!roomType || !selectedRoom}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
