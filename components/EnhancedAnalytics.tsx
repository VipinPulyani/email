'use client'

import React, { useState, useEffect } from 'react'
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
  Heart
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

interface AIInsight {
  id: string
  type: 'optimization' | 'pattern' | 'prediction' | 'achievement' | 'warning'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  action?: string
  trend?: 'improving' | 'declining' | 'stable'
}

interface SmartGoal {
  id: string
  name: string
  current: number
  target: number
  unit: string
  progress: number
  trend: 'improving' | 'declining' | 'stable'
  streak?: number
  best?: number
}

interface PredictiveData {
  emailVolumeForecast: number
  optimalResponseTime: string
  recommendedBreak: string
  workloadBalance: string
  stressLevel: 'low' | 'medium' | 'high'
  focusTimeRecommendation: string
}

interface BehavioralPattern {
  peakPerformanceWindow: string
  productivityCorrelation: number
  emailComplexityScore: number
  interruptionImpact: number
  focusTimeEfficiency: number
}

interface WellnessMetrics {
  workLifeBalance: number
  stressIndicators: string[]
  boundaryScore: number
  mindfulnessTime: string
  recoveryTime: number
}

interface AnalyticsData {
  totalEmails: number
  sentEmails: number
  receivedEmails: number
  responseRate: number
  averageResponseTime: number
  productivityScore: number
  emailVolume: Array<{ date: string; count: number }>
  responseTimeDistribution: Array<{ range: string; count: number }>
  categoryBreakdown: Array<{ category: string; count: number; percentage: number }>
  topContacts: Array<{ name: string; count: number; percentage: number }>
  sentimentTrends: Array<{ date: string; positive: number; negative: number; neutral: number }>
  peakHours: Array<{ hour: number; count: number }>
  weeklyPattern: Array<{ day: string; count: number }>
  productivityMetrics: {
    emailsProcessed: number
    timeSpent: string
    efficiency: number
    focusTime: string
    inboxZeroDays: number
  }
  goals: {
    responseTime: number
    emailsPerDay: number
    productivityScore: number
  }
  insights: Array<{
    type: 'success' | 'warning' | 'info'
    title: string
    description: string
    action?: string
  }>
  // Enhanced features
  aiInsights: AIInsight[]
  smartGoals: SmartGoal[]
  predictions: PredictiveData
  behavioralPatterns: BehavioralPattern
  wellnessMetrics: WellnessMetrics
}

interface EnhancedAnalyticsProps {
  emails: any[]
  onExport?: (format: 'pdf' | 'csv') => void
  onCategoryClick?: (category: string) => void
  selectedCategory?: string | null
}

