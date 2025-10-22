import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-slate-900 pt-20 pb-8 transition-colors duration-300">
      {/* SVG Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-slate-50 dark:text-slate-900 transition-colors duration-300"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Raushan Kumar</h3>
            <p className="mt-2 text-slate-600 dark:text-gray-300">MERN Stack Developer</p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-gray-300">
              <li><Link to="/" className="hover:text-sky-500 dark:hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-sky-500 dark:hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-sky-500 dark:hover:text-white transition-colors duration-300">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-sky-500 dark:hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Connect With Me</h3>
            <div className="mt-4 space-y-3 text-center md:text-right">
              <a href="mailto:raushankumar811305@gmail.com" className="text-slate-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-white transition-colors duration-300">
                raushansingh727308@gmail.com
              </a>
              <div className="flex justify-center md:justify-end space-x-5 mt-3">
                <a href="https://www.linkedin.com/in/raushankumar7273/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-white transition-transform duration-300 transform hover:scale-125">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://github.com/SelfRaushan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-white transition-transform duration-300 transform hover:scale-125">
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} Raushan Kumar. All Rights Reserved.
          </p>
          <button 
            onClick={scrollToTop} 
            className="group mt-4 sm:mt-0 flex items-center gap-2 text-slate-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-white font-semibold transition-colors duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

