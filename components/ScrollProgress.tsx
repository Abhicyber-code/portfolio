'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const { scrollYProgress } = useScroll()
  
  // Enhanced spring animation with better physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  })

  // Dynamic opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  // Dynamic height for visual feedback
  const height = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [2, 3, 4, 3])

  // Color transition based on scroll position
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'linear-gradient(90deg, #0ea5e9, #06b6d4)',
      'linear-gradient(90deg, #06b6d4, #8b5cf6)',
      'linear-gradient(90deg, #8b5cf6, #ec4899)',
      'linear-gradient(90deg, #ec4899, #f59e0b)',
      'linear-gradient(90deg, #f59e0b, #ef4444)'
    ]
  )

  // Show/hide based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0.01 && latest < 0.99)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  )
}
