import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Clock, CheckCircle2, AlertTriangle, Target } from 'lucide-react';

export const QuestionAnalyticsView: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const commandTermAnalytics = [
    { term: 'Explain', attempts: 34, accuracy: 76, avgTime: '3m 15s', status: 'solid' },
    { term: 'Calculate', attempts: 52, accuracy: 88, avgTime: '2m 10s', status: 'strong' },
    { term: 'Evaluate', attempts: 21, accuracy: 58, avgTime: '4m 40s', status: 'weak' },
    { term: 'Describe', attempts: 28, accuracy: 82, avgTime: '2m 30s', status: 'solid' },
    { term: 'Justify', attempts: 18, accuracy: 64, avgTime: '3m 50s', status: 'needs-work' },
    { term: 'State', attempts: 40, accuracy: 95, avgTime: '45s', status: 'strong' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            Diagnostic Analytics
          </span>
          <span className="text-xs text-slate-400">· Command Terms & Time Allocation</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Question & Strand Analytics
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate accuracy by command term, cognitive depth, and time expenditure.
        </p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'}`}>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Average Response Time</span>
          <div className="text-xl font-bold font-mono text-inherit mt-1">2m 44s</div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Optimal for 100-mark 120m paper</span>
        </div>
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'}`}>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Overall First-Pass Accuracy</span>
          <div className="text-xl font-bold font-mono text-inherit mt-1">79.2%</div>
          <span className="text-[11px] text-[#4361EE] font-mono mt-1 block">Level 6 / 7 trajectory</span>
        </div>
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'}`}>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">High Cognitive Demand ("Evaluate")</span>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">58.0%</div>
          <span className="text-[11px] text-amber-400/90 font-mono mt-1 block">Targeted diagnostic weakness</span>
        </div>
      </div>

      {/* Command Term Performance Table */}
      <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'}`}>
        <div className="p-4 border-b border-slate-700/20 font-mono text-xs font-semibold uppercase text-slate-300">
          Command Term Mastery Matrix
        </div>
        <table className="w-full text-xs font-sans text-left">
          <thead className="bg-[#141C2B] text-slate-300 font-mono text-[11px] border-b border-slate-700/20">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Command Term</th>
              <th className="px-4 py-2.5 font-semibold">Attempts</th>
              <th className="px-4 py-2.5 font-semibold">Accuracy Rate</th>
              <th className="px-4 py-2.5 font-semibold">Avg Time Spent</th>
              <th className="px-4 py-2.5 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/20 text-slate-300">
            {commandTermAnalytics.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-800/10">
                <td className="px-4 py-3 font-mono font-bold text-slate-200">
                  {item.term}
                </td>
                <td className="px-4 py-3 font-mono">{item.attempts} items</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold">{item.accuracy}%</span>
                    <div className="w-16 bg-slate-700/30 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.accuracy >= 80 ? 'bg-emerald-500' : item.accuracy >= 70 ? 'bg-[#4361EE]' : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-slate-400">{item.avgTime}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                      item.status === 'strong'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : item.status === 'solid'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
