'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'About', href: '#about', icon: '👨‍💻' },
  { name: 'Skills', href: '#skills', icon: '⚡' },
  { name: 'Projects', href: '#projects', icon: '🚀' },
  { name: 'Contact', href: '#contact', icon: '📬' }
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 safe-area-top ${
          isScrolled 
            ? 'glass-strong backdrop-blur-xl py-2 sm:py-3 shadow-2xl border-b border-white/10' 
            : 'bg-transparent py-3 sm:py-4 lg:py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container-premium">
          <div className="flex justify-between items-center h-16 sm:h-auto">
            {/* Logo/Brand with responsive sizing */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bold gradient-text cursor-pointer focus-premium touch-target"
              style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
              onClick={() => handleNavClick('#hero')}
            >
              <span className="hidden sm:inline">Abhijeet Gitte</span>
              <span className="sm:hidden">AG</span>
            </motion.button>

            {/* Desktop Menu with enhanced responsive design */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3 lg:px-5 py-2 lg:py-3 rounded-full transition-all duration-300 font-medium touch-target ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary bg-primary/10 border border-primary/20 shadow-lg'
                      : 'text-gray-300 hover:text-primary hover:bg-white/5 hover:scale-105'
                  }`}
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="hidden lg:inline mr-2 text-lg">{item.icon}</span>
                  {item.name}
                  
                  {/* Enhanced active indicator */}
                  {activeSection === item.href.slice(1) && (
                    <>
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                    </>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Enhanced Mobile menu button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-primary transition-all duration-300 rounded-xl hover:bg-white/5 focus-premium touch-target"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <motion.div
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -4
                  }}
                  className="w-5 h-0.5 bg-current absolute rounded-full"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="w-5 h-0.5 bg-current absolute rounded-full"
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 4
                  }}
                  className="w-5 h-0.5 bg-current absolute rounded-full"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 z-40 md:hidden safe-area-top safe-area-bottom ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Enhanced backdrop with blur */}
        <motion.div 
          className="absolute inset-0 bg-black/70 backdrop-blur-lg"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Premium Menu Panel */}
        <motion.div
          className="absolute top-0 right-0 h-full w-full max-w-sm glass-strong backdrop-blur-2xl border-l border-white/10 overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <motion.div 
              className="font-bold gradient-text text-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              Navigation
            </motion.div>
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-primary transition-colors rounded-xl hover:bg-white/5 touch-target"
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                scale: isMenuOpen ? 1 : 0.8 
              }}
              transition={{ delay: 0.3 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </div>

          {/* Navigation Items */}
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 touch-target ${
                  activeSection === item.href.slice(1)
                    ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 shadow-lg'
                    : 'text-gray-300 hover:text-primary hover:bg-white/5 hover:scale-[1.02]'
                }`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : 50 
                }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <span className="text-lg font-medium">{item.name}</span>
                  {activeSection === item.href.slice(1) && (
                    <div className="text-xs text-primary/70 mt-1">Current Section</div>
                  )}
                </div>
                {activeSection === item.href.slice(1) && (
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    layoutId="mobileActiveIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Enhanced social links section */}
          <motion.div
            className="absolute bottom-8 left-6 right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0, 
              y: isMenuOpen ? 0 : 20 
            }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass-morph rounded-2xl p-6">
              <div className="text-gray-400 text-sm mb-4 font-medium">Connect with me</div>
              <div className="grid grid-cols-3 gap-3">
                {['GitHub', 'LinkedIn', 'Twitter'].map((platform, index) => (
                  <motion.a
                    key={platform}
                    href={`#${platform.toLowerCase()}`}
                    className="aspect-square glass-morph rounded-xl flex items-center justify-center text-gray-300 hover:text-primary transition-all duration-300 hover:scale-105 touch-target"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0,
                      scale: isMenuOpen ? 1 : 0.8 
                    }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    <span className="text-sm font-bold">
                      {platform === 'GitHub' ? 'GH' : platform === 'LinkedIn' ? 'LI' : 'TW'}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-32 right-4 w-16 h-16 border border-primary/10 rounded-full animate-breathe" />
          <div className="absolute bottom-32 left-4 w-12 h-12 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg animate-float" />
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary z-50 origin-left"
        style={{
          scaleX: useScroll().scrollYProgress
        }}
      />
    </>
  )
}
   
