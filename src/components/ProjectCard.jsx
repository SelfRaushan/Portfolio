import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, techStack, projectUrl }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll-reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    setIsHovered(true);
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 15;
    const rotateY = (x - rect.width / 2) / -15;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  const glowStyle = {
    '--glow-x': `${glowPosition.x}px`,
    '--glow-y': `${glowPosition.y}px`,
    opacity: isHovered ? 1 : 0,
  };

  return (
    <>
      <style>{`
        .card-glow::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(56, 189, 248, 0.2), transparent 40%);
          border-radius: inherit;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }
      `}</style>
      <div
        ref={cardRef}
        className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ perspective: '1000px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="card-glow relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-out border border-slate-200 dark:border-slate-700"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          <div style={glowStyle} className="absolute inset-0"></div>

          <div className="relative h-64 overflow-hidden border-b border-slate-200 dark:border-slate-700">
            <iframe
              src={projectUrl}
              title={title}
              className="absolute inset-0 w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110 pointer-events-none"
              frameBorder="0"
              scrolling="no"
            ></iframe>
             <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"></a>
          </div>
          
          <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative z-20">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 h-16">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-sky-100 dark:bg-sky-900/70 text-sky-800 dark:text-sky-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 font-semibold text-sm transition-colors duration-300"
            >
              Visit Website <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;

