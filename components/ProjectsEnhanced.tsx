'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

// Error handling for images
const ImageWithFallback = ({ src, alt, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <>
      {!hasError ? (
        <Image
          {...props}
          src={imgSrc}
          alt={alt}
          onError={() => {
            setHasError(true)
            setImgSrc('/api/placeholder/600/400') // Fallback
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-6xl opacity-50">🚀</span>
        </div>
      )}
    </>
  )
}

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  image: string
  achievements: string[]
  metrics: {
    label: string
    value: string
    icon: string
  }[]
  links: {
    github: string
    demo: string
    video?: string
    case_study?: string
  }
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  year: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'SmartSchoolSync',
    description: 'Full-stack school management system with real-time synchronization',
    longDescription: 'Comprehensive school management platform featuring real-time data synchronization, automated attendance tracking, grade management, and parent-teacher communication portal. Built with microservices architecture for scalability.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'REST APIs'],
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&crop=center&q=80', // Modern classroom with technology
    achievements: [
      'Reduced data sync latency by 40%',
      'Optimized load times by 60%',
      'Scaled to 10k+ daily users',
      'Implemented offline-first architecture'
    ],
    metrics: [
      { label: 'Users', value: '500+', icon: '👥' },
      { label: 'Performance', value: '40%', icon: '⚡' },
      { label: 'Uptime', value: '99.9%', icon: '🚀' }
    ],
    links: {
      github: 'https://github.com/yourusername/smartschoolsync',
      demo: 'https://smartschoolsync-demo.vercel.app',
      video: 'https://youtube.com/your-demo-video',
      case_study: '/case-study/smartschoolsync.pdf'
    },
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 2,
    title: 'Shopping Cart Pro',
    description: 'High-performance e-commerce solution with advanced state management',
    longDescription: 'Modern e-commerce platform with advanced cart functionality, payment integration, inventory management, and analytics dashboard. Features include wishlist, product recommendations, and real-time inventory updates.',
    tech: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Stripe', 'Firebase'],
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop&crop=center&q=80', // Modern shopping/retail experience
    achievements: [
      'Optimized state management with Redux Toolkit',
      'Implemented responsive design system',
      'Enhanced UX with micro-animations',
      'Integrated secure payment processing'
    ],
    metrics: [
      { label: 'Speed', value: '98/100', icon: '🏎️' },
      { label: 'Conversion', value: '15%', icon: '💰' },
      { label: 'Users', value: '5K+', icon: '🛒' }
    ],
    links: {
      github: 'https://github.com/Abhicyber-code/Ecomzyapp',
      demo: 'https://ecomzy-shopping-cart.netlify.app/'
    },
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 3,
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot with natural language processing capabilities',
    longDescription: 'Advanced AI-powered chat assistant built with modern NLP techniques. Features context awareness, multi-turn conversations, and integration with external APIs for enhanced functionality.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'React', 'WebSocket', 'Docker'],
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&crop=center&q=80', // AI/technology neural network
    achievements: [
      'Achieved 95% response accuracy',
      'Processed 100K+ conversations',
      'Implemented context-aware responses',
      'Built scalable microservices architecture'
    ],
    metrics: [
      { label: 'Accuracy', value: '95%', icon: '🎯' },
      { label: 'Response Time', value: '<2s', icon: '⚡' },
      { label: 'Satisfaction', value: '4.8/5', icon: '⭐' }
    ],
    links: {
      github: 'https://github.com/yourusername/ai-chat-assistant',
      demo: 'https://ai-chat-demo.vercel.app'
    },
    featured: false,
    status: 'completed',
    year: '2024'
  },
  {
    id: 4,
    title: 'React GIF App',
    description: 'Dynamic GIF search application using Giphy API',
    longDescription: 'Interactive React application that allows users to search for GIFs using the Giphy API. Features include search-based results, random GIF generation, responsive design, and smooth animations for an engaging user experience.',
    tech: ['React.js', 'Giphy API', 'CSS3', 'JavaScript', 'Responsive Design'],
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&crop=center&q=80', // Creative design/animation workspace
    achievements: [
      'Integrated Giphy API for real-time GIF search',
      'Implemented responsive grid layout',
      'Added smooth loading animations',
      'Optimized API calls with debouncing'
    ],
    metrics: [
      { label: 'API Calls', value: '1K+', icon: '🔄' },
      { label: 'Load Time', value: '<1s', icon: '⚡' },
      { label: 'Mobile Ready', value: '100%', icon: '📱' }
    ],
    links: {
      github: 'https://github.com/Abhicyber-code/React_giff_app',
      demo: 'https://react-giff-app.netlify.app/'
    },
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 5,
    title: 'PassGenie',
    description: 'Secure password generator with customizable options',
    longDescription: 'JavaScript-based password generator application that creates strong, secure passwords. Users can customize password length and choose from various character combinations including symbols, numbers, uppercase and lowercase letters for maximum security.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center&q=80', // Cybersecurity/lock protection
    achievements: [
      'Built secure password generation algorithm',
      'Implemented customizable character sets',
      'Added password strength indicator',
      'Created intuitive user interface'
    ],
    metrics: [
      { label: 'Security', value: 'High', icon: '🔒' },
      { label: 'Customization', value: '10+', icon: '⚙️' },
      { label: 'Generated', value: '5K+', icon: '🔐' }
    ],
    links: {
      github: 'https://github.com/Abhicyber-code/pass_genie',
      demo: 'https://abhicyber-code.github.io/pass_genie/'
    },
    featured: true,
    status: 'completed',
    year: '2024'
  }
]

