'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Mail,
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  Zap,
  Activity,
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Brain,
  Lightbulb,
  Trophy,
  TrendingDown,
  Eye,
  Timer,
  Focus,
  AlertCircle,
  CheckCircle2,
  Flame,
  Award,
  Target as TargetIcon,
  Gauge,
  BarChart,
  PieChart,
  LineChart,
  Smartphone,
  Laptop,
  Monitor,
  Heart,
  MessageSquare,
  Inbox,
  Send,
  Archive,
  ArrowRight,
  Paperclip
} from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

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

interface SimpleAnalyticsProps {
  emails: Email[]
  selectedCategory?: string
  onCategoryClick?: (category: string) => void
  onExport?: (format: string) => void
}

interface SimpleAnalyticsData {
  totalEmails: number
  repliedEmails: number
  waitingForReply: number
  unreadEmails: number
  starredEmails: number
  responseRate: number
  averageResponseTime: number
  pendingResponseTime: number
  inboxZeroDays: number
  emailProcessingSpeed: number
  emailVolume: Array<{ date: string; count: number }>
  peakHours: Array<{ hour: number; count: number }>
  topContacts: Array<{ name: string; count: number; percentage: number }>
  categoryBreakdown: Array<{ category: string; count: number; percentage: number }>
  weeklyPattern: Array<{ day: string; count: number }>
  meetingSummary: {
    totalMeetings: number
    todaysMeetings: number
    thisWeekMeetings: number
    upcomingMeetings: number
    meetingTypes: Array<{ type: string; count: number }>
    meetingHours: number
    averageMeetingDuration: number
    todaysMeetingDetails: Array<{
      id: string
      title: string
      time: string
      duration: string
      attendees: Array<{ name: string; role: string; avatar?: string }>
      agenda: string[]
      location: string
      type: string
      priority: 'high' | 'medium' | 'low'
    }>
    weeklyHeatmap: Array<{ day: string; hour: number; meetings: number }>
    timeDistribution: Array<{ hour: number; meetings: number }>
    topCollaborators: Array<{ name: string; meetings: number; role: string }>
    meetingEfficiency: Array<{ week: string; efficiency: number; meetings: number }>
    followUpDashboard: {
      urgent: Array<{ id: string; subject: string; from: string; daysAging: number; priority: string }>
      high: Array<{ id: string; subject: string; from: string; daysAging: number; priority: string }>
      medium: Array<{ id: string; subject: string; from: string; daysAging: number; priority: string }>
      low: Array<{ id: string; subject: string; from: string; daysAging: number; priority: string }>
    }
    attachmentAnalytics: {
      totalWithAttachments: number
      fileTypes: Array<{ type: string; count: number; percentage: number }>
      topDocuments: Array<{ name: string; shares: number; type: string }>
      attachmentTrend: Array<{ week: string; count: number }>
    }
    sentimentAnalysis: {
      positive: number
      neutral: number
      negative: number
      weeklyTrend: Array<{ week: string; positive: number; neutral: number; negative: number }>
    }
    meetingActions: Array<{
      id: string
      task: string
      assignee: string
      dueDate: string
      status: 'pending' | 'in-progress' | 'completed'
      priority: 'high' | 'medium' | 'low'
      meeting: string
    }>
    calendarAvailability: Array<{
      date: string
      timeSlots: Array<{ start: string; end: string; status: 'free' | 'busy' | 'tentative' }>
    }>
  }
}

