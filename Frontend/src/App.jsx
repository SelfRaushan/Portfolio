import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Home from './page/Home';
import Footer from './components/Footer';
import About from './page/About';
import Contact from './page/Contact';
import Portfolio from './page/Portfolio';
import Skills from './page/Skills';
import Blog from './page/Blog';

const App = () => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Effect to apply theme class to <html> and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      {/* The theme class is on the <html> tag, so no wrapper div is needed here */}
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />

    </Router>
    
  );
};

export default App;
