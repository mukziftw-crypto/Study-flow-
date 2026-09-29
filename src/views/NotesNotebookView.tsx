import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS, TOPICS } from '../data/mypData';
import { SubjectId, Topic, ExtendedNotesData } from '../types';
import { NotesService } from '../services/NotesService';
import {
  BookOpen,
  Sparkles,
  Save,
  Trash2,
  Copy,
  Check,
  Search,
  PenLine,
  RefreshCw,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
  Columns,
  Layers,
  Award,
  Zap,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const COMMON_TAGS = [
  'Core Summary',
  'Exam Trap',
  'Criterion A',
  'Criterion B',
  'Criterion C',
  'Criterion D',
  'Key Definition',
  'Lab Observation',
];

export const NotesNotebookView: React.FC = () => {
  const {
    theme,
    selectedSubjectId,
    setSelectedSubjectId,
    selectedTopicId,
    setSelectedTopicId,
    openTopic,
    topicNotesCache,
    saveTopicNotes,
    studentNotes,
    saveStudentNote,
    deleteStudentNote,
  } = useApp();

  const isDark = theme === 'dark';

  // State
  const [activeUnitId, setActiveUnitId] = useState<string>(selectedTopicId || 'phys-u1');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'split' | 'editor' | 'ai'>('split');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [genError, setGenError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');

  // Currently selected subject & its topics
  const currentSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];
  const subjectTopics = useMemo(
    () => TOPICS.filter((t) => t.subjectId === currentSubject.id),
    [currentSubject.id]
  );

  // Active topic
  const activeTopic = useMemo(
    () => subjectTopics.find((t) => t.id === activeUnitId) || subjectTopics[0] || TOPICS[0],
    [subjectTopics, activeUnitId]
  );

  // Update activeUnitId if subject changed and topic is not in subject
  useEffect(() => {
    if (!subjectTopics.some((t) => t.id === activeUnitId)) {
      if (subjectTopics[0]) {
        setActiveUnitId(subjectTopics[0].id);
      }
    }
  }, [selectedSubjectId, subjectTopics, activeUnitId]);

  // Current student note for active unit
  const currentStudentNote = studentNotes[activeTopic.id];
  const [noteContent, setNoteContent] = useState<string>(currentStudentNote?.content || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    currentStudentNote?.tags || ['Core Summary']
  );

  // Sync state when active topic changes
  useEffect(() => {
    const existing = studentNotes[activeTopic.id];
    setNoteContent(existing?.content || '');
    setSelectedTags(existing?.tags || ['Core Summary']);
    setSaveStatus('saved');
    setGenError(null);
  }, [activeTopic.id, studentNotes]);

  // Active AI study notes (from cache or topic data)
  const currentAiNotes: ExtendedNotesData | undefined =
    topicNotesCache[activeTopic.id] || activeTopic.extendedNotes;

  // Handle note content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    setSaveStatus('dirty');
  };

  // Save student note
  const handleSave = () => {
    setSaveStatus('saving');
    saveStudentNote({
      unitId: activeTopic.id,
      unitName: activeTopic.unit,
      subjectId: activeTopic.subjectId,
      subjectName: currentSubject.name,
      content: noteContent,
      tags: selectedTags,
    });
    setSaveStatus('saved');
  };

  // Toggle tag
  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      setSaveStatus('dirty');
      return next;
    });
  };

  // Generate comprehensive notes with Gemini using NotesService
  const handleGenerateWithGemini = async () => {
    setIsGenerating(true);
    setGenError(null);
    setGenerationStep('Analyzing unit curriculum & student notes...');

    try {
      // Step 1: Save current student note first if dirty
      if (noteContent.trim()) {
        saveStudentNote({
          unitId: activeTopic.id,
          unitName: activeTopic.unit,
          subjectId: activeTopic.subjectId,
          subjectName: currentSubject.name,
          content: noteContent,
          tags: selectedTags,
          aiEnhanced: true,
        });
      }

      setGenerationStep('Synthesizing formula-free IB conceptual breakdown...');

      const result = await NotesService.generateNotes({
        subjectId: activeTopic.subjectId,
        subjectName: currentSubject.name,
        unitId: activeTopic.id,
        unitName: activeTopic.unit,
        topicName: activeTopic.name,
        coreTheory: activeTopic.coreTheory,
        misconceptions: activeTopic.misconceptions,
        studentInputNotes: noteContent.trim(),
        focusCriteria: ['A', 'B', 'C', 'D'],
      });

      setGenerationStep('Finalizing high-yield study sheet...');

      // Save to application cache
      saveTopicNotes(activeTopic.id, result);

      // If in editor view, switch to split view so student sees the newly generated notes
      if (layoutMode === 'editor') {
        setLayoutMode('split');
      }

      setSaveStatus('saved');
    } catch (err: any) {
      console.error('Note generation failed:', err);
      setGenError(err.message || 'Unable to generate notes with Gemini. Please try again.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Quick insert snippets
  const handleInsertSnippet = (snippet: string) => {
    setNoteContent((prev) => (prev ? `${prev}\n${snippet}` : snippet));
    setSaveStatus('dirty');
  };

  // Copy combined study sheet to clipboard
  const handleCopyMarkdown = () => {
    const md = NotesService.exportUnitMarkdown(
      activeTopic.unit,
      currentSubject.name,
      currentAiNotes,
      currentStudentNote
    );
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter topics by search query
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return subjectTopics;
    const lower = searchQuery.toLowerCase();
    return subjectTopics.filter(
      (t) =>
        t.unit.toLowerCase().includes(lower) ||
        t.name.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower) ||
        (studentNotes[t.id]?.content || '').toLowerCase().includes(lower)
    );
  }, [subjectTopics, searchQuery, studentNotes]);

  // Statistics
  const unitsWithPersonalNotes = subjectTopics.filter(
    (t) => studentNotes[t.id] && studentNotes[t.id].content.trim().length > 0
  ).length;

  const unitsWithAiNotes = subjectTopics.filter(
    (t) => topicNotesCache[t.id] || t.extendedNotes
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Notes Workspace
            </span>
            <span className="text-xs text-slate-400">· Integrated Student Notes & Gemini AI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-inherit mt-1">
            Study Notes & AI Synthesis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Write your personal revision notes, and leverage Gemini to generate comprehensive, formula-free academic study guides.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Mode Selector */}
          <div
            className={`flex items-center rounded-lg p-0.5 border text-xs ${
              isDark ? 'bg-[#131A29] border-[#1F2B3F]' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setLayoutMode('split')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                layoutMode === 'split'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-inherit'
              }`}
              title="Split View: My Notes & Gemini Side-by-Side"
            >
              <Columns size={13} />
              <span className="hidden sm:inline">Split View</span>
            </button>
            <button
              onClick={() => setLayoutMode('editor')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                layoutMode === 'editor'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-inherit'
              }`}
              title="Full Editor View"
            >
              <PenLine size={13} />
              <span className="hidden sm:inline">My Notes Only</span>
            </button>
            <button
              onClick={() => setLayoutMode('ai')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                layoutMode === 'ai'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-inherit'
              }`}
              title="Gemini Study Guide View"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Gemini Guide</span>
            </button>
          </div>

          {/* Copy Full Markdown */}
          <button
            onClick={handleCopyMarkdown}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isDark
                ? 'bg-[#141C2B] border-[#1F2B3F] text-slate-300 hover:text-white hover:bg-[#1A253A]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Copy unit notes as formatted Markdown"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Export Markdown</span>
              </>
            )}
          </button>

          {/* Jump to Topic View */}
          <button
            onClick={() => {
              setSelectedTopicId(activeTopic.id);
              openTopic(activeTopic.id);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
          >
            <span>Open in Interactive Unit</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-700/20">
        {SUBJECTS.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          const subTopics = TOPICS.filter((t) => t.subjectId === sub.id);
          const hasNotesCount = subTopics.filter(
            (t) => studentNotes[t.id]?.content?.trim()
          ).length;

          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-semibold'
                  : isDark
                  ? 'bg-[#111724] text-slate-400 hover:text-slate-200 hover:bg-[#162032]'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {hasNotesCount}/{subTopics.length} notes
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Unit Navigation Sidebar (3 cols) */}
        <div
          className={`lg:col-span-3 rounded-xl border p-4 space-y-3 ${
            isDark ? 'bg-[#0E1524] border-[#1C273C]' : 'bg-white border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Units ({filteredTopics.length})
            </span>
            <span className="text-[11px] font-mono text-indigo-400">
              {unitsWithPersonalNotes} with notes
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search units or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-[#151F32] border-[#22314D] text-slate-200 placeholder-slate-500 border'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 border'
              }`}
            />
          </div>

          {/* Topics List */}
          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isActive = topic.id === activeTopic.id;
              const hasPersonal = Boolean(studentNotes[topic.id]?.content?.trim());
              const hasAi = Boolean(topicNotesCache[topic.id] || topic.extendedNotes);

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveUnitId(topic.id);
                    setSelectedTopicId(topic.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-all border text-xs group ${
                    isActive
                      ? 'bg-indigo-600/10 border-indigo-500/40 text-inherit font-medium shadow-xs'
                      : isDark
                      ? 'bg-[#121929]/50 border-transparent hover:bg-[#162136] text-slate-300'
                      : 'bg-slate-50/70 border-transparent hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-indigo-400 font-semibold uppercase">
                      {topic.unit.split(':')[0]}
                    </span>
                    <div className="flex items-center gap-1">
                      {hasPersonal && (
                        <span
                          title="Has personal notes"
                          className="w-2 h-2 rounded-full bg-emerald-400"
                        />
                      )}
                      {hasAi && (
                        <span
                          title="Has Gemini comprehensive notes"
                          className="w-2 h-2 rounded-full bg-amber-400"
                        />
                      )}
                    </div>
                  </div>
                  <div className="font-medium text-xs mt-0.5 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {topic.name}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {hasPersonal
                      ? studentNotes[topic.id].content.substring(0, 45) + '...'
                      : topic.description}
                  </div>
                </button>
              );
            })}

            {filteredTopics.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching units found.
              </div>
            )}
          </div>
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Active Unit Header Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDark ? 'bg-[#0E1524] border-[#1C273C]' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase">
                  {activeTopic.unit}
                </span>
                <span className="text-xs text-slate-400">· {currentSubject.name}</span>
                {currentStudentNote?.aiEnhanced && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Sparkles size={10} /> AI Enhanced
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-inherit mt-0.5">{activeTopic.name}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {activeTopic.description}
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <button
                onClick={handleGenerateWithGemini}
                disabled={isGenerating}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all shadow-xs ${
                  isGenerating
                    ? 'bg-indigo-600/50 text-indigo-200 cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                }`}
                title="Generate comprehensive study notes using Gemini API"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={13} className="animate-spin text-white" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} className="text-amber-300" />
                    <span>
                      {currentAiNotes ? 'Regenerate Notes (Gemini)' : 'Generate Study Notes'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generation Progress Banner */}
          {isGenerating && (
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-200 text-xs flex items-center gap-3 animate-pulse">
              <RefreshCw size={16} className="animate-spin text-indigo-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Gemini NotesService is generating comprehensive notes...</div>
                <div className="text-[11px] text-indigo-300 mt-0.5">{generationStep}</div>
              </div>
            </div>
          )}

          {/* Generation Error Banner */}
          {genError && (
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold">Generation error: </span>
                {genError}
              </div>
            </div>
          )}

          {/* Split / Editor / AI Views */}
          <div
            className={`grid gap-4 ${
              layoutMode === 'split'
                ? 'grid-cols-1 lg:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {/* Student Note Input Panel (shown in 'split' or 'editor' mode) */}
            {(layoutMode === 'split' || layoutMode === 'editor') && (
              <div
                className={`rounded-xl border flex flex-col ${
                  isDark ? 'bg-[#0E1524] border-[#1C273C]' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                {/* Editor Header */}
                <div className="p-3.5 border-b border-slate-700/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PenLine size={14} className="text-emerald-400" />
                    <span className="text-xs font-bold text-inherit uppercase font-mono tracking-wider">
                      Student Personal Notes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono ${
                        saveStatus === 'saved'
                          ? 'text-emerald-400'
                          : saveStatus === 'saving'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {saveStatus === 'saved'
                        ? '● Saved'
                        : saveStatus === 'saving'
                        ? 'Saving...'
                        : 'Unsaved edits'}
                    </span>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    >
                      <Save size={11} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>

                {/* Quick Tag Pills */}
                <div className="px-3.5 py-2 border-b border-slate-700/20 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                  <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Tags:</span>
                  {COMMON_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => handleToggleTag(tag)}
                        className={`px-2 py-0.5 rounded-md font-mono text-[10px] whitespace-nowrap transition-colors ${
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

                {/* Quick Insert Snippet Actions */}
                <div className="px-3.5 py-2 border-b border-slate-700/10 flex items-center gap-2 text-[10px] font-mono text-slate-400 overflow-x-auto">
                  <span>Quick insert:</span>
                  <button
                    onClick={() => handleInsertSnippet('• ')}
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Bullet
                  </button>
                  <button
                    onClick={() => handleInsertSnippet('**Key Concept:** ')}
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Key Concept
                  </button>
                  <button
                    onClick={() => handleInsertSnippet('⚠️ **Exam Pitfall:** ')}
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Exam Pitfall
                  </button>
                  <button
                    onClick={() => handleInsertSnippet('🔬 **Real-World Impact (Criterion D):** ')}
                    className="hover:text-indigo-400 underline decoration-dotted"
                  >
                    + Criterion D
                  </button>
                </div>

                {/* Textarea Input */}
                <div className="p-3.5 flex-1 flex flex-col">
                  <textarea
                    rows={layoutMode === 'editor' ? 16 : 14}
                    value={noteContent}
                    onChange={handleContentChange}
                    placeholder={`Type or paste your personal class notes, revision points, or key takeaways for ${activeTopic.name} here...\n\nExample:\n- Core mechanism: When temperature increases, molecular kinetic energy increases, elevating reaction collisions.\n- Trap to avoid: Never state that catalysts increase reactant energy; they provide an alternate reaction pathway with lower activation energy.\n- Criterion D link: Industrial Haber-Bosch process uses iron catalysts to optimize economic yield while balancing environmental emissions.`}
                    className={`w-full flex-1 p-3 rounded-lg text-xs font-mono leading-relaxed transition-colors resize-y focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      isDark
                        ? 'bg-[#121929] border-[#1E293B] text-slate-200 placeholder-slate-500 border'
                        : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 border'
                    }`}
                  />

                  {/* Footer Stats & Enhance Button */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-3 font-mono text-[10px]">
                      <span>{noteContent.length} chars</span>
                      <span>
                        {noteContent.trim() ? noteContent.trim().split(/\s+/).length : 0} words
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {noteContent.trim() && (
                        <button
                          onClick={() => {
                            if (window.confirm('Clear all student notes for this unit?')) {
                              setNoteContent('');
                              deleteStudentNote(activeTopic.id);
                              setSaveStatus('saved');
                            }
                          }}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          title="Delete note"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}

                      <button
                        onClick={handleGenerateWithGemini}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-indigo-600/90 hover:bg-indigo-600 text-white transition-all shadow-xs"
                      >
                        <Sparkles size={11} className="text-amber-300" />
                        <span>Enhance with Gemini</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gemini Comprehensive Study Guide Panel (shown in 'split' or 'ai' mode) */}
            {(layoutMode === 'split' || layoutMode === 'ai') && (
              <div
                className={`rounded-xl border flex flex-col ${
                  isDark ? 'bg-[#0E1524] border-[#1C273C]' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                {/* Header */}
                <div className="p-3.5 border-b border-slate-700/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400" />
                    <span className="text-xs font-bold text-inherit uppercase font-mono tracking-wider">
                      Gemini Comprehensive Study Guide
                    </span>
                  </div>
                  {currentAiNotes?.generatedAt && (
                    <span className="text-[10px] font-mono text-slate-400">
                      Generated: {currentAiNotes.generatedAt}
                    </span>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-4 space-y-5 max-h-[680px] overflow-y-auto">
                  {currentAiNotes ? (
                    <>
                      {/* Student Notes Synthesis Alert (if notes were incorporated) */}
                      {currentAiNotes.studentNotesSynthesis && (
                        <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs">
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-200 mb-1">
                            <CheckCircle2 size={13} />
                            <span>Synthesis of Student Notes</span>
                          </div>
                          <p className="leading-relaxed">{currentAiNotes.studentNotesSynthesis}</p>
                        </div>
                      )}

                      {/* Overview */}
                      <div>
                        <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                          Executive Academic Overview
                        </span>
                        <p className="text-xs text-inherit mt-1 leading-relaxed whitespace-pre-line">
                          {currentAiNotes.overview}
                        </p>
                      </div>

                      {/* Deep Dive Modules */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                          Conceptual Modules (No Formulas)
                        </span>

                        {currentAiNotes.deepDiveSections.map((sec, idx) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                              isDark ? 'bg-[#131A29] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <h4 className="font-semibold text-inherit text-xs flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[10px] flex items-center justify-center">
                                {idx + 1}
                              </span>
                              {sec.sectionTitle}
                            </h4>
                            <p className="text-slate-300 leading-relaxed text-[11px]">
                              {sec.explanation}
                            </p>

                            {/* Takeaways */}
                            {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                              <div className="pt-1">
                                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                                  Key Takeaways:
                                </span>
                                <ul className="mt-1 space-y-0.5">
                                  {sec.keyTakeaways.map((k, kIdx) => (
                                    <li
                                      key={kIdx}
                                      className="text-[11px] text-slate-300 flex items-start gap-1.5"
                                    >
                                      <span className="text-indigo-400 font-bold">•</span>
                                      <span>{k}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Practical Application */}
                            {sec.practicalExample && (
                              <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200">
                                <span className="font-semibold text-indigo-300">
                                  Authentic Application:{' '}
                                </span>
                                {sec.practicalExample}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* IB MYP 5 Criteria Focus */}
                      {currentAiNotes.criterionFocus && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                            IB MYP 5 Assessment Criteria
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div
                              className={`p-2.5 rounded-lg border ${
                                isDark ? 'bg-[#131A29] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                                Criterion A: Knowing
                              </div>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                {currentAiNotes.criterionFocus.criterionA}
                              </p>
                            </div>
                            <div
                              className={`p-2.5 rounded-lg border ${
                                isDark ? 'bg-[#131A29] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                                Criterion B: Inquiring
                              </div>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                {currentAiNotes.criterionFocus.criterionB}
                              </p>
                            </div>
                            <div
                              className={`p-2.5 rounded-lg border ${
                                isDark ? 'bg-[#131A29] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                                Criterion C: Processing
                              </div>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                {currentAiNotes.criterionFocus.criterionC}
                              </p>
                            </div>
                            <div
                              className={`p-2.5 rounded-lg border ${
                                isDark ? 'bg-[#131A29] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                                Criterion D: Real-Life
                              </div>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                {currentAiNotes.criterionFocus.criterionD}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Examiner Traps */}
                      {currentAiNotes.examinerPitfalls && currentAiNotes.examinerPitfalls.length > 0 && (
                        <div>
                          <span className="text-[10px] font-mono uppercase text-rose-400 font-bold tracking-wider">
                            Examiner Traps & Common Mark Losses
                          </span>
                          <div className="mt-1.5 space-y-1">
                            {currentAiNotes.examinerPitfalls.map((pit, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-start gap-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200 text-[11px]"
                              >
                                <span className="text-rose-400 font-bold shrink-0">⚠️</span>
                                <span>{pit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Real-World Applications */}
                      {currentAiNotes.realWorldApplications &&
                        currentAiNotes.realWorldApplications.length > 0 && (
                          <div>
                            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                              Real-World & Modern Industry Applications
                            </span>
                            <div className="mt-1.5 space-y-1">
                              {currentAiNotes.realWorldApplications.map((app, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="flex items-start gap-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-[11px]"
                                >
                                  <span className="text-indigo-400 font-bold shrink-0">🌍</span>
                                  <span>{app}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* High Yield Checklist */}
                      {currentAiNotes.highYieldChecklist &&
                        currentAiNotes.highYieldChecklist.length > 0 && (
                          <div>
                            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                              High-Yield Exam Mastery Checklist
                            </span>
                            <div className="mt-1.5 space-y-1">
                              {currentAiNotes.highYieldChecklist.map((item, cIdx) => (
                                <label
                                  key={cIdx}
                                  className={`flex items-start gap-2 p-2 rounded-lg border text-[11px] cursor-pointer hover:border-emerald-500/40 transition-colors ${
                                    isDark
                                      ? 'bg-[#131A29] border-[#1F2B3F] text-slate-300'
                                      : 'bg-slate-50 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    className="mt-0.5 rounded border-slate-600 text-emerald-500 focus:ring-0"
                                  />
                                  <span>{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                    </>
                  ) : (
                    <div className="p-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                        <Sparkles size={22} />
                      </div>
                      <h3 className="font-semibold text-sm text-inherit">
                        No AI Notes Generated Yet for this Unit
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Click the button below to have Gemini generate comprehensive, formula-free academic study notes tailored to this unit.
                      </p>
                      <button
                        onClick={handleGenerateWithGemini}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all"
                      >
                        <Sparkles size={14} className="text-amber-300" />
                        <span>Generate with Gemini</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesNotebookView;
