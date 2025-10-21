'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Keyboard, 
  X, 
  Command, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Plus,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  Search,
  Mail
} from 'lucide-react'

interface Shortcut {
  key: string
  description: string
  category: string
  icon: React.ReactNode
}

const shortcuts: Shortcut[] = [
  // Navigation
  { key: 'j', description: 'Next email', category: 'Navigation', icon: <ArrowDown className="w-4 h-4" /> },
  { key: 'k', description: 'Previous email', category: 'Navigation', icon: <ArrowUp className="w-4 h-4" /> },
  { key: 'g i', description: 'Go to Inbox', category: 'Navigation', icon: <ArrowLeft className="w-4 h-4" /> },
  { key: 'g s', description: 'Go to Sent', category: 'Navigation', icon: <ArrowRight className="w-4 h-4" /> },
  { key: 'g d', description: 'Go to Drafts', category: 'Navigation', icon: <ArrowLeft className="w-4 h-4" /> },
  
  // Actions
  { key: 'r', description: 'Reply', category: 'Actions', icon: <Reply className="w-4 h-4" /> },
  { key: 'f', description: 'Forward', category: 'Actions', icon: <Forward className="w-4 h-4" /> },
  { key: 'a', description: 'Archive', category: 'Actions', icon: <Archive className="w-4 h-4" /> },
  { key: '#', description: 'Delete', category: 'Actions', icon: <Trash2 className="w-4 h-4" /> },
  { key: 's', description: 'Star/Unstar', category: 'Actions', icon: <Star className="w-4 h-4" /> },
  
  // Composing
  { key: 'c', description: 'Compose new email', category: 'Composing', icon: <Mail className="w-4 h-4" /> },
  { key: 'Enter', description: 'Open email', category: 'Composing', icon: <Plus className="w-4 h-4" /> },
  { key: 'Escape', description: 'Close email', category: 'Composing', icon: <X className="w-4 h-4" /> },
  
  // Search & Filter
  { key: '/', description: 'Search emails', category: 'Search', icon: <Search className="w-4 h-4" /> },
  { key: 'Space', description: 'Mark as read/unread', category: 'Search', icon: <Plus className="w-4 h-4" /> },
  
  // General
  { key: '?', description: 'Show shortcuts', category: 'General', icon: <Keyboard className="w-4 h-4" /> },
  { key: 'q', description: 'Quick actions', category: 'General', icon: <Plus className="w-4 h-4" /> }
]

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

export default function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Navigation', 'Actions', 'Composing', 'Search', 'General']

  const filteredShortcuts = shortcuts.filter(shortcut => {
    const matchesSearch = shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shortcut.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || shortcut.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?' && !isOpen) {
        event.preventDefault()
        // This would open the shortcuts modal
      }
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Keyboard className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Search and Filter */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search shortcuts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Shortcuts Grid */}
          <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {filteredShortcuts.map((shortcut, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-purple-600">
                  {shortcut.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{shortcut.description}</div>
                  <div className="text-sm text-gray-500">{shortcut.category}</div>
                </div>
                <div className="flex items-center space-x-1">
                  {shortcut.key.split(' ').map((key, keyIndex) => (
                    <div key={keyIndex} className="flex items-center space-x-1">
                      {keyIndex > 0 && <span className="text-gray-400">+</span>}
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-700">
                        {key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredShortcuts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No shortcuts found matching your search.
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">?</kbd> to toggle shortcuts
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
