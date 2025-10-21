'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Filter, 
  Tag, 
  Mail, 
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  Users,
  Calendar,
  MessageSquare,
  Star,
  Archive,
  Send,
  Reply,
  Forward
} from 'lucide-react'

interface CustomCategory {
  id: string
  name: string
  color: string
  icon: string
  rules: Rule[]
  description: string
}

interface Rule {
  id: string
  type: 'sender' | 'subject' | 'content' | 'time' | 'priority'
  operator: 'contains' | 'equals' | 'starts_with' | 'ends_with' | 'regex'
  value: string
  enabled: boolean
}

interface SettingsProps {
  onCategoryUpdate: (categories: CustomCategory[]) => void
}

export default function Settings({ onCategoryUpdate }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'categories' | 'rules' | 'automation' | 'preferences'>('categories')
  const [categories, setCategories] = useState<CustomCategory[]>([
    {
      id: '1',
      name: 'VIP Clients',
      color: 'purple',
      icon: 'Star',
      description: 'High-priority client communications',
      rules: [
        { id: '1', type: 'sender', operator: 'contains', value: 'ceo@', enabled: true },
        { id: '2', type: 'subject', operator: 'contains', value: 'urgent', enabled: true }
      ]
    },
    {
      id: '2',
      name: 'Project Updates',
      color: 'blue',
      icon: 'Target',
      description: 'Project-related communications',
      rules: [
        { id: '3', type: 'subject', operator: 'contains', value: 'project', enabled: true },
        { id: '4', type: 'content', operator: 'contains', value: 'milestone', enabled: true }
      ]
    },
    {
      id: '3',
      name: 'Team Meetings',
      color: 'green',
      icon: 'Users',
      description: 'Meeting invitations and updates',
      rules: [
        { id: '5', type: 'subject', operator: 'contains', value: 'meeting', enabled: true },
        { id: '6', type: 'content', operator: 'contains', value: 'calendar', enabled: true }
      ]
    }
  ])
  
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: 'blue',
    icon: 'Mail',
    description: ''
  })

  const colorOptions = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
    { name: 'Gray', value: 'gray', class: 'bg-gray-500' }
  ]

  const iconOptions = [
    { name: 'Mail', icon: Mail },
    { name: 'Star', icon: Star },
    { name: 'Target', icon: Target },
    { name: 'Users', icon: Users },
    { name: 'Calendar', icon: Calendar },
    { name: 'MessageSquare', icon: MessageSquare },
    { name: 'Archive', icon: Archive },
    { name: 'Send', icon: Send },
    { name: 'Reply', icon: Reply },
    { name: 'Forward', icon: Forward }
  ]

  const ruleTypes = [
    { type: 'sender', label: 'Sender Email', description: 'Filter by sender email address' },
    { type: 'subject', label: 'Subject Line', description: 'Filter by email subject' },
    { type: 'content', label: 'Email Content', description: 'Filter by email body content' },
    { type: 'time', label: 'Time Received', description: 'Filter by time email was received' },
    { type: 'priority', label: 'Priority Level', description: 'Filter by email priority' }
  ]

  const operators = [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'starts_with', label: 'Starts with' },
    { value: 'ends_with', label: 'Ends with' },
    { value: 'regex', label: 'Regex pattern' }
  ]

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: CustomCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        color: newCategory.color,
        icon: newCategory.icon,
        description: newCategory.description,
        rules: []
      }
      setCategories([...categories, category])
      setNewCategory({ name: '', color: 'blue', icon: 'Mail', description: '' })
      setShowAddCategory(false)
      onCategoryUpdate([...categories, category])
    }
  }

  const handleEditCategory = (category: CustomCategory) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      color: category.color,
      icon: category.icon,
      description: category.description
    })
    setShowAddCategory(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId))
    onCategoryUpdate(categories.filter(c => c.id !== categoryId))
  }

  const handleUpdateCategory = () => {
    if (editingCategory && newCategory.name.trim()) {
      const updatedCategories = categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...newCategory }
          : c
      )
      setCategories(updatedCategories)
      onCategoryUpdate(updatedCategories)
      setEditingCategory(null)
      setNewCategory({ name: '', color: 'blue', icon: 'Mail', description: '' })
      setShowAddCategory(false)
    }
  }

  const addRuleToCategory = (categoryId: string) => {
    const newRule: Rule = {
      id: Date.now().toString(),
      type: 'sender',
      operator: 'contains',
      value: '',
      enabled: true
    }
    
    const updatedCategories = categories.map(c => 
      c.id === categoryId 
        ? { ...c, rules: [...c.rules, newRule] }
        : c
    )
    setCategories(updatedCategories)
    onCategoryUpdate(updatedCategories)
  }

  const updateRule = (categoryId: string, ruleId: string, updates: Partial<Rule>) => {
    const updatedCategories = categories.map(c => 
      c.id === categoryId 
        ? { 
            ...c, 
            rules: c.rules.map(r => 
              r.id === ruleId ? { ...r, ...updates } : r
            )
          }
        : c
    )
    setCategories(updatedCategories)
    onCategoryUpdate(updatedCategories)
  }

  const deleteRule = (categoryId: string, ruleId: string) => {
    const updatedCategories = categories.map(c => 
      c.id === categoryId 
        ? { ...c, rules: c.rules.filter(r => r.id !== ruleId) }
        : c
    )
    setCategories(updatedCategories)
    onCategoryUpdate(updatedCategories)
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.name === iconName)
    return iconOption ? iconOption.icon : Mail
  }

  const getColorClass = (color: string) => {
    const colorOption = colorOptions.find(opt => opt.value === color)
    return colorOption ? colorOption.class : 'bg-blue-500'
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Settings</h2>
        <p className="text-gray-600">Customize your email experience with categories, rules, and automation</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'categories', label: 'Categories', icon: Tag },
          { id: 'rules', label: 'Rules', icon: Filter },
          { id: 'automation', label: 'Automation', icon: Zap },
          { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Custom Categories</h3>
            <button
              onClick={() => setShowAddCategory(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = getIconComponent(category.icon)
              const colorClass = getColorClass(category.color)
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colorClass.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                        <IconComponent className={`w-5 h-5 ${colorClass.replace('bg-', 'text-').replace('-500', '-600')}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rules:</span>
                      <span className="font-medium text-gray-900">{category.rules.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Active:</span>
                      <span className="font-medium text-green-600">
                        {category.rules.filter(r => r.enabled).length}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addRuleToCategory(category.id)}
                    className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    + Add Rule
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Add Category Modal */}
          {showAddCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddCategory(false)
                      setEditingCategory(null)
                      setNewCategory({ name: '', color: 'blue', icon: 'Mail', description: '' })
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter category name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter category description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newCategory.color === color.value
                              ? 'border-gray-900 ring-2 ring-blue-500'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full ${color.class} mx-auto`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                      {iconOptions.map((icon) => {
                        const IconComponent = icon.icon
                        return (
                          <button
                            key={icon.name}
                            onClick={() => setNewCategory({ ...newCategory, icon: icon.name })}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              newCategory.icon === icon.name
                                ? 'border-gray-900 ring-2 ring-blue-500'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <IconComponent className="w-5 h-5 text-gray-600 mx-auto" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingCategory ? 'Update' : 'Create'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCategory(false)
                      setEditingCategory(null)
                      setNewCategory({ name: '', color: 'blue', icon: 'Mail', description: '' })
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Email Rules</h3>
          
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${getColorClass(category.color).replace('bg-', 'bg-').replace('-500', '-100')}`}>
                  {React.createElement(getIconComponent(category.icon), { 
                    className: `w-5 h-5 ${getColorClass(category.color).replace('bg-', 'text-').replace('-500', '-600')}` 
                  })}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {category.rules.map((rule) => (
                  <div key={rule.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={(e) => updateRule(category.id, rule.id, { enabled: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    
                    <select
                      value={rule.type}
                      onChange={(e) => updateRule(category.id, rule.id, { type: e.target.value as any })}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      {ruleTypes.map((type) => (
                        <option key={type.type} value={type.type}>{type.label}</option>
                      ))}
                    </select>

                    <select
                      value={rule.operator}
                      onChange={(e) => updateRule(category.id, rule.id, { operator: e.target.value as any })}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      {operators.map((op) => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={rule.value}
                      onChange={(e) => updateRule(category.id, rule.id, { value: e.target.value })}
                      placeholder="Enter value..."
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                    />

                    <button
                      onClick={() => deleteRule(category.id, rule.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addRuleToCategory(category.id)}
                  className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400"
                >
                  + Add Rule to {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Email Automation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Auto-Reply</h4>
                  <p className="text-sm text-gray-500">Automatically respond to emails</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Out of Office</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vacation Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Smart Filtering</h4>
                  <p className="text-sm text-gray-500">AI-powered email organization</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-categorize</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority Detection</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Email Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-500">Get notified of new emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sound Alerts</p>
                    <p className="text-xs text-gray-500">Play sound for new emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Display</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Density</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Comfortable</option>
                    <option>Compact</option>
                    <option>Cozy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
