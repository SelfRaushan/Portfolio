import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';

// --- All Projects Data ---
const allProjects = [
  // Add all of your projects here
  {
    title: 'Makeover By Leena',
    description: 'A professional makeover & beauty service website showcasing services, a gallery, and contact information.',
    techStack: ['React', 'Tailwind CSS', 'Vercel'],
    projectUrl: 'https://makeover2.vercel.app/',
    githubUrl: 'https://github.com/Raushan2002/Makeover',
    category: 'Frontend',
  },
  {
    title: '3PL Service Website',
    description: 'A logistics-focused service platform with interactive dashboards for warehousing and order management.',
    techStack: ['MERN Stack', 'REST APIs', 'JWT'],
    projectUrl: 'https://edison3pl.vercel.app/',
    githubUrl: 'https://github.com/Raushan2002/3pl',
    category: 'Full Stack',
  },
  {
    title: 'SideNest',
    description: 'A platform to help dreamers turn ideas into reality, featuring a clean UI built with modern components.',
    techStack: ['React', 'Tailwind CSS', 'Vercel'],
    projectUrl: 'https://side-nest.vercel.app/',
    githubUrl: 'https://github.com/Raushan2002/SideNest',
    category: 'Frontend',
  },
  {
    title: 'Blog API',
    description: 'A robust RESTful API for a blogging platform, complete with user authentication, posts, comments, and likes.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    projectUrl: 'https://github.com/Raushan2002/Blog_App', // No live demo, link to GitHub
    githubUrl: 'https://github.com/Raushan2002/Blog_App',
    category: 'API',
  },
  {
    title: 'E-commerce Platform',
    description: 'A complete e-commerce solution with product catalogs, shopping cart, user accounts, and an admin dashboard.',
    techStack: ['React', 'Node.js', 'Redux', 'Stripe'],
    projectUrl: 'https://github.com/Raushan2002/Ecommerce', // Placeholder
    githubUrl: 'https://github.com/Raushan2002/Ecommerce',
    category: 'Full Stack',
  },
  {
    title: 'URL Shortener',
    description: 'A microservice that generates shortened URLs, tracks clicks, and redirects users efficiently.',
    techStack: ['Node.js', 'Express', 'MongoDB'],
    projectUrl: 'https://github.com/Raushan2002/URL_Shortner', // Placeholder
    githubUrl: 'https://github.com/Raushan2002/URL_Shortner',
    category: 'API',
  },
];

const categories = ['All', 'Full Stack', 'Frontend', 'API'];

const useIntersectionObserver = (options) => {
    const containerRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [options]);
    return containerRef;
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useIntersectionObserver({ threshold: 0.1 });

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{`
        .animate-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <div ref={containerRef} className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <section className="py-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 animate-on-scroll">
            My Creative Works
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            A curated collection of my projects, from full-stack applications to intricate frontend designs.
          </p>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center flex-wrap gap-4 mb-12 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.title} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                    <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Portfolio;
