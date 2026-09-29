import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  PenTool,
  AlertOctagon,
  FileCheck2,
  FileSpreadsheet,
  Award,
  TrendingUp,
  BarChart3,
  Calendar,
  FolderArchive,
  BookMarked,
  Settings,
  Atom,
  PenLine,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

interface NavItem {
  id: AppRoute;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string | number;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, setMobileOpen }) => {
  const { route, setRoute, mistakes, theme } = useApp();

  const unresolvedMistakesCount = mistakes.filter(m => !m.resolved).length;

  const navGroups: NavGroup[] = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'STUDY',
      items: [
        { id: 'subjects', label: 'Subjects', icon: BookOpen },
        { id: 'notes', label: 'Study Notes', icon: PenLine },
        { id: 'question-bank', label: 'Question Bank', icon: HelpCircle },
        { id: 'practice', label: 'Practice', icon: PenTool },
        {
          id: 'mistakes',
          label: 'Mistakes',
          icon: AlertOctagon,
          badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined,
        },
      ],
    },
    {
      group: 'ASSESS',
      items: [
        { id: 'mock-test', label: 'Mock Test', icon: FileCheck2 },
        { id: 'pattern-paper', label: 'Pattern Paper', icon: FileSpreadsheet },
        { id: 'results', label: 'Results', icon: Award },
      ],
    },
    {
      group: 'TRACK',
      items: [
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'question-analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'planner', label: 'Planner', icon: Calendar },
      ],
    },
    {
      group: 'RESOURCES',
      items: [
        { id: 'resources', label: 'Resources', icon: FolderArchive },
        { id: 'ib-resources', label: 'IB Resources', icon: BookMarked },
      ],
    },
  ];

  const handleNavClick = (id: AppRoute) => {
    setRoute(id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[240px] flex flex-col transition-transform duration-200 ease-out border-r backdrop-blur-md ${
        isDark
          ? 'bg-[#0D1322]/95 border-[#1E293B] text-slate-300'
          : 'bg-[#FFFFFF]/95 border-[#E2E8F0] text-slate-700'
      } ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className={`h-14 flex items-center justify-between px-5 border-b ${
        isDark ? 'border-[#1E293B]' : 'border-[#E2E8F0]'
      }`}>
        <button
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Atom size={18} className="transition-transform group-hover:rotate-45" />
          </div>
          <div>
            <div className={`text-sm font-bold tracking-wider font-mono uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              STUDYFLOW
            </div>
            <div className="text-[10px] text-indigo-400 font-mono font-semibold tracking-tight -mt-0.5">
              MYP 5 ACADEMIC OS
            </div>
          </div>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 text-xs">
        {navGroups.map((group) => (
          <div key={group.group}>
            <div className={`px-2 mb-1.5 font-mono text-[10px] font-bold tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-400'
            }`}>
              {group.group}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = route === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? isDark
                          ? 'bg-gradient-to-r from-indigo-600/25 to-purple-600/10 text-white border-l-2 border-l-indigo-500 border-r border-y border-[#29354F] shadow-sm'
                          : 'bg-gradient-to-r from-indigo-50 to-purple-50/40 text-indigo-950 border-l-2 border-l-indigo-600 border-r border-y border-indigo-100 font-semibold shadow-xs'
                        : isDark
                        ? 'text-slate-400 hover:text-slate-100 hover:bg-[#151F33]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        size={15}
                        className={isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / Settings Link */}
      <div className={`p-3 border-t ${isDark ? 'border-[#1E293B]' : 'border-[#E2E8F0]'}`}>
        <button
          onClick={() => handleNavClick('settings')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            route === 'settings'
              ? isDark
                ? 'bg-[#182338] text-white border border-[#29354F]'
                : 'bg-indigo-50 text-indigo-950 border border-indigo-100'
              : isDark
              ? 'text-slate-400 hover:text-slate-100 hover:bg-[#151F33]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
          }`}
        >
          <Settings size={15} className={route === 'settings' ? 'text-indigo-400' : 'text-slate-400'} />
          <span>Settings & Target Grades</span>
        </button>
      </div>
    </aside>
  );
};
