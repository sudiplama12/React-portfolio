'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Projects failed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-2xl font-bold text-slate-600">Loading Projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-emerald-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            My Projects
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Handcrafted with love. Every project tells a story of problem-solving and innovation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-4 hover:border-emerald-300 transition-all duration-700 shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-8 h-64 bg-slate-200">
                <img 
                  src={project.image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop'} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-6 group-hover:text-emerald-600 transition-all duration-500">
                  {project.title}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed line-clamp-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.techStack?.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-5 py-2 bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all group-hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6 pt-6 border-t border-slate-200/50">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      className="text-emerald-600 hover:text-emerald-700 font-bold text-xl flex items-center gap-2 group-hover:translate-x-3 transition-all duration-500 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      className="ml-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-500"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA if no projects */}
        {projects.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-8">🚀</div>
            <h2 className="text-4xl font-black text-slate-600 dark:text-slate-400 mb-8">
              No Projects Yet
            </h2>
            <Link 
              href="/admin/projects"
              className="inline-block px-12 py-6 bg-emerald-600 text-white text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:bg-emerald-700"
            >
              Add Your First Project →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}