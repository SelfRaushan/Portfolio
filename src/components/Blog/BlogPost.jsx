import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Linkedin, Twitter, Copy, Check, Calendar, Clock, ArrowRight } from 'lucide-react';
import { allPosts } from '../../blogData.js';

// --- Helper Components ---

const CodeBlock = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = code;
    navigator.clipboard.writeText(textarea.value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-lg my-6 overflow-hidden border border-slate-300 dark:border-slate-700">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-300 dark:bg-slate-700">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">javascript</span>
        <button onClick={copyToClipboard} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 text-xs font-semibold">
          {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: code }}></code></pre>
    </div>
  );
};

const ReadingProgressBar = () => {
    const [width, setWidth] = useState(0);
    const scrollListener = () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setWidth((window.scrollY / totalHeight) * 100);
    };
    useEffect(() => {
        window.addEventListener('scroll', scrollListener, { passive: true });
        return () => window.removeEventListener('scroll', scrollListener);
    }, []);
    return <div style={{ width: `${width}%` }} className="fixed top-0 left-0 z-50 h-1 bg-sky-500" />;
};

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

// --- Main Blog Post Component ---
const BlogPost = () => {
    const { slug } = useParams();
    const postData = allPosts.find(post => post.slug === slug);
    const containerRef = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!postData) {
        return <Navigate to="/blog" replace />;
    }

    const { title, category, date, readTime, author, image, content } = postData;
    const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(title);

    const renderContent = () => {
        const parts = content.split(/(<pre>[\s\S]*?<\/pre>)/g);
        return parts.map((part, index) => {
            if (part.startsWith('<pre>')) {
                const codeMatch = part.match(/<code[^>]*>([\s\S]*?)<\/code>/);
                const code = codeMatch ? codeMatch[1] : '';
                return <CodeBlock key={index} code={code} />;
            }
            return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        });
    };

  return (
    <>
      <style>{`
        .animate-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .prose-custom h2 { margin-top: 2.5em; margin-bottom: 1.5em; font-weight: 700; color: #1e293b; } .dark .prose-custom h2 { color: #fff; }
        .prose-custom h3 { margin-top: 2em; margin-bottom: 1em; font-weight: 600; color: #334155; } .dark .prose-custom h3 { color: #cbd5e1; }
        .prose-custom p, .prose-custom li { color: #475569; } .dark .prose-custom p, .dark .prose-custom li { color: #94a3b8; }
        .prose-custom a { color: #0ea5e9; text-decoration: underline; } .dark .prose-custom a { color: #38bdf8; }
        .prose-custom code:not(pre code) { background-color: #e2e8f0; color: #1e293b; padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.9em; }
        .dark .prose-custom code:not(pre code) { background-color: #334155; color: #e2e8f0; }
      `}</style>
      <ReadingProgressBar />
      <div ref={containerRef} className="bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
          <header className="text-center mb-12 animate-on-scroll">
            <p className="text-sky-500 dark:text-sky-400 font-semibold mb-2">{category}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">{title}</h1>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <img src={author.pic} alt={author.name} className="w-8 h-8 rounded-full" />
                    <span>By {author.name}</span>
                </div>
                <div className="flex items-center gap-2"><Calendar size={16} /><span>{date}</span></div>
                <div className="flex items-center gap-2"><Clock size={16} /><span>{readTime}</span></div>
            </div>
          </header>

          <img src={image} alt={title} className="w-full h-auto rounded-xl shadow-lg mb-12 animate-on-scroll" style={{transitionDelay: '100ms'}} />

          <article className="prose-custom max-w-none text-lg leading-relaxed">
            <div className="animate-on-scroll" style={{transitionDelay: '200ms'}}>
                {renderContent()}
            </div>
          </article>
          
           <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 animate-on-scroll">
                <div className="flex flex-wrap justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-800 dark:text-white">Share this post:</span>
                        <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                            <Twitter size={20} className="text-slate-600 dark:text-slate-300" />
                        </a>
                         <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${postTitle}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                            <Linkedin size={20} className="text-slate-600 dark:text-slate-300" />
                        </a>
                    </div>
                </div>
            </footer>
            
            <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 animate-on-scroll">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">You might also like...</h2>
                <div className="space-y-6">
                    {relatedPosts.map(post => (
                        <Link to={`/blog/${post.slug}`} key={post.slug} className="group block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                           <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">{post.title}</h3>
                                <ArrowRight className="text-slate-400 dark:text-slate-500 group-hover:text-sky-500 transition-all duration-300 group-hover:translate-x-1" size={20} />
                           </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
