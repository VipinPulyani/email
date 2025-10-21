'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Zap, Users, Calendar, CheckCircle } from 'lucide-react'
import EmailInterface from '../../components/EmailInterface'

export default function DemoPage() {
  const [showInterface, setShowInterface] = useState(false)

  if (showInterface) {
    return (
      <div className="h-screen">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setShowInterface(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Demo</span>
          </button>
          <div className="flex items-center space-x-2">
            <Mail className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold text-gray-900">Email Superhuman Demo</span>
          </div>
        </div>
        <EmailInterface />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Experience the Future of
            <br />
            <span className="gradient-text">Email Productivity</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            See how Email Superhuman transforms your inbox into a productivity powerhouse. 
            Try our interactive demo and experience the difference.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => setShowInterface(true)}
            className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
          >
            Try Interactive Demo
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-purple-600 mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
            <p className="text-gray-600">
              Navigate your inbox with keyboard shortcuts and smart features that make email management effortless.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-purple-600 mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Team Collaboration</h3>
            <p className="text-gray-600">
              Work seamlessly with your team using shared inboxes, read receipts, and collaborative features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-purple-600 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Scheduling</h3>
            <p className="text-gray-600">
              Turn emails into calendar events instantly and find the perfect meeting times for your team.
            </p>
          </motion.div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
              Discover what makes Email Superhuman the most productive email app ever made
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Split Inbox</h3>
                  <p className="text-gray-600">
                    Automatically organize emails by team, VIPs, and tools to focus on what matters most.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow-up Reminders</h3>
                  <p className="text-gray-600">
                    Never drop the ball with intelligent follow-up reminders that keep you on track.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Assistant</h3>
                  <p className="text-gray-600">
                    Draft responses, organize your inbox, and execute workflows automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Insights</h3>
                  <p className="text-gray-600">
                    Get context about contacts from LinkedIn, Facebook, and X to build better relationships.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Read Receipts</h3>
                  <p className="text-gray-600">
                    See when emails are opened and track engagement with your team and contacts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Integration</h3>
                  <p className="text-gray-600">
                    Seamlessly create events from emails and find optimal meeting times for your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
