'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function ProjectCard({ project }) {
  return (
    <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-emerald-300">
      <div className="relative overflow-hidden rounded-2xl mb-6 h-64">
        <img 
          src={project.image || 'https://via.placeholder.com/500x300?text=No+Image'} 
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
      <div className="flex gap-4">
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            GitHub →
          </a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" className="ml-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

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
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center">Loading projects...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 to-emerald-600 bg-clip-text text-transparent mb-6">
          Projects
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Every project I've built and shipped
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center py-32">
          <h2 className="text-3xl font-bold text-slate-600 mb-8">No projects yet</h2>
          <Link href="/admin/projects" className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700">
            Add First Project →
          </Link>
        </div>
      )}
    </div>
  );
}