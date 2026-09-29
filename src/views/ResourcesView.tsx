import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Compass, Lightbulb, CheckCircle2 } from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState<'physics' | 'chemistry' | 'math' | 'principles'>('physics');

  const physicsConcepts = [
    {
      name: "Newton's Second Law of Motion",
      relationship: 'Acceleration is directly proportional to net force and inversely proportional to object mass.',
      whenUsed: 'Analysing vehicle braking distances, rocket propulsion acceleration, and elevator tension dynamics.',
      example: 'Doubling the engine thrust on a satellite doubles its acceleration, whereas doubling its cargo mass halves it.',
      interpretation: 'Zero net force means constant velocity or rest; any non-zero net force guarantees acceleration in the direction of the force.',
    },
    {
      name: "Ohm's Relationship & Electrical Resistance",
      relationship: 'Current flowing through a conductor is directly proportional to potential difference across it when temperature remains constant.',
      whenUsed: 'Designing safe household circuits, choosing wire gauges, and preventing electrical overheating.',
      example: 'Increasing voltage across a fixed heating element increases current flow, producing greater thermal power output.',
      interpretation: 'Components with steep current-voltage gradients have lower resistance; ohmic conductors maintain linear responses.',
    },
    {
      name: 'Faraday-Lenz Law of Electromagnetic Induction',
      relationship: 'The magnitude of induced voltage is proportional to the rate of change of magnetic flux; the induced current opposes the change that caused it.',
      whenUsed: 'Wind turbine generators, bicycle dynamos, magnetic induction cooktops, and electrical power grid transformers.',
      example: 'Plunging a magnet rapidly into a wire coil creates a strong momentary surge of electric current that resists the entry of the magnet.',
      interpretation: 'Static magnetic fields produce zero electricity; only dynamic, changing fields generate usable voltage.',
    },
    {
      name: 'Conservation of Mechanical Energy',
      relationship: 'In an isolated system free from friction, the sum of kinetic energy and gravitational potential energy remains constant throughout motion.',
      whenUsed: 'Roller coaster track engineering, hydro-electric reservoir water drops, and pendulum clock oscillations.',
      example: 'At the apex of a trajectory, velocity drops to zero as all kinetic energy transforms into maximum gravitational potential energy.',
      interpretation: 'Energy cannot be generated from nothing; any gain in speed requires an equal drop in potential height or stored chemical energy.',
    },
    {
      name: 'Universal Wave Transmission Principle',
      relationship: 'Wave speed is determined by the properties of the medium; frequency and wavelength are inversely related for a given speed.',
      whenUsed: 'Acoustic ultrasound imaging, seismic earthquake early warning, and fiber-optic telecommunication transmissions.',
      example: 'Sound waves travel roughly four times faster through dense water than through air due to higher intermolecular elasticity.',
      interpretation: 'Higher pitch or frequency light waves possess shorter wavelengths, yet travel at identical speeds through vacuum.',
    },
  ];

  const chemConcepts = [
    {
      name: 'Collision Theory & Reaction Rates',
      relationship: 'For a chemical reaction to occur, reactant particles must collide with sufficient kinetic energy exceeding the activation threshold and correct geometric orientation.',
      whenUsed: 'Industrial chemical synthesis, food preservation via refrigeration, and automotive catalytic converters.',
      example: 'Increasing ambient temperature causes reactant particles to move faster and collide more frequently, with a larger fraction exceeding activation energy.',
      interpretation: 'Not all collisions result in reactions; catalysts accelerate rates by providing alternative pathways with lower activation energy.',
    },
    {
      name: "Le Chatelier's Dynamic Equilibrium Principle",
      relationship: 'When a chemical system at dynamic equilibrium is subjected to an external disturbance, the equilibrium position shifts to counteract that change.',
      whenUsed: 'Optimizing industrial Haber-Bosch ammonia production, carbonated beverage stability, and blood oxygenation equilibria.',
      example: 'Increasing total pressure on a gaseous mixture shifts the equilibrium toward whichever side possesses fewer moles of gas.',
      interpretation: 'Exothermic reactions shift toward reactants when heated, whereas endothermic reactions shift toward products.',
    },
    {
      name: 'The Mole Concept & Conservation of Mass',
      relationship: 'Matter is neither created nor destroyed during chemical changes; atomic ratios in balanced equations govern quantitative reactant-product conversions.',
      whenUsed: 'Pharmaceutical dosing formulation, manufacturing stoichiometry, and limiting reactant efficiency checks.',
      example: 'Burning hydrogen in oxygen consumes exactly two volumes of hydrogen for every one volume of oxygen to yield water vapor.',
      interpretation: 'Total mass of reactants always equals total mass of products in closed systems regardless of state transformations.',
    },
    {
      name: 'Electronegativity & Periodic Trend Gradient',
      relationship: 'Nuclear pull on bonding electron pairs increases across periods (left to right) and decreases down groups as electron shielding increases.',
      whenUsed: 'Predicting ionic versus covalent character, molecular polarity, solubility, and boiling point trends.',
      example: 'Fluorine strongly attracts electrons compared to sodium, leading to complete electron transfer and ionic salt formation.',
      interpretation: 'Atoms with large electronegativity disparities form polar or ionic lattices; equal sharing produces non-polar covalent bonds.',
    },
    {
      name: 'Acid-Base Neutralisation & pH Scale',
      relationship: 'Acidic solutions have high concentrations of hydrogen ions; bases neutralize acids by accepting protons to form neutral water and ionic salts.',
      whenUsed: 'Soil agriculture acidity treatment with lime, antacid medication design, and industrial effluent wastewater treatment.',
      example: 'Adding baking soda to vinegar neutralises acetic acid, generating harmless carbon dioxide bubbles, water, and sodium acetate.',
      interpretation: 'Each whole step on the pH scale represents a tenfold shift in hydrogen ion concentration (logarithmic scale).',
    },
  ];

  const mathConcepts = [
    {
      name: 'Quadratic Discriminant & Root Nature',
      relationship: 'The expression under the square root determines whether a parabolic curve crosses the horizontal axis twice, touches it at one tangent vertex, or never intersects it.',
      whenUsed: 'Trajectory clearance verification, bridge suspension arch feasibility, and profit break-even calculations.',
      example: 'A negative discriminant guarantees that a business profit parabola never drops below the horizontal axis, ensuring perpetual profit.',
      interpretation: 'Positive value indicates two distinct real intercepts; zero indicates a single touching vertex; negative indicates no real intercepts.',
    },
    {
      name: 'Periodic Harmonic Oscillation & Phase Shifts',
      relationship: 'Cyclical phenomena can be represented by sinusoidal wave functions where amplitude controls vertical range, period controls cycle time, and phase shifts adjust horizontal start times.',
      whenUsed: 'Ocean tidal forecasting, seasonal temperature modeling, lung respiration cycles, and alternating electrical current.',
      example: 'High tide occurring every 12.4 hours can be accurately modeled by adjusting the period parameter of a sine function.',
      interpretation: 'The midline represents the equilibrium average value, while amplitude represents maximum deviation above and below that average.',
    },
    {
      name: 'Simultaneous Linear Systems & Intersections',
      relationship: 'A pair of linear relationships with different gradients intersect at exactly one coordinate point representing the unique common solution.',
      whenUsed: 'Cost-revenue break-even analysis, traffic intersection timing, and mixture concentration blending.',
      example: 'Finding the exact production volume where total manufacturing costs equal total consumer revenue.',
      interpretation: 'Parallel lines with identical slopes have zero intersections (inconsistent); coincident lines have infinitely many solutions.',
    },
    {
      name: 'Bivariate Correlation & Best-Fit Line Predictive Power',
      relationship: 'Strong linear correlation allows reliable prediction within the measured range (interpolation), but predicting outside the range (extrapolation) carries significant uncertainty.',
      whenUsed: 'Scientific data interpretation in Criterion C, economic market forecasting, and medical clinical trial analysis.',
      example: 'Estimating plant growth at 22°C from experimental trials conducted between 15°C and 30°C.',
      interpretation: 'Correlation does not imply causation; underlying lurking variables must be evaluated before drawing conclusions.',
    },
    {
      name: 'Independent & Conditional Probability Trees',
      relationship: 'When events are independent, the outcome of the first has no influence on the second; when dependent, subsequent probabilities adjust accordingly.',
      whenUsed: 'Medical diagnostic test accuracy analysis, quality control defect sampling, and risk assessment.',
      example: 'Drawing playing cards without replacement reduces the total deck count, altering the odds of successive picks.',
      interpretation: 'The sum of all branches from a single node must always equal one (100% certainty).',
    },
  ];

  const scientificPrinciples = [
    {
      name: 'Standard Gravitational Field Strength on Earth',
      relationship: 'Every kilogram of mass at sea level experiences approximately 9.8 Newtons of downward gravitational pull.',
      whenUsed: 'Weight versus mass conversions, structural engineering load calculations, and free-fall projectile modeling.',
      interpretation: 'Mass is an inherent measure of matter that remains constant everywhere, whereas weight is a force that varies with gravitational strength.',
    },
    {
      name: 'Cosmic Speed of Light in Vacuum',
      relationship: 'The universal cosmic speed limit at which electromagnetic waves and causal signals propagate through empty space (~300,000 km/s).',
      whenUsed: 'Satellite communications delay calculations, GPS triangulation timing, and astronomical distance estimation.',
      interpretation: 'Light requires finite time to travel; observing distant galaxies means observing them as they existed millions of years in the past.',
    },
    {
      name: 'Avogadro Constant & The Macro-Micro Bridge',
      relationship: 'The exact count of constituent particles (~6.02 × 10²³) contained within one standard mole of any pure chemical substance.',
      whenUsed: 'Connecting atomic-scale particle interactions with measurable macroscopic masses in laboratory balances.',
      interpretation: 'Provides a direct conversion between microscopic atomic mass units and grams measured on laboratory scales.',
    },
    {
      name: 'Absolute Zero & Thermal Kinetic Energy',
      relationship: 'The fundamental theoretical lower bound of temperature (-273.15°C or 0 Kelvin) where all classical translational molecular motion ceases.',
      whenUsed: 'Cryogenic engineering, superconductivity research, and thermodynamic gas pressure modeling.',
      interpretation: 'Negative Kelvin temperatures cannot exist; thermal heat is fundamentally the kinetic vibrational energy of constituent atoms.',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-700/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Conceptual Guides
          </span>
          <span className="text-xs text-slate-400">· Official IB MYP 5 Principles</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-inherit mt-1">
          Conceptual Frameworks & Scientific Relationships
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive conceptual reference guide for MYP 5 examinations. Emphasizes underlying physical, chemical, and mathematical principles, their authentic applications, and how to interpret real-world results without formula sheets.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'physics', label: 'Physics Principles' },
          { id: 'chemistry', label: 'Chemistry Relationships' },
          { id: 'math', label: 'Mathematics Conceptual Models' },
          { id: 'principles', label: 'Universal Constants & Laws' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : isDark
                ? 'bg-[#141C2B] text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div
        className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-[#111723] border-[#1C2638]' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {activeCategory === 'physics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono uppercase text-slate-300">
                Core Physics Principles & Relationships
              </h3>
              <span className="text-xs text-slate-400 font-mono">5 Major Scientific Laws</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {physicsConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                    isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-indigo-400 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.relationship}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 leading-snug">
                      <strong className="text-slate-300 font-semibold block mb-0.5">When It Is Used:</strong>
                      {item.whenUsed}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/20 text-[11px] text-slate-400 space-y-1">
                    <div>
                      <strong className="text-emerald-400 font-medium">Example: </strong>
                      <span>{item.example}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300 font-medium">Interpretation: </strong>
                      <span>{item.interpretation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'chemistry' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono uppercase text-slate-300">
                Core Chemistry Principles & Equilibrium Dynamics
              </h3>
              <span className="text-xs text-slate-400 font-mono">5 Major Chemical Laws</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chemConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                    isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.relationship}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 leading-snug">
                      <strong className="text-slate-300 font-semibold block mb-0.5">When It Is Used:</strong>
                      {item.whenUsed}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/20 text-[11px] text-slate-400 space-y-1">
                    <div>
                      <strong className="text-emerald-400 font-medium">Example: </strong>
                      <span>{item.example}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300 font-medium">Interpretation: </strong>
                      <span>{item.interpretation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'math' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono uppercase text-slate-300">
                Mathematics Conceptual Relationships & Modelling
              </h3>
              <span className="text-xs text-slate-400 font-mono">5 Foundational Models</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mathConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                    isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-amber-400 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.relationship}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 leading-snug">
                      <strong className="text-slate-300 font-semibold block mb-0.5">When It Is Used:</strong>
                      {item.whenUsed}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/20 text-[11px] text-slate-400 space-y-1">
                    <div>
                      <strong className="text-indigo-400 font-medium">Example: </strong>
                      <span>{item.example}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300 font-medium">Interpretation: </strong>
                      <span>{item.interpretation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'principles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold font-mono uppercase text-slate-300">
                Universal Physical Constants & Foundational Limits
              </h3>
              <span className="text-xs text-slate-400 font-mono">Conceptual Understanding</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scientificPrinciples.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                    isDark ? 'bg-[#141C2B] border-[#1F2B3F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-cyan-400 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.relationship}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 leading-snug">
                      <strong className="text-slate-300 font-semibold block mb-0.5">Practical Scientific Context:</strong>
                      {item.whenUsed}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/20 text-[11px] text-slate-400">
                    <strong className="text-slate-300 font-medium">Interpretation: </strong>
                    <span>{item.interpretation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
