'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, Save, Edit } from 'lucide-react'

export default function ContentManagement() {
  const [content, setContent] = useState({
    heroTitle: 'Discover LUNIQ VAPE',
    heroSubtitle: 'and enter the world of intense sensations.',
    heroDescription: 'Our premium vape products are distinguished by the highest quality and carefully selected flavors that provide an unforgettable taste experience.',
    aboutTitle: 'About LUNIQ VAPE',
    aboutDescription: 'We are passionate about creating the finest vaping experiences with our premium vape formulations.',
    contactEmail: 'info@luniqvape.com',
    contactPhone: '+1 (555) 123-4567'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: FileText },
    { id: 'about', name: 'About Us', icon: FileText },
    { id: 'contact', name: 'Contact Info', icon: FileText }
  ]

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving content:', content)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
          <p className="text-gray-600">Edit website content and text</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Edit Content</span>
            </motion.button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 5 }}
                    className={`sidebar-item w-full text-left ${
                      activeSection === section.id ? 'active' : 'text-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{section.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {activeSection === 'hero' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={content.heroTitle}
                    onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="input-field h-24 resize-none"
                    value={content.heroDescription}
                    onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}

            {activeSection === 'about' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Title
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={content.aboutTitle}
                    onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Description
                  </label>
                  <textarea
                    className="input-field h-32 resize-none"
                    value={content.aboutDescription}
                    onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    value={content.contactEmail}
                    onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    value={content.contactPhone}
                    onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
