import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TOPICS, QUESTIONS } from '../data/mypData';
import { MathRenderer } from '../components/common/MathRenderer';
import { CanvasSimulation } from '../components/simulations/CanvasSimulations';
import { ExtendedNotesData } from '../types';
import { NotesService } from '../services/NotesService';
import {
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sliders,
  CheckCircle,
  Sparkles,
  Copy,
  Check,
  PlusCircle,
  RefreshCw,
  FileText,
  X,
  Globe,
  Layers,
  Award,
  Zap,
  PenLine,
  Save,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export const TopicView: React.FC = () => {
  const {
    selectedTopicId,
    setSelectedTopicId,
    startPractice,
    theme,
    topicNotesCache,
    saveTopicNotes,
    studentNotes,
    saveStudentNote,
    deleteStudentNote,
    setRoute,
  } = useApp();

  const isDark = theme === 'dark';
  const currentTopic = TOPICS.find((t) => t.id === selectedTopicId) || TOPICS[0];
  const topicQuestions = QUESTIONS.filter((q) => q.topicId === currentTopic.id);

  // Quick check state
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<string | null>(null);

  // Notes state
  const [activeNotesTab, setActiveNotesTab] = useState<'core' | 'my-notes' | 'ai-deepdive' | 'criteria' | 'pitfalls' | 'real-world'>('core');
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandError, setExpandError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Student Personal Notes in Topic
  const currentStudentNote = studentNotes[currentTopic.id];
  const [studentNoteInput, setStudentNoteInput] = useState(currentStudentNote?.content || '');
  const [studentNoteTags, setStudentNoteTags] = useState<string[]>(
    currentStudentNote?.tags || ['Core Summary']
  );
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  useEffect(() => {
    const existing = studentNotes[currentTopic.id];
    setStudentNoteInput(existing?.content || '');
    setStudentNoteTags(existing?.tags || ['Core Summary']);
  }, [currentTopic.id, studentNotes]);

  const handleSaveStudentNote = () => {
    saveStudentNote({
      unitId: currentTopic.id,
      unitName: currentTopic.unit,
      subjectId: currentTopic.subjectId,
      subjectName: currentTopic.name,
      content: studentNoteInput,
      tags: studentNoteTags,
    });
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  // Custom notes import modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [rawNotesInput, setRawNotesInput] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Active extended notes (from cache or topic default)
  const currentExtendedNotes: ExtendedNotesData | undefined =
    topicNotesCache[currentTopic.id] || currentTopic.extendedNotes;

  // Handler: Expand notes using NotesService and Gemini API
  const handleExpandWithGemini = async () => {
    setIsExpanding(true);
    setExpandError(null);
    try {
      const existingStudentNote = studentNotes[currentTopic.id]?.content || studentNoteInput;
      const resData = await NotesService.generateNotes({
        subjectId: currentTopic.subjectId,
        subjectName: currentTopic.name,
        unitId: currentTopic.id,
        unitName: currentTopic.unit,
        topicName: currentTopic.name,
        coreTheory: currentTopic.coreTheory,
        misconceptions: currentTopic.misconceptions,
        studentInputNotes: existingStudentNote.trim(),
        focusCriteria: ['A', 'B', 'C', 'D'],
      });

      saveTopicNotes(currentTopic.id, resData);
      setActiveNotesTab('ai-deepdive');
    } catch (err: any) {
      console.error('Failed to expand notes with Gemini:', err);
      setExpandError(err.message || 'Unable to connect to Gemini note generator');
    } finally {
      setIsExpanding(false);
    }
  };

  // Handler: Synthesize student's custom notes via NotesService
  const handleImportCustomNotes = async () => {
    if (!rawNotesInput.trim()) return;
    setIsImporting(true);
    setImportError(null);
    try {
      const resData = await NotesService.synthesizeStudentNotes({
        unitName: currentTopic.unit,
        subjectName: currentTopic.name,
        rawNotes: rawNotesInput,
      });

      saveTopicNotes(currentTopic.id, resData);
      saveStudentNote({
        unitId: currentTopic.id,
        unitName: currentTopic.unit,
        subjectId: currentTopic.subjectId,
        subjectName: currentTopic.name,
        content: rawNotesInput,
        tags: ['Imported Notes'],
        aiEnhanced: true,
      });
      setIsImportModalOpen(false);
      setRawNotesInput('');
      setActiveNotesTab('ai-deepdive');
    } catch (err: any) {
      console.error('Import error:', err);
      setImportError(err.message || 'Error processing your notes');
    } finally {
      setIsImporting(false);
    }
  };

  // Handler: Copy formatted study sheet to clipboard
  const handleCopyStudySheet = () => {
    let sheetText = `# ${currentTopic.unit}: ${currentTopic.name}\nMYP 5 Comprehensive Conceptual Notes (No Formulas)\n\n`;
    
    sheetText += `## Core Academic Principles:\n`;
    currentTopic.coreTheory.forEach((p, idx) => {
      sheetText += `${idx + 1}. ${p}\n`;
    });

    sheetText += `\n## Core Conceptual Relationships:\n`;
    currentTopic.equations.forEach((eq) => {
      sheetText += `### ${eq.name}\n- Meaning: ${eq.meaning}\n- Application: ${eq.application}\n- Interpretation: ${eq.notes}\n\n`;
    });

    if (currentExtendedNotes) {
      sheetText += `## Executive Academic Overview:\n${currentExtendedNotes.overview}\n\n`;
      sheetText += `## In-Depth Conceptual Breakdowns:\n`;
      currentExtendedNotes.deepDiveSections.forEach((sec) => {
        sheetText += `### ${sec.sectionTitle}\n${sec.explanation}\nKey Takeaways:\n`;
        sec.keyTakeaways.forEach((k) => (sheetText += `- ${k}\n`));
        sheetText += `Authentic Application: ${sec.practicalExample}\n\n`;
      });
      if (currentExtendedNotes.criterionFocus) {
        sheetText += `## IB MYP 5 Criteria Focus:\n`;
        sheetText += `- Criterion A (Knowing): ${currentExtendedNotes.criterionFocus.criterionA}\n`;
        sheetText += `- Criterion B (Investigating): ${currentExtendedNotes.criterionFocus.criterionB}\n`;
        sheetText += `- Criterion C (Processing/Communicating): ${currentExtendedNotes.criterionFocus.criterionC}\n`;
        sheetText += `- Criterion D (Real-World Impact): ${currentExtendedNotes.criterionFocus.criterionD}\n\n`;
      }
    }

    sheetText += `## Diagnostic Misconceptions & Traps:\n`;
    currentTopic.misconceptions.forEach((m) => {
      sheetText += `• ${m}\n`;
    });

    navigator.clipboard.writeText(sheetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar: Topic Info & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#4361EE] uppercase font-bold tracking-wider">
              {currentTopic.unit}
            </span>
            <span className="text-xs text-slate-400">· MYP Year 5 Framework</span>
            {currentExtendedNotes && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles size={10} />
                {currentExtendedNotes.source === 'custom' ? 'Custom Notes Loaded' : 'Gemini Notes Active'}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-inherit mt-1">
            {currentTopic.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {currentTopic.description}
          </p>
        </div>

        {/* Action Controls & Topic Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gemini Note Expander Button */}
          <button
            onClick={handleExpandWithGemini}
            disabled={isExpanding}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all shadow-xs ${
              isExpanding
                ? 'bg-indigo-600/50 text-indigo-200 cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 hover:shadow-indigo-500/30'
            }`}
            title="Generate deep, comprehensive, formula-free academic study notes with Gemini AI"
          >
            {isExpanding ? (
              <>
                <RefreshCw size={13} className="animate-spin text-white" />
                <span>Generating with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} className="text-amber-300" />
                <span>{currentExtendedNotes ? 'Regenerate Notes (Gemini)' : 'Expand Notes with Gemini'}</span>
              </>
            )}
          </button>

          {/* Import / Paste Custom Notes Button */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isDark
                ? 'bg-[#141C2B] border-[#1F2B3F] text-slate-300 hover:text-white hover:bg-[#1A253A]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Paste and integrate your own class notes or school syllabus summaries"
          >
            <PlusCircle size={13} className="text-emerald-400" />
            <span>Import Your Notes</span>
          </button>

          {/* Copy Full Study Sheet */}
          <button
            onClick={handleCopyStudySheet}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isDark
                ? 'bg-[#141C2B] border-[#1F2B3F] text-slate-300 hover:text-white hover:bg-[#1A253A]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Copy entire unit study sheet to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-slate-400" />
                <span>Copy Sheet</span>
              </>
            )}
          </button>

          {/* Quick Topic Switcher Dropdown */}
          <select
            value={currentTopic.id}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className={`text-xs py-1.5 px-3 rounded-lg font-mono border focus:outline-none transition-colors ${
              isDark
                ? 'bg-[#111723] border-[#1C2638] text-slate-200'
                : 'bg-white border-[#E3E8F0] text-slate-800'
            }`}
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.unit}: {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expand Error Alert */}
      {expandError && (
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-rose-400 shrink-0" />
            <span>{expandError}</span>
          </div>
          <button
            onClick={() => setExpandError(null)}
            className="text-rose-400 hover:text-rose-200"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Generating Indicator Banner */}
      {isExpanding && (
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 flex items-center gap-3 animate-pulse">
          <RefreshCw size={16} className="animate-spin text-indigo-400 shrink-0" />
          <div>
            <div className="font-semibold text-indigo-200">
              Gemini AI is expanding academic study notes for "{currentTopic.name}"...
            </div>
            <div className="text-[11px] text-indigo-400/80 mt-0.5">
              Consulting MYP 5 Science/Math framework · Removing all formulas · Constructing Criterion A–D rubrics and real-world cases
            </div>
          </div>
        </div>
      )}

      {/* Two-Pane Layout: Left = Comprehensive Academic Notes, Right = Simulators & Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: ACADEMIC NOTES CENTER (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Note Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-slate-700/20 bg-slate-900/40 overflow-x-auto">
            <button
              onClick={() => setActiveNotesTab('core')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeNotesTab === 'core'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <BookOpen size={13} />
              <span>Core Syllabus</span>
            </button>

            <button
              onClick={() => setActiveNotesTab('my-notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeNotesTab === 'my-notes'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <PenLine size={13} className="text-emerald-400" />
              <span>My Notes {currentStudentNote?.content?.trim() ? '✍️' : ''}</span>
            </button>

            <button
              onClick={() => setActiveNotesTab('ai-deepdive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeNotesTab === 'ai-deepdive'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Deep-Dive Notes {currentExtendedNotes && '✓'}</span>
            </button>

            <button
              onClick={() => setActiveNotesTab('criteria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeNotesTab === 'criteria'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Award size={13} />
              <span>Criterion A–D</span>
            </button>

            <button
              onClick={() => setActiveNotesTab('pitfalls')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeNotesTab === 'pitfalls'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <AlertTriangle size={13} />
              <span>Examiner Traps</span>
            </button>

            <button
              onClick={() => setActiveNotesTab('real-world')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeNotesTab === 'real-world'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Globe size={13} />
              <span>Real-World Impact</span>
            </button>
          </div>

          {/* TAB 1: CORE SYLLABUS NOTES */}
          {activeNotesTab === 'core' && (
            <div className="space-y-4">
              {/* 1. Core Theory & Conceptual Foundations */}
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-[#4361EE]" />
                    <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-slate-300">
                      Core Academic Principles
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Formula-Free Conceptual Depth
                  </span>
                </div>
                <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                  {currentTopic.coreTheory.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/30 border border-slate-800/50">
                      <span className="font-mono text-[11px] text-indigo-400 font-bold mt-0.5 w-5 shrink-0">
                        0{idx + 1}.
                      </span>
                      <div className="leading-relaxed">
                        <MathRenderer content={point} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Core Conceptual Relationships (No Formulas) */}
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-indigo-400">❖</span>
                    <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-slate-300">
                      Conceptual Relationships & Laws
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                    Qualitative Principles
                  </span>
                </div>

                <div className="space-y-3.5">
                  {currentTopic.equations.map((eq, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border space-y-2 ${
                        isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {eq.name}
                        </span>
                      </div>
                      {eq.meaning && (
                        <div className="text-xs text-slate-200 leading-relaxed">
                          <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block mb-1">
                            Physical / Mathematical Meaning:
                          </span>
                          <span>{eq.meaning}</span>
                        </div>
                      )}
                      {eq.application && (
                        <div className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40">
                          <span className="text-indigo-300 font-mono text-[10px] uppercase font-bold block mb-0.5">
                            Authentic Application:
                          </span>
                          <span>{eq.application}</span>
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-700/20">
                        <span className="text-slate-500 font-mono text-[10px] uppercase font-bold mr-1">
                          Key Interpretation:
                        </span>
                        <span>{eq.notes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Command Term Guidance */}
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-emerald-400" />
                  <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-emerald-400">
                    MYP Command-Term Execution Guide
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  {currentTopic.commandTermGuidance.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-700/20 pb-2.5 last:border-none last:pb-0">
                      <span className="font-mono font-bold text-slate-200">
                        "{item.term}"
                      </span>
                      <p className="text-slate-400 mt-0.5 leading-snug">
                        {item.advice}
                      </p>
                      <p className="text-[11px] text-emerald-400/90 font-mono mt-1">
                        MYP Marker expectation: {item.mypExpectation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: STUDENT PERSONAL NOTES */}
          {activeNotesTab === 'my-notes' && (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <PenLine size={16} className="text-emerald-400" />
                    <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-emerald-400">
                      Your Personal Study Notes
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRoute('notes')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        isDark
                          ? 'bg-[#151F33] border-[#22314D] text-slate-300 hover:text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>Open Notes Workspace</span>
                      <ExternalLink size={11} />
                    </button>

                    <button
                      onClick={handleSaveStudentNote}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    >
                      {noteSavedFeedback ? (
                        <>
                          <Check size={12} />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>Save Notes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  Type your classroom observations, personal explanations, or syllabus points. Click{' '}
                  <strong className="text-indigo-400">"Generate Comprehensive Guide"</strong> anytime to synthesize your notes with Gemini into a full IB MYP 5 master study guide!
                </p>

                {/* Quick Tag Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
                  <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Tags:</span>
                  {[
                    'Core Summary',
                    'Exam Trap',
                    'Criterion A',
                    'Criterion B',
                    'Criterion C',
                    'Criterion D',
                    'Lab Observation',
                  ].map((tag) => {
                    const active = studentNoteTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          setStudentNoteTags((prev) =>
                            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                          );
                        }}
                        className={`px-2 py-0.5 rounded-md font-mono text-[10px] transition-colors ${
                          active
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isDark
                            ? 'bg-[#151F32] text-slate-400 hover:text-slate-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Snippet Inserts */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] font-mono text-slate-400">
                  <span>Insert:</span>
                  <button
                    onClick={() =>
                      setStudentNoteInput((prev) => (prev ? `${prev}\n• ` : '• '))
                    }
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Bullet
                  </button>
                  <button
                    onClick={() =>
                      setStudentNoteInput((prev) =>
                        prev ? `${prev}\n**Key Concept:** ` : '**Key Concept:** '
                      )
                    }
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Key Concept
                  </button>
                  <button
                    onClick={() =>
                      setStudentNoteInput((prev) =>
                        prev ? `${prev}\n⚠️ **Exam Trap:** ` : '⚠️ **Exam Trap:** '
                      )
                    }
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Exam Trap
                  </button>
                  <button
                    onClick={() =>
                      setStudentNoteInput((prev) =>
                        prev
                          ? `${prev}\n🔬 **Criterion D Real-World Impact:** `
                          : '🔬 **Criterion D Real-World Impact:** '
                      )
                    }
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Criterion D
                  </button>
                </div>

                {/* Note Textarea */}
                <textarea
                  rows={10}
                  value={studentNoteInput}
                  onChange={(e) => setStudentNoteInput(e.target.value)}
                  placeholder="Enter your personal study notes, lecture summaries, key definitions, or question review notes for this unit..."
                  className={`w-full p-3.5 rounded-lg text-xs font-mono leading-relaxed transition-colors resize-y focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    isDark
                      ? 'bg-[#131A29] border-[#1F2B3F] text-slate-200 placeholder-slate-500 border'
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 border'
                  }`}
                />

                {/* Note Footer Actions */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/20">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span>{studentNoteInput.length} chars</span>
                    <span>
                      {studentNoteInput.trim() ? studentNoteInput.trim().split(/\s+/).length : 0} words
                    </span>
                    {currentStudentNote?.lastSaved && (
                      <span className="hidden sm:inline">
                        · Last saved:{' '}
                        {new Date(currentStudentNote.lastSaved).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {studentNoteInput.trim() && (
                      <button
                        onClick={() => {
                          if (window.confirm('Delete student notes for this unit?')) {
                            setStudentNoteInput('');
                            deleteStudentNote(currentTopic.id);
                          }
                        }}
                        className="text-slate-400 hover:text-rose-400 p-1.5 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}

                    <button
                      onClick={handleExpandWithGemini}
                      disabled={isExpanding}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xs"
                      title="Synthesize and expand your personal notes with Gemini into a comprehensive academic guide"
                    >
                      <Sparkles size={12} className="text-amber-300" />
                      <span>Generate Comprehensive Guide</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI DEEP-DIVE NOTES (EXTENDED WITH GEMINI) */}
          {activeNotesTab === 'ai-deepdive' && (
            <div className="space-y-4">
              {currentExtendedNotes ? (
                <>
                  {/* Executive Overview */}
                  <div
                    className={`p-5 rounded-xl border ${
                      isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-indigo-400" />
                        <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-indigo-400">
                          Comprehensive Academic Overview
                        </h3>
                      </div>
                      {currentExtendedNotes.generatedAt && (
                        <span className="text-[10px] font-mono text-slate-500">
                          Updated: {currentExtendedNotes.generatedAt}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {currentExtendedNotes.overview}
                    </p>
                  </div>

                  {/* Deep Dive Sections */}
                  {currentExtendedNotes.deepDiveSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl border space-y-3 ${
                        isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-400">
                          Section {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-100">
                          {sec.sectionTitle}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {sec.explanation}
                      </p>

                      {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                        <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
                            Essential Conceptual Points:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {sec.keyTakeaways.map((k, ki) => (
                              <li key={ki} className="flex items-start gap-2">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>{k}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sec.practicalExample && (
                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-300">
                          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                            Applied Case Study:
                          </span>
                          <p>{sec.practicalExample}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* High Yield Mastery Checklist */}
                  {currentExtendedNotes.highYieldChecklist && (
                    <div
                      className={`p-5 rounded-xl border ${
                        isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle size={16} className="text-emerald-400" />
                        <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-emerald-400">
                          High-Yield Mastery Checklist
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {currentExtendedNotes.highYieldChecklist.map((item, ci) => (
                          <div
                            key={ci}
                            className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 flex items-start gap-2"
                          >
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center border border-dashed border-slate-700 rounded-xl bg-slate-900/20 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
                    <Sparkles size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-200">
                      No Gemini Deep-Dive Notes Generated Yet
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Click below to let Gemini analyze this MYP 5 unit and generate comprehensive, formula-free academic study notes with Criterion A–D rubrics.
                    </p>
                  </div>
                  <button
                    onClick={handleExpandWithGemini}
                    disabled={isExpanding}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-mono bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-500/20"
                  >
                    <Sparkles size={14} className="text-amber-300" />
                    <span>Generate Academic Notes with Gemini AI</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CRITERION A–D ANALYSIS */}
          {activeNotesTab === 'criteria' && (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award size={16} className="text-indigo-400" />
                  <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-slate-200">
                    MYP 5 Assessment Criteria Breakdown for {currentTopic.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {/* Criterion A */}
                  <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-400">
                      <span>Criterion A: Knowing and Understanding</span>
                      <span className="font-mono text-[10px]">Level 7–8 Expectation</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentExtendedNotes?.criterionFocus?.criterionA ||
                        'Demonstrates comprehensive understanding of physical mechanisms and mathematical properties. Defines terminology with high precision, distinguishes scalar from vector quantities, and articulates qualitative relationships in both familiar and unfamiliar scenarios without reliance on memorized formulas.'}
                    </p>
                  </div>

                  {/* Criterion B */}
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                      <span>Criterion B: Inquiring and Designing / Investigating Patterns</span>
                      <span className="font-mono text-[10px]">Level 7–8 Expectation</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentExtendedNotes?.criterionFocus?.criterionB ||
                        'Formulates clear testable hypotheses with dynamic causal mechanisms. Designs robust experimental protocols with explicit manipulation of independent variables, precise measurement of dependent variables, and rigorous control of external environmental factors.'}
                    </p>
                  </div>

                  {/* Criterion C */}
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Criterion C: Processing and Evaluating / Communicating</span>
                      <span className="font-mono text-[10px]">Level 7–8 Expectation</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentExtendedNotes?.criterionFocus?.criterionC ||
                        'Transforms raw data into organized qualitative tables and annotated trend curves. Differentiates systematic calibration offsets from random observational scatter. Evaluates procedural validity and proposes concrete methodological enhancements.'}
                    </p>
                  </div>

                  {/* Criterion D */}
                  <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-400">
                      <span>Criterion D: Reflecting on the Impacts of Science / Real-Life Contexts</span>
                      <span className="font-mono text-[10px]">Level 7–8 Expectation</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentExtendedNotes?.criterionFocus?.criterionD ||
                        'Synthesizes ethical, environmental, social, and economic implications of the science. Evaluates trade-offs between industrial efficiency, ecological preservation, and human wellbeing, arguing with balanced, evidenced reasoning.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXAMINER TRAPS & PITFALLS */}
          {activeNotesTab === 'pitfalls' && (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-amber-400">
                    Common Diagnostic Misconceptions & Examiner Traps
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  {currentTopic.misconceptions.map((misc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 flex items-start gap-2.5 text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div className="leading-relaxed">
                        <MathRenderer content={misc} />
                      </div>
                    </div>
                  ))}

                  {currentExtendedNotes?.examinerPitfalls && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                        IB Examiner Feedback Points:
                      </span>
                      {currentExtendedNotes.examinerPitfalls.map((pit, pidx) => (
                        <div
                          key={pidx}
                          className="p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 flex items-start gap-2.5 text-slate-300"
                        >
                          <span className="text-rose-400 font-bold shrink-0">⚠</span>
                          <span className="leading-relaxed">{pit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REAL-WORLD IMPACT */}
          {activeNotesTab === 'real-world' && (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={16} className="text-indigo-400" />
                  <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-indigo-400">
                    Real-World Contexts & Global Challenges
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  {currentExtendedNotes?.realWorldApplications ? (
                    currentExtendedNotes.realWorldApplications.map((app, aidx) => (
                      <div
                        key={aidx}
                        className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-1"
                      >
                        <span className="font-mono text-[10px] font-bold text-indigo-400 uppercase block">
                          Case Study {aidx + 1}
                        </span>
                        <p className="leading-relaxed">{app}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center border border-slate-800 rounded-lg text-slate-400">
                      Click "Expand Notes with Gemini" to generate detailed real-world case studies for Criterion D.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANE: APPLICATION, CANVAS SIMULATOR & DIAGNOSTIC (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Interactive Canvas Simulation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Explore: Interactive Laboratory
              </span>
              <span className="text-[11px] font-mono text-[#4361EE]">
                Real-time HTML5 Canvas
              </span>
            </div>

            {currentTopic.simulationId ? (
              <CanvasSimulation simulationId={currentTopic.simulationId} />
            ) : (
              <div className="p-8 text-center border border-slate-800 rounded-xl bg-[#111723] text-slate-400 text-xs">
                No canvas simulator assigned to this unit.
              </div>
            )}
          </div>

          {/* 2. Quick Conceptual Diagnostic Check */}
          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold tracking-wide uppercase font-mono text-slate-300">
                Diagnostic Quick Check · 1 min
              </h3>
              <span className="text-[10px] font-mono text-slate-500">
                Formative verification
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              According to fundamental principles, which condition guarantees an induced electromotive force in an electrical conductor?
            </p>

            <div className="space-y-2 text-xs">
              {[
                { id: 'A', text: 'A uniform and stationary magnetic field of high intensity.' },
                { id: 'B', text: 'A continuous change in the magnetic flux cutting through the conductor over time.' },
                { id: 'C', text: 'Maintaining constant direct electric current through the surrounding circuit.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuickCheckAnswer(opt.id)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                    quickCheckAnswer === opt.id
                      ? opt.id === 'B'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-medium'
                        : 'bg-rose-500/10 border-rose-500 text-rose-300'
                      : isDark
                      ? 'bg-[#141C2B] border-[#1F2B3F] text-slate-300 hover:bg-[#182337]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>
                    <strong className="font-mono mr-2">{opt.id}.</strong>
                    {opt.text}
                  </span>
                  {quickCheckAnswer === opt.id && (
                    <span className="text-[11px] font-mono font-bold">
                      {opt.id === 'B' ? 'CORRECT' : 'INCORRECT'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {quickCheckAnswer && (
              <div className="mt-3 p-3 rounded-lg bg-[#141C2B] border border-[#1F2B3F] text-xs text-slate-300">
                {quickCheckAnswer === 'B' ? (
                  <div className="text-emerald-400">
                    <p>Correct! Induction requires a nonzero rate of change of magnetic flux. Stationary fields create zero induced voltage.</p>
                  </div>
                ) : (
                  <div className="text-rose-400">
                    <p>Incorrect. Review the core theory: constant magnetic fields produce zero induced voltage regardless of strength.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Apply: Practice Questions for this Topic */}
          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-[#E3E8F0]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-semibold tracking-wide uppercase font-mono text-slate-300">
                  Apply: Exam-Style Strand Practice
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Reinforce theoretical concepts with rubric-aligned questions.
                </p>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold">
                {topicQuestions.length} Questions
              </span>
            </div>

            <div className="space-y-2.5">
              {topicQuestions.slice(0, 3).map((q) => (
                <div
                  key={q.id}
                  onClick={() => startPractice(q.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                    isDark
                      ? 'bg-[#141C2B] border-[#1F2B3F] hover:border-[#4361EE]/50 hover:bg-[#182337]'
                      : 'bg-slate-50 border-slate-200 hover:border-[#4361EE]/40 hover:bg-slate-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Crit {q.criterion}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {q.commandTerm}
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-inherit group-hover:text-[#4361EE] transition-colors line-clamp-1">
                      {q.title}
                    </h5>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-slate-500 group-hover:text-[#4361EE] group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: IMPORT / PASTE CUSTOM NOTES */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className={`w-full max-w-xl rounded-2xl border p-6 shadow-2xl space-y-4 animate-scale-up ${
              isDark ? 'bg-[#111723] border-[#1C2638] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-indigo-400" />
                <h3 className="text-base font-bold">
                  Import Your Class Notes for {currentTopic.name}
                </h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Paste your personal class notes, teacher summary points, or revision bullets below. Gemini will synthesize and format them into clear, accurate MYP 5 conceptual notes without any formulas!
            </p>

            <textarea
              rows={8}
              value={rawNotesInput}
              onChange={(e) => setRawNotesInput(e.target.value)}
              placeholder="Paste your notes here... (e.g. key concepts, teacher definitions, lab observations, real-world examples)"
              className={`w-full p-3 rounded-xl text-xs font-mono leading-relaxed border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-[#141C2B] border-[#1F2B3F] text-slate-200 placeholder:text-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
              }`}
            />

            {importError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle size={14} className="text-rose-400 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleImportCustomNotes}
                disabled={isImporting || !rawNotesInput.trim()}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all ${
                  isImporting || !rawNotesInput.trim()
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                }`}
              >
                {isImporting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Processing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} className="text-amber-300" />
                    <span>Synthesize & Save Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
