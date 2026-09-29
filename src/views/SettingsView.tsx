import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Sun, Moon, Target, Download, Trash2, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme, studentName } = useApp();
  const isDark = theme === 'dark';

  const [physicsTarget, setPhysicsTarget] = useState(7);
  const [chemTarget, setChemTarget] = useState(7);
  const [mathTarget, setMathTarget] = useState(7);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all locally stored mistakes and diagnostic history?')) {
      localStorage.removeItem('studyflow_mistakes');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-[720px] space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            Configuration
          </span>
          <span className="text-xs text-slate-400">· Academic Targets</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Settings & Academic Goals
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customise target MYP grades, interface theme, and diagnostic persistence.
        </p>
      </div>

      {/* Target MYP Grades */}
      <div
        className={`p-6 rounded-xl border space-y-4 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
        }`}
      >
        <div className="flex items-center gap-2">
          <Target size={16} className="text-[#4361EE]" />
          <h3 className="text-sm font-semibold text-inherit font-mono uppercase">
            Target MYP 5 Grades (1–7 Scale)
          </h3>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Physics', val: physicsTarget, setVal: setPhysicsTarget },
            { label: 'Chemistry', val: chemTarget, setVal: setChemTarget },
            { label: 'Mathematics Extended', val: mathTarget, setVal: setMathTarget },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400">Target Grade:</span>
                <select
                  value={item.val}
                  onChange={(e) => item.setVal(Number(e.target.value))}
                  className={`py-1 px-2.5 rounded font-mono text-xs border ${
                    isDark ? 'bg-[#0F1523] border-[#1C2638] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                >
                  {[5, 6, 7].map((num) => (
                    <option key={num} value={num}>
                      Level {num} / 7
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            {saved ? <CheckCircle2 size={13} /> : null}
            <span>{saved ? 'Targets Saved' : 'Save Targets'}</span>
          </button>
        </div>
      </div>

      {/* Visual Theme */}
      <div
        className={`p-6 rounded-xl border space-y-4 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
        }`}
      >
        <h3 className="text-sm font-semibold text-inherit font-mono uppercase">
          Display Theme
        </h3>
        <p className="text-xs text-slate-400">
          StudyFlow provides dark mode (#0B0F17) for eye comfort and an ultra-clean high-contrast light mode (#FBFCFD).
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => theme === 'light' && toggleTheme()}
            className={`px-4 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all ${
              isDark
                ? 'bg-[#4361EE] text-white border-transparent'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            <Moon size={14} />
            <span>Dark Atmosphere (#0B0F17)</span>
          </button>

          <button
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`px-4 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all ${
              !isDark
                ? 'bg-[#4361EE] text-white border-transparent'
                : 'bg-[#141C2B] text-slate-300 border-[#1C2638]'
            }`}
          >
            <Sun size={14} />
            <span>Clean Light (#FBFCFD)</span>
          </button>
        </div>
      </div>

      {/* Local Storage Data Management */}
      <div
        className={`p-6 rounded-xl border border-rose-500/20 space-y-3 ${
          isDark ? 'bg-[#181523]/50' : 'bg-rose-50/40'
        }`}
      >
        <h3 className="text-sm font-semibold text-rose-400 font-mono uppercase">
          Diagnostic Cache & Reset
        </h3>
        <p className="text-xs text-slate-400">
          Reset local mistake logs, self-assessment marks, and saved candidate responses back to default curriculum states.
        </p>
        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Trash2 size={13} />
          <span>Reset Local Diagnostic Data</span>
        </button>
      </div>
    </div>
  );
};
