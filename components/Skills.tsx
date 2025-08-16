'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const skills = {
  'Mobile Development': {
    color: 'from-pink-500 to-purple-600',
    skills: [
      { name: 'React Native', level: 85, icon: '📱', projects: 8 },
      { name: 'Android Development', level: 40, icon: '🤖', projects: 2 },
    ]
  },
  'MERN Stack': {
    color: 'from-green-500 to-blue-600',
    skills: [
      { name: 'React.js', level: 85, icon: '⚛️', projects: 12 },
      { name: 'Node.js', level: 35, icon: '🟩', projects: 4 },
      { name: 'MongoDB', level: 80, icon: '🍃', projects: 8 },
      { name: 'Express.js', level: 75, icon: '🚀', projects: 6 },
    ]
  },
  'Programming & Languages': {
    color: 'from-orange-500 to-red-600',
    skills: [
      { name: 'JavaScript', level: 50, icon: '🟨', projects: 15 },
      { name: 'Python', level: 60, icon: '🐍', projects: 7 },
      { name: 'Java', level: 30, icon: '☕', projects: 2 },
      { name: 'SQL', level: 80, icon: '🗄️', projects: 8 },
    ]
  },
  'Frontend & Design': {
    color: 'from-blue-500 to-cyan-600',
    skills: [
      { name: 'HTML', level: 95, icon: '🌐', projects: 20 },
      { name: 'CSS', level: 95, icon: '🎨', projects: 20 },
      { name: 'Tailwind CSS', level: 95, icon: '💨', projects: 15 },
      { name: 'Bootstrap', level: 95, icon: '🅱️', projects: 12 },
    ]
  },
  'Tools & Integration': {
    color: 'from-purple-500 to-pink-600',
    skills: [
      { name: 'Git', level: 95, icon: '📚', projects: 25 },
      { name: 'GitHub', level: 95, icon: '�', projects: 25 },
      { name: 'API Integration', level: 85, icon: '🔌', projects: 18 },
      { name: 'REST APIs', level: 85, icon: '🌐', projects: 15 },
    ]
  },
  'Emerging Tech': {
    color: 'from-cyan-500 to-purple-600',
    skills: [
      { name: 'AI/ML', level: 25, icon: '🤖', projects: 1 },
      { name: 'Cloud Services', level: 30, icon: '☁️', projects: 2 },
      { name: 'Docker', level: 20, icon: '🐳', projects: 1 },
      { name: 'System Design', level: 35, icon: '🏗️', projects: 2 },
    ]
  },
}

const achievements = [
  { title: 'LeetCode Problems', count: '50+', icon: '🎯', color: 'from-green-500 to-emerald-600' },
  { title: 'Projects Completed', count: '25+', icon: '🚀', color: 'from-blue-500 to-cyan-600' },
  { title: 'GitHub Commits', count: '500+', icon: '📝', color: 'from-purple-500 to-pink-600' },
  { title: 'Skills Mastered', count: '20+', icon: '⭐', color: 'from-orange-500 to-red-600' },
]

