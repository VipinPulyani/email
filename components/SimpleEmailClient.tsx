'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Search, 
  Plus, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  Send,
  User,
  Clock,
  Paperclip,
  CheckCircle,
  AlertCircle,
  Brain,
  BarChart3,
  Bot,
  FileText,
  Workflow,
  Target,
  Settings,
  Bell,
  Zap
} from 'lucide-react'

interface SimpleEmail {
  id: string
  from: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  hasAttachment: boolean
}

const mockEmails: SimpleEmail[] = [
  {
    id: '1',
    from: 'Sarah Chen',
    subject: 'Q4 Planning Meeting - Tomorrow 2PM',
    preview: 'Hi team, just a reminder about our Q4 planning meeting tomorrow at 2PM...',
    time: '2 min ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true
  },
  {
    id: '2',
    from: 'John Smith',
    subject: 'Contract Review - Urgent',
    preview: 'The legal team needs your review of the new contract by EOD...',
    time: '15 min ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false
  },
  {
    id: '3',
    from: 'Google Docs',
    subject: 'Document shared: "Product Roadmap Q4"',
    preview: 'You have been granted access to view and comment on the document...',
    time: '1 hour ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false
  }
]

export default function SimpleEmailClient() {
  const [selectedEmail, setSelectedEmail] = useState<SimpleEmail | null>(null)
  const [activeTab, setActiveTab] = useState('inbox')
  const [searchQuery, setSearchQuery] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)

  const tabs = [
    { id: 'inbox', name: 'Inbox', count: mockEmails.length, icon: Mail },
    { id: 'starred', name: 'Starred', count: mockEmails.filter(e => e.isStarred).length, icon: Star },
    { id: 'important', name: 'Important', count: mockEmails.filter(e => e.isImportant).length, icon: AlertCircle },
    { id: 'analytics', name: 'Analytics', count: mockEmails.length, icon: BarChart3 },
    { id: 'auto-reply', name: 'Auto Reply', count: 3, icon: Bot },
    { id: 'summaries', name: 'Summaries', count: mockEmails.length, icon: FileText },
    { id: 'automation', name: 'Automation', count: 3, icon: Workflow }
  ]

  const filteredEmails = mockEmails.filter(email => {
    const matchesTab = activeTab === 'inbox' || 
                      (activeTab === 'starred' && email.isStarred) ||
                      (activeTab === 'important' && email.isImportant)
    const matchesSearch = email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.preview.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleCompose = () => {
    setComposeOpen(true)
  }

  const handleReply = (email: SimpleEmail) => {
    console.log('Replying to:', email.subject)
  }

  const handleStar = (email: SimpleEmail) => {
    console.log('Starring:', email.subject)
  }

  const handleArchive = (email: SimpleEmail) => {
    console.log('Archiving:', email.subject)
  }

  const handleDelete = (email: SimpleEmail) => {
    console.log('Deleting:', email.subject)
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold text-gray-900">Email</span>
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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </div>
                {tab.count > 0 && (
                  <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleCompose}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === 'inbox' ? 'Inbox' :
               activeTab === 'starred' ? 'Starred Emails' :
               activeTab === 'important' ? 'Important Emails' :
               activeTab === 'analytics' ? 'Email Analytics' :
               activeTab === 'auto-reply' ? 'Auto Reply Rules' :
               activeTab === 'summaries' ? 'Smart Summaries' :
               activeTab === 'automation' ? 'Email Automation' :
               'Email'}
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'analytics' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Analytics</h3>
                <p className="text-gray-600 mb-4">Track your email productivity and get insights</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{mockEmails.length}</div>
                    <div className="text-sm text-gray-500">Total Emails</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-500">Response Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.3h</div>
                    <div className="text-sm text-gray-500">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'auto-reply' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <Bot className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Auto Reply System</h3>
                <p className="text-gray-600 mb-4">Set up automatic responses for common scenarios</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Out of Office</span>
                    </div>
                    <span className="text-sm text-gray-500">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Meeting Requests</span>
                    </div>
                    <span className="text-sm text-gray-500">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="font-medium">Support Inquiries</span>
                    </div>
                    <span className="text-sm text-gray-500">Inactive</span>
                  </div>
                </div>
                <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Create New Rule
                </button>
              </div>
            </div>
          ) : activeTab === 'summaries' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Summaries</h3>
                <p className="text-gray-600 mb-4">AI-powered email summaries for quick reading</p>
                <div className="space-y-3">
                  {mockEmails.map((email, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{email.subject}</span>
                        <span className="text-xs text-gray-500">{email.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{email.preview}</p>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Meeting</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Action Required</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'automation' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <Workflow className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Automation</h3>
                <p className="text-gray-600 mb-4">Automate repetitive email tasks</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Meeting Request Handler</span>
                    </div>
                    <span className="text-sm text-gray-500">15 triggers</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Urgent Email Escalation</span>
                    </div>
                    <span className="text-sm text-gray-500">8 triggers</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="font-medium">Newsletter Organization</span>
                    </div>
                    <span className="text-sm text-gray-500">45 triggers</span>
                  </div>
                </div>
                <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Create New Workflow
                </button>
              </div>
            </div>
          ) : (
            /* Email List */
            <div className="space-y-2">
              {filteredEmails.map((email) => (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer ${
                    selectedEmail?.id === email.id ? 'ring-2 ring-purple-500' : ''
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
                        {!email.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStar(email)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Star className={`w-4 h-4 ${email.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReply(email)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Reply className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleArchive(email)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Archive className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(email)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
              <h3 className="text-lg font-semibold text-gray-900">Email Details</h3>
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ×
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
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">{selectedEmail.preview}</p>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => handleReply(selectedEmail)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
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

      {/* Compose Modal */}
      {composeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Compose Email</h3>
                <button
                  onClick={() => setComposeOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter recipient email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-64"
                  placeholder="Type your message here..."
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setComposeOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setComposeOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
