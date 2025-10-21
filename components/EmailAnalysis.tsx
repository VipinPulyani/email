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
  Info
} from 'lucide-react'

interface EmailAnalysis {
  id: string
  sentiment: 'positive' | 'negative' | 'neutral' | 'urgent'
  priority: 'high' | 'medium' | 'low'
  category: 'work' | 'personal' | 'marketing' | 'notification' | 'important'
  urgency: 'immediate' | 'today' | 'this_week' | 'later'
  actionRequired: boolean
  deadline?: string
  keyTopics: string[]
  suggestedActions: string[]
  confidence: number
}

interface EmailAnalysisProps {
  emailId: string
  emailContent: {
    from: string
    subject: string
    body: string
    time: string
  }
  onAnalysisComplete: (analysis: EmailAnalysis) => void
}

// Mock AI analysis function
const analyzeEmail = (email: any): EmailAnalysis => {
  const { from, subject, body, time } = email
  
  // Simple sentiment analysis based on keywords
  const positiveWords = ['thank', 'great', 'excellent', 'good', 'happy', 'pleased', 'success']
  const negativeWords = ['urgent', 'problem', 'issue', 'error', 'failed', 'concern', 'deadline']
  const urgentWords = ['asap', 'urgent', 'immediately', 'deadline', 'critical', 'emergency']
  
  const text = `${subject} ${body}`.toLowerCase()
  
  let sentiment: 'positive' | 'negative' | 'neutral' | 'urgent' = 'neutral'
  let priority: 'high' | 'medium' | 'low' = 'low'
  let urgency: 'immediate' | 'today' | 'this_week' | 'later' = 'later'
  let category: 'work' | 'personal' | 'marketing' | 'notification' | 'important' = 'work'
  
  // Determine sentiment
  if (urgentWords.some(word => text.includes(word))) {
    sentiment = 'urgent'
    priority = 'high'
    urgency = 'immediate'
  } else if (negativeWords.some(word => text.includes(word))) {
    sentiment = 'negative'
    priority = 'medium'
  } else if (positiveWords.some(word => text.includes(word))) {
    sentiment = 'positive'
    priority = 'low'
  }
  
  // Determine category
  if (from.includes('noreply') || from.includes('notification')) {
    category = 'notification'
  } else if (from.includes('marketing') || subject.toLowerCase().includes('sale')) {
    category = 'marketing'
  } else if (subject.toLowerCase().includes('important') || priority === 'high') {
    category = 'important'
  }
  
  // Determine urgency
  if (text.includes('today') || text.includes('asap')) {
    urgency = 'today'
  } else if (text.includes('this week') || text.includes('soon')) {
    urgency = 'this_week'
  }
  
  const actionRequired = urgency === 'immediate' || priority === 'high' || sentiment === 'urgent'
  
  // Extract key topics
  const keyTopics = []
  if (text.includes('meeting')) keyTopics.push('Meeting')
  if (text.includes('project')) keyTopics.push('Project')
  if (text.includes('deadline')) keyTopics.push('Deadline')
  if (text.includes('budget')) keyTopics.push('Budget')
  if (text.includes('client')) keyTopics.push('Client')
  if (text.includes('team')) keyTopics.push('Team')
  
  // Generate suggested actions
  const suggestedActions = []
  if (sentiment === 'urgent') suggestedActions.push('Reply immediately')
  if (actionRequired) suggestedActions.push('Add to task list')
  if (category === 'important') suggestedActions.push('Star email')
  if (urgency === 'today') suggestedActions.push('Schedule for today')
  if (keyTopics.includes('Meeting')) suggestedActions.push('Add to calendar')
  
  return {
    id: email.id,
    sentiment,
    priority,
    category,
    urgency,
    actionRequired,
    keyTopics,
    suggestedActions,
    confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
  }
}

export default function EmailAnalysis({ emailId, emailContent, onAnalysisComplete }: EmailAnalysisProps) {
  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      const result = analyzeEmail(emailContent)
      setAnalysis(result)
      setIsAnalyzing(false)
      onAnalysisComplete(result)
    }, 1000)

    return () => clearTimeout(timer)
  }, [emailId, emailContent, onAnalysisComplete])

  if (isAnalyzing) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
          <span className="text-blue-700 font-medium">AI is analyzing this email...</span>
        </div>
      </div>
    )
  }

  if (!analysis) return null

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      case 'urgent': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-green-600 bg-green-100'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-600 bg-red-100'
      case 'today': return 'text-orange-600 bg-orange-100'
      case 'this_week': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">AI Analysis</h3>
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(analysis.confidence * 100)}% confidence
        </div>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sentiment */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Sentiment</label>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(analysis.sentiment)}`}>
            {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Priority</label>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(analysis.priority)}`}>
            {analysis.priority.charAt(0).toUpperCase() + analysis.priority.slice(1)}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Category</label>
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{analysis.category}</span>
          </div>
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Urgency</label>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(analysis.urgency)}`}>
            {analysis.urgency.replace('_', ' ').charAt(0).toUpperCase() + analysis.urgency.replace('_', ' ').slice(1)}
          </div>
        </div>
      </div>

      {/* Key Topics */}
      {analysis.keyTopics.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Key Topics</label>
          <div className="flex flex-wrap gap-2">
            {analysis.keyTopics.map((topic, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Required */}
      {analysis.actionRequired && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-orange-700 font-medium">Action Required</span>
          </div>
        </div>
      )}

      {/* Suggested Actions */}
      {analysis.suggestedActions.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Suggested Actions</label>
          <div className="space-y-1">
            {analysis.suggestedActions.map((action, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex space-x-2 pt-2 border-t border-gray-200">
        <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-purple-700">
          Apply Suggestions
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-50">
          Dismiss
        </button>
      </div>
    </motion.div>
  )
}
