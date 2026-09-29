import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, ArrowRight, RotateCcw, Calendar, FileText } from 'lucide-react';

export const ResultsView: React.FC = () => {
  const { setRoute, startPractice, theme } = useApp();
  const isDark = theme === 'dark';

  const mockResults = [
    {
      id: 'res-01',
      title: 'Physics MYP 5 Mid-Term Specimen Assessment',
      date: '10 Sept 2026',
      totalScore: 78,
      maxScore: 100,
      mypGrade: 6,
      criteriaScores: { A: '7/8', B: '6/8', C: '5/8', D: '7/8' },
      strengths: 'Criterion A (Circuit theory) and Criterion D (Social implications of power grids).',
      weaknesses: 'Criterion C (Faraday law mathematical data tables & uncertainty estimation).',
    },
    {
      id: 'res-02',
      title: 'Chemistry Kinetics Diagnostic Exam',
      date: '03 Sept 2026',
      totalScore: 82,
      maxScore: 100,
      mypGrade: 6,
      criteriaScores: { A: '7/8', B: '7/8', C: '6/8', D: '6/8' },
      strengths: 'Collision theory graphs and catalyst mechanisms.',
      weaknesses: 'Initial rate table calculations with fractional orders.',
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            Exam Performance
          </span>
          <span className="text-xs text-slate-400">· Official Assessment History</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Assessment Results & Examiner Feedback
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review completed mock examination rubrics, mark breakdowns, and examiner comments.
        </p>
      </div>

      <div className="space-y-4">
        {mockResults.map((res) => (
          <div
            key={res.id}
            className={`p-6 rounded-xl border space-y-4 ${
              isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/20">
              <div>
                <span className="text-[10px] font-mono text-slate-400">
                  Completed on {res.date}
                </span>
                <h3 className="text-base font-semibold text-inherit mt-0.5">
                  {res.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">Raw Score: {res.totalScore}/{res.maxScore}</div>
                  <div className="text-lg font-bold font-mono text-[#4361EE]">
                    MYP Level {res.mypGrade} / 7
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(res.criteriaScores).map(([crit, score]) => (
                <div
                  key={crit}
                  className={`p-3 rounded-lg border text-center ${
                    isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Criterion {crit}
                  </span>
                  <span className="font-mono text-base font-bold text-slate-200 mt-0.5 block">
                    {score}
                  </span>
                </div>
              ))}
            </div>

            {/* Qualitative Feedback */}
            <div className="space-y-2 text-xs pt-1">
              <div>
                <strong className="text-emerald-400 font-medium">Demonstrated Strengths: </strong>
                <span className="text-slate-300">{res.strengths}</span>
              </div>
              <div>
                <strong className="text-amber-400 font-medium">Examiner Target Areas: </strong>
                <span className="text-slate-300">{res.weaknesses}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setRoute('mistakes')}
                className="px-4 py-2 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Review Marked Questions & Diagnostics</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
