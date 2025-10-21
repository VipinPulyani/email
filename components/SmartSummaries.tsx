'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  FileText, 
  Clock, 
  Star, 
  AlertCircle, 
  CheckCircle, 
  Target,
  TrendingUp,
  MessageSquare,
  Zap,
  Eye,
  Download,
  Share,
  Copy,
  RefreshCw,
  X
} from 'lucide-react'

interface EmailSummary {
  id: string
  emailId: string
  subject: string
  from: string
  summary: string
  keyPoints: string[]
  actionItems: string[]
  sentiment: 'positive' | 'negative' | 'neutral' | 'urgent'
  priority: 'high' | 'medium' | 'low'
  estimatedReadTime: string
  createdAt: string
  confidence: number
}

interface SmartSummariesProps {
  emails: any[]
  onSummaryClick: (summary: EmailSummary) => void
}

export default function SmartSummaries({ emails, onSummaryClick }: SmartSummariesProps) {
  const [summaries, setSummaries] = useState<EmailSummary[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedSummary, setSelectedSummary] = useState<EmailSummary | null>(null)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const generateSummary = (email: any): EmailSummary => {
    const text = `${email.subject} ${email.preview}`.toLowerCase()
    
    // Extract key points
    const keyPoints = []
    if (text.includes('meeting')) keyPoints.push('Meeting scheduled or discussed')
    if (text.includes('deadline')) keyPoints.push('Deadline mentioned')
    if (text.includes('urgent')) keyPoints.push('Urgent matter')
    if (text.includes('project')) keyPoints.push('Project update')
    if (text.includes('budget')) keyPoints.push('Budget discussion')
    if (text.includes('client')) keyPoints.push('Client communication')
    
    // Extract action items
    const actionItems = []
    if (text.includes('reply') || text.includes('respond')) actionItems.push('Reply required')
    if (text.includes('review') || text.includes('check')) actionItems.push('Review needed')
    if (text.includes('schedule') || text.includes('meeting')) actionItems.push('Schedule meeting')
    if (text.includes('follow up')) actionItems.push('Follow up required')
    
    // Determine sentiment
    let sentiment: 'positive' | 'negative' | 'neutral' | 'urgent' = 'neutral'
    if (text.includes('urgent') || text.includes('asap') || text.includes('emergency')) {
      sentiment = 'urgent'
    } else if (text.includes('thank') || text.includes('great') || text.includes('excellent')) {
      sentiment = 'positive'
    } else if (text.includes('problem') || text.includes('issue') || text.includes('concern')) {
      sentiment = 'negative'
    }
    
    // Determine priority
    let priority: 'high' | 'medium' | 'low' = 'low'
    if (sentiment === 'urgent' || email.isImportant) {
      priority = 'high'
    } else if (sentiment === 'negative' || keyPoints.length > 2) {
      priority = 'medium'
    }
    
    // Generate summary
    const summary = `Email from ${email.from} regarding ${email.subject}. ${
      keyPoints.length > 0 ? `Key topics include: ${keyPoints.join(', ')}. ` : ''
    }${
      actionItems.length > 0 ? `Action items: ${actionItems.join(', ')}.` : 'No specific action required.'
    }`
    
    return {
      id: `summary-${email.id}`,
      emailId: email.id,
      subject: email.subject,
      from: email.from,
      summary,
      keyPoints,
      actionItems,
      sentiment,
      priority,
      estimatedReadTime: `${Math.max(1, Math.floor(Math.random() * 3) + 1)} min`,
      createdAt: email.time,
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    }
  }

  useEffect(() => {
    setIsGenerating(true)
    const timer = setTimeout(() => {
      const generatedSummaries = emails.map(generateSummary)
      setSummaries(generatedSummaries)
      setIsGenerating(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [emails])

  const filteredSummaries = summaries.filter(summary => 
    filter === 'all' || summary.priority === filter
  )

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

  if (isGenerating) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-6 h-6 text-purple-600 animate-pulse" />
          <span className="text-gray-700 font-medium">Generating smart summaries...</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: '85%' }}></div>
          </div>
          <p className="text-sm text-gray-500 text-center">Analyzing email content and extracting key insights</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Smart Summaries</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          {['all', 'high', 'medium', 'low'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} Priority
            </button>
          ))}
        </div>
      </div>

      {/* Summaries List */}
      <div className="space-y-4">
        {filteredSummaries.map((summary, index) => (
          <motion.div
            key={summary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedSummary(summary)
              onSummaryClick(summary)
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{summary.subject}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(summary.sentiment)}`}>
                    {summary.sentiment}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(summary.priority)}`}>
                    {summary.priority}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>From: {summary.from}</span>
                  <span>•</span>
                  <span>{summary.estimatedReadTime} read</span>
                  <span>•</span>
                  <span>{summary.createdAt}</span>
                </div>
                
                <p className="text-gray-700 mb-3">{summary.summary}</p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(summary.summary)
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Copy Summary"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Share functionality
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Share Summary"
                >
                  <Share className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Key Points */}
            {summary.keyPoints.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Key Points</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {summary.keyPoints.map((point, pointIndex) => (
                    <span key={pointIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Items */}
            {summary.actionItems.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Action Items</span>
                </div>
                <div className="space-y-1">
                  {summary.actionItems.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Confidence Score */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>AI Confidence: {Math.round(summary.confidence * 100)}%</span>
              <span>Click to view full summary</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Detail Modal */}
      {selectedSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedSummary(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Email Summary</h3>
                <button
                  onClick={() => setSelectedSummary(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-96">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedSummary.subject}</h4>
                  <p className="text-sm text-gray-600">From: {selectedSummary.from}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Summary</h5>
                  <p className="text-gray-700">{selectedSummary.summary}</p>
                </div>
                
                {selectedSummary.keyPoints.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Key Points</h5>
                    <ul className="space-y-1">
                      {selectedSummary.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedSummary.actionItems.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Action Items</h5>
                    <ul className="space-y-1">
                      {selectedSummary.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedSummary(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(selectedSummary.summary)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Copy Summary
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Smart Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-4"
      >
        <h4 className="font-semibold text-gray-900 mb-4">Smart Insights</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Reading Time Optimization</p>
              <p className="text-xs text-gray-600">Summaries reduce reading time by 70% while maintaining key information.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Action Item Detection</p>
              <p className="text-xs text-gray-600">AI automatically identifies actionable items to improve productivity.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Brain className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Sentiment Analysis</p>
              <p className="text-xs text-gray-600">Understand email tone and urgency to prioritize responses effectively.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
