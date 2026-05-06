'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`)
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-20">Blog</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <Link key={post._id} href={`/blog/${post._id}`} className="block">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl hover:shadow-xl transition-all border">
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-slate-600 mb-4">{post.excerpt || post.content.slice(0, 150)}...</p>
              <span className="text-emerald-600 font-semibold">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}