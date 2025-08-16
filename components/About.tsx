'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

const metrics = [
  { label: 'React Native Apps', value: '5+', icon: '📱', color: 'from-blue-500 to-cyan-500' },
  { label: 'Full-Stack Projects', value: '8+', icon: '🚀', color: 'from-purple-500 to-pink-500' },
  { label: 'CGPA', value: '8.86', icon: '🎓', color: 'from-green-500 to-emerald-500' },
  { label: 'Certifications', value: '3+', icon: '🏆', color: 'from-orange-500 to-red-500' },
]

const skills = [
  'React Native', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 
  'Python', 'Java', 'Firebase', 'Redux', 'REST APIs', 'GraphQL', 'Git/GitHub', 'SQL'
]

const certifications = [
  {
    name: 'HackerRank Software Engineer',
    issuer: 'HackerRank',
    date: 'August 2025',
    driveUrl: 'https://drive.google.com/drive/folders/1n-W-8G62kMcONKTSJwYC1UzH2rkp5ADR',
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'React JS Certification',
    issuer: 'Infosys',
    date: 'March 2025',
    driveUrl: 'https://drive.google.com/drive/folders/1n-W-8G62kMcONKTSJwYC1UzH2rkp5ADR',
    color: 'from-blue-500 to-indigo-600'
  },
]

// Animation variants
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const openCertificate = (url: string, certificateName: string) => {
  if (url.includes('YOUR_') || url.includes('CERTIFICATE_ID')) {
    alert(`Please update the Google Drive link for ${certificateName} certificate`)
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  
  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      id="about"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header Section - Enhanced Mobile Typography */}
        <motion.div className="text-center mb-12 sm:mb-16 lg:mb-20" variants={itemVariants}>
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 sm:mb-6">
              About Me
            </h2>
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-1 sm:-bottom-2 -left-3 sm:-left-6 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-40 animate-pulse delay-1000"></div>
          </div>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4"
            variants={itemVariants}
          >
            A passionate IT Engineering student crafting digital experiences
            with modern technologies and innovative solutions.
          </motion.p>
        </motion.div>

        {/* Stats Grid - Mobile Optimized */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20"
          variants={containerVariants}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-3 sm:p-4 lg:p-6 text-center h-full min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{metric.icon}</div>
                <div className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                  {metric.value}
                </div>
                <div className="text-gray-400 font-medium text-xs sm:text-sm lg:text-base leading-tight">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* About Text & Education - Mobile Responsive */}
          <motion.div className="space-y-8 sm:space-y-10 lg:space-y-12" variants={itemVariants}>
            {/* Story Section */}
            <div className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <div className="pl-4 sm:pl-6 lg:pl-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">👋</span>
                  My Story
                </h3>
                <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                  <p>
                    I'm a Mobile & Full-Stack Developer with expertise in React Native, MERN stack, and Python. 
                    My journey in software development has been driven by a passion for creating impactful, 
                    user-focused applications that solve real-world problems.
                  </p>
                  <p>
                    From building cross-platform mobile apps to developing secure full-stack solutions, 
                    I thrive on challenges that push the boundaries of modern technology. Currently expanding 
                    my expertise into Kotlin and Android development while exploring AI in fintech.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <div className="pl-4 sm:pl-6 lg:pl-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">🎓</span>
                  Education
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <motion.div 
                    className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-semibold text-white">BE - Information Technology</h4>
                        <p className="text-green-400 font-medium text-sm sm:text-base">Savitribai Phule Pune University</p>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mt-2 sm:mt-0">8.86</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">2023 - 2026</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-semibold text-white">Diploma in Computer Engineering</h4>
                        <p className="text-green-400 font-medium text-sm sm:text-base">Puranmal Lahoti Government Polytechnic</p>
                      </div>
                      <span className="text-lg sm:text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mt-2 sm:mt-0">83.56%</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">2019 - 2022</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills & Certifications - Mobile Responsive */}
          <motion.div className="space-y-8 sm:space-y-10 lg:space-y-12" variants={itemVariants}>
            {/* Skills Cloud */}
            <div className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <div className="pl-4 sm:pl-6 lg:pl-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">⚡</span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-white text-xs sm:text-sm lg:text-base font-medium backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(168, 85, 247, 0.2)",
                        borderColor: "rgba(168, 85, 247, 0.5)"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              <div className="pl-4 sm:pl-6 lg:pl-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">🏆</span>
                  Certifications
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      className="group cursor-pointer"
                      onClick={() => openCertificate(cert.driveUrl, cert.name)}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 group-hover:border-orange-500/50 transition-colors duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        <div className="relative flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors truncate">
                              {cert.name}
                            </h4>
                            <p className="text-gray-400 text-xs sm:text-sm">{cert.issuer} • {cert.date}</p>
                          </div>
                          <div className="ml-3 sm:ml-4 text-orange-400 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action - Mobile Responsive */}
        <motion.div className="text-center px-4" variants={itemVariants}>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Connect</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg sm:text-xl"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
