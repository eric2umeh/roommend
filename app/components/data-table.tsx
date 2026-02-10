'use client'

import React, { useState, useMemo } from 'react'

export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  searchable?: boolean
  className?: string
  mobileHidden?: boolean
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  itemsPerPage?: number
  searchPlaceholder?: string
  filters?: {
    label: string
    key: string
    options: { label: string; value: string }[]
  }[]
  onView?: (row: T) => void
  viewButtonText?: string
  mobileColumns?: (keyof T)[]
}

type ViewMode = 'table' | 'card'

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 20,
  searchPlaceholder = 'Search...',
  filters = [],
  onView,
  viewButtonText = 'View',
  mobileColumns,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  // Apply filtering
  const filteredData = useMemo(() => {
    let result = [...data]

    if (searchTerm) {
      result = result.filter((row) => {
        return columns.some((col) => {
          if (!col.searchable) return false
          const value = row[col.key]
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }

    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        result = result.filter((row) => String(row[filterKey as keyof T]) === filterValue)
      }
    })

    return result
  }, [data, searchTerm, activeFilters, columns])

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal === bVal) return 0
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      return sortOrder === 'asc' ? 1 : -1
    })
  }, [filteredData, sortKey, sortOrder])

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }))
    setCurrentPage(1)
  }

  // Columns to display on mobile (only essential ones)
  const mobileDisplayColumns = mobileColumns
    ? columns.filter((col) => mobileColumns.includes(col.key))
    : columns.slice(0, 3)

  // Columns for desktop
  const desktopColumns = columns.filter((col) => !col.mobileHidden)

  const hasActiveFilters = Object.keys(activeFilters).some((k) => activeFilters[k])

  return (
    <div className="space-y-4">
      {/* Search Bar with View Mode Toggle */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* View Mode Toggle - Desktop Only */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              viewMode === 'card'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Card
          </button>
        </div>
      </div>

      {/* Desktop Filters */}
      {filters.length > 0 && (
        <div className="hidden md:flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <select
              key={filter.key}
              value={activeFilters[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {/* Mobile Filters Toggle */}
      {filters.length > 0 && (
        <div className="md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-2 bg-slate-100 rounded-lg border border-slate-300 hover:bg-slate-200"
          >
            <span className="font-medium text-slate-900">Filters {hasActiveFilters && '(Active)'}</span>
            <span className="text-lg">{showFilters ? '▼' : '▶'}</span>
          </button>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="mt-2 p-4 bg-white border border-slate-300 rounded-lg space-y-3">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{filter.label}</label>
                  <select
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All {filter.label}</option>
                    {filter.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {sortedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Found</h3>
          <p className="text-slate-600 mb-4">
            {searchTerm || hasActiveFilters
              ? 'Try adjusting your search or filter criteria'
              : 'No data available'}
          </p>
          {(searchTerm || hasActiveFilters) && (
            <button
              onClick={() => {
                setSearchTerm('')
                setActiveFilters({})
                setCurrentPage(1)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          {viewMode === 'table' && (
            <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {desktopColumns.map((col) => (
                      <th
                        key={String(col.key)}
                        className={`px-6 py-3 text-left font-medium text-slate-700 ${
                          col.sortable ? 'cursor-pointer hover:bg-slate-100' : ''
                        } ${col.className || ''}`}
                        onClick={() => col.sortable && handleSort(col.key)}
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          {col.sortable && sortKey === col.key && (
                            <span className="text-xs">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                    ))}
                    {onView && <th className="px-6 py-3 text-left font-medium text-slate-700">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      {desktopColumns.map((col) => (
                        <td key={String(col.key)} className={`px-6 py-4 text-slate-900 ${col.className || ''}`}>
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </td>
                      ))}
                      {onView && (
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onView(row)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            {viewButtonText}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Desktop Card View */}
          {viewMode === 'card' && (
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((row, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="space-y-3">
                    {desktopColumns.map((col) => (
                      <div key={String(col.key)}>
                        <label className="text-sm font-medium text-slate-600">{col.label}</label>
                        <p className="text-slate-900 mt-1">
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </p>
                      </div>
                    ))}
                  </div>
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {viewButtonText}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Mobile Compact Table */}
          <div className="md:hidden border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200">
              <div className="flex">
                {mobileDisplayColumns.map((col) => (
                  <div
                    key={String(col.key)}
                    className="flex-1 px-3 py-2 font-medium text-slate-700 text-xs border-r border-slate-200 last:border-r-0"
                  >
                    {col.label}
                  </div>
                ))}
                <div className="w-16 px-3 py-2 font-medium text-slate-700 text-xs">Action</div>
              </div>
            </div>

            <div>
              {paginatedData.map((row, idx) => (
                <div key={idx} className="flex border-b border-slate-200 hover:bg-slate-50 last:border-b-0">
                  {mobileDisplayColumns.map((col) => (
                    <div
                      key={String(col.key)}
                      className="flex-1 px-3 py-3 text-slate-900 text-xs border-r border-slate-200 last:border-r-0 break-words"
                    >
                      <div className="font-medium text-slate-600 text-xs mb-1">{col.label}</div>
                      <div className="line-clamp-2">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                      </div>
                    </div>
                  ))}
                  {onView && (
                    <div className="w-16 px-2 py-3 flex items-center justify-center">
                      <button
                        onClick={() => onView(row)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 whitespace-nowrap"
                      >
                        {viewButtonText}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4">
          <div className="text-sm text-slate-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50 hover:bg-slate-100"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = idx + 1
                } else if (currentPage <= 3) {
                  pageNum = idx + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx
                } else {
                  pageNum = currentPage - 2 + idx
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50 hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
