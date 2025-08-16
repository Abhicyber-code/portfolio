'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const contactMethods = [
  {
    name: 'Email',
    value: 'abhijeetgitte85@gmail.com',
    href: 'mailto:abhijeetgitte85@gmail.com',
    icon: '📧',
    description: 'Drop me a line anytime'
  },
  {
    name: 'Phone',
    value: '+91 9503428774',
    href: 'tel:+919503428774',
    icon: '📱',
    description: 'Call for immediate response'
  },
  {
    name: 'Location',
    value: 'Pune, India',
    href: '#',
    icon: '📍',
    description: 'Available for local meetups'
  }
]

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Abhicyber-code', icon: '🔗', color: 'hover:text-gray-400' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abhijeet-gitte-b18a15249', icon: '💼', color: 'hover:text-blue-400' },
  { name: 'Discord', url: 'https://discord.com/users/youruserid', icon: '🎮', color: 'hover:text-indigo-400' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    message: '' 
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid email' : ''
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : ''
      default:
        return ''
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Real-time validation
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const isFormValid = formData.name && 
                     formData.email && 
                     formData.message && 
                     !Object.values(errors).some(error => error !== '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([field, value]) => {
      if (field !== 'subject') { // subject is optional
        const error = validateField(field, value)
        if (error) newErrors[field] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setStatus('sending')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would integrate with your email service
      console.log('Form submitted:', formData)
      
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-br from-background/50 to-background" id="contact">
      <div className="container px-4 sm:px-6">
        {/* Header - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
            Let's Create Something Amazing
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Ready to bring your ideas to life? I'm here to help you build exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Information - Mobile First */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass p-6 sm:p-8 rounded-2xl h-fit">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white">Get In Touch</h3>
              
              {/* Contact Methods - Mobile Optimized */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.name}
                    href={method.href}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ x: 5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                        {method.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">{method.description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links - Mobile Responsive */}
              <div className="border-t border-white/10 pt-6 sm:pt-8">
                <h4 className="font-semibold mb-3 sm:mb-4 text-gray-300 text-sm sm:text-base">Follow Me</h4>
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 glass rounded-lg transition-all duration-300 ${link.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-lg sm:text-xl">{link.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Status - Mobile Responsive */}
              <motion.div
                className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-300 font-medium text-sm sm:text-base">Available for new projects</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form - Mobile First */}
          <motion.div
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row - Stack on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div className="relative">
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 sm:p-4 glass bg-white/5 rounded-lg focus:ring-2 ring-primary outline-none transition-all duration-300 text-sm sm:text-base"
                      placeholder="John Doe"
                      required
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute inset-0 rounded-lg border-2 border-primary/50 pointer-events-none"
                        layoutId="focusRing"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                      />
                    )}
                    {errors.name && (
                      <motion.p 
                        className="text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div className="relative">
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 sm:p-4 glass bg-white/5 rounded-lg focus:ring-2 ring-primary outline-none transition-all duration-300 text-sm sm:text-base"
                      placeholder="john@example.com"
                      required
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute inset-0 rounded-lg border-2 border-primary/50 pointer-events-none"
                        layoutId="focusRing"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                      />
                    )}
                    {errors.email && (
                      <motion.p 
                        className="text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Subject - Mobile Responsive */}
                <motion.div className="relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full p-3 sm:p-4 glass bg-white/5 rounded-lg focus:ring-2 ring-primary outline-none transition-all duration-300 text-sm sm:text-base"
                    placeholder="Project Collaboration"
                  />
                  {focusedField === 'subject' && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-primary/50 pointer-events-none"
                      layoutId="focusRing"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Message - Mobile Responsive */}
                <motion.div className="relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full p-3 sm:p-4 glass bg-white/5 rounded-lg focus:ring-2 ring-primary outline-none transition-all duration-300 min-h-[120px] sm:min-h-[150px] resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project idea..."
                    required
                  />
                  {focusedField === 'message' && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-primary/50 pointer-events-none"
                      layoutId="focusRing"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    />
                  )}
                  {errors.message && (
                    <motion.p 
                      className="text-red-400 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button - Mobile Responsive */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid || status === 'sending'}
                  className={`w-full p-3 sm:p-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                    isFormValid && status !== 'sending'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={isFormValid && status !== 'sending' ? { y: -2 } : {}}
                  whileTap={isFormValid && status !== 'sending' ? { scale: 0.98 } : {}}
                >
                  {status === 'sending' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-sm sm:text-base">Sending Message...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {/* Status Messages - Mobile Responsive */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 text-green-300 text-sm sm:text-base">
                        <span>✅</span>
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 text-red-300 text-sm sm:text-base">
                        <span>❌</span>
                        <span>Failed to send message. Please try again or contact me directly.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts - Mobile Responsive */}
        <motion.div
          className="mt-12 sm:mt-16 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
            <div className="glass p-4 sm:p-6 rounded-xl">
              <div className="text-xl sm:text-2xl mb-2">⚡</div>
              <div className="font-bold text-primary text-lg sm:text-xl">24hr</div>
              <div className="text-xs sm:text-sm text-gray-400">Typical response time</div>
            </div>
            <div className="glass p-4 sm:p-6 rounded-xl">
              <div className="text-xl sm:text-2xl mb-2">🎯</div>
              <div className="font-bold text-primary text-lg sm:text-xl">100%</div>
              <div className="text-xs sm:text-sm text-gray-400">Project completion rate</div>
            </div>
            <div className="glass p-4 sm:p-6 rounded-xl">
              <div className="text-xl sm:text-2xl mb-2">🌍</div>
              <div className="font-bold text-primary text-lg sm:text-xl">Remote</div>
              <div className="text-xs sm:text-sm text-gray-400">Available worldwide</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
