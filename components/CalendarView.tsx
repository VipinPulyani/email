'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar as CalendarIcon,
  Clock,
  Target,
  Users,
  AlertCircle,
  CheckCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  BarChart3,
  Bell,
  Star,
  Mail,
  Zap,
  Brain,
  FileText,
  TrendingUp,
  Activity,
  Lightbulb,
  Settings,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  MessageSquare,
  Calendar as CalendarIcon2,
  User,
  Timer,
  Award,
  Target as TargetIcon,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  ExternalLink
} from 'lucide-react'

interface Email {
  id: string
  from: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  hasAttachment: boolean
  meetingTime?: string
  meetingType?: string
  deadline?: string
  eventType?: string
  isTimeSensitive?: boolean
}

interface CalendarViewProps {
  emails: Email[]
  onEmailSelect: (email: Email) => void
}

export default function CalendarView({ emails, onEmailSelect }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Get calendar events from emails
  const getCalendarEvents = () => {
    return emails.filter(email => email.meetingTime || email.eventType || email.deadline)
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toDateString()
    return getCalendarEvents().filter(event => {
      if (event.meetingTime) {
        return new Date(event.meetingTime).toDateString() === dateString
      }
      if (event.deadline) {
        return new Date(event.deadline).toDateString() === dateString
      }
      return false
    })
  }

  // Get today's events
  const todaysEvents = getEventsForDate(new Date())
  
  // Get this week's events
  const getWeekEvents = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return getCalendarEvents().filter(event => {
      const eventDate = event.meetingTime ? new Date(event.meetingTime) : 
                       event.deadline ? new Date(event.deadline) : null
      return eventDate && eventDate >= startOfWeek && eventDate <= endOfWeek
    })
  }

  const weekEvents = getWeekEvents()

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentDate(newDate)
  }

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Smart Calendar</h2>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'month' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3X3 className="w-4 h-4 mr-1 inline" />
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'week' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4 mr-1 inline" />
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'day' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CalendarIcon className="w-4 h-4 mr-1 inline" />
              Day
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => viewMode === 'month' ? navigateMonth('prev') : 
                         viewMode === 'week' ? navigateWeek('prev') : navigateDay('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900">
              {viewMode === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              {viewMode === 'week' && `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            
            <button
              onClick={() => viewMode === 'month' ? navigateMonth('next') : 
                         viewMode === 'week' ? navigateWeek('next') : navigateDay('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Today
          </button>
        </div>

        {/* Calendar Grid */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth()
              const isToday = day.toDateString() === new Date().toDateString()
              const isSelected = day.toDateString() === selectedDate.toDateString()
              const dayEvents = getEventsForDate(day)
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 min-h-[80px] border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                  } ${isToday ? 'bg-purple-100' : ''} ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${isToday ? 'text-purple-700' : ''}`}>
                      {day.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Events for this day */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="text-xs p-1 bg-purple-100 text-purple-700 rounded truncate"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEmailSelect(event)
                        }}
                      >
                        {event.meetingTime ? 
                          `${new Date(event.meetingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ${event.subject}` :
                          event.subject
                        }
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(currentDate)
              date.setDate(currentDate.getDate() - currentDate.getDay() + i)
              const dayEvents = getEventsForDate(date)
              
              return (
                <div key={i} className="border border-gray-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                  </div>
                  <div className="space-y-2">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="text-xs p-2 bg-purple-100 text-purple-700 rounded cursor-pointer hover:bg-purple-200"
                        onClick={() => onEmailSelect(event)}
                      >
                        {event.meetingTime && (
                          <div className="font-medium">
                            {new Date(event.meetingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        )}
                        <div className="truncate">{event.subject}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-900 mb-4">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            
            <div className="grid grid-cols-24 gap-1">
              {Array.from({ length: 24 }, (_, hour) => {
                const hourEvents = getEventsForDate(currentDate).filter(event => {
                  if (event.meetingTime) {
                    return new Date(event.meetingTime).getHours() === hour
                  }
                  return false
                })
                
                return (
                  <div key={hour} className="border border-gray-200 p-2 min-h-[60px]">
                    <div className="text-xs text-gray-500 mb-1">
                      {hour.toString().padStart(2, '0')}:00
                    </div>
                    {hourEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="text-xs p-1 bg-purple-100 text-purple-700 rounded cursor-pointer hover:bg-purple-200"
                        onClick={() => onEmailSelect(event)}
                      >
                        {event.subject}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Events */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
          </div>
          <div className="space-y-3">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => onEmailSelect(event)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-900">
                      {event.meetingTime && new Date(event.meetingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    {event.meetingType && (
                      <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded">
                        {event.meetingType}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-blue-800">{event.subject}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                No events scheduled for today
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
          </div>
          <div className="space-y-3">
            {emails.filter(e => e.deadline && new Date(e.deadline) >= new Date()).slice(0, 3).map((email, index) => (
              <div
                key={index}
                className="p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => onEmailSelect(email)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-orange-900">
                    {email.deadline && new Date(email.deadline).toLocaleDateString()}
                  </span>
                  {email.isTimeSensitive && (
                    <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded">
                      Urgent
                    </span>
                  )}
                </div>
                <div className="text-sm text-orange-800">{email.subject}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Analytics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Calendar Analytics</h3>
          </div>
          <div className="space-y-4">
            {/* Weekly Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{weekEvents.length}</div>
                <div className="text-sm text-blue-700">This Week</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {emails.filter(e => e.meetingTime).length}
                </div>
                <div className="text-sm text-purple-700">Meetings</div>
              </div>
            </div>
            
            {/* Detailed Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Deadlines</span>
                <span className="text-sm font-medium text-gray-900">
                  {emails.filter(e => e.deadline).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Events</span>
                <span className="text-sm font-medium text-gray-900">
                  {emails.filter(e => e.eventType).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time-Sensitive</span>
                <span className="text-sm font-medium text-gray-900">
                  {emails.filter(e => e.isTimeSensitive).length}
                </span>
              </div>
            </div>
            
            {/* Productivity Insights */}
            <div className="border-t pt-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Productivity Insights</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    {Math.round((emails.filter(e => e.meetingTime).length / Math.max(weekEvents.length, 1)) * 100)}% meetings scheduled
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">
                    {emails.filter(e => e.deadline && new Date(e.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length} deadlines this week
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Meeting Analytics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Smart Meeting Analytics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">4.2/5</div>
            <div className="text-sm text-purple-700">Meeting Effectiveness</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-blue-700">Attendance Rate</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">32min</div>
            <div className="text-sm text-green-700">Avg Duration</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-orange-700">This Week</div>
          </div>
        </div>

        {/* Meeting Insights */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Most Productive Time: 10-11 AM</span>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">+15% efficiency</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Back-to-back meetings detected</span>
            </div>
            <button className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors">
              Optimize
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Meeting frequency increased 23% this month</span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Trending</span>
          </div>
        </div>
      </div>

      {/* AI Meeting Assistant */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-600" />
          <h3 className="font-semibold text-gray-900">AI Meeting Assistant</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Auto-Generated Summaries */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-900">Meeting Summaries</span>
            </div>
            <p className="text-sm text-yellow-700 mb-3">AI automatically generates meeting notes and action items</p>
            <div className="space-y-2">
              <div className="text-xs bg-yellow-100 text-yellow-800 p-2 rounded">
                <strong>Q4 Planning:</strong> Budget approved, timeline set for Q1 launch
              </div>
              <div className="text-xs bg-yellow-100 text-yellow-800 p-2 rounded">
                <strong>Client Check-in:</strong> 3 action items identified, follow-up scheduled
              </div>
              <div className="text-xs bg-yellow-100 text-yellow-800 p-2 rounded">
                <strong>Board Meeting:</strong> Strategic initiatives approved, next review in 30 days
              </div>
            </div>
          </div>

          {/* Smart Agenda Generation */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <List className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Smart Agendas</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">Auto-generate meeting agendas based on context</p>
            <div className="space-y-2">
              <div className="text-xs bg-blue-100 text-blue-800 p-2 rounded">
                <strong>Board Meeting:</strong> Financial review, strategic planning, Q&A
              </div>
              <div className="text-xs bg-blue-100 text-blue-800 p-2 rounded">
                <strong>Sprint Retro:</strong> What went well, improvements, next sprint goals
              </div>
              <div className="text-xs bg-blue-100 text-blue-800 p-2 rounded">
                <strong>Client Check-in:</strong> Progress update, challenges, next steps
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-purple-900">AI Suggestions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Move 2PM meeting to 3PM for better focus time</span>
              <button className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200">
                Apply
              </button>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Add 15min buffer before client meeting</span>
              <button className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Integration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Email Integration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarIcon2 className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-indigo-900">Email-to-Calendar</span>
            </div>
            <p className="text-sm text-indigo-700 mb-3">Convert meeting emails to calendar events</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs bg-indigo-100 text-indigo-800 p-2 rounded">
                <span>Board Meeting - Tomorrow 2PM</span>
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors">Add</button>
              </div>
              <div className="flex items-center justify-between text-xs bg-indigo-100 text-indigo-800 p-2 rounded">
                <span>Client Check-in - Friday 3PM</span>
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors">Add</button>
              </div>
              <div className="flex items-center justify-between text-xs bg-indigo-100 text-indigo-800 p-2 rounded">
                <span>Team Building - Next Monday 10AM</span>
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors">Add</button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-900">Attendee Insights</span>
            </div>
            <p className="text-sm text-green-700 mb-3">Track meeting participation and engagement</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Sarah Chen</span>
                <span className="text-green-600 font-medium">95% attendance</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>John Smith</span>
                <span className="text-green-600 font-medium">87% attendance</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Lisa Wang</span>
                <span className="text-orange-600 font-medium">72% attendance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Management & Project Tracking */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TargetIcon className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Task Management & Project Tracking</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Management */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-gray-900">Linked Tasks</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-emerald-900">Prepare Q4 presentation</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">High</span>
                </div>
                <div className="text-xs text-emerald-700">Due: Tomorrow 2PM • Board Meeting</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-full bg-emerald-200 rounded-full h-1">
                    <div className="bg-emerald-500 h-1 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-xs text-emerald-600">75%</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-blue-900">Review contract terms</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Urgent</span>
                </div>
                <div className="text-xs text-blue-700">Due: Friday 5PM • Legal Review</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-full bg-blue-200 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <span className="text-xs text-blue-600">40%</span>
                </div>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-orange-900">Budget allocation review</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Medium</span>
                </div>
                <div className="text-xs text-orange-700">Due: Next Monday • Finance Meeting</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-full bg-orange-200 rounded-full h-1">
                    <div className="bg-orange-500 h-1 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <span className="text-xs text-orange-600">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Milestones */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-900">Project Milestones</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-900">Q4 Product Launch</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">On Track</span>
                </div>
                <div className="text-xs text-purple-700 mb-2">Launch Date: March 15, 2024</div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="text-xs text-purple-600">65%</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-purple-600">
                  <span>✓ Planning Complete</span>
                  <span>✓ Development 80%</span>
                  <span>⏳ Testing Phase</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Client Onboarding</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">In Progress</span>
                </div>
                <div className="text-xs text-blue-700 mb-2">Target: February 28, 2024</div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-xs text-blue-600">45%</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600">
                  <span>✓ Contract Signed</span>
                  <span>✓ Kickoff Meeting</span>
                  <span>⏳ Implementation</span>
                </div>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900">Team Expansion</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Planning</span>
                </div>
                <div className="text-xs text-orange-700 mb-2">Target: Q2 2024</div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  <span className="text-xs text-orange-600">25%</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-orange-600">
                  <span>✓ Budget Approved</span>
                  <span>⏳ Job Postings</span>
                  <span>⏳ Interviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up Automation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-gray-900">Follow-up Automation</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-cyan-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              <span className="font-medium text-cyan-900">Auto Follow-ups</span>
            </div>
            <p className="text-sm text-cyan-700 mb-3">Automatically send follow-up emails after meetings</p>
            <div className="space-y-2">
              <div className="text-xs bg-cyan-100 text-cyan-800 p-2 rounded">
                <strong>Board Meeting:</strong> Summary sent to all attendees
              </div>
              <div className="text-xs bg-cyan-100 text-cyan-800 p-2 rounded">
                <strong>Client Check-in:</strong> Action items shared with team
              </div>
            </div>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Timer className="w-4 h-4 text-pink-600" />
              <span className="font-medium text-pink-900">Reminder System</span>
            </div>
            <p className="text-sm text-pink-700 mb-3">Smart reminders for upcoming deadlines</p>
            <div className="space-y-2">
              <div className="text-xs bg-pink-100 text-pink-800 p-2 rounded">
                <strong>Contract Review:</strong> Reminder set for 2 hours before
              </div>
              <div className="text-xs bg-pink-100 text-pink-800 p-2 rounded">
                <strong>Budget Submission:</strong> Daily reminders until deadline
              </div>
            </div>
          </div>

          <div className="p-4 bg-teal-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <span className="font-medium text-teal-900">Action Items</span>
            </div>
            <p className="text-sm text-teal-700 mb-3">Track and manage post-meeting tasks</p>
            <div className="space-y-2">
              <div className="text-xs bg-teal-100 text-teal-800 p-2 rounded">
                <strong>3 pending:</strong> Review financial reports
              </div>
              <div className="text-xs bg-teal-100 text-teal-800 p-2 rounded">
                <strong>2 completed:</strong> Schedule follow-up meetings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
