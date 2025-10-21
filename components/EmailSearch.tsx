'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Tag, 
  Clock,
  Star,
  AlertCircle,
  Paperclip,
  X,
  ChevronDown,
  CheckCircle
} from 'lucide-react'

interface SearchFilters {
  from: string
  to: string
  subject: string
  hasAttachment: boolean
  isStarred: boolean
  isImportant: boolean
  dateFrom: string
  dateTo: string
  category: string
}

interface EmailSearchProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (filters: SearchFilters) => void
}

export default function EmailSearch({ isOpen, onClose, onSearch }: EmailSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    from: '',
    to: '',
    subject: '',
    hasAttachment: false,
    isStarred: false,
    isImportant: false,
    dateFrom: '',
    dateTo: '',
    category: ''
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'team', name: 'Team' },
    { id: 'vip', name: 'VIP' },
    { id: 'tools', name: 'Tools' },
    { id: 'other', name: 'Other' }
  ]

  const handleSearch = () => {
    onSearch(filters)
    onClose()
  }

  const handleClear = () => {
    setFilters({
      from: '',
      to: '',
      subject: '',
      hasAttachment: false,
      isStarred: false,
      isImportant: false,
      dateFrom: '',
      dateTo: '',
      category: ''
    })
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Search</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Basic Search */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in emails..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="text"
                  value={filters.from}
                  onChange={(e) => setFilters({...filters, from: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Sender email"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="text"
                  value={filters.to}
                  onChange={(e) => setFilters({...filters, to: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Recipient email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Subject contains"
              />
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 border-t border-gray-200 pt-4"
            >
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasAttachment"
                    checked={filters.hasAttachment}
                    onChange={(e) => setFilters({...filters, hasAttachment: e.target.checked})}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="hasAttachment" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Paperclip className="w-4 h-4" />
                    <span>Has attachments</span>
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isStarred"
                    checked={filters.isStarred}
                    onChange={(e) => setFilters({...filters, isStarred: e.target.checked})}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="isStarred" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Star className="w-4 h-4" />
                    <span>Starred emails</span>
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isImportant"
                    checked={filters.isImportant}
                    onChange={(e) => setFilters({...filters, isImportant: e.target.checked})}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="isImportant" className="flex items-center space-x-2 text-sm text-gray-700">
                    <AlertCircle className="w-4 h-4" />
                    <span>Important emails</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Filters */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({...filters, isStarred: true})}
                className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200"
              >
                <Star className="w-4 h-4" />
                <span>Starred</span>
              </button>
              <button
                onClick={() => setFilters({...filters, hasAttachment: true})}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
              >
                <Paperclip className="w-4 h-4" />
                <span>With Attachments</span>
              </button>
              <button
                onClick={() => setFilters({...filters, isImportant: true})}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Important</span>
              </button>
              <button
                onClick={() => setFilters({...filters, category: 'team'})}
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200"
              >
                <User className="w-4 h-4" />
                <span>Team</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear All
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
