'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Plus, 
  Clock, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  User,
  MessageSquare,
  Zap,
  Brain,
  Target
} from 'lucide-react'

interface AutoReplyRule {
  id: string
  name: string
  description: string
  isActive: boolean
  conditions: {
    keywords: string[]
    sender: string
    subject: string
    timeRange: { start: string; end: string }
  }
  response: {
    subject: string
    body: string
    delay: number // minutes
  }
  stats: {
    triggered: number
    lastUsed: string
  }
}

interface AutoReplyProps {
  onRuleCreate: (rule: AutoReplyRule) => void
  onRuleUpdate: (ruleId: string, updates: Partial<AutoReplyRule>) => void
  onRuleDelete: (ruleId: string) => void
}

export default function AutoReply({ onRuleCreate, onRuleUpdate, onRuleDelete }: AutoReplyProps) {
  const [rules, setRules] = useState<AutoReplyRule[]>([
    {
      id: '1',
      name: 'Out of Office',
      description: 'Automatic response when away from office',
      isActive: true,
      conditions: {
        keywords: ['meeting', 'urgent', 'deadline'],
        sender: '',
        subject: '',
        timeRange: { start: '09:00', end: '17:00' }
      },
      response: {
        subject: 'Re: {{original_subject}}',
        body: 'Thank you for your email. I am currently out of the office and will respond when I return. For urgent matters, please contact my assistant.',
        delay: 0
      },
      stats: {
        triggered: 12,
        lastUsed: '2 hours ago'
      }
    },
    {
      id: '2',
      name: 'Meeting Requests',
      description: 'Auto-respond to meeting requests',
      isActive: true,
      conditions: {
        keywords: ['meeting', 'schedule', 'calendar'],
        sender: '',
        subject: 'meeting',
        timeRange: { start: '00:00', end: '23:59' }
      },
      response: {
        subject: 'Re: {{original_subject}}',
        body: 'Thank you for the meeting request. I will review my calendar and get back to you with available times.',
        delay: 30
      },
      stats: {
        triggered: 8,
        lastUsed: '1 day ago'
      }
    },
    {
      id: '3',
      name: 'Support Inquiries',
      description: 'Respond to customer support emails',
      isActive: false,
      conditions: {
        keywords: ['support', 'help', 'issue', 'problem'],
        sender: '',
        subject: '',
        timeRange: { start: '00:00', end: '23:59' }
      },
      response: {
        subject: 'Re: {{original_subject}}',
        body: 'Thank you for contacting support. We have received your inquiry and will respond within 24 hours.',
        delay: 15
      },
      stats: {
        triggered: 25,
        lastUsed: '3 hours ago'
      }
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingRule, setEditingRule] = useState<AutoReplyRule | null>(null)
  const [newRule, setNewRule] = useState<Partial<AutoReplyRule>>({
    name: '',
    description: '',
    isActive: true,
    conditions: {
      keywords: [],
      sender: '',
      subject: '',
      timeRange: { start: '09:00', end: '17:00' }
    },
    response: {
      subject: '',
      body: '',
      delay: 0
    }
  })

  const handleCreateRule = () => {
    if (newRule.name && newRule.description && newRule.response?.body) {
      const rule: AutoReplyRule = {
        id: Date.now().toString(),
        name: newRule.name,
        description: newRule.description,
        isActive: newRule.isActive || false,
        conditions: newRule.conditions || {
          keywords: [],
          sender: '',
          subject: '',
          timeRange: { start: '09:00', end: '17:00' }
        },
        response: newRule.response || {
          subject: '',
          body: '',
          delay: 0
        },
        stats: {
          triggered: 0,
          lastUsed: 'Never'
        }
      }
      setRules([...rules, rule])
      onRuleCreate(rule)
      setNewRule({
        name: '',
        description: '',
        isActive: true,
        conditions: {
          keywords: [],
          sender: '',
          subject: '',
          timeRange: { start: '09:00', end: '17:00' }
        },
        response: {
          subject: '',
          body: '',
          delay: 0
        }
      })
      setShowCreateForm(false)
    }
  }

  const handleToggleRule = (ruleId: string) => {
    const updatedRules = rules.map(rule =>
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    )
    setRules(updatedRules)
    onRuleUpdate(ruleId, { isActive: !rules.find(r => r.id === ruleId)?.isActive })
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId))
    onRuleDelete(ruleId)
  }

  const totalTriggered = rules.reduce((sum, rule) => sum + rule.stats.triggered, 0)
  const activeRules = rules.filter(rule => rule.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Auto Reply System</h3>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Rule</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalTriggered}</div>
            <div className="text-sm text-gray-500">Total Responses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeRules}</div>
            <div className="text-sm text-gray-500">Active Rules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{rules.length}</div>
            <div className="text-sm text-gray-500">Total Rules</div>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <h4 className="font-semibold text-gray-900 mb-4">Create Auto Reply Rule</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  value={newRule.name || ''}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Out of Office"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newRule.description || ''}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Brief description of this rule"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma-separated)</label>
              <input
                type="text"
                value={newRule.conditions?.keywords?.join(', ') || ''}
                onChange={(e) => setNewRule({
                  ...newRule,
                  conditions: {
                    ...newRule.conditions!,
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="meeting, urgent, deadline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Response Subject</label>
              <input
                type="text"
                value={newRule.response?.subject || ''}
                onChange={(e) => setNewRule({
                  ...newRule,
                  response: {
                    ...newRule.response!,
                    subject: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Re: {{original_subject}}"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Response Body</label>
              <textarea
                value={newRule.response?.body || ''}
                onChange={(e) => setNewRule({
                  ...newRule,
                  response: {
                    ...newRule.response!,
                    body: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                placeholder="Enter your auto-reply message..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newRule.isActive}
                  onChange={(e) => setNewRule({...newRule, isActive: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">Active immediately</label>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRule}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Rule
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${rule.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <h4 className="font-semibold text-gray-900">{rule.name}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {rule.stats.triggered} responses
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Keywords:</span>
                    <span className="text-gray-600 ml-2">
                      {rule.conditions.keywords.length > 0 ? rule.conditions.keywords.join(', ') : 'Any'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Last Used:</span>
                    <span className="text-gray-600 ml-2">{rule.stats.lastUsed}</span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-1">Response Preview:</div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">Subject: {rule.response.subject}</div>
                    <div className="mt-1">{rule.response.body}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    rule.isActive 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={rule.isActive ? 'Deactivate' : 'Activate'}
                >
                  {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditingRule(rule)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  title="Edit Rule"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  title="Delete Rule"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Smart Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-4"
      >
        <h4 className="font-semibold text-gray-900 mb-4">Smart Suggestions</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Optimize Response Times</p>
              <p className="text-xs text-gray-600">Consider adding a rule for "urgent" keywords to respond faster to critical emails.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Target className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Personalize Responses</p>
              <p className="text-xs text-gray-600">Use variables like sender name and original subject to make responses more personal.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Zap className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Time-based Rules</p>
              <p className="text-xs text-gray-600">Set different responses for business hours vs. after hours to manage expectations.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
