import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo 2.png';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  // Effect to detect scroll for header styling changes and close mobile menu on navigation
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    // Close mobile menu on route change for a better UX
    setIsMobileMenuOpen(false);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); // Re-run effect when location changes

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/skills', text: 'Skills' },
    { to: '/portfolio', text: 'Portfolio' },
    { to: '/blog', text: 'Blog' },
    { to: '/contact', text: 'Contact' },
  ];

  // Consolidate dynamic classes for the header background to fix theme issues
  const headerDynamicClasses = hasScrolled
    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md border-b border-slate-200 dark:border-slate-800'
    : 'bg-gray-200 dark:bg-slate-800 border-b border-transparent'; // Use gray for light mode base as requested

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerDynamicClasses}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="transition-transform duration-300 hover:scale-105 block">
                <img src={Logo} alt="Logo" className="h-36 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 group ${
                      isActive
                        ? 'text-sky-500 dark:text-sky-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400'
                    }`}
                  >
                    {link.text}
                    {isActive ? (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
                    ) : (
                      <span className="absolute bottom-1 left-0 w-full h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-slate-800 focus:ring-sky-500 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                  <Sun size={20} className={`absolute transition-all duration-300 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
                  <Moon size={20} className={`absolute transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
                </div>
              </button>
              <Link
                to="/contact"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-500 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-slate-800 focus:ring-sky-500"
              >
                Hire Me
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 rounded-md text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-gray-200 dark:bg-slate-800 shadow-lg transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[120%]'
          }`}
          style={{ visibility: isMobileMenuOpen ? 'visible' : 'hidden' }}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-semibold transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-white bg-sky-500'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {link.text}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-6 border-t border-slate-300 dark:border-slate-700">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-grow text-center py-3 px-4 text-base font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors duration-300"
              >
                Hire Me
              </Link>
              <button
                onClick={toggleTheme}
                className="p-3 ml-4 rounded-full text-slate-700 dark:text-slate-300 bg-slate-300 dark:bg-slate-700"
                aria-label="Toggle theme"
              >
                <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                  <Sun size={20} className={`absolute transition-all duration-300 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
                  <Moon size={20} className={`absolute transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
