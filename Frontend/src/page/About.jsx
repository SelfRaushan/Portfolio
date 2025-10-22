import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MyPic from '../assets/MyPic.png';
import { Code, Rocket, Heart, Briefcase, GraduationCap, Zap } from 'lucide-react';

// Custom hook for observing elements on scroll
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

const About = () => {
  const containerRef = useIntersectionObserver({ threshold: 0.1 });

  const timelineEvents = [
    { 
      icon: <GraduationCap />, 
      year: '2016-2024', 
      title: 'Educational Foundation', 
      description: 'Completed comprehensive education from 10th grade (2016) to Master of Computer Applications from Noida Institute of Engineering and Technology (2024), building strong fundamentals in computer science.' 
    },
    { 
      icon: <Zap />, 
      year: '2022-2024', 
      title: 'MERN Stack Mastery', 
      description: 'Mastered React.js, Tailwind CSS, Node.js, Express.js, and MongoDB to become a full-fledged MERN stack developer with expertise in building scalable, responsive applications.' 
    },
    { 
      icon: <Code />, 
      year: '2024-2025', 
      title: 'Project Development', 
      description: 'Built multiple professional-grade projects including Makeover By Leena, SideNest, and 3PL Service Website, gaining hands-on experience in full-stack development and deployment.' 
    },
    { 
      icon: <Briefcase />, 
      year: 'Jul 2025-Present', 
      title: 'Professional Experience', 
      description: 'Joined Landing Labs Pvt. Ltd. in Pune as MERN Stack Developer, developing full-stack applications, designing REST APIs, and delivering client-focused solutions with cross-platform compatibility.' 
    },
  ];
  
  const philosophies = [
    { 
      icon: <Code size={32} />, 
      title: 'Clean & Efficient Code', 
      description: 'I believe in writing scalable, maintainable code using modern JavaScript (ES6+), proper REST API design, and database optimization with MongoDB for robust applications.' 
    },
    { 
      icon: <Rocket size={32} />, 
      title: 'User-Centric Design', 
      description: 'My focus is on creating responsive UIs with React.js and Tailwind CSS that ensure cross-platform compatibility and solve real-world problems with elegant solutions.' 
    },
    { 
      icon: <Heart size={32} />, 
      title: 'Continuous Learning', 
      description: 'I am passionate about exploring modern technologies like AI integration, cloud platforms (AWS/Netlify/Vercel), and staying current with evolving web development frameworks.' 
    },
  ];

  return (
    <>
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          top: 24px;
          left: -21px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #38bdf8; /* sky-500 */
          border: 3px solid #f1f5f9; /* slate-100 */
        }
        .dark .timeline-item::before {
          border-color: #1e293b; /* slate-800 */
        }
      `}</style>
      {/* SEO */}
      <SEO 
        title="About Me | Raushan Kumar"
        description="Learn more about Raushan Kumar's journey into web development, my passion for coding, and the technologies I work with."
        canonicalUrl="https://justgodigital.online/about"
  
      />
      
      <div ref={containerRef} className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 text-center">
          <img src={MyPic} alt="Raushan Kumar" className="mx-auto w-40 h-40 rounded-full mb-6 border-4 border-white dark:border-slate-700 shadow-lg animate-on-scroll" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 animate-on-scroll" style={{transitionDelay: '100ms'}}>
            I'm Raushan Kumar.
          </h1>
          <p className="text-xl md:text-2xl text-sky-600 dark:text-sky-400 max-w-3xl mx-auto animate-on-scroll" style={{transitionDelay: '200ms'}}>
            A MERN Stack Developer at Landing Labs Pvt. Ltd. who crafts scalable, responsive, and user-friendly digital experiences.
          </p>
        </section>

        {/* My Journey Timeline */}
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-16 animate-on-scroll">My Professional Journey</h2>
                <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4">
                    {timelineEvents.map((event, index) => (
                        <div key={index} className="mb-12 pl-12 timeline-item animate-on-scroll" style={{transitionDelay: `${index * 150}ms`}}>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-sky-500">{event.icon}</span>
                                <span className="font-bold text-lg text-slate-700 dark:text-slate-300">{event.year} - {event.title}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-slate-200 dark:bg-slate-800 py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">My Development Philosophy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {philosophies.map((item, index) => (
                        <div key={index} className="p-8 bg-white dark:bg-slate-900 rounded-lg shadow-lg text-center animate-on-scroll" style={{transitionDelay: `${index * 150}ms`}}>
                            <div className="inline-block p-4 bg-sky-100 dark:bg-sky-900/50 text-sky-500 rounded-full mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* CTA */}
        <section className="py-24 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 animate-on-scroll">Interested in working together?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto animate-on-scroll" style={{transitionDelay: '100ms'}}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.
            </p>
            <div className="animate-on-scroll" style={{transitionDelay: '200ms'}}>
                <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-400/40 transform hover:-translate-y-1"
                >
                    Let's Talk
                </Link>
            </div>
        </section>
      </div>
    </>
  );
};

export default About;
