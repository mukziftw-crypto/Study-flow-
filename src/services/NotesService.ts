import { ExtendedNotesData, StudentNote, SubjectId, Topic } from '../types';

export interface GenerateNotesParams {
  subjectId: SubjectId;
  subjectName: string;
  unitId: string;
  unitName: string;
  topicName?: string;
  coreTheory?: string[];
  misconceptions?: string[];
  studentInputNotes?: string;
  focusCriteria?: ('A' | 'B' | 'C' | 'D')[];
}

const STORAGE_KEY_STUDENT_NOTES = 'studyflow_student_notes';

class NotesServiceImpl {
  /**
   * Calls the server-side Gemini integration to generate comprehensive,
   * conceptually rigorous, formula-free academic study notes for a subject and unit.
   * If the student provided personal notes, Gemini synthesizes and integrates them.
   */
  async generateNotes(params: GenerateNotesParams): Promise<ExtendedNotesData> {
    try {
      const response = await fetch('/api/notes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjectId: params.subjectId,
          subjectName: params.subjectName,
          unitId: params.unitId,
          unitName: params.unitName,
          topicName: params.topicName || params.unitName,
          coreTheory: params.coreTheory || [],
          misconceptions: params.misconceptions || [],
          studentNotes: params.studentInputNotes || '',
          focusCriteria: params.focusCriteria || ['A', 'B', 'C', 'D'],
        }),
      });

      if (!response.ok) {
        // If /api/notes/generate is unavailable, fallback to /api/notes/expand
        return await this.fallbackExpand(params);
      }

      const result = await response.json();
      if (result.success && result.data) {
        return {
          ...result.data,
          source: params.studentInputNotes ? 'custom' : 'ai',
          generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      throw new Error(result.error || 'Invalid response from notes generation endpoint');
    } catch (err: any) {
      console.warn('Direct generate endpoint failed, attempting fallback expander:', err);
      return await this.fallbackExpand(params);
    }
  }

  /**
   * Fallback generation using the legacy expand endpoint
   */
  private async fallbackExpand(params: GenerateNotesParams): Promise<ExtendedNotesData> {
    const response = await fetch('/api/notes/expand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topicId: params.unitId,
        topicName: params.topicName || params.unitName,
        unitName: params.unitName,
        subjectId: params.subjectId,
        subjectName: params.subjectName,
        coreTheory: params.coreTheory || [],
        misconceptions: params.misconceptions || [],
      }),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.error || `Server responded with status ${response.status}`);
    }

    const resData = await response.json();
    if (resData.success && resData.data) {
      return {
        ...resData.data,
        source: 'ai',
        generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    throw new Error('Failed to obtain generated notes from server');
  }

  /**
   * Synthesize raw student notes into structured MYP academic notes
   */
  async synthesizeStudentNotes(params: {
    subjectName: string;
    unitName: string;
    rawNotes: string;
  }): Promise<ExtendedNotesData> {
    const response = await fetch('/api/notes/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectName: params.subjectName,
        unitName: params.unitName,
        rawNotes: params.rawNotes,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to synthesize custom notes');
    }

    const resData = await response.json();
    if (resData.success && resData.data) {
      return {
        ...resData.data,
        source: 'custom',
        generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    throw new Error('Failed to process custom notes');
  }

  /**
   * Retrieves all student personal notes from local persistence
   */
  getAllStudentNotes(): Record<string, StudentNote> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STUDENT_NOTES);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading student notes from localStorage:', e);
    }
    return {};
  }

  /**
   * Get student personal note for a specific unit
   */
  getStudentNote(unitId: string): StudentNote | null {
    const all = this.getAllStudentNotes();
    return all[unitId] || null;
  }

  /**
   * Save or update student personal notes for a unit
   */
  saveStudentNote(params: {
    unitId: string;
    unitName: string;
    subjectId: SubjectId;
    subjectName: string;
    content: string;
    tags?: string[];
    aiEnhanced?: boolean;
  }): StudentNote {
    const all = this.getAllStudentNotes();
    const existing = all[params.unitId];

    const noteRecord: StudentNote = {
      id: existing ? existing.id : `note-${params.unitId}-${Date.now()}`,
      unitId: params.unitId,
      unitName: params.unitName,
      subjectId: params.subjectId,
      subjectName: params.subjectName,
      content: params.content,
      tags: params.tags || existing?.tags || ['Study Note'],
      lastSaved: new Date().toISOString(),
      aiEnhanced: params.aiEnhanced ?? existing?.aiEnhanced ?? false,
    };

    all[params.unitId] = noteRecord;
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT_NOTES, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to write student notes to localStorage:', e);
    }

    return noteRecord;
  }

  /**
   * Delete student personal note for a unit
   */
  deleteStudentNote(unitId: string): boolean {
    const all = this.getAllStudentNotes();
    if (all[unitId]) {
      delete all[unitId];
      try {
        localStorage.setItem(STORAGE_KEY_STUDENT_NOTES, JSON.stringify(all));
      } catch (e) {
        console.error('Failed to write student notes to localStorage:', e);
      }
      return true;
    }
    return false;
  }

  /**
   * Search student notes by keyword
   */
  searchStudentNotes(query: string): StudentNote[] {
    const all = Object.values(this.getAllStudentNotes());
    if (!query.trim()) return all;
    const lower = query.toLowerCase();
    return all.filter(
      (n) =>
        n.unitName.toLowerCase().includes(lower) ||
        n.subjectName.toLowerCase().includes(lower) ||
        n.content.toLowerCase().includes(lower) ||
        n.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }

  /**
   * Format and export study sheet for a unit as Markdown
   */
  exportUnitMarkdown(
    unitName: string,
    subjectName: string,
    extended?: ExtendedNotesData,
    studentNote?: StudentNote | null
  ): string {
    let md = `# ${subjectName}: ${unitName}\n`;
    md += `*MYP 5 Comprehensive Conceptual Study Notes (Formula-Free Revision Guide)*\n\n`;

    if (studentNote && studentNote.content.trim()) {
      md += `## ✍️ Student's Personal Study Notes\n`;
      md += `*Last Updated: ${new Date(studentNote.lastSaved).toLocaleString()}*\n\n`;
      md += `${studentNote.content.trim()}\n\n`;
      if (studentNote.tags.length > 0) {
        md += `Tags: ${studentNote.tags.map((t) => `\`#${t}\``).join(' ')}\n\n`;
      }
      md += `---\n\n`;
    }

    if (extended) {
      md += `## 📖 Academic Conceptual Overview\n`;
      md += `${extended.overview}\n\n`;

      if (extended.studentNotesSynthesis) {
        md += `## 💡 Synthesis of Student Insights & IB Standards\n`;
        md += `${extended.studentNotesSynthesis}\n\n`;
      }

      md += `## 🔬 Deep Dive Conceptual Modules\n`;
      extended.deepDiveSections.forEach((sec, idx) => {
        md += `### ${idx + 1}. ${sec.sectionTitle}\n`;
        md += `${sec.explanation}\n\n`;
        md += `**Key Conceptual Takeaways:**\n`;
        sec.keyTakeaways.forEach((k) => (md += `- ${k}\n`));
        md += `\n**Practical / Real-World Application:**\n`;
        md += `${sec.practicalExample}\n\n`;
      });

      if (extended.criterionFocus) {
        md += `## 🎯 IB MYP 5 Criteria Expectations\n`;
        md += `- **Criterion A (Knowing & Understanding):** ${extended.criterionFocus.criterionA}\n`;
        md += `- **Criterion B (Inquiring & Designing):** ${extended.criterionFocus.criterionB}\n`;
        md += `- **Criterion C (Processing & Evaluating):** ${extended.criterionFocus.criterionC}\n`;
        md += `- **Criterion D (Reflecting on Science/Math Impacts):** ${extended.criterionFocus.criterionD}\n\n`;
      }

      if (extended.examinerPitfalls && extended.examinerPitfalls.length > 0) {
        md += `## ⚠️ Examiner Pitfalls & Common Student Traps\n`;
        extended.examinerPitfalls.forEach((pit) => (md += `• ${pit}\n`));
        md += `\n`;
      }

      if (extended.realWorldApplications && extended.realWorldApplications.length > 0) {
        md += `## 🌍 Authentic Real-World Applications\n`;
        extended.realWorldApplications.forEach((app) => (md += `• ${app}\n`));
        md += `\n`;
      }

      if (extended.highYieldChecklist && extended.highYieldChecklist.length > 0) {
        md += `## ✅ Exam Mastery Checklist\n`;
        extended.highYieldChecklist.forEach((item) => (md += `- [ ] ${item}\n`));
        md += `\n`;
      }
    }

    return md;
  }
}

export const NotesService = new NotesServiceImpl();
export default NotesService;
