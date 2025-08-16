"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/ProjectsEnhanced";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth">
      <Navigation />
      <Hero />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-0"
      >
        <div id="about" className="scroll-mt-20 md:scroll-mt-24">
          <About />
        </div>
        <div id="skills" className="scroll-mt-20 md:scroll-mt-24">
          <Skills />
        </div>
        <div id="projects" className="scroll-mt-20 md:scroll-mt-24">
          <Projects />
        </div>
        <div id="contact" className="scroll-mt-20 md:scroll-mt-24">
          <Contact />
        </div>
        <Footer />
      </motion.div>
      
    </main>
  );
}

