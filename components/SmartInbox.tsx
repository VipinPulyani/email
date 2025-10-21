'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Star, 
  Tag, 
  BarChart3,
  Zap,
  Target,
  Calendar,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  Info,
  Filter,
  Search,
  Settings,
  RefreshCw
} from 'lucide-react'

interface SmartCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  count: number
  emails: any[]
}

interface SmartInboxProps {
  emails: any[]
  onEmailSelect: (email: any) => void
  onCategoryChange: (category: string) => void
}

export default function SmartInbox({ emails, onEmailSelect, onCategoryChange }: SmartInboxProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [smartCategories, setSmartCategories] = useState<SmartCategory[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  // AI-powered categorization
  const categorizeEmails = (emails: any[]) => {
    const categories: SmartCategory[] = [
      {
        id: 'urgent',
        name: 'Urgent',
        description: 'Emails requiring immediate attention',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'text-red-600 bg-red-100',
        count: 0,
        emails: []
      },
      {
        id: 'important',
        name: 'Important',
        description: 'High-priority emails from key contacts',
        icon: <Star className="w-5 h-5" />,
        color: 'text-orange-600 bg-orange-100',
        count: 0,
        emails: []
      },
      {
        id: 'meetings',
        name: 'Meetings',
        description: 'Calendar invites and meeting-related emails',
        icon: <Calendar className="w-5 h-5" />,
        color: 'text-blue-600 bg-blue-100',
        count: 0,
        emails: []
      },
      {
        id: 'tasks',
        name: 'Tasks',
        description: 'Emails with actionable items',
        icon: <Target className="w-5 h-5" />,
        color: 'text-green-600 bg-green-100',
        count: 0,
        emails: []
      },
      {
        id: 'notifications',
        name: 'Notifications',
        description: 'System notifications and updates',
        icon: <MessageSquare className="w-5 h-5" />,
        color: 'text-gray-600 bg-gray-100',
        count: 0,
        emails: []
      },
      {
        id: 'marketing',
        name: 'Marketing',
        description: 'Promotional emails and newsletters',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'text-purple-600 bg-purple-100',
        count: 0,
        emails: []
      }
    ]

    // Categorize emails using AI logic
    emails.forEach(email => {
      const text = `${email.subject} ${email.preview}`.toLowerCase()
      
      // Urgent emails
      if (text.includes('urgent') || text.includes('asap') || text.includes('emergency') || 
          text.includes('deadline') || text.includes('critical')) {
        categories[0].emails.push(email)
        categories[0].count++
      }
      // Important emails
      else if (email.isImportant || email.isStarred || 
               text.includes('important') || text.includes('priority')) {
        categories[1].emails.push(email)
        categories[1].count++
      }
      // Meeting emails
      else if (text.includes('meeting') || text.includes('calendar') || 
               text.includes('schedule') || text.includes('appointment')) {
        categories[2].emails.push(email)
        categories[2].count++
      }
      // Task emails
      else if (text.includes('task') || text.includes('action') || 
               text.includes('todo') || text.includes('follow up')) {
        categories[3].emails.push(email)
        categories[3].count++
      }
      // Notification emails
      else if (email.from.includes('noreply') || email.from.includes('notification') ||
               text.includes('update') || text.includes('alert')) {
        categories[4].emails.push(email)
        categories[4].count++
      }
      // Marketing emails
      else if (text.includes('sale') || text.includes('promotion') || 
               text.includes('newsletter') || text.includes('marketing')) {
        categories[5].emails.push(email)
        categories[5].count++
      }
    })

    return categories
  }

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      const categories = categorizeEmails(emails)
      setSmartCategories(categories)
      setIsAnalyzing(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [emails])

  const getFilteredEmails = () => {
    if (selectedCategory === 'all') return emails
    const category = smartCategories.find(cat => cat.id === selectedCategory)
    return category ? category.emails : []
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-6 h-6 text-purple-600 animate-pulse" />
          <span className="text-gray-700 font-medium">AI is analyzing your emails...</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-500 text-center">Categorizing emails by priority and content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Smart Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Smart Categories</h3>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {smartCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                onCategoryChange(category.id)
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={category.color}>
                  {category.icon}
                </div>
                <span className="font-medium text-gray-900">{category.name}</span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </div>
              <p className="text-xs text-gray-600 text-left">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Email List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'All Emails' : smartCategories.find(cat => cat.id === selectedCategory)?.name}
            </h3>
            <div className="text-sm text-gray-500">
              {getFilteredEmails().length} emails
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {getFilteredEmails().map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onEmailSelect(email)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{email.from}</span>
                    <span className="text-sm text-gray-500">{email.time}</span>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{email.subject}</h3>
                  <p className="text-sm text-gray-600 truncate">{email.preview}</p>
                  
                  {/* AI Tags */}
                  <div className="flex items-center space-x-2 mt-2">
                    {email.isImportant && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        Important
                      </span>
                    )}
                    {email.isStarred && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                        Starred
                      </span>
                    )}
                    {!email.isRead && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Unread
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
