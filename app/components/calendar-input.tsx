'use client'

import { useRef } from 'react'

interface CalendarInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  min?: string
  max?: string
  disabled?: boolean
}

export function CalendarInput({
  label,
  value,
  onChange,
  required = false,
  min,
  max,
  disabled = false,
}: CalendarInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.showPicker?.()
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={handleContainerClick}
        className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
          disabled ? 'bg-slate-100 cursor-not-allowed' : 'bg-white cursor-pointer hover:border-slate-400'
        }`}
      >
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          className="flex-1 outline-none bg-transparent cursor-pointer"
        />
        <span className="text-slate-400">📅</span>
      </div>
    </div>
  )
}
