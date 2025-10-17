'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Package, 
  Image, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'images', name: 'Images', icon: Image },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.reload()
  }

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white shadow-lg min-h-screen"
    >
      <div className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">SIC! SALTS</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                whileHover={{ x: 5 }}
                className={`sidebar-item w-full text-left ${
                  activeTab === item.id ? 'active' : 'text-gray-700'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </motion.button>
            )
          })}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 5 }}
            className="sidebar-item w-full text-left text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  )
}
