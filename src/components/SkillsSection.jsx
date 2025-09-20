import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Curated list of top skills with improved, more recognizable icons ---
const topSkills = [
  { name: 'React', icon: <svg fill="currentColor" className="w-10 h-10 text-[#61DAFB]" viewBox="0 0 32 32"><path d="M16 2.05A13.95 13.95 0 0 0 2.05 16 13.95 13.95 0 0 0 16 29.95 13.95 13.95 0 0 0 29.95 16 13.95 13.95 0 0 0 16 2.05zM16 27A11 11 0 1 1 27 16 11 11 0 0 1 16 27z"></path><path d="M16 8.58a1.5 1.5 0 0 0-1.48 1.3L12.9 16l-1.62 6.12a1.5 1.5 0 0 0 2.86.76L16 16.7l1.86 6.18a1.5 1.5 0 0 0 2.86-.76L19.1 16l1.62-6.12A1.5 1.5 0 0 0 19.22 8.5z"></path><circle cx="16" cy="16" r="3.18"></circle></svg> },
  { name: 'Node.js', icon: <svg fill="currentColor" className="w-10 h-10 text-[#68A063]" viewBox="0 0 32 32"><path d="M16 2 L3.22 9 L3.22 23 L16 30 L28.78 23 L28.78 9 Z M14.86 21.64 L12.38 21.64 L12.38 10.36 L15.53 10.36 L18.6 14.81 L18.6 10.36 L20.92 10.36 L20.92 21.64 L17.79 21.64 L14.86 17.36 Z"></path></svg> },
  // JS Icon now has a black fill for light mode
  { name: 'JavaScript', icon: <svg className="w-10 h-10"><rect width="32" height="32" rx="4" fill="#F7DF1E"/><path d="M9.4 23.6h2.2l1.6-4.9h4.4l1.6 4.9h2.2L16.2 8.2h-2L9.4 23.6zm4.4-7.1h-2l1-3.1 1 3.1z" fill="#000"/></svg> },
  { name: 'MongoDB', icon: <svg fill="currentColor" className="w-10 h-10 text-[#4DB33D]" viewBox="0 0 32 32"><path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M16,25c-3.2,0-6-1.5-7.8-3.8c-0.6-0.8-0.5-2,0.3-2.6 c0.8-0.6,2-0.5,2.6,0.3C12.4,20.6,14.1,21,16,21c1.9,0,3.6-0.4,4.9-1.2c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 C20.5,23.9,18.3,25,16,25z M20.9,16.5c-0.7,0.4-1.6,0.2-2.1-0.5c-1.3-1.8-3.5-3-5.8-3c-1.9,0-3.6,0.4-4.9,1.2 c-0.7,0.4-1.6,0.2-2.1-0.5C5.4,13,5.6,12.1,6.3,11.6C8.5,10.1,11,9,14,9c4.6,0,8.4,2.9,9.4,7c0.2,0.8-0.3,1.6-1.1,1.8 C21.8,17.9,21.3,17.1,20.9,16.5z"></path></svg> },
  { name: 'Tailwind CSS', icon: <svg fill="currentColor" className="w-10 h-10 text-[#38BDF8]" viewBox="0 0 32 32"><path d="M9.548 17.152c.996-1.991 3.983-3.982 7.965-3.982 3.983 0 6.97 1.991 7.966 3.982-1.992.995-3.983 2.986-3.983 5.978 0 2.993 1.99 4.984 3.983 5.979-1.002 1.99-3.983 3.981-7.966 3.981s-6.97-1.991-7.965-3.981c1.991-.995 3.982-2.986 3.982-5.979 0-2.992-1.99-4.983-3.982-5.978zM16.452 2c-.996 1.991-3.983 3.982-7.966 3.982-3.982 0-6.97-1.991-7.965-3.982 1.99-.996 3.982-2.987 3.982-5.979C4.503-2.986 2.512-4.977.52-5.972c1.002-1.99 3.983-3.981 7.965-3.981s6.97 1.991 7.966 3.981c-1.991.995-3.982 2.986-3.982 5.978 0 2.993 1.991 4.984 3.982 5.973z"></path></svg> },
  { name: 'Express.js', icon: <svg fill="currentColor" className="w-10 h-10 text-gray-800 dark:text-gray-300" viewBox="0 0 32 32"><path d="M2 2h28v28H2z" fill="#303030"></path><path d="M9,11.5c-0.3-0.6-0.8-1-1.3-1.3c-0.6-0.2-1.2-0.2-1.8,0C5.1,10.5,4.5,11,4,11.7c-0.5,0.7-0.7,1.5-0.7,2.3 c0,0.8,0.2,1.6,0.7,2.3c0.5,0.7,1.1,1.2,1.9,1.4c0.6,0.2,1.2,0.2,1.8,0c0.5-0.2,1-0.7,1.3-1.3L9,11.5z M6.4,16.3 c-0.3,0-0.6-0.1-0.9-0.4c-0.2-0.2-0.4-0.6-0.4-0.9c0-0.4,0.1-0.7,0.4-0.9c0.2-0.2,0.6-0.4,0.9-0.4s0.6,0.1,0.9,0.4 c0.2,0.2,0.4,0.6,0.4,0.9c0,0.4-0.1,0.7-0.4,0.9C7,16.2,6.7,16.3,6.4,16.3z M28,17.4l-5-10.8h-3l5,10.8L28,17.4z M21,17.4l-5-10.8 h-3l5,10.8L21,17.4z"></path></svg> },
  { name: 'Git & GitHub', icon: <svg fill="currentColor" className="w-10 h-10 text-gray-800 dark:text-gray-300" viewBox="0 0 32 32"><path d="M16 2C8.268 2 2 8.268 2 16a14 14 0 009.67 13.245c.7.13.955-.304.955-.675 0-.332-.012-1.215-.02-2.385-3.86.84-4.675-1.86-4.675-1.86-.636-1.615-1.554-2.045-1.554-2.045-1.27-.868.096-.85.096-.85 1.404.1 2.145 1.44 2.145 1.44 1.25 2.14 3.28 1.52 4.08.165.127-.975.488-1.52.89-1.87-3.11-.355-6.38-1.55-6.38-6.915 0-1.528.547-2.78 1.44-3.76-.145-.355-.624-1.78.136-3.705 0 0 1.175-.375 3.85 1.43a13.3 13.3 0 017 0c2.675-1.805 3.85-1.43 3.85-1.43.76 1.925.28 3.35.136 3.705.893.98 1.44 2.232 1.44 3.76 0 5.38-3.27 6.555-6.4 6.905.5.43.95 1.29.95 2.6 0 1.875-.017 3.385-.017 3.845 0 .375.25.81.96.67A14.002 14.002 0 0030 16C30 8.268 23.732 2 16 2z"></path></svg> },
];

const SkillsMarquee = () => {
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const extendedSkills = [...topSkills, ...topSkills];

  useEffect(() => {
    const scroll = () => {
      if (scrollContainerRef.current && !isHovered) {
        scrollContainerRef.current.scrollLeft += 0.5;
        const { scrollLeft, scrollWidth } = scrollContainerRef.current;
        if (scrollLeft >= scrollWidth / 2) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scroll);
    };
    animationFrameRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isHovered]);

  const handleManualScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 224;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <section className="py-20 px-4 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        <div 
          className="relative group w-full max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={scrollContainerRef}
            className="relative flex w-full overflow-x-auto no-scrollbar"
          >
            {extendedSkills.map((skill, index) => (
              <div key={index} className="flex-shrink-0 w-48 h-32 mx-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-all duration-300 hover:!scale-110 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/20">
                <div className="text-slate-800 dark:text-slate-300">
                  {skill.icon}
                </div>
                <p className="mt-2 font-semibold text-slate-800 dark:text-white">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleManualScroll('left')}
            className="absolute top-1/2 left-0 -translate-y-1/2 z-20 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-white p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 shadow-md"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleManualScroll('right')}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-20 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-white p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 shadow-md"
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-slate-100 dark:from-slate-900 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-slate-100 dark:from-slate-900 to-transparent pointer-events-none"></div>
        </div>
      </section>
    </>
  );
};

export default SkillsMarquee;

