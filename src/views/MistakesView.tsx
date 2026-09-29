import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ErrorCategory, CriterionKey } from '../types';
import { MathRenderer } from '../components/common/MathRenderer';
import {
  AlertOctagon,
  CheckCircle2,
  Filter,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

export const MistakesView: React.FC = () => {
  const { mistakes, toggleResolveMistake, startPractice, theme } = useApp();
  const isDark = theme === 'dark';

  // Filters
  const [selectedErrorType, setSelectedErrorType] = useState<string>('all');
  const [selectedCriterion, setSelectedCriterion] = useState<string>('all');
  const [showResolved, setShowResolved] = useState(false);

  const filteredMistakes = mistakes.filter((m) => {
    if (!showResolved && m.resolved) return false;
    if (selectedErrorType !== 'all' && m.errorType !== selectedErrorType) return false;
    if (selectedCriterion !== 'all' && m.criterion !== selectedCriterion) return false;
    return true;
  });

  // Error type breakdown
  const errorCounts: Record<string, number> = {
    Calculation: mistakes.filter(m => m.errorType === 'Calculation' && !m.resolved).length,
    Conceptual: mistakes.filter(m => m.errorType === 'Conceptual' && !m.resolved).length,
    'Command term': mistakes.filter(m => m.errorType === 'Command term' && !m.resolved).length,
    'Data interpretation': mistakes.filter(m => m.errorType === 'Data interpretation' && !m.resolved).length,
    Careless: mistakes.filter(m => m.errorType === 'Careless' && !m.resolved).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
              Diagnostic Revision
            </span>
            <span className="text-xs text-slate-400">· Feedback Loops</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
            Diagnostic Mistakes Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Move from error identification to targeted re-testing. Analyze root causes and resolve weaknesses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="rounded accent-[#4361EE] w-3.5 h-3.5"
            />
            <span>Show resolved ({mistakes.filter(m => m.resolved).length})</span>
          </label>
        </div>
      </div>

      {/* Error Category Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {Object.entries(errorCounts).map(([cat, count]) => (
          <button
            key={cat}
            onClick={() => setSelectedErrorType(selectedErrorType === cat ? 'all' : cat)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedErrorType === cat
                ? 'bg-[#4361EE] text-white border-transparent'
                : isDark
                ? 'bg-[#111723] border-[#1C2638] text-slate-300 hover:border-slate-700'
                : 'bg-white border-[#E3E8F0] text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-75">
              {cat}
            </div>
            <div className="text-lg font-bold font-mono mt-0.5">
              {count}
            </div>
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        <select
          value={selectedCriterion}
          onChange={(e) => setSelectedCriterion(e.target.value)}
          className={`px-2.5 py-1 rounded border ${
            isDark ? 'bg-[#111723] border-[#1C2638] text-slate-300' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          <option value="all">All Criteria (A–D)</option>
          <option value="A">Criterion A</option>
          <option value="B">Criterion B</option>
          <option value="C">Criterion C</option>
          <option value="D">Criterion D</option>
        </select>
      </div>

      {/* Diagnostic Mistakes Cards List */}
      <div className="space-y-4">
        {filteredMistakes.length > 0 ? (
          filteredMistakes.map((mistake) => {
            const critColor =
              mistake.criterion === 'A'
                ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                : mistake.criterion === 'B'
                ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                : mistake.criterion === 'C'
                ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                : 'text-purple-400 bg-purple-400/10 border-purple-400/20';

            return (
              <div
                key={mistake.id}
                className={`p-5 rounded-xl border transition-all ${
                  mistake.resolved
                    ? 'opacity-60 bg-slate-900/40 border-slate-800'
                    : isDark
                    ? 'bg-[#111723] border-[#1C2638]'
                    : 'bg-white border-[#E3E8F0] shadow-xs'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/20">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-inherit">
                      {mistake.topicName}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold border ${critColor}`}
                    >
                      Criterion {mistake.criterion}
                    </span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20">
                      {mistake.errorType} Error
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Logged {mistake.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleResolveMistake(mistake.id)}
                      className={`px-3 py-1 rounded text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        mistake.resolved
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-700/20 text-slate-400 border-slate-700/40 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 size={13} />
                      <span>{mistake.resolved ? 'Resolved' : 'Mark Resolved'}</span>
                    </button>
                  </div>
                </div>

                {/* 4 Diagnostic Questions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
                  {/* What did I get wrong? */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-rose-400 font-semibold tracking-wider">
                      1. What did I get wrong?
                    </span>
                    <p className="text-slate-300 font-medium leading-relaxed">
                      {mistake.questionTitle}
                    </p>
                    <p className="text-slate-400 mt-1 leading-snug">
                      <MathRenderer content={mistake.userNote} />
                    </p>
                  </div>

                  {/* Why did I get it wrong? */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-amber-400 font-semibold tracking-wider">
                      2. Root Cause Diagnostic
                    </span>
                    <p className="text-slate-400 leading-snug">
                      Categorized as <strong>{mistake.errorType}</strong> under {mistake.strand}. Review the fundamental definitions and units before attempting similar questions.
                    </p>
                  </div>

                  {/* What should I do now? */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold tracking-wider">
                      3. Action Plan & Retest
                    </span>
                    <p className="text-slate-400 leading-snug">
                      {mistake.actionPlan}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => startPractice(mistake.questionId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#4361EE] hover:bg-[#3651D4] text-white font-medium text-xs transition-colors"
                      >
                        <span>Re-test this question</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center border border-slate-800 rounded-xl bg-[#111723] text-slate-400 text-xs">
            No diagnostic mistakes match the active filters.
          </div>
        )}
      </div>
    </div>
  );
};
