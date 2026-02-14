'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalendarInput } from '@/components/calendar-input'
import { useToast } from '@/components/toast-provider'
import { mockRoomTypes } from '@/lib/mock-data'

const roomMockData = [
  // Floor 1 (7 rooms: 101-107, with 103 as Royal)
  { id: '101', room_number: '101', floor: 1, room_type: 'Deluxe', base_price_naira: 75000, status: 'clean' },
  { id: '102', room_number: '102', floor: 1, room_type: 'Deluxe', base_price_naira: 75000, status: 'clean' },
  { id: '103', room_number: '103', floor: 1, room_type: 'Royal', base_price_naira: 85000, status: 'clean' },
  { id: '104', room_number: '104', floor: 1, room_type: 'Deluxe', base_price_naira: 75000, status: 'occupied' },
  { id: '105', room_number: '105', floor: 1, room_type: 'Deluxe', base_price_naira: 75000, status: 'clean' },
  { id: '106', room_number: '106', floor: 1, room_type: 'Deluxe', base_price_naira: 75000, status: 'clean' },
  { id: '107', room_number: '107', floor: 1, room_type: 'Deluxe', base_price_naira: 75000, status: 'dirty' },
  
  // Floor 2 (28 rooms: mix of types)
  { id: '201', room_number: '201', floor: 2, room_type: 'King Size', base_price_naira: 110000, status: 'clean' },
  { id: '202', room_number: '202', floor: 2, room_type: 'King Size', base_price_naira: 110000, status: 'clean' },
  { id: '203', room_number: '203', floor: 2, room_type: 'King Size', base_price_naira: 110000, status: 'occupied' },
  { id: '204', room_number: '204', floor: 2, room_type: 'Diplomatic Suite', base_price_naira: 180000, status: 'clean' },
  { id: '213', room_number: '213', floor: 2, room_type: 'Executive Suite', base_price_naira: 160000, status: 'clean' },
  { id: '223', room_number: '223', floor: 2, room_type: 'Mini Suite', base_price_naira: 140000, status: 'clean' },
  ...Array.from({ length: 22 }, (_, i) => ({
    id: String(205 + i),
    room_number: String(205 + i).padStart(3, '2'),
    floor: 2,
    room_type: ['King Size', 'Mini Suite', 'Executive Suite'][i % 3],
    base_price_naira: [110000, 140000, 160000][i % 3],
    status: i % 4 === 0 ? 'occupied' : 'clean'
  })),
  
  // Floor 3 (29 rooms)
  { id: '301', room_number: '301', floor: 3, room_type: 'Royal', base_price_naira: 85000, status: 'clean' },
  { id: '305', room_number: '305', floor: 3, room_type: 'Executive Suite', base_price_naira: 160000, status: 'clean' },
  { id: '324', room_number: '324', floor: 3, room_type: 'Executive Suite', base_price_naira: 160000, status: 'clean' },
  ...Array.from({ length: 26 }, (_, i) => ({
    id: String(302 + i),
    room_number: String(302 + i),
    floor: 3,
    room_type: i === 3 || i === 22 ? 'Executive Suite' : 'Royal',
    base_price_naira: i === 3 || i === 22 ? 160000 : 85000,
    status: i % 5 === 0 ? 'occupied' : 'clean'
  })),
]

const roomTypes = [
  { name: 'Deluxe', price: 75000 },
  { name: 'Royal', price: 85000 },
  { name: 'King Size', price: 110000 },
  { name: 'Mini Suite', price: 140000 },
  { name: 'Executive Suite', price: 160000 },
  { name: 'Diplomatic Suite', price: 180000 },
]

