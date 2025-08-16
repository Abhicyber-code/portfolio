'use client'

import { useCallback } from 'react'
import { loadFull } from 'tsparticles'
import Particles from 'react-tsparticles'
import type { Engine } from 'tsparticles-engine'

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0"
      options={{
        fullScreen: false,
        background: { color: 'transparent' },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: { opacity: 0.5 },
            },
          },
        },
        particles: {
          color: {
            value: ['#0ea5e9', '#8b5cf6', '#06b6d4'],
          },
          links: {
            color: '#0ea5e9',
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
          },
          number: { density: { enable: true, area: 800 }, value: 80 },
          opacity: {
            value: { min: 0.3, max: 0.7 },
            animation: {
              enable: true,
              speed: 1,
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  )
}
