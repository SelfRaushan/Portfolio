import React, { useEffect, useRef } from 'react';
import { Database, Terminal, Code, Wind } from 'lucide-react';

// --- Enhanced Data for the Skills Page ---
// Added color properties for dynamic styling
const skillsData = [
  {
    category: 'Frontend Development',
    icon: <Code size={32} />,
    color: 'text-sky-500',
    barColor: 'bg-sky-500',
    skills: [
      { name: 'React & Next.js', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Redux Toolkit', level: 85 },
    ],
  },
  {
    category: 'Backend Development',
    icon: <Terminal size={32} />,
    color: 'text-green-500',
    barColor: 'bg-green-500',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 95 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
      { name: 'Authentication (JWT)', level: 85 },
    ],
  },
  {
    category: 'Databases & DevOps',
    icon: <Database size={32} />,
    color: 'text-amber-500',
    barColor: 'bg-amber-500',
    skills: [
      { name: 'MongoDB & Mongoose', level: 90 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Docker', level: 75 },
      { name: 'Git & GitHub', level: 95 },
      { name: 'Vercel & Netlify', level: 90 },
    ],
  },
    {
    category: 'Soft Skills & Methodologies',
    icon: <Wind size={32} />,
    color: 'text-indigo-500',
    barColor: 'bg-indigo-500',
    skills: [
      { name: 'Agile & Scrum', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Team Collaboration', level: 98 },
      { name: 'Code Review', level: 90 },
      { name: 'Communication', level: 95 },
    ],
  },
];

// Custom hook for observing elements on scroll (no changes needed here)
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

    return () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.unobserve(el));
      }
      observer.disconnect();
    };
  }, [options]);
  return containerRef;
};


const Skills = () => {
  const containerRef = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .proficiency-bar-inner {
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          width: 0%;
        }
        .is-visible .proficiency-bar-inner {
          width: var(--level);
        }
      `}</style>


      {/* SEO */}
      <title>Technical Skills | Rausah Kumar</title>
      <meta name="description" content="A detailed overview of my technical skills, including proficiency in JavaScript, React.js, Node.js, CSS, HTML, and other technologies." />

      

      <div ref={containerRef} className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] sm:w-[100%] sm:h-[100%] z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-transparent to-indigo-100 dark:from-sky-900/30 dark:via-transparent dark:to-indigo-900/30 opacity-60"></div>
        </div>

        <div className="relative z-10">
          {/* Page Header */}
          <section className="py-20 md:py-24 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 animate-on-scroll tracking-tight">
              The Anatomy of My Expertise
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              "Tools are just tools. It is the craftsman who masters them that creates true value. Here is a look at my digital toolkit."
            </p>
          </section>

          {/* Skills Grid */}
          <section className="pb-24 pt-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {skillsData.map((category, index) => (
                <div 
                  key={category.category} 
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-on-scroll"
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    {React.cloneElement(category.icon, { className: category.color })}
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{category.category}</h2>
                  </div>
                  <div className="space-y-6">
                    {category.skills.map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full proficiency-bar-inner ${category.barColor}`}
                            style={{ '--level': `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Skills;