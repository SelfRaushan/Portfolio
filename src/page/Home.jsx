import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

// Import your existing enhanced components
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsMarquee from '../components/SkillsSection';
import ProjectCard from '../components/ProjectCard';

// Custom hook for staggered animations
const useStaggeredAnimation = (refs) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Apply a staggered delay based on the element's index
            entry.target.style.transitionDelay = `${index * 150}ms`;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs]);
};


const Home = () => {
  // Refs for each section to animate
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);

  useStaggeredAnimation([aboutRef, skillsRef, projectsRef, ctaRef]);

  return (
    <>
      {/* Inject CSS for animations and backgrounds */}
      <style>{`
        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .section-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Main container with theme-aware background */}
      <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <HeroSection />

        <div className="space-y-24 md:space-y-32 overflow-hidden px-4">
          <div ref={aboutRef} className="section-animate">
            <AboutSection />
          </div>

          <div ref={skillsRef} className="section-animate">
             <div className="text-center max-w-7xl mx-auto">
               <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Core Technologies</h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                 The tools I use daily to build and deploy modern web applications.
               </p>
             </div>
            <SkillsMarquee />
          </div>

          <div ref={projectsRef} className="section-animate">
            <section className="py-20">
              <div className="text-center max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Featured Projects</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                  A selection of projects that showcase my skills in creating robust and engaging user experiences.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  <ProjectCard 
                    title="Makeover By Leena" 
                    description="A professional makeover & beauty service website showcasing services and a gallery." 
                    techStack={['React', 'Tailwind CSS', 'Vercel']}
                    projectUrl="https://makeover2.vercel.app/"
                  />
                  <ProjectCard 
                    title="3PL Service Website" 
                    description="A logistics-focused service platform with interactive dashboards for order management." 
                    techStack={['MERN Stack', 'REST APIs']}
                    projectUrl="https://edison3pl.vercel.app/"
                  />
                  <ProjectCard 
                    title="SideNest" 
                    description="A platform to help dreamers turn ideas into reality, with a focus on clean UI components." 
                    techStack={['React', 'Tailwind CSS', 'Vercel']}
                    projectUrl="https://side-nest.vercel.app/"
                  />
                </div>
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-400/40 transform hover:-translate-y-1"
                >
                  View All Projects <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Final CTA with Glassmorphism */}
        <div ref={ctaRef} className="section-animate p-4 md:p-8">
            <section className="relative mt-24 py-20 px-4 text-center rounded-2xl overflow-hidden bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-300/50 dark:border-slate-700/50">
                 <div className="absolute inset-0 bg-radial-gradient-at-center from-sky-500/10 via-transparent to-transparent"></div>
                 <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-white">
                        Let's Build Something Together.
                    </h2>
                     <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                       Have a project in mind or just want to connect? I'm always open to new opportunities and collaborations.
                    </p>
                    <Link
                        to="/contact"
                        className="group inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-extrabold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-400/40 transform hover:-translate-y-1"
                    >
                        Get In Touch
                    </Link>
                </div>
            </section>
        </div>
        
        {/* Floating Action Button */}
        <Link 
            to="/contact" 
            className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-16 h-16 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-110"
            aria-label="Contact Me"
        >
            <Mail size={28} className="transition-transform duration-300 group-hover:-rotate-12" />
            <span className="absolute right-full mr-4 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Let's Talk
            </span>
        </Link>
      </div>
    </>
  );
};

export default Home;

