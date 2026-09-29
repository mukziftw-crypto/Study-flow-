import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS } from '../data/mypData';
import { MathRenderer } from '../components/common/MathRenderer';
import { ErrorCategory, Question } from '../types';
import {
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Flame,
  Check,
  Flag,
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const {
    activeQuestionId,
    setActiveQuestionId,
    addMistake,
    setRoute,
    theme,
  } = useApp();

  const isDark = theme === 'dark';
  const currentQuestion = QUESTIONS.find((q) => q.id === activeQuestionId) || QUESTIONS[0];

  // Practice state
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [selfScore, setSelfScore] = useState<number | null>(null);

  // Diagnostic mistake modal/form state
  const [isLoggingMistake, setIsLoggingMistake] = useState(false);
  const [errorType, setErrorType] = useState<ErrorCategory>('Calculation');
  const [userNote, setUserNote] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [mistakeSaved, setMistakeSaved] = useState(false);

  // Switch to next question
  const handleNextQuestion = () => {
    const currentIndex = QUESTIONS.findIndex((q) => q.id === currentQuestion.id);
    const nextQ = QUESTIONS[(currentIndex + 1) % QUESTIONS.length];
    setActiveQuestionId(nextQ.id);
    setUserAnswer('');
    setIsSubmitted(false);
    setShowHints(false);
    setShowMarkScheme(false);
    setSelfScore(null);
    setIsLoggingMistake(false);
    setMistakeSaved(false);
  };

  const handleSaveMistake = () => {
    if (!userNote.trim()) return;
    addMistake({
      questionId: currentQuestion.id,
      subjectId: currentQuestion.subjectId,
      topicId: currentQuestion.topicId,
      topicName: currentQuestion.topicName,
      questionTitle: currentQuestion.title,
      criterion: currentQuestion.criterion,
      strand: currentQuestion.strand,
      errorType,
      userNote,
      actionPlan: actionPlan || 'Review core formulas and rework similar strand problems.',
    });
    setMistakeSaved(true);
    setIsLoggingMistake(false);
  };

  const critColor =
    currentQuestion.criterion === 'A'
      ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      : currentQuestion.criterion === 'B'
      ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      : currentQuestion.criterion === 'C'
      ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
      : 'text-purple-400 bg-purple-400/10 border-purple-400/20';

  return (
    <div className="max-w-[900px] mx-auto space-y-6 animate-fade-in">
      {/* Top Breadcrumb & Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/20">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-[#4361EE] font-semibold">
            {currentQuestion.topicName}
          </span>
          <span className="text-slate-600">/</span>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${critColor}`}
          >
            Criterion {currentQuestion.criterion}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-500/10">
            {currentQuestion.marks} marks
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-500/10">
            {currentQuestion.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-3 py-1 rounded text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              showHints
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : isDark
                ? 'bg-[#141C2B] text-slate-400 border-[#1C2638] hover:text-white'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Lightbulb size={13} />
            <span>{showHints ? 'Hide Hints' : 'Hint'}</span>
          </button>

          <button
            onClick={handleNextQuestion}
            className="px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Skip →
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div
        className={`p-6 rounded-xl border space-y-4 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
        }`}
      >
        {/* Strand & Command Term Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/20">
          <div className="text-xs text-slate-400">
            Strand: <strong className="text-slate-200">{currentQuestion.strand}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Command Term:</span>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#4361EE]/10 text-[#4361EE] border border-[#4361EE]/20">
              {currentQuestion.commandTerm}
            </span>
          </div>
        </div>

        {/* Title & Prompt */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-inherit">
            {currentQuestion.title}
          </h3>

          <div className="text-sm text-slate-300 leading-relaxed font-sans space-y-2">
            <MathRenderer content={currentQuestion.prompt} />
          </div>
        </div>

        {/* Data Table if applicable */}
        {currentQuestion.dataTable && (
          <div className="my-4 overflow-x-auto border border-slate-700/30 rounded-lg">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-[#141C2B] text-slate-300 border-b border-slate-700/30">
                <tr>
                  {currentQuestion.dataTable.headers.map((h, i) => (
                    <th key={i} className="px-3.5 py-2 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/20 text-slate-300">
                {currentQuestion.dataTable.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={rIdx % 2 === 0 ? 'bg-[#111723]' : 'bg-[#131A28]'}
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2">
                        <MathRenderer content={String(cell)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {currentQuestion.dataTable.caption && (
              <div className="px-3 py-1.5 bg-[#141C2B] text-[10px] font-mono text-slate-400 border-t border-slate-700/20">
                {currentQuestion.dataTable.caption}
              </div>
            )}
          </div>
        )}

        {/* Key Conceptual Guidance Banner */}
        {currentQuestion.katexSnippet && (
          <div className="p-2.5 rounded-lg bg-[#141C2B] border border-[#1F2B3F] text-center text-xs font-mono text-slate-300">
            <span className="text-[10px] uppercase tracking-wider text-indigo-400 mr-2 font-mono font-bold">
              Conceptual focus:
            </span>
            <span>{currentQuestion.katexSnippet}</span>
          </div>
        )}

        {/* Collapsible Hints */}
        {showHints && (
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 space-y-2">
            <div className="font-semibold flex items-center gap-1.5 text-amber-400">
              <Lightbulb size={14} />
              <span>Scaffolded Problem-Solving Hints</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              {currentQuestion.hints.map((hint, idx) => (
                <li key={idx} className="leading-relaxed">
                  <MathRenderer content={hint} />
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Answer Input Working Area */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-slate-400 uppercase font-medium">
              Student Working & Justification:
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              Auto-saved locally
            </span>
          </div>

          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isSubmitted}
            placeholder="Type your algebraic steps, substitutions, reasoning, and final units here..."
            rows={5}
            className={`w-full p-3.5 rounded-lg font-mono text-xs border focus:outline-none transition-all leading-relaxed ${
              isDark
                ? 'bg-[#0F1523] border-[#1C2638] text-slate-200 focus:border-[#4361EE]'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#4361EE]'
            }`}
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <button
                onClick={() => {
                  setIsSubmitted(true);
                  setShowMarkScheme(true);
                }}
                className="px-5 py-2 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
              >
                Submit & Verify Mark Scheme
              </button>
            ) : (
              <button
                onClick={() => setShowMarkScheme(!showMarkScheme)}
                className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                {showMarkScheme ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{showMarkScheme ? 'Hide Mark Scheme' : 'Show Mark Scheme'}</span>
              </button>
            )}
          </div>

          {isSubmitted && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLoggingMistake(!isLoggingMistake)}
                className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Flag size={13} />
                <span>Log to Mistakes Center</span>
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Next Question</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Diagnostic Log Mistake Panel */}
      {isLoggingMistake && (
        <div
          className={`p-5 rounded-xl border border-rose-500/30 space-y-4 ${
            isDark ? 'bg-[#181523]' : 'bg-rose-50/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <AlertCircle size={15} />
              Diagnostic Mistake Log · Criterion {currentQuestion.criterion}
            </h4>
            <span className="text-[11px] text-slate-400">
              Categorize for targeted re-testing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Root Error Category:
              </label>
              <select
                value={errorType}
                onChange={(e) => setErrorType(e.target.value as ErrorCategory)}
                className={`w-full p-2 rounded text-xs border font-mono ${
                  isDark
                    ? 'bg-[#111723] border-[#2A2338] text-slate-200'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <option value="Calculation">Calculation (Arithmetic / Algebraic error)</option>
                <option value="Conceptual">Conceptual (Misunderstood scientific law)</option>
                <option value="Command term">Command term (Did not fulfill command depth)</option>
                <option value="Data interpretation">Data interpretation (Graph/table reading error)</option>
                <option value="Careless">Careless (Units / Transposition omission)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                What did I get wrong?
              </label>
              <input
                type="text"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g. Forgot to square the radius in A = πr²"
                className={`w-full p-2 rounded text-xs border ${
                  isDark
                    ? 'bg-[#111723] border-[#2A2338] text-slate-200'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              What should I do now? (Revision Action Plan)
            </label>
            <input
              type="text"
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
              placeholder="e.g. Re-derive formula with units; practice 2 more magnetic flux problems"
              className={`w-full p-2 rounded text-xs border ${
                isDark
                  ? 'bg-[#111723] border-[#2A2338] text-slate-200'
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsLoggingMistake(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMistake}
              className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors"
            >
              Save to Diagnostic Queue
            </button>
          </div>
        </div>
      )}

      {mistakeSaved && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center justify-between">
          <span>
            Diagnostic mistake logged to your <strong>Mistakes Center</strong>. It will be prioritized in your revision queue.
          </span>
          <button
            onClick={() => setRoute('mistakes')}
            className="underline font-medium hover:text-emerald-300"
          >
            View in Mistakes →
          </button>
        </div>
      )}

      {/* Official Mark Scheme & Exemplar Solution */}
      {isSubmitted && showMarkScheme && (
        <div
          className={`p-6 rounded-xl border space-y-4 ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <h4 className="text-sm font-semibold font-mono tracking-wide uppercase text-slate-200">
                Official MYP Step-by-Step Mark Scheme
              </h4>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Total {currentQuestion.marks} marks
            </span>
          </div>

          {/* Mark Breakdown */}
          <div className="space-y-2 text-xs text-slate-300">
            {currentQuestion.markScheme.map((mark, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="leading-relaxed">
                  <MathRenderer content={mark} />
                </p>
              </div>
            ))}
          </div>

          {/* Complete Model Solution */}
          <div className="mt-4 pt-4 border-t border-slate-700/20 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Exemplar Academic Model Answer:
            </span>
            <div
              className={`p-4 rounded-lg font-sans text-xs text-slate-300 leading-relaxed ${
                isDark ? 'bg-[#0F1523] border border-[#1C2638]' : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <MathRenderer content={currentQuestion.sampleSolution} />
            </div>
          </div>

          {/* Self-Assessment Marks Selector */}
          <div className="mt-4 pt-4 border-t border-slate-700/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-400">
              Self-Assess Your Marks:
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: currentQuestion.marks + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelfScore(i)}
                  className={`w-7 h-7 rounded text-xs font-mono font-medium transition-colors ${
                    selfScore === i
                      ? 'bg-[#4361EE] text-white'
                      : isDark
                      ? 'bg-[#182030] text-slate-300 border border-[#233047] hover:bg-[#202B40]'
                      : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {i}
                </button>
              ))}
              <span className="text-xs font-mono text-slate-400 ml-1">
                / {currentQuestion.marks}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
