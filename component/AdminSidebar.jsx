'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FolderOpen, FileText, Briefcase, 
  Users, MessageCircle, Settings, BarChart3 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/experience', label: 'Experience', icon: Briefcase },
    { href: '/admin/education', label: 'Education', icon: Users },
    { href: '/admin/contact', label: 'Contact', icon: MessageCircle },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-white/90 to-slate-50/90 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl h-screen p-8 sticky top-0">
      {/* Logo */}
      <Link href="/admin" className="mb-12 pb-8 border-b border-slate-200/50 block">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-xl">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white drop-shadow-lg">Admin</h1>
            <p className="text-white/80 text-sm font-medium">Portfolio CMS</p>
          </div>
        </div>
      </Link>

      {/* Menu */}
      <nav className="space-y-2 mb-12">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 font-semibold text-lg group ${
                active
                  ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-400/30 -translate-x-2 rotate-1'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white hover:shadow-md hover:-translate-x-1'
              }`}
            >
              <Icon 
                size={24} 
                className={`transition-all duration-300 ${
                  active ? 'drop-shadow-lg scale-110' : 'group-hover:scale-110'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status Footer */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/40 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-bold text-emerald-700 dark:text-emerald-400">Live</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Synced {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}