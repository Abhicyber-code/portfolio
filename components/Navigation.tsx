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

      {/* Mobile Menu Overlay - Fixed Position */}
      <motion.div
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Menu Panel - Fixed and Well Designed */}
        <motion.div
          className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-xl shadow-2xl border-l border-primary/20 flex flex-col overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          tabIndex={0}
          aria-label="Mobile navigation menu"
        >
          {/* Exit Button */}
          <div className="absolute top-4 right-4 z-10">
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400/60"
              aria-label="Close menu"
              tabIndex={0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, scale: isMenuOpen ? 1 : 0.8 }}
              transition={{ delay: 0.3 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          </div>

          {/* User Profile Section */}
          <div className="flex flex-col items-center pt-12 pb-6 px-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-xl mb-4">
              <span className="text-4xl select-none">🧑‍💻</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Abhijeet Gitte</h3>
            <p className="text-gray-300 text-sm">Full Stack Developer</p>
          </div>

          {/* Menu Header - Clean without close button */}
          <div className="px-6 pb-4">
            <h2 className="font-bold gradient-text text-2xl tracking-wide text-center">Navigation</h2>
          </div>

          {/* Navigation Items - Better Spacing */}
          <nav className="flex-1 px-6 py-4 space-y-3" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-lg border border-primary/30 scale-105'
                    : 'text-white/90 hover:text-primary hover:bg-white/10 hover:scale-102'
                }`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 50 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 8 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="flex-1 text-left">{item.name}</span>
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    className="w-3 h-3 bg-primary rounded-full shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    layoutId="mobileActiveIndicator"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Social Media Section - Better Positioned */}
          <div className="px-6 pb-8">
            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-300 text-sm text-center mb-6 font-medium">Connect with me</p>
              <div className="flex justify-center gap-8">
                <motion.a
                  href="https://github.com/Abhicyber-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-4 rounded-full bg-white/10 hover:bg-primary/20 transition-all duration-300 text-gray-200 hover:text-primary shadow-lg hover:scale-110"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/abhijeet-gitte"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-4 rounded-full bg-white/10 hover:bg-primary/20 transition-all duration-300 text-gray-200 hover:text-primary shadow-lg hover:scale-110"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
                  transition={{ delay: 0.7 }}
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://twitter.com/abhicyber_code"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-4 rounded-full bg-white/10 hover:bg-primary/20 transition-all duration-300 text-gray-200 hover:text-primary shadow-lg hover:scale-110"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
                  transition={{ delay: 0.8 }}
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.39 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
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
   
