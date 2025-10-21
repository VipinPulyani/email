'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  Clock, 
  Calendar,
  User,
  Tag,
  Filter,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Send,
  Plus,
  Search,
  X
} from 'lucide-react'

interface QuickAction {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  shortcut: string
  category: string
}

const quickActions: QuickAction[] = [
  // Email Actions
  { id: 'star', name: 'Star Email', description: 'Mark email as important', icon: <Star className="w-5 h-5" />, shortcut: 's', category: 'Email' },
  { id: 'archive', name: 'Archive Email', description: 'Move to archive', icon: <Archive className="w-5 h-5" />, shortcut: 'a', category: 'Email' },
  { id: 'delete', name: 'Delete Email', description: 'Move to trash', icon: <Trash2 className="w-5 h-5" />, shortcut: '#', category: 'Email' },
  { id: 'reply', name: 'Reply', description: 'Reply to sender', icon: <Reply className="w-5 h-5" />, shortcut: 'r', category: 'Email' },
  { id: 'forward', name: 'Forward', description: 'Forward email', icon: <Forward className="w-5 h-5" />, shortcut: 'f', category: 'Email' },
  
  // Productivity
  { id: 'snooze', name: 'Snooze', description: 'Snooze for later', icon: <Clock className="w-5 h-5" />, shortcut: 'z', category: 'Productivity' },
  { id: 'schedule', name: 'Schedule', description: 'Schedule for later', icon: <Calendar className="w-5 h-5" />, shortcut: 'shift+s', category: 'Productivity' },
  { id: 'mark_read', name: 'Mark as Read', description: 'Mark email as read', icon: <CheckCircle className="w-5 h-5" />, shortcut: 'space', category: 'Productivity' },
  { id: 'mark_important', name: 'Mark Important', description: 'Mark as important', icon: <AlertCircle className="w-5 h-5" />, shortcut: 'shift+i', category: 'Productivity' },
  
  // Organization
  { id: 'categorize', name: 'Categorize', description: 'Add category tag', icon: <Tag className="w-5 h-5" />, shortcut: 'shift+c', category: 'Organization' },
  { id: 'filter', name: 'Filter', description: 'Apply filters', icon: <Filter className="w-5 h-5" />, shortcut: 'shift+f', category: 'Organization' },
  { id: 'add_contact', name: 'Add Contact', description: 'Add to contacts', icon: <User className="w-5 h-5" />, shortcut: 'shift+a', category: 'Organization' },
  
  // Quick Compose
  { id: 'quick_reply', name: 'Quick Reply', description: 'Send quick response', icon: <Send className="w-5 h-5" />, shortcut: 'shift+r', category: 'Compose' },
  { id: 'template', name: 'Use Template', description: 'Apply email template', icon: <Paperclip className="w-5 h-5" />, shortcut: 't', category: 'Compose' },
  { id: 'compose', name: 'Compose', description: 'New email', icon: <Plus className="w-5 h-5" />, shortcut: 'c', category: 'Compose' }
]

interface QuickActionsProps {
  isOpen: boolean
  onClose: () => void
  onAction: (actionId: string) => void
}

export default function QuickActions({ isOpen, onClose, onAction }: QuickActionsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Email', 'Productivity', 'Organization', 'Compose']

  const filteredActions = quickActions.filter(action => {
    const matchesSearch = action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              <Zap className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
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
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
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
                  {category === 'all' ? 'All Actions' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onAction(action.id)
                  onClose()
                }}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="text-purple-600">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{action.name}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {action.shortcut}
                </div>
              </motion.button>
            ))}
          </div>

          {filteredActions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No actions found matching your search.
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">q</kbd> to open quick actions
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
