export type SubjectId = 'math-std' | 'math-ext' | 'physics' | 'chemistry';

export type CriterionKey = 'A' | 'B' | 'C' | 'D';

export type ErrorCategory = 
  | 'Careless' 
  | 'Calculation' 
  | 'Conceptual' 
  | 'Command term' 
  | 'Data interpretation';

export type CommandTerm = 
  | 'Calculate'
  | 'Describe'
  | 'Explain'
  | 'State'
  | 'Deduce'
  | 'Discuss'
  | 'Evaluate'
  | 'Justify'
  | 'Formulate'
  | 'Suggest'
  | 'Outline'
  | 'Annotate'
  | 'Determine'
  | 'Apply'
  | 'Compare'
  | 'Show that'
  | 'Model'
  | 'Solve'
  | 'Prove'
  | 'Simplify';

export interface EquationItem {
  name: string;
  latex?: string;
  meaning?: string;
  application?: string;
  notes: string;
}

export interface CommandTermAdvice {
  term: CommandTerm;
  advice: string;
  mypExpectation: string;
}

export interface DeepDiveSection {
  sectionTitle: string;
  explanation: string;
  keyTakeaways: string[];
  practicalExample: string;
}

export interface CriterionFocus {
  criterionA: string;
  criterionB: string;
  criterionC: string;
  criterionD: string;
}

export interface ExtendedNotesData {
  overview: string;
  studentNotesSynthesis?: string;
  deepDiveSections: DeepDiveSection[];
  criterionFocus?: CriterionFocus;
  examinerPitfalls: string[];
  realWorldApplications: string[];
  highYieldChecklist: string[];
  generatedAt?: string;
  source?: 'ai' | 'custom' | 'curriculum';
}

export interface StudentNote {
  id: string;
  unitId: string;
  unitName: string;
  subjectId: SubjectId;
  subjectName: string;
  content: string;
  tags: string[];
  lastSaved: string;
  aiEnhanced?: boolean;
}

export interface Topic {
  id: string;
  subjectId: SubjectId;
  name: string;
  unit: string;
  description: string;
  simulationId?: string;
  coreTheory: string[];
  equations: EquationItem[];
  misconceptions: string[];
  commandTermGuidance: CommandTermAdvice[];
  strands: string[];
  extendedNotes?: ExtendedNotesData;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  topicName: string;
  title: string;
  prompt: string;
  criterion: CriterionKey;
  strand: string;
  commandTerm: CommandTerm;
  difficulty: 'Standard' | 'Extended' | 'Challenging';
  marks: number;
  katexSnippet?: string;
  dataTable?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  hints: string[];
  markScheme: string[];
  sampleSolution: string;
  criteriaLevelRubric?: {
    level: string;
    descriptor: string;
  }[];
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  subjectId: SubjectId;
  topicId: string;
  topicName: string;
  questionTitle: string;
  criterion: CriterionKey;
  strand: string;
  errorType: ErrorCategory;
  userNote: string;
  actionPlan: string;
  date: string;
  resolved: boolean;
}

export interface RevisionItem {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  topicName: string;
  subtopic: string;
  criterion: CriterionKey;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  mistakesCount: number;
}

export interface CriterionStatus {
  key: CriterionKey;
  title: string;
  scienceName: string;
  mathName: string;
  status: 'strong' | 'developing' | 'needs attention';
  masteryPercentage: number;
  recentScore: string;
  summary: string;
}

export interface SubjectSummary {
  id: SubjectId;
  name: string;
  shortName: string;
  code: string;
  currentUnit: string;
  progressPercentage: number;
  weakestArea: string;
  nextRecommendedAction: string;
  recentPerformance: string;
  predictedGrade: number; // 1-7
  totalQuestionsCompleted: number;
}

export interface MockTest {
  id: string;
  title: string;
  subjectId: SubjectId;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
  criteriaFocus: CriterionKey[];
}

export type AppRoute = 
  | 'dashboard'
  | 'subjects'
  | 'topic'
  | 'notes'
  | 'question-bank'
  | 'practice'
  | 'mock-test'
  | 'pattern-paper'
  | 'mistakes'
  | 'planner'
  | 'resources'
  | 'ib-resources'
  | 'progress'
  | 'results'
  | 'question-analytics'
  | 'settings';
