import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, Sliders, Zap } from 'lucide-react';

interface SimulationProps {
  simulationId: string;
  className?: string;
}

export const CanvasSimulation: React.FC<SimulationProps> = ({ simulationId, className = '' }) => {
  // Common state
  const [isPlaying, setIsPlaying] = useState(true);

  // Specific simulation parameters
  // 1. Quadratics
  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(-4);
  const [quadC, setQuadC] = useState(3);

  // 2. Trigonometry
  const [trigAngleDeg, setTrigAngleDeg] = useState(45);

  // 3. Harmonic Waves
  const [waveAmp, setWaveAmp] = useState(35);
  const [waveFreq, setWaveFreq] = useState(1.5);
  const [waveLength, setWaveLength] = useState(120);

  // 4. DC Circuits
  const [circuitV, setCircuitV] = useState(12);
  const [circuitR, setCircuitR] = useState(6);
  const [circuitInternalR, setCircuitInternalR] = useState(1);

  // 5. Kinematics
  const [kinV0, setKinV0] = useState(25);
  const [kinAngle, setKinAngle] = useState(45);
  const [kinGravity, setKinGravity] = useState(9.81);

  // 6. Bohr Orbitals
  const [bohrLevel, setBohrLevel] = useState(3);
  const [bohrTargetLevel, setBohrTargetLevel] = useState(1);

  // 7. Kinetics
  const [kineticsTemp, setKineticsTemp] = useState(300);
  const [kineticsEa, setKineticsEa] = useState(45);
  const [hasCatalyst, setHasCatalyst] = useState(false);

  // 8. Algebra Balance
  const [algA, setAlgA] = useState(2);
  const [algX, setAlgX] = useState(3);
  const [algB, setAlgB] = useState(4);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localIsPlaying = isPlaying;

    const render = () => {
      if (localIsPlaying) {
        timeRef.current += 0.03;
      }
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Dark editorial canvas background
      ctx.fillStyle = '#0F1523';
      ctx.fillRect(0, 0, w, h);

      // Render grid lines
      ctx.strokeStyle = '#1A2336';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Dispatch to specific simulation engine
      switch (simulationId) {
        case 'sim-quadratics':
          renderQuadratics(ctx, w, h, quadA, quadB, quadC);
          break;
        case 'sim-trigonometry':
          renderTrigonometry(ctx, w, h, trigAngleDeg);
          break;
        case 'sim-harmonic-waves':
          renderHarmonicWaves(ctx, w, h, waveAmp, waveFreq, waveLength, t);
          break;
        case 'sim-dc-circuits':
          renderDCCircuits(ctx, w, h, circuitV, circuitR, circuitInternalR, t);
          break;
        case 'sim-kinematics':
          renderKinematics(ctx, w, h, kinV0, kinAngle, kinGravity, t);
          break;
        case 'sim-bohr-orbitals':
          renderBohrOrbitals(ctx, w, h, bohrLevel, bohrTargetLevel, t);
          break;
        case 'sim-kinetics':
          renderKinetics(ctx, w, h, kineticsTemp, kineticsEa, hasCatalyst);
          break;
        case 'sim-algebra':
        default:
          renderAlgebra(ctx, w, h, algA, algX, algB);
          break;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [
    simulationId,
    isPlaying,
    quadA, quadB, quadC,
    trigAngleDeg,
    waveAmp, waveFreq, waveLength,
    circuitV, circuitR, circuitInternalR,
    kinV0, kinAngle, kinGravity,
    bohrLevel, bohrTargetLevel,
    kineticsTemp, kineticsEa, hasCatalyst,
    algA, algX, algB
  ]);

  // Reset helper
  const handleReset = () => {
    timeRef.current = 0;
    if (simulationId === 'sim-quadratics') { setQuadA(1); setQuadB(-4); setQuadC(3); }
    if (simulationId === 'sim-trigonometry') { setTrigAngleDeg(45); }
    if (simulationId === 'sim-harmonic-waves') { setWaveAmp(35); setWaveFreq(1.5); setWaveLength(120); }
    if (simulationId === 'sim-dc-circuits') { setCircuitV(12); setCircuitR(6); setCircuitInternalR(1); }
    if (simulationId === 'sim-kinematics') { setKinV0(25); setKinAngle(45); }
    if (simulationId === 'sim-kinetics') { setKineticsTemp(300); setKineticsEa(45); setHasCatalyst(false); }
    if (simulationId === 'sim-algebra') { setAlgA(2); setAlgX(3); setAlgB(4); }
  };

  return (
    <div className={`flex flex-col bg-[#111723] border border-[#1C2638] rounded-xl overflow-hidden shadow-lg ${className}`}>
      {/* Simulation Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141C2B] border-b border-[#1C2638]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4361EE] animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-slate-300">
            Interactive MYP Canvas · {getSimulationTitle(simulationId)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-slate-400 hover:text-white bg-[#182030] hover:bg-[#202B40] rounded border border-[#233047] transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white bg-[#182030] hover:bg-[#202B40] rounded border border-[#233047] transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] bg-[#0F1523] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="w-full h-full object-contain block"
        />
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 bg-[#111723] border-t border-[#1C2638] text-xs space-y-3">
        {renderControls(
          simulationId,
          {
            quadA, setQuadA, quadB, setQuadB, quadC, setQuadC,
            trigAngleDeg, setTrigAngleDeg,
            waveAmp, setWaveAmp, waveFreq, setWaveFreq, waveLength, setWaveLength,
            circuitV, setCircuitV, circuitR, setCircuitR, circuitInternalR, setCircuitInternalR,
            kinV0, setKinV0, kinAngle, setKinAngle, kinGravity, setKinGravity,
            bohrLevel, setBohrLevel, bohrTargetLevel, setBohrTargetLevel,
            kineticsTemp, setKineticsTemp, kineticsEa, setKineticsEa, hasCatalyst, setHasCatalyst,
            algA, setAlgA, algX, setAlgX, algB, setAlgB,
          }
        )}
      </div>
    </div>
  );
};

// Title helper
function getSimulationTitle(id: string): string {
  switch (id) {
    case 'sim-quadratics': return 'Parabola & Discriminant Grapher';
    case 'sim-trigonometry': return 'Unit Circle & Periodic Projections';
    case 'sim-harmonic-waves': return 'Transverse Wave Kinematics (v = fλ)';
    case 'sim-dc-circuits': return 'DC Circuit Ohm & Internal Resistance';
    case 'sim-kinematics': return '2D Projectile Trajectory Dynamics';
    case 'sim-bohr-orbitals': return 'Quantized Energy Levels & Photon Emission';
    case 'sim-kinetics': return 'Maxwell-Boltzmann Distribution & Ea Barrier';
    case 'sim-algebra': return 'Linear Balance Scale & Systems';
    default: return 'Scientific Simulator';
  }
}

// -------------------------------------------------------------
// INDIVIDUAL CANVAS RENDER FUNCTIONS (HTML5 Canvas 2D)
// -------------------------------------------------------------

// 1. QUADRATICS
function renderQuadratics(ctx: CanvasRenderingContext2D, w: number, h: number, a: number, b: number, c: number) {
  const originX = w / 2;
  const originY = h / 2 + 30;
  const scale = 22; // pixels per unit

  // Axes
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(20, originY);
  ctx.lineTo(w - 20, originY);
  ctx.moveTo(originX, 20);
  ctx.lineTo(originX, h - 20);
  ctx.stroke();

  // Vertex
  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;
  const disc = b * b - 4 * a * c;

  // Plot curve
  ctx.strokeStyle = '#4361EE';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let firstPoint = true;
  for (let px = 20; px <= w - 20; px += 2) {
    const x = (px - originX) / scale;
    const y = a * x * x + b * x + c;
    const py = originY - y * scale;

    if (py >= 10 && py <= h - 10) {
      if (firstPoint) {
        ctx.moveTo(px, py);
        firstPoint = false;
      } else {
        ctx.lineTo(px, py);
      }
    } else {
      firstPoint = true;
    }
  }
  ctx.stroke();

  // Mark vertex
  const pvx = originX + vx * scale;
  const pvy = originY - vy * scale;
  if (pvx >= 20 && pvx <= w - 20 && pvy >= 20 && pvy <= h - 20) {
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(pvx, pvy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '11px "JetBrains Mono"';
    ctx.fillText(`Vertex (${vx.toFixed(2)}, ${vy.toFixed(2)})`, pvx + 8, pvy - 8);
  }

  // Draw real roots if Δ >= 0
  if (disc >= 0) {
    const r1 = (-b - Math.sqrt(disc)) / (2 * a);
    const r2 = (-b + Math.sqrt(disc)) / (2 * a);
    [r1, r2].forEach(r => {
      const rx = originX + r * scale;
      if (rx >= 20 && rx <= w - 20) {
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(rx, originY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  // On-screen telemetry readout
  ctx.fillStyle = 'rgba(17, 23, 35, 0.88)';
  ctx.fillRect(16, 16, 260, 80);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(16, 16, 260, 80);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '12px "JetBrains Mono"';
  ctx.fillText(`f(x) = ${a}x² + ${b}x + ${c}`, 26, 36);
  ctx.fillStyle = disc > 0 ? '#10B981' : disc === 0 ? '#F59E0B' : '#EF4444';
  ctx.fillText(`Δ = b² - 4ac = ${disc.toFixed(1)}`, 26, 56);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText(disc > 0 ? '2 distinct real roots' : disc === 0 ? '1 repeated real root (tangent)' : 'No real roots', 26, 76);
}

// 2. TRIGONOMETRY
function renderTrigonometry(ctx: CanvasRenderingContext2D, w: number, h: number, angleDeg: number) {
  const originX = w / 2 - 40;
  const originY = h / 2;
  const radius = 120;
  const rad = (angleDeg * Math.PI) / 180;

  // Axes
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(originX - radius - 30, originY);
  ctx.lineTo(originX + radius + 40, originY);
  ctx.moveTo(originX, originY - radius - 30);
  ctx.lineTo(originX, originY + radius + 30);
  ctx.stroke();

  // Unit Circle
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(originX, originY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Radius vector
  const px = originX + radius * Math.cos(rad);
  const py = originY - radius * Math.sin(rad);

  // Projections: cos (horizontal) & sin (vertical)
  ctx.strokeStyle = '#10B981'; // cos (green)
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(px, originY);
  ctx.stroke();

  ctx.strokeStyle = '#EF4444'; // sin (red)
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(px, originY);
  ctx.lineTo(px, py);
  ctx.stroke();

  // Hypotenuse line
  ctx.strokeStyle = '#F8FAFC';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(px, py);
  ctx.stroke();

  // Point on circle
  ctx.fillStyle = '#4361EE';
  ctx.beginPath();
  ctx.arc(px, py, 6, 0, Math.PI * 2);
  ctx.fill();

  // Arc angle
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(originX, originY, 30, 0, -rad, true);
  ctx.stroke();

  // Values card
  ctx.fillStyle = 'rgba(17, 23, 35, 0.92)';
  ctx.fillRect(w - 200, 16, 184, 120);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(w - 200, 16, 184, 120);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '12px "JetBrains Mono"';
  ctx.fillText(`θ = ${angleDeg.toFixed(1)}° (${(rad / Math.PI).toFixed(2)}π rad)`, w - 188, 38);
  ctx.fillStyle = '#10B981';
  ctx.fillText(`cos θ = ${Math.cos(rad).toFixed(4)}`, w - 188, 62);
  ctx.fillStyle = '#EF4444';
  ctx.fillText(`sin θ = ${Math.sin(rad).toFixed(4)}`, w - 188, 86);
  ctx.fillStyle = '#F59E0B';
  const tanVal = Math.abs(Math.cos(rad)) < 0.001 ? 'undef' : Math.tan(rad).toFixed(4);
  ctx.fillText(`tan θ = ${tanVal}`, w - 188, 110);
}

// 3. HARMONIC WAVES
function renderHarmonicWaves(ctx: CanvasRenderingContext2D, w: number, h: number, A: number, f: number, lambda: number, t: number) {
  const originY = h / 2;
  const k = (2 * Math.PI) / lambda;
  const omega = 2 * Math.PI * f;
  const waveSpeed = f * (lambda / 10); // scale speed in m/s

  // Baseline axis
  ctx.strokeStyle = '#334155';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(20, originY);
  ctx.lineTo(w - 20, originY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Plot wave curve
  ctx.strokeStyle = '#4361EE';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 20; x <= w - 20; x += 2) {
    const y = originY - A * Math.sin(k * (x - 20) - omega * t);
    if (x === 20) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw discrete particle oscillator markers along wave
  for (let x = 60; x <= w - 60; x += 80) {
    const y = originY - A * Math.sin(k * (x - 20) - omega * t);
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Telemetry box
  ctx.fillStyle = 'rgba(17, 23, 35, 0.9)';
  ctx.fillRect(20, 20, 280, 75);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(20, 20, 280, 75);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '12px "JetBrains Mono"';
  ctx.fillText(`v = f · λ = ${(f * (lambda / 100)).toFixed(2)} m/s`, 32, 40);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText(`Amplitude: ${A} cm · Frequency: ${f} Hz · λ: ${lambda} cm`, 32, 60);
  ctx.fillText(`Period T = ${(1 / f).toFixed(2)} s`, 32, 78);
}

// 4. DC CIRCUITS
function renderDCCircuits(ctx: CanvasRenderingContext2D, w: number, h: number, V: number, R: number, r: number, t: number) {
  const totalR = R + r;
  const I = V / totalR;
  const Vterm = V - I * r;
  const Pload = I * I * R;

  // Circuit loop rectangle
  const cx = 80;
  const cy = 70;
  const cw = w - 160;
  const ch = h - 150;

  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 3;
  ctx.strokeRect(cx, cy, cw, ch);

  // Draw Battery on left side
  const batY = cy + ch / 2;
  ctx.fillStyle = '#0F1523';
  ctx.fillRect(cx - 15, batY - 30, 30, 60);

  // Long plate (+), short plate (-)
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 20, batY - 12);
  ctx.lineTo(cx + 20, batY - 12);
  ctx.stroke();

  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - 12, batY + 12);
  ctx.lineTo(cx + 12, batY + 12);
  ctx.stroke();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`EMF = ${V}V`, cx + 28, batY - 6);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`r = ${r}Ω`, cx + 28, batY + 14);

  // Draw Load Resistor on right side
  const resX = cx + cw;
  ctx.fillStyle = '#0F1523';
  ctx.fillRect(resX - 25, cy + ch / 2 - 25, 50, 50);
  ctx.fillStyle = '#10B981';
  ctx.fillRect(resX - 16, cy + ch / 2 - 20, 32, 40);
  ctx.strokeStyle = '#059669';
  ctx.strokeRect(resX - 16, cy + ch / 2 - 20, 32, 40);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`R = ${R}Ω`, resX - 60, cy + ch / 2 + 4);

  // Electron flow animation dots
  const perimeter = 2 * (cw + ch);
  const dotSpeed = I * 60;
  const offset = (t * dotSpeed) % perimeter;

  ctx.fillStyle = '#F59E0B';
  for (let i = 0; i < 16; i++) {
    const pos = (offset + (i * perimeter) / 16) % perimeter;
    let dx = cx, dy = cy;
    if (pos < cw) {
      dx = cx + pos;
      dy = cy;
    } else if (pos < cw + ch) {
      dx = cx + cw;
      dy = cy + (pos - cw);
    } else if (pos < 2 * cw + ch) {
      dx = cx + cw - (pos - (cw + ch));
      dy = cy + ch;
    } else {
      dx = cx;
      dy = cy + ch - (pos - (2 * cw + ch));
    }
    ctx.beginPath();
    ctx.arc(dx, dy, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Multimeter readouts at bottom
  ctx.fillStyle = 'rgba(17, 23, 35, 0.95)';
  ctx.fillRect(w / 2 - 160, h - 65, 320, 50);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(w / 2 - 160, h - 65, 320, 50);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`Current I: ${I.toFixed(2)} A`, w / 2 - 145, h - 45);
  ctx.fillText(`Terminal V: ${Vterm.toFixed(2)} V`, w / 2 - 145, h - 25);
  ctx.fillText(`Load Power: ${Pload.toFixed(1)} W`, w / 2 + 15, h - 45);
  ctx.fillText(`Internal Loss: ${(I * I * r).toFixed(1)} W`, w / 2 + 15, h - 25);
}

// 5. KINEMATICS
function renderKinematics(ctx: CanvasRenderingContext2D, w: number, h: number, v0: number, angleDeg: number, g: number, t: number) {
  const originX = 60;
  const originY = h - 60;
  const angleRad = (angleDeg * Math.PI) / 180;
  const v0x = v0 * Math.cos(angleRad);
  const v0y = v0 * Math.sin(angleRad);

  const tTotal = (2 * v0y) / g;
  const maxRange = (v0 * v0 * Math.sin(2 * angleRad)) / g;
  const maxHeight = (v0y * v0y) / (2 * g);

  // Ground plane
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, originY);
  ctx.lineTo(w - 20, originY);
  ctx.stroke();

  // Full trajectory trace
  ctx.strokeStyle = '#334155';
  ctx.setLineDash([3, 3]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const scale = 5; // meters to canvas pixels
  for (let curT = 0; curT <= tTotal; curT += 0.05) {
    const x = originX + v0x * curT * scale;
    const y = originY - (v0y * curT - 0.5 * g * curT * curT) * scale;
    if (curT === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Active moving projectile position
  const activeT = (t * 0.7) % (tTotal + 0.5);
  const boundedT = Math.min(activeT, tTotal);
  const projX = originX + v0x * boundedT * scale;
  const projY = originY - (v0y * boundedT - 0.5 * g * boundedT * boundedT) * scale;

  ctx.fillStyle = '#4361EE';
  ctx.beginPath();
  ctx.arc(projX, projY, 7, 0, Math.PI * 2);
  ctx.fill();

  // Velocity vector arrow
  const curVy = v0y - g * boundedT;
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(projX, projY);
  ctx.lineTo(projX + v0x * 1.5, projY - curVy * 1.5);
  ctx.stroke();

  // Telemetry box
  ctx.fillStyle = 'rgba(17, 23, 35, 0.9)';
  ctx.fillRect(w - 230, 20, 210, 85);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(w - 230, 20, 210, 85);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`v₀ = ${v0} m/s @ ${angleDeg}°`, w - 218, 40);
  ctx.fillText(`Max Height H: ${maxHeight.toFixed(2)} m`, w - 218, 58);
  ctx.fillText(`Total Range R: ${maxRange.toFixed(2)} m`, w - 218, 76);
  ctx.fillText(`Flight Time: ${tTotal.toFixed(2)} s`, w - 218, 94);
}

// 6. BOHR ORBITALS
function renderBohrOrbitals(ctx: CanvasRenderingContext2D, w: number, h: number, level: number, targetLevel: number, t: number) {
  const originX = w / 2 - 60;
  const originY = h / 2;
  const radii = [0, 30, 60, 95, 130, 165]; // for n=1..5

  // Nucleus
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(originX, originY, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '10px "JetBrains Mono"';
  ctx.fillText('+Z', originX - 6, originY + 4);

  // Concentric orbital shells
  radii.slice(1).forEach((r, idx) => {
    const n = idx + 1;
    ctx.strokeStyle = n === level ? '#4361EE' : '#233047';
    ctx.lineWidth = n === level ? 2 : 1;
    ctx.beginPath();
    ctx.arc(originX, originY, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#64748B';
    ctx.font = '10px "JetBrains Mono"';
    ctx.fillText(`n=${n}`, originX + r + 4, originY - 2);
  });

  // Orbiting electron
  const curRadius = radii[level] || radii[1];
  const theta = t * (4 / level);
  const ex = originX + curRadius * Math.cos(theta);
  const ey = originY + curRadius * Math.sin(theta);

  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(ex, ey, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Spectral transition photon calculation
  const deltaE_eV = Math.abs(13.6 * (1 / (targetLevel * targetLevel) - 1 / (level * level)));
  const wavelengthNm = deltaE_eV > 0 ? 1240 / deltaE_eV : 0;

  // Emission spectral line card
  ctx.fillStyle = 'rgba(17, 23, 35, 0.95)';
  ctx.fillRect(w - 180, 20, 160, 120);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(w - 180, 20, 160, 120);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`Transition: n=${level} → n=${targetLevel}`, w - 168, 42);
  ctx.fillText(`ΔE = ${deltaE_eV.toFixed(2)} eV`, w - 168, 64);
  ctx.fillText(`λ = ${wavelengthNm.toFixed(1)} nm`, w - 168, 86);

  // Spectral color bar
  const color = wavelengthNm > 380 && wavelengthNm < 750 ? `hsl(${Math.max(0, 300 - (wavelengthNm - 380) * 0.8)}, 100%, 50%)` : '#94A3B8';
  ctx.fillStyle = color;
  ctx.fillRect(w - 168, 100, 136, 18);
  ctx.fillStyle = '#000000';
  ctx.font = '9px "JetBrains Mono"';
  ctx.fillText(`${wavelengthNm.toFixed(0)} nm`, w - 120, 113);
}

// 7. KINETICS & MAXWELL-BOLTZMANN
function renderKinetics(ctx: CanvasRenderingContext2D, w: number, h: number, temp: number, ea: number, hasCat: boolean) {
  const originX = 50;
  const originY = h - 60;
  const effectiveEa = hasCat ? ea * 0.65 : ea;

  // Axes
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(originX, 30);
  ctx.lineTo(originX, originY);
  ctx.lineTo(w - 30, originY);
  ctx.stroke();

  // Labels
  ctx.fillStyle = '#94A3B8';
  ctx.font = '10px Inter, sans-serif';
  ctx.fillText('Kinetic Energy (E)', w - 110, originY + 20);
  ctx.save();
  ctx.translate(originX - 15, originY - 80);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Fraction of molecules', 0, 0);
  ctx.restore();

  // Maxwell-Boltzmann distribution curve: f(E) ~ sqrt(E) * exp(-E / kT)
  const beta = 150 / temp;
  const eaPx = originX + effectiveEa * 4.2;

  // Shaded area exceeding Ea
  ctx.fillStyle = 'rgba(67, 97, 238, 0.35)';
  ctx.beginPath();
  ctx.moveTo(eaPx, originY);
  for (let px = eaPx; px <= w - 30; px += 2) {
    const E = (px - originX) / 4.2;
    const yVal = Math.sqrt(E) * Math.exp(-E * beta * 0.05) * 16;
    ctx.lineTo(px, originY - yVal);
  }
  ctx.lineTo(w - 30, originY);
  ctx.closePath();
  ctx.fill();

  // Draw full curve
  ctx.strokeStyle = '#4361EE';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = originX; px <= w - 30; px += 2) {
    const E = (px - originX) / 4.2;
    const yVal = Math.sqrt(E) * Math.exp(-E * beta * 0.05) * 16;
    if (px === originX) ctx.moveTo(px, originY - yVal);
    else ctx.lineTo(px, originY - yVal);
  }
  ctx.stroke();

  // Draw Ea threshold line
  ctx.strokeStyle = hasCat ? '#10B981' : '#EF4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(eaPx, 40);
  ctx.lineTo(eaPx, originY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = hasCat ? '#10B981' : '#EF4444';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(hasCat ? `Ea (catalysed) = ${effectiveEa.toFixed(0)} kJ` : `Ea = ${effectiveEa.toFixed(0)} kJ`, eaPx - 30, 32);

  // Stats Card
  ctx.fillStyle = 'rgba(17, 23, 35, 0.9)';
  ctx.fillRect(w - 220, 35, 190, 75);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(w - 220, 35, 190, 75);

  const rateFactor = (Math.exp(-effectiveEa / (temp * 0.008314)) * 1e8).toFixed(1);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`Temp T = ${temp} K (${temp - 273}°C)`, w - 208, 55);
  ctx.fillText(`Ea barrier: ${effectiveEa.toFixed(1)} kJ/mol`, w - 208, 75);
  ctx.fillStyle = '#10B981';
  ctx.fillText(`Relative Rate: ~${rateFactor}x`, w - 208, 95);
}

// 8. ALGEBRA BALANCE
function renderAlgebra(ctx: CanvasRenderingContext2D, w: number, h: number, a: number, x: number, b: number) {
  const leftTotal = a * x + b;
  const rightTotal = leftTotal; // balanced
  const fulcrumX = w / 2;
  const fulcrumY = h - 90;
  const beamLength = 320;

  // Fulcrum triangle
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.moveTo(fulcrumX, fulcrumY);
  ctx.lineTo(fulcrumX - 25, fulcrumY + 50);
  ctx.lineTo(fulcrumX + 25, fulcrumY + 50);
  ctx.closePath();
  ctx.fill();

  // Balance beam
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(fulcrumX - beamLength / 2, fulcrumY);
  ctx.lineTo(fulcrumX + beamLength / 2, fulcrumY);
  ctx.stroke();

  // Left pan
  const panLeftX = fulcrumX - beamLength / 2;
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(panLeftX, fulcrumY);
  ctx.lineTo(panLeftX - 30, fulcrumY + 60);
  ctx.moveTo(panLeftX, fulcrumY);
  ctx.lineTo(panLeftX + 30, fulcrumY + 60);
  ctx.moveTo(panLeftX - 35, fulcrumY + 60);
  ctx.lineTo(panLeftX + 35, fulcrumY + 60);
  ctx.stroke();

  // Right pan
  const panRightX = fulcrumX + beamLength / 2;
  ctx.beginPath();
  ctx.moveTo(panRightX, fulcrumY);
  ctx.lineTo(panRightX - 30, fulcrumY + 60);
  ctx.moveTo(panRightX, fulcrumY);
  ctx.lineTo(panRightX + 30, fulcrumY + 60);
  ctx.moveTo(panRightX - 35, fulcrumY + 60);
  ctx.lineTo(panRightX + 35, fulcrumY + 60);
  ctx.stroke();

  // Weights on Left: a boxes of x + b single weights
  ctx.fillStyle = '#4361EE';
  ctx.fillRect(panLeftX - 25, fulcrumY + 38, 20, 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`${a}x`, panLeftX - 22, fulcrumY + 52);

  ctx.fillStyle = '#10B981';
  ctx.fillRect(panLeftX + 5, fulcrumY + 42, 16, 16);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`+${b}`, panLeftX + 7, fulcrumY + 54);

  // Weights on Right: constant total
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(panRightX - 20, fulcrumY + 38, 40, 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${rightTotal}`, panRightX - 8, fulcrumY + 53);

  // Algebraic equation readout
  ctx.fillStyle = 'rgba(17, 23, 35, 0.9)';
  ctx.fillRect(w / 2 - 160, 20, 320, 65);
  ctx.strokeStyle = '#233047';
  ctx.strokeRect(w / 2 - 160, 20, 320, 65);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '13px "JetBrains Mono"';
  ctx.fillText(`${a}x + ${b} = ${rightTotal}`, w / 2 - 60, 44);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '11px "JetBrains Mono"';
  ctx.fillText(`Solution: x = (${rightTotal} - ${b}) / ${a} = ${x}`, w / 2 - 95, 68);
}

// -------------------------------------------------------------
// INTERACTIVE CONTROLS BAR RENDERER
// -------------------------------------------------------------

function renderControls(id: string, s: any) {
  switch (id) {
    case 'sim-quadratics':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-slate-400 block mb-1">Parameter a: {s.quadA}</label>
            <input
              type="range" min="-3" max="3" step="0.5"
              value={s.quadA}
              onChange={(e) => s.setQuadA(parseFloat(e.target.value) || 0.1)}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Parameter b: {s.quadB}</label>
            <input
              type="range" min="-8" max="8" step="1"
              value={s.quadB}
              onChange={(e) => s.setQuadB(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Parameter c: {s.quadC}</label>
            <input
              type="range" min="-10" max="10" step="1"
              value={s.quadC}
              onChange={(e) => s.setQuadC(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
        </div>
      );

    case 'sim-trigonometry':
      return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="text-slate-400 block mb-1">Angle θ: {s.trigAngleDeg}° ({((s.trigAngleDeg * Math.PI) / 180).toFixed(2)} rad)</label>
            <input
              type="range" min="0" max="360" step="1"
              value={s.trigAngleDeg}
              onChange={(e) => s.setTrigAngleDeg(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div className="flex gap-2">
            {[0, 30, 45, 60, 90, 180].map((deg) => (
              <button
                key={deg}
                onClick={() => s.setTrigAngleDeg(deg)}
                className="px-2 py-1 bg-[#182030] hover:bg-[#202B40] text-slate-300 rounded border border-[#233047] text-[11px]"
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>
      );

    case 'sim-harmonic-waves':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-slate-400 block mb-1">Amplitude A: {s.waveAmp} cm</label>
            <input
              type="range" min="10" max="60" step="5"
              value={s.waveAmp}
              onChange={(e) => s.setWaveAmp(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Frequency f: {s.waveFreq} Hz</label>
            <input
              type="range" min="0.5" max="3" step="0.25"
              value={s.waveFreq}
              onChange={(e) => s.setWaveFreq(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Wavelength λ: {s.waveLength} cm</label>
            <input
              type="range" min="60" max="240" step="10"
              value={s.waveLength}
              onChange={(e) => s.setWaveLength(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
        </div>
      );

    case 'sim-dc-circuits':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-slate-400 block mb-1">Battery EMF: {s.circuitV} V</label>
            <input
              type="range" min="3" max="24" step="1"
              value={s.circuitV}
              onChange={(e) => s.setCircuitV(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Load Resistance R: {s.circuitR} Ω</label>
            <input
              type="range" min="1" max="20" step="0.5"
              value={s.circuitR}
              onChange={(e) => s.setCircuitR(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Internal r: {s.circuitInternalR} Ω</label>
            <input
              type="range" min="0.1" max="4" step="0.1"
              value={s.circuitInternalR}
              onChange={(e) => s.setCircuitInternalR(parseFloat(e.target.value))}
              className="w-full accent-[#4361EE]"
            />
          </div>
        </div>
      );

    case 'sim-kinetics':
      return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="text-slate-400 block mb-1">Temperature T: {s.kineticsTemp} K ({s.kineticsTemp - 273}°C)</label>
            <input
              type="range" min="273" max="450" step="5"
              value={s.kineticsTemp}
              onChange={(e) => s.setKineticsTemp(parseInt(e.target.value, 10))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="text-slate-400 block mb-1">Activation Energy Ea: {s.kineticsEa} kJ/mol</label>
            <input
              type="range" min="25" max="80" step="5"
              value={s.kineticsEa}
              onChange={(e) => s.setKineticsEa(parseInt(e.target.value, 10))}
              className="w-full accent-[#4361EE]"
            />
          </div>
          <div className="flex items-center pt-3">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200">
              <input
                type="checkbox"
                checked={s.hasCatalyst}
                onChange={(e) => s.setHasCatalyst(e.target.checked)}
                className="rounded accent-[#10B981] w-4 h-4"
              />
              <span className="font-medium text-emerald-400">Add Catalyst</span>
            </label>
          </div>
        </div>
      );

    case 'sim-bohr-orbitals':
      return (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Initial Level n:</span>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => s.setBohrLevel(lvl)}
                className={`w-7 h-7 rounded text-xs font-mono font-medium ${
                  s.bohrLevel === lvl ? 'bg-[#4361EE] text-white' : 'bg-[#182030] text-slate-300 border border-[#233047]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Transition To:</span>
            {[1, 2, 3].map((tgt) => (
              <button
                key={tgt}
                onClick={() => s.setBohrTargetLevel(tgt)}
                className={`w-7 h-7 rounded text-xs font-mono font-medium ${
                  s.bohrTargetLevel === tgt ? 'bg-emerald-600 text-white' : 'bg-[#182030] text-slate-300 border border-[#233047]'
                }`}
              >
                {tgt}
              </button>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="text-slate-400">
          Adjust parameters above to observe real-time scientific model changes.
        </div>
      );
  }
}
