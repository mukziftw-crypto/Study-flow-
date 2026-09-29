import React from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS, MOCK_TESTS } from '../data/mypData';
import { FileSpreadsheet, Clock, Award, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';

export const PatternPaperView: React.FC = () => {
  const { setRoute, setActiveMockTestId, theme } = useApp();
  const isDark = theme === 'dark';

  const papers = [
    {
      subject: 'Physics',
      title: 'MYP 5 Sciences On-Screen Examination Specimen Pattern',
      duration: '120 minutes',
      marks: '100 marks',
      sections: [
        { name: 'Section 1: Criterion A', desc: 'Core scientific understanding, electromagnetic principles, and kinematics.', marks: 25 },
        { name: 'Section 2: Criterion B & C', desc: 'Inquiry design, data table evaluation, and experimental error analysis.', marks: 50 },
        { name: 'Section 3: Criterion D', desc: 'Reflecting on scientific impacts, applications, and ethical factors.', marks: 25 },
      ],
      mockId: 'mock-phys-myp5'
    },
    {
      subject: 'Chemistry',
      title: 'MYP 5 Chemistry eAssessment Specimen Blueprint',
      duration: '120 minutes',
      marks: '100 marks',
      sections: [
        { name: 'Section 1: Criterion A', desc: 'Atomic structure, Bohr orbitals, stoichiometry, and kinetics.', marks: 25 },
        { name: 'Section 2: Criterion B & C', desc: 'Maxwell-Boltzmann curves, reaction rates, and variable controls.', marks: 50 },
        { name: 'Section 3: Criterion D', desc: 'Industrial catalysts and global environmental implications.', marks: 25 },
      ],
      mockId: 'mock-chem-myp5'
    },
    {
      subject: 'Mathematics Extended',
      title: 'MYP 5 Mathematics Extended On-Screen Blueprint',
      duration: '120 minutes',
      marks: '100 marks',
      sections: [
        { name: 'Section 1: Criterion A', desc: 'Algebraic manipulation, quadratics, discriminant, and unit circle trigonometry.', marks: 25 },
        { name: 'Section 2: Criterion B', desc: 'Investigating numeric and geometric patterns; general algebraic rules.', marks: 25 },
        { name: 'Section 3: Criterion C', desc: 'Mathematical communication, notation, and line-by-line justification.', marks: 25 },
        { name: 'Section 4: Criterion D', desc: 'Real-world periodic modelling (tidal/orbital) and parameter reflection.', marks: 25 },
      ],
      mockId: 'mock-mathext-myp5'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#4361EE] uppercase tracking-wider">
            Assessment Blueprints
          </span>
          <span className="text-xs text-slate-400">· Official MYP 5 Exam Structure</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Pattern Papers & Specimen Blueprints
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Master the exact weighting, time budgeting, and section formats of the official IB MYP 5 on-screen examinations.
        </p>
      </div>

      {/* Pattern Papers List */}
      <div className="space-y-6">
        {papers.map((paper, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl border space-y-4 ${
              isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/20">
              <div>
                <span className="text-[10px] font-mono text-[#4361EE] font-bold uppercase">
                  {paper.subject}
                </span>
                <h3 className="text-base font-semibold text-inherit mt-0.5">
                  {paper.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {paper.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Award size={13} /> {paper.marks}
                </span>
              </div>
            </div>

            {/* Sections grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {paper.sections.map((sec, sIdx) => (
                <div
                  key={sIdx}
                  className={`p-3 rounded-lg border ${
                    isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono font-semibold text-slate-300 mb-1">
                    <span>{sec.name}</span>
                    <span className="text-[#4361EE]">{sec.marks} marks</span>
                  </div>
                  <p className="text-slate-400 leading-snug">
                    {sec.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setActiveMockTestId(paper.mockId);
                  setRoute('mock-test');
                }}
                className="px-4 py-2 rounded-lg bg-[#4361EE] hover:bg-[#3651D4] text-white text-xs font-medium transition-colors flex items-center gap-2"
              >
                <span>Launch Mock Assessment Under Exam Conditions</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
