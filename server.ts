import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization per SDK guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Resilient generator with fallback across valid models
async function generateWithFallback(params: {
  contents: string;
  config: any;
}) {
  try {
    return await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: params.contents,
      config: params.config,
    });
  } catch (err: any) {
    const isOverloaded = err?.message?.includes('503') || err?.message?.includes('high demand') || err?.status === 503;
    if (isOverloaded) {
      console.warn('gemini-3.8-flash busy, falling back to gemini-3.1-flash-lite');
      return await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: params.contents,
        config: params.config,
      });
    }
    throw err;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(apiKey) });
});

// Endpoint: Generate comprehensive study notes for a subject and unit (with optional student notes integration)
app.post('/api/notes/generate', async (req, res) => {
  try {
    const {
      subjectId,
      subjectName,
      unitId,
      unitName,
      topicName,
      coreTheory = [],
      misconceptions = [],
      studentNotes = '',
      focusCriteria = ['A', 'B', 'C', 'D'],
    } = req.body;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const systemPrompt = `You are a world-class International Baccalaureate (IB) Middle Years Programme (MYP 5) Academic Master and Lead Examiner for Mathematics and Sciences.
Your task is to generate comprehensive, highly accurate, authoritative, high-yield academic study notes for a specific subject and unit.

CRITICAL RULES:
1. STRICTLY NO MATHEMATICAL OR ALGEBRAIC EQUATIONS. Do NOT use formulas (no symbols like '=', 'y = mx + c', 'F = ma', 'v = u + at', etc.).
2. Express all quantitative, proportional, and physical laws QUALITATIVELY and CONCEPTUALLY (e.g., "rate of change of momentum is directly proportional to net external force", "doubling radius while maintaining constant volume diminishes surface-area-to-volume ratio", "gradient of a displacement-time curve represents instantaneous velocity").
3. Make the study notes exceptionally thorough, clear, and structured for IB MYP 5 eAssessment criteria (Criteria A, B, C, D).
4. If the student provided their own notes, evaluate and synthesize them: validate accurate student concepts, refine imprecise terms, and connect them seamlessly with IB examination standards.
5. Provide authentic real-world engineering/scientific applications, examiner pitfalls, and a high-yield checklist.`;

    let userPrompt = `Subject: ${subjectName || subjectId}
Unit: ${unitName} ${topicName && topicName !== unitName ? `(${topicName})` : ''}
Focus Criteria: ${focusCriteria.join(', ')}
`;

    if (coreTheory && coreTheory.length > 0) {
      userPrompt += `\nCurriculum Core Theory Points:\n${coreTheory.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}\n`;
    }

    if (misconceptions && misconceptions.length > 0) {
      userPrompt += `\nKnown Student Misconceptions to Address:\n${misconceptions.map((m: string) => `• ${m}`).join('\n')}\n`;
    }

    if (studentNotes && studentNotes.trim().length > 0) {
      userPrompt += `\nStudent's Input Notes to Integrate & Expand:\n"""\n${studentNotes.trim()}\n"""\n`;
    } else {
      userPrompt += `\nGenerate a complete master study guide for this unit from the ground up.\n`;
    }

    userPrompt += `\nGenerate comprehensive, deep study notes matching the JSON schema.`;

    const response = await generateWithFallback({
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.STRING,
              description: 'Comprehensive 2-3 paragraph academic overview of this subject and unit.',
            },
            studentNotesSynthesis: {
              type: Type.STRING,
              description: 'Synthesis highlighting how the student notes connect to IB expectations and key conceptual refinements (or null if no student notes provided).',
            },
            deepDiveSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionTitle: { type: Type.STRING },
                  explanation: {
                    type: Type.STRING,
                    description: 'Detailed conceptual explanation with zero mathematical formulas.',
                  },
                  keyTakeaways: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  practicalExample: {
                    type: Type.STRING,
                    description: 'Authentic laboratory or real-world application.',
                  },
                },
                required: ['sectionTitle', 'explanation', 'keyTakeaways', 'practicalExample'],
              },
            },
            criterionFocus: {
              type: Type.OBJECT,
              properties: {
                criterionA: { type: Type.STRING, description: 'Criterion A (Knowing & Understanding) theoretical foundations.' },
                criterionB: { type: Type.STRING, description: 'Criterion B (Inquiring & Designing) experimental parameters or pattern formulations.' },
                criterionC: { type: Type.STRING, description: 'Criterion C (Processing & Evaluating) data patterns, trends, and analytical reasoning.' },
                criterionD: { type: Type.STRING, description: 'Criterion D (Reflecting on the Impacts of Science/Math) ethical, environmental, and global contexts.' },
              },
              required: ['criterionA', 'criterionB', 'criterionC', 'criterionD'],
            },
            examinerPitfalls: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Common pitfalls that cost marks on IB MYP 5 assessments.',
            },
            realWorldApplications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Authentic modern industry, environmental, or medical applications.',
            },
            highYieldChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'High-yield mastery checklist points for exam readiness.',
            },
          },
          required: [
            'overview',
            'deepDiveSections',
            'criterionFocus',
            'examinerPitfalls',
            'realWorldApplications',
            'highYieldChecklist',
          ],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    res.json({
      success: true,
      unitId,
      unitName,
      subjectName,
      data: parsed,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error generating notes with Gemini:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate comprehensive notes with Gemini',
    });
  }
});