export default function WalkInPage() {
  const { showToast } = useToast()
  const [step, setStep] = useState(1)
  
  // Step 1: Guest Info
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [occupation, setOccupation] = useState('')
  const [company, setCompany] = useState('')
  const [comingFrom, setComingFrom] = useState('')
  const [goingTo, setGoingTo] = useState('')
  const [nationality, setNationality] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  
  // Step 2: Stay Details
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [nights, setNights] = useState(1)
  
  // Step 3: Room Selection
  const [roomType, setRoomType] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')

  // Bidirectional sync between nights and departure date
  useEffect(() => {
    if (arrivalDate && nights > 0) {
      const arrival = new Date(arrivalDate)
      const departure = new Date(arrival)
      departure.setDate(departure.getDate() + nights)
      setDepartureDate(departure.toISOString().split('T')[0])
    }
  }, [arrivalDate, nights])

  const handleDepartureDateChange = (newDepartureDate: string) => {
    setDepartureDate(newDepartureDate)
    if (arrivalDate && newDepartureDate) {
      const diff = new Date(newDepartureDate).getTime() - new Date(arrivalDate).getTime()
      const nightsCount = Math.ceil(diff / (1000 * 60 * 60 * 24))
      setNights(nightsCount > 0 ? nightsCount : 1)
    }
  }

  const availableRooms = roomMockData.filter(
    room => room.status === 'clean' && (roomType === '' || room.room_type === roomType)
  )

  const handleNext = () => {
    if (step === 1) {
      if (!fullName.trim()) {
        showToast('Please enter guest full name', 'error')
        return
      }
      if (!phone.trim()) {
        showToast('Phone number is required', 'error')
        return
      }
      if (!address.trim()) {
        showToast('Address is required', 'error')
        return
      }
      if (!country.trim()) {
        showToast('Country is required', 'error')
        return
      }
    }
    
    if (step === 2) {
      if (!arrivalDate) {
        showToast('Please select arrival date', 'error')
        return
      }
      if (!departureDate) {
        showToast('Please select departure date', 'error')
        return
      }
    }
    
    if (step === 3) {
      if (!selectedRoom) {
        showToast('Please select a room', 'error')
        return
      }
    }
    
    setStep(step + 1)
  }

  const handleSubmit = () => {
    showToast('Walk-in booking created successfully!', 'success')
    // Reset form or navigate
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/front-desk"
          className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
        >
          <span>←</span>
          <span>Back to Front Desk</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Walk-in Booking</h1>
        <p className="text-slate-600">Register a new guest checking in today</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Guest Info' },
            { num: 2, label: 'Stay Details' },
            { num: 3, label: 'Room Selection' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`ml-3 font-medium ${
                    step >= s.num ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step > s.num ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        {/* Step 1: Guest Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Guest Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter guest's full name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ID Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select ID type (optional)</option>
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="national_id">National ID</option>
                  <option value="voters_card">Voter's Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ID Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter ID number (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Enter occupation (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coming From</label>
                <input
                  type="text"
                  value={comingFrom}
                  onChange={(e) => setComingFrom(e.target.value)}
                  placeholder="Enter origin (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Going To</label>
                <input
                  type="text"
                  value={goingTo}
                  onChange={(e) => setGoingTo(e.target.value)}
                  placeholder="Enter destination (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="Enter nationality (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Passport Number</label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Enter passport number (optional)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Stay Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Stay Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalendarInput
                label="Arrival Date"
                value={arrivalDate}
                onChange={setArrivalDate}
                required
                min={new Date().toISOString().split('T')[0]}
              />

              <CalendarInput
                label="Departure Date"
                value={departureDate}
                onChange={handleDepartureDateChange}
                required
                min={arrivalDate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Nights
              </label>
              <input
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {arrivalDate && departureDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-900">Stay Summary:</span>
                  <span className="text-blue-900">
                    {new Date(arrivalDate).toLocaleDateString()} - {new Date(departureDate).toLocaleDateString()} ({nights} {nights === 1 ? 'night' : 'nights'})
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Room Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Room Selection</h2>
            
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
                  <option key={type.name} value={type.name}>
                    {type.name} - ₦{type.price.toLocaleString()}/night
                  </option>
                ))}
              </select>
            </div>

            {roomType && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Available Rooms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2 border border-slate-200 rounded-lg">
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
                        <div className="text-sm text-slate-600 mt-1">Floor {room.floor}</div>
                        <div className="text-sm text-slate-600">₦{room.base_price_naira.toLocaleString()}/night</div>
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

            {selectedRoom && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-green-900">Room:</span>
                    <span className="text-green-900">{selectedRoom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-green-900">Type:</span>
                    <span className="text-green-900">{roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-green-900">Nights:</span>
                    <span className="text-green-900">{nights}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-green-300">
                    <span className="font-bold text-green-900">Total:</span>
                    <span className="font-bold text-lg text-green-900">
                      ₦{((roomMockData.find(r => r.room_number === selectedRoom)?.base_price_naira || 0) * nights).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Complete Booking
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
