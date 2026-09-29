import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_TESTS } from '../data/mypData';
import { MathRenderer } from '../components/common/MathRenderer';
import {
  Clock,
  CheckCircle,
  FileText,
  Save,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';

export const MockTestView: React.FC = () => {
  const { activeMockTestId, setActiveMockTestId, setRoute, theme } = useApp();
  const isDark = theme === 'dark';

  const mock = MOCK_TESTS.find(m => m.id === activeMockTestId) || MOCK_TESTS[0];
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const currentQuestion = mock.questions[activeQuestionIndex] || mock.questions[0];

  // Timer: duration in minutes
  const [secondsRemaining, setSecondsRemaining] = useState(mock.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isTimerRunning || secondsRemaining <= 0 || submitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, secondsRemaining, submitted]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (text: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: text }));
  };

  return (
    <div className="max-w-[960px] mx-auto space-y-6 animate-fade-in">
      {/* Assessment Header Bar */}
      <div
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
              Official Assessment Mode
            </span>
            <span className="text-xs font-mono text-slate-400">
              Total {mock.totalMarks} marks · Criteria {mock.criteriaFocus.join(', ')}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-inherit mt-1">
            {mock.title}
          </h2>
        </div>

        {/* Timer & Auto-Save */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <Save size={13} className="text-emerald-500 animate-pulse" />
            <span>Saved</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-lg border font-mono text-sm font-bold flex items-center gap-2 ${
              secondsRemaining < 300
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : isDark
                ? 'bg-[#141C2B] text-slate-200 border-[#1C2638]'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            <Clock size={15} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setIsFormulaSheetOpen(!isFormulaSheetOpen)}
            className="px-3 py-1.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 text-xs font-medium border border-slate-700/40 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen size={13} />
            <span>Conceptual Guide</span>
          </button>
        </div>
      </div>

      {/* Conceptual Strategy & Reference Drawer */}
      {isFormulaSheetOpen && (
        <div
          className={`p-5 rounded-xl border border-indigo-500/40 text-xs space-y-3 ${
            isDark ? 'bg-[#121929]' : 'bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-mono font-bold uppercase tracking-wider text-indigo-400">
              IB MYP Sciences & Mathematics Conceptual Reference
            </h4>
            <button
              onClick={() => setIsFormulaSheetOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold font-mono text-[11px] block">Magnetic Induction Principle:</span>
              <p className="text-[11px] text-slate-300 leading-snug">
                Induced voltage depends on the time rate of change of magnetic flux; static magnetic fields generate zero electromotive force.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold font-mono text-[11px] block">DC Electrical Circuits:</span>
              <p className="text-[11px] text-slate-300 leading-snug">
                Current is directly proportional to voltage and inversely proportional to resistance; terminal voltage equals total electromotive force minus internal resistance loss.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold font-mono text-[11px] block">Kinetics & Modelling:</span>
              <p className="text-[11px] text-slate-300 leading-snug">
                Reactions accelerate when kinetic energy exceeds activation energy threshold; parabolic discriminant indicates real coordinate intercepts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question Navigation Matrix */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400">Questions:</span>
        <div className="flex items-center gap-1.5">
          {mock.questions.map((q, idx) => {
            const hasAnswer = Boolean(answers[q.id]?.trim());
            const isActive = activeQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIndex(idx)}
                className={`w-8 h-8 rounded text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-[#4361EE] text-white ring-2 ring-indigo-400/50'
                    : hasAnswer
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : isDark
                    ? 'bg-[#141C2B] text-slate-400 border border-[#1C2638] hover:text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Exam Question Sheet */}
      <div
        className={`p-6 rounded-xl border space-y-4 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-slate-200">
              Question {activeQuestionIndex + 1} of {mock.questions.length}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs font-mono text-amber-400">
              Criterion {currentQuestion.criterion}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [{currentQuestion.marks} marks]
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-inherit">
            {currentQuestion.title}
          </h3>
          <div className="text-sm text-slate-300 leading-relaxed font-sans">
            <MathRenderer content={currentQuestion.prompt} />
          </div>
        </div>

        {/* Data Table if applicable */}
        {currentQuestion.dataTable && (
          <div className="my-3 overflow-x-auto border border-slate-700/30 rounded-lg">
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
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-[#111723]' : 'bg-[#131A28]'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2">
                        <MathRenderer content={String(cell)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Written Response Area */}
        <div className="pt-2 space-y-2">
          <label className="text-xs font-mono text-slate-400 block uppercase">
            Candidate Response:
          </label>
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            disabled={submitted}
            placeholder="Write your complete response, including relevant mathematical working, formulas, and conclusions..."
            rows={7}
            className={`w-full p-4 rounded-lg font-mono text-xs border focus:outline-none transition-all leading-relaxed ${
              isDark
                ? 'bg-[#0F1523] border-[#1C2638] text-slate-200 focus:border-[#4361EE]'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#4361EE]'
            }`}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/20">
          <button
            onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
            disabled={activeQuestionIndex === 0}
            className="px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
          >
            <ArrowLeft size={13} /> Previous
          </button>

          <div className="flex items-center gap-3">
            {activeQuestionIndex < mock.questions.length - 1 ? (
              <button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                className="px-4 py-2 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      </div>

      {submitted && (
        <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold font-mono text-sm">
            <CheckCircle size={16} />
            Assessment Successfully Completed & Recorded
          </div>
          <p className="text-slate-300">
            All responses have been archived. You can now evaluate your performance against the mark scheme in the Results section.
          </p>
          <button
            onClick={() => setRoute('results')}
            className="underline font-medium text-emerald-300"
          >
            Proceed to Assessment Results →
          </button>
        </div>
      )}
    </div>
  );
};
