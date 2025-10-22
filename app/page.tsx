'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import SettingsComponent from './components/Settings'
import SimpleAnalytics from '../components/SimpleAnalytics'
import CategoryManager from '../components/CategoryManager'
import SettingsPage from '../components/SettingsPage'
import CalendarView from '../components/CalendarView'
import EnhancedSmartInbox from '../components/EnhancedSmartInbox'
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
  Zap,
  Inbox,
  Calendar
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
  meetingTime?: string
  meetingType?: string
  deadline?: string
  eventType?: string
  isTimeSensitive?: boolean
}

const mockEmails: Email[] = [
  // URGENT EMAILS (2)
  {
    id: '1',
    from: 'Sarah Chen',
    subject: 'Q4 Planning Meeting - Tomorrow 2PM',
    preview: 'Hi team, just a reminder about our Q4 planning meeting tomorrow at 2PM. We need to finalize the budget allocations and discuss the new product launch timeline. Please prepare your department reports.',
    time: '2 min ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true,
    meetingTime: '2024-01-15T14:00:00Z',
    meetingType: 'planning'
  },
  {
    id: '2',
    from: 'John Smith',
    subject: 'Contract Review - Urgent',
    preview: 'The legal team needs your review of the new contract by EOD. This is critical for the merger deal closing tomorrow. Please prioritize this and provide your feedback within 2 hours.',
    time: '15 min ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    deadline: '2024-01-14T17:00:00Z',
    isTimeSensitive: true
  },
  // IMPORTANT EMAILS (3)
  {
    id: '3',
    from: 'Finance Team',
    subject: 'Budget Approval Required',
    preview: 'We need your approval for the Q4 marketing budget increase. The proposal includes additional funds for digital advertising and event sponsorships.',
    time: '1 hour ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: true
  },
  {
    id: '4',
    from: 'HR Department',
    subject: 'Performance Review Schedule',
    preview: 'Annual performance reviews are starting next week. Please review the attached schedule and prepare your team evaluations.',
    time: '2 hours ago',
    isRead: true,
    isStarred: false,
    isImportant: true,
    hasAttachment: false
  },
  {
    id: '5',
    from: 'IT Security',
    subject: 'Security Policy Update',
    preview: 'New security protocols are being implemented next Monday. Please review the updated policies and ensure your team is aware of the changes.',
    time: '3 hours ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true
  },
  // MEETING EMAILS (4)
  {
    id: '6',
    from: 'Alex Rodriguez',
    subject: 'Team Standup - Rescheduled',
    preview: 'Our daily standup has been moved to 10:30 AM due to the client call. Please update your calendars accordingly.',
    time: '30 min ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: '2024-01-14T10:30:00Z',
    meetingType: 'standup'
  },
  {
    id: '7',
    from: 'Lisa Wang',
    subject: 'Client Presentation Prep',
    preview: 'Let\'s schedule a prep meeting for the client presentation next week. I\'m thinking Tuesday at 3 PM. Does that work for everyone?',
    time: '1 hour ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: '2024-01-16T15:00:00Z',
    meetingType: 'presentation'
  },
  {
    id: '8',
    from: 'Mike Johnson',
    subject: 'Board Meeting Agenda',
    preview: 'The board meeting agenda has been finalized. Please review the attached document and prepare your quarterly reports.',
    time: '2 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: true
  },
  {
    id: '9',
    from: 'Jennifer Lee',
    subject: 'All Hands Meeting - Friday',
    preview: 'Our monthly all-hands meeting is scheduled for Friday at 2 PM. We\'ll be discussing company updates and Q4 goals.',
    time: '4 hours ago',
    isRead: true,
    isStarred: true,
    isImportant: false,
    hasAttachment: false
  },
  // GENERAL EMAILS (3)
  {
    id: '10',
    from: 'Marketing Team',
    subject: 'Weekly Newsletter - Product Updates',
    preview: 'Please review the attached newsletter draft for this week. We\'ve included updates on our latest product features and customer testimonials.',
    time: '5 hours ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false
  },
  {
    id: '11',
    from: 'Tech Support',
    subject: 'System Maintenance Tonight',
    preview: 'We will be performing system maintenance tonight from 11 PM to 2 AM. Some services may be temporarily unavailable.',
    time: '6 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false
  },
  {
    id: '12',
    from: 'Office Admin',
    subject: 'Office Supplies Order',
    preview: 'The monthly office supplies order has been placed. Items should arrive by next Tuesday. Let me know if you need anything specific.',
    time: '1 day ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false
  },
  // CALENDAR-AWARE EMAILS
  {
    id: '13',
    from: 'Conference Team',
    subject: 'Tech Conference 2024 - Registration Deadline',
    preview: 'Registration for Tech Conference 2024 closes tomorrow at 5 PM. Early bird pricing ends today. Don\'t miss out on this networking opportunity!',
    time: '3 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    deadline: '2024-01-14T17:00:00Z',
    eventType: 'conference',
    isTimeSensitive: true
  },
  {
    id: '14',
    from: 'HR Department',
    subject: 'All-Hands Meeting - Today 3PM',
    preview: 'Reminder: All-hands meeting today at 3 PM in the main conference room. We\'ll be discussing Q4 results and 2024 strategy. Attendance is mandatory.',
    time: '45 min ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: false,
    meetingTime: '2024-01-14T15:00:00Z',
    meetingType: 'all-hands'
  },
  {
    id: '15',
    from: 'Project Manager',
    subject: 'Sprint Planning - Tomorrow 9AM',
    preview: 'Sprint planning meeting tomorrow at 9 AM. Please review the backlog and come prepared with your capacity estimates for the next sprint.',
    time: '2 hours ago',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: true,
    meetingTime: '2024-01-15T09:00:00Z',
    meetingType: 'sprint-planning'
  },
  {
    id: '16',
    from: 'Training Coordinator',
    subject: 'Webinar: AI in Business - This Friday',
    preview: 'Join us for an exclusive webinar on AI in Business this Friday at 2 PM. Learn about the latest trends and how to implement AI solutions in your workflow.',
    time: '4 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: '2024-01-19T14:00:00Z',
    eventType: 'webinar'
  },
  
  // ADDITIONAL CALENDAR DUMMY DATA
  // Today's Meetings
  {
    id: '17',
    from: 'CEO Office',
    subject: 'Board Meeting - 9:00 AM',
    preview: 'Quarterly board meeting to discuss company performance and strategic initiatives. Please review the attached financial reports.',
    time: '30 min ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true,
    meetingTime: new Date().toISOString().split('T')[0] + 'T09:00:00Z',
    meetingType: 'board-meeting'
  },
  {
    id: '18',
    from: 'Product Team',
    subject: 'Sprint Retrospective - 11:00 AM',
    preview: 'Weekly sprint retrospective to review completed work and plan improvements for next sprint.',
    time: '1 hour ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: new Date().toISOString().split('T')[0] + 'T11:00:00Z',
    meetingType: 'retrospective'
  },
  {
    id: '19',
    from: 'Client Success',
    subject: 'Client Check-in - 2:00 PM',
    preview: 'Monthly check-in with our key client to review project progress and address any concerns.',
    time: '2 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    meetingTime: new Date().toISOString().split('T')[0] + 'T14:00:00Z',
    meetingType: 'client-meeting'
  },
  
  // Tomorrow's Meetings
  {
    id: '20',
    from: 'HR Department',
    subject: 'Team Building Workshop - 10:00 AM',
    preview: 'Quarterly team building workshop focused on collaboration and communication skills.',
    time: '3 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: true,
    meetingTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T10:00:00Z',
    meetingType: 'workshop'
  },
  {
    id: '21',
    from: 'Engineering Lead',
    subject: 'Code Review Session - 3:00 PM',
    preview: 'Weekly code review session to maintain code quality and share best practices.',
    time: '4 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T15:00:00Z',
    meetingType: 'code-review'
  },
  
  // This Week's Events
  {
    id: '22',
    from: 'Marketing Team',
    subject: 'Campaign Launch - Wednesday 1:00 PM',
    preview: 'Launch meeting for our new product campaign. All stakeholders need to be present.',
    time: '5 hours ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true,
    meetingTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T13:00:00Z',
    meetingType: 'launch-meeting'
  },
  {
    id: '23',
    from: 'Sales Team',
    subject: 'Quarterly Sales Review - Thursday 10:00 AM',
    preview: 'Review Q4 sales performance and plan for Q1 targets. Please prepare your sales reports.',
    time: '6 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T10:00:00Z',
    meetingType: 'sales-review'
  },
  
  // Upcoming Deadlines
  {
    id: '24',
    from: 'Legal Team',
    subject: 'Contract Renewal Deadline - Friday',
    preview: 'Important: Our main vendor contract expires this Friday. We need to finalize the renewal terms.',
    time: '7 hours ago',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true,
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T17:00:00Z',
    isTimeSensitive: true
  },
  {
    id: '25',
    from: 'Finance Department',
    subject: 'Budget Submission - Next Monday',
    preview: 'Department budgets for Q1 need to be submitted by Monday. Please review the guidelines.',
    time: '8 hours ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: true,
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T17:00:00Z',
    isTimeSensitive: true
  },
  
  // Events & Webinars
  {
    id: '26',
    from: 'Tech Conference',
    subject: 'AI Innovation Summit - Next Week',
    preview: 'Join us for the annual AI Innovation Summit featuring industry leaders and cutting-edge presentations.',
    time: '1 day ago',
    isRead: false,
    isStarred: true,
    isImportant: false,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T09:00:00Z',
    eventType: 'conference'
  },
  {
    id: '27',
    from: 'Training Institute',
    subject: 'Leadership Development Webinar',
    preview: 'Free webinar on modern leadership practices and team management strategies.',
    time: '1 day ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T14:00:00Z',
    eventType: 'webinar'
  },
  {
    id: '28',
    from: 'Industry Association',
    subject: 'Networking Event - Next Friday',
    preview: 'Monthly networking event for industry professionals. Great opportunity to meet potential partners.',
    time: '2 days ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T18:00:00Z',
    eventType: 'networking'
  },
  
  // Recurring Events
  {
    id: '29',
    from: 'Team Lead',
    subject: 'Weekly Team Sync - Every Monday 9:00 AM',
    preview: 'Regular team synchronization meeting to align on priorities and address blockers.',
    time: '2 days ago',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T09:00:00Z',
    meetingType: 'recurring'
  },
  {
    id: '30',
    from: 'HR Department',
    subject: 'Monthly All-Hands - First Friday',
    preview: 'Monthly company-wide meeting to share updates, celebrate achievements, and discuss company direction.',
    time: '3 days ago',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    meetingTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T15:00:00Z',
    meetingType: 'all-hands'
  }
]