// Endpoint: Expand academic notes for a topic using Gemini
app.post('/api/notes/expand', async (req, res) => {
  try {
    const {
      topicId,
      topicName,
      unitName,
      subjectId,
      subjectName,
      coreTheory = [],
      misconceptions = [],
    } = req.body;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const systemPrompt = `You are a world-class International Baccalaureate (IB) Middle Years Programme (MYP 5) Academic Master and Lead Examiner for Mathematics and Sciences.
Your task is to expand basic syllabus outlines into comprehensive, highly accurate, rigorous, high-yield academic study notes.

CRITICAL RULES:
1. STRICTLY NO MATHEMATICAL OR ALGEBRAIC FORMULAS. Do NOT use equations (no symbols like '=', 'y = mx + b', 'F = ma', 'E = mc²', etc.).
2. Express all quantitative and physical relationships VERBALLY and CONCEPTUALLY (e.g., "acceleration is directly proportional to net resultant force and inversely proportional to inertial mass", "magnetic flux rate of change induces opposing voltage", "doubling time under constant acceleration quadruples displacement").
3. Make the notes rich, complete, accurate, academic, and tailored to MYP 5 eAssessment criteria (Criterion A: Knowing and understanding, Criterion B: Inquiring & designing / Investigating patterns, Criterion C: Processing & evaluating / Communicating, Criterion D: Reflecting on impacts / Real-life contexts).
4. Include authentic real-world examples, examiner warnings, and structured conceptual breakdowns.`;

    const userPrompt = `Subject: ${subjectName || subjectId}
Unit: ${unitName}
Topic: ${topicName}
Existing baseline points:
${coreTheory.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

Known misconceptions:
${misconceptions.map((m: string) => `• ${m}`).join('\n')}

Generate comprehensive, deeply detailed academic study notes for this unit following the JSON schema.`;

    const response = await generateWithFallback({
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.STRING,
              description: 'Comprehensive 2-3 paragraph academic overview of this unit.',
            },
            deepDiveSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionTitle: { type: Type.STRING },
                  explanation: {
                    type: Type.STRING,
                    description: 'Detailed conceptual explanation (no formulas).',
                  },
                  keyTakeaways: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  practicalExample: {
                    type: Type.STRING,
                    description: 'Real-world laboratory or engineering application.',
                  },
                },
                required: ['sectionTitle', 'explanation', 'keyTakeaways', 'practicalExample'],
              },
            },
            criterionFocus: {
              type: Type.OBJECT,
              properties: {
                criterionA: { type: Type.STRING, description: 'Definitions and theoretical expectations for Criterion A.' },
                criterionB: { type: Type.STRING, description: 'Experimental design variables, hypotheses, or pattern investigations.' },
                criterionC: { type: Type.STRING, description: 'Data processing, graphical gradients, uncertainties, or reasoning lines.' },
                criterionD: { type: Type.STRING, description: 'Real-world moral, environmental, social, or economic trade-offs.' },
              },
              required: ['criterionA', 'criterionB', 'criterionC', 'criterionD'],
            },
            examinerPitfalls: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Common pitfalls that cause students to lose marks in IB exams.',
            },
            realWorldApplications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Authentic modern industry, environmental, or medical applications.',
            },
            highYieldChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Essential mastery checklist points for exam readiness.',
            },
          },
          required: [
            'overview',
            'deepDiveSections',
            'criterionFocus',
            'examinerPitfalls',
            'realWorldApplications',
            'highYieldChecklist',
          ],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    res.json({
      success: true,
      topicId,
      unitName,
      data: parsed,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error expanding notes with Gemini:', error);
    res.status(500).json({
      error: error.message || 'Failed to expand notes with Gemini',
    });
  }
});

// Endpoint: Synthesize custom user-provided notes into MYP format
app.post('/api/notes/import', async (req, res) => {
  try {
    const { unitName, subjectName, rawNotes } = req.body;

    if (!rawNotes || rawNotes.trim().length === 0) {
      return res.status(400).json({ error: 'Raw notes cannot be empty' });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const systemPrompt = `You are an expert IB MYP 5 academic curriculum developer.
A student has provided raw personal class notes for an MYP 5 unit.
Convert and polish their raw notes into clean, structured, rigorous, highly accurate academic notes.
STRICT RULE: Eliminate any formulas or equations, converting them into clear conceptual relationship statements.`;

    const userPrompt = `Subject: ${subjectName}
Unit: ${unitName}
Student's Raw Notes:
"""
${rawNotes}
"""

Synthesize these notes into an organized academic structure matching the JSON schema.`;

    const response = await generateWithFallback({
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            deepDiveSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionTitle: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  keyTakeaways: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  practicalExample: { type: Type.STRING },
                },
                required: ['sectionTitle', 'explanation', 'keyTakeaways', 'practicalExample'],
              },
            },
            examinerPitfalls: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            realWorldApplications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            highYieldChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['overview', 'deepDiveSections', 'examinerPitfalls', 'realWorldApplications', 'highYieldChecklist'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error('Error importing notes:', error);
    res.status(500).json({
      error: error.message || 'Failed to synthesize notes',
    });
  }
});

// Setup Vite middleware for development or serve dist for production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server active on http://0.0.0.0:${PORT} [mode: ${isProduction ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
