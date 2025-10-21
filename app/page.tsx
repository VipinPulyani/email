'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import SettingsComponent from './components/Settings'
import EnhancedAnalytics from '../components/EnhancedAnalytics'
import CategoryManager from '../components/CategoryManager'
import SettingsPage from '../components/SettingsPage'
import CalendarView from '../components/CalendarView'
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
  const [selectedSmartCategory, setSelectedSmartCategory] = useState<string | null>(null)
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
            case 'content':
              return email.preview.toLowerCase().includes(rule.value.toLowerCase())
            case 'time':
              return email.time.toLowerCase().includes(rule.value.toLowerCase())
            case 'priority':
              return rule.value === 'high' ? email.isImportant : !email.isImportant
            case 'attachment':
              return rule.value === 'true' ? email.hasAttachment : !email.hasAttachment
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
    { id: 'analytics', name: 'Analytics', count: mockEmails.length, icon: BarChart3 },
    { id: 'smart', name: 'Smart Inbox', count: mockEmails.length, icon: Brain },
    { id: 'calendar', name: 'Smart Calendar', count: mockEmails.filter(e => e.meetingTime || e.eventType).length, icon: Calendar },
    { id: 'automation', name: 'Automation', count: 3, icon: Workflow },
    { id: 'settings', name: 'Settings', count: 0, icon: Settings }
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
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === 'inbox' ? 'Inbox' :
               activeTab === 'smart' ? 'Smart Inbox' :
               activeTab === 'analytics' ? 'Email Analytics' :
               activeTab === 'calendar' ? 'Smart Calendar' :
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
        <div className="flex-1 overflow-y-auto p-4 max-w-full">
          {activeTab === 'smart' ? (
            <div className="space-y-4">
              {/* Smart Inbox Navigation */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Smart Inbox</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSmartInboxView('categories')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        smartInboxView === 'categories'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Categories
                    </button>
                    <button
                      onClick={() => setSmartInboxView('summaries')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        smartInboxView === 'summaries'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Summaries
                    </button>
                    <button
                      onClick={() => setSmartInboxView('auto-reply')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        smartInboxView === 'auto-reply'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Auto Reply
                    </button>
                  </div>
                </div>

                {/* Categories View */}
                {smartInboxView === 'categories' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">Smart Categories</h4>
                        {selectedCategory && (
                          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            Filtered by: {selectedCategory}
                          </div>
                        )}
                      </div>
                      {selectedSmartCategory && (
                        <button
                          onClick={() => {
                            setSelectedSmartCategory(null)
                            setSelectedCategory(null)
                          }}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          Show All
                        </button>
                      )}
                    </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setSelectedSmartCategory(selectedSmartCategory === 'urgent' ? null : 'urgent')}
                    className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                      selectedSmartCategory === 'urgent' 
                        ? 'bg-red-100 border-red-300 ring-2 ring-red-200' 
                        : 'bg-red-50 border-red-200 hover:bg-red-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-900">Urgent</span>
                    </div>
                    <div className="text-sm text-red-700">2 emails requiring immediate attention</div>
                  </button>
                  <button 
                    onClick={() => setSelectedSmartCategory(selectedSmartCategory === 'important' ? null : 'important')}
                    className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                      selectedSmartCategory === 'important' 
                        ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200' 
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Important</span>
                    </div>
                    <div className="text-sm text-blue-700">3 emails from key contacts</div>
                  </button>
                  <button 
                    onClick={() => setSelectedSmartCategory(selectedSmartCategory === 'meetings' ? null : 'meetings')}
                    className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                      selectedSmartCategory === 'meetings' 
                        ? 'bg-green-100 border-green-300 ring-2 ring-green-200' 
                        : 'bg-green-50 border-green-200 hover:bg-green-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Meetings</span>
                    </div>
                    <div className="text-sm text-green-700">4 meeting requests</div>
                  </button>
                  <button 
                    onClick={() => setSelectedSmartCategory(selectedSmartCategory === 'notifications' ? null : 'notifications')}
                    className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                      selectedSmartCategory === 'notifications' 
                        ? 'bg-yellow-100 border-yellow-300 ring-2 ring-yellow-200' 
                        : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Bell className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-900">Notifications</span>
                    </div>
                    <div className="text-sm text-yellow-700">3 system notifications</div>
                  </button>
                </div>

                {/* Custom Categories */}
                {customCategories.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Custom Categories</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {customCategories.map((category) => {
                        const getIconComponent = (iconName: string) => {
                          const iconMap: { [key: string]: any } = {
                            'Star': Star,
                            'Target': Target,
                            'Mail': Mail,
                            'Bell': Bell,
                            'User': User,
                            'Calendar': Calendar
                          }
                          return iconMap[iconName] || Mail
                        }
                        
                        const getColorClasses = (color: string) => {
                          const colorMap: { [key: string]: any } = {
                            'purple': {
                              bg: 'bg-purple-50',
                              border: 'border-purple-200',
                              hover: 'hover:bg-purple-100',
                              selected: 'bg-purple-100 border-purple-300 ring-2 ring-purple-200',
                              icon: 'text-purple-600',
                              text: 'text-purple-900',
                              desc: 'text-purple-700'
                            },
                            'green': {
                              bg: 'bg-green-50',
                              border: 'border-green-200',
                              hover: 'hover:bg-green-100',
                              selected: 'bg-green-100 border-green-300 ring-2 ring-green-200',
                              icon: 'text-green-600',
                              text: 'text-green-900',
                              desc: 'text-green-700'
                            }
                          }
                          return colorMap[color] || colorMap['purple']
                        }
                        
                        const colors = getColorClasses(category.color)
                        const IconComponent = getIconComponent(category.icon)
                        const isSelected = selectedSmartCategory === category.id
                        
                        return (
                          <button 
                            key={category.id}
                            onClick={() => setSelectedSmartCategory(isSelected ? null : category.id)}
                            className={`p-3 rounded-lg border transition-all hover:shadow-md ${colors.bg} ${colors.border} ${
                              isSelected ? colors.selected : colors.hover
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                              <span className={`font-medium ${colors.text}`}>{category.name}</span>
                            </div>
                            <div className={`text-sm ${colors.desc}`}>
                              {category.emailCount} emails • {category.rules.length} rules
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Meeting Preparation Tools */}
                {selectedSmartCategory === 'todays-meetings' && (
                  <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-purple-900">Meeting Preparation</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3 border border-purple-200">
                        <h5 className="font-medium text-gray-900 mb-2">📋 Meeting Checklist</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Review agenda and materials</li>
                          <li>• Prepare talking points</li>
                          <li>• Check meeting room availability</li>
                          <li>• Send calendar invites to attendees</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-purple-200">
                        <h5 className="font-medium text-gray-900 mb-2">⏰ Time Management</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Set up 15-min prep time</li>
                          <li>• Block 30-min post-meeting buffer</li>
                          <li>• Prepare follow-up action items</li>
                          <li>• Schedule next meeting if needed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Deadline Tracking */}
                {selectedSmartCategory === 'time-sensitive' && (
                  <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <h4 className="font-medium text-orange-900">Deadline Tracking</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <h5 className="font-medium text-gray-900 mb-2">🚨 Urgent (Today)</h5>
                        <div className="text-sm text-gray-600">
                          {mockEmails.filter(e => e.deadline && new Date(e.deadline).toDateString() === new Date().toDateString()).length} items due today
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <h5 className="font-medium text-gray-900 mb-2">⏰ This Week</h5>
                        <div className="text-sm text-gray-600">
                          {mockEmails.filter(e => e.deadline && new Date(e.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length} items due this week
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <h5 className="font-medium text-gray-900 mb-2">📅 Upcoming</h5>
                        <div className="text-sm text-gray-600">
                          {mockEmails.filter(e => e.deadline && new Date(e.deadline) > new Date()).length} future deadlines
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Calendar Integration */}
                {selectedSmartCategory === 'events' && (
                  <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Target className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-medium text-indigo-900">Calendar Integration</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3 border border-indigo-200">
                        <h5 className="font-medium text-gray-900 mb-2">📅 Add to Calendar</h5>
                        <p className="text-sm text-gray-600 mb-3">Convert email events to calendar entries</p>
                        <button className="w-full bg-indigo-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                          Sync with Google Calendar
                        </button>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-indigo-200">
                        <h5 className="font-medium text-gray-900 mb-2">🔗 Meeting Context</h5>
                        <p className="text-sm text-gray-600 mb-3">View related emails for each meeting</p>
                        <button className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                          Show Meeting Threads
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email List for Selected Category */}
                {selectedSmartCategory && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      {selectedSmartCategory === 'urgent' && '🚨 Urgent Emails'}
                      {selectedSmartCategory === 'important' && '⭐ Important Emails'}
                      {selectedSmartCategory === 'meetings' && '📅 Meeting Emails'}
                      {selectedSmartCategory === 'tasks' && '📋 Task Emails'}
                      {selectedSmartCategory === 'notifications' && '🔔 Notification Emails'}
                      {selectedSmartCategory === 'marketing' && '📧 Marketing Emails'}
                      {selectedSmartCategory === 'todays-meetings' && '📅 Today\'s Meetings'}
                      {selectedSmartCategory === 'time-sensitive' && '⏰ Time-Sensitive Emails'}
                      {selectedSmartCategory === 'events' && '🎯 Events & Webinars'}
                      {customCategories.find(cat => cat.id === selectedSmartCategory) && 
                        `📁 ${customCategories.find(cat => cat.id === selectedSmartCategory)?.name} Emails`}
                    </h4>
                    <div className="space-y-3 max-w-full">
                      {smartFilteredEmails.map((email, index) => (
                        <div 
                          key={email.id} 
                          className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer max-w-full"
                          onClick={() => setSelectedEmail(email)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${email.isImportant ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                              <span className="font-medium text-gray-900">{email.from}</span>
                              {email.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            </div>
                            <span className="text-sm text-gray-500">{email.time}</span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1 break-words">{email.subject}</h3>
                          <p className="text-sm text-gray-600 mb-2 break-words">{email.preview}</p>
                          <div className="flex items-center space-x-2">
                            {email.isImportant && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">High Priority</span>
                            )}
                            {email.subject.toLowerCase().includes('meeting') && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Meeting</span>
                            )}
                            {email.hasAttachment && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Attachment</span>
                            )}
                            {email.meetingTime && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(email.meetingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              </span>
                            )}
                            {email.deadline && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Deadline: {new Date(email.deadline).toLocaleDateString()}</span>
                              </span>
                            )}
                            {email.eventType && (
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs capitalize">
                                {email.eventType}
                              </span>
                            )}
                            {email.isTimeSensitive && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Time-Sensitive</span>
                            )}
                          </div>
                          
                          {/* Calendar Action Buttons */}
                          {(email.meetingTime || email.eventType) && (
                            <div className="flex items-center space-x-2 mt-2">
                              {email.meetingTime && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    console.log('Add to calendar:', email.subject)
                                  }}
                                  className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors"
                                >
                                  <Calendar className="w-3 h-3" />
                                  <span>Add to Calendar</span>
                                </button>
                              )}
                              {email.eventType && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    console.log('View event details:', email.subject)
                                  }}
                                  className="flex items-center space-x-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs hover:bg-indigo-200 transition-colors"
                                >
                                  <Target className="w-3 h-3" />
                                  <span>View Details</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                  </div>
                )}

                {/* Summaries View */}
                {smartInboxView === 'summaries' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-gray-900">AI Email Summaries</h4>
                    </div>
                    <div className="space-y-3">
                      {smartFilteredEmails.map((email, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{email.subject}</span>
                            <span className="text-xs text-gray-500">{email.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{email.preview}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {email.isImportant ? 'High Priority' : 'Normal Priority'}
                            </span>
                            {email.subject.toLowerCase().includes('meeting') && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Meeting</span>
                            )}
                            {email.isImportant && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Action Required</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            AI Confidence: {Math.floor(Math.random() * 20 + 80)}% • 
                            Key Topics: {email.isImportant ? 'Urgent, Action Required' : 'Information, Update'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Auto Reply View */}
                {smartInboxView === 'auto-reply' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Bot className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-gray-900">Auto Reply Rules</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <span className="font-medium">Out of Office</span>
                            <p className="text-sm text-gray-600">Automatically respond when away</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">12 responses</span>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Settings className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <span className="font-medium">Meeting Requests</span>
                            <p className="text-sm text-gray-600">Auto-respond to meeting requests</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">8 responses</span>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Settings className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <div>
                            <span className="font-medium">Support Inquiries</span>
                            <p className="text-sm text-gray-600">Respond to customer support emails</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">25 responses</span>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Settings className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Create New Rule
                    </button>
                  </div>
                )}
              </div>
              
              {/* Email List - Only show for categories view */}
              {smartInboxView === 'categories' && (
                <div className="space-y-2">
                {mockEmails.filter(email => {
                  if (!selectedSmartCategory) return true
                  
                  switch (selectedSmartCategory) {
                    case 'urgent':
                      return email.isImportant && email.subject.toLowerCase().includes('urgent')
                    case 'important':
                      return email.isImportant
                    case 'meetings':
                      return email.subject.toLowerCase().includes('meeting')
                    case 'tasks':
                      return email.subject.toLowerCase().includes('task') || email.subject.toLowerCase().includes('action')
                    case 'notifications':
                      return email.from.toLowerCase().includes('notification') || email.from.toLowerCase().includes('system')
                    case 'marketing':
                      return email.from.toLowerCase().includes('marketing') || email.from.toLowerCase().includes('newsletter')
                    default:
                      return true
                  }
                }).map((email) => (
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
                            {/* AI Category Badge */}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              email.isImportant ? 'bg-red-100 text-red-700' :
                              email.subject.toLowerCase().includes('meeting') ? 'bg-green-100 text-green-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {email.isImportant ? 'Urgent' :
                               email.subject.toLowerCase().includes('meeting') ? 'Meeting' :
                               'Important'}
                            </span>
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
                          {/* AI Insights */}
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">AI: </span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              {email.isImportant ? 'High Priority' : 'Normal Priority'}
                            </span>
                          </div>
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
                            handleAutoReply(email)
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Auto Reply"
                        >
                          <Bot className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSummary(email)
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="AI Summary"
                        >
                          <FileText className="w-4 h-4 text-gray-400" />
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
          ) : activeTab === 'analytics' ? (
            <EnhancedAnalytics 
                emails={mockEmails} 
                selectedCategory={selectedCategory}
                onCategoryClick={(category) => {
                  setSelectedCategory(category)
                  setActiveTab('smart')
                  // Map Analytics categories to Smart Inbox categories
                  const categoryMap: { [key: string]: string } = {
                    'Urgent': 'urgent',
                    'Important': 'important', 
                    'Meetings': 'meetings',
                    'Notifications': 'notifications'
                  }
                  setSelectedSmartCategory(categoryMap[category] || category.toLowerCase())
                }}
                onExport={(format) => {
                  console.log(`Exporting analytics as ${format}`)
                  // Here you would implement actual export functionality
                }}
              />
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
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-500">Response Rate</div>
                    <div className="text-xs text-green-600">Above average</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3h</div>
                    <div className="text-sm text-gray-500">Avg Response</div>
                    <div className="text-xs text-green-600">Faster than 80%</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">87/100</div>
                    <div className="text-sm text-gray-500">Productivity</div>
                    <div className="text-xs text-green-600">Excellent</div>
                  </div>
                </div>

                {/* Email Volume Chart */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Email Volume (Last 7 Days)</h4>
                  <div className="h-32 flex items-end space-x-2">
                    {[12, 8, 15, 10, 18, 14, 16].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="bg-purple-500 rounded-t w-full transition-all hover:bg-purple-600"
                          style={{ height: `${(height / 20) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Email Categories</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Work</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">3</span>
                        <span className="text-xs text-gray-500">(60%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Personal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">1</span>
                        <span className="text-xs text-gray-500">(20%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Marketing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">1</span>
                        <span className="text-xs text-gray-500">(20%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Productivity Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Productivity Insights</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">4</div>
                      <div className="text-sm text-gray-600">Emails Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2h 15m</div>
                      <div className="text-sm text-gray-600">Time Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-gray-600">Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">1h 45m</div>
                      <div className="text-sm text-gray-600">Focus Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'calendar' ? (
            <CalendarView
              emails={mockEmails}
              onEmailSelect={setSelectedEmail}
            />
          ) : activeTab === 'settings' ? (
            <SettingsPage
              customCategories={customCategories}
              onCategoriesUpdate={setCustomCategories}
            />
          ) : (
            /* Email List */
            <div className="space-y-2">
                {mainFilteredEmails.map((email) => (
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
                          handleAutoReply(email)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Auto Reply"
                      >
                        <Bot className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSummary(email)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="AI Summary"
                      >
                        <FileText className="w-4 h-4 text-gray-400" />
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
          onCategoriesUpdate={setCustomCategories}
          onClose={() => setCategoryManagerOpen(false)}
        />
      )}
    </div>
  )
}