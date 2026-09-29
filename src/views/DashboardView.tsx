import React from 'react';
import { useApp } from '../context/AppContext';
import { REVISION_QUEUE, CRITERIA_STATUS } from '../data/mypData';
import { IntroductionToIB } from '../components/common/IntroductionToIB';
import { QuickStudyWidget } from '../components/common/QuickStudyWidget';
import { SubjectCriteriaSummary } from '../components/common/SubjectCriteriaSummary';
import { SubjectSummaryGrid } from '../components/common/SubjectSummaryCard';
import {
  Layers,
  ChevronRight,
  ArrowRight,
  Target,
  RotateCcw,
  FileText,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { studentName, openSubject, openTopic, startPractice, setRoute, theme } = useApp();
  const isDark = theme === 'dark';

  // The 5-stage StudyFlow Learning & Assessment Cycle (Conceptual focus, no formula sheets)
  const studyFlowCycle = [
    {
      step: '01',
      title: 'Learn',
      action: 'Concepts & Theory',
      description: 'Master syllabus topics, key concepts, qualitative relationships, and scientific explanations before tackling questions.',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      hoverBorder: 'hover:border-sky-500/40',
      route: 'topic',
    },
    {
      step: '02',
      title: 'Practise',
      action: 'Criteria-Targeted Questions',
      description: 'Work through exam-style questions tagged by subject, difficulty, command term, and Criterion strand.',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      hoverBorder: 'hover:border-indigo-500/40',
      route: 'question-bank',
    },
    {
      step: '03',
      title: 'Assess',
      action: 'Authentic Exam Conditions',
      description: 'Test your timing and exam stamina with on-screen mock examinations and conceptual criteria rubrics.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/40',
      route: 'mock-test',
    },
    {
      step: '04',
      title: 'Analyse',
      action: 'Diagnostic Performance',
      description: 'Track your achievement levels across Criteria A through D, spotting specific strand weaknesses.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      hoverBorder: 'hover:border-amber-500/40',
      route: 'progress',
    },
    {
      step: '05',
      title: 'Improve',
      action: 'Mistake Vault & Revision',
      description: 'Turn errors into mastery by cataloging conceptual misunderstandings, command term slips, and action plans.',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      hoverBorder: 'hover:border-rose-500/40',
      route: 'mistakes',
    },
  ];

  const scrollToCriteria = () => {
    const el = document.getElementById('subject-criteria-summary');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* ========================================================================= */}
      {/* 1. INTRODUCTION TO IB COMPONENT (STEP-BY-STEP PROGRESSION)                 */}
      {/* ========================================================================= */}
      <IntroductionToIB isDark={isDark} onExploreCriteria={scrollToCriteria} />

      {/* ========================================================================= */}
      {/* 2. FOUR ACTIVE SUBJECTS SUMMARY (HIGH-LEVEL PROGRESS & STANDING)          */}
      {/* ========================================================================= */}
      <SubjectSummaryGrid isDark={isDark} onOpenSubject={openSubject} />

      {/* ========================================================================= */}
      {/* 3. “HOW STUDYFLOW FITS INTO MYP 5” (THE COMPLETE LEARNING CYCLE)          */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-indigo-400" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-inherit">
                How StudyFlow Fits Into MYP 5
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              A complete cyclical learning workflow designed around IB inquiry and criteria mastery.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Learn → Practise → Assess → Analyse → Improve
          </span>
        </div>

        {/* 5 Connected Cycle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {studyFlowCycle.map((item) => {
            return (
              <div
                key={item.step}
                onClick={() => setRoute(item.route as any)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group ${item.hoverBorder} ${
                  isDark ? 'bg-[#101726] border-[#1C2638] hover:bg-[#141F33]' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${item.color}`}>
                      Stage {item.step}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      0{item.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-inherit group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono font-semibold text-slate-400 mt-0.5">
                    {item.action}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-700/20 flex items-center justify-between text-[11px] font-semibold text-indigo-400">
                  <span>Open {item.title}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ALL USER SUBJECTS & LINKED MYP CRITERIA (CRITERION D SPOTLIGHT)        */}
      {/* ========================================================================= */}
      <SubjectCriteriaSummary
        isDark={isDark}
        onOpenSubject={openSubject}
        onOpenTopic={openTopic}
      />

      {/* ========================================================================= */}
      {/* 4. YOUR ACTIVE MYP 5 WORKSPACE (STUDENT WORK & ACTIVE TASKS)              */}
      {/* ========================================================================= */}
      <section className="pt-4 border-t border-slate-700/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Target size={18} className="text-indigo-400" />
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-inherit">
                Your MYP 5 Workspace
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active diagnostic queue, revision priorities, and criteria readiness for {studentName}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRoute('mistakes')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>Mistake Vault</span>
            </button>
            <button
              onClick={() => setRoute('mock-test')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
            >
              <FileText size={13} />
              <span>Mock Tests</span>
            </button>
          </div>
        </div>

        {/* Quick Study High-Efficiency Recommendation Widget */}
        <QuickStudyWidget
          isDark={isDark}
          onStartTopic={(topicId) => openTopic(topicId)}
          onStartQuestion={(questionId) => startPractice(questionId)}
          onGoToMistakes={() => setRoute('mistakes')}
          onScrollToCriteria={scrollToCriteria}
        />

        {/* Priority Revision Tasks & Criteria Readiness Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revision Queue (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-slate-400">
                Prioritized Revision Tasks
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Diagnostic auto-ordered by error frequency
              </span>
            </div>

            <div className="space-y-2.5">
              {REVISION_QUEUE.map((item, idx) => {
                const critColor =
                  item.criterion === 'A'
                    ? 'text-blue-400 bg-blue-400/10 border-blue-400/25'
                    : item.criterion === 'B'
                    ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25'
                    : item.criterion === 'C'
                    ? 'text-amber-400 bg-amber-400/10 border-amber-400/25'
                    : 'text-purple-400 bg-purple-400/10 border-purple-400/25';

                return (
                  <div
                    key={item.id}
                    onClick={() => openTopic(item.topicId)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 group ${
                      isDark
                        ? 'bg-[#111827] border-[#1F2B3E] hover:border-indigo-500/50 hover:bg-[#152033]'
                        : 'bg-white border-[#E2E8F0] hover:border-indigo-400 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="font-mono text-xs text-indigo-400 font-bold pt-0.5">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-inherit group-hover:text-indigo-400 transition-colors">
                            {item.topicName} — {item.subtopic}
                          </span>
                          <span
                            className={`px-2 py-0.2 text-[10px] font-mono font-bold rounded border ${critColor}`}
                          >
                            Crit {item.criterion}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {item.reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          item.urgency === 'high'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-slate-500/15 text-slate-400'
                        }`}
                      >
                        {item.urgency.toUpperCase()}
                      </span>
                      <ChevronRight size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assessment Readiness (1 Col) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-slate-400">
                Assessment Readiness
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Across All 4 Criteria
              </span>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#111827] border-[#1F2B3E]' : 'bg-white border-[#E2E8F0] shadow-xs'
              }`}
            >
              {CRITERIA_STATUS.map((crit) => {
                const statusBadge =
                  crit.status === 'strong'
                    ? 'text-emerald-400 bg-emerald-400/15 border-emerald-400/30'
                    : crit.status === 'developing'
                    ? 'text-blue-400 bg-blue-400/15 border-blue-400/30'
                    : 'text-amber-400 bg-amber-400/15 border-amber-400/30';

                return (
                  <div key={crit.key} className="space-y-1.5 pb-3.5 border-b border-slate-700/20 last:border-none last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-inherit">
                        Criterion {crit.key}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase ${statusBadge}`}
                      >
                        {crit.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <div className="font-medium text-slate-200 truncate">
                        {crit.scienceName}
                      </div>
                      <p className="mt-0.5 leading-snug line-clamp-2">
                        {crit.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                      <span>Mastery {crit.masteryPercentage}%</span>
                      <span className="font-bold text-indigo-400">Avg: {crit.recentScore}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

