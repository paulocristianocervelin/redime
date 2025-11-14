'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AdminSidebarProps {
  user: {
    name: string;
    email?: string | null;
    role: string;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user.role === 'ADMIN';

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: 'Departamentos',
      href: '/admin/departments',
      icon: Building2,
      show: isAdmin, // Apenas admin
    },
    {
      name: 'Membros',
      href: '/admin/members',
      icon: Users,
      show: true, // Admin e Leader
    },
    // Configurações - TODO: Implementar futuramente
    // {
    //   name: 'Configurações',
    //   href: '/admin/settings',
    //   icon: Settings,
    //   show: isAdmin,
    // },
  ].filter((item) => item.show);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const SidebarContent = () => (
    <>
      {/* Header com gradiente e logo */}
      <div className="px-6 py-8 gradient-bg-blue">
        <div className="mb-4">
          <Image
            src="/imagens/logo_Prancheta-red.png"
            alt="Missão Redime Logo"
            width={180}
            height={60}
            className="mb-3"
            priority
          />
          <h2 className="text-lg font-semibold text-white/90">Painel Admin</h2>
        </div>
        <p className="text-sm text-white/90 mt-2">{user.name}</p>
        <p className="text-xs text-white/70 mt-1 px-2 py-1 bg-white/10 rounded-full inline-block">{user.role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={
                isActive
                  ? 'flex items-center gap-3 px-4 py-3 rounded-lg transition-elegant bg-black text-white shadow-sm font-semibold'
                  : 'flex items-center gap-3 px-4 py-3 rounded-lg transition-elegant text-gray-700 hover:bg-gray-200'
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-100">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-200 transition-elegant"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md hover:shadow-lg border-gray-200"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-elegant z-40
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