const categories = ['All', 'Full-Stack', 'Frontend', 'AI/ML', 'Mobile']

export default function ProjectsEnhanced() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'year' | 'title' | 'featured'>('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'featured') return Number(b.featured) - Number(a.featured)
      if (sortBy === 'year') return b.year.localeCompare(a.year)
      return a.title.localeCompare(b.title)
    })

  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" id="projects">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="gradient-text mb-4 sm:mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Featured Projects
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Showcasing innovative solutions built with cutting-edge technologies
          </p>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search and Sort Controls */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center justify-between mb-6 sm:mb-8">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'year' | 'title' | 'featured')}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:border-primary/50 outline-none min-w-0 sm:min-w-[140px]"
              >
                <option value="featured">Featured First</option>
                <option value="year">Newest First</option>
                <option value="title">Alphabetical</option>
              </select>

              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded text-sm transition-all ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded text-sm transition-all ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'glass text-gray-300 hover:text-white hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8 sm:space-y-12">
          <AnimatePresence mode="wait">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-4 sm:p-6 lg:p-8 card-hover group cursor-pointer"
                onClick={() => openProjectModal(project)}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  {/* Project Image */}
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 aspect-video group-hover:scale-105 transition-transform duration-300">
                      <ImageWithFallback 
                        src={project.image} 
                        alt={`${project.title} demo screenshot`}
                        fill
                        className="object-cover brightness-90 contrast-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Status badges */}
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col sm:flex-row gap-2">
                        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          project.status === 'completed' ? 'bg-green-500/30 text-green-200 border border-green-500/30' :
                          project.status === 'in-progress' ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/30' :
                          'bg-blue-500/30 text-blue-200 border border-blue-500/30'
                        }`}>
                          {project.status === 'completed' ? '✅ Done' :
                           project.status === 'in-progress' ? '🚧 In Progress' : '📋 Planned'}
                        </div>
                        <div className="bg-gray-900/50 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs text-gray-200 border border-gray-600/30">
                          {project.year}
                        </div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-sm sm:text-lg font-semibold bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
                          🔍 View Details
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="px-2 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full w-fit">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg sm:text-2xl mb-1">{metric.icon}</div>
                          <div className="text-sm sm:text-lg font-bold text-primary">{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">TECH STACK</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(tech => (
                          <motion.span
                            key={tech}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm glass hover:bg-primary/10 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 min-w-0 flex-1 sm:flex-initial"
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>📂</span> 
                        <span className="text-sm">Code</span>
                      </motion.a>
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300 min-w-0 flex-1 sm:flex-initial"
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>🌐</span> 
                        <span className="text-sm">Live Demo</span>
                      </motion.a>
                    </div>

                    <div className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      Click to view detailed information →
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div 
                  className="mt-4 sm:mt-6 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ transformOrigin: '0%' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        {!showAll && filteredProjects.length > 2 && (
          <motion.div
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects ({filteredProjects.length - 2} more)
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {selectedProject.category}
                    </span>
                    <span className="text-gray-400">{selectedProject.year}</span>
                  </div>
                </div>
                <button
                  onClick={closeProjectModal}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Project Image */}
              <div className="mb-8">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 aspect-video">
                  <ImageWithFallback 
                    src={selectedProject.image} 
                    alt={`${selectedProject.title} demo screenshot`}
                    fill
                    className="object-cover brightness-90 contrast-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Tech stack overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.slice(0, 4).map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {selectedProject.tech.length > 4 && (
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                          +{selectedProject.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Long Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">About This Project</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {selectedProject.metrics.map((metric, i) => (
                  <div key={i} className="text-center glass p-4 rounded-lg">
                    <div className="text-3xl mb-2">{metric.icon}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedProject.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 glass p-4 rounded-lg"
                    >
                      <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                      <span className="text-gray-300">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map(tech => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 glass rounded-lg hover:bg-primary/10 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>📂</span> View Code
                </motion.a>
                <motion.a
                  href={selectedProject.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>🌐</span> Live Demo
                </motion.a>
                {selectedProject.links.video && (
                  <motion.a
                    href={selectedProject.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>🎥</span> Demo Video
                  </motion.a>
                )}
                {selectedProject.links.case_study && (
                  <motion.a
                    href={selectedProject.links.case_study}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>📄</span> Case Study
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
