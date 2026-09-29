import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Table,
  LayoutGrid,
  X,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { SUBJECTS } from '../../data/mypData';
import { SubjectId, CriterionKey } from '../../types';

interface SubjectCriteriaSummaryProps {
  isDark: boolean;
  onOpenSubject?: (subjectId: SubjectId) => void;
  onOpenTopic?: (topicId: string) => void;
}

interface CriterionDetail {
  key: CriterionKey;
  name: string;
  isCriterionD: boolean;
  strands: string[];
  typicalTasks: string;
  focusKeywords: string[];
}

interface SubjectCriteriaEntry {
  subjectId: SubjectId;
  subjectName: string;
  code: string;
  group: 'Mathematics' | 'Sciences';
  badgeStyle: string;
  criteriaDName: string;
  criteriaDDescription: string;
  criteria: CriterionDetail[];
}

interface RubricBand {
  range: string;
  level: string;
  descriptor: string;
  badgeColor: string;
}

interface CriterionExtendedInfo {
  rationale: string;
  rubric: RubricBand[];
  examinerTip: string;
  commandTerms: { term: string; definition: string }[];
}

const ACTIVE_SUBJECTS_CRITERIA: SubjectCriteriaEntry[] = [
  {
    subjectId: 'math-std',
    subjectName: 'Mathematics Standard',
    code: 'MATH-STD',
    group: 'Mathematics',
    badgeStyle: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    criteriaDName: 'Applying mathematics in real-life contexts',
    criteriaDDescription:
      'Identify authentic variables, select and apply mathematical models, justify solution accuracy, and evaluate contextual validity.',
    criteria: [
      {
        key: 'A',
        name: 'Knowing and understanding',
        isCriterionD: false,
        strands: [
          'Select appropriate mathematics when solving standard problems',
          'Apply mathematics correctly in familiar contexts',
          'Solve standard problems with accurate calculations',
        ],
        typicalTasks: 'Simultaneous linear systems, coordinate geometry, right-angled trigonometry calculations.',
        focusKeywords: ['Standard procedures', 'Calculation accuracy', 'Formula substitution'],
      },
      {
        key: 'B',
        name: 'Investigating patterns',
        isCriterionD: false,
        strands: [
          'Apply problem-solving techniques to recognize patterns',
          'Describe patterns as relationships or general rules',
          'Verify general rules through testing with further cases',
        ],
        typicalTasks: 'Linear number sequences, perimeter/area ratio scaling investigations.',
        focusKeywords: ['Pattern recognition', 'General rule induction', 'Verification'],
      },
      {
        key: 'C',
        name: 'Communicating',
        isCriterionD: false,
        strands: [
          'Use correct mathematical notation and standard units',
          'Present working with clear lines of calculation',
          'Draw accurate labelled sketches and graphs',
        ],
        typicalTasks: 'Structured multi-step working, clear mathematical explanations, labelled graph axes.',
        focusKeywords: ['Units & notation', 'Structured working', 'Graph annotations'],
      },
      {
        key: 'D',
        name: 'Applying mathematics in real-life contexts',
        isCriterionD: true,
        strands: [
          'Identify relevant elements of authentic real-life situations',
          'Select adequate mathematical strategies when solving authentic real-life situations',
          'Apply selected mathematical strategies to reach a valid solution',
          'Explain the degree of accuracy of a solution',
          'Explain whether a solution makes sense in the context of the authentic real-life situation',
        ],
        typicalTasks: 'Household budget optimization, travel speed-time-distance planning, packaging surface efficiency.',
        focusKeywords: ['Authentic contexts', 'Realistic constraints', 'Degree of accuracy'],
      },
    ],
  },
  {
    subjectId: 'math-ext',
    subjectName: 'Mathematics Extended',
    code: 'MATH-EXT',
    group: 'Mathematics',
    badgeStyle: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    criteriaDName: 'Applying mathematics in real-life contexts',
    criteriaDDescription:
      'Formulate non-linear and sinusoidal models for authentic phenomena, justify parameter bounds, and rigorously prove degree of accuracy.',
    criteria: [
      {
        key: 'A',
        name: 'Knowing and understanding',
        isCriterionD: false,
        strands: [
          'Select appropriate mathematics when solving challenging problems',
          'Apply selected mathematics to solve problems correctly',
          'Solve problems correctly in both familiar and unfamiliar contexts',
        ],
        typicalTasks: 'Non-routine quadratic systems, trigonometric identity transformations, logarithmic equations.',
        focusKeywords: ['Unfamiliar contexts', 'Algebraic precision', 'Multi-step deduction'],
      },
      {
        key: 'B',
        name: 'Investigating patterns',
        isCriterionD: false,
        strands: [
          'Apply mathematical problem-solving techniques to discover patterns',
          'Describe patterns as general rules consistent with findings',
          'Prove or verify and justify general rules',
        ],
        typicalTasks: 'Sequences & series general term algebraic proofs, geometric iteration formulas.',
        focusKeywords: ['General rule proofs', 'Pattern induction', 'Algebraic verification'],
      },
      {
        key: 'C',
        name: 'Communicating',
        isCriterionD: false,
        strands: [
          'Use appropriate mathematical language in oral and written explanations',
          'Use different forms of mathematical representation (tables, graphs, models)',
          'Move between different forms of mathematical representation with ease',
          'Organise information using a logical structure with complete working',
        ],
        typicalTasks: 'Formal deductive proofs, multi-step line-by-line reasoning with rigorous notation.',
        focusKeywords: ['Line-by-line reasoning', 'Representation switching', 'Deductive clarity'],
      },
      {
        key: 'D',
        name: 'Applying mathematics in real-life contexts',
        isCriterionD: true,
        strands: [
          'Identify relevant elements of authentic real-life situations',
          'Select adequate mathematical strategies by modeling authentic real-life situations',
          'Apply selected mathematical strategies to reach a correct solution',
          'Justify the degree of accuracy of a solution',
          'Justify whether a solution makes sense in the context of the authentic real-life situation',
        ],
        typicalTasks: 'Periodic sinusoidal modelling of tidal cycles, compound interest amortization, parabolic arch load distribution.',
        focusKeywords: ['Authentic modeling', 'Accuracy justification', 'Contextual reasonableness'],
      },
    ],
  },
  {
    subjectId: 'physics',
    subjectName: 'Physics',
    code: 'SCI-PHYS',
    group: 'Sciences',
    badgeStyle: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    criteriaDName: 'Reflecting on the impacts of science',
    criteriaDDescription:
      'Explain how physical principles address technological challenges and evaluate moral, ethical, economic, and environmental implications.',
    criteria: [
      {
        key: 'A',
        name: 'Knowing and understanding',
        isCriterionD: false,
        strands: [
          'Explain scientific knowledge',
          'Apply knowledge to solve problems in familiar and unfamiliar situations',
          'Analyse information to make scientifically supported judgments',
        ],
        typicalTasks: 'Faraday-Lenz calculations, circuit network analysis, wave velocity derivations.',
        focusKeywords: ['Formula application', 'Scientific explanations', 'Quantitative calculations'],
      },
      {
        key: 'B',
        name: 'Inquiring and designing',
        isCriterionD: false,
        strands: [
          'Explain a problem or question to be tested',
          'Formulate testable hypothesis using scientific reasoning',
          'Explain how to manipulate and control variables',
          'Design logical, complete and safe experimental methods',
        ],
        typicalTasks: 'Investigating induction coil factors, pendulum dampening, projectile launch angles.',
        focusKeywords: ['Controlled variables', 'Testable hypothesis', 'Experimental design'],
      },
      {
        key: 'C',
        name: 'Processing and evaluating',
        isCriterionD: false,
        strands: [
          'Present collected and transformed data in tables/graphs',
          'Interpret data and explain results using scientific reasoning',
          'Evaluate the validity of a hypothesis based on investigation',
          'Evaluate the method and suggest realistic improvements',
        ],
        typicalTasks: 'Uncertainty calculations, anomalous reading justification, graph gradients (R = V/I).',
        focusKeywords: ['Data transformation', 'Measurement uncertainties', 'Method evaluation'],
      },
      {
        key: 'D',
        name: 'Reflecting on the impacts of science',
        isCriterionD: true,
        strands: [
          'Explain the ways in which science is applied and used to address a specific problem or issue',
          'Discuss and evaluate the various implications of the use of science and its application in solving a specific problem or issue (moral, ethical, social, economic, political, cultural, environmental)',
          'Apply scientific language effectively',
          'Document the work of others and sources of information using recognized conventions',
        ],
        typicalTasks: 'Evaluating maglev transit energy trade-offs, nuclear fission vs renewables, satellite space debris mitigation.',
        focusKeywords: ['Ethical/environmental implications', 'Real-world application', 'Academic conventions'],
      },
    ],
  },
  {
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    code: 'SCI-CHEM',
    group: 'Sciences',
    badgeStyle: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    criteriaDName: 'Reflecting on the impacts of science',
    criteriaDDescription:
      'Examine green chemistry industrial innovations, evaluate environmental lifecycle trade-offs, and cite verified chemical literature.',
    criteria: [
      {
        key: 'A',
        name: 'Knowing and understanding',
        isCriterionD: false,
        strands: [
          'Explain chemical knowledge and collision theory',
          'Apply stoichiometry to quantitative scenarios',
          'Analyse chemical trends across groups and periods',
        ],
        typicalTasks: 'Le Chatelier equilibrium shifts, stoichiometry molar calculations, acid-base neutralisation.',
        focusKeywords: ['Equilibrium laws', 'Stoichiometry', 'Periodic trends'],
      },
      {
        key: 'B',
        name: 'Inquiring and designing',
        isCriterionD: false,
        strands: [
          'Formulate testable hypotheses regarding reaction rates',
          'Plan controlled experiments with catalysts and temperature variations',
          'Design safe protocol for hazardous reagents',
        ],
        typicalTasks: 'Kinetics investigations, calorimetry enthalpy change experiments.',
        focusKeywords: ['Reagent safety', 'Rate investigations', 'Variable control'],
      },
      {
        key: 'C',
        name: 'Processing and evaluating',
        isCriterionD: false,
        strands: [
          'Organise volumetric data and rate graphs',
          'Calculate rate of reaction from initial rates and curves',
          'Evaluate heat loss uncertainties in calorimetry',
        ],
        typicalTasks: 'Maxwell-Boltzmann distribution curves, percentage yield error margins.',
        focusKeywords: ['Reaction rate curves', 'Calorimetry error margins', 'Data reliability'],
      },
      {
        key: 'D',
        name: 'Reflecting on the impacts of science',
        isCriterionD: true,
        strands: [
          'Explain the ways in which chemistry is applied to solve environmental or industrial challenges',
          'Discuss and evaluate the ethical, economic, and environmental implications of chemical manufacturing processes',
          'Apply chemical nomenclature and balanced equations accurately',
          'Document scientific sources and acknowledge academic research',
        ],
        typicalTasks: 'Haber-Bosch energy consumption vs global food security, biopolymers vs petrochemical plastics, green catalysts.',
        focusKeywords: ['Green chemistry', 'Socio-economic trade-offs', 'Life-cycle assessment'],
      },
    ],
  },
];

