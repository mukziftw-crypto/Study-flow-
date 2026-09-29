import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface IntroductionToIBProps {
  isDark: boolean;
  onExploreCriteria?: () => void;
}

type ProgressionStageId = 'ib' | 'myp' | 'myp5' | 'eassessment';

interface StageConfig {
  id: ProgressionStageId;
  abbr: string;
  stepNumber: string;
  title: string;
  tagline: string;
  summary: string;
  frameworkFocus: string;
  keyOutcomes: string[];
  accentColor: string;
  badgeStyle: string;
  cardActiveDark: string;
  cardActiveLight: string;
  connectorColor: string;
  glowColor: string;
}

export const IntroductionToIB: React.FC<IntroductionToIBProps> = ({
  isDark,
  onExploreCriteria,
}) => {
  const [activeStage, setActiveStage] = useState<ProgressionStageId>('myp5');

  const stages: StageConfig[] = [
    {
      id: 'ib',
      abbr: 'IB',
      stepNumber: '01',
      title: 'International Baccalaureate',
      tagline: 'Global Educational Foundation',
      summary:
        'A globally recognized educational foundation founded on developing inquiring, knowledgeable, and caring young people prepared for international challenges.',
      frameworkFocus:
        'Holistic education prioritizing international-mindedness, the IB Learner Profile, critical inquiry, and conceptual understanding across cultures.',
      keyOutcomes: [
        'Inquiry-led pedagogy over rote learning',
        'Holistic balance across arts, sciences & humanities',
        'Academic integrity & global responsibility',
      ],
      accentColor: 'text-blue-400',
      badgeStyle: isDark
        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
        : 'bg-blue-50 text-blue-700 border-blue-200',
      cardActiveDark: 'bg-[#131D33] border-blue-500/80 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/30',
      cardActiveLight: 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10',
      connectorColor: 'from-blue-500 to-indigo-500',
      glowColor: 'rgba(59, 130, 246, 0.15)',
    },
    {
      id: 'myp',
      abbr: 'MYP',
      stepNumber: '02',
      title: 'Middle Years Programme',
      tagline: 'Years 1 to 5 Framework (Ages 11–16)',
      summary:
        'The IB programme designed specifically for adolescents. Instruction connects classroom disciplines to real-world situations through Key Concepts and Global Contexts.',
      frameworkFocus:
        'Criterion-related assessment: students are graded against 4 criterion rubrics (A, B, C, D) scaled 0–8, not curved percentages or raw tallies.',
      keyOutcomes: [
        'Conceptual learning (Key & Related Concepts)',
        'Global Contexts framing real-world significance',
        'Distinct 4-criterion assessment in every subject',
      ],
      accentColor: 'text-indigo-400',
      badgeStyle: isDark
        ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
        : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      cardActiveDark: 'bg-[#151D38] border-indigo-500/80 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30',
      cardActiveLight: 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10',
      connectorColor: 'from-indigo-500 to-purple-500',
      glowColor: 'rgba(99, 102, 241, 0.15)',
    },
    {
      id: 'myp5',
      abbr: 'MYP 5',
      stepNumber: '03',
      title: 'The Culminating Final Year',
      tagline: 'Synthesis, Independence & Mastery',
      summary:
        'MYP 5 brings together subject knowledge, critical laboratory inquiry, advanced mathematical modelling, and prepares students for their future academic transition.',
      frameworkFocus:
        'Advanced cognitive synthesis: completing the Personal Project, solving unfamiliar mathematical multi-step problems, and formulating controlled scientific investigations.',
      keyOutcomes: [
        'Bridge to the IB Diploma Programme (DP)',
        'Synthesized Criteria A–D portfolio achievement',
        'Independent inquiry & real-world application',
      ],
      accentColor: 'text-purple-400',
      badgeStyle: isDark
        ? 'bg-purple-500/20 text-purple-200 border-purple-500/40'
        : 'bg-purple-50 text-purple-700 border-purple-200',
      cardActiveDark: 'bg-[#1C1733] border-purple-500/80 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500/30',
      cardActiveLight: 'bg-white border-purple-500 shadow-md ring-2 ring-purple-500/10',
      connectorColor: 'from-purple-500 to-teal-500',
      glowColor: 'rgba(168, 85, 247, 0.15)',
    },
    {
      id: 'eassessment',
      abbr: 'eAssessment',
      stepNumber: '04',
      title: 'External MYP Assessment',
      tagline: 'On-Screen Examinations & Portfolios',
      summary:
        'The external MYP assessment represents the final evaluation phase, providing recognized IB certification through authentic digital testing and moderated coursework portfolios.',
      frameworkFocus:
        'On-screen tests utilize interactive digital tools, dynamic simulations, multi-step scientific data analysis, and open-ended mathematical proofs.',
      keyOutcomes: [
        'Authentic on-screen interactive tasks',
        'Official IB Course Results & bilingual certificate eligibility',
        'Standardized evaluation against international grade bands 1–7',
      ],
      accentColor: 'text-teal-400',
      badgeStyle: isDark
        ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
        : 'bg-teal-50 text-teal-700 border-teal-200',
      cardActiveDark: 'bg-[#10242E] border-teal-500/80 shadow-lg shadow-teal-950/40 ring-1 ring-teal-500/30',
      cardActiveLight: 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/10',
      connectorColor: 'from-teal-500 to-emerald-500',
      glowColor: 'rgba(20, 184, 166, 0.15)',
    },
  ];

  const activeIndex = stages.findIndex((s) => s.id === activeStage);
  const activeStageConfig = stages[activeIndex];

  return (
    <section
      id="introduction-to-ib-section"
      className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-[#101726] via-[#0E1524] to-[#0A0F1D] border-[#1F2B3E] shadow-xl shadow-indigo-950/20'
          : 'bg-gradient-to-br from-white via-indigo-50/25 to-slate-50 border-indigo-100 shadow-sm'
      }`}
    >
      {/* Decorative ambient radial blur */}
      <div
        className="absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-500 opacity-60"
        style={{
          background: isDark
            ? `radial-gradient(circle, ${activeStageConfig.glowColor} 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Primary Header Section */}
      <div className="relative z-10 space-y-3 max-w-3xl">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-inherit">
            Welcome to StudyFlow
          </h1>
          <p className="text-base sm:text-lg font-semibold text-indigo-400/90 tracking-tight">
            Your MYP 5 learning and assessment workspace
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          StudyFlow is built around the IB Middle Years Programme. It helps you learn your subjects,
          practise MYP-style questions, understand the assessment criteria, track weaknesses, and prepare
          for assessments.
        </p>
      </div>

      {/* Visual Step-by-Step Flow: IB → MYP → MYP 5 → eAssessment */}
      <div className="mt-8 pt-6 border-t border-slate-700/20 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Progression: IB → MYP → MYP 5 → eAssessment
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any stage to examine the academic focus & skills
          </span>
        </div>

        {/* 4 Connected Cards with Modern Connecting Lines */}
        <div className="relative">
          {/* Subtle Desktop Connecting Vector Line running behind cards */}
          <div
            className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-[2px] z-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className={`w-full h-full bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-teal-500/40 rounded-full transition-all duration-300`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
            {stages.map((stage, idx) => {
              const isSelected = activeStage === stage.id;

              return (
                <div key={stage.id} className="relative flex flex-col">
                  <button
                    type="button"
                    onClick={() => setActiveStage(stage.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-full ${
                      isSelected
                        ? isDark
                          ? stage.cardActiveDark
                          : stage.cardActiveLight
                        : isDark
                        ? 'bg-[#0E1524] border-[#1C2638] hover:border-slate-600 hover:bg-[#121B2D]'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Top bar: Badge & Step Indicator */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border transition-colors ${stage.badgeStyle}`}
                        >
                          {stage.abbr}
                        </span>

                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                            isSelected
                              ? isDark
                                ? 'bg-white/10 text-white border-white/20'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : isDark
                              ? 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {stage.stepNumber}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3
                        className={`text-sm font-bold tracking-tight transition-colors ${
                          isSelected ? 'text-inherit font-extrabold' : 'text-slate-200'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium mt-1 leading-snug line-clamp-2">
                        {stage.tagline}
                      </p>
                    </div>

                    {/* Bottom Status / Selection Tag */}
                    <div className="mt-3.5 pt-2.5 border-t border-slate-700/20 flex items-center justify-between text-[11px]">
                      {isSelected ? (
                        <span className="font-semibold text-indigo-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                          <span>Active Insight</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[10px] group-hover:text-slate-300 transition-colors">
                          Stage {idx + 1} of 4
                        </span>
                      )}

                      <ChevronRight
                        size={13}
                        className={`transition-transform duration-200 ${
                          isSelected
                            ? 'text-indigo-400 translate-x-0.5'
                            : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Mobile Connecting line between vertical steps */}
                  {idx < stages.length - 1 && (
                    <div className="flex lg:hidden justify-center my-1.5">
                      <div className="w-px h-3 bg-slate-700/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Interactive Insight Box for Active Stage */}
        <div
          className={`mt-4 p-5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-r from-[#121A2C] via-[#0E1626] to-[#0A101D] border-[#223049]'
              : 'bg-gradient-to-r from-slate-50 via-white to-indigo-50/20 border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                    isDark
                      ? 'bg-slate-800 border border-slate-700 text-slate-200'
                      : 'bg-slate-100 border border-slate-200 text-slate-700'
                  }`}
                >
                  {activeStageConfig.stepNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Stage {activeStageConfig.stepNumber} Focus
                    </span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs font-bold text-inherit">
                      {activeStageConfig.title}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300/95 leading-relaxed pt-1">
                {activeStageConfig.summary}
              </p>

              <div className="pt-2 text-xs text-slate-400 flex items-start gap-1.5">
                <span className="font-semibold text-slate-200 shrink-0">Framework Key:</span>
                <span className="leading-relaxed">{activeStageConfig.frameworkFocus}</span>
              </div>
            </div>

            {/* Key Outcomes / Pillars */}
            <div className="shrink-0 space-y-2 md:w-72 pt-1 border-t md:border-t-0 md:border-l border-slate-700/20 md:pl-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Core Academic Hallmarks:
              </span>
              <ul className="space-y-1.5">
                {activeStageConfig.keyOutcomes.map((outcome, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {onExploreCriteria && (
            <div className="mt-4 pt-3 border-t border-slate-700/20 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Ready to review how this translates to your course grades?
              </span>
              <button
                type="button"
                onClick={onExploreCriteria}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Jump to Criteria Breakdown</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
