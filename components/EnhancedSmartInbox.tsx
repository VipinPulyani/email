'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  RefreshCw,
  Eye,
  EyeOff,
  Archive,
  Clock3,
  Reply,
  Forward,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Users,
  Bell,
  Timer,
  TrendingDown,
  Activity,
  Focus,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Send,
  FileText,
  Mail,
  AlertCircle,
  CheckCircle2,
  Calendar as CalendarIcon,
  UserPlus,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Flag,
  Trash2,
  Edit,
  Copy,
  Share,
  Download,
  Upload,
  Lock,
  Unlock,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Maximize,
  Minimize,
  Move,
  GripVertical,
  Plus,
  Minus,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  RotateCw,
  Zap as ZapIcon,
  Target as TargetIcon,
  Brain as BrainIcon,
  Lightbulb,
  Trophy,
  Award,
  Flame,
  Heart,
  Smile,
  Frown,
  Meh,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  HelpCircle,
  ExternalLink,
  Link,
  Paperclip,
  Image,
  File,
  Folder,
  FolderOpen,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Power,
  PowerOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Headphones,
  Camera,
  CameraOff,
  MonitorOff,
  Smartphone,
  Tablet,
  Laptop,
  HardDrive,
  HardDriveIcon,
  Cpu,
  MemoryStick,
  HardDrive as HardDriveIcon2,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Cloud as CloudIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Battery as BatteryIcon,
  BatteryLow as BatteryLowIcon,
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Video as VideoIcon,
  VideoOff as VideoOffIcon,
  Phone as PhoneIcon,
  PhoneOff as PhoneOffIcon,
  Headphones as HeadphonesIcon,
  Camera as CameraIcon,
  CameraOff as CameraOffIcon,
  Monitor as MonitorIcon,
  MonitorOff as MonitorOffIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
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
  // Enhanced properties
  body?: string
  timestamp?: string
  category?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  sentiment?: 'positive' | 'neutral' | 'negative'
  intent?: 'task' | 'request' | 'fyi' | 'meeting' | 'approval'
  threadId?: string
  threadCount?: number
  attachments?: number
  snoozeUntil?: string
  assignedTo?: string
  tags?: string[]
  aiSummary?: string
  suggestedActions?: string[]
  hiddenPatterns?: {
    repeatedSender: boolean
    timeCluster: string
    urgencyTrend: 'increasing' | 'decreasing' | 'stable'
  }
}

interface SmartCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  count: number
  emails: Email[]
  isHidden: boolean
  order: number
  type: 'smart' | 'custom'
  microChart?: {
    trend: 'up' | 'down' | 'stable'
    value: number
    period: string
  }
}

interface SmartInboxProps {
  emails: Email[]
  onEmailSelect: (email: Email) => void
  onCategoryChange: (category: string) => void
}

