import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookMarked, Award, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export const IBResourcesView: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'criteria' | 'command-terms' | 'dp-transition'>('criteria');

  const criteriaDetails = [
    {
      key: 'A',
      title: 'Criterion A',
      sciencesTitle: 'Knowing and Understanding',
      mathTitle: 'Knowing and Understanding',
      strands: [
        'i. Explain scientific knowledge / select appropriate mathematics',
        'ii. Apply scientific knowledge and understanding to solve problems / apply mathematical problem-solving techniques',
        'iii. Analyse information to make scientifically supported judgments / state predictions',
      ],
      rubric: [
        { levels: '1–2', desc: 'States scientific knowledge; applies knowledge to solve simple problems with limited success.' },
        { levels: '3–4', desc: 'Outlines scientific knowledge; applies knowledge to solve familiar problems correctly.' },
        { levels: '5–6', desc: 'Describes scientific knowledge; applies understanding to solve familiar and unfamiliar problems.' },
        { levels: '7–8', desc: 'Explains scientific knowledge comprehensively; provides nuanced solutions to complex and unfamiliar problems.' },
      ]
    },
    {
      key: 'B',
      title: 'Criterion B',
      sciencesTitle: 'Inquiring and Designing',
      mathTitle: 'Investigating Patterns',
      strands: [
        'i. Formulate a testable hypothesis and explain it using scientific reasoning / select appropriate inquiry methods',
        'ii. Design scientific investigations with controlled, independent, and dependent variables',
        'iii. Describe how to manipulate the variables and explain how data will be collected',
      ],
      rubric: [
        { levels: '1–2', desc: 'States a basic problem or pattern; lists some variables.' },
        { levels: '3–4', desc: 'Outlines a testable hypothesis; outlines variable control and basic investigation steps.' },
        { levels: '5–6', desc: 'Describes a well-reasoned hypothesis; designs a safe, reliable, and valid experimental method.' },
        { levels: '7–8', desc: 'Explains a sophisticated hypothesis; designs an exhaustive, reproducible method with rigorous error minimisation.' },
      ]
    },
    {
      key: 'C',
      title: 'Criterion C',
      sciencesTitle: 'Processing and Evaluating',
      mathTitle: 'Communicating',
      strands: [
        'i. Present collected and transformed data / use appropriate mathematical notation and terminology',
        'ii. Interpret data and explain results using scientific reasoning / organize working in logical, line-by-line sequences',
        'iii. Evaluate the validity of a hypothesis based on investigation outcomes',
        'iv. Discuss the validity and reliability of the method, suggesting realistic improvements',
      ],
      rubric: [
        { levels: '1–2', desc: 'Collects and presents basic data in disorganized forms; identifies simple trends.' },
        { levels: '3–4', desc: 'Presents transformed data correctly; describes trends and outlines simple errors.' },
        { levels: '5–6', desc: 'Accurately transforms data with uncertainty limits; evaluates hypothesis validity with sound scientific reasoning.' },
        { levels: '7–8', desc: 'Thoroughly processes quantitative and qualitative data; critically evaluates methodology and proposes realistic, specific improvements.' },
      ]
    },
    {
      key: 'D',
      title: 'Criterion D',
      sciencesTitle: 'Reflecting on the Impacts of Science',
      mathTitle: 'Applying Mathematics in Real-World Contexts',
      strands: [
        'i. Explain the ways in which science is applied and used to address a specific issue / identify relevant elements of real-life situations',
        'ii. Discuss and evaluate the implications of using science and its application to solve a problem (moral, ethical, social, economic, environmental)',
        'iii. Consistently apply scientific language to communicate clearly',
        'iv. Document the work of others and sources of information using standard citation',
      ],
      rubric: [
        { levels: '1–2', desc: 'States ways science is applied; outlines simple implications with minimal detail.' },
        { levels: '3–4', desc: 'Summarizes scientific applications; describes ethical/social/environmental implications.' },
        { levels: '5–6', desc: 'Explains scientific solutions; discusses multiple implications critically; cites sources.' },
        { levels: '7–8', desc: 'Comprehensively evaluates complex global applications; critically analyzes nuanced ethical and economic dilemmas with exemplary citation.' },
      ]
    }
  ];

  const commandTerms = [
    { term: 'State', meaning: 'Give a specific name, value or other brief answer without explanation or calculation.' },
    { term: 'Outline', meaning: 'Give a brief summary of the essential features or principles.' },
    { term: 'Describe', meaning: 'Give a detailed account or picture of a situation, event, pattern or process.' },
    { term: 'Explain', meaning: 'Give a detailed account including reasons or causes.' },
    { term: 'Evaluate', meaning: 'Make an appraisal by weighing up the strengths and limitations.' },
    { term: 'Justify', meaning: 'Give valid reasons or evidence to support an answer or conclusion.' },
    { term: 'Suggest', meaning: 'Propose a solution, hypothesis or other possible answer based on scientific/mathematical logic.' },
    { term: 'Calculate', meaning: 'Obtain a numerical answer showing the relevant stages in the working.' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            IB MYP Framework
          </span>
          <span className="text-xs text-slate-400">· Assessment Criteria & Rubrics</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          MYP 5 Academic Specification & Guide
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Authoritative assessment criteria, 1–8 markband descriptors, command terms, and preparation for the Diploma Programme.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/20 pb-2">
        {[
          { id: 'criteria', label: 'Criteria A–D Rubrics' },
          { id: 'command-terms', label: 'IB Command Terms Glossary' },
          { id: 'dp-transition', label: 'MYP to DP Transition Roadmap' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#4361EE] text-white shadow-xs'
                : isDark
                ? 'bg-[#141C2B] text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Criteria A–D */}
      {activeTab === 'criteria' && (
        <div className="space-y-6">
          {criteriaDetails.map((crit) => (
            <div
              key={crit.key}
              className={`p-6 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/20">
                <div>
                  <span className="text-xs font-mono text-[#4361EE] font-bold">
                    {crit.title}
                  </span>
                  <h3 className="text-base font-semibold text-inherit mt-0.5">
                    Sciences: {crit.sciencesTitle} · Math: {crit.mathTitle}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Scale: 1–8 Marks
                </span>
              </div>

              {/* Strands */}
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider block mb-2">
                  Assessment Strands:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {crit.strands.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4361EE] mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Markband Descriptors */}
              <div className="mt-4 pt-4 border-t border-slate-700/20">
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider block mb-2">
                  Official MYP Achievement Level Descriptors:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {crit.rubric.map((r, rIdx) => (
                    <div
                      key={rIdx}
                      className={`p-3 rounded-lg border ${
                        isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="font-mono font-bold text-slate-200 mb-1">
                        Levels {r.levels}
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Command Terms */}
      {activeTab === 'command-terms' && (
        <div
          className={`p-6 rounded-xl border ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commandTerms.map((ct, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="font-mono font-bold text-[#4361EE] text-sm">
                  {ct.term}
                </span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {ct.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: DP Transition */}
      {activeTab === 'dp-transition' && (
        <div
          className={`p-6 rounded-xl border space-y-4 ${
            isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
          }`}
        >
          <h3 className="text-base font-semibold text-inherit">
            Bridging MYP 5 to the IB Diploma Programme (DP)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            MYP Year 5 forms the critical cognitive springboard for DP Higher Level (HL) and Standard Level (SL) courses. While MYP assesses conceptual understanding across four distinct criteria, DP introduces formal Paper 1, Paper 2, and Internal Assessments (IA).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-lg bg-[#141C2B] border border-[#1F2B3F] space-y-2">
              <span className="font-mono font-bold text-emerald-400 block">
                MYP Criteria B & C → DP Science IA
              </span>
              <p className="text-slate-400 leading-relaxed">
                The experimental design rigor honed in Criterion B and data processing in Criterion C directly mirrors the 24-mark DP Scientific Investigation (IA).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#141C2B] border border-[#1F2B3F] space-y-2">
              <span className="font-mono font-bold text-[#4361EE] block">
                MYP Mathematics Extended → DP AA HL / SL
              </span>
              <p className="text-slate-400 leading-relaxed">
                Unit circle trigonometry, quadratic discriminant analysis, and rigorous line-by-line justification prepare students directly for Mathematics: Analysis and Approaches.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
