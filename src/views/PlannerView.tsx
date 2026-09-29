import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const PlannerView: React.FC = () => {
  const { startPractice, theme } = useApp();
  const isDark = theme === 'dark';

  const schedule = [
    {
      day: 'Today',
      date: 'Thursday, 14 Sept',
      sessions: [
        { subject: 'Physics', topic: 'Electromagnetic Induction', crit: 'Criterion C', time: '16:00 – 16:45', type: 'Diagnostic Practice', qId: 'q-phys-01' },
        { subject: 'Chemistry', topic: 'Redox & Electrochemistry', crit: 'Criterion A', time: '17:00 – 17:45', type: 'Theory & Formula Review', qId: 'q-chem-01' },
      ]
    },
    {
      day: 'Tomorrow',
      date: 'Friday, 15 Sept',
      sessions: [
        { subject: 'Math Extended', topic: 'Trigonometric Wave Modeling', crit: 'Criterion D', time: '15:30 – 16:30', type: 'Applied Problem Set', qId: 'q-math-01' },
        { subject: 'Physics', topic: 'Faraday Law Simulations', crit: 'Criterion B', time: '17:00 – 17:45', type: 'Interactive Lab', qId: 'q-phys-02' },
      ]
    },
    {
      day: 'Saturday',
      date: 'Saturday, 16 Sept',
      sessions: [
        { subject: 'Chemistry', topic: 'Reaction Kinetics eAssessment Paper', crit: 'Criteria A, B, C, D', time: '10:00 – 12:00', type: 'Full Mock Exam (120m)', qId: 'q-chem-02' },
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            Study Schedule
          </span>
          <span className="text-xs text-slate-400">· 18 Days to Mock Exams</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Academic Revision Planner
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Structured diagnostic study sessions prioritized by your weakest criteria.
        </p>
      </div>

      <div className="space-y-6">
        {schedule.map((dayGroup, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-300">
                {dayGroup.day}
              </span>
              <span className="text-xs text-slate-500">· {dayGroup.date}</span>
            </div>

            <div className="space-y-2">
              {dayGroup.sessions.map((session, sIdx) => (
                <div
                  key={sIdx}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#4361EE] font-bold">
                        {session.subject}
                      </span>
                      <span className="text-xs text-slate-500">·</span>
                      <span className="text-xs font-semibold text-inherit">
                        {session.topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock size={12} /> {session.time}
                      </span>
                      <span>·</span>
                      <span className="text-amber-400 font-medium">
                        {session.crit}
                      </span>
                      <span>·</span>
                      <span>{session.type}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => startPractice(session.qId)}
                    className="px-3 py-1.5 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors flex items-center gap-1 self-end sm:self-center"
                  >
                    <span>Start Session</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
