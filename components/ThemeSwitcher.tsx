'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Theme = 'dark' | 'light' | 'cyberpunk' | 'minimal'

const themes = {
  dark: {
    name: 'Dark',
    icon: '🌙',
    colors: {
      primary: 'rgb(59, 130, 246)',
      secondary: 'rgb(168, 85, 247)',
      background: 'rgb(9, 9, 11)',
      surface: 'rgb(24, 24, 27)'
    }
  },
  light: {
    name: 'Light',
    icon: '☀️',
    colors: {
      primary: 'rgb(37, 99, 235)',
      secondary: 'rgb(147, 51, 234)',
      background: 'rgb(255, 255, 255)',
      surface: 'rgb(248, 250, 252)'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    icon: '🎮',
    colors: {
      primary: 'rgb(255, 20, 147)',
      secondary: 'rgb(0, 255, 255)',
      background: 'rgb(10, 10, 20)',
      surface: 'rgb(20, 20, 40)'
    }
  },
  minimal: {
    name: 'Minimal',
    icon: '🎨',
    colors: {
      primary: 'rgb(75, 85, 99)',
      secondary: 'rgb(107, 114, 128)',
      background: 'rgb(249, 250, 251)',
      surface: 'rgb(255, 255, 255)'
    }
  }
}

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    const colors = themes[theme].colors
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-surface', colors.surface)
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme)
  }

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-24 right-6 z-50">
      <motion.div className="relative">
        {/* Theme Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-xl hover:border-primary/50 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Theme Switcher"
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {themes[currentTheme].icon}
          </motion.span>
        </motion.button>

        {/* Theme Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute top-16 right-0 w-48 bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-300 px-3 py-2 border-b border-gray-700/50">
                  Choose Theme
                </h3>
                <div className="mt-2 space-y-1">
                  {Object.entries(themes).map(([key, theme]) => (
                    <motion.button
                      key={key}
                      onClick={() => handleThemeChange(key as Theme)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                        currentTheme === key
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg">{theme.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{theme.name}</div>
                        <div className="flex gap-1 mt-1">
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-600/50"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-600/50"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                        </div>
                      </div>
                      {currentTheme === key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-primary text-sm"
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Theme Preview */}
              <div className="border-t border-gray-700/50 p-3">
                <div className="text-xs text-gray-400 mb-2">Preview</div>
                <div 
                  className="h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                  style={{ 
                    background: `linear-gradient(45deg, ${themes[currentTheme].colors.primary}, ${themes[currentTheme].colors.secondary})`,
                    color: 'white'
                  }}
                >
                  {themes[currentTheme].name} Theme
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close */}
        {isOpen && (
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </motion.div>
    </div>
  )
}