// Rich rubric bands, command terms, and examiner expectations per subject & criterion
const getCriterionExtendedInfo = (
  subject: SubjectCriteriaEntry,
  criterionKey: CriterionKey
): CriterionExtendedInfo => {
  const isMath = subject.group === 'Mathematics';

  if (isMath) {
    switch (criterionKey) {
      case 'A':
        return {
          rationale:
            'Tests your command of mathematical concepts, procedures, and problem-solving in standard, familiar, and unfamiliar scenarios.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Consistently selects appropriate mathematics in challenging and unfamiliar situations; solves problems correctly with complete, rigorous working.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Selects appropriate mathematics in familiar and simple unfamiliar situations; executes calculations correctly with minimal procedural slips.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Selects appropriate mathematics in familiar contexts; solves standard problems with partial or adequate success.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Applies mathematics with limited success; solves simple standard problems only with structured guidance or formulas provided.',
            },
          ],
          examinerTip:
            'In unfamiliar questions, write down the formula before substituting numbers. Full credit requires explicit algebraic justification at every step.',
          commandTerms: [
            { term: 'Calculate', definition: 'Obtain a numerical answer showing relevant stages in the working.' },
            { term: 'Determine', definition: 'Obtain the only possible answer through explicit algebraic deduction.' },
            { term: 'Simplify', definition: 'Reduce an expression to its most concise algebraic form.' },
            { term: 'Solve', definition: 'Obtain the answer(s) using algebraic and/or numerical methods.' },
          ],
        };
      case 'B':
        return {
          rationale:
            'Assesses your ability to conduct open-ended mathematical investigations, spot algebraic trends, and mathematically prove general rules.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Independently identifies patterns; articulates concise general rules; provides deductive algebraic proof or detailed justification.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Discovers patterns; describes patterns as consistent general rules; thoroughly verifies and justifies rules using additional test cases.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Identifies patterns and describes them with a basic rule; verifies the rule on a limited number of test cases.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Recognizes simple pattern sequences with guidance; struggles to formulate a general algebraic formula.',
            },
          ],
          examinerTip:
            'Verification means testing specific numbers (e.g. n=1, 2, 3). Justification requires explaining algebraically why the n-th term works universally.',
          commandTerms: [
            { term: 'Investigate', definition: 'Observe, study, or test systematically to establish facts or principles.' },
            { term: 'Formulate', definition: 'Express a mathematical relationship or rule in precise algebraic notation.' },
            { term: 'Verify', definition: 'Provide evidence by substitution that a rule holds true for additional values.' },
            { term: 'Justify', definition: 'Provide valid reasons or evidence to support why the general rule works universally.' },
          ],
        };
      case 'C':
        return {
          rationale:
            'Evaluates your precision with mathematical notation, units, terminology, graphs, and clear, line-by-line structured reasoning.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Consistently uses precise mathematical notation; moves fluently between representations; presents complete, logical line-by-line deductions.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Consistently uses correct terminology and standard units; lines of working are orderly, logical, and easy to follow.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Uses adequate mathematical vocabulary and notation; working can be followed with minor ambiguities or missing units.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Minimal mathematical notation; disorganized layout; lacks units or clear progression between steps.',
            },
          ],
          examinerTip:
            'Always append standard units to final answers. In graphs, label both axes with variable names, scales, and appropriate units.',
          commandTerms: [
            { term: 'Show that', definition: 'Obtain the required result step-by-step without using the result itself.' },
            { term: 'Annotate', definition: 'Add brief notes, symbols, or explanations to a diagram or calculation.' },
            { term: 'Represent', definition: 'Model mathematical relationships using appropriate tables, diagrams, or graphs.' },
            { term: 'Organise', definition: 'Structure mathematical work with coherent logical flow and deductive sequencing.' },
          ],
        };
      case 'D':
      default:
        return {
          rationale:
            'Crucial IB Criterion: evaluates your capacity to apply mathematics to authentic real-life scenarios, evaluate degree of accuracy, and critique practical limitations.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Formulates sophisticated mathematical models; reaches correct solutions; rigorously justifies the degree of accuracy and contextual reasonableness.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Selects effective mathematical strategies; reaches a valid solution; explains the degree of accuracy and evaluates whether the result makes sense in context.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Applies mathematical strategies to real-life situations with partial accuracy; states whether the answer is reasonable with basic justification.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Identifies surface elements; attempts real-life strategies with limited validity; fails to evaluate contextual constraints.',
            },
          ],
          examinerTip:
            'Never simply state "it makes sense because the calculation is correct." Discuss real-life constraints such as non-negative physical quantities, discrete items, or measurement tolerances.',
          commandTerms: [
            { term: 'Model', definition: 'Formulate an authentic situation into a solvable mathematical equation or system.' },
            { term: 'Apply', definition: 'Use mathematical strategies and principles in real-world contexts.' },
            { term: 'Justify', definition: 'Provide authentic contextual reasons why the chosen degree of accuracy is appropriate.' },
            { term: 'Evaluate', definition: 'Critique whether mathematical results remain valid under realistic physical constraints.' },
          ],
        };
    }
  } else {
    // Sciences (Physics & Chemistry)
    switch (criterionKey) {
      case 'A':
        return {
          rationale:
            'Tests your mastery of scientific concepts, theoretical models, quantitative formulas, and ability to make scientifically backed judgments.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Sophisticated scientific explanations; consistently applies concepts to novel, unfamiliar scenarios; synthesizes evidence to make defensible scientific judgments.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Explains scientific knowledge; applies understanding to solve problems in familiar and unfamiliar situations; provides supported judgments.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Explains scientific concepts; applies knowledge to solve problems in familiar situations; makes basic judgments.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Recalls basic scientific terms; solves simple problems with guidance; statements lack explanatory depth.',
            },
          ],
          examinerTip:
            'Definitions alone cap your score at Level 3–4. Level 7–8 requires connecting underlying theory (e.g. collision theory or electromagnetic induction) directly to the question prompt.',
          commandTerms: [
            { term: 'Explain', definition: 'Give a detailed account including reasons, mechanisms, or causes.' },
            { term: 'Analyse', definition: 'Break down scientific data or processes to bring out essential elements or structure.' },
            { term: 'Apply', definition: 'Use knowledge, principles, or formulas in familiar and unfamiliar situations.' },
            { term: 'Evaluate', definition: 'Make an appraisal by weighing up the strengths and limitations of scientific claims.' },
          ],
        };
      case 'B':
        return {
          rationale:
            'Assesses experimental inquiry: defining scientific questions, formulating testable hypotheses, variable control, and designing safe laboratory protocols.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Formulates an incisive testable hypothesis with theoretical backing; explains exact control and manipulation of variables; designs an exhaustive, replicable, and safe experimental method.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Formulates a testable hypothesis backed by scientific reasoning; explains independent, dependent, and controlled variables; designs a logical, complete, and safe protocol.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Formulates a testable hypothesis; outlines variables; describes a workable method with basic safety considerations.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'States a basic hypothesis with prompting; identifies only one variable; outlines an incomplete method with safety omissions.',
            },
          ],
          examinerTip:
            'Always specify controlled variables with explicit control values (e.g. "maintain at 25.0 ± 0.5 °C using a water bath"), rather than simply writing "keep temperature constant".',
          commandTerms: [
            { term: 'Hypothesise', definition: 'Formulate a plausible testable prediction grounded in scientific theory.' },
            { term: 'Design', definition: 'Produce a comprehensive experimental plan, simulation, or model.' },
            { term: 'Manipulate', definition: 'Systematically alter the independent variable across a valid range of values.' },
            { term: 'Control', definition: 'Ensure extraneous variables are strictly held constant throughout trials.' },
          ],
        };
      case 'C':
        return {
          rationale:
            'Evaluates data handling: organizing tables, plotting graphs with error bars, calculating reaction rates or gradients, evaluating hypotheses, and proposing improvements.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Transforms numerical data accurately with error analysis; provides theoretical interpretations; critically evaluates hypothesis validity and details realistic, impactful improvements.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Accurately transforms data (graphs, gradients, calculations); interprets results using scientific reasoning; discusses hypothesis validity and notes experimental flaws.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Organizes data into tables/graphs; explains results; outlines hypothesis validity and suggests basic improvements.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Collects and records raw data; outlines simple observations without transformation or meaningful evaluation.',
            },
          ],
          examinerTip:
            'Distinguish between human blunder and systematic instrumental error. Always calculate percentage uncertainties or best-fit line gradients when analyzing experimental data.',
          commandTerms: [
            { term: 'Interpret', definition: 'Use scientific knowledge to extract meaning from experimental trends and curves.' },
            { term: 'Transform', definition: 'Convert raw data into calculated values, rates, or formatted visual graphs.' },
            { term: 'Evaluate', definition: 'Assess the validity of the hypothesis and identify specific equipment limitations.' },
            { term: 'Improve', definition: 'Propose realistic, scientifically sound modifications to enhance data reliability.' },
          ],
        };
      case 'D':
      default:
        return {
          rationale:
            'Core Science Criterion: Reflecting on the impacts of science. Explaining how science addresses global issues, evaluating ethical, economic, and environmental trade-offs, and citing sources.',
          rubric: [
            {
              range: '7–8',
              level: 'Exemplary',
              badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              descriptor:
                'Critically evaluates how science addresses complex global problems; provides a balanced, multifaceted evaluation of moral, ethical, economic, and environmental implications; uses sophisticated scientific prose and impeccable referencing.',
            },
            {
              range: '5–6',
              level: 'Substantial',
              badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              descriptor:
                'Explains how science solves an issue; discusses multiple implications (e.g. ethical and environmental trade-offs); applies scientific language consistently; correctly documents sources.',
            },
            {
              range: '3–4',
              level: 'Adequate',
              badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              descriptor:
                'Summarizes the application of science; outlines ethical or environmental implications; uses adequate scientific vocabulary; provides standard citations.',
            },
            {
              range: '1–2',
              level: 'Limited',
              badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              descriptor:
                'Outlines the application of science superficially; mentions one factor; uses minimal scientific language; incomplete citations.',
            },
          ],
          examinerTip:
            'Criterion D requires a balanced synthesis, not an opinion piece. Compare contrasting perspectives (e.g. immediate economic growth vs long-term environmental degradation) supported by peer-reviewed evidence.',
          commandTerms: [
            { term: 'Discuss', definition: 'Offer a balanced review that includes a range of arguments, factors, or hypotheses.' },
            { term: 'Evaluate', definition: 'Weigh up the strengths and limitations of scientific solutions to global issues.' },
            { term: 'Reflect', definition: 'Consider the broader implications and consequences of scientific advancements.' },
            { term: 'Document', definition: 'Credit external research using recognized bibliographic conventions (e.g. APA, MLA).' },
          ],
        };
    }
  }
};

