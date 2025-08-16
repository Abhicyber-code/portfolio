'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsExpanded(false)
    }
  }

  const quickActions = [
    { id: 'about', label: 'About', icon: '👋', color: 'from-blue-500 to-cyan-500' },
    { id: 'skills', label: 'Skills', icon: '⚡', color: 'from-purple-500 to-pink-500' },
    { id: 'projects', label: 'Projects', icon: '🚀', color: 'from-green-500 to-emerald-500' },
    { id: 'contact', label: 'Contact', icon: '📧', color: 'from-orange-500 to-red-500' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Quick Navigation Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="flex flex-col gap-2"
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    onClick={() => scrollToSection(action.id)}
                    className={`group relative w-12 h-12 bg-gradient-to-r ${action.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-lg">{action.icon}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 px-3 py-1 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {action.label}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Menu Toggle */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl text-white"
            >
              {isExpanded ? '✕' : '☰'}
            </motion.span>
          </motion.button>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-300 hover:text-white hover:border-primary/50"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.1 }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              ↑
            </motion.span>
          </motion.button>

          {/* Mobile Contact Quick Action */}
          <div className="sm:hidden">
            <motion.a
              href="tel:+919503428774"
              className="w-12 h-12 bg-green-500/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:bg-green-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-lg">📞</span>
            </motion.a>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
