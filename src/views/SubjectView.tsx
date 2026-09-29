import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS, TOPICS, QUESTIONS, MOCK_TESTS } from '../data/mypData';
import { SubjectId } from '../types';
import { ArrowRight, BookOpen, PenTool, HelpCircle, FileCheck2, AlertCircle, Sparkles, ChevronRight, Copy, Check, PenLine } from 'lucide-react';

export const SubjectView: React.FC = () => {
  const {
    selectedSubjectId,
    setSelectedSubjectId,
    openTopic,
    startPractice,
    setRoute,
    theme,
    topicNotesCache,
    studentNotes,
  } = useApp();

  const [copiedAll, setCopiedAll] = useState(false);

  const isDark = theme === 'dark';
  const currentSubject = SUBJECTS.find(s => s.id === selectedSubjectId) || SUBJECTS[0];
  const subjectTopics = TOPICS.filter(t => t.subjectId === currentSubject.id);
  const subjectQuestions = QUESTIONS.filter(q => q.subjectId === currentSubject.id);
  const subjectMock = MOCK_TESTS.find(m => m.subjectId === currentSubject.id);

  const handleCopyAllNotes = () => {
    let fullGuide = `# ${currentSubject.name} (MYP 5)\nComplete Comprehensive Conceptual Study Guide (No Formulas)\n\n`;
    subjectTopics.forEach(t => {
      fullGuide += `========================================================\n`;
      fullGuide += `${t.unit}: ${t.name}\n`;
      fullGuide += `========================================================\n`;
      fullGuide += `Description: ${t.description}\n\n`;
      fullGuide += `Core Conceptual Principles:\n`;
      t.coreTheory.forEach((p, idx) => {
        fullGuide += `${idx + 1}. ${p}\n`;
      });
      fullGuide += `\nKey Conceptual Relationships:\n`;
      t.equations.forEach(eq => {
        fullGuide += `- ${eq.name}: ${eq.meaning || ''} (${eq.notes})\n`;
      });
      fullGuide += `\nCommon Traps & Misconceptions:\n`;
      t.misconceptions.forEach(m => {
        fullGuide += `• ${m}\n`;
      });
      const cached = topicNotesCache[t.id];
      if (cached) {
        fullGuide += `\nGemini Deep-Dive Academic Notes:\n${cached.overview}\n`;
      }
      fullGuide += `\n\n`;
    });

    navigator.clipboard.writeText(fullGuide);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Subject Header & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              {currentSubject.code}
            </span>
            <span className="text-xs text-slate-400">· MYP Year 5</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
            {currentSubject.name}
          </h2>
        </div>

        {/* Horizontal tabs to toggle between the 4 subjects */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {SUBJECTS.map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                sub.id === currentSubject.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : isDark
                  ? 'bg-[#151F33] text-slate-400 hover:text-slate-100 hover:bg-[#1A2740]'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {sub.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Core Subject Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Unit Focus */}
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
            Current Focus
          </span>
          <h4 className="text-sm font-semibold mt-1 text-inherit">
            {currentSubject.currentUnit}
          </h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {currentSubject.nextRecommendedAction}
          </p>
        </div>

        {/* Weakest Areas */}
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold tracking-wider">
            Target Weaknesses
          </span>
          <h4 className="text-sm font-semibold mt-1 text-inherit">
            {currentSubject.weakestArea}
          </h4>
          <p className="text-xs text-slate-400 mt-2">
            Priority diagnostic revision for next assessment cycle.
          </p>
        </div>

        {/* Predicted Academic Grade & Readiness (NO PROGRESS BAR) */}
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#111827] border-[#1F2B3E]' : 'bg-white border-[#E2E8F0] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Predicted MYP Grade
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-sm font-bold font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              Level {currentSubject.predictedGrade} / 7
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span>Status: <strong className="text-emerald-400">On Track for Diploma</strong></span>
            <span className="text-slate-400">{currentSubject.totalQuestionsCompleted} problems</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-700/20">
            Recent: <span className="text-slate-200">{currentSubject.recentPerformance}</span>
          </p>
        </div>
      </div>

      {/* Quick Navigation Action Hub */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => {
            if (subjectTopics.length > 0) openTopic(subjectTopics[0].id);
          }}
          className={`p-3 rounded-lg border text-left transition-all ${
            isDark
              ? 'bg-[#141C2B] border-[#1C2638] hover:border-[#4361EE]/40 text-slate-300'
              : 'bg-white border-[#E3E8F0] hover:border-[#4361EE]/50 text-slate-700 shadow-xs'
          }`}
        >
          <BookOpen size={16} className="text-[#4361EE] mb-1.5" />
          <div className="text-xs font-semibold">Topics</div>
          <div className="text-[10px] text-slate-400">Theory & Simulators</div>
        </button>

        <button
          onClick={() => setRoute('notes')}
          className={`p-3 rounded-lg border text-left transition-all ${
            isDark
              ? 'bg-[#141C2B] border-[#1C2638] hover:border-indigo-500/40 text-slate-300'
              : 'bg-white border-[#E3E8F0] hover:border-indigo-500/50 text-slate-700 shadow-xs'
          }`}
        >
          <PenLine size={16} className="text-indigo-400 mb-1.5" />
          <div className="text-xs font-semibold">Study Notes</div>
          <div className="text-[10px] text-slate-400">Student & AI Guide</div>
        </button>

        <button
          onClick={() => {
            if (subjectQuestions.length > 0) startPractice(subjectQuestions[0].id);
          }}
          className={`p-3 rounded-lg border text-left transition-all ${
            isDark
              ? 'bg-[#141C2B] border-[#1C2638] hover:border-[#4361EE]/40 text-slate-300'
              : 'bg-white border-[#E3E8F0] hover:border-[#4361EE]/50 text-slate-700 shadow-xs'
          }`}
        >
          <PenTool size={16} className="text-emerald-500 mb-1.5" />
          <div className="text-xs font-semibold">Practice</div>
          <div className="text-[10px] text-slate-400">Strand questions</div>
        </button>

        <button
          onClick={() => setRoute('question-bank')}
          className={`p-3 rounded-lg border text-left transition-all ${
            isDark
              ? 'bg-[#141C2B] border-[#1C2638] hover:border-[#4361EE]/40 text-slate-300'
              : 'bg-white border-[#E3E8F0] hover:border-[#4361EE]/50 text-slate-700 shadow-xs'
          }`}
        >
          <HelpCircle size={16} className="text-amber-500 mb-1.5" />
          <div className="text-xs font-semibold">Question Bank</div>
          <div className="text-[10px] text-slate-400">Criteria A–D filter</div>
        </button>

        <button
          onClick={() => setRoute('mock-test')}
          className={`p-3 rounded-lg border text-left transition-all ${
            isDark
              ? 'bg-[#141C2B] border-[#1C2638] hover:border-[#4361EE]/40 text-slate-300'
              : 'bg-white border-[#E3E8F0] hover:border-[#4361EE]/50 text-slate-700 shadow-xs'
          }`}
        >
          <FileCheck2 size={16} className="text-purple-500 mb-1.5" />
          <div className="text-xs font-semibold">Mock Test</div>
          <div className="text-[10px] text-slate-400">Timed assessment</div>
        </button>
      </div>

      {/* Curriculum Units & Topics Breakdown */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-slate-400">
              Curriculum Units & Conceptual Study Notes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive MYP 5 unit guides with formula-free conceptual rigor and Gemini AI expansions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllNotes}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                isDark
                  ? 'bg-[#141C2B] border-[#1F2B3F] text-slate-300 hover:text-white hover:bg-[#1A253A]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              {copiedAll ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied All Units!</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-slate-400" />
                  <span>Copy Master Study Sheet</span>
                </>
              )}
            </button>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {subjectTopics.length} modules
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {subjectTopics.map(topic => {
            const hasGeminiNotes = Boolean(topicNotesCache[topic.id] || topic.extendedNotes);
            const hasPersonalNotes = Boolean(studentNotes[topic.id]?.content?.trim());
            return (
              <div
                key={topic.id}
                onClick={() => openTopic(topic.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                  isDark
                    ? 'bg-[#111723] border-[#1C2638] hover:border-indigo-500/40 hover:bg-[#141C2B]'
                    : 'bg-white border-[#E3E8F0] hover:border-indigo-500/30 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-[#4361EE] font-bold">
                      {topic.unit}
                    </span>
                    {topic.simulationId && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Canvas Lab
                      </span>
                    )}
                    {hasPersonalNotes && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <PenLine size={9} /> Student Notes
                      </span>
                    )}
                    {hasGeminiNotes ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Sparkles size={9} /> AI Notes Ready
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-700/30 text-slate-400 border border-slate-700/50">
                        Core Notes
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-inherit group-hover:text-indigo-400 transition-colors">
                    {topic.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {topic.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-medium text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Notes & Explore <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
