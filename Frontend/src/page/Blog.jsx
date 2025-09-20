import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BlogIdeaGenerator from '../components/BlogIdeaGenerator';
import { ArrowRight } from 'lucide-react';

// --- Placeholder Data for Blog Posts ---
const featuredPost = {
  link: '/blog/mastering-redux-toolkit', // The actual link to the blog post page
  image: 'https://placehold.co/1200x600/1e293b/94a3b8?text=Featured+Post',
  category: 'Web Development',
  date: 'September 20, 2025',
  title: 'Mastering State Management in React with Redux Toolkit',
  excerpt: 'A deep dive into the modern, efficient way to handle complex application state in React. Learn how to simplify your reducers, manage async logic with createAsyncThunk, and build scalable apps with ease.'
};

const recentPosts = [
  {
    link: '#', // Placeholder link
    image: 'https://placehold.co/600x400/334155/94a3b8?text=Post+1',
    category: 'API Design',
    date: 'September 15, 2025',
    title: 'Building a RESTful API with Node.js and Express',
    excerpt: 'Learn the fundamentals of creating a robust and secure backend API from scratch.'
  },
  {
    link: '#', // Placeholder link
    image: 'https://placehold.co/600x400/475569/94a3b8?text=Post+2',
    category: 'Styling',
    date: 'September 10, 2025',
    title: 'Why Tailwind CSS is My Go-To for Rapid UI Development',
    excerpt: 'An exploration of utility-first CSS and how it streamlines the design and development process.'
  },
    {
    link: '#', // Placeholder link
    image: 'https://placehold.co/600x400/0f172a/94a3b8?text=Post+3',
    category: 'Productivity',
    date: 'September 5, 2025',
    title: 'My Daily Routine as a Remote Developer',
    excerpt: 'A look into the habits, tools, and mindset that keep me productive and passionate while working from home.'
  },
];

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
        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
            elements.forEach(el => observer.observe(el));
        }
        return () => observer.disconnect();
    }, [options]);
    return containerRef;
};

const Blog = () => {
  const containerRef = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      <style>{`
        .animate-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <div ref={containerRef} className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        
        <section className="py-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 animate-on-scroll">
            From My Desk to Yours
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            "Sharing knowledge is the best way to learn. Here are my thoughts on code, design, and everything in between."
          </p>
        </section>

        {/* Featured Post */}
        <section className="px-4 pb-20">
            <div className="max-w-6xl mx-auto animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                <Link to={featuredPost.link} className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden md:grid md:grid-cols-2 items-center transition-all duration-300 hover:shadow-2xl">
                    <div className="relative h-64 md:h-full">
                        <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-8 md:p-12">
                        <p className="text-sm font-semibold text-sky-500 dark:text-sky-400 mb-2">{featuredPost.category} &bull; {featuredPost.date}</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{featuredPost.title}</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{featuredPost.excerpt}</p>
                        <span className="inline-flex items-center gap-2 font-semibold text-sky-500 dark:text-sky-400">
                            Read More <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                        </span>
                    </div>
                </Link>
            </div>
        </section>
        
        {/* Recent Posts Grid */}
        <section className="bg-slate-200 dark:bg-slate-800/50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">Recent Posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 150}ms` }}>
                            <Link to={post.link} className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="p-6">
                                    <p className="text-sm font-semibold text-sky-500 dark:text-sky-400 mb-2">{post.category} &bull; {post.date}</p>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{post.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{post.excerpt}</p>
                                    <span className="font-semibold text-sm text-sky-500 dark:text-sky-400">Read More &rarr;</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* AI Idea Generator Section */}
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto text-center">
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 animate-on-scroll">Stuck on Ideas?</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                    Use this AI-powered tool to generate some creative blog post ideas. It's a small demonstration of what's possible with the Gemini API.
                </p>
                <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                    <BlogIdeaGenerator />
                </div>
            </div>
        </section>

      </div>
    </>
  );
};

export default Blog;

