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

  const [statusFilter, setStatusFilter] = useState<string>('')
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

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

  const currentFloorRooms = roomsByFloor
    .find(f => f.floor === selectedFloor)
    ?.rooms.filter(room => {
      const matchesStatus = !statusFilter || room.status === statusFilter
      const matchesRoomType = !roomTypeFilter || room.room_type === roomTypeFilter
      const matchesSearch = !searchTerm || room.room_number.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesRoomType && matchesSearch
    }) || []

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
          <Link href="/dashboard/front-desk" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition bg-blue-600 text-white hover:bg-blue-700">
            <span>📊</span>
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/front-desk/walk-in" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
            <span>🚶</span>
            <span>Walk-in</span>
          </Link>
          <Link href="/dashboard/front-desk/reservation" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
            <span>📅</span>
            <span>Reservation</span>
          </Link>
          <Link href="/dashboard/front-desk/events" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
            <span>🎉</span>
            <span>Events</span>
          </Link>
          {isAdmin && (
            <Link href="/dashboard/front-desk/out-of-order" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
              <span>🚫</span>
              <span>Out of Order</span>
            </Link>
          )}
          <Link href="/dashboard/front-desk/city-ledger" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
            <span>💼</span>
            <span>City Ledger</span>
          </Link>
          <Link href="/dashboard/front-desk/guest-database" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
            <span>👥</span>
            <span>Guests</span>
          </Link>
          <Link href="/dashboard/front-desk/reports" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition text-slate-700 hover:bg-slate-100">
            <span>📈</span>
            <span>Reports</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
          {/* View Toggle, Filters, and Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center sm:justify-between flex-wrap">
            <h2 className="text-xl font-bold text-slate-900">Room Status Overview</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Search */}
              <input
                type="text"
                placeholder="Search room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All Status</option>
                <option value="clean">Clean</option>
                <option value="dirty">Dirty</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
              
              {/* Room Type Filter */}
              <select
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All Types</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Table
                </button>
              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {currentFloorRooms.length > 0 ? (
                currentFloorRooms.map(room => (
                  <div
                    key={room.room_number}
                    className={`rounded-lg border-2 p-3 transition hover:shadow-lg cursor-pointer text-sm ${
                      room.status === 'occupied'
                        ? 'border-red-300 bg-red-50'
                        : room.status === 'clean'
                        ? 'border-green-300 bg-green-50'
                        : room.status === 'dirty'
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-orange-300 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xl font-bold text-slate-900">{room.room_number}</div>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
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
                    <div className="space-y-1 text-slate-700">
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
                            <span className="text-slate-600">Res:</span>
                            <span className="font-medium text-blue-600">#RES-{Math.floor(Math.random() * 9000) + 1000}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Arr:</span>
                            <span className="font-medium">Today</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Dep:</span>
                            <span className="font-medium">Tomorrow</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-500">
                  No rooms found for selected filters
        </div>
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Room</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-900">Price</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900 hidden sm:table-cell">Reservation</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900 hidden md:table-cell">Arrival</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900 hidden md:table-cell">Departure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentFloorRooms.length > 0 ? (
                    currentFloorRooms.map(room => (
                      <tr key={room.room_number} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{room.room_number}</td>
                        <td className="px-4 py-3 text-slate-700">{room.room_type}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium inline-block ${
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
                        <td className="px-4 py-3 text-right font-medium text-slate-900">₦{room.base_price_naira.toLocaleString()}</td>
                        <td className="px-4 py-3 text-slate-700 hidden sm:table-cell">
                          {room.status === 'occupied' ? `#RES-${Math.floor(Math.random() * 9000) + 1000}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-slate-700 hidden md:table-cell">
                          {room.status === 'occupied' ? 'Today' : '-'}
                        </td>
                        <td className="px-4 py-3 text-slate-700 hidden md:table-cell">
                          {room.status === 'occupied' ? 'Tomorrow' : '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                        No rooms found for selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

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
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => {
                          setArrivalDate(e.target.value)
                          calculateNights(e.target.value, departureDate)
                        }}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">📅</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Departure Date
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => {
                          setDepartureDate(e.target.value)
                          calculateNights(arrivalDate, e.target.value)
                        }}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">📅</button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Optional - guest can decide later</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-900">Number of Nights:</span>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={nights}
                        onChange={(e) => setNights(Number(e.target.value))}
                        className="w-20 px-3 py-1 border border-blue-300 rounded bg-white text-blue-900 font-medium text-center"
                      />
                      <span className="text-blue-900">nights</span>
                    </div>
                  </div>
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
                    disabled={!arrivalDate || adults < 1}
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
                {adults > 2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                      <span className="font-semibold">Note:</span> You have {adults} adults. Maximum 2 adults per room (except Diplomatic Suite). You can select multiple rooms if needed.
                    </p>
                  </div>
                )}
                
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
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
