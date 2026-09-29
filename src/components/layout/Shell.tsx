import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex relative selection:bg-indigo-500 selection:text-white ${
        isDark
          ? 'bg-[#0A0E1A] text-[#F1F5F9]'
          : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* Engaging Ambient Gradient Backdrops */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            <div className="absolute -top-[25%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
            <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[130px]" />
            <div className="absolute -bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-400/8 blur-[120px]" />
            <div className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-blue-400/8 blur-[120px]" />
          </>
        )}
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Persistent Left Slim Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header onToggleMobile={() => setMobileOpen(!mobileOpen)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8">
          <div className="max-w-[1040px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
