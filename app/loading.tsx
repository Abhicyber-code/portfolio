'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loading() {
  const [loadingText, setLoadingText] = useState('Loading')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Loading...') return 'Loading'
        return prev + '.'
      })
    }, 500)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 10
      })
    }, 200)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const loadingSteps = [
    'Initializing portfolio...',
    'Loading components...',
    'Fetching data...',
    'Almost ready...'
  ]

  const currentStep = Math.floor((progress / 100) * loadingSteps.length)

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center space-y-8 z-10">
        {/* Main loading spinner with enhanced design */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="w-20 h-20 border-4 border-primary/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner ring */}
          <motion.div
            className="absolute inset-2 w-12 h-12 border-4 border-secondary rounded-full border-t-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 w-20 h-20 border-4 border-primary rounded-full blur-sm opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm">
          <div className="flex justify-between items-center mb-2">
            <motion.span 
              className="text-primary font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {loadingText}
            </motion.span>
            <span className="text-gray-400 text-sm">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 1,
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Loading steps */}
        <motion.div
          className="text-center space-y-2"
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-gray-300 text-sm">
            {loadingSteps[currentStep] || loadingSteps[0]}
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {loadingSteps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-600'
                }`}
                animate={{
                  scale: index === currentStep ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Brand name with typing effect */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold gradient-text">
            Abhijeet Gitte
          </h1>
          <p className="text-gray-400 text-sm mt-1">Full-Stack Developer</p>
        </motion.div>

        {/* Fun loading messages */}
        <motion.div
          className="text-xs text-gray-500 text-center max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          {progress < 30 && "🚀 Launching awesome experience..."}
          {progress >= 30 && progress < 60 && "⚡ Optimizing performance..."}
          {progress >= 60 && progress < 90 && "🎨 Adding final touches..."}
          {progress >= 90 && "✨ Ready to impress!"}
        </motion.div>

        {/* Skip button for impatient users */}
        <motion.button
          className="text-xs text-gray-500 hover:text-primary transition-colors mt-8 px-4 py-2 border border-gray-700/50 rounded-full hover:border-primary/50"
          onClick={() => window.location.reload()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Taking too long? Click to refresh
        </motion.button>
      </div>
    </div>
  )
}
    

  
