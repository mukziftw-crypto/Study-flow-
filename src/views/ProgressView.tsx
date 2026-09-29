import React from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS, CRITERIA_STATUS, TOPICS } from '../data/mypData';
import { TrendingUp, Award, CheckCircle2, Clock, BarChart2 } from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            Academic Analytics
          </span>
          <span className="text-xs text-slate-400">· Strand Depth & Criteria Mastery</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Curriculum Mastery & Assessment Readiness
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Detailed diagnostic tracking across IB MYP 5 Criteria A, B, C, and D.
        </p>
      </div>

      {/* 1. Criteria A–D Detailed Academic Matrix */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-slate-400">
          Criterion Performance Breakdown (0–8 Scale)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CRITERIA_STATUS.map((crit) => {
            const statusColor =
              crit.status === 'strong'
                ? 'text-emerald-400'
                : crit.status === 'developing'
                ? 'text-blue-400'
                : 'text-amber-400';

            return (
              <div
                key={crit.key}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-300">
                      Criterion {crit.key}
                    </span>
                    <span className={`text-xs font-mono font-semibold ${statusColor}`}>
                      {crit.recentScore}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200 mt-2">
                    {crit.scienceName}
                  </h4>

                  <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                    {crit.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/20">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Mastery Level</span>
                    <span>{crit.masteryPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700/30 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#4361EE] h-full rounded-full"
                      style={{ width: `${crit.masteryPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Subject Mastery & Predicted Grades */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-slate-400">
          Subject Level Progress & Grade Trajectory
        </h3>

        <div
          className={`rounded-xl border overflow-hidden ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          <table className="w-full text-xs font-sans text-left">
            <thead className="bg-[#141C2B] text-slate-300 border-b border-slate-700/20 font-mono text-[11px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Syllabus Completion</th>
                <th className="px-4 py-3 font-semibold">Items Practised</th>
                <th className="px-4 py-3 font-semibold">Weakest Criterion</th>
                <th className="px-4 py-3 font-semibold text-right">Predicted Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20 text-slate-300">
              {SUBJECTS.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/10 transition-colors">
                  <td className="px-4 py-3 font-medium text-inherit">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{s.code}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{s.progressPercentage}%</span>
                      <div className="w-20 bg-slate-700/30 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#4361EE] h-full rounded-full"
                          style={{ width: `${s.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {s.totalQuestionsCompleted} questions
                  </td>
                  <td className="px-4 py-3 text-amber-400/90 font-medium">
                    {s.weakestArea}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-[#4361EE] text-right">
                    Level {s.predictedGrade} / 7
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Practice History & Velocity */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-slate-400">
          Recent Diagnostic Activity Log
        </h3>

        <div
          className={`p-4 rounded-xl border space-y-3 ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          {[
            { date: 'Today, 14:15', task: 'Physics — Electromagnetic Induction', crit: 'Crit C', score: '5 / 6 marks', delta: '+12% precision' },
            { date: 'Yesterday, 19:40', task: 'Chemistry — Reaction Kinetics & Maxwell-Boltzmann', crit: 'Crit B', score: '4 / 6 marks', delta: 'Error logged' },
            { date: '2 days ago, 16:10', task: 'Math Extended — Tidal Depth Trigonometric Modelling', crit: 'Crit D', score: '7 / 8 marks', delta: '+8% improvement' },
            { date: '3 days ago, 11:25', task: 'Math Standard — Systems of Linear Inequalities', crit: 'Crit A', score: '6 / 6 marks', delta: 'Mastery verified' },
          ].map((log, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-700/20 last:border-none last:pb-0 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 text-[11px] min-w-[110px]">
                  {log.date}
                </span>
                <span className="font-medium text-slate-200">
                  {log.task}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-500/10 text-slate-400">
                  {log.crit}
                </span>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="font-mono font-medium text-slate-300">
                  {log.score}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {log.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