export const SubjectCriteriaSummary: React.FC<SubjectCriteriaSummaryProps> = ({
  isDark,
  onOpenSubject,
  onOpenTopic,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');
  const [filterGroup, setFilterGroup] = useState<'All' | 'Mathematics' | 'Sciences'>('All');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('math-std');
  const [selectedCriterionKey, setSelectedCriterionKey] = useState<CriterionKey>('D');

  // Slide-in panel state for quick criterion assessment expectations
  const [slideInOpen, setSlideInOpen] = useState(false);
  const [slideInSubject, setSlideInSubject] = useState<SubjectCriteriaEntry>(ACTIVE_SUBJECTS_CRITERIA[0]);
  const [slideInCriterionKey, setSlideInCriterionKey] = useState<CriterionKey>('D');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSlideInOpen(false);
      }
    };
    if (slideInOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [slideInOpen]);

  const filteredSubjects = ACTIVE_SUBJECTS_CRITERIA.filter((s) => {
    if (filterGroup === 'All') return true;
    return s.group === filterGroup;
  });

  const activeSubject =
    ACTIVE_SUBJECTS_CRITERIA.find((s) => s.subjectId === selectedSubjectId) ||
    ACTIVE_SUBJECTS_CRITERIA[0];

  const activeCriterion =
    activeSubject.criteria.find((c) => c.key === selectedCriterionKey) ||
    activeSubject.criteria[3];

  const handleOpenSlideIn = (subject: SubjectCriteriaEntry, criterionKey: CriterionKey) => {
    setSlideInSubject(subject);
    setSlideInCriterionKey(criterionKey);
    setSlideInOpen(true);
  };

  const slideInCriterion =
    slideInSubject.criteria.find((c) => c.key === slideInCriterionKey) ||
    slideInSubject.criteria[0];

  const slideInExtendedInfo = getCriterionExtendedInfo(slideInSubject, slideInCriterionKey);

  return (
    <section
      id="subject-criteria-summary"
      className={`p-6 rounded-2xl border transition-all scroll-mt-6 ${
        isDark
          ? 'bg-gradient-to-b from-[#111828] via-[#0E1524] to-[#0A0F1D] border-[#1F2B3E]'
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-700/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-inherit">
              Subject Criteria Matrix (MYP Criteria A–D)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            All active subjects mapped to their four MYP criteria (scored 0–8). Click on any <strong className="text-indigo-400 font-semibold">Crit span</strong> or badge to slide open the full rubric, strand descriptors, and assessment expectations.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Grid vs Cards Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl border bg-slate-900/40 border-slate-700/50">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table size={13} />
              <span>Grid Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Subject Cards</span>
            </button>
          </div>

          {/* Discipline Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl border bg-slate-900/40 border-slate-700/50">
            {(['All', 'Mathematics', 'Sciences'] as const).map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setFilterGroup(group)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterGroup === group
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: Grid Matrix */}
      {viewMode === 'grid' && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-700/30">
                <th className="pb-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 w-1/4">
                  Active Subject & Group
                </th>
                <th className="pb-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 w-[18%]">
                  Criterion A
                </th>
                <th className="pb-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 w-[18%]">
                  Criterion B
                </th>
                <th className="pb-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 w-[18%]">
                  Criterion C
                </th>
                <th className="pb-3 text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 w-[26%] bg-indigo-500/5 px-2 rounded-t-lg">
                  Criterion D (Subject-Specific)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {filteredSubjects.map((sub) => {
                const isSelected = sub.subjectId === selectedSubjectId;
                const subjectSummary = SUBJECTS.find((s) => s.id === sub.subjectId);

                return (
                  <tr
                    key={sub.subjectId}
                    className={`transition-colors ${
                      isSelected
                        ? isDark
                          ? 'bg-indigo-950/20'
                          : 'bg-indigo-50/50'
                        : isDark
                        ? 'hover:bg-slate-900/40'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Subject Column with direct navigation */}
                    <td className="py-4 pr-3 align-top">
                      <div className="flex items-start gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${sub.badgeStyle}`}>
                          {sub.code}
                        </span>
                        <div>
                          <div
                            onClick={() => {
                              setSelectedSubjectId(sub.subjectId);
                              if (onOpenSubject) onOpenSubject(sub.subjectId);
                            }}
                            className="text-xs font-bold text-inherit hover:text-indigo-400 cursor-pointer flex items-center gap-1.5 transition-colors"
                          >
                            <span>{sub.subjectName}</span>
                            <ChevronRight size={12} className="text-slate-500" />
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                            {sub.group} · Grade {subjectSummary?.predictedGrade || 6}/7
                          </div>
                          {onOpenSubject && (
                            <button
                              type="button"
                              onClick={() => onOpenSubject(sub.subjectId)}
                              className="mt-1.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>Open subject</span>
                              <ArrowRight size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Criteria A-D Columns */}
                    {sub.criteria.map((crit) => {
                      const isCritD = crit.key === 'D';
                      const isCellActive =
                        selectedSubjectId === sub.subjectId &&
                        selectedCriterionKey === crit.key;

                      return (
                        <td
                          key={crit.key}
                          onClick={() => {
                            setSelectedSubjectId(sub.subjectId);
                            setSelectedCriterionKey(crit.key);
                          }}
                          className={`p-2.5 align-top cursor-pointer transition-all rounded-lg group/cell ${
                            isCellActive
                              ? isDark
                                ? 'bg-indigo-900/30 ring-1 ring-indigo-500'
                                : 'bg-indigo-50 ring-1 ring-indigo-400'
                              : isCritD
                              ? isDark
                                ? 'bg-indigo-950/15 hover:bg-indigo-950/30'
                                : 'bg-indigo-50/40 hover:bg-indigo-50/80'
                              : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              {/* Requested Clickable Span with onClick handler */}
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenSlideIn(sub, crit.key);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.stopPropagation();
                                    handleOpenSlideIn(sub, crit.key);
                                  }
                                }}
                                title={`Click to view full description and assessment expectations for ${sub.subjectName} Criterion ${crit.key}`}
                                className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-indigo-400 flex items-center gap-1 ${
                                  isCritD
                                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                                    : 'bg-slate-800/60 text-slate-300 border-slate-700/50'
                                }`}
                              >
                                <span>Crit {crit.key}</span>
                                <Maximize2 size={10} className="opacity-60 group-hover/cell:opacity-100" />
                              </span>

                              <span className="text-[9px] font-mono text-slate-400">0–8</span>
                            </div>

                            <p
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenSlideIn(sub, crit.key);
                              }}
                              className={`text-[11px] leading-snug font-semibold cursor-pointer transition-colors ${
                                isCritD
                                  ? 'text-indigo-300 hover:text-indigo-200'
                                  : 'text-slate-200 hover:text-indigo-400'
                              }`}
                            >
                              {crit.name}
                            </p>

                            <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                              {crit.strands[0]}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 2: Subject Cards Grid */}
      {viewMode === 'cards' && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSubjects.map((item) => {
            const isSelected = item.subjectId === selectedSubjectId;
            const critD = item.criteria.find((c) => c.key === 'D')!;
            const subjectSummary = SUBJECTS.find((s) => s.id === item.subjectId);

            return (
              <div
                key={item.subjectId}
                onClick={() => setSelectedSubjectId(item.subjectId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-full ${
                  isSelected
                    ? isDark
                      ? 'bg-[#152035] border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/30'
                      : 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                    : isDark
                    ? 'bg-[#0E1524] border-[#1C2638] hover:border-slate-600 hover:bg-[#121A2B]'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${item.badgeStyle}`}>
                      {item.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {item.group}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-inherit mb-0.5">
                    {item.subjectName}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug mb-3">
                    {subjectSummary?.currentUnit || 'Active MYP 5 Unit'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-700/20">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Linked Criteria:
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {item.criteria.map((c) => (
                        <div
                          key={c.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubjectId(item.subjectId);
                            setSelectedCriterionKey(c.key);
                          }}
                          className={`px-2 py-1 rounded text-[10px] border flex items-center justify-between transition-colors ${
                            c.key === 'D'
                              ? isDark
                                ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 font-bold'
                                : 'bg-indigo-50 border-indigo-200 text-indigo-800 font-bold'
                              : isDark
                              ? 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          {/* Requested Clickable Span with onClick handler */}
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenSlideIn(item, c.key);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation();
                                handleOpenSlideIn(item, c.key);
                              }
                            }}
                            title={`Click to view full description and expectations for ${c.key}`}
                            className="font-mono font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Crit {c.key}</span>
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">0–8</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Criterion D Dynamic Curriculum Title */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSlideIn(item, 'D');
                    }}
                    className={`mt-3 p-2.5 rounded-lg border text-[11px] leading-snug cursor-pointer transition-all hover:scale-[1.01] ${
                      isDark
                        ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200 hover:bg-indigo-950/50'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100/60'
                    }`}
                  >
                    <div className="font-mono font-bold text-[10px] uppercase text-indigo-400 mb-0.5 flex items-center justify-between">
                      <span>Criterion D ({item.group}):</span>
                      <Maximize2 size={11} className="text-indigo-400" />
                    </div>
                    <p className="font-semibold text-inherit">
                      "{critD.name}"
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/20 flex items-center justify-between text-[11px]">
                  {onOpenSubject ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSubject(item.subjectId);
                      }}
                      className="font-semibold text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open subject guide</span>
                      <ArrowRight size={12} />
                    </button>
                  ) : (
                    <span className="text-slate-400">Select to inspect</span>
                  )}

                  <ChevronRight
                    size={14}
                    className={`transition-transform ${
                      isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Detail Inspector for Selected Subject & Criterion */}
      <div
        className={`mt-6 p-5 sm:p-6 rounded-xl border transition-all ${
          isDark
            ? 'bg-[#0B101D] border-slate-800'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/20">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${activeSubject.badgeStyle}`}>
                {activeSubject.code}
              </span>
              <h3 className="text-base font-bold text-inherit">
                {activeSubject.subjectName} — Criterion {activeCriterion.key} Strands & Assessment
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Subject Group: {activeSubject.group} · Scored 0–8 Marks
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {/* Direct Slide-In Panel Trigger Button */}
            <button
              type="button"
              onClick={() => handleOpenSlideIn(activeSubject, activeCriterion.key)}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Open full slide-in panel with 0-8 achievement descriptors and expectations"
            >
              <Maximize2 size={13} />
              <span>Full Rubric & Expectations Panel</span>
            </button>

            {onOpenSubject && (
              <button
                type="button"
                onClick={() => onOpenSubject(activeSubject.subjectId)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Explore {activeSubject.subjectName}</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Criteria Tabs for Active Subject */}
        <div className="mt-4 flex flex-wrap gap-2">
          {activeSubject.criteria.map((c) => {
            const isCritD = c.key === 'D';
            const isActive = selectedCriterionKey === c.key;

            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCriterionKey(c.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : isDark
                    ? 'bg-[#121A2B] border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Criterion {c.key}</span>
                {isCritD && (
                  <span className="text-[10px] px-1 rounded bg-black/20 font-mono">
                    {activeSubject.group} Title
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detail Box */}
        <div
          className={`mt-4 p-4 sm:p-5 rounded-xl border transition-all ${
            isDark ? 'bg-[#101726] border-[#1E2B3E]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">
                  Criterion {activeCriterion.key}:
                </span>
                <h4 className="text-base font-bold text-inherit">
                  {activeCriterion.name}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {activeCriterion.isCriterionD
                  ? activeSubject.criteriaDDescription
                  : 'Standard curriculum strands evaluated in MYP 5 assessments.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-400">
                Levels: 1–2 (Basic) · 3–4 (Adequate) · 5–6 (Substantial) · 7–8 (Mastery)
              </span>
              <button
                type="button"
                onClick={() => handleOpenSlideIn(activeSubject, activeCriterion.key)}
                className="text-xs font-mono font-bold text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Inspect</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Assessed Strands:
              </span>
              <ul className="space-y-1.5">
                {activeCriterion.strands.map((strand, sIdx) => (
                  <li key={sIdx} className="text-slate-300 text-xs flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                    <span>{strand}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Typical MYP 5 eAssessment Tasks:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-lg border border-slate-700/30">
                  {activeCriterion.typicalTasks}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Key Focus Areas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCriterion.focusKeywords.map((kw, kwIdx) => (
                    <span
                      key={kwIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-800/60 border border-slate-700/50 text-slate-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SLIDE-IN ASSESSMENT PANEL / POPOVER FOR FULL MYP CRITERION EXPECTATIONS   */}
      {/* ========================================================================= */}
      {slideInOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        >
          {/* Backdrop */}
          <div
            onClick={() => setSlideInOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Slide-In Drawer Panel */}
          <div
            className={`relative w-full max-w-xl h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l animate-in slide-in-from-right duration-250 ${
              isDark
                ? 'bg-[#0E1524] text-slate-100 border-[#1E2B3E]'
                : 'bg-white text-slate-900 border-slate-200'
            }`}
          >
            {/* Panel Header */}
            <div
              className={`p-5 border-b flex items-start justify-between gap-4 shrink-0 ${
                isDark ? 'border-slate-800 bg-[#121B2D]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${slideInSubject.badgeStyle}`}>
                    {slideInSubject.code}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    Criterion {slideInCriterion.key}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Scored 0–8 Marks
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-inherit pt-1">
                  {slideInSubject.subjectName}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSlideInOpen(false)}
                className="p-1.5 rounded-lg border text-slate-400 hover:text-slate-200 hover:bg-slate-800/20 border-transparent hover:border-slate-700/50 transition-colors cursor-pointer"
                aria-label="Close criterion assessment panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Criterion Switcher Tabs inside Panel */}
            <div
              className={`px-5 py-2.5 border-b flex items-center justify-between gap-2 overflow-x-auto shrink-0 ${
                isDark ? 'border-slate-800/80 bg-[#0B101D]' : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0 font-semibold">
                Switch Criterion:
              </span>
              <div className="flex items-center gap-1.5">
                {slideInSubject.criteria.map((c) => {
                  const isActive = slideInCriterionKey === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSlideInCriterionKey(c.key)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                          : isDark
                          ? 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Crit {c.key}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              {/* Criterion Title & Subject Context */}
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  slideInCriterion.isCriterionD
                    ? isDark
                      ? 'bg-indigo-950/20 border-indigo-500/40 text-indigo-100'
                      : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
                    : isDark
                    ? 'bg-slate-900/50 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                    Official Curriculum Title ({slideInSubject.group})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Year 5 eAssessment
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-inherit">
                  {slideInCriterion.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {slideInExtendedInfo.rationale}
                </p>
                {slideInCriterion.isCriterionD && (
                  <div className="pt-2 text-[11px] font-mono text-indigo-400 border-t border-indigo-500/20 flex items-center gap-1.5">
                    <Sparkles size={13} className="shrink-0" />
                    <span>
                      {slideInSubject.group === 'Mathematics'
                        ? 'Subject-specific focus: Modeling authentic phenomena & proving degrees of accuracy.'
                        : 'Subject-specific focus: Global technological solutions & moral/environmental trade-offs.'}
                    </span>
                  </div>
                )}
              </div>

              {/* 1. Assessed Strands */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Assessed Curriculum Strands
                  </h5>
                  <span className="text-[11px] font-mono text-slate-400">
                    {slideInCriterion.strands.length} Strands
                  </span>
                </div>

                <div className="space-y-2">
                  {slideInCriterion.strands.map((strand, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                        isDark ? 'bg-[#101726] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                        {String.fromCharCode(105 + sIdx)}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {strand}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Official 0–8 Achievement Level Descriptors */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    MYP Achievement Level Bands (0–8)
                  </h5>
                  <span className="text-[11px] font-mono text-slate-400">
                    Criterion Rubric
                  </span>
                </div>

                <div className="space-y-2">
                  {slideInExtendedInfo.rubric.map((band) => (
                    <div
                      key={band.range}
                      className={`p-3.5 rounded-xl border transition-all ${
                        band.range === '7–8'
                          ? isDark
                            ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/20'
                            : 'bg-emerald-50/60 border-emerald-300'
                          : isDark
                          ? 'bg-[#101726] border-slate-800'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${band.badgeColor}`}>
                          Level {band.range} · {band.level}
                        </span>
                        {band.range === '7–8' && (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 size={11} />
                            <span>Top Score Band</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {band.descriptor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Examiner Advice & Level 7-8 Tip */}
              <div
                className={`p-4 rounded-xl border space-y-1.5 ${
                  isDark
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono font-bold text-[11px] text-amber-400 uppercase tracking-wider">
                  <AlertCircle size={14} />
                  <span>Examiner Tip to Reach Levels 7–8</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {slideInExtendedInfo.examinerTip}
                </p>
              </div>

              {/* 4. Typical Exam Tasks & Key Command Terms */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Target Command Terms for Criterion {slideInCriterion.key}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {slideInExtendedInfo.commandTerms.map((ct) => (
                    <div
                      key={ct.term}
                      className={`p-2.5 rounded-lg border ${
                        isDark ? 'bg-[#101726] border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="font-mono font-bold text-[11px] text-indigo-400 block mb-0.5">
                        {ct.term}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {ct.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Typical Exam Tasks */}
              <div
                className={`p-4 rounded-xl border space-y-1.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Typical eAssessment Task Format:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {slideInCriterion.typicalTasks}
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div
              className={`p-4 border-t flex items-center justify-between gap-3 shrink-0 ${
                isDark ? 'border-slate-800 bg-[#121B2D]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              {onOpenSubject ? (
                <button
                  type="button"
                  onClick={() => {
                    setSlideInOpen(false);
                    onOpenSubject(slideInSubject.subjectId);
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BookOpen size={13} />
                  <span>Open {slideInSubject.subjectName} Syllabus</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setSlideInOpen(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold border text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border-slate-700 transition-colors cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
