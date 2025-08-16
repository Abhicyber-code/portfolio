'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system'
    setTheme(savedTheme)
    
    const updateResolvedTheme = (currentTheme: 'light' | 'dark' | 'system') => {
      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        setResolvedTheme(systemTheme)
      } else {
        setResolvedTheme(currentTheme)
      }
    }

    updateResolvedTheme(savedTheme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  useEffect(() => {
    if (mounted) {
      // Apply theme to document
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(resolvedTheme)
      document.documentElement.setAttribute('data-theme', resolvedTheme)
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#0f172a' : '#ffffff')
      }
    }
  }, [resolvedTheme, mounted])

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  if (!mounted) {
    return <div className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gray-300 animate-pulse z-50" />
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="text-2xl"
          >
            ☀️
          </motion.div>
        )
      case 'dark':
        return (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="text-2xl"
          >
            🌙
          </motion.div>
        )
      case 'system':
        return (
          <motion.div
            key="system"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="text-2xl"
          >
            💻
          </motion.div>
        )
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode'
      case 'dark':
        return 'Dark Mode'
      case 'system':
        return `Auto (${resolvedTheme})`
    }
  }

  return (
    <motion.div className="fixed bottom-6 right-6 z-50 group">
      {/* Main toggle button */}
      <motion.button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-12 h-12 glass hover:glass-hover rounded-full transition-all duration-300 border border-white/10 hover:border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={`Current: ${getThemeLabel()}. Click to switch.`}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {getIcon()}
          </AnimatePresence>
        </div>

        {/* Active theme indicator ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          animate={{
            borderColor: theme === 'light' 
              ? '#fbbf24' 
              : theme === 'dark' 
                ? '#60a5fa' 
                : '#6b7280',
            rotate: [0, 360],
          }}
          transition={{
            borderColor: { duration: 0.3 },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />
      </motion.button>

      {/* Floating label */}
      <motion.div
        className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {getThemeLabel()}
        <motion.div 
          className="absolute top-full right-4 border-4 border-transparent border-t-black/90"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        />
      </motion.div>

      {/* Theme options hint (appears on hover) */}
      <motion.div
        className="absolute bottom-full right-0 mb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <div className="flex flex-col gap-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg text-white text-xs">
          <div className="font-medium mb-1">Theme Options:</div>
          <div className={`flex items-center gap-2 ${theme === 'light' ? 'text-yellow-400' : 'text-gray-400'}`}>
            <span>☀️</span> Light Mode
          </div>
          <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`}>
            <span>🌙</span> Dark Mode
          </div>
          <div className={`flex items-center gap-2 ${theme === 'system' ? 'text-green-400' : 'text-gray-400'}`}>
            <span>💻</span> System Auto
          </div>
        </div>
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/50 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.5, 2], 
          opacity: [0, 0.5, 0] 
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeOut"
        }}
      />
    </motion.div>
  )
}
