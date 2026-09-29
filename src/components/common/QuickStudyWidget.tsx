import React, { useState } from 'react';
import {
  Zap,
  Clock,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { CRITERIA_STATUS, REVISION_QUEUE, QUESTIONS } from '../../data/mypData';
import { CriterionStatus, RevisionItem } from '../../types';

interface QuickStudyWidgetProps {
  isDark: boolean;
  onStartTopic: (topicId: string) => void;
  onStartQuestion?: (questionId: string) => void;
  onGoToMistakes: () => void;
  onScrollToCriteria?: () => void;
}

export const QuickStudyWidget: React.FC<QuickStudyWidgetProps> = ({
  isDark,
  onStartTopic,
  onStartQuestion,
  onGoToMistakes,
  onScrollToCriteria,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 1. Identify the student's least mastered MYP criterion (lowest masteryPercentage)
  const sortedCriteria = [...CRITERIA_STATUS].sort(
    (a, b) => a.masteryPercentage - b.masteryPercentage
  );
  const leastMasteredCriterion: CriterionStatus = sortedCriteria[0]; // Criterion C (48%)

  // 2. Select the single highest-priority revision task matching this criterion
  const matchedTasks = REVISION_QUEUE.filter(
    (item) => item.criterion === leastMasteredCriterion.key
  );
  // Fallback to highest overall urgency if none matches directly
  const recommendedTask: RevisionItem = matchedTasks[0] || REVISION_QUEUE[0];

  // 3. Identify an active practice question matching this topic for direct launch
  const matchingQuestion = QUESTIONS.find(
    (q) => q.topicId === recommendedTask.topicId
  );

  const handleStart = () => {
    if (matchingQuestion && onStartQuestion) {
      onStartQuestion(matchingQuestion.id);
    } else {
      onStartTopic(recommendedTask.topicId);
    }
  };

  return (
    <div
      id="quick-study-widget"
      className={`p-5 sm:p-6 rounded-2xl border transition-all relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#121A2E] via-[#0E1526] to-[#0A0F1D] border-indigo-500/40 shadow-lg shadow-indigo-950/30'
          : 'bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/30 border-indigo-200 shadow-sm'
      }`}
    >
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 right-0 w-72 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-indigo-400">
                  Quick Study
                </h3>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs font-semibold text-slate-300">
                  Targeted Efficiency Recommendation
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Single highest-yield task chosen from your diagnostic error history
              </p>
            </div>
          </div>

          {/* Diagnostic Badge */}
          <div className="flex items-center gap-2">
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${
                isDark
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <AlertCircle size={12} className="text-amber-400" />
              <span>Lowest Mastery: Criterion {leastMasteredCriterion.key} ({leastMasteredCriterion.masteryPercentage}%)</span>
            </div>
          </div>
        </div>

        {/* The Recommended Task Card */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDark
              ? 'bg-[#0E1524] border-[#1E2B40]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {recommendedTask.topicName}
                </span>

                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  Criterion {recommendedTask.criterion} Focus
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Clock size={12} />
                  <span>~8–10 min session</span>
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-inherit">
                  {recommendedTask.subtopic}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {recommendedTask.reason}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-700/20">
              {isCompleted ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Completed Today</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Quick Study</span>
                  <ArrowRight size={14} />
                </button>
              )}

              <button
                type="button"
                onClick={onGoToMistakes}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                title="Review logged mistakes for this topic"
              >
                <RotateCcw size={13} />
                <span>Mistakes</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCompleted(!isCompleted)}
                className={`p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  isCompleted
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                    : isDark
                    ? 'border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
                title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
              >
                <CheckCircle2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Why this task was chosen (Diagnostic Transparency Toggle) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-[11px] font-medium text-slate-400 hover:text-indigo-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle size={12} />
            <span>Why was this task recommended?</span>
            {showExplanation ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {showExplanation && (
            <div
              className={`mt-2.5 p-3.5 rounded-xl border text-xs leading-relaxed space-y-2 transition-all ${
                isDark
                  ? 'bg-[#0B101D] border-slate-800 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="font-semibold text-inherit flex items-center gap-1.5">
                <span>Diagnostic Criteria Evaluation:</span>
              </div>
              <p>
                StudyFlow calculated your criterion performance across all 4 MYP subjects. Your lowest
                standing is currently <strong className="text-inherit">Criterion {leastMasteredCriterion.key} ({leastMasteredCriterion.scienceName} / {leastMasteredCriterion.mathName})</strong> with a mastery rate of <strong className="text-amber-400">{leastMasteredCriterion.masteryPercentage}%</strong> (average {leastMasteredCriterion.recentScore}).
              </p>
              <p>
                By dedicating 8–10 minutes to resolve errors on <strong className="text-inherit">{recommendedTask.subtopic}</strong>, you directly improve your Criterion {leastMasteredCriterion.key} achievement band towards Level 6–7.
              </p>

              {onScrollToCriteria && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onScrollToCriteria}
                    className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all 4 Criteria statuses</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