// Skill level descriptions
const getSkillLevelInfo = (level: number) => {
  if (level >= 90) return { label: 'Expert', color: 'text-green-400', bgColor: 'bg-green-500/20 border-green-500/30' }
  if (level >= 70) return { label: 'Advanced', color: 'text-blue-400', bgColor: 'bg-blue-500/20 border-blue-500/30' }
  if (level >= 50) return { label: 'Intermediate', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20 border-yellow-500/30' }
  if (level >= 30) return { label: 'Beginner+', color: 'text-orange-400', bgColor: 'bg-orange-500/20 border-orange-500/30' }
  return { label: 'Learning', color: 'text-red-400', bgColor: 'bg-red-500/20 border-red-500/30' }
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed')
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'projects'>('level')

  const categoryKeys = Object.keys(skills)
  const currentCategory = categoryKeys[activeCategory]
  const currentSkills = skills[currentCategory as keyof typeof skills]
  
  // Sort skills based on selected criteria
  const sortedSkills = [...currentSkills.skills].sort((a, b) => {
    if (sortBy === 'level') return b.level - a.level
    if (sortBy === 'projects') return b.projects - a.projects
    return a.name.localeCompare(b.name)
  })

  return (
    <section className="section-premium" id="skills">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-full"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Building the future with cutting-edge technologies and proven expertise across multiple domains
          </p>
        </motion.div>

        {/* Enhanced Achievements Grid - Mobile Responsive */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:border-gray-600/50 transition-all duration-300 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`relative text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 rounded-full bg-gradient-to-r ${achievement.color} w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 flex items-center justify-center mx-auto`}>
                {achievement.icon}
              </div>
              <div className="relative text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">{achievement.count}</div>
              <div className="relative text-xs sm:text-sm text-gray-400 leading-tight">{achievement.title}</div>
              
              {/* Animated border */}
              <motion.div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Enhanced Category Sidebar - Mobile Stack */}
          <motion.div 
            className="lg:col-span-4 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-300 flex items-center gap-2 sm:gap-3">
                <motion.span 
                  className="text-blue-400 text-lg sm:text-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.span>
                Expertise Domains
              </h3>
              <div className="space-y-3">
                {categoryKeys.map((category, index) => {
                  const categorySkills = skills[category as keyof typeof skills].skills
                  const avgLevel = Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length)
                  const levelInfo = getSkillLevelInfo(avgLevel)
                  
                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(index)}
                      className={`group w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                        activeCategory === index
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeCategory === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          layoutId="activeBackground"
                          initial={false}
                        />
                      )}
                      <div className="relative flex items-center justify-between mb-2">
                        <span className={`font-semibold ${
                          activeCategory === index ? 'text-blue-300' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${levelInfo.bgColor} ${levelInfo.color}`}>
                          {levelInfo.label}
                        </span>
                      </div>
                      <div className="relative flex items-center justify-between text-sm text-gray-400">
                        <span>{categorySkills.length} skills</span>
                        <span>{avgLevel}% avg</span>
                      </div>
                      {activeCategory === index && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${currentSkills.color} rounded-b-xl`}
                          layoutId="activeBar"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
              
              {/* Quick stats */}
              <motion.div 
                className="mt-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Skills:</span>
                    <span className="text-white font-medium">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expert Level:</span>
                    <span className="text-green-400 font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Learning:</span>
                    <span className="text-blue-400 font-medium">4</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Skills Display - Mobile Responsive */}
          <motion.div 
            className="lg:col-span-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{currentCategory}</h3>
                    <div className={`h-1.5 sm:h-2 w-16 sm:w-20 bg-gradient-to-r ${currentSkills.color} rounded-full`} />
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    {/* View Mode Toggle - Mobile Friendly */}
                    <div className="flex items-center gap-1 bg-gray-800/50 rounded-full p-1">
                      <button
                        onClick={() => setViewMode('detailed')}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-all ${
                          viewMode === 'detailed' 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Detailed
                      </button>
                      <button
                        onClick={() => setViewMode('compact')}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-all ${
                          viewMode === 'compact' 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Compact
                      </button>
                    </div>

                    {/* Sort Options - Mobile Responsive */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'level' | 'projects')}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm text-white focus:border-blue-500/50 outline-none"
                    >
                      <option value="level">Sort by Level</option>
                      <option value="name">Sort by Name</option>
                      <option value="projects">Sort by Projects</option>
                    </select>
                  </div>
                </div>

                <div className={`grid gap-4 ${viewMode === 'compact' ? 'md:grid-cols-2' : ''}`}>
                  {sortedSkills.map((skill, index) => {
                    const levelInfo = getSkillLevelInfo(skill.level)
                    
                    if (viewMode === 'compact') {
                      return (
                        <motion.div
                          key={skill.name}
                          className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-gray-600/50 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{skill.icon}</span>
                              <div>
                                <h4 className="font-semibold text-white text-sm">{skill.name}</h4>
                                <p className="text-xs text-gray-400">{skill.projects} projects</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${levelInfo.color}`}>{skill.level}%</div>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${currentSkills.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.05 }}
                            />
                          </div>
                        </motion.div>
                      )
                    }
                    
                    return (
                      <motion.div
                        key={skill.name}
                        className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`text-3xl p-3 rounded-full bg-gradient-to-r ${currentSkills.color} flex items-center justify-center`}>
                              {skill.icon}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">{skill.name}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-sm text-gray-400">{skill.projects} projects</p>
                                <span className={`text-xs px-2 py-1 rounded-full border ${levelInfo.bgColor} ${levelInfo.color}`}>
                                  {levelInfo.label}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${levelInfo.color}`}>{skill.level}%</div>
                            <div className="text-xs text-gray-400">Proficiency</div>
                          </div>
                        </div>

                        {/* Enhanced Progress Bar */}
                        <div className="relative mb-4">
                          <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${currentSkills.color} rounded-full relative`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                            >
                              {hoveredSkill === skill.name && (
                                <motion.div
                                  className="absolute inset-0 bg-white/20 rounded-full"
                                  initial={{ x: '-100%' }}
                                  animate={{ x: '100%' }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
                            </motion.div>
                          </div>
                          
                          {/* Progress indicators */}
                          <div className="absolute top-0 w-full h-full flex items-center">
                            {[25, 50, 75].map((mark) => (
                              <div
                                key={mark}
                                className="absolute w-0.5 h-3 bg-gray-600 rounded-full"
                                style={{ left: `${mark}%` }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Skill highlights */}
                        {skill.level >= 85 && (
                          <motion.div
                            className="flex items-center gap-2 text-xs"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <span className="text-green-400">⭐</span>
                            <span className="text-green-300">Core Strength</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's leverage these skills to create innovative solutions that make a real impact. 
              From mobile apps to full-stack applications, I'm ready for the next challenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start a Project</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-3 px-8 py-3 bg-transparent text-gray-300 rounded-full font-semibold border border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <span>📋</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
