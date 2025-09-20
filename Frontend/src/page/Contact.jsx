import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Send, User, Briefcase, MessageSquare, ArrowRight, Calendar } from 'lucide-react';

const CONTACT_EMAIL = "raushansingh727308@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/raushankumar7273/";
const GITHUB_URL = "https://github.com/SelfRaushan";
const CALENDLY_URL = "https://calendly.com/rkcrater7"; // **IMPORTANT**: Update with your Calendly link

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

const Contact = () => {
  const containerRef = useIntersectionObserver({ threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', reason: 'Project Inquiry', message: '' });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus("Sending your message...");

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      setStatus(data.msg || 'Message sent successfully!');
      setForm({ name: '', email: '', reason: 'Project Inquiry', message: '' });
    })
    .catch(error => {
      console.error('Error sending message:', error);
      setStatus('Failed to send message. Please try again later.');
    });
  };

  return (
    <>
      <style>{`
        .animate-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .bg-animated-gradient {
            background: linear-gradient(-45deg, #ecfccb, #f0f9ff, #f5f3ff, #faf5ff);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        .dark .bg-animated-gradient {
            background: linear-gradient(-45deg, #1e3a8a, #312e81, #1e293b, #0f172a);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
      `}</style>
      <div ref={containerRef} className="min-h-screen bg-animated-gradient flex items-center justify-center py-20 px-4 transition-all duration-300">
        <div className="max-w-6xl w-full mx-auto">
            <div className="text-center mb-16">
                 <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 animate-on-scroll">
                    Let's Create Together
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                    Have a project in mind, a job opportunity, or just want to say hello? I'd love to hear from you.
                </p>
            </div>
          
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-lg grid md:grid-cols-2 gap-0 overflow-hidden border border-white/30 dark:border-slate-800/50 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                {/* Left: Contact Form */}
                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-sky-500 to-violet-600 bg-clip-text text-transparent">
                        Send Me a Message
                    </h2>
                    
                    {/* Form Fields */}
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                        <input required type="text" name="name" id="name" className="w-full px-4 py-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-400/50 outline-none" value={form.name} onChange={handleChange} />
                    </div>
                     <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <input required type="email" name="email" id="email" className="w-full px-4 py-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-400/50 outline-none" value={form.email} onChange={handleChange} />
                    </div>
                     <div>
                        <label htmlFor="reason" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Reason for Contacting</label>
                        <select name="reason" id="reason" className="w-full px-4 py-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-400/50 outline-none" value={form.reason} onChange={handleChange}>
                            <option>Project Inquiry</option>
                            <option>Job Offer</option>
                            <option>Collaboration</option>
                            <option>Mentorship / Advice</option>
                            <option>General Question</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Message</label>
                        <textarea required name="message" id="message" rows={4} className="w-full px-4 py-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-400/50 outline-none" value={form.message} onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="w-full py-3 px-6 rounded-lg font-bold bg-gradient-to-r from-sky-500 to-violet-500 text-white hover:from-violet-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-sky-500/30 flex items-center justify-center gap-2">
                        <Send size={18} /> Send Message
                    </button>
                    {status && <div className="text-center text-sky-600 dark:text-sky-400 text-sm py-1">{status}</div>}
                </form>

                {/* Right: Contact Info & Links */}
                <div className="bg-slate-100/50 dark:bg-slate-800/50 p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Other Ways to Connect</h3>
                    
                    <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300">
                        <Mail className="text-sky-500" size={24} />
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-white">Email Me Directly</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{CONTACT_EMAIL}</p>
                        </div>
                    </a>

                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300">
                        <Linkedin className="text-sky-500" size={24} />
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-white">Connect on LinkedIn</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Professional Profile</p>
                        </div>
                    </a>

                     <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300">
                        <Github className="text-sky-500" size={24} />
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-white">View My Code on GitHub</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Repositories and Contributions</p>
                        </div>
                    </a>

                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-lg bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors duration-300">
                        <Calendar className="text-green-500" size={24} />
                        <div>
                            <p className="font-semibold text-green-800 dark:text-green-300">Schedule a Meeting</p>
                            <p className="text-sm text-green-600 dark:text-green-400">Let's find a time to chat!</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
