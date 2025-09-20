import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fullText = "MERN Stack Developer Building Modern Web Experiences.";

  // Effect for the typing animation
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [typedText]);

  // Effect for the interactive background
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = (factor) => ({
    transform: `translateX(${mousePosition.x / factor}px) translateY(${mousePosition.y / factor}px)`,
    transition: 'transform 0.1s ease-out',
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-slate-100 dark:bg-slate-900 py-20 px-4 transition-colors duration-300">
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0">
        <div style={parallaxStyle(50)} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 dark:opacity-20"></div>
        <div style={parallaxStyle(100)} className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-radial-gradient-at-center from-sky-500/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-slate-800 dark:text-white drop-shadow-lg">
          Raushan Kumar
        </h1>
        <h2 className="text-2xl md:text-4xl text-sky-600 dark:text-sky-300 mb-6 font-mono h-16 md:h-10">
          {typedText}
          <span className="animate-ping">|</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 drop-shadow-sm dark:drop-shadow-md">
          A passionate developer focused on creating high-quality, responsive, and performant web applications.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Link
            to="/portfolio"
            className="group flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-400/40 transform hover:-translate-y-1"
          >
            View My Work <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="/public/Raushan_Kumar_Resume.pdf"
            download
            className="group flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-slate-700/20 hover:shadow-xl hover:shadow-slate-600/40 transform hover:-translate-y-1"
          >
            Download Resume <Download className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