export default function EmailClient() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [activeTab, setActiveTab] = useState('analytics')
  const [searchQuery, setSearchQuery] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)
  const [selectedSmartCategory, setSelectedSmartCategory] = useState<string | undefined>(undefined)
  const [smartInboxView, setSmartInboxView] = useState<'categories' | 'summaries' | 'auto-reply'>('categories')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [autoReplyOpen, setAutoReplyOpen] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [selectedEmailForAction, setSelectedEmailForAction] = useState<Email | null>(null)
  const [editableReply, setEditableReply] = useState('')
  const [categoryManagerOpen, setCategoryManagerOpen] = useState(false)
  const [customCategories, setCustomCategories] = useState([
    {
      id: '1',
      name: 'VIP Clients',
      color: 'purple',
      icon: 'Star',
      description: 'High-priority client communications',
      rules: [
        {
          id: '1',
          type: 'sender' as const,
          operator: 'contains' as const,
          value: 'ceo@company.com',
          enabled: true
        }
      ],
      isDefault: false,
      emailCount: 12
    },
    {
      id: '2',
      name: 'Marketing',
      color: 'green',
      icon: 'Target',
      description: 'Marketing and promotional emails',
      rules: [
        {
          id: '1',
          type: 'subject' as const,
          operator: 'contains' as const,
          value: 'marketing',
          enabled: true
        }
      ],
      isDefault: false,
      emailCount: 8
    }
  ])

  // Filter emails based on selected smart category
  const getFilteredEmails = () => {
    if (!selectedSmartCategory) return mockEmails
    
    // Check if it's a custom category
    const customCategory = customCategories.find(cat => cat.id === selectedSmartCategory)
    if (customCategory) {
      return mockEmails.filter(email => {
        return customCategory.rules.some(rule => {
          if (!rule.enabled) return false
          
          switch (rule.type) {
            case 'sender':
              return email.from.toLowerCase().includes(rule.value.toLowerCase())
            case 'subject':
              return email.subject.toLowerCase().includes(rule.value.toLowerCase())
            default:
              return false
          }
        })
      })
    }
    
    // Default categories
    switch (selectedSmartCategory) {
      case 'urgent':
        return mockEmails.filter(e => e.isImportant && (e.subject.toLowerCase().includes('urgent') || e.subject.toLowerCase().includes('contract')))
      case 'important':
        return mockEmails.filter(e => e.isImportant && !e.subject.toLowerCase().includes('urgent') && !e.subject.toLowerCase().includes('contract'))
      case 'meetings':
        return mockEmails.filter(e => e.subject.toLowerCase().includes('meeting') || e.subject.toLowerCase().includes('standup') || e.subject.toLowerCase().includes('presentation') || e.subject.toLowerCase().includes('board'))
      case 'tasks':
        return mockEmails.filter(e => e.subject.toLowerCase().includes('task') || e.subject.toLowerCase().includes('action') || e.subject.toLowerCase().includes('approval'))
      case 'notifications':
        return mockEmails.filter(e => e.subject.toLowerCase().includes('newsletter') || e.subject.toLowerCase().includes('maintenance') || e.subject.toLowerCase().includes('supplies'))
      // Calendar-aware categories
      case 'todays-meetings':
        return mockEmails.filter(e => e.meetingTime && new Date(e.meetingTime).toDateString() === new Date().toDateString())
      case 'time-sensitive':
        return mockEmails.filter(e => e.isTimeSensitive || e.deadline || e.subject.toLowerCase().includes('deadline') || e.subject.toLowerCase().includes('urgent'))
      case 'events':
        return mockEmails.filter(e => e.eventType || e.subject.toLowerCase().includes('conference') || e.subject.toLowerCase().includes('webinar') || e.subject.toLowerCase().includes('event'))
      default:
        return mockEmails
    }
  }

  const smartFilteredEmails = getFilteredEmails()

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'smart', name: 'Smart Inbox', icon: Brain },
    { id: 'calendar', name: 'Smart Calendar', icon: Calendar },
    { id: 'automation', name: 'Automation', icon: Workflow },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const mainFilteredEmails = mockEmails.filter(email => {
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

  const handleAutoReply = (email: Email) => {
    setSelectedEmailForAction(email)
    // Generate AI reply content
    const aiReply = email.isImportant ? 
      `Hi ${email.from.split(' ')[0]},\n\nThank you for your urgent email regarding ${email.subject.toLowerCase().includes('meeting') ? 'the meeting request' : 'this matter'}. I understand this requires immediate attention and I will prioritize this accordingly.\n\n${email.subject.toLowerCase().includes('meeting') ? 'I will review my calendar and get back to you with available times within the next 2 hours.' : 'I will review the details and provide you with a comprehensive response by end of business day.'}\n\nBest regards,\n[Your Name]` :
      `Hi ${email.from.split(' ')[0]},\n\nThank you for reaching out regarding ${email.subject}. I have received your message and will review it carefully.\n\n${email.subject.toLowerCase().includes('meeting') ? 'I will check my availability and respond with potential meeting times.' : 'I will get back to you with a detailed response within 24 hours.'}\n\nBest regards,\n[Your Name]`
    setEditableReply(aiReply)
    setAutoReplyOpen(true)
  }

  const handleSummary = (email: Email) => {
    setSelectedEmailForAction(email)
    setSummaryOpen(true)
  }

  const handleStar = (email: Email) => {
    console.log('Starring:', email.subject)
  }

  const handleArchive = (email: Email) => {
    console.log('Archiving:', email.subject)
  }

  const handleDelete = (email: Email) => {
    console.log('Deleting:', email.subject)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 flex flex-col flex-shrink-0 shadow-xl">
        <div className="p-4 border-b border-slate-200/50">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold gradient-text">Aiden Email</span>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-300 card-hover ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-lg'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </div>
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold gradient-text">
              {activeTab === 'inbox' ? 'Inbox' :
               activeTab === 'smart' ? 'Smart Inbox' :
               activeTab === 'analytics' ? 'Email Analytics' :
               activeTab === 'calendar' ? 'Smart Calendar' :
               activeTab === 'automation' ? 'Email Automation' :
               'Aiden Email'}
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 max-w-full">
          {activeTab === 'smart' ? (
            <EnhancedSmartInbox
              emails={mockEmails}
              onEmailSelect={setSelectedEmail}
              onCategoryChange={setSelectedSmartCategory}
            />
          ) : activeTab === 'analytics' ? (
            <SimpleAnalytics
              emails={mockEmails}
              selectedCategory={selectedCategory || undefined}
              onCategoryClick={(category) => {
                setActiveTab('smart')
                setSelectedSmartCategory(category)
              }}
            />
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No content available for this tab</p>
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
                onClick={() => handleAutoReply(selectedEmail)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Bot className="w-4 h-4 mr-2" />
                Auto Reply
              </button>
              <button
                onClick={() => handleSummary(selectedEmail)}
                className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                AI Summary
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
                onClick={() => handleAutoReply(selectedEmail)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Bot className="w-4 h-4 mr-2" />
                Auto Reply
              </button>
              <button 
                onClick={() => handleSummary(selectedEmail)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                AI Summary
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

      {/* Auto Reply Modal */}
      {autoReplyOpen && selectedEmailForAction && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setAutoReplyOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Auto Reply Options</h3>
                <button
                  onClick={() => setAutoReplyOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Email: {selectedEmailForAction.subject}</h4>
                <p className="text-sm text-gray-600">From: {selectedEmailForAction.from}</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">AI-Generated Response</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">92% Confidence</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Subject:</strong> Re: {selectedEmailForAction.subject}
                    </div>
                    <textarea
                      value={editableReply}
                      onChange={(e) => setEditableReply(e.target.value)}
                      className="w-full h-48 p-3 border border-gray-300 rounded-lg text-sm text-gray-900 leading-relaxed resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      placeholder="Edit your AI-generated reply..."
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      💡 You can edit the AI-generated response above. The AI has analyzed the email context and generated this personalized reply.
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-900">Professional Tone</span>
                    </div>
                    <p className="text-sm text-green-700">Formal and courteous response</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-blue-900">Context Aware</span>
                    </div>
                    <p className="text-sm text-blue-700">Tailored to email content</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-purple-900">Time Sensitive</span>
                    </div>
                    <p className="text-sm text-purple-700">Appropriate response timeline</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-orange-900">Action Oriented</span>
                    </div>
                    <p className="text-sm text-orange-700">Clear next steps included</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setAutoReplyOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Regenerate AI reply
                    const aiReply = selectedEmailForAction.isImportant ? 
                      `Hi ${selectedEmailForAction.from.split(' ')[0]},\n\nThank you for your urgent email regarding ${selectedEmailForAction.subject.toLowerCase().includes('meeting') ? 'the meeting request' : 'this matter'}. I understand this requires immediate attention and I will prioritize this accordingly.\n\n${selectedEmailForAction.subject.toLowerCase().includes('meeting') ? 'I will review my calendar and get back to you with available times within the next 2 hours.' : 'I will review the details and provide you with a comprehensive response by end of business day.'}\n\nBest regards,\n[Your Name]` :
                      `Hi ${selectedEmailForAction.from.split(' ')[0]},\n\nThank you for reaching out regarding ${selectedEmailForAction.subject}. I have received your message and will review it carefully.\n\n${selectedEmailForAction.subject.toLowerCase().includes('meeting') ? 'I will check my availability and respond with potential meeting times.' : 'I will get back to you with a detailed response within 24 hours.'}\n\nBest regards,\n[Your Name]`
                    setEditableReply(aiReply)
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Regenerate
                </button>
              </div>
              <button
                onClick={() => setAutoReplyOpen(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Reply
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Summary Modal */}
      {summaryOpen && selectedEmailForAction && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSummaryOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">AI Email Summary</h3>
                <button
                  onClick={() => setSummaryOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedEmailForAction.subject}</h4>
                <p className="text-sm text-gray-600">From: {selectedEmailForAction.from} • {selectedEmailForAction.time}</p>
              </div>
              
              <div className="space-y-4">
                {/* Simple Email Summary */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-blue-900 text-lg">AI Email Summary</h5>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">95% Confidence</span>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
                    <div className="mb-4">
                      <h6 className="font-semibold text-gray-900 mb-2">📧 Email Summary</h6>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-800 leading-relaxed text-base">
                          <strong>From:</strong> {selectedEmailForAction.from}<br/>
                          <strong>Subject:</strong> {selectedEmailForAction.subject}<br/>
                          <strong>Received:</strong> {selectedEmailForAction.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h6 className="font-semibold text-blue-900 mb-3">📝 Content Summary</h6>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-gray-800 leading-relaxed text-base">
                          {selectedEmailForAction.isImportant ? (
                            <>
                              <strong>Urgent Business Matter:</strong> The legal team needs your review of the new contract by EOD. This is a high-priority request requiring immediate attention. The contract contains critical terms that need your approval before the deadline.
                              <br/><br/>
                              <strong>Key Details:</strong> The contract review involves several important clauses that need your expertise. The legal team has highlighted specific sections that require your input, particularly around liability terms and payment schedules.
                              <br/><br/>
                              <strong>Action Required:</strong> Please review the attached contract document and provide your feedback by end of business day. The legal team is waiting for your approval to proceed with the next steps.
                            </>
                          ) : (
                            <>
                              <strong>Business Communication:</strong> {selectedEmailForAction.preview}
                              <br/><br/>
                              <strong>Context:</strong> This email contains {selectedEmailForAction.subject.toLowerCase().includes('meeting') ? 'meeting scheduling information and coordination details' : 'standard business information and updates'}.
                              <br/><br/>
                              <strong>Next Steps:</strong> {selectedEmailForAction.subject.toLowerCase().includes('meeting') ? 'Please review the meeting details and confirm your availability' : 'Please review the information and respond as appropriate'}.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h6 className="font-semibold text-green-900 mb-2">🎯 Key Points</h6>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• {selectedEmailForAction.isImportant ? 'This is an urgent email requiring immediate attention' : 'This is a standard business communication'}</li>
                        <li>• {selectedEmailForAction.subject.toLowerCase().includes('meeting') ? 'The email is about scheduling a meeting or discussing meeting arrangements' : 'The email contains business information or requests'}</li>
                        <li>• {selectedEmailForAction.isImportant ? 'Response time should be within 2-4 hours' : 'Standard response time of 24-48 hours is appropriate'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSummaryOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => setSummaryOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy Summary
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Category Manager Modal */}
      {categoryManagerOpen && (
        <CategoryManager
          categories={customCategories}
          onCategoriesUpdate={(categories) => setCustomCategories(categories as any)}
          onClose={() => setCategoryManagerOpen(false)}
        />
      )}
    </div>
  )
}