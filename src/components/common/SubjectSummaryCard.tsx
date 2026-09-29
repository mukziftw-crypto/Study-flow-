import React from 'react';
import {
  Calculator,
  Binary,
  Atom,
  FlaskConical,
  Award,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { SUBJECTS } from '../../data/mypData';
import { SubjectId, SubjectSummary } from '../../types';

interface SubjectSummaryCardProps {
  subject: SubjectSummary;
  isDark: boolean;
  onOpenSubject?: (id: SubjectId) => void;
}

interface SubjectVisualConfig {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentText: string;
  accentBg: string;
  badgeBorder: string;
  cardBorder: string;
  cardBg: string;
  progressFill: string;
  group: 'Mathematics' | 'Sciences';
}

const getSubjectVisualConfig = (id: SubjectId, isDark: boolean): SubjectVisualConfig => {
  switch (id) {
    case 'physics':
      return {
        icon: Atom,
        accentText: 'text-cyan-400',
        accentBg: 'bg-cyan-500/15 text-cyan-300',
        badgeBorder: 'border-cyan-500/30',
        cardBorder: isDark ? 'border-cyan-500/30 hover:border-cyan-400/60' : 'border-cyan-200 hover:border-cyan-400',
        cardBg: isDark
          ? 'bg-gradient-to-br from-[#0F1D2B]/90 via-[#0E1624] to-[#0A101C]'
          : 'bg-gradient-to-br from-cyan-50/60 via-white to-slate-50',
        progressFill: 'bg-cyan-400',
        group: 'Sciences',
      };
    case 'chemistry':
      return {
        icon: FlaskConical,
        accentText: 'text-emerald-400',
        accentBg: 'bg-emerald-500/15 text-emerald-300',
        badgeBorder: 'border-emerald-500/30',
        cardBorder: isDark ? 'border-emerald-500/30 hover:border-emerald-400/60' : 'border-emerald-200 hover:border-emerald-400',
        cardBg: isDark
          ? 'bg-gradient-to-br from-[#0F241C]/90 via-[#0E1624] to-[#0A101C]'
          : 'bg-gradient-to-br from-emerald-50/60 via-white to-slate-50',
        progressFill: 'bg-emerald-400',
        group: 'Sciences',
      };
    case 'math-ext':
      return {
        icon: Binary,
        accentText: 'text-purple-400',
        accentBg: 'bg-purple-500/15 text-purple-300',
        badgeBorder: 'border-purple-500/30',
        cardBorder: isDark ? 'border-purple-500/30 hover:border-purple-400/60' : 'border-purple-200 hover:border-purple-400',
        cardBg: isDark
          ? 'bg-gradient-to-br from-[#1C1330]/90 via-[#0E1624] to-[#0A101C]'
          : 'bg-gradient-to-br from-purple-50/60 via-white to-slate-50',
        progressFill: 'bg-purple-400',
        group: 'Mathematics',
      };
    case 'math-std':
    default:
      return {
        icon: Calculator,
        accentText: 'text-amber-400',
        accentBg: 'bg-amber-500/15 text-amber-300',
        badgeBorder: 'border-amber-500/30',
        cardBorder: isDark ? 'border-amber-500/30 hover:border-amber-400/60' : 'border-amber-200 hover:border-amber-400',
        cardBg: isDark
          ? 'bg-gradient-to-br from-[#241A0E]/90 via-[#0E1624] to-[#0A101C]'
          : 'bg-gradient-to-br from-amber-50/60 via-white to-slate-50',
        progressFill: 'bg-amber-400',
        group: 'Mathematics',
      };
  }
};

export const SubjectSummaryCard: React.FC<SubjectSummaryCardProps> = ({
  subject,
  isDark,
  onOpenSubject,
}) => {
  const visual = getSubjectVisualConfig(subject.id, isDark);
  const SubjectIcon = visual.icon;

  const getGradeDescriptor = (grade: number) => {
    if (grade >= 7) return 'Mastery';
    if (grade >= 6) return 'Substantial';
    if (grade >= 5) return 'Proficient';
    return 'Developing';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenSubject && onOpenSubject(subject.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (onOpenSubject) onOpenSubject(subject.id);
        }
      }}
      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 shadow-xs hover:shadow-md ${visual.cardBorder} ${visual.cardBg}`}
    >
      <div>
        {/* Top Header: Badge, Group & Grade */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs ${
                isDark ? 'bg-slate-900/70 border-slate-700/50' : 'bg-white border-slate-200'
              }`}
            >
              <SubjectIcon size={18} className={visual.accentText} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${visual.accentBg} ${visual.badgeBorder}`}
                >
                  {subject.code}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {visual.group}
                </span>
              </div>
            </div>
          </div>

          {/* Predicted Grade Pill */}
          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border shadow-xs flex items-center gap-1.5 ${visual.accentBg} ${visual.badgeBorder}`}
          >
            <Award size={13} />
            <span>Grade {subject.predictedGrade}/7</span>
          </div>
        </div>

        {/* Subject Title */}
        <h3 className="text-base font-bold text-inherit group-hover:text-indigo-400 transition-colors">
          {subject.name}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5 font-medium line-clamp-1">
          Unit: <span className="text-slate-300 font-semibold">{subject.currentUnit}</span>
        </p>

        {/* Progress Bar & Status */}
        <div className="mt-4 pt-3 border-t border-slate-700/20 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <TrendingUp size={12} className={visual.accentText} />
              <span>Syllabus Progress</span>
            </span>
            <span className="font-bold text-inherit">{subject.progressPercentage}%</span>
          </div>

          <div
            className={`w-full h-2 rounded-full overflow-hidden ${
              isDark ? 'bg-slate-800' : 'bg-slate-200'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${visual.progressFill}`}
              style={{ width: `${subject.progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
            <span>{subject.totalQuestionsCompleted} questions solved</span>
            <span className="font-semibold text-slate-300">
              {getGradeDescriptor(subject.predictedGrade)} Band
            </span>
          </div>
        </div>

        {/* Target Focus / Diagnostic Weakness (Conceptual, no formulas!) */}
        <div
          className={`mt-3.5 p-2.5 rounded-xl border text-xs space-y-1 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <AlertCircle size={11} className="text-amber-400" />
            <span>Target Diagnostic Focus:</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
            {subject.weakestArea}
          </p>
        </div>

        {/* Recent Performance Snapshot */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Recent Rubric:</span>
          <span className="font-semibold text-slate-300">{subject.recentPerformance}</span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-700/20 flex items-center justify-between text-xs">
        <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
          Open subject overview
        </span>
        <div className="flex items-center gap-1 font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
          <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
};

interface SubjectSummaryGridProps {
  isDark: boolean;
  onOpenSubject?: (id: SubjectId) => void;
}

export const SubjectSummaryGrid: React.FC<SubjectSummaryGridProps> = ({
  isDark,
  onOpenSubject,
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-inherit">
              Active Subjects & Performance Summary
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            High-level overview of your 4 enrolled MYP 5 courses, predicted grade bands, and syllabus completion.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-emerald-400" />
            <span>4 Subjects Active</span>
          </span>
          <span>·</span>
          <span>Avg Grade: 6.0/7</span>
        </div>
      </div>

      {/* 4 Responsive Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUBJECTS.map((sub) => (
          <SubjectSummaryCard
            key={sub.id}
            subject={sub}
            isDark={isDark}
            onOpenSubject={onOpenSubject}
          />
        ))}
      </div>
    </section>
  );
};
