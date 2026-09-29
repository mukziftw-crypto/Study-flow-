import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppRoute, SubjectId, MistakeRecord, Question, Topic, ExtendedNotesData, StudentNote } from '../types';
import { SUBJECTS, TOPICS, QUESTIONS, MISTAKES_DATA } from '../data/mypData';
import { NotesService } from '../services/NotesService';

interface AppContextType {
  route: AppRoute;
  setRoute: (route: AppRoute) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  selectedSubjectId: SubjectId;
  setSelectedSubjectId: (id: SubjectId) => void;
  selectedTopicId: string;
  setSelectedTopicId: (id: string) => void;
  activeQuestionId: string;
  setActiveQuestionId: (id: string) => void;
  activeMockTestId: string | null;
  setActiveMockTestId: (id: string | null) => void;
  mistakes: MistakeRecord[];
  addMistake: (record: Omit<MistakeRecord, 'id' | 'date' | 'resolved'>) => void;
  toggleResolveMistake: (id: string) => void;
  studentName: string;
  startPractice: (questionId: string) => void;
  openTopic: (topicId: string) => void;
  openSubject: (subjectId: SubjectId) => void;
  topicNotesCache: Record<string, ExtendedNotesData>;
  saveTopicNotes: (topicId: string, notes: ExtendedNotesData) => void;
  studentNotes: Record<string, StudentNote>;
  saveStudentNote: (params: {
    unitId: string;
    unitName?: string;
    subjectId?: SubjectId;
    subjectName?: string;
    content: string;
    tags?: string[];
    aiEnhanced?: boolean;
  }) => StudentNote;
  deleteStudentNote: (unitId: string) => void;
}

const INITIAL_STUDENT_NOTES: Record<string, StudentNote> = {
  'phys-u1': {
    id: 'note-phys-u1-init',
    unitId: 'phys-u1',
    unitName: 'Unit 1: Kinematics & Linear Dynamics',
    subjectId: 'physics',
    subjectName: 'Physics',
    content: `- Displacement is distance in a specified direction (vector), whereas distance is total scalar path length.\n- On a velocity-time graph, gradient represents acceleration and area under curve represents displacement.\n- Air resistance increases with velocity squared until terminal velocity is reached when drag balances weight.\n- In free-fall without atmosphere, all masses experience identical gravitational acceleration.`,
    tags: ['Core Summary', 'Exam Trap', 'Vectors'],
    lastSaved: new Date().toISOString(),
    aiEnhanced: false,
  },
  'chem-u1': {
    id: 'note-chem-u1-init',
    unitId: 'chem-u1',
    unitName: 'Unit 1: Atomic Architecture & Periodicity',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    content: `- Electronegativity increases across a period due to greater effective nuclear charge pulling valence electrons tighter.\n- Down a group, atomic radius expands because additional electron shielding layers reduce nuclear electrostatic pull.\n- Noble gases don't have electronegativity values on the Pauling scale because they do not form covalent bonds readily.`,
    tags: ['Periodic Trends', 'Criterion A', 'Exam Trap'],
    lastSaved: new Date().toISOString(),
    aiEnhanced: false,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<AppRoute>('dashboard');
  
  // Theme state with localStorage sync
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('studyflow_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('physics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('phys-u1');
  const [activeQuestionId, setActiveQuestionId] = useState<string>('q-phys-01');
  const [activeMockTestId, setActiveMockTestId] = useState<string | null>('mock-phys-myp5');
  const [studentName] = useState<string>('Mukund');

  // Student personal notes persistent state
  const [studentNotes, setStudentNotes] = useState<Record<string, StudentNote>>(() => {
    const saved = localStorage.getItem('studyflow_student_notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Object.keys(parsed).length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved student notes', e);
      }
    }
    return INITIAL_STUDENT_NOTES;
  });

  const saveStudentNote = (params: {
    unitId: string;
    unitName?: string;
    subjectId?: SubjectId;
    subjectName?: string;
    content: string;
    tags?: string[];
    aiEnhanced?: boolean;
  }) => {
    const topic = TOPICS.find((t) => t.id === params.unitId);
    const sub = SUBJECTS.find((s) => s.id === (params.subjectId || topic?.subjectId));
    
    const record = NotesService.saveStudentNote({
      unitId: params.unitId,
      unitName: params.unitName || topic?.unit || params.unitId,
      subjectId: params.subjectId || topic?.subjectId || 'physics',
      subjectName: params.subjectName || sub?.name || 'Physics',
      content: params.content,
      tags: params.tags,
      aiEnhanced: params.aiEnhanced,
    });

    setStudentNotes((prev) => {
      const updated = { ...prev, [params.unitId]: record };
      localStorage.setItem('studyflow_student_notes', JSON.stringify(updated));
      return updated;
    });

    return record;
  };

  const deleteStudentNote = (unitId: string) => {
    NotesService.deleteStudentNote(unitId);
    setStudentNotes((prev) => {
      const updated = { ...prev };
      delete updated[unitId];
      localStorage.setItem('studyflow_student_notes', JSON.stringify(updated));
      return updated;
    });
  };

  // Topic Notes Cache persistent state
  const [topicNotesCache, setTopicNotesCache] = useState<Record<string, ExtendedNotesData>>(() => {
    const saved = localStorage.getItem('studyflow_topic_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved topic notes', e);
      }
    }
    return {};
  });

  const saveTopicNotes = (topicId: string, notes: ExtendedNotesData) => {
    setTopicNotesCache(prev => {
      const updated = { ...prev, [topicId]: notes };
      localStorage.setItem('studyflow_topic_notes', JSON.stringify(updated));
      return updated;
    });
  };

  // Mistakes persistent state
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => {
    const saved = localStorage.getItem('studyflow_mistakes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved mistakes', e);
      }
    }
    return MISTAKES_DATA;
  });

  useEffect(() => {
    localStorage.setItem('studyflow_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('studyflow_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addMistake = (record: Omit<MistakeRecord, 'id' | 'date' | 'resolved'>) => {
    const newRecord: MistakeRecord = {
      ...record,
      id: `mstk-${Date.now()}`,
      date: 'Just now',
      resolved: false
    };
    setMistakes(prev => [newRecord, ...prev]);
  };

  const toggleResolveMistake = (id: string) => {
    setMistakes(prev =>
      prev.map(m => (m.id === id ? { ...m, resolved: !m.resolved } : m))
    );
  };

  const startPractice = (questionId: string) => {
    const q = QUESTIONS.find(item => item.id === questionId);
    if (q) {
      setActiveQuestionId(questionId);
      setSelectedSubjectId(q.subjectId);
      setSelectedTopicId(q.topicId);
      setRoute('practice');
    }
  };

  const openTopic = (topicId: string) => {
    const t = TOPICS.find(item => item.id === topicId);
    if (t) {
      setSelectedTopicId(topicId);
      setSelectedSubjectId(t.subjectId);
      setRoute('topic');
    }
  };

  const openSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    setRoute('subjects');
  };

  return (
    <AppContext.Provider
      value={{
        route,
        setRoute,
        theme,
        toggleTheme,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedTopicId,
        setSelectedTopicId,
        activeQuestionId,
        setActiveQuestionId,
        activeMockTestId,
        setActiveMockTestId,
        mistakes,
        addMistake,
        toggleResolveMistake,
        studentName,
        startPractice,
        openTopic,
        openSubject,
        topicNotesCache,
        saveTopicNotes,
        studentNotes,
        saveStudentNote,
        deleteStudentNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
