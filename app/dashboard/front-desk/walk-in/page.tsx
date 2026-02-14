'use client'

import { useState } from 'react'
import { mockRooms } from '@/lib/mock-data'

export default function WalkInPage() {
  const [step, setStep] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [nights, setNights] = useState(1)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [roomType, setRoomType] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')

  const availableRooms = mockRooms.filter(
    (room) => room.status === 'clean' && (roomType === '' || room.room_type === roomType)
  )
  const roomTypes = Array.from(new Set(mockRooms.map((r) => r.room_type)))

  const handleSubmit = () => {
    alert('Walk-in booking created successfully!')
    // Reset form
    setStep(1)
    setGuestName('')
    setGuestEmail('')
    setGuestPhone('')
    setIdType('')
    setIdNumber('')
    setNights(1)
    setAdults(1)
    setChildren(0)
    setRoomType('')
    setSelectedRoom('')
  }

  return (
    <div className="space-y-6">
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-sm font-medium ${
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

        {/* Step 1: Guest Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Guest Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select ID type</option>
                  <option value="passport">International Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                disabled={!guestName || !guestEmail || !guestPhone || !idType || !idNumber}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Stay Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Nights <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Adults <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Children</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={nights < 1 || adults < 1}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Room Selection */}
        {step === 3 && (
          <div className="space-y-4">
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
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select room type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {roomType && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available Rooms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                  {availableRooms.map((room) => (
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
                      <div className="text-sm text-slate-600 mt-1">
                        ₦{room.base_price_naira.toLocaleString()}/night
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedRoom}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Complete Check-in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
