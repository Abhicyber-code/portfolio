'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Abhicyber-code', icon: '🔗' },
  { name: 'LinkedIn', url: 'www.linkedin.com/in/abhijeet-gitte-b18a15249', icon: '💼' },
  { name: 'Email', url: 'mailto:abhijeetgitte85@gmail.com', icon: '📧' },
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    const footerElement = document.querySelector('#footer')
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer id="footer" className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-t from-background to-background/50 border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-3 sm:mb-4">
                Abhijeet Gitte
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Full-Stack Developer passionate about creating innovative solutions 
                that make a difference. Always learning, always building.
              </p>
            </div>
            
            {/* Status Badge */}
            <motion.div
              className="flex items-center gap-3 p-3 glass rounded-lg w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-300 text-sm font-medium">
                Available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h4>
            <div className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-white">Let's Connect</h4>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-all duration-300 group text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="group-hover:underline">{link.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="glass p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-400 mb-3">
                Get notified about new projects
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-white/5 rounded text-xs sm:text-sm outline-none focus:ring-1 ring-primary min-w-0"
                />
                <motion.button
                  className="px-3 sm:px-4 py-2 bg-primary/20 text-primary rounded text-xs sm:text-sm hover:bg-primary/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="pt-6 sm:pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <p className="text-gray-500 text-xs sm:text-sm">
                © {currentYear} Abhijeet Gitte. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 glass rounded-full text-gray-400 hover:text-primary transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs sm:text-sm">Back to top</span>
              <motion.span
                className="text-lg"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Fun Easter Egg */}
        <motion.div
          className="absolute bottom-4 left-4 opacity-30"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 1, type: "spring", bounce: 0.6 }}
        >
          <div className="text-xs text-gray-600">
            Made with ❤️ and lots of ☕
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-10 right-20 w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-3 h-3 bg-secondary/30 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </div>
      </div>
    </footer>
  )
}
