'use client'

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  searchable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

export interface Filter {
  key: string
  label: string
  options: Array<{ value: string; label: string }>
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  itemsPerPage?: number
  searchPlaceholder?: string
  filters?: Filter[]
  onView?: (item: T) => void
  viewButtonText?: string
  mobileColumns?: (keyof T)[]
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 10,
  searchPlaceholder = 'Search...',
  filters = [],
  onView,
  viewButtonText = 'View',
  mobileColumns = [],
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  // Apply search and filters
  const filteredData = useMemo(() => {
    let result = data

    // Apply search
    if (searchTerm) {
      result = result.filter(item => {
        return columns.some(col => {
          if (col.searchable) {
            const value = item[col.key]?.toString().toLowerCase() || ''
            return value.includes(searchTerm.toLowerCase())
          }
          return false
        })
      })
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        result = result.filter(item => {
          const value = item[filterKey as keyof T]?.toString() || ''
          return value === filterValue
        })
      }
    })

    return result
  }, [data, searchTerm, activeFilters, columns])

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortOrder])

  // Paginate
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
    setCurrentPage(1)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value === 'all' ? '' : value
    }))
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <select
                key={filter.key}
                value={activeFilters[filter.key] || 'all'}
                onChange={e => handleFilterChange(filter.key, e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{filter.label}</option>
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              {columns.map(col => (
                <TableHead
                  key={String(col.key)}
                  className={col.sortable ? 'cursor-pointer hover:bg-slate-200' : ''}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.label}</span>
                    {col.sortable && sortKey === col.key && (
                      <span className="text-xs">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              {onView && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <TableRow key={idx}>
                  {columns.map(col => (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key] || '-')}
                    </TableCell>
                  ))}
                  {onView && (
                    <TableCell>
                      <button
                        onClick={() => onView(item)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        {viewButtonText}
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onView ? 1 : 0)}
                  className="text-center py-8 text-slate-600"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
