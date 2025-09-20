import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyPic from '../assets/MyPic.png';

// Tech icons for the animated row
const techIcons = [
  { name: 'React', icon: <svg fill="currentColor" className="w-8 h-8 text-[#61DAFB]" viewBox="0 0 32 32"><path d="M16 2.05A13.95 13.95 0 0 0 2.05 16 13.95 13.95 0 0 0 16 29.95 13.95 13.95 0 0 0 29.95 16 13.95 13.95 0 0 0 16 2.05zM16 27A11 11 0 1 1 27 16 11 11 0 0 1 16 27z"></path><path d="M16 8.58a1.5 1.5 0 0 0-1.48 1.3L12.9 16l-1.62 6.12a1.5 1.5 0 0 0 2.86.76L16 16.7l1.86 6.18a1.5 1.5 0 0 0 2.86-.76L19.1 16l1.62-6.12A1.5 1.5 0 0 0 19.22 8.5z"></path><circle cx="16" cy="16" r="3.18"></circle></svg> },
  { name: 'Node.js', icon: <svg fill="currentColor" className="w-8 h-8 text-[#68A063]" viewBox="0 0 32 32"><path d="M16 2 L3.22 9 L3.22 23 L16 30 L28.78 23 L28.78 9 Z M14.86 21.64 L12.38 21.64 L12.38 10.36 L15.53 10.36 L18.6 14.81 L18.6 10.36 L20.92 10.36 L20.92 21.64 L17.79 21.64 L14.86 17.36 Z"></path></svg> },
  { name: 'MongoDB', icon: <svg fill="currentColor" className="w-8 h-8 text-[#4DB33D]" viewBox="0 0 32 32"><path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M16,25c-3.2,0-6-1.5-7.8-3.8c-0.6-0.8-0.5-2,0.3-2.6 c0.8-0.6,2-0.5,2.6,0.3C12.4,20.6,14.1,21,16,21c1.9,0,3.6-0.4,4.9-1.2c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 C20.5,23.9,18.3,25,16,25z M20.9,16.5c-0.7,0.4-1.6,0.2-2.1-0.5c-1.3-1.8-3.5-3-5.8-3c-1.9,0-3.6,0.4-4.9,1.2 c-0.7,0.4-1.6,0.2-2.1-0.5C5.4,13,5.6,12.1,6.3,11.6C8.5,10.1,11,9,14,9c4.6,0,8.4,2.9,9.4,7c0.2,0.8-0.3,1.6-1.1,1.8 C21.8,17.9,21.3,17.1,20.9,16.5z"></path></svg> },
  { name: 'JavaScript', icon: <svg className="w-8 h-8"><rect width="32" height="32" rx="4" fill="#F7DF1E"/><path d="M9.4 23.6h2.2l1.6-4.9h4.4l1.6 4.9h2.2L16.2 8.2h-2L9.4 23.6zm4.4-7.1h-2l1-3.1 1 3.1z" fill="#000"/></svg> },
];

const AboutSection = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (y - height / 2) / 10;
    const rotateY = (x - width / 2) / -10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 px-4 bg-slate-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div 
          className="relative w-80 h-80 mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <div
            className="w-full h-full rounded-2xl bg-white dark:bg-slate-700 shadow-2xl transition-transform duration-300 ease-out border-4 border-slate-200 dark:border-slate-600"
            style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d' 
            }}
          >
            <img
              src={MyPic}
              alt="Raushan Kumar"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              style={{ transform: 'translateZ(20px)' }}
            />
             <div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"
              style={{ transform: 'translateZ(21px)' }}
            ></div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">
            Crafting Digital Solutions, One Line at a Time.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
            I'm a MERN stack developer with a passion for building beautiful and functional user interfaces. I thrive on turning complex problems into simple, elegant solutions that leave a lasting impact.
          </p>
          <div className="flex items-center gap-4 mb-8">
            {techIcons.map(tech => (
              <div key={tech.name} className="p-2 bg-slate-200 dark:bg-slate-700/50 rounded-full" title={tech.name}>
                {tech.icon}
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="group text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 font-semibold text-lg inline-flex items-center gap-2"
          >
            Learn More <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