export default function SimpleAnalytics({ emails, selectedCategory, onCategoryClick, onExport }: SimpleAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [analytics, setAnalytics] = useState<SimpleAnalyticsData | null>(null)

  const calculateAnalytics = () => {
    const totalEmails = emails.length
    const repliedEmails = Math.floor(totalEmails * 0.85) // 85% replied
    const waitingForReply = totalEmails - repliedEmails
    const unreadEmails = Math.floor(totalEmails * 0.12) // 12% unread
    const starredEmails = emails.filter(e => e.isStarred).length
    const responseRate = Math.random() * 20 + 80 // 80-100%
    const averageResponseTime = Math.random() * 2 + 1 // 1-3 hours
    const pendingResponseTime = Math.random() * 24 + 6 // 6-30 hours
    const inboxZeroDays = Math.floor(Math.random() * 10) + 15 // 15-25 days
    const emailProcessingSpeed = Math.floor(Math.random() * 20) + 30 // 30-50 emails/day

    // Email volume over time (last 30 days)
    const emailVolume = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20) + 10
    }))

    // Peak hours (0-23)
    const peakHours = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: Math.floor(Math.random() * 20) + (i >= 9 && i <= 17 ? 10 : 0)
    }))

    // Weekly pattern
    const weeklyPattern = [
      { day: 'Mon', count: Math.floor(Math.random() * 30) + 20 },
      { day: 'Tue', count: Math.floor(Math.random() * 30) + 25 },
      { day: 'Wed', count: Math.floor(Math.random() * 30) + 22 },
      { day: 'Thu', count: Math.floor(Math.random() * 30) + 28 },
      { day: 'Fri', count: Math.floor(Math.random() * 30) + 15 },
      { day: 'Sat', count: Math.floor(Math.random() * 10) + 5 },
      { day: 'Sun', count: Math.floor(Math.random() * 10) + 3 }
    ]

    // Category breakdown - matching Smart Inbox categories exactly
    const categoryBreakdown = [
      { category: 'Urgent', count: emails.filter(e => e.isImportant && e.subject.toLowerCase().includes('urgent')).length, percentage: parseFloat(((emails.filter(e => e.isImportant && e.subject.toLowerCase().includes('urgent')).length / totalEmails) * 100).toFixed(2)) },
      { category: 'Important', count: emails.filter(e => e.isImportant).length, percentage: parseFloat(((emails.filter(e => e.isImportant).length / totalEmails) * 100).toFixed(2)) },
      { category: 'Meetings', count: emails.filter(e => e.subject.toLowerCase().includes('meeting') || e.subject.toLowerCase().includes('calendar') || e.meetingTime).length, percentage: parseFloat(((emails.filter(e => e.subject.toLowerCase().includes('meeting') || e.subject.toLowerCase().includes('calendar') || e.meetingTime).length / totalEmails) * 100).toFixed(2)) },
      { category: 'Notifications', count: emails.filter(e => e.subject.toLowerCase().includes('notification') || e.subject.toLowerCase().includes('update')).length, percentage: parseFloat(((emails.filter(e => e.subject.toLowerCase().includes('notification') || e.subject.toLowerCase().includes('update')).length / totalEmails) * 100).toFixed(2)) }
    ]

    // Meeting Summary - Comprehensive meeting analytics
    const meetingEmails = emails.filter(e => e.meetingTime || e.subject.toLowerCase().includes('meeting') || e.subject.toLowerCase().includes('calendar'))
    const todaysDate = new Date().toISOString().split('T')[0]
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    const meetingTypes = [
      { type: 'Board Meeting', count: meetingEmails.filter(e => e.meetingType === 'board-meeting' || e.subject.toLowerCase().includes('board')).length },
      { type: 'Team Meeting', count: meetingEmails.filter(e => e.meetingType === 'team' || e.subject.toLowerCase().includes('team')).length },
      { type: 'Client Meeting', count: meetingEmails.filter(e => e.meetingType === 'client-meeting' || e.subject.toLowerCase().includes('client')).length },
      { type: '1:1 Meeting', count: meetingEmails.filter(e => e.meetingType === '1-1' || e.subject.toLowerCase().includes('1:1')).length },
      { type: 'Workshop', count: meetingEmails.filter(e => e.meetingType === 'workshop' || e.subject.toLowerCase().includes('workshop')).length }
    ].filter(mt => mt.count > 0)

    // Today's Meeting Details
    const todaysMeetingDetails = [
      {
        id: '1',
        title: 'Q4 Planning & Strategy Review',
        time: '9:00 AM',
        duration: '90 min',
        attendees: [
          { name: 'Sarah Johnson', role: 'CEO', avatar: 'SJ' },
          { name: 'Mike Chen', role: 'CTO', avatar: 'MC' },
          { name: 'Lisa Rodriguez', role: 'CFO', avatar: 'LR' },
          { name: 'David Kim', role: 'VP Marketing', avatar: 'DK' }
        ],
        agenda: [
          'Review Q3 performance metrics',
          'Discuss Q4 budget allocation',
          'Strategic initiatives planning',
          'Resource allocation decisions'
        ],
        location: 'Conference Room A / Zoom',
        type: 'Board Meeting',
        priority: 'high' as const
      },
      {
        id: '2',
        title: 'Product Development Sprint Review',
        time: '2:00 PM',
        duration: '60 min',
        attendees: [
          { name: 'Alex Thompson', role: 'Product Manager', avatar: 'AT' },
          { name: 'Emma Wilson', role: 'Lead Developer', avatar: 'EW' },
          { name: 'James Brown', role: 'UX Designer', avatar: 'JB' },
          { name: 'Maria Garcia', role: 'QA Lead', avatar: 'MG' }
        ],
        agenda: [
          'Sprint 23 retrospective',
          'Sprint 24 planning',
          'Technical debt review',
          'Feature prioritization'
        ],
        location: 'Product Lab / Teams',
        type: 'Team Meeting',
        priority: 'medium' as const
      },
      {
        id: '3',
        title: 'Client Presentation - TechCorp',
        time: '4:30 PM',
        duration: '45 min',
        attendees: [
          { name: 'Robert Smith', role: 'Account Manager', avatar: 'RS' },
          { name: 'Jennifer Lee', role: 'Solutions Architect', avatar: 'JL' },
          { name: 'TechCorp Team', role: 'Client', avatar: 'TC' }
        ],
        agenda: [
          'Product demo presentation',
          'Implementation timeline',
          'Pricing discussion',
          'Next steps planning'
        ],
        location: 'Zoom Meeting',
        type: 'Client Meeting',
        priority: 'high' as const
      }
    ]

    // Weekly Heatmap Data (7 days x 24 hours)
    const weeklyHeatmap = []
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const meetings = hour >= 9 && hour <= 17 && day < 5 
          ? Math.floor(Math.random() * 3) // Work hours: 0-2 meetings
          : Math.floor(Math.random() * 2) // Off hours: 0-1 meetings
        weeklyHeatmap.push({ day: days[day], hour, meetings })
      }
    }

    // Time Distribution (meetings by hour)
    const timeDistribution = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      meetings: hour >= 9 && hour <= 17 
        ? Math.floor(Math.random() * 4) + 1 // Work hours: 1-4 meetings
        : Math.floor(Math.random() * 2) // Off hours: 0-1 meetings
    }))

    // Top Collaborators
    const topCollaborators = [
      { name: 'Sarah Johnson', meetings: 12, role: 'CEO' },
      { name: 'Mike Chen', meetings: 10, role: 'CTO' },
      { name: 'Lisa Rodriguez', meetings: 8, role: 'CFO' },
      { name: 'Alex Thompson', meetings: 6, role: 'Product Manager' },
      { name: 'Emma Wilson', meetings: 5, role: 'Lead Developer' }
    ]

    // Meeting Efficiency Trends (last 8 weeks)
    const meetingEfficiency = Array.from({ length: 8 }, (_, i) => ({
      week: `Week ${8 - i}`,
      efficiency: Math.floor(Math.random() * 20) + 70, // 70-90%
      meetings: Math.floor(Math.random() * 10) + 15 // 15-25 meetings
    }))

    // Follow-Up Dashboard Data
    const followUpDashboard = {
      urgent: [
        { id: '1', subject: 'Contract Review - URGENT', from: 'Legal Team', daysAging: 3, priority: 'urgent' },
        { id: '2', subject: 'Budget Approval Needed', from: 'Finance Director', daysAging: 2, priority: 'urgent' },
        { id: '3', subject: 'Security Incident Response', from: 'IT Security', daysAging: 1, priority: 'urgent' }
      ],
      high: [
        { id: '4', subject: 'Q4 Strategy Planning', from: 'CEO', daysAging: 5, priority: 'high' },
        { id: '5', subject: 'Product Launch Timeline', from: 'Product Manager', daysAging: 4, priority: 'high' },
        { id: '6', subject: 'Client Proposal Review', from: 'Sales Director', daysAging: 3, priority: 'high' }
      ],
      medium: [
        { id: '7', subject: 'Team Meeting Follow-up', from: 'HR Manager', daysAging: 7, priority: 'medium' },
        { id: '8', subject: 'Training Schedule Update', from: 'Learning & Development', daysAging: 6, priority: 'medium' }
      ],
      low: [
        { id: '9', subject: 'Office Supplies Order', from: 'Admin Team', daysAging: 10, priority: 'low' },
        { id: '10', subject: 'Newsletter Content Review', from: 'Marketing Team', daysAging: 8, priority: 'low' }
      ]
    }

    // Attachment Analytics
    const attachmentAnalytics = {
      totalWithAttachments: Math.floor(totalEmails * 0.35), // 35% of emails have attachments
      fileTypes: [
        { type: 'PDF', count: 45, percentage: 40 },
        { type: 'DOCX', count: 32, percentage: 28 },
        { type: 'XLSX', count: 18, percentage: 16 },
        { type: 'PPTX', count: 12, percentage: 11 },
        { type: 'Images', count: 8, percentage: 5 }
      ],
      topDocuments: [
        { name: 'Q4_Budget_Proposal.pdf', shares: 15, type: 'PDF' },
        { name: 'Product_Roadmap_2024.pptx', shares: 12, type: 'PPTX' },
        { name: 'Sales_Report_Nov.xlsx', shares: 10, type: 'XLSX' },
        { name: 'Contract_Template.docx', shares: 8, type: 'DOCX' },
        { name: 'Meeting_Notes_1201.pdf', shares: 6, type: 'PDF' }
      ],
      attachmentTrend: Array.from({ length: 8 }, (_, i) => ({
        week: `Week ${8 - i}`,
        count: Math.floor(Math.random() * 20) + 10
      }))
    }

    // Sentiment Analysis
    const sentimentAnalysis = {
      positive: 65,
      neutral: 25,
      negative: 10,
      weeklyTrend: Array.from({ length: 8 }, (_, i) => ({
        week: `Week ${8 - i}`,
        positive: Math.floor(Math.random() * 20) + 60,
        neutral: Math.floor(Math.random() * 15) + 20,
        negative: Math.floor(Math.random() * 10) + 5
      }))
    }

    // Meeting Actions Tracker
    const meetingActions = [
      {
        id: '1',
        task: 'Review Q4 budget allocation',
        assignee: 'Sarah Johnson',
        dueDate: '2024-01-15',
        status: 'pending' as const,
        priority: 'high' as const,
        meeting: 'Q4 Planning & Strategy Review'
      },
      {
        id: '2',
        task: 'Prepare sprint 24 planning document',
        assignee: 'Alex Thompson',
        dueDate: '2024-01-12',
        status: 'in-progress' as const,
        priority: 'high' as const,
        meeting: 'Product Development Sprint Review'
      },
      {
        id: '3',
        task: 'Send TechCorp proposal by EOD',
        assignee: 'Robert Smith',
        dueDate: '2024-01-10',
        status: 'completed' as const,
        priority: 'high' as const,
        meeting: 'Client Presentation - TechCorp'
      },
      {
        id: '4',
        task: 'Update project timeline with new requirements',
        assignee: 'Emma Wilson',
        dueDate: '2024-01-18',
        status: 'pending' as const,
        priority: 'medium' as const,
        meeting: 'Product Development Sprint Review'
      },
      {
        id: '5',
        task: 'Schedule follow-up meeting with stakeholders',
        assignee: 'Mike Chen',
        dueDate: '2024-01-14',
        status: 'in-progress' as const,
        priority: 'medium' as const,
        meeting: 'Q4 Planning & Strategy Review'
      }
    ]

    // Calendar Availability (next 7 days)
    const calendarAvailability = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      
      return {
        date: dateStr,
        timeSlots: Array.from({ length: 12 }, (_, hour) => {
          const startHour = 8 + hour
          const endHour = startHour + 1
          const status = Math.random() > 0.3 ? 'free' : Math.random() > 0.5 ? 'busy' : 'tentative'
          
          return {
            start: `${startHour.toString().padStart(2, '0')}:00`,
            end: `${endHour.toString().padStart(2, '0')}:00`,
            status: status as 'free' | 'busy' | 'tentative'
          }
        })
      }
    })

    const meetingSummary = {
      totalMeetings: meetingEmails.length,
      todaysMeetings: meetingEmails.filter(e => e.meetingTime && new Date(e.meetingTime).toISOString().split('T')[0] === todaysDate).length,
      thisWeekMeetings: meetingEmails.filter(e => e.meetingTime && new Date(e.meetingTime).toISOString().split('T')[0] <= weekFromNow).length,
      upcomingMeetings: meetingEmails.filter(e => e.meetingTime && new Date(e.meetingTime) > new Date()).length,
      meetingTypes,
      meetingHours: Math.floor(Math.random() * 20) + 15, // 15-35 hours of meetings
      averageMeetingDuration: Math.floor(Math.random() * 30) + 30, // 30-60 minutes
      todaysMeetingDetails,
      weeklyHeatmap,
      timeDistribution,
      topCollaborators,
      meetingEfficiency,
      followUpDashboard,
      attachmentAnalytics,
      sentimentAnalysis,
      meetingActions,
      calendarAvailability
    }

    // Top contacts
    const contactCounts: { [key: string]: number } = {}
    emails.forEach(email => {
      const contact = email.from.split('<')[0].trim()
      contactCounts[contact] = (contactCounts[contact] || 0) + 1
    })

    const topContacts = Object.entries(contactCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: parseFloat(((count / totalEmails) * 100).toFixed(2))
      }))

    return {
      totalEmails,
      repliedEmails,
      waitingForReply,
      unreadEmails,
      starredEmails,
      responseRate,
      averageResponseTime,
      pendingResponseTime,
      inboxZeroDays,
      emailProcessingSpeed,
      emailVolume,
      peakHours,
      topContacts,
      categoryBreakdown,
      weeklyPattern,
      meetingSummary
    }
  }

  useEffect(() => {
    setAnalytics(calculateAnalytics())
  }, [emails])

  const getLineChartData = () => {
    if (!analytics) return null

    return {
      labels: analytics.emailVolume.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Emails Received',
          data: analytics.emailVolume.map(item => item.count),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    }
  }

  const getBarChartData = () => {
    if (!analytics) return null

    return {
      labels: analytics.peakHours.map(item => `${item.hour}:00`),
      datasets: [
        {
          label: 'Email Volume',
          data: analytics.peakHours.map(item => item.count),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1
        }
      ]
    }
  }

  const getDoughnutData = () => {
    if (!analytics) return null

    return {
      labels: analytics.categoryBreakdown.map(item => item.category),
      datasets: [
        {
          data: analytics.categoryBreakdown.map(item => item.count),
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ],
          borderColor: [
            'rgb(239, 68, 68)',
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)'
          ],
          borderWidth: 2
        }
      ]
    }
  }

  if (!analytics) return <div>Loading analytics...</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold gradient-text">Email Analytics</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-slate-300/50 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/50 backdrop-blur-sm"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button
            onClick={() => onExport?.('pdf')}
            className="flex items-center space-x-2 px-4 py-2 btn-primary"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Emails - First Priority */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 p-6 card-hover shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Emails</p>
              <p className="text-3xl font-bold text-blue-900">{analytics.totalEmails}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="text-sm text-emerald-600">+12% this week</span>
              </div>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Mail className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        </motion.div>

        {/* Replied Emails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50 p-6 card-hover shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-green-700">Replied</p>
              <p className="text-3xl font-bold text-green-900">{analytics.repliedEmails}</p>
              <div className="flex items-center mt-1">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">{analytics.responseRate.toFixed(1)}% response rate</span>
              </div>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <Send className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </motion.div>

        {/* Waiting for Reply */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-amber-700">Waiting for Reply</p>
              <p className="text-3xl font-bold text-amber-900">{analytics.waitingForReply}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 text-amber-600 mr-1" />
                <span className="text-sm text-amber-600">Avg {analytics.pendingResponseTime.toFixed(1)}h pending</span>
              </div>
            </div>
            <div className="p-3 bg-amber-200 rounded-full">
              <Timer className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </motion.div>

        {/* Unread Emails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl border border-rose-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-rose-700">Unread</p>
              <p className="text-3xl font-bold text-rose-900">{analytics.unreadEmails}</p>
              <div className="flex items-center mt-1">
                <AlertCircle className="w-4 h-4 text-rose-600 mr-1" />
                <span className="text-sm text-rose-600">Need attention</span>
              </div>
            </div>
            <div className="p-3 bg-rose-200 rounded-full">
              <Eye className="w-6 h-6 text-rose-700" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Meeting Overview - Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl border border-violet-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-violet-700">Total Meetings</p>
              <p className="text-3xl font-bold text-violet-900">{analytics.meetingSummary.totalMeetings}</p>
              <div className="flex items-center mt-1">
                <Calendar className="w-4 h-4 text-violet-600 mr-1" />
                <span className="text-sm text-violet-600">All time</span>
              </div>
            </div>
            <div className="p-3 bg-violet-200 rounded-full">
              <Calendar className="w-6 h-6 text-violet-700" />
            </div>
          </div>
        </motion.div>

        {/* Today's Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-teal-700">Today's Meetings</p>
              <p className="text-3xl font-bold text-teal-900">{analytics.meetingSummary.todaysMeetings}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 text-teal-600 mr-1" />
                <span className="text-sm text-teal-600">Scheduled today</span>
              </div>
            </div>
            <div className="p-3 bg-teal-200 rounded-full">
              <Clock className="w-6 h-6 text-teal-700" />
            </div>
          </div>
        </motion.div>

        {/* This Week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-cyan-700">This Week</p>
              <p className="text-3xl font-bold text-cyan-900">{analytics.meetingSummary.thisWeekMeetings}</p>
              <div className="flex items-center mt-1">
                <Target className="w-4 h-4 text-cyan-600 mr-1" />
                <span className="text-sm text-cyan-600">Next 7 days</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-200 rounded-full">
              <Target className="w-6 h-6 text-cyan-700" />
            </div>
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 rounded-xl border border-fuchsia-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-fuchsia-700">Upcoming</p>
              <p className="text-3xl font-bold text-fuchsia-900">{analytics.meetingSummary.upcomingMeetings}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-fuchsia-600 mr-1" />
                <span className="text-sm text-fuchsia-600">Future meetings</span>
              </div>
            </div>
            <div className="p-3 bg-fuchsia-200 rounded-full">
              <TrendingUp className="w-6 h-6 text-fuchsia-700" />
            </div>
          </div>
        </motion.div>
      </div>



      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Volume Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Email Volume Trend</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          {getLineChartData() && (
            <Line 
              data={getLineChartData()!} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />
          )}
        </motion.div>

        {/* Peak Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Peak Email Hours</h3>
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          {getBarChartData() && (
            <Bar 
              data={getBarChartData()!} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />
          )}
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Contacts</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            {analytics.topContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-700">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.count} emails</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-purple-600">{contact.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Breakdown - Clickable to Smart Inbox */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Email Categories</h3>
            <PieChart className="w-5 h-5 text-violet-600" />
          </div>
          <div className="space-y-3">
            {analytics.categoryBreakdown.map((category, index) => {
              const colors = ['bg-rose-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500']
              const colorClasses = ['hover:bg-rose-50', 'hover:bg-indigo-50', 'hover:bg-emerald-50', 'hover:bg-amber-50']
              return (
                <button
                  key={index}
                  onClick={() => onCategoryClick?.(category.category)}
                  className={`w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors ${colorClasses[index]} hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colors[index]}`}></div>
                    <span className="font-medium text-gray-900">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{category.count} emails</span>
                    <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Advanced Analytics Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follow-Up Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold gradient-text">Follow-Up Dashboard</h3>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Waiting for Reply</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(analytics.meetingSummary.followUpDashboard).map(([priority, emails]) => (
              <div key={priority} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 capitalize">{priority}</h4>
                  <span className="text-sm text-gray-500">{emails.length}</span>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {emails.map((email) => (
                    <div key={email.id} className="p-2 bg-gray-50 rounded-lg border-l-2 border-purple-300">
                      <p className="text-sm font-medium text-gray-900 truncate">{email.subject}</p>
                      <p className="text-xs text-gray-500">{email.from}</p>
                      <p className="text-xs text-red-600">{email.daysAging} days ago</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sentiment Analysis Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold gradient-text">Sentiment Analysis</h3>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">This week</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Positive</span>
              </div>
              <span className="font-semibold text-green-600">{analytics.meetingSummary.sentimentAnalysis.positive}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analytics.meetingSummary.sentimentAnalysis.positive}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-700">Neutral</span>
              </div>
              <span className="font-semibold text-gray-600">{analytics.meetingSummary.sentimentAnalysis.neutral}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analytics.meetingSummary.sentimentAnalysis.neutral}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Negative</span>
              </div>
              <span className="font-semibold text-red-600">{analytics.meetingSummary.sentimentAnalysis.negative}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analytics.meetingSummary.sentimentAnalysis.negative}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attachment Analytics & Meeting Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attachment Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold gradient-text">Attachment Analytics</h3>
            <div className="flex items-center space-x-2">
              <Paperclip className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">{analytics.meetingSummary.attachmentAnalytics.totalWithAttachments} files</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">File Types</h4>
              <div className="space-y-2">
                {analytics.meetingSummary.attachmentAnalytics.fileTypes.map((fileType, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{fileType.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${fileType.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{fileType.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Top Documents</h4>
              <div className="space-y-2">
                {analytics.meetingSummary.attachmentAnalytics.topDocuments.slice(0, 3).map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type}</p>
                    </div>
                    <span className="text-sm font-semibold text-purple-600">{doc.shares} shares</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Meeting Actions Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold gradient-text">Meeting Actions Tracker</h3>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Tasks & Decisions</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {analytics.meetingSummary.meetingActions.map((action, index) => (
              <div key={action.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{action.task}</p>
                    <p className="text-sm text-gray-500">From: {action.meeting}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    action.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : action.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {action.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Assignee: {action.assignee}</span>
                  <span>Due: {action.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Smart Calendar Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold gradient-text">Smart Calendar Availability</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-slate-600">Next 7 days</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {analytics.meetingSummary.calendarAvailability.slice(0, 3).map((day, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h4>
              <div className="grid grid-cols-6 gap-1">
                {day.timeSlots.slice(0, 6).map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`h-8 rounded text-xs flex items-center justify-center font-medium ${
                      slot.status === 'free' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : slot.status === 'busy'
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}
                    title={`${slot.start} - ${slot.end}: ${slot.status}`}
                  >
                    {slot.start}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-xs text-gray-600">Free</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-xs text-gray-600">Busy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span className="text-xs text-gray-600">Tentative</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today's Meetings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold gradient-text">Today's Meetings</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-slate-600">{analytics.meetingSummary.todaysMeetingDetails.length} meetings</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Meeting</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Attendees</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Agenda</th>
              </tr>
            </thead>
            <tbody>
              {analytics.meetingSummary.todaysMeetingDetails.map((meeting, index) => (
                <motion.tr
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{meeting.title}</h4>
                        <p className="text-sm text-gray-500">{meeting.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{meeting.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{meeting.duration}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {meeting.attendees.slice(0, 3).map((attendee, idx) => (
                        <div key={idx} className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full border text-xs">
                          <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-700">{attendee.avatar}</span>
                          </div>
                          <span className="text-gray-700">{attendee.name.split(' ')[0]}</span>
                        </div>
                      ))}
                      {meeting.attendees.length > 3 && (
                        <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                          <span className="text-gray-600">+{meeting.attendees.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 text-sm">{meeting.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      meeting.priority === 'high' 
                        ? 'bg-red-100 text-red-700' 
                        : meeting.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {meeting.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <div className="text-sm text-gray-600 mb-1">
                        {meeting.agenda.length} items
                      </div>
                      <div className="text-xs text-gray-500">
                        {meeting.agenda.slice(0, 2).join(', ')}
                        {meeting.agenda.length > 2 && '...'}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Weekly Meeting Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold gradient-text">Weekly Meeting Heatmap</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-slate-600">Meeting density</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {/* Days header */}
          <div className="grid grid-cols-8 gap-1">
            <div className="text-xs text-gray-500"></div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-xs text-center text-gray-600 font-medium">{day}</div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="grid grid-cols-8 gap-1">
            <div className="text-xs text-gray-500 py-1">Hours</div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="space-y-1">
                {Array.from({ length: 12 }, (_, hour) => {
                  const hourData = analytics.meetingSummary.weeklyHeatmap.find(
                    h => h.day === day && h.hour === hour + 8
                  )
                  const meetings = hourData?.meetings || 0
                  const intensity = meetings === 0 ? 'bg-gray-100' : 
                                 meetings === 1 ? 'bg-blue-200' : 
                                 meetings === 2 ? 'bg-blue-400' : 'bg-blue-600'
                  return (
                    <div
                      key={hour}
                      className={`w-full h-3 rounded-sm ${intensity} hover:opacity-80 transition-opacity`}
                      title={`${day} ${hour + 8}:00 - ${meetings} meetings`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
              <span className="text-xs text-gray-600">0 meetings</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
              <span className="text-xs text-gray-600">1 meeting</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              <span className="text-xs text-gray-600">2 meetings</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
              <span className="text-xs text-gray-600">3+ meetings</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Email Volume Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold gradient-text mb-6">Email Volume Trend</h3>
          <div className="h-64">
            <Line
              data={{
                labels: analytics.emailVolume.map((d: { date: string; count: number }) => d.date),
                datasets: [{
                  label: 'Emails Received',
                  data: analytics.emailVolume.map((d: { date: string; count: number }) => d.count),
                  borderColor: 'rgb(139, 92, 246)',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  tension: 0.4,
                  fill: true
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Email Categories Doughnut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold gradient-text mb-6">Email Distribution</h3>
          <div className="h-64">
            <Doughnut
              data={{
                labels: analytics.categoryBreakdown.map(c => c.category),
                datasets: [{
                  data: analytics.categoryBreakdown.map(c => c.count),
                  backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',   // Urgent - Red
                    'rgba(59, 130, 246, 0.8)',   // Important - Blue
                    'rgba(34, 197, 94, 0.8)',    // Meetings - Green
                    'rgba(234, 179, 8, 0.8)'     // Notifications - Yellow
                  ],
                  borderWidth: 2,
                  borderColor: '#fff'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 15,
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Peak Hours Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6 mt-8"
      >
        <h3 className="text-xl font-semibold gradient-text mb-6">Peak Email Hours</h3>
        <div className="h-64">
          <Bar
            data={{
              labels: analytics.peakHours.map(h => `${h.hour}:00`),
              datasets: [{
                label: 'Emails',
                data: analytics.peakHours.map(h => h.count),
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderColor: 'rgb(139, 92, 246)',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
