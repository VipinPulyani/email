'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Star, 
  Calendar,
  User,
  MessageSquare,
  Target,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Bell,
  Zap,
  Play
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed'
  dueDate?: string
  emailId: string
  emailSubject: string
  from: string
  createdAt: string
  tags: string[]
}

interface TaskManagerProps {
  emails: any[]
  onTaskCreate: (task: Task) => void
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void
  onTaskDelete: (taskId: string) => void
}

export default function TaskManager({ emails, onTaskCreate, onTaskUpdate, onTaskDelete }: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Auto-generate tasks from emails
  useEffect(() => {
    const autoTasks: Task[] = emails
      .filter(email => {
        const text = `${email.subject} ${email.preview}`.toLowerCase()
        return text.includes('task') || text.includes('todo') || text.includes('action') || 
               text.includes('follow up') || text.includes('deadline') || text.includes('urgent')
      })
      .map(email => ({
        id: `task-${email.id}`,
        title: email.subject,
        description: email.preview,
        priority: email.isImportant ? 'high' : 'medium',
        status: 'pending',
        emailId: email.id,
        emailSubject: email.subject,
        from: email.from,
        createdAt: email.time,
        tags: extractTags(email)
      }))

    setTasks(autoTasks)
  }, [emails])

  const extractTags = (email: any): string[] => {
    const text = `${email.subject} ${email.preview}`.toLowerCase()
    const tags = []
    
    if (text.includes('meeting')) tags.push('Meeting')
    if (text.includes('deadline')) tags.push('Deadline')
    if (text.includes('urgent')) tags.push('Urgent')
    if (text.includes('client')) tags.push('Client')
    if (text.includes('project')) tags.push('Project')
    if (text.includes('budget')) tags.push('Budget')
    
    return tags
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-green-600 bg-green-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter || task.priority === filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleTaskComplete = (taskId: string) => {
    onTaskUpdate(taskId, { status: 'completed' })
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ))
  }

  const handleTaskStart = (taskId: string) => {
    onTaskUpdate(taskId, { status: 'in_progress' })
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'in_progress' } : task
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Task Manager</h3>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex space-x-2">
            {['all', 'pending', 'in_progress', 'completed', 'high'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {task.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>From: {task.from}</span>
                  <span>Created: {task.createdAt}</span>
                  {task.dueDate && <span>Due: {task.dueDate}</span>}
                </div>
                
                {/* Tags */}
                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {task.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleTaskStart(task.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Start Task"
                  >
                    <Play className="w-4 h-4 text-blue-600" />
                  </button>
                )}
                {task.status !== 'completed' && (
                  <button
                    onClick={() => handleTaskComplete(task.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Complete Task"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedTask(task)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Edit Task"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onTaskDelete(task.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Task Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Task Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => t.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-500">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  )
}
