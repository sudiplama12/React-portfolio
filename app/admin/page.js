'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState({ projects: 0, blogPosts: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      ]);
      setStats({ projects: projectsRes.data.length, blogPosts: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: 'admin@example.com',
        password: 'password123'
      });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      fetchStats();
    } catch (error) {
      alert('Backend not running? Start: cd backend && npm run dev');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-slate-200/50">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <button 
            onClick={handleLogin}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 shadow-xl hover:shadow-2xl transition-all"
          >
            Login
          </button>
          <p className="text-center text-sm text-slate-500 mt-4 bg-slate-100 p-3 rounded-xl">
            admin@example.com / password123
          </p>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Backend must run on port 5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
            }}
            className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Link href="/admin/projects">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group hover:border-emerald-300">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600">Projects</h3>
              <p className="text-3xl font-black text-slate-900">{stats.projects}</p>
            </div>
          </Link>
          
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group hover:border-blue-300">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600">Blog</h3>
            <p className="text-3xl font-black text-slate-900">{stats.blogPosts}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/admin/projects" className="group">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all group-hover:from-emerald-600 group-hover:to-emerald-700">
              <div className="text-5xl mb-6">🚀</div>
              <h3 className="text-2xl font-black mb-4 text-center">Manage Projects</h3>
              <p className="text-center opacity-90">Add/Edit/Delete showcase projects</p>
            </div>
          </Link>
          
          <Link href="/admin/blog" className="group">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all group-hover:from-blue-600 group-hover:to-blue-700">
              <div className="text-5xl mb-6">✍️</div>
              <h3 className="text-2xl font-black mb-4 text-center">Blog Posts</h3>
              <p className="text-center opacity-90">Write & publish articles</p>
            </div>
          </Link>
          
          <Link href="/admin/experience" className="group">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all group-hover:from-purple-600 group-hover:to-purple-700">
              <div className="text-5xl mb-6">💼</div>
              <h3 className="text-2xl font-black mb-4 text-center">Experience</h3>
              <p className="text-center opacity-90">Update work history</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}