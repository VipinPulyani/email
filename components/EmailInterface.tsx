'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Search, 
  Filter, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Paperclip,
  Send,
  Plus
} from 'lucide-react'

interface Email {
  id: string
  from: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  hasAttachment: boolean
  category: 'team' | 'vip' | 'tools' | 'other'
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'Sarah Chen',
    subject: 'Q4 Planning Meeting - Tomorrow 2PM',
    preview: 'Hi team, just a reminder about our Q4 planning meeting tomorrow at 2PM. Please review the attached deck...',
    time: '2 min ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true,
    category: 'team'
  },
  {
    id: '2',
    from: 'John Smith',
    subject: 'Contract Review - Urgent',
    preview: 'The legal team needs your review of the new contract by EOD. This is time-sensitive...',
    time: '15 min ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    category: 'vip'
  },
  {
    id: '3',
    from: 'Google Docs',
    subject: 'Document shared: "Product Roadmap Q4"',
    preview: 'You have been granted access to view and comment on the document "Product Roadmap Q4"...',
    time: '1 hour ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'tools'
  },
  {
    id: '4',
    from: 'Marketing Team',
    subject: 'Campaign Performance Report',
    preview: 'Here are the results from our latest campaign. We exceeded our KPIs by 15%...',
    time: '2 hours ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: true,
    category: 'team'
  },
  {
    id: '5',
    from: 'Newsletter',
    subject: 'Weekly Tech News Digest',
    preview: 'This week in tech: AI breakthroughs, startup funding rounds, and industry insights...',
    time: '3 hours ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'other'
  }
]

export default function EmailInterface() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All', count: mockEmails.length },
    { id: 'team', name: 'Team', count: mockEmails.filter(e => e.category === 'team').length },
    { id: 'vip', name: 'VIP', count: mockEmails.filter(e => e.category === 'vip').length },
    { id: 'tools', name: 'Tools', count: mockEmails.filter(e => e.category === 'tools').length },
    { id: 'other', name: 'Other', count: mockEmails.filter(e => e.category === 'other').length }
  ]

  const filteredEmails = mockEmails.filter(email => {
    const matchesCategory = activeCategory === 'all' || email.category === activeCategory
    const matchesSearch = email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.preview.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const unreadCount = mockEmails.filter(e => !e.isRead).length

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold text-gray-900">Inbox</span>
            {unreadCount > 0 && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {filteredEmails.length} emails
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredEmails.map((email) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border-b border-gray-100 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedEmail?.id === email.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
              } ${!email.isRead ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${!email.isRead ? 'font-bold' : ''}`}>
                        {email.from}
                      </span>
                      {email.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {email.isImportant && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {email.hasAttachment && (
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-500">{email.time}</span>
                    </div>
                  </div>
                  
                  <h3 className={`text-sm ${!email.isRead ? 'font-bold' : 'font-medium'} text-gray-900 mb-1`}>
                    {email.subject}
                  </h3>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {email.preview}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      email.category === 'team' ? 'bg-blue-100 text-blue-700' :
                      email.category === 'vip' ? 'bg-red-100 text-red-700' :
                      email.category === 'tools' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {email.category.toUpperCase()}
                    </span>
                    {!email.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Email Detail */}
      {selectedEmail && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 bg-white border-l border-gray-200 flex flex-col"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Email Details</h2>
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">From</label>
                <p className="text-gray-900">{selectedEmail.from}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Subject</label>
                <p className="text-gray-900">{selectedEmail.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Time</label>
                <p className="text-gray-900">{selectedEmail.time}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">{selectedEmail.preview}</p>
            </div>
            
            <div className="space-y-2">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Forward className="w-4 h-4 mr-2" />
                Forward
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
