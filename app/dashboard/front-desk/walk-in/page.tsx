'use client'

import { useState } from 'react'
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
  const [step, setStep] = useState(1)
  
  // Step 1: Guest Info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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

  const calculateNights = (arrival: string, departure: string) => {
    if (arrival && departure) {
      const diff = new Date(departure).getTime() - new Date(arrival).getTime()
      const nightsCount = Math.ceil(diff / (1000 * 60 * 60 * 24))
      setNights(nightsCount > 0 ? nightsCount : 1)
    }
  }

  const availableRooms = roomMockData.filter(
    room => room.status === 'clean' && (roomType === '' || room.room_type === roomType)
  )

  const handleNext = () => {
    if (step === 1 && (!firstName || !lastName || !address || !country)) {
      alert('Please fill in all required fields: First Name, Last Name, Address, Country')
      return
    }
    if (step === 2 && (!arrivalDate || !departureDate)) {
      alert('Please select arrival and departure dates')
      return
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (!selectedRoom) {
      alert('Please select a room')
      return
    }
    alert(`Walk-in booking created! Room ${selectedRoom} for ${firstName} ${lastName}`)
    // Reset form
    setStep(1)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setIdType('')
    setIdNumber('')
    setOccupation('')
    setCompany('')
    setComingFrom('')
    setGoingTo('')
    setNationality('')
    setPassportNumber('')
    setAddress('')
    setCountry('')
    setArrivalDate('')
    setDepartureDate('')
    setNights(1)
    setRoomType('')
    setSelectedRoom('')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Walk-in Booking</h1>
        <p className="text-slate-600 mt-2">Quick check-in for guests without reservation</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: 'Guest Info' },
            { num: 2, label: 'Stay Details' },
            { num: 3, label: 'Room Selection' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    step >= s.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    step >= s.num ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 sm:mx-4 ${
                    step > s.num ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Guest Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Guest Information</h2>
            
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Address & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* ID Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ID Type</label>
                <input
                  type="text"
                  placeholder="Passport, License, etc."
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ID Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Travel Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coming From</label>
                <input
                  type="text"
                  value={comingFrom}
                  onChange={(e) => setComingFrom(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Going To</label>
                <input
                  type="text"
                  value={goingTo}
                  onChange={(e) => setGoingTo(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Nationality & Passport */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Passport Number</label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Next: Stay Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Stay Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Stay Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
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
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => {
                    setDepartureDate(e.target.value)
                    calculateNights(arrivalDate, e.target.value)
                  }}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Number of Nights</label>
              <input
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-3 pt-4">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Next: Select Room
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Room Selection */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Select Room</h2>
            
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
                    {type.name} - ₦{type.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {roomType && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available Rooms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-96 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                  {availableRooms.length > 0 ? (
                    availableRooms.map(room => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.room_number)}
                        className={`p-3 border-2 rounded-lg text-center transition text-sm font-medium ${
                          selectedRoom === room.room_number
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="font-bold">{room.room_number}</div>
                        <div className="text-xs text-slate-600 mt-1">Floor {room.floor}</div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-slate-500">
                      No available rooms for this type
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedRoom && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-blue-900">
                  <div className="flex justify-between">
                    <span>Guest:</span>
                    <span className="font-medium">{firstName} {lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arrival:</span>
                    <span className="font-medium">{arrivalDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights:</span>
                    <span className="font-medium">{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room:</span>
                    <span className="font-medium">{selectedRoom}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between gap-3 pt-4">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedRoom}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Complete Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