export default function EnhancedSmartInbox({ emails, onEmailSelect, onCategoryChange }: SmartInboxProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [smartCategories, setSmartCategories] = useState<SmartCategory[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [focusMode, setFocusMode] = useState(false)
  const [inboxZeroProgress, setInboxZeroProgress] = useState(0)
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set())
  const [showIntentGroups, setShowIntentGroups] = useState(false)
  const [productivityInsights, setProductivityInsights] = useState<any>(null)
  const [contextualWidgets, setContextualWidgets] = useState<any[]>([])
  const [bulkActions, setBulkActions] = useState<{
    selectedEmails: Set<string>
    action: string | null
  }>({ selectedEmails: new Set(), action: null })

  // AI-powered categorization with enhanced features
  const categorizeEmails = (emails: Email[]) => {
    const categories: SmartCategory[] = [
      {
        id: 'urgent',
        name: 'Urgent',
        description: 'Time-sensitive emails requiring immediate attention',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'bg-red-500',
        count: 0,
        emails: [],
        isHidden: false,
        order: 1,
        type: 'smart',
        microChart: { trend: 'up', value: 12, period: '24h' }
      },
      {
        id: 'important',
        name: 'Important',
        description: 'High-priority emails from key contacts',
        icon: <Star className="w-5 h-5" />,
        color: 'bg-yellow-500',
        count: 0,
        emails: [],
        isHidden: false,
        order: 2,
        type: 'smart',
        microChart: { trend: 'stable', value: 8, period: '24h' }
      },
      {
        id: 'meetings',
        name: 'Meetings',
        description: 'Meeting invitations and calendar-related emails',
        icon: <Calendar className="w-5 h-5" />,
        color: 'bg-blue-500',
        count: 0,
        emails: [],
        isHidden: false,
        order: 3,
        type: 'smart',
        microChart: { trend: 'down', value: 5, period: '24h' }
      },
      {
        id: 'notifications',
        name: 'Notifications',
        description: 'System notifications and updates',
        icon: <Bell className="w-5 h-5" />,
        color: 'bg-gray-500',
        count: 0,
        emails: [],
        isHidden: false,
        order: 4,
        type: 'smart',
        microChart: { trend: 'stable', value: 15, period: '24h' }
      },
      {
        id: 'vip-clients',
        name: 'VIP Clients',
        description: 'High-value client communications',
        icon: <User className="w-5 h-5" />,
        color: 'bg-purple-500',
        count: 0,
        emails: [],
        isHidden: false,
        order: 5,
        type: 'custom',
        microChart: { trend: 'up', value: 3, period: '24h' }
      },
      {
        id: 'marketing',
        name: 'Marketing',
        description: 'Marketing campaigns and promotional emails',
        icon: <Target className="w-5 h-5" />,
        color: 'bg-green-500',
        count: 0,
        emails: [],
        isHidden: false,
        order: 6,
        type: 'custom',
        microChart: { trend: 'down', value: 7, period: '24h' }
      }
    ]

    // Categorize emails with enhanced AI features
    emails.forEach(email => {
      // Basic categorization
      if (email.subject.toLowerCase().includes('urgent') || email.priority === 'urgent') {
        categories[0].emails.push(email)
        categories[0].count++
      } else if (email.isImportant || email.priority === 'high') {
        categories[1].emails.push(email)
        categories[1].count++
      } else if (email.subject.toLowerCase().includes('meeting') || email.category === 'meeting') {
        categories[2].emails.push(email)
        categories[2].count++
      } else if (email.from.includes('noreply') || email.category === 'notification') {
        categories[3].emails.push(email)
        categories[3].count++
      } else if (email.from.includes('client') || email.category === 'vip') {
        categories[4].emails.push(email)
        categories[4].count++
      } else if (email.category === 'marketing') {
        categories[5].emails.push(email)
        categories[5].count++
      }
    })

    return categories
  }

  // Intent recognition grouping
  const groupByIntent = (emails: Email[]) => {
    const intentGroups = {
      task: emails.filter(e => e.intent === 'task'),
      request: emails.filter(e => e.intent === 'request'),
      fyi: emails.filter(e => e.intent === 'fyi'),
      meeting: emails.filter(e => e.intent === 'meeting'),
      approval: emails.filter(e => e.intent === 'approval')
    }
    return intentGroups
  }

  // Generate contextual widgets
  const generateContextualWidgets = (emails: Email[]) => {
    const widgets = []
    
    // Find emails that need replies
    const pendingReplies = emails.filter(e => !e.isRead && e.intent === 'request')
    if (pendingReplies.length > 0) {
      widgets.push({
        id: 'pending-replies',
        title: 'Pending Replies',
        description: `${pendingReplies.length} emails need your response`,
        action: 'View pending replies',
        icon: <Reply className="w-4 h-4" />,
        color: 'bg-blue-100 text-blue-700'
      })
    }

    // Find overdue tasks
    const overdueTasks = emails.filter(e => e.intent === 'task' && new Date(e.timestamp || e.time || Date.now()) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    if (overdueTasks.length > 0) {
      widgets.push({
        id: 'overdue-tasks',
        title: 'Overdue Tasks',
        description: `${overdueTasks.length} tasks are overdue`,
        action: 'Review overdue tasks',
        icon: <Clock className="w-4 h-4" />,
        color: 'bg-red-100 text-red-700'
      })
    }

    return widgets
  }

  // Calculate inbox zero progress
  const calculateInboxZeroProgress = (emails: Email[]) => {
    const totalEmails = emails.length
    const processedEmails = emails.filter(e => e.isRead || e.category === 'archived').length
    return Math.round((processedEmails / totalEmails) * 100)
  }

  // Generate productivity insights
  const generateProductivityInsights = (emails: Email[]) => {
    const insights = {
      timeSpentPerCategory: {
        urgent: Math.floor(Math.random() * 60) + 30,
        important: Math.floor(Math.random() * 45) + 20,
        meetings: Math.floor(Math.random() * 90) + 60,
        notifications: Math.floor(Math.random() * 15) + 5
      },
      actionableTips: [
        'Schedule 2-hour focus blocks for important emails',
        'Use auto-reply for routine notifications',
        'Batch process similar email types together',
        'Set up email rules to reduce manual sorting'
      ],
      weeklyDigest: {
        totalEmails: emails.length,
        responseRate: Math.floor(Math.random() * 20) + 80,
        averageResponseTime: Math.floor(Math.random() * 2) + 1,
        productivityScore: Math.floor(Math.random() * 20) + 75
      }
    }
    return insights
  }

  useEffect(() => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const categorized = categorizeEmails(emails)
      setSmartCategories(categorized)
      setInboxZeroProgress(calculateInboxZeroProgress(emails))
      setProductivityInsights(generateProductivityInsights(emails))
      setContextualWidgets(generateContextualWidgets(emails))
      setIsAnalyzing(false)
    }, 1500)
  }, [emails])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategoryChange(categoryId)
  }

  const handleEmailSnooze = (emailId: string, hours: number) => {
    // Implement snooze functionality
    console.log(`Snoozing email ${emailId} for ${hours} hours`)
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${bulkActions.selectedEmails.size} emails`)
  }

  const toggleThreadExpansion = (threadId: string) => {
    const newExpanded = new Set(expandedThreads)
    if (newExpanded.has(threadId)) {
      newExpanded.delete(threadId)
    } else {
      newExpanded.add(threadId)
    }
    setExpandedThreads(newExpanded)
  }

  const filteredCategories = focusMode 
    ? smartCategories.filter(cat => !cat.isHidden && cat.count > 0)
    : smartCategories

  const selectedCategoryData = smartCategories.find(cat => cat.id === selectedCategory)

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Controls */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold gradient-text">Smart Inbox</h2>
            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-sm text-purple-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Analyzing...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Focus Mode Toggle */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                focusMode 
                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {focusMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{focusMode ? 'Focus Mode' : 'Show All'}</span>
            </button>

            {/* Intent Groups Toggle */}
            <button
              onClick={() => setShowIntentGroups(!showIntentGroups)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showIntentGroups 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Intent</span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inbox Zero Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Inbox Zero Progress</span>
            <span className="text-sm text-gray-500">{inboxZeroProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${inboxZeroProgress}%` }}
            />
          </div>
        </div>

        {/* Contextual Widgets */}
        {contextualWidgets.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {contextualWidgets.map((widget) => (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${widget.color}`}
              >
                {widget.icon}
                <span className="font-medium">{widget.title}</span>
                <span className="text-xs opacity-75">{widget.description}</span>
                <button className="text-xs underline hover:no-underline">
                  {widget.action}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 p-4 overflow-y-auto">
          <div className="space-y-2">
            {/* All Emails */}
            <button
              onClick={() => handleCategorySelect('all')}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span className="font-medium">All Emails</span>
              </div>
              <span className="text-sm">{emails.length}</span>
            </button>

            {/* Smart Categories */}
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: category.order * 0.1 }}
                className="relative"
              >
                <button
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors group ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{category.name}</span>
                        {category.type === 'smart' && (
                          <Sparkles className="w-3 h-3 text-purple-500" />
                        )}
                      </div>
                      <p className="text-xs opacity-75">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {category.microChart && (
                      <div className="flex items-center space-x-1">
                        {category.microChart.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                        {category.microChart.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                        {category.microChart.trend === 'stable' && <Minus className="w-3 h-3 text-gray-500" />}
                        <span className="text-xs">{category.microChart.value}</span>
                      </div>
                    )}
                    <span className="text-sm">{category.count}</span>
                  </div>
                </button>

                {/* Drag Handle */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Intent Groups */}
          {showIntentGroups && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Intent Groups</h3>
              <div className="space-y-1">
                {Object.entries(groupByIntent(emails)).map(([intent, intentEmails]) => (
                  <button
                    key={intent}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <span className="capitalize">{intent}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{intentEmails.length}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {selectedCategoryData && (
            <div className="p-4">
              {/* Bulk Actions */}
              {bulkActions.selectedEmails.size > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">
                      {bulkActions.selectedEmails.size} emails selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBulkAction('mark-read')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        Mark as Read
                      </button>
                      <button
                        onClick={() => handleBulkAction('archive')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        Archive
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Email List */}
              <div className="space-y-2">
                {selectedCategoryData.emails.map((email, index) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer ${
                      !email.isRead ? 'border-l-4 border-l-purple-500' : ''
                    }`}
                    onClick={() => onEmailSelect(email)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900 truncate">
                            {email.from}
                          </span>
                          {email.isImportant && <Star className="w-4 h-4 text-yellow-500" />}
                          {email.priority === 'urgent' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          {email.attachments && <Paperclip className="w-4 h-4 text-gray-400" />}
                        </div>
                        
                        <h3 className="font-medium text-gray-900 mb-1 truncate">
                          {email.subject}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {email.body}
                        </p>

                        {/* Thread Collapsing */}
                        {email.threadId && (
                          <div className="flex items-center space-x-2 mb-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleThreadExpansion(email.threadId!)
                              }}
                              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                            >
                              {expandedThreads.has(email.threadId!) ? (
                                <ChevronDown className="w-3 h-3" />
                              ) : (
                                <ChevronRight className="w-3 h-3" />
                              )}
                              <span>{email.threadCount} messages in thread</span>
                            </button>
                          </div>
                        )}

                        {/* Inline Actionable Suggestions */}
                        {email.suggestedActions && email.suggestedActions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {email.suggestedActions.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  console.log(`Action: ${action}`)
                                }}
                                className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Hidden Patterns */}
                        {email.hiddenPatterns && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            {email.hiddenPatterns.repeatedSender && (
                              <span className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>Frequent sender</span>
                              </span>
                            )}
                            {email.hiddenPatterns.timeCluster && (
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{email.hiddenPatterns.timeCluster}</span>
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(email.timestamp || email.time || Date.now()).toLocaleString()}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              email.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                              email.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {email.sentiment}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              email.intent === 'task' ? 'bg-blue-100 text-blue-700' :
                              email.intent === 'request' ? 'bg-yellow-100 text-yellow-700' :
                              email.intent === 'meeting' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {email.intent}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 ml-4">
                        {/* Snooze Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEmailSnooze(email.id, 2)
                          }}
                          className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                          title="Snooze for 2 hours"
                        >
                          <Clock3 className="w-4 h-4" />
                        </button>

                        {/* Quick Actions */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Quick reply to', email.id)
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Quick Reply"
                        >
                          <Reply className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Archive', email.id)
                          }}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
