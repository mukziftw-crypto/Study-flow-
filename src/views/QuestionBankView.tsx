import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS, SUBJECTS } from '../data/mypData';
import { MathRenderer } from '../components/common/MathRenderer';
import { Search, Filter, PenTool, ArrowRight, HelpCircle } from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { startPractice, theme } = useApp();
  const isDark = theme === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedCriterion, setSelectedCriterion] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredQuestions = QUESTIONS.filter((q) => {
    if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
    if (selectedCriterion !== 'all' && q.criterion !== selectedCriterion) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        q.title.toLowerCase().includes(term) ||
        q.prompt.toLowerCase().includes(term) ||
        q.strand.toLowerCase().includes(term) ||
        q.commandTerm.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
              Item Repository
            </span>
            <span className="text-xs text-slate-400">· Criteria A–D Strands</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
            MYP 5 Question Bank
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {filteredQuestions.length} of {QUESTIONS.length} items available
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div
        className={`p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-4 gap-3 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
        }`}
      >
        {/* Search */}
        <div className="relative sm:col-span-1">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topic, formula, command term..."
            className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs font-mono border focus:outline-none ${
              isDark
                ? 'bg-[#0F1523] border-[#1C2638] text-slate-200'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          />
        </div>

        {/* Subject Filter */}
        <div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-mono border ${
              isDark ? 'bg-[#0F1523] border-[#1C2638] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Criterion Filter */}
        <div>
          <select
            value={selectedCriterion}
            onChange={(e) => setSelectedCriterion(e.target.value)}
            className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-mono border ${
              isDark ? 'bg-[#0F1523] border-[#1C2638] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Criteria (A–D)</option>
            <option value="A">Criterion A</option>
            <option value="B">Criterion B</option>
            <option value="C">Criterion C</option>
            <option value="D">Criterion D</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-mono border ${
              isDark ? 'bg-[#0F1523] border-[#1C2638] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Difficulties</option>
            <option value="Standard">Standard</option>
            <option value="Extended">Extended</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const critColor =
            q.criterion === 'A'
              ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'
              : q.criterion === 'B'
              ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
              : q.criterion === 'C'
              ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
              : 'text-purple-400 bg-purple-400/10 border-purple-400/20';

          return (
            <div
              key={q.id}
              onClick={() => startPractice(q.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#111723] border-[#1C2638] hover:border-[#4361EE]/40'
                  : 'bg-white border-[#E3E8F0] hover:border-[#4361EE]/50 shadow-xs'
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase text-[#4361EE] font-bold">
                    {q.topicName}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold border ${critColor}`}>
                    Crit {q.criterion}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-400 bg-slate-500/10">
                    {q.marks} marks
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-400 bg-slate-500/10">
                    {q.difficulty}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-inherit truncate">
                  {q.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2">
                  <MathRenderer content={q.prompt} />
                </p>

                <div className="text-[11px] font-mono text-slate-500 pt-1">
                  Command term: <strong className="text-slate-300">{q.commandTerm}</strong> · {q.strand}
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <button className="px-3.5 py-1.5 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors flex items-center gap-1.5">
                  <PenTool size={12} />
                  <span>Practise</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
