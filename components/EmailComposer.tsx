'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  X, 
  Paperclip, 
  Bold, 
  Italic, 
  Underline,
  Link,
  Smile,
  Image,
  FileText,
  Calendar,
  Clock,
  Star,
  Archive,
  Trash2
} from 'lucide-react'

interface ComposeData {
  to: string
  cc: string
  bcc: string
  subject: string
  body: string
  attachments: string[]
}

interface EmailComposerProps {
  isOpen: boolean
  onClose: () => void
  replyTo?: {
    from: string
    subject: string
    body: string
  } | null
  onSend: (data: ComposeData) => void
}

export default function EmailComposer({ isOpen, onClose, replyTo, onSend }: EmailComposerProps) {
  const [composeData, setComposeData] = useState<ComposeData>({
    to: replyTo?.from || '',
    cc: '',
    bcc: '',
    subject: replyTo?.subject.startsWith('Re:') ? replyTo.subject : `Re: ${replyTo?.subject || ''}`,
    body: replyTo ? `\n\n---\nOn ${new Date().toLocaleString()}, ${replyTo.from} wrote:\n${replyTo.body}` : '',
    attachments: []
  })

  const [showCC, setShowCC] = useState(false)
  const [showBCC, setShowBCC] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleSend = () => {
    onSend(composeData)
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      attachments: []
    })
    onClose()
  }

  const handleAttachment = () => {
    // Simulate file attachment
    const newAttachment = `attachment-${Date.now()}.pdf`
    setComposeData({
      ...composeData,
      attachments: [...composeData.attachments, newAttachment]
    })
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 right-0 w-96 bg-white border border-gray-200 rounded-t-lg shadow-2xl z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {replyTo ? 'Reply' : 'Compose'}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="p-4 space-y-4"
        >
          {/* Recipients */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 w-8">To:</label>
              <input
                type="email"
                value={composeData.to}
                onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter recipient email"
              />
            </div>
            
            {showCC && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 w-8">CC:</label>
                <input
                  type="email"
                  value={composeData.cc}
                  onChange={(e) => setComposeData({...composeData, cc: e.target.value})}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter CC email"
                />
              </div>
            )}
            
            {showBCC && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 w-8">BCC:</label>
                <input
                  type="email"
                  value={composeData.bcc}
                  onChange={(e) => setComposeData({...composeData, bcc: e.target.value})}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter BCC email"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCC(!showCC)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {showCC ? 'Hide CC' : 'Add CC'}
              </button>
              <button
                onClick={() => setShowBCC(!showBCC)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {showBCC ? 'Hide BCC' : 'Add BCC'}
              </button>
            </div>
          </div>

          {/* Subject */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 w-8">Subject:</label>
            <input
              type="text"
              value={composeData.subject}
              onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter subject"
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Bold className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Italic className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Underline className="w-4 h-4 text-gray-600" />
            </button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Link className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Image className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Smile className="w-4 h-4 text-gray-600" />
            </button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button onClick={handleAttachment} className="p-1 hover:bg-gray-100 rounded">
              <Paperclip className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <FileText className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Attachments */}
          {composeData.attachments.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Attachments:</label>
              {composeData.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-600">{attachment}</span>
                  <button
                    onClick={() => setComposeData({
                      ...composeData,
                      attachments: composeData.attachments.filter((_, i) => i !== index)
                    })}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Message Body */}
          <div>
            <textarea
              value={composeData.body}
              onChange={(e) => setComposeData({...composeData, body: e.target.value})}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
              placeholder="Type your message here..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Star className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Archive className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center"
              >
                <Send className="w-4 h-4 mr-1" />
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
