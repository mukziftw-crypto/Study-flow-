import React from 'react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS } from '../../data/mypData';
import { Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onToggleMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobile }) => {
  const {
    route,
    theme,
    toggleTheme,
    selectedSubjectId,
    setSelectedSubjectId,
    studentName,
  } = useApp();

  const isDark = theme === 'dark';

  const formatRouteName = (r: string) => {
    switch (r) {
      case 'dashboard': return 'Student Command Center';
      case 'subjects': return 'Academic Subjects';
      case 'topic': return 'Topic Deep Dive & Simulations';
      case 'question-bank': return 'IB Question Bank';
      case 'practice': return 'Assessment Practice';
      case 'mock-test': return 'Mock Examination';
      case 'pattern-paper': return 'MYP Pattern Paper';
      case 'mistakes': return 'Diagnostic Revision Center';
      case 'planner': return 'Academic Planner';
      case 'resources': return 'Conceptual Guides & Principles';
      case 'ib-resources': return 'IB MYP 5 Criteria Guide';
      case 'progress': return 'Mastery & Criteria Progress';
      case 'results': return 'Assessment Results';
      case 'question-analytics': return 'Question Analytics';
      case 'settings': return 'Preferences & Grade Targets';
      default: return r;
    }
  };

  return (
    <header
      className={`h-14 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 border-b backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-[#0D1322]/90 border-[#1E293B] text-slate-200'
          : 'bg-[#FFFFFF]/90 border-[#E2E8F0] text-slate-800'
      }`}
    >
      {/* Left: Mobile Toggle & Route Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="p-1.5 lg:hidden rounded-lg hover:bg-slate-800/10 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-indigo-400 hidden sm:inline">
            STUDYFLOW /
          </span>
          <h1 className="text-sm font-semibold tracking-tight text-inherit">
            {formatRouteName(route)}
          </h1>
        </div>
      </div>

      {/* Right: Subject quick switcher, theme toggle, and student badge */}
      <div className="flex items-center gap-3">
        {/* Quick Subject Select */}
        <div className="hidden md:flex items-center">
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value as any)}
            className={`text-xs py-1 px-2.5 rounded-lg font-mono border focus:outline-none transition-colors ${
              isDark
                ? 'bg-[#151F33] border-[#29354F] text-slate-200 hover:border-indigo-500/50'
                : 'bg-slate-50 border-[#E2E8F0] text-slate-800 hover:border-indigo-400'
            }`}
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dark / Light Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark
              ? 'bg-[#151F33] border-[#29354F] text-slate-300 hover:text-white hover:border-indigo-500/50'
              : 'bg-white border-[#E2E8F0] text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle dark/light mode"
        >
          {isDark ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-indigo-600" />}
        </button>

        {/* Student Status Indicator */}
        <div
          className={`hidden sm:flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-full border text-xs shadow-xs ${
            isDark
              ? 'bg-[#151F33] border-[#29354F] text-slate-200'
              : 'bg-white border-[#E2E8F0] text-slate-800'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-xs">{studentName}</span>
          <span className="text-[10px] font-mono font-bold text-indigo-400 px-1.5 py-0.2 rounded bg-indigo-500/10 border border-indigo-500/20">
            MYP 5
          </span>
        </div>
      </div>
    </header>
  );
};
