'use client'

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import ParticlesBackground from './ParticlesBackground'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Abhicyber-code', icon: '🔗' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abhijeet-gitte-b18a15249', icon: '💼' },

]

const highlights = [
  { label: 'Projects', value: '15+', icon: '🚀' },
  { label: 'DSA Problems', value: '100+', icon: '🎯' },
  { label: 'CGPA', value: '8.86', icon: '📚' },
]

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentRole, setCurrentRole] = useState(0)
  
  const roles = [
    'Full-Stack Developer',
    'Mobile App Developer', 
    'DSA Enthusiast',
    'AI Explorer',
    'Problem Solver'
  ]

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 600
      const y = (clientY / innerHeight - 0.5) * 600
      
      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Role rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
      <ParticlesBackground />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/30 via-background/50 to-background z-0" />
      
      {/* Floating geometric shapes - responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-16 sm:top-20 lg:top-32 left-4 sm:left-8 lg:left-20 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border border-primary/20 rounded-full"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 sm:bottom-24 lg:bottom-32 right-4 sm:right-8 lg:right-32 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 right-2 sm:right-4 lg:right-20 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 border-2 border-accent/20 rotate-45"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [45, 135, 225]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-premium relative z-10 px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl lg:max-w-6xl mx-auto flex flex-col justify-center min-h-[calc(100vh-8rem)]"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Main content */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Name with enhanced responsive typography */}
            <motion.h1 
              className="font-bold mb-4 lg:mb-6 relative"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="gradient-text relative z-10 drop-shadow-2xl leading-none block">
                Abhijeet Gitte
              </span>
              {/* Glowing background effect */}
              <span className="absolute inset-0 gradient-text blur-3xl opacity-30 animate-pulse leading-none">
                Abhijeet Gitte
              </span>
            </motion.h1>

            {/* Dynamic role with responsive typography */}
            <motion.div 
              className="mb-6 lg:mb-8"
              style={{ height: 'clamp(3rem, 6vw, 4rem)' }}
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={currentRole}
                  className="text-gray-300 font-semibold"
                  style={{ fontSize: 'clamp(1.25rem, 4vw, 2.5rem)' }}
                  initial={{ opacity: 0, y: 20, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: -45 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {roles[currentRole]}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-primary ml-2"
                  >
                    |
                  </motion.span>
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            {/* Enhanced description with fluid typography */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 max-w-2xl lg:max-w-4xl mx-auto mb-8 lg:mb-12 leading-relaxed px-4 sm:px-6"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.375rem)' }}
            >
              Passionate about crafting{' '}
              <span className="text-primary font-semibold">scalable applications</span> across 
              mobile and web platforms while exploring the cutting-edge frontiers of{' '}
              <span className="text-secondary font-semibold">AI and Machine Learning</span>
            </motion.p>

            {/* Enhanced stats grid with better animations */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-8 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto mb-8 lg:mb-12 px-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="relative group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 text-center hover:border-primary/50 transition-all duration-300 min-h-[100px] sm:min-h-[120px] flex flex-col justify-center"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                  }}
                  initial={{ opacity: 0, y: 20, rotateX: 30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.2,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="relative z-10">
                    <motion.div 
                      className="text-2xl sm:text-3xl lg:text-4xl mb-2"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {item.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced responsive CTA buttons with better styling */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 lg:mb-12 px-4 max-w-lg mx-auto"
            >
              <motion.a
                href="#contact"
                className="relative group bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-8 rounded-full text-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Let's Connect
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
              <motion.a
                href="#projects"
                className="relative group border-2 border-gray-600 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-full text-center overflow-hidden backdrop-blur-sm transition-all duration-300 min-w-[200px]"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  borderColor: "rgb(14, 165, 233)",
                  backgroundColor: "rgba(14, 165, 233, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    🚀
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>

            {/* Enhanced social links with better styling */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <span className="relative z-10 text-xl">{link.icon}</span>
                  <span className="relative z-10 font-medium text-sm sm:text-base">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        animate={{ 
          y: [0, 10, 0],
          opacity: 1 
        }}
        transition={{ 
          y: { duration: 2, repeat: Infinity },
          opacity: { delay: 2, duration: 0.5 }
        }}
        initial={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-2">

          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
