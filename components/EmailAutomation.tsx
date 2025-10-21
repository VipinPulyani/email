'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
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
  Brain,
  Target,
  Filter,
  ArrowRight,
  Workflow,
  Timer,
  Send,
  Archive,
  Star,
  Tag,
  Paperclip
} from 'lucide-react'

interface WorkflowRule {
  id: string
  name: string
  description: string
  isActive: boolean
  trigger: {
    type: 'keyword' | 'sender' | 'subject' | 'time' | 'attachment'
    value: string
    conditions: string[]
  }
  actions: Array<{
    type: 'reply' | 'forward' | 'archive' | 'star' | 'tag' | 'schedule' | 'notify'
    config: any
  }>
  stats: {
    triggered: number
    lastUsed: string
    successRate: number
  }
}

interface EmailAutomationProps {
  onWorkflowCreate: (workflow: WorkflowRule) => void
  onWorkflowUpdate: (workflowId: string, updates: Partial<WorkflowRule>) => void
  onWorkflowDelete: (workflowId: string) => void
}

export default function EmailAutomation({ onWorkflowCreate, onWorkflowUpdate, onWorkflowDelete }: EmailAutomationProps) {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>([
    {
      id: '1',
      name: 'Meeting Request Handler',
      description: 'Automatically respond to meeting requests and add to calendar',
      isActive: true,
      trigger: {
        type: 'keyword',
        value: 'meeting',
        conditions: ['subject contains meeting', 'body contains schedule']
      },
      actions: [
        { type: 'reply', config: { template: 'meeting_response' } },
        { type: 'schedule', config: { calendar: 'primary' } },
        { type: 'tag', config: { tag: 'meeting' } }
      ],
      stats: {
        triggered: 15,
        lastUsed: '2 hours ago',
        successRate: 95
      }
    },
    {
      id: '2',
      name: 'Urgent Email Escalation',
      description: 'Escalate urgent emails to manager and send notification',
      isActive: true,
      trigger: {
        type: 'keyword',
        value: 'urgent',
        conditions: ['subject contains urgent', 'priority is high']
      },
      actions: [
        { type: 'forward', config: { to: 'manager@company.com' } },
        { type: 'notify', config: { message: 'Urgent email received' } },
        { type: 'star', config: { priority: 'high' } }
      ],
      stats: {
        triggered: 8,
        lastUsed: '1 day ago',
        successRate: 100
      }
    },
    {
      id: '3',
      name: 'Newsletter Organization',
      description: 'Automatically organize newsletters and marketing emails',
      isActive: false,
      trigger: {
        type: 'sender',
        value: 'newsletter',
        conditions: ['from contains newsletter', 'subject contains unsubscribe']
      },
      actions: [
        { type: 'tag', config: { tag: 'newsletter' } },
        { type: 'archive', config: { folder: 'newsletters' } }
      ],
      stats: {
        triggered: 45,
        lastUsed: '3 days ago',
        successRate: 98
      }
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowRule | null>(null)
  const [newWorkflow, setNewWorkflow] = useState<Partial<WorkflowRule>>({
    name: '',
    description: '',
    isActive: true,
    trigger: {
      type: 'keyword',
      value: '',
      conditions: []
    },
    actions: [],
    stats: {
      triggered: 0,
      lastUsed: 'Never',
      successRate: 0
    }
  })

  const triggerTypes = [
    { id: 'keyword', name: 'Keyword', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'sender', name: 'Sender', icon: <User className="w-4 h-4" /> },
    { id: 'subject', name: 'Subject', icon: <Mail className="w-4 h-4" /> },
    { id: 'time', name: 'Time', icon: <Clock className="w-4 h-4" /> },
    { id: 'attachment', name: 'Attachment', icon: <Paperclip className="w-4 h-4" /> }
  ]

  const actionTypes = [
    { id: 'reply', name: 'Auto Reply', icon: <Send className="w-4 h-4" /> },
    { id: 'forward', name: 'Forward', icon: <ArrowRight className="w-4 h-4" /> },
    { id: 'archive', name: 'Archive', icon: <Archive className="w-4 h-4" /> },
    { id: 'star', name: 'Star', icon: <Star className="w-4 h-4" /> },
    { id: 'tag', name: 'Tag', icon: <Tag className="w-4 h-4" /> },
    { id: 'schedule', name: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: 'notify', name: 'Notify', icon: <AlertCircle className="w-4 h-4" /> }
  ]

  const handleCreateWorkflow = () => {
    if (newWorkflow.name && newWorkflow.description && newWorkflow.actions && newWorkflow.actions.length > 0) {
      const workflow: WorkflowRule = {
        id: Date.now().toString(),
        name: newWorkflow.name,
        description: newWorkflow.description,
        isActive: newWorkflow.isActive || false,
        trigger: newWorkflow.trigger || {
          type: 'keyword',
          value: '',
          conditions: []
        },
        actions: newWorkflow.actions,
        stats: {
          triggered: 0,
          lastUsed: 'Never',
          successRate: 0
        }
      }
      setWorkflows([...workflows, workflow])
      onWorkflowCreate(workflow)
      setNewWorkflow({
        name: '',
        description: '',
        isActive: true,
        trigger: {
          type: 'keyword',
          value: '',
          conditions: []
        },
        actions: [],
        stats: {
          triggered: 0,
          lastUsed: 'Never',
          successRate: 0
        }
      })
      setShowCreateForm(false)
    }
  }

  const handleToggleWorkflow = (workflowId: string) => {
    const updatedWorkflows = workflows.map(workflow =>
      workflow.id === workflowId ? { ...workflow, isActive: !workflow.isActive } : workflow
    )
    setWorkflows(updatedWorkflows)
    onWorkflowUpdate(workflowId, { isActive: !workflows.find(w => w.id === workflowId)?.isActive })
  }

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter(workflow => workflow.id !== workflowId))
    onWorkflowDelete(workflowId)
  }

  const addAction = (actionType: string) => {
    const newAction = {
      type: actionType as any,
      config: {}
    }
    setNewWorkflow({
      ...newWorkflow,
      actions: [...(newWorkflow.actions || []), newAction]
    })
  }

  const removeAction = (index: number) => {
    const updatedActions = newWorkflow.actions?.filter((_, i) => i !== index) || []
    setNewWorkflow({ ...newWorkflow, actions: updatedActions })
  }

  const totalTriggered = workflows.reduce((sum, workflow) => sum + workflow.stats.triggered, 0)
  const activeWorkflows = workflows.filter(workflow => workflow.isActive).length
  const averageSuccessRate = workflows.length > 0 
    ? workflows.reduce((sum, workflow) => sum + workflow.stats.successRate, 0) / workflows.length 
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Workflow className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Email Automation</h3>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Workflow</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalTriggered}</div>
            <div className="text-sm text-gray-500">Total Triggers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeWorkflows}</div>
            <div className="text-sm text-gray-500">Active Workflows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{workflows.length}</div>
            <div className="text-sm text-gray-500">Total Workflows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{averageSuccessRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">Success Rate</div>
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
          <h4 className="font-semibold text-gray-900 mb-4">Create Email Workflow</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
                <input
                  type="text"
                  value={newWorkflow.name || ''}
                  onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Meeting Request Handler"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newWorkflow.description || ''}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Brief description of this workflow"
                />
              </div>
            </div>

            {/* Trigger Configuration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trigger</label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {triggerTypes.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => setNewWorkflow({
                      ...newWorkflow,
                      trigger: { ...newWorkflow.trigger!, type: trigger.id as any }
                    })}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      newWorkflow.trigger?.type === trigger.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {trigger.icon}
                      <span className="text-xs font-medium">{trigger.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <input
                type="text"
                value={newWorkflow.trigger?.value || ''}
                onChange={(e) => setNewWorkflow({
                  ...newWorkflow,
                  trigger: { ...newWorkflow.trigger!, value: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter trigger value..."
              />
            </div>

            {/* Actions Configuration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <div className="grid grid-cols-7 gap-2 mb-3">
                {actionTypes.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => addAction(action.id)}
                    className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {action.icon}
                      <span className="text-xs font-medium">{action.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Selected Actions */}
              <div className="space-y-2">
                {newWorkflow.actions?.map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {actionTypes.find(t => t.id === action.type)?.icon}
                      <span className="text-sm font-medium">{actionTypes.find(t => t.id === action.type)?.name}</span>
                    </div>
                    <button
                      onClick={() => removeAction(index)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newWorkflow.isActive}
                  onChange={(e) => setNewWorkflow({...newWorkflow, isActive: e.target.checked})}
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
                  onClick={handleCreateWorkflow}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Workflow
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${workflow.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {workflow.stats.triggered} triggers
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                    {workflow.stats.successRate}% success
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-medium text-gray-700">Trigger:</span>
                    <span className="text-gray-600 ml-2">
                      {workflow.trigger.type} - {workflow.trigger.value}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Last Used:</span>
                    <span className="text-gray-600 ml-2">{workflow.stats.lastUsed}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Actions:</span>
                    <div className="flex space-x-2 mt-1">
                      {workflow.actions.map((action, actionIndex) => (
                        <span key={actionIndex} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {actionTypes.find(t => t.id === action.type)?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleToggleWorkflow(workflow.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    workflow.isActive 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={workflow.isActive ? 'Deactivate' : 'Activate'}
                >
                  {workflow.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditingWorkflow(workflow)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  title="Edit Workflow"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  title="Delete Workflow"
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
        <h4 className="font-semibold text-gray-900 mb-4">Automation Insights</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Smart Triggers</p>
              <p className="text-xs text-gray-600">Use AI to detect patterns and suggest optimal trigger conditions.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Workflow Optimization</p>
              <p className="text-xs text-gray-600">Monitor workflow performance and get suggestions for improvement.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
            <Target className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Conditional Logic</p>
              <p className="text-xs text-gray-600">Create complex workflows with multiple conditions and actions.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
