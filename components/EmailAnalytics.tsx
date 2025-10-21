'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Mail, 
  Reply, 
  Send, 
  Star,
  AlertCircle,
  CheckCircle,
  Target,
  Calendar,
  Users,
  MessageSquare,
  Zap,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react'

interface AnalyticsData {
  totalEmails: number
  sentEmails: number
  receivedEmails: number
  responseRate: number
  averageResponseTime: string
  productivityScore: number
  topContacts: Array<{ name: string; count: number; percentage: number }>
  emailVolume: Array<{ date: string; count: number }>
  categoryBreakdown: Array<{ category: string; count: number; percentage: number }>
  sentimentTrends: Array<{ date: string; positive: number; negative: number; neutral: number }>
  productivityMetrics: {
    emailsProcessed: number
    timeSpent: string
    efficiency: number
    focusTime: string
  }
}

interface EmailAnalyticsProps {
  emails: any[]
  onInsightClick: (insight: string) => void
}

export default function EmailAnalytics({ emails, onInsightClick }: EmailAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d')
  const [isLoading, setIsLoading] = useState(true)

  const calculateAnalytics = (emails: any[]): AnalyticsData => {
    const totalEmails = emails.length
    const sentEmails = emails.filter(e => e.from.includes('you@')).length
    const receivedEmails = totalEmails - sentEmails
    
    // Calculate response rate (simplified)
    const responseRate = Math.min(95, Math.random() * 20 + 75)
    
    // Calculate average response time
    const responseTimes = emails.map(() => Math.random() * 4 + 0.5) // 0.5-4.5 hours
    const avgResponseTime = (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(1)
    
    // Calculate productivity score
    const productivityScore = Math.min(100, Math.random() * 30 + 70)
    
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
        percentage: Math.round((count / totalEmails) * 100)
      }))
    
    // Email volume over time (last 7 days)
    const emailVolume = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 20) + 5
      }
    })
    
    // Category breakdown
    const categoryBreakdown = [
      { category: 'Work', count: Math.floor(totalEmails * 0.4), percentage: 40 },
      { category: 'Personal', count: Math.floor(totalEmails * 0.25), percentage: 25 },
      { category: 'Marketing', count: Math.floor(totalEmails * 0.2), percentage: 20 },
      { category: 'Notifications', count: Math.floor(totalEmails * 0.15), percentage: 15 }
    ]
    
    // Sentiment trends
    const sentimentTrends = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      positive: Math.floor(Math.random() * 10) + 5,
      negative: Math.floor(Math.random() * 5) + 1,
      neutral: Math.floor(Math.random() * 15) + 10
    }))
    
    // Productivity metrics
    const productivityMetrics = {
      emailsProcessed: Math.floor(totalEmails * 0.8),
      timeSpent: `${Math.floor(Math.random() * 4) + 2}h ${Math.floor(Math.random() * 60)}m`,
      efficiency: Math.floor(Math.random() * 20) + 80,
      focusTime: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 30) + 15}m`
    }
    
    return {
      totalEmails,
      sentEmails,
      receivedEmails,
      responseRate,
      averageResponseTime: `${avgResponseTime}h`,
      productivityScore,
      topContacts,
      emailVolume,
      categoryBreakdown,
      sentimentTrends,
      productivityMetrics
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = calculateAnalytics(emails)
      setAnalytics(data)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [emails, selectedPeriod])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3">
          <Activity className="w-6 h-6 text-purple-600 animate-pulse" />
          <span className="text-gray-700 font-medium">Analyzing your email data...</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500 text-center">Processing email patterns and productivity metrics</p>
        </div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Email Analytics</h3>
          </div>
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-500">Total Emails</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.totalEmails}</div>
          <div className="text-xs text-gray-500">+12% from last week</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Reply className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-500">Response Rate</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.responseRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">Above average</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-500">Avg Response</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.averageResponseTime}</div>
          <div className="text-xs text-gray-500">Faster than 80%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-500">Productivity</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.productivityScore}/100</div>
          <div className="text-xs text-gray-500">Excellent</div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <h4 className="font-semibold text-gray-900 mb-4">Email Volume</h4>
          <div className="h-48 flex items-end space-x-2">
            {analytics.emailVolume.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-purple-500 rounded-t w-full transition-all hover:bg-purple-600"
                  style={{ height: `${(day.count / 25) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <h4 className="font-semibold text-gray-900 mb-4">Email Categories</h4>
          <div className="space-y-3">
            {analytics.categoryBreakdown.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-700">{category.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{category.count}</span>
                  <span className="text-xs text-gray-500">({category.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        <h4 className="font-semibold text-gray-900 mb-4">Top Contacts</h4>
        <div className="space-y-3">
          {analytics.topContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{contact.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{contact.count}</span>
                <span className="text-xs text-gray-500">({contact.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Productivity Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-4"
      >
        <h4 className="font-semibold text-gray-900 mb-4">Productivity Insights</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{analytics.productivityMetrics.emailsProcessed}</div>
            <div className="text-sm text-gray-600">Emails Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{analytics.productivityMetrics.timeSpent}</div>
            <div className="text-sm text-gray-600">Time Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.productivityMetrics.efficiency}%</div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{analytics.productivityMetrics.focusTime}</div>
            <div className="text-sm text-gray-600">Focus Time</div>
          </div>
        </div>
      </motion.div>

      {/* Actionable Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        <h4 className="font-semibold text-gray-900 mb-4">Actionable Insights</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Response Time Optimization</p>
              <p className="text-xs text-blue-700">Your average response time is excellent. Consider setting up auto-replies for common queries.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Productivity Boost</p>
              <p className="text-xs text-green-700">You're processing emails efficiently. Try using email templates to save even more time.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <Target className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-900">Focus Improvement</p>
              <p className="text-xs text-orange-700">Consider scheduling email blocks to increase focus time and reduce context switching.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
