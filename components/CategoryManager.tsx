'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
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
  Forward,
  Bell,
  Settings,
  Eye,
  EyeOff,
  FileText,
  Clock,
  Paperclip
} from 'lucide-react'

interface Rule {
  id: string
  type: 'sender' | 'subject' | 'content' | 'time' | 'priority' | 'attachment'
  operator: 'contains' | 'equals' | 'starts_with' | 'ends_with' | 'regex' | 'is_empty' | 'is_not_empty'
  value: string
  enabled: boolean
}

interface CustomCategory {
  id: string
  name: string
  color: string
  icon: string
  description: string
  rules: Rule[]
  isDefault: boolean
  emailCount: number
}

interface CategoryManagerProps {
  categories: CustomCategory[]
  onCategoriesUpdate: (categories: CustomCategory[]) => void
  onClose: () => void
}

export default function CategoryManager({ categories, onCategoriesUpdate, onClose }: CategoryManagerProps) {
  const [activeTab, setActiveTab] = useState<'categories' | 'rules' | 'preview'>('categories')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: 'blue',
    icon: 'Mail',
    description: ''
  })
  const [showAddRule, setShowAddRule] = useState(false)
  const [editingRule, setEditingRule] = useState<{ categoryId: string; rule: Rule } | null>(null)
  const [newRule, setNewRule] = useState({
    type: 'sender' as Rule['type'],
    operator: 'contains' as Rule['operator'],
    value: '',
    enabled: true
  })
  const [selectedCategoryForRule, setSelectedCategoryForRule] = useState<string | null>(null)

  const colorOptions = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
    { name: 'Gray', value: 'gray', class: 'bg-gray-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Teal', value: 'teal', class: 'bg-teal-500' }
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
    { name: 'Forward', icon: Forward },
    { name: 'Bell', icon: Bell },
    { name: 'Settings', icon: Settings },
    { name: 'Filter', icon: Filter },
    { name: 'Tag', icon: Tag },
    { name: 'Zap', icon: Zap }
  ]

  const ruleTypes = [
    { type: 'sender', label: 'Sender Email', description: 'Filter by sender email address', icon: Mail },
    { type: 'subject', label: 'Subject Line', description: 'Filter by email subject', icon: MessageSquare },
    { type: 'content', label: 'Email Content', description: 'Filter by email body content', icon: FileText },
    { type: 'time', label: 'Time Received', description: 'Filter by time email was received', icon: Clock },
    { type: 'priority', label: 'Priority Level', description: 'Filter by email priority', icon: Star },
    { type: 'attachment', label: 'Has Attachment', description: 'Filter by attachment presence', icon: Paperclip }
  ]

  const operators = [
    { value: 'contains', label: 'Contains', description: 'Email contains this text' },
    { value: 'equals', label: 'Equals', description: 'Email exactly matches this text' },
    { value: 'starts_with', label: 'Starts with', description: 'Email starts with this text' },
    { value: 'ends_with', label: 'Ends with', description: 'Email ends with this text' },
    { value: 'regex', label: 'Regex pattern', description: 'Advanced pattern matching' },
    { value: 'is_empty', label: 'Is empty', description: 'Field is empty' },
    { value: 'is_not_empty', label: 'Is not empty', description: 'Field has content' }
  ]

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.name === iconName)
    return iconOption ? iconOption.icon : Mail
  }

  const getColorClass = (color: string) => {
    const colorOption = colorOptions.find(opt => opt.value === color)
    return colorOption ? colorOption.class : 'bg-blue-500'
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: CustomCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        color: newCategory.color,
        icon: newCategory.icon,
        description: newCategory.description,
        rules: [],
        isDefault: false,
        emailCount: 0
      }
      onCategoriesUpdate([...categories, category])
      setNewCategory({ name: '', color: 'blue', icon: 'Mail', description: '' })
      setShowAddCategory(false)
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

  const handleUpdateCategory = () => {
    if (editingCategory && newCategory.name.trim()) {
      const updatedCategories = categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...newCategory }
          : c
      )
      onCategoriesUpdate(updatedCategories)
      setEditingCategory(null)
      setNewCategory({ name: '', color: 'blue', icon: 'Mail', description: '' })
      setShowAddCategory(false)
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      onCategoriesUpdate(categories.filter(c => c.id !== categoryId))
    }
  }

  const handleAddRule = (categoryId: string) => {
    if (newRule.value.trim()) {
      const rule: Rule = {
        id: Date.now().toString(),
        ...newRule
      }
      
      const updatedCategories = categories.map(c => 
        c.id === categoryId 
          ? { ...c, rules: [...c.rules, rule] }
          : c
      )
      onCategoriesUpdate(updatedCategories)
      setNewRule({ type: 'sender', operator: 'contains', value: '', enabled: true })
      setShowAddRule(false)
    }
  }

  const handleEditRule = (categoryId: string, rule: Rule) => {
    setEditingRule({ categoryId, rule })
    setNewRule({
      type: rule.type,
      operator: rule.operator,
      value: rule.value,
      enabled: rule.enabled
    })
    setShowAddRule(true)
  }

  const handleUpdateRule = () => {
    if (editingRule && newRule.value.trim()) {
      const updatedCategories = categories.map(c => 
        c.id === editingRule.categoryId 
          ? { 
              ...c, 
              rules: c.rules.map(r => 
                r.id === editingRule.rule.id ? { ...r, ...newRule } : r
              )
            }
          : c
      )
      onCategoriesUpdate(updatedCategories)
      setEditingRule(null)
      setNewRule({ type: 'sender', operator: 'contains', value: '', enabled: true })
      setShowAddRule(false)
    }
  }

  const handleDeleteRule = (categoryId: string, ruleId: string) => {
    const updatedCategories = categories.map(c => 
      c.id === categoryId 
        ? { ...c, rules: c.rules.filter(r => r.id !== ruleId) }
        : c
    )
    onCategoriesUpdate(updatedCategories)
  }

  const toggleRuleEnabled = (categoryId: string, ruleId: string) => {
    const updatedCategories = categories.map(c => 
      c.id === categoryId 
        ? { 
            ...c, 
            rules: c.rules.map(r => 
              r.id === ruleId ? { ...r, enabled: !r.enabled } : r
            )
          }
        : c
    )
    onCategoriesUpdate(updatedCategories)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Category & Rules Manager</h2>
            <p className="text-gray-600 mt-1">Create custom categories and rules for automatic email organization</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'rules', label: 'Rules', icon: Filter },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Email Categories</h3>
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
                          {!category.isDefault && (
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
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
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Emails:</span>
                          <span className="font-medium text-blue-600">{category.emailCount}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategoryForRule(category.id)
                          setShowAddRule(true)
                        }}
                        className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        + Add Rule
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Email Rules</h3>
              
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
                          onChange={() => toggleRuleEnabled(category.id, rule.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        
                        <select
                          value={rule.type}
                          disabled
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-gray-100"
                        >
                          {ruleTypes.map((type) => (
                            <option key={type.type} value={type.type}>{type.label}</option>
                          ))}
                        </select>

                        <select
                          value={rule.operator}
                          disabled
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-gray-100"
                        >
                          {operators.map((op) => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={rule.value}
                          disabled
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm bg-gray-100"
                        />

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditRule(category.id, rule)}
                            className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRule(category.id, rule.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        setSelectedCategoryForRule(category.id)
                        setShowAddRule(true)
                      }}
                      className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400"
                    >
                      + Add Rule to {category.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Rule Preview</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Smart Categorization Active</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your custom rules will automatically categorize incoming emails based on the criteria you've set up.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-1 rounded ${getColorClass(category.color).replace('bg-', 'bg-').replace('-500', '-100')}`}>
                        {React.createElement(getIconComponent(category.icon), { 
                          className: `w-4 h-4 ${getColorClass(category.color).replace('bg-', 'text-').replace('-500', '-600')}` 
                        })}
                      </div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {category.rules.length} rule{category.rules.length !== 1 ? 's' : ''} • {category.rules.filter(r => r.enabled).length} active
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {showAddCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
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
                  <div className="grid grid-cols-5 gap-2">
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

        {/* Add Rule Modal */}
        {showAddRule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingRule ? 'Edit Rule' : 'Add New Rule'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddRule(false)
                    setEditingRule(null)
                    setNewRule({ type: 'sender', operator: 'contains', value: '', enabled: true })
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rule Type</label>
                  <select
                    value={newRule.type}
                    onChange={(e) => setNewRule({ ...newRule, type: e.target.value as Rule['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {ruleTypes.map((type) => (
                      <option key={type.type} value={type.type}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operator</label>
                  <select
                    value={newRule.operator}
                    onChange={(e) => setNewRule({ ...newRule, operator: e.target.value as Rule['operator'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input
                    type="text"
                    value={newRule.value}
                    onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter rule value"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newRule.enabled}
                    onChange={(e) => setNewRule({ ...newRule, enabled: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">Enable this rule</label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    if (selectedCategoryForRule) {
                      if (editingRule) {
                        handleUpdateRule()
                      } else {
                        handleAddRule(selectedCategoryForRule)
                      }
                    }
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingRule ? 'Update' : 'Create'}</span>
                </button>
                <button
                  onClick={() => {
                    setShowAddRule(false)
                    setEditingRule(null)
                    setNewRule({ type: 'sender', operator: 'contains', value: '', enabled: true })
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
