'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Dashboard from '@/components/Dashboard'
import ProductManagement from '@/components/ProductManagement'
import ImageManagement from '@/components/ImageManagement'
import ContentManagement from '@/components/ContentManagement'
import Settings from '@/components/Settings'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'products' && <ProductManagement />}
              {activeTab === 'images' && <ImageManagement />}
              {activeTab === 'content' && <ContentManagement />}
              {activeTab === 'settings' && <Settings />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple authentication (in production, use proper auth)
    if (credentials.email === 'admin@sicsalts.com' && credentials.password === 'admin123') {
      localStorage.setItem('admin_token', 'dummy_token')
      onLogin()
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">SIC! SALTS</h2>
          <p className="text-lg text-gray-600 mt-2">Admin Panel</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="input-field mt-1"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="input-field mt-1"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Sign In
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Email: admin@sicsalts.com</p>
          <p>Password: admin123</p>
        </div>
      </motion.div>
    </div>
  )
}
