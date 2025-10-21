'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CategoryManager from './CategoryManager'
import {
  Settings,
  Tag,
  Filter,
  Bell,
  Shield,
  Palette,
  Keyboard,
  Database,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

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

interface Rule {
  id: string
  type: 'sender' | 'subject' | 'content' | 'time' | 'priority' | 'attachment'
  operator: 'contains' | 'equals' | 'starts_with' | 'ends_with' | 'regex' | 'is_empty' | 'is_not_empty'
  value: string
  enabled: boolean
}

interface SettingsPageProps {
  customCategories: CustomCategory[]
  onCategoriesUpdate: (categories: CustomCategory[]) => void
}

export default function SettingsPage({ customCategories, onCategoriesUpdate }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState<'categories' | 'notifications' | 'appearance' | 'data' | 'advanced'>('categories')
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    soundEnabled: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  })
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    compactMode: false,
    showPreview: true,
    fontSize: 'medium'
  })
  const [dataSettings, setDataSettings] = useState({
    autoArchive: true,
    archiveAfterDays: 30,
    autoDelete: false,
    deleteAfterDays: 90
  })

  const sections = [
    { id: 'categories', name: 'Categories & Rules', icon: Tag, description: 'Manage email categories and filtering rules' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Configure email and system notifications' },
    { id: 'appearance', name: 'Appearance', icon: Palette, description: 'Customize the interface and display options' },
    { id: 'data', name: 'Data & Privacy', icon: Database, description: 'Manage data retention and privacy settings' },
    { id: 'advanced', name: 'Advanced', icon: Settings, description: 'Advanced configuration and system settings' }
  ]

  const handleExportData = () => {
    const data = {
      categories: customCategories,
      settings: {
        notifications: notificationSettings,
        appearance: appearanceSettings,
        data: dataSettings
      },
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-superhuman-settings-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.categories) {
          onCategoriesUpdate(data.categories)
        }
        if (data.settings) {
          if (data.settings.notifications) {
            setNotificationSettings(data.settings.notifications)
          }
          if (data.settings.appearance) {
            setAppearanceSettings(data.settings.appearance)
          }
          if (data.settings.data) {
            setDataSettings(data.settings.data)
          }
        }
        alert('Settings imported successfully!')
      } catch (error) {
        alert('Error importing settings. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      onCategoriesUpdate([])
      setNotificationSettings({
        emailNotifications: true,
        desktopNotifications: true,
        soundEnabled: true,
        quietHours: false,
        quietStart: '22:00',
        quietEnd: '08:00'
      })
      setAppearanceSettings({
        theme: 'light',
        compactMode: false,
        showPreview: true,
        fontSize: 'medium'
      })
      setDataSettings({
        autoArchive: true,
        archiveAfterDays: 30,
        autoDelete: false,
        deleteAfterDays: 90
      })
      alert('Settings have been reset to default values.')
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Customize your email experience and manage your preferences</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Settings</span>
          </button>
          <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import Settings</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-start space-x-3 p-4 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-900'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{section.name}</div>
                    <div className="text-sm text-gray-500">{section.description}</div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            {/* Categories & Rules Section */}
            {activeSection === 'categories' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Categories & Rules</h2>
                    <p className="text-gray-600 mt-1">Create custom categories and set up automatic email organization rules</p>
                  </div>
                  <button
                    onClick={() => setShowCategoryManager(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                    <span>Manage Categories</span>
                  </button>
                </div>

                {/* Categories Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customCategories.map((category) => (
                    <div key={category.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          category.color === 'purple' ? 'bg-purple-100' :
                          category.color === 'green' ? 'bg-green-100' :
                          category.color === 'blue' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          <Tag className={`w-4 h-4 ${
                            category.color === 'purple' ? 'text-purple-600' :
                            category.color === 'green' ? 'text-green-600' :
                            category.color === 'blue' ? 'text-blue-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Rules:</span>
                          <span className="font-medium">{category.rules.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Emails:</span>
                          <span className="font-medium">{category.emailCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Active Rules:</span>
                          <span className="font-medium text-green-600">
                            {category.rules.filter(r => r.enabled).length}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {customCategories.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Custom Categories</h3>
                      <p className="text-gray-600 mb-4">Create your first custom category to start organizing emails automatically</p>
                      <button
                        onClick={() => setShowCategoryManager(true)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Create Category
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
                  <p className="text-gray-600 mt-1">Configure how and when you receive notifications</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Email Notifications</div>
                          <div className="text-sm text-gray-600">Receive notifications for new emails</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Desktop Notifications</div>
                          <div className="text-sm text-gray-600">Show desktop notifications for important emails</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.desktopNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, desktopNotifications: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Sound Notifications</div>
                          <div className="text-sm text-gray-600">Play sound for new email notifications</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.soundEnabled}
                          onChange={(e) => setNotificationSettings({...notificationSettings, soundEnabled: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Quiet Hours</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Enable Quiet Hours</div>
                          <div className="text-sm text-gray-600">Pause notifications during specified hours</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.quietHours}
                          onChange={(e) => setNotificationSettings({...notificationSettings, quietHours: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      
                      {notificationSettings.quietHours && (
                        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                            <input
                              type="time"
                              value={notificationSettings.quietStart}
                              onChange={(e) => setNotificationSettings({...notificationSettings, quietStart: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                            <input
                              type="time"
                              value={notificationSettings.quietEnd}
                              onChange={(e) => setNotificationSettings({...notificationSettings, quietEnd: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Section */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Appearance Settings</h2>
                  <p className="text-gray-600 mt-1">Customize the look and feel of your email interface</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['light', 'dark', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setAppearanceSettings({...appearanceSettings, theme: theme as any})}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            appearanceSettings.theme === theme
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-medium capitalize">{theme}</div>
                            <div className="text-sm text-gray-600">
                              {theme === 'auto' ? 'Follow system' : `${theme} mode`}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Display Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Compact Mode</div>
                          <div className="text-sm text-gray-600">Show more emails in less space</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={appearanceSettings.compactMode}
                          onChange={(e) => setAppearanceSettings({...appearanceSettings, compactMode: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Show Email Preview</div>
                          <div className="text-sm text-gray-600">Display email content preview in the list</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={appearanceSettings.showPreview}
                          onChange={(e) => setAppearanceSettings({...appearanceSettings, showPreview: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Font Size</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAppearanceSettings({...appearanceSettings, fontSize: size as any})}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            appearanceSettings.fontSize === size
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-medium capitalize">{size}</div>
                            <div className="text-sm text-gray-600">
                              {size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Privacy Section */}
            {activeSection === 'data' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Data & Privacy</h2>
                  <p className="text-gray-600 mt-1">Manage your data retention and privacy settings</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Data Retention</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Auto Archive Emails</div>
                          <div className="text-sm text-gray-600">Automatically archive old emails</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dataSettings.autoArchive}
                          onChange={(e) => setDataSettings({...dataSettings, autoArchive: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      
                      {dataSettings.autoArchive && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Archive After (Days)</label>
                          <input
                            type="number"
                            value={dataSettings.archiveAfterDays}
                            onChange={(e) => setDataSettings({...dataSettings, archiveAfterDays: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            max="365"
                          />
                        </div>
                      )}
                      
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Auto Delete Emails</div>
                          <div className="text-sm text-gray-600">Permanently delete very old emails</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dataSettings.autoDelete}
                          onChange={(e) => setDataSettings({...dataSettings, autoDelete: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      
                      {dataSettings.autoDelete && (
                        <div className="p-4 bg-red-50 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Delete After (Days)</label>
                          <input
                            type="number"
                            value={dataSettings.deleteAfterDays}
                            onChange={(e) => setDataSettings({...dataSettings, deleteAfterDays: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="30"
                            max="3650"
                          />
                          <p className="text-sm text-red-600 mt-2">⚠️ This action cannot be undone</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                        <Database className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium text-blue-900">Clear Cache</div>
                          <div className="text-sm text-blue-700">Remove temporary data</div>
                        </div>
                      </button>
                      
                      <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                        <RefreshCw className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium text-green-900">Sync Data</div>
                          <div className="text-sm text-green-700">Refresh email data</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Section */}
            {activeSection === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Advanced Settings</h2>
                  <p className="text-gray-600 mt-1">Advanced configuration and system settings</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">System</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Reset All Settings</div>
                            <div className="text-sm text-gray-600">Reset all settings to default values</div>
                          </div>
                          <button
                            onClick={handleResetSettings}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Data Export/Import</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={handleExportData}
                        className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        <Download className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium text-blue-900">Export Settings</div>
                          <div className="text-sm text-blue-700">Download your configuration</div>
                        </div>
                      </button>
                      
                      <label className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                        <Upload className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium text-green-900">Import Settings</div>
                          <div className="text-sm text-green-700">Upload configuration file</div>
                        </div>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportData}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Settings are automatically saved</span>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <CategoryManager
          categories={customCategories}
          onCategoriesUpdate={onCategoriesUpdate}
          onClose={() => setShowCategoryManager(false)}
        />
      )}
    </div>
  )
}