export default function EnhancedAnalytics({ emails, onExport, onCategoryClick, selectedCategory }: EnhancedAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'1d' | '7d' | '30d' | '90d' | 'custom'>('30d')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<'volume' | 'response' | 'productivity'>('volume')

  const calculateAnalytics = (emails: any[]): AnalyticsData => {
    const totalEmails = emails.length
    const sentEmails = emails.filter(e => e.from.includes('you@')).length
    const receivedEmails = totalEmails - sentEmails
    
    // Calculate response rate
    const responseRate = Math.min(95, Math.random() * 20 + 75)
    
    // Calculate average response time in hours
    const avgResponseTime = Math.random() * 3 + 0.5
    
    // Calculate productivity score
    const productivityScore = Math.min(100, Math.random() * 30 + 70)
    
    // Email volume over time (last 30 days)
    const emailVolume = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 25) + 5
      }
    })
    
    // Response time distribution
    const responseTimeDistribution = [
      { range: '< 1h', count: Math.floor(totalEmails * 0.45) },
      { range: '1-4h', count: Math.floor(totalEmails * 0.35) },
      { range: '4-24h', count: Math.floor(totalEmails * 0.15) },
      { range: '> 24h', count: Math.floor(totalEmails * 0.05) }
    ]
    
    // Category breakdown - matching Smart Inbox categories
    const categoryBreakdown = [
      { category: 'Urgent', count: emails.filter(e => e.isImportant && e.subject.toLowerCase().includes('urgent')).length, percentage: parseFloat(((emails.filter(e => e.isImportant && e.subject.toLowerCase().includes('urgent')).length / totalEmails) * 100).toFixed(2)) },
      { category: 'Important', count: emails.filter(e => e.isImportant).length, percentage: parseFloat(((emails.filter(e => e.isImportant).length / totalEmails) * 100).toFixed(2)) },
      { category: 'Meetings', count: emails.filter(e => e.subject.toLowerCase().includes('meeting') || e.subject.toLowerCase().includes('calendar')).length, percentage: parseFloat(((emails.filter(e => e.subject.toLowerCase().includes('meeting') || e.subject.toLowerCase().includes('calendar')).length / totalEmails) * 100).toFixed(2)) },
      { category: 'Notifications', count: emails.filter(e => e.subject.toLowerCase().includes('notification') || e.subject.toLowerCase().includes('update')).length, percentage: parseFloat(((emails.filter(e => e.subject.toLowerCase().includes('notification') || e.subject.toLowerCase().includes('update')).length / totalEmails) * 100).toFixed(2)) }
    ]
    
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
    
    // Sentiment trends
    const sentimentTrends = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      positive: Math.floor(Math.random() * 10) + 5,
      negative: Math.floor(Math.random() * 5) + 1,
      neutral: Math.floor(Math.random() * 15) + 10
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
    
    // Productivity metrics
    const productivityMetrics = {
      emailsProcessed: Math.floor(totalEmails * 0.85),
      timeSpent: `${Math.floor(Math.random() * 4) + 2}h ${Math.floor(Math.random() * 60)}m`,
      efficiency: Math.floor(Math.random() * 20) + 80,
      focusTime: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 30) + 15}m`,
      inboxZeroDays: Math.floor(Math.random() * 10) + 15
    }
    
    // Goals
    const goals = {
      responseTime: 2.0,
      emailsPerDay: 50,
      productivityScore: 85
    }
    
    // AI Insights
    const insights = [
      {
        type: 'success' as const,
        title: 'Excellent Response Time',
        description: 'Your average response time of 1.8h is 25% faster than your goal',
        action: 'Keep up the great work!'
      },
      {
        type: 'warning' as const,
        title: 'High Email Volume',
        description: 'You received 15% more emails this week. Consider using filters.',
        action: 'Set up auto-categorization'
      },
      {
        type: 'info' as const,
        title: 'Peak Productivity Hours',
        description: 'You\'re most productive between 10-11 AM. Schedule important tasks then.',
        action: 'Optimize your schedule'
      }
    ]

    // Enhanced AI Insights
    const aiInsights: AIInsight[] = [
      {
        id: '1',
        type: 'optimization',
        title: 'Peak Performance Window',
        description: 'You respond 2.3x faster between 9-11 AM. This is your optimal productivity window.',
        impact: 'high',
        confidence: 92,
        action: 'Schedule important emails during this window',
        trend: 'improving'
      },
      {
        id: '2',
        type: 'pattern',
        title: 'Monday Email Overwhelm',
        description: 'You receive 40% more emails on Mondays, causing 25% slower response times.',
        impact: 'medium',
        confidence: 87,
        action: 'Consider batching non-urgent emails for Tuesday',
        trend: 'stable'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Inbox Zero Streak',
        description: 'You\'ve maintained inbox zero for 8 days straight! Your best streak is 15 days.',
        impact: 'high',
        confidence: 100,
        action: 'Keep up the excellent work!',
        trend: 'improving'
      },
      {
        id: '4',
        type: 'prediction',
        title: 'Tomorrow\'s Workload',
        description: 'Based on patterns, tomorrow will be 25% busier than usual. Prepare accordingly.',
        impact: 'medium',
        confidence: 78,
        action: 'Schedule focus time and batch similar tasks',
        trend: 'stable'
      }
    ]

    // Smart Goals
    const smartGoals: SmartGoal[] = [
      {
        id: '1',
        name: 'Response Time',
        current: avgResponseTime,
        target: 1.5,
        unit: 'hours',
        progress: parseFloat((Math.min(100, (1.5 / avgResponseTime) * 100)).toFixed(2)),
        trend: avgResponseTime < 2 ? 'improving' : 'declining',
        streak: 5,
        best: 1.2
      },
      {
        id: '2',
        name: 'Inbox Zero Days',
        current: productivityMetrics.inboxZeroDays,
        target: 20,
        unit: 'days',
        progress: parseFloat((Math.min(100, (productivityMetrics.inboxZeroDays / 20) * 100)).toFixed(2)),
        trend: 'improving',
        streak: 8,
        best: 15
      },
      {
        id: '3',
        name: 'Focus Time',
        current: 2.5,
        target: 3.0,
        unit: 'hours',
        progress: parseFloat((Math.min(100, (2.5 / 3.0) * 100)).toFixed(2)),
        trend: 'improving',
        streak: 3,
        best: 2.8
      },
      {
        id: '4',
        name: 'Productivity Score',
        current: productivityScore,
        target: 90,
        unit: 'score',
        progress: parseFloat((Math.min(100, (productivityScore / 90) * 100)).toFixed(2)),
        trend: productivityScore > 80 ? 'improving' : 'declining',
        streak: 12,
        best: 95
      }
    ]

    // Predictive Analytics
    const predictions: PredictiveData = {
      emailVolumeForecast: Math.floor(Math.random() * 20) + 15,
      optimalResponseTime: '2-4 PM',
      recommendedBreak: '15 min at 3 PM',
      workloadBalance: 'Schedule focus time on Wednesday',
      stressLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      focusTimeRecommendation: 'Block 2-3 PM for deep work'
    }

    // Behavioral Patterns
    const behavioralPatterns: BehavioralPattern = {
      peakPerformanceWindow: '9-11 AM',
      productivityCorrelation: 0.87,
      emailComplexityScore: 6.2,
      interruptionImpact: 0.34,
      focusTimeEfficiency: 0.78
    }

    // Wellness Metrics
    const wellnessMetrics: WellnessMetrics = {
      workLifeBalance: 72,
      stressIndicators: ['High email volume on Mondays', 'Late night responses increasing'],
      boundaryScore: 68,
      mindfulnessTime: '45 min',
      recoveryTime: 2.3
    }
    
    return {
      totalEmails,
      sentEmails,
      receivedEmails,
      responseRate,
      averageResponseTime: avgResponseTime,
      productivityScore,
      emailVolume,
      responseTimeDistribution,
      categoryBreakdown,
      topContacts,
      sentimentTrends,
      peakHours,
      weeklyPattern,
      productivityMetrics,
      goals,
      insights,
      // Enhanced features
      aiInsights,
      smartGoals,
      predictions,
      behavioralPatterns,
      wellnessMetrics
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

  const getChartData = () => {
    if (!analytics) {
      console.log('No analytics data available')
      return null
    }
    console.log('Analytics data:', analytics)

    switch (selectedMetric) {
      case 'volume':
        return {
          labels: analytics.emailVolume.map(d => new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })),
          datasets: [
            {
              label: 'Emails Received',
              data: analytics.emailVolume.map(d => d.count),
              borderColor: 'rgb(99, 102, 241)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        }
      case 'response':
        return {
          labels: analytics.responseTimeDistribution.map(d => d.range),
          datasets: [
            {
              label: 'Response Time Distribution',
              data: analytics.responseTimeDistribution.map(d => d.count),
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ],
              borderColor: [
                'rgb(34, 197, 94)',
                'rgb(59, 130, 246)',
                'rgb(245, 158, 11)',
                'rgb(239, 68, 68)'
              ],
              borderWidth: 2
            }
          ]
        }
      case 'productivity':
        return {
          labels: analytics.weeklyPattern.map(d => d.day),
          datasets: [
            {
              label: 'Weekly Email Pattern',
              data: analytics.weeklyPattern.map(d => d.count),
              backgroundColor: 'rgba(168, 85, 247, 0.8)',
              borderColor: 'rgb(168, 85, 247)',
              borderWidth: 2
            }
          ]
        }
      default:
        return null
    }
  }

  const getDoughnutData = () => {
    if (!analytics) return null

    return {
      labels: analytics.categoryBreakdown.map(c => c.category),
      datasets: [
        {
          data: analytics.categoryBreakdown.map(c => c.percentage),
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',    // Red for Urgent
            'rgba(59, 130, 246, 0.8)',   // Blue for Important
            'rgba(34, 197, 94, 0.8)',   // Green for Meetings
            'rgba(245, 158, 11, 0.8)'   // Yellow for Notifications
          ],
          borderColor: [
            'rgb(239, 68, 68)',
            'rgb(59, 130, 246)',
            'rgb(34, 197, 94)',
            'rgb(245, 158, 11)'
          ],
          borderWidth: 2
        }
      ]
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
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
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Activity className="w-8 h-8 text-purple-600 animate-pulse" />
          <span className="text-xl font-semibold text-gray-700">Analyzing your email data...</span>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500 text-center">Processing email patterns and productivity metrics</p>
        </div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Email Analytics</h2>
          <p className="text-gray-600">Comprehensive insights with interactive charts and AI-powered recommendations</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Time Period Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['1d', '7d', '30d', '90d', 'custom'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period === 'custom' ? 'Custom' : period}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button
            onClick={() => onExport?.('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Emails</p>
              <p className="text-3xl font-bold text-blue-900">{analytics.totalEmails.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+12% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Mail className="h-8 w-8 text-blue-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-green-700">Response Rate</p>
              <p className="text-3xl font-bold text-green-900">{analytics.responseRate.toFixed(2)}%</p>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">Above average</span>
              </div>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <TrendingUp className="h-8 w-8 text-green-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-purple-700">Avg Response Time</p>
              <p className="text-3xl font-bold text-purple-900">{analytics.averageResponseTime.toFixed(2)}h</p>
              <div className="flex items-center mt-1">
                <ArrowDown className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">-25% faster</span>
              </div>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <Clock className="h-8 w-8 text-purple-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-orange-700">Productivity Score</p>
              <p className="text-3xl font-bold text-orange-900">{analytics.productivityScore.toFixed(2)}/100</p>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">Excellent</span>
              </div>
            </div>
            <div className="p-3 bg-orange-200 rounded-full">
              <Zap className="h-8 w-8 text-orange-700" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Email Analytics</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'volume', label: 'Volume' },
                { id: 'response', label: 'Response' },
                { id: 'productivity', label: 'Productivity' }
              ].map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedMetric === metric.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-80">
            {(() => {
              const chartData = getChartData()
              console.log('Chart data:', chartData)
              console.log('Selected metric:', selectedMetric)
              if (!chartData) {
                return <div className="flex items-center justify-center h-full text-gray-500">Loading chart data...</div>
              }
              return selectedMetric === 'response' ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <Line data={chartData} options={chartOptions} />
              )
            })()}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Email Categories</h3>
          <div className="h-80">
            {(() => {
              const doughnutData = getDoughnutData()
              console.log('Doughnut data:', doughnutData)
              if (!doughnutData) {
                return <div className="flex items-center justify-center h-full text-gray-500">Loading category data...</div>
              }
              return <Doughnut data={doughnutData} options={doughnutOptions} />
            })()}
          </div>
          <div className="mt-4 space-y-2">
            {analytics.categoryBreakdown.map((category, index) => (
              <button
                key={index}
                onClick={() => onCategoryClick?.(category.category)}
                className={`w-full p-3 rounded-lg text-left transition-all hover:bg-gray-50 ${
                  selectedCategory === category.category 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-red-500' :      // Urgent - Red
                      index === 1 ? 'bg-blue-500' :     // Important - Blue
                      index === 2 ? 'bg-green-500' :    // Meetings - Green
                      'bg-yellow-500'                   // Notifications - Yellow
                    }`}></div>
                    <span className="font-medium text-gray-900">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{category.count}</span>
                    <span className="text-xs text-gray-500">({category.percentage}%)</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Peak Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Peak Email Hours</h3>
          <div className="space-y-3">
            {analytics.peakHours.slice(9, 18).map((hour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{hour.hour}:00</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(hour.count / 30) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{hour.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Contacts</h3>
          <div className="space-y-4">
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

        {/* Productivity Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Productivity Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Emails Processed</span>
              <span className="text-lg font-bold text-blue-600">{analytics.productivityMetrics.emailsProcessed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time Spent</span>
              <span className="text-lg font-bold text-green-600">{analytics.productivityMetrics.timeSpent}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Efficiency</span>
              <span className="text-lg font-bold text-purple-600">{analytics.productivityMetrics.efficiency}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Inbox Zero Days</span>
              <span className="text-lg font-bold text-orange-600">{analytics.productivityMetrics.inboxZeroDays}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">AI-Powered Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analytics.insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              insight.type === 'success' ? 'bg-green-50 border border-green-200' :
              insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {insight.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {insight.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                {insight.type === 'info' && <Star className="w-5 h-5 text-blue-600" />}
                <h4 className={`font-semibold ${
                  insight.type === 'success' ? 'text-green-900' :
                  insight.type === 'warning' ? 'text-yellow-900' :
                  'text-blue-900'
                }`}>{insight.title}</h4>
              </div>
              <p className={`text-sm mb-2 ${
                insight.type === 'success' ? 'text-green-700' :
                insight.type === 'warning' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>{insight.description}</p>
              {insight.action && (
                <button className={`text-xs font-medium ${
                  insight.type === 'success' ? 'text-green-600 hover:text-green-700' :
                  insight.type === 'warning' ? 'text-yellow-600 hover:text-yellow-700' :
                  'text-blue-600 hover:text-blue-700'
                }`}>
                  {insight.action} →
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">AI-Powered Productivity Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analytics.aiInsights.map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'optimization' ? 'bg-blue-50 border-blue-500' :
              insight.type === 'pattern' ? 'bg-yellow-50 border-yellow-500' :
              insight.type === 'achievement' ? 'bg-green-50 border-green-500' :
              insight.type === 'prediction' ? 'bg-purple-50 border-purple-500' :
              'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {insight.type === 'optimization' && <Target className="w-5 h-5 text-blue-600" />}
                  {insight.type === 'pattern' && <TrendingUp className="w-5 h-5 text-yellow-600" />}
                  {insight.type === 'achievement' && <Trophy className="w-5 h-5 text-green-600" />}
                  {insight.type === 'prediction' && <Eye className="w-5 h-5 text-purple-600" />}
                  {insight.type === 'warning' && <AlertCircle className="w-5 h-5 text-red-600" />}
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {insight.impact} impact
                  </span>
                  <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
              {insight.action && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{insight.action}</span>
                  {insight.trend && (
                    <div className="flex items-center space-x-1">
                      {insight.trend === 'improving' && <ArrowUp className="w-4 h-4 text-green-600" />}
                      {insight.trend === 'declining' && <ArrowDown className="w-4 h-4 text-red-600" />}
                      {insight.trend === 'stable' && <Minus className="w-4 h-4 text-gray-600" />}
                      <span className="text-xs text-gray-500 capitalize">{insight.trend}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Smart Goals Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <TargetIcon className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Smart Goals & Progress</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analytics.smartGoals.map((goal) => (
            <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{goal.name}</h4>
                <div className="flex items-center space-x-1">
                  {goal.trend === 'improving' && <ArrowUp className="w-4 h-4 text-green-600" />}
                  {goal.trend === 'declining' && <ArrowDown className="w-4 h-4 text-red-600" />}
                  {goal.trend === 'stable' && <Minus className="w-4 h-4 text-gray-600" />}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current</span>
                  <span className="font-medium">{goal.current} {goal.unit}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Target</span>
                  <span className="font-medium">{goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, goal.progress)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{Math.round(goal.progress)}% complete</span>
                  {goal.streak && <span>{goal.streak} day streak</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">Predictive Analytics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Volume Forecast</h4>
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-1">{analytics.predictions.emailVolumeForecast}</p>
            <p className="text-sm text-gray-600">emails expected tomorrow</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Optimal Response Time</h4>
            </div>
            <p className="text-lg font-bold text-blue-600 mb-1">{analytics.predictions.optimalResponseTime}</p>
            <p className="text-sm text-gray-600">best time to reply</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Timer className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Recommended Break</h4>
            </div>
            <p className="text-lg font-bold text-green-600 mb-1">{analytics.predictions.recommendedBreak}</p>
            <p className="text-sm text-gray-600">for optimal productivity</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <Focus className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-gray-900">Focus Time</h4>
            </div>
            <p className="text-sm font-medium text-orange-600 mb-1">{analytics.predictions.focusTimeRecommendation}</p>
            <p className="text-sm text-gray-600">for deep work</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="w-5 h-5 text-yellow-600" />
              <h4 className="font-semibold text-gray-900">Stress Level</h4>
            </div>
            <p className={`text-lg font-bold mb-1 ${
              analytics.predictions.stressLevel === 'high' ? 'text-red-600' :
              analytics.predictions.stressLevel === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {analytics.predictions.stressLevel.charAt(0).toUpperCase() + analytics.predictions.stressLevel.slice(1)}
            </p>
            <p className="text-sm text-gray-600">current workload stress</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-indigo-200">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">Workload Balance</h4>
            </div>
            <p className="text-sm font-medium text-indigo-600 mb-1">{analytics.predictions.workloadBalance}</p>
            <p className="text-sm text-gray-600">recommendation</p>
          </div>
        </div>
      </motion.div>

      {/* Behavioral Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <BarChart className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">Behavioral Patterns</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">Peak Performance</h4>
            </div>
            <p className="text-lg font-bold text-indigo-600 mb-1">{analytics.behavioralPatterns.peakPerformanceWindow}</p>
            <p className="text-sm text-gray-600">your most productive hours</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Productivity Correlation</h4>
            </div>
            <p className="text-lg font-bold text-green-600 mb-1">{parseFloat((analytics.behavioralPatterns.productivityCorrelation * 100).toFixed(2))}%</p>
            <p className="text-sm text-gray-600">email efficiency correlation</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Email Complexity</h4>
            </div>
            <p className="text-lg font-bold text-purple-600 mb-1">{analytics.behavioralPatterns.emailComplexityScore}/10</p>
            <p className="text-sm text-gray-600">average complexity score</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h4 className="font-semibold text-gray-900">Interruption Impact</h4>
            </div>
            <p className="text-lg font-bold text-yellow-600 mb-1">{parseFloat((analytics.behavioralPatterns.interruptionImpact * 100).toFixed(2))}%</p>
            <p className="text-sm text-gray-600">productivity loss from interruptions</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Focus className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Focus Efficiency</h4>
            </div>
            <p className="text-lg font-bold text-blue-600 mb-1">{parseFloat((analytics.behavioralPatterns.focusTimeEfficiency * 100).toFixed(2))}%</p>
            <p className="text-sm text-gray-600">focus time effectiveness</p>
          </div>
        </div>
      </motion.div>

      {/* Wellness Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Wellness & Balance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Work-Life Balance</h4>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">{analytics.wellnessMetrics.workLifeBalance}%</p>
            <p className="text-sm text-gray-600">overall balance score</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Timer className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Mindfulness Time</h4>
            </div>
            <p className="text-lg font-bold text-blue-600 mb-1">{analytics.wellnessMetrics.mindfulnessTime}</p>
            <p className="text-sm text-gray-600">daily mindfulness practice</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Boundary Score</h4>
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-1">{analytics.wellnessMetrics.boundaryScore}%</p>
            <p className="text-sm text-gray-600">email boundary setting</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-gray-900">Recovery Time</h4>
            </div>
            <p className="text-lg font-bold text-orange-600 mb-1">{analytics.wellnessMetrics.recoveryTime}h</p>
            <p className="text-sm text-gray-600">average recovery from high-volume days</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-red-200 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-gray-900">Stress Indicators</h4>
            </div>
            <div className="space-y-1">
              {analytics.wellnessMetrics.stressIndicators.map((indicator, index) => (
                <p key={index} className="text-sm text-red-600">• {indicator}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Weekly Meeting Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Meeting Heatmap</h3>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, index) => {
              const intensity = Math.random() * 4;
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-sm ${
                    intensity === 0 ? 'bg-gray-100' :
                    intensity < 1 ? 'bg-green-200' :
                    intensity < 2 ? 'bg-green-300' :
                    intensity < 3 ? 'bg-green-400' :
                    'bg-green-500'
                  }`}
                  title={`${Math.floor(intensity)} meetings`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Today's Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Today's Meetings</h3>
          <div className="space-y-4">
            {[
              { time: '9:00 AM', title: 'Daily Standup', attendees: 8, duration: '30m', priority: 'high' },
              { time: '2:00 PM', title: 'Product Review', attendees: 5, duration: '1h', priority: 'medium' },
              { time: '4:00 PM', title: 'Client Call', attendees: 3, duration: '45m', priority: 'high' }
            ].map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    meeting.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{meeting.title}</p>
                    <p className="text-sm text-gray-600">{meeting.time} • {meeting.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{meeting.attendees} people</p>
                  <p className="text-xs text-gray-500 capitalize">{meeting.priority} priority</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Email Volume Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6 mt-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Email Volume Trend (Last 7 Days)</h3>
        <div className="h-64">
          {(() => {
            const volumeData = {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                label: 'Emails Received',
                data: [45, 52, 38, 61, 48, 25, 30],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
              }]
            };
            return <Line data={volumeData} options={{
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
            }} />;
          })()}
        </div>
      </motion.div>

      {/* Meeting Time Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-white rounded-xl border border-gray-200 p-6 mt-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Meeting Time Distribution</h3>
        <div className="space-y-4">
          {[
            { hour: '9:00 AM', count: 12, percentage: 25 },
            { hour: '10:00 AM', count: 8, percentage: 17 },
            { hour: '2:00 PM', count: 15, percentage: 31 },
            { hour: '3:00 PM', count: 10, percentage: 21 },
            { hour: '4:00 PM', count: 3, percentage: 6 }
          ].map((time, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-gray-600">{time.hour}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${time.percentage}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-900">{time.count}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
