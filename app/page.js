'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then(res => setProjects(res.data.slice(0, 3)))
      .catch(err => console.error('Projects fetch failed:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-emerald-600 bg-clip-text text-transparent mb-8 animate-pulse">
          Hi, I'm <span className="text-emerald-500">SUDIP LAMA TAMANG</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Full-Stack Developer crafting beautiful, performant web experiences with modern technologies and stock market trader.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/projects">
            <div className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 hover:bg-emerald-700">
              View My Work
            </div>
          </Link>
          <Link href="/contact">
            <div className="px-10 py-5 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all duration-300">
              Get In Touch
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project._id} className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:border-emerald-300">
              <div className="relative overflow-hidden rounded-2xl mb-6 h-48">
                <img 
                  src={project.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    GitHub →
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" className="ml-auto bg-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}