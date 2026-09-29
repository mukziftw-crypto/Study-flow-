import { SubjectSummary, Topic, Question, RevisionItem, CriterionStatus, MistakeRecord, MockTest } from '../types';

export const SUBJECTS: SubjectSummary[] = [
  {
    id: 'physics',
    name: 'Physics',
    shortName: 'Physics',
    code: 'SCI-PHYS',
    currentUnit: 'Unit 6: Electromagnetism & Magnetic Induction',
    progressPercentage: 68,
    weakestArea: 'Magnetic induction direction & Lenz law trade-offs (Criterion D)',
    nextRecommendedAction: 'Complete Criterion D reflection on transformer grid efficiency',
    recentPerformance: 'Criterion A: 7/8 · Criterion C: 6/8',
    predictedGrade: 6,
    totalQuestionsCompleted: 142,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'Chemistry',
    code: 'SCI-CHEM',
    currentUnit: 'Unit 5: Chemical Kinetics & Dynamic Equilibrium',
    progressPercentage: 54,
    weakestArea: 'Collision theory energy thresholds & catalyst mechanisms (Criterion B)',
    nextRecommendedAction: 'Analyse reaction rate temperature curves and variable control',
    recentPerformance: 'Criterion A: 6/8 · Criterion B: 5/8',
    predictedGrade: 5,
    totalQuestionsCompleted: 98,
  },
  {
    id: 'math-ext',
    name: 'Mathematics Extended',
    shortName: 'Math Extended',
    code: 'MATH-EXT',
    currentUnit: 'Unit 4: Periodic Sinusoidal Functions & Waves',
    progressPercentage: 79,
    weakestArea: 'Periodic sinusoidal modelling of tidal cycles (Criterion D)',
    nextRecommendedAction: 'Evaluate horizontal phase shifts against coastal harbor data',
    recentPerformance: 'Criterion A: 8/8 · Criterion D: 6/8',
    predictedGrade: 6,
    totalQuestionsCompleted: 215,
  },
  {
    id: 'math-std',
    name: 'Mathematics Standard',
    shortName: 'Math Standard',
    code: 'MATH-STD',
    currentUnit: 'Unit 3: Quadratic Relations & Coordinate Geometry',
    progressPercentage: 88,
    weakestArea: 'Simultaneous inequality boundary conditions (Criterion B)',
    nextRecommendedAction: 'Investigate vertex coordinates in real-world projectile paths',
    recentPerformance: 'Criterion A: 7/8 · Criterion B: 7/8',
    predictedGrade: 7,
    totalQuestionsCompleted: 184,
  },
];

export const CRITERIA_STATUS: CriterionStatus[] = [
  {
    key: 'A',
    title: 'Knowing and Understanding',
    scienceName: 'Scientific Concepts & Quantitative Analysis',
    mathName: 'Mathematical Procedures & Standard Problem Solving',
    status: 'strong',
    masteryPercentage: 86,
    recentScore: '7.2 / 8',
    summary: 'Consistently demonstrates deep recall of core principles, definitions, and multivariable deductions across both familiar and unfamiliar scenarios.',
  },
  {
    key: 'B',
    title: 'Investigating / Inquiring',
    scienceName: 'Inquiring and Designing Experimental Methods',
    mathName: 'Investigating Patterns & Deductive General Rules',
    status: 'developing',
    masteryPercentage: 64,
    recentScore: '5.1 / 8',
    summary: 'Strong pattern recognition; occasionally needs tighter justification of controlled laboratory variables and algebraic generality.',
  },
  {
    key: 'C',
    title: 'Communicating & Processing',
    scienceName: 'Processing Experimental Data & Evaluating Validity',
    mathName: 'Communicating Lines of Reasoning with Notation & Graphs',
    status: 'needs attention',
    masteryPercentage: 52,
    recentScore: '4.8 / 8',
    summary: 'Requires clearer distinction between systematic and random experimental errors, and more explicit annotation of graph axes and units.',
  },
  {
    key: 'D',
    title: 'Real-World Contexts & Impacts',
    scienceName: 'Reflecting on the Impacts of Science (Moral & Environmental)',
    mathName: 'Applying Mathematics in Authentic Real-Life Situations',
    status: 'developing',
    masteryPercentage: 68,
    recentScore: '5.8 / 8',
    summary: 'Good identification of authentic constraints; level 7–8 requires balanced trade-off evaluations and rigorous accuracy justification.',
  },
];

export const REVISION_QUEUE: RevisionItem[] = [
  {
    id: 'rev-1',
    subjectId: 'physics',
    topicId: 'phys-u6',
    topicName: 'Physics',
    subtopic: 'Electromagnetic Induction & Flux Changes',
    criterion: 'C',
    reason: 'Low Criterion C performance · Logged mistakes on calculating rates of magnetic flux change and explaining Lenz direction opposition.',
    urgency: 'high',
    mistakesCount: 3,
  },
  {
    id: 'rev-2',
    subjectId: 'chemistry',
    topicId: 'chem-u5',
    topicName: 'Chemistry',
    subtopic: 'Reaction Rates & Activation Energy Thresholds',
    criterion: 'B',
    reason: 'Recent score 4/8 · Incomplete justification of how temperature shifts particle kinetic energy distribution beyond the activation threshold.',
    urgency: 'high',
    mistakesCount: 2,
  },
  {
    id: 'rev-3',
    subjectId: 'math-ext',
    topicId: 'math-ext-u4',
    topicName: 'Mathematics Extended',
    subtopic: 'Periodic Sinusoidal Function Modelling',
    criterion: 'D',
    reason: 'Missed horizontal phase shift adjustments when fitting periodic trigonometric curves to tidal water level cycles.',
    urgency: 'medium',
    mistakesCount: 2,
  },
  {
    id: 'rev-4',
    subjectId: 'physics',
    topicId: 'phys-u7',
    topicName: 'Physics',
    subtopic: 'DC Electrical Circuits & Internal Resistance',
    criterion: 'A',
    reason: 'Confusion between the terminal voltage available across external circuit components and the electromotive force lost across internal battery resistance.',
    urgency: 'medium',
    mistakesCount: 1,
  },
  {
    id: 'rev-5',
    subjectId: 'chemistry',
    topicId: 'chem-u1',
    topicName: 'Chemistry',
    subtopic: 'Atomic Structure & Electron Energy Transitions',
    criterion: 'A',
    reason: 'Unit conversion error between electron-volts and joules when evaluating photon emissions from atomic electron energy level drops.',
    urgency: 'low',
    mistakesCount: 1,
  },
];

export const TOPICS: Topic[] = [
  // =========================================================================
  // 1. PHYSICS (8 COMPREHENSIVE UNITS)
  // =========================================================================
  {
    id: 'phys-u1',
    subjectId: 'physics',
    name: 'Kinematics & One-Dimensional Motion',
    unit: 'Unit 1: Kinematics & Motion',
    description: 'Displacement, velocity, uniform acceleration, and interpretation of motion graphs.',
    simulationId: 'sim-harmonic-waves',
    strands: ['Criterion A: Describing linear motion', 'Criterion C: Motion data transformation', 'Criterion D: Highway speed braking physics'],
    coreTheory: [
      'Displacement is a vector quantity measuring overall change in position with direction, distinct from total scalar distance traveled.',
      'Uniform acceleration means that velocity changes by an equal amount in every equal interval of time.',
      'On a position-time graph, the gradient represents instantaneous velocity; on a velocity-time graph, the gradient represents acceleration, and the area under the curve represents total displacement.',
      'Air resistance opposes projectile motion and increases with the square of speed, leading to a terminal velocity where downward gravity equals upward drag.',
    ],
    equations: [
      {
        name: 'Velocity-Acceleration Relationship',
        meaning: 'Final velocity equals initial velocity plus the change in velocity produced by acceleration acting over time.',
        application: 'Calculating stopping distances of autonomous vehicles when brakes apply steady deceleration.',
        notes: 'If acceleration opposes velocity, the object decelerates until velocity momentarily reaches zero before reversing direction.',
      },
      {
        name: 'Displacement Under Constant Acceleration',
        meaning: 'Displacement equals initial velocity multiplied by time plus half the acceleration multiplied by time squared.',
        application: 'Determining runway length needed for aircraft to attain takeoff speed safely.',
        notes: 'The quadratic dependence on time means doubling acceleration time quadruples the distance covered from rest.',
      },
    ],
    misconceptions: [
      'Confusing speed with velocity: velocity must include direction; an object moving in a circle at constant speed is still accelerating.',
      'Believing acceleration must be zero at the highest point of a vertical throw: acceleration remains constant at Earth gravitational pull throughout.',
    ],
    commandTermGuidance: [
      { term: 'Describe', advice: 'State the observable motion characteristics without needing underlying dynamic causes.', mypExpectation: 'State direction, constant velocity or acceleration phases.' },
      { term: 'Calculate', advice: 'Show substituted values with consistent SI units.', mypExpectation: 'Use meters per second and seconds consistently.' },
    ],
    extendedNotes: {
      overview: 'Kinematics is the foundational branch of classical mechanics dealing with the qualitative and descriptive analysis of motion without reference to the forces producing it. In the IB MYP 5 framework, emphasis is placed on recognizing motion as relative to specified frames of reference, differentiating scalar distances from vector displacements, and translating motion descriptions across qualitative narratives, graphical slopes, and spatial areas.\n\nStudents must master the physical meaning behind slope rates and integrated areas on position-time and velocity-time curves, understanding that constant acceleration signifies uniform linear velocity shifts across equal temporal increments.',
      deepDiveSections: [
        {
          sectionTitle: 'Scalar vs. Vector Foundations & Spatial Trajectories',
          explanation: 'Distance tracks the complete cumulative length of the actual path traversed by an object, regardless of changes in heading or curvature. Displacement, in contrast, is strictly defined as the net change in spatial position: the shortest directed line segment connecting the point of departure to the final terminus. In closed orbital or circular trajectories, total scalar distance can be immense while net vector displacement is precisely zero.',
          keyTakeaways: [
            'Scalars possess only magnitude and standard measurement units.',
            'Vectors require magnitude, units, and unambiguous spatial direction.',
            'Displacement can be positive, negative, or zero depending on chosen coordinate axes.'
          ],
          practicalExample: 'Monitoring autonomous subterranean warehouse rovers returning to their inductive charging bays: distance traveled dictates battery wear, while net displacement remains zero.'
        },
        {
          sectionTitle: 'Differential Rates of Motion: Velocity and Acceleration',
          explanation: 'Velocity represents the time rate of change of displacement. When velocity is constant, displacement accumulates uniformly with elapsed time. Acceleration arises whenever the velocity vector undergoes modification, which can occur through speed increase, speed decrease, or directional deflection without changing scalar speed. In straight-line uniform deceleration, the acceleration vector points in the diametrically opposite direction to the instantaneous velocity vector.',
          keyTakeaways: [
            'Uniform acceleration entails equal velocity increments across equal temporal intervals.',
            'Deceleration is physically identical to acceleration acting counter to the current direction of travel.',
            'Zero instantaneous velocity does not imply zero acceleration (e.g. at the apex of vertical free-fall).'
          ],
          practicalExample: 'Electromagnetic aircraft carrier catapult launch systems providing uniform forward acceleration to jet fighters over limited runway lengths.'
        }
      ],
      criterionFocus: {
        criterionA: 'Define scalar and vector quantities with scientific precision. Explain how constant acceleration affects displacement over quadratic intervals without reciting algebraic formulas.',
        criterionB: 'Design a valid investigation into the factors influencing the terminal velocity of falling objects through viscous fluids, identifying independent liquid viscosities, dependent fall times, and controlling drop heights and projectile cross-sectional areas.',
        criterionC: 'Interpret gradients of position-time graphs as instantaneous velocity and gradients of velocity-time graphs as acceleration. Identify experimental error margins in photogate timer data.',
        criterionD: 'Reflect upon the ethical, environmental, and public safety implications of implementing autonomous variable-speed highway braking corridors in high-density urban transit networks.'
      },
      examinerPitfalls: [
        'Neglecting to state the spatial direction when providing final velocity or displacement responses.',
        'Confusing the slope of a position-time graph with the slope of a velocity-time graph.',
        'Assuming that acceleration must equal zero when a vertically thrown projectile momentarily reaches its apex.',
        'Treating deceleration as an independent physical entity rather than negative directional acceleration.'
      ],
      realWorldApplications: [
        'Autonomous vehicle emergency braking systems using optical radar to determine time-to-collision.',
        'Aero-acoustic projectile tracking for bullet and missile trajectory interception in aerospace defence.',
        'High-speed maglev train braking zone design balancing passenger deceleration comfort against stopping distance.'
      ],
      highYieldChecklist: [
        'Distinguish between scalar path distance and vector displacement relative to an origin.',
        'Explain why circular motion at constant speed constitutes continuous acceleration.',
        'Interpret the area enclosed under a velocity-time curve as cumulative displacement.',
        'Analyze how air resistance causes acceleration to diminish toward terminal velocity.'
      ],
      source: 'curriculum',
      generatedAt: 'Standard MYP 5 Notes'
    },
  },
  {
    id: 'phys-u2',
    subjectId: 'physics',
    name: 'Dynamics, Forces & Newton’s Laws',
    unit: 'Unit 2: Dynamics & Newton’s Laws',
    description: 'Inertia, resultant force, action-reaction pairs, and friction equilibrium.',
    strands: ['Criterion A: Newton’s principles', 'Criterion B: Friction investigations', 'Criterion D: Automotive safety crumple zones'],
    coreTheory: [
      'Newton’s First Law (Law of Inertia) states that an object maintains constant velocity unless acted upon by a non-zero net external resultant force.',
      'Newton’s Second Law connects dynamics to kinematics: net force causes acceleration inversely proportional to the inertial mass of the body.',
      'Newton’s Third Law dictates that forces always occur in equal and opposite interaction pairs acting on two distinct bodies.',
      'Frictional forces resist relative motion between contacting surfaces and convert mechanical kinetic energy into dissipated thermal energy.',
    ],
    equations: [
      {
        name: 'Newton’s Second Law Relationship',
        meaning: 'Acceleration is directly proportional to net resultant force and inversely proportional to inertial mass.',
        application: 'Sizing rocket thrusters to achieve escape velocity when carrying heavy payload stages.',
        notes: 'When net force is zero, the system is in translational equilibrium and moves at constant velocity.',
      },
    ],
    misconceptions: [
      'Believing a constant force is required to keep an object moving in a straight line: only friction requires continuous forward propulsion.',
      'Confusing action-reaction pairs with balanced forces: action and reaction act on two completely different objects, so they never cancel each other.',
    ],
    commandTermGuidance: [
      { term: 'Explain', advice: 'Link the resultant force directly to the observed acceleration change.', mypExpectation: 'Reference Newton’s Second Law.' },
    ],
  },
  {
    id: 'phys-u3',
    subjectId: 'physics',
    name: 'Work, Mechanical Energy & Power',
    unit: 'Unit 3: Work, Energy & Power',
    description: 'Work done by forces, conservation of mechanical energy, and power efficiency.',
    strands: ['Criterion A: Energy transfers', 'Criterion C: Efficiency evaluations', 'Criterion D: Hydroelectric plant trade-offs'],
    coreTheory: [
      'Work is done only when an applied force causes displacement in the direction of the force.',
      'The Principle of Conservation of Energy dictates that energy cannot be created or destroyed, only transformed between kinetic, potential, and thermal forms.',
      'Gravitational potential energy depends on mass, gravitational field strength, and vertical elevation change above a reference datum.',
      'Power measures the rate of energy transfer or work performed per second, with efficiency measuring useful output divided by total input energy.',
    ],
    equations: [
      {
        name: 'Work-Energy Principle',
        meaning: 'Work done on an object by a net force equals the net change in its kinetic energy.',
        application: 'Calculating how much braking energy must be converted to heat to halt an express passenger train.',
        notes: 'If force is perpendicular to motion (such as centripetal force), zero mechanical work is done.',
      },
    ],
    misconceptions: [
      'Assuming carrying a heavy box horizontally at constant speed does work on the box: vertical gravity is perpendicular to horizontal displacement.',
      'Believing energy is "consumed" in engines: energy is simply degraded into non-recoverable dispersed heat.',
    ],
    commandTermGuidance: [
      { term: 'Evaluate', advice: 'Compare theoretical energy inputs with actual measured output to account for dissipated losses.', mypExpectation: 'Discuss friction and acoustic losses.' },
    ],
  },
  {
    id: 'phys-u4',
    subjectId: 'physics',
    name: 'Thermal Physics & States of Matter',
    unit: 'Unit 4: Thermal Physics & Heat Transfer',
    description: 'Conduction, convection, radiation, specific heat capacity, and phase transitions.',
    strands: ['Criterion A: Thermal equilibrium', 'Criterion B: Calorimetry design', 'Criterion C: Heating curve analysis'],
    coreTheory: [
      'Temperature is a direct measure of the average translational kinetic energy of constituent particles in a substance.',
      'Heat flows spontaneously from regions of higher temperature to regions of lower temperature until thermal equilibrium is established.',
      'Specific heat capacity defines the quantity of thermal energy needed to raise the temperature of one kilogram of a material by one degree Celsius.',
      'During phase changes (melting or boiling), temperature remains completely constant while latent heat breaks intermolecular bonds.',
    ],
    equations: [
      {
        name: 'Thermal Energy Absorption Relationship',
        meaning: 'Heat absorbed or released is proportional to mass, specific heat capacity, and temperature change.',
        application: 'Sizing solar hot water heating panels and evaluating building insulation thermal mass.',
        notes: 'Substances with high heat capacities (like water) absorb large amounts of heat with minimal temperature swings.',
      },
    ],
    misconceptions: [
      'Confusing temperature with thermal heat energy: a giant iceberg at zero degrees contains vastly more internal thermal energy than a boiling cup of tea.',
      'Believing temperature rises during boiling: temperature stays fixed at boiling point until all liquid vaporizes.',
    ],
    commandTermGuidance: [
      { term: 'Describe', advice: 'Detail molecular motion changes during temperature increases and state transitions.', mypExpectation: 'Reference kinetic energy vs bond breaking.' },
    ],
  },
  {
    id: 'phys-u5',
    subjectId: 'physics',
    name: 'Wave Phenomena, Sound & Light Optics',
    unit: 'Unit 5: Wave Phenomena & Optics',
    description: 'Transverse and longitudinal waves, Doppler effect, reflection, refraction, and Snell’s law.',
    simulationId: 'sim-harmonic-waves',
    strands: ['Criterion A: Wave properties', 'Criterion B: Refraction index lab', 'Criterion D: Medical ultrasound imaging'],
    coreTheory: [
      'Waves transfer energy and momentum through a medium or vacuum without transporting bulk matter.',
      'Transverse waves oscillate perpendicular to the direction of energy propagation, whereas longitudinal waves oscillate parallel (compressions and rarefactions).',
      'Wave speed is entirely governed by the physical density and elasticity of the transmitting medium.',
      'Refraction occurs when a wave crosses an optical boundary at an angle, changing speed and bending toward or away from the normal.',
    ],
    equations: [
      {
        name: 'Universal Wave Relationship',
        meaning: 'Wave propagation speed equals the product of oscillation frequency and spatial wavelength.',
        application: 'Calibrating radio communication transmitters and fiber-optic broadband light pulses.',
        notes: 'When entering a denser medium, wave frequency remains constant while wavelength and speed decrease together.',
      },
    ],
    misconceptions: [
      'Assuming sound waves can travel through a vacuum: sound requires a mechanical particle medium to transmit compressions.',
      'Believing light changes frequency upon entering water: only wavelength and velocity change; frequency remains identical.',
    ],
    commandTermGuidance: [
      { term: 'Justify', advice: 'Explain optical bending using wave slowing in optically denser media.', mypExpectation: 'Use wavefront deceleration principles.' },
    ],
  },
  {
    id: 'phys-u6',
    subjectId: 'physics',
    name: 'Electromagnetism & Magnetic Induction',
    unit: 'Unit 6: Electromagnetism & Magnetic Induction',
    description: 'Magnetic fields around currents, Faraday’s law of induced voltage, Lenz’s law, and transformers.',
    strands: ['Criterion A: Electromagnetic principles', 'Criterion C: Induced EMF data curves', 'Criterion D: Transformer electrical grid benefits'],
    coreTheory: [
      'Moving electric charges generate surrounding magnetic fields with concentric cylindrical geometry.',
      'Faraday’s Law establishes that a changing magnetic flux through a conductor induces an electromotive force proportional to the rate of change.',
      'Lenz’s Law embodies energy conservation: induced currents always flow in a direction whose own magnetic field opposes the change in flux that created them.',
      'Electrical transformers transfer alternating current energy between circuits through mutual magnetic induction, trading voltage for current.',
    ],
    equations: [
      {
        name: 'Faraday-Lenz Induction Principle',
        meaning: 'Induced voltage magnitude is proportional to the number of turns and the rate at which magnetic flux changes with time.',
        application: 'Hydroelectric turbine generators and magnetic induction cooktop heating.',
        notes: 'Static, stationary magnetic fields produce zero induced voltage regardless of their magnetic strength.',
      },
    ],
    misconceptions: [
      'Believing a strong static magnetic field induces voltage: only a changing field or moving coil produces electrical current.',
      'Thinking step-up transformers create extra power: voltage increases while current decreases proportionally to conserve total power.',
    ],
    commandTermGuidance: [
      { term: 'Explain', advice: 'Connect magnetic flux rate of change to the induced voltage output.', mypExpectation: 'Explicitly cite the Faraday-Lenz law.' },
    ],
  },
  {
    id: 'phys-u7',
    subjectId: 'physics',
    name: 'Direct Current Circuits & Resistance',
    unit: 'Unit 7: Electric Circuits & Resistance',
    description: 'Electric current, potential difference, Ohm’s law, series/parallel networks, and internal resistance.',
    strands: ['Criterion A: Circuit network laws', 'Criterion B: Resistor network lab design', 'Criterion C: Resistance curve evaluations'],
    coreTheory: [
      'Electric current is the continuous rate of flow of charge carriers through an electrical cross-section.',
      'Potential difference represents the electrical energy transferred per unit charge across circuit elements.',
      'Ohm’s law states that current is directly proportional to voltage across ohmic conductors at constant temperature.',
      'Chemical power sources possess internal resistance that causes terminal voltage to drop below open-circuit electromotive force under heavy load.',
    ],
    equations: [
      {
        name: 'Ohm’s Electrical Relationship',
        meaning: 'Potential difference across a conductor equals electric current multiplied by resistance.',
        application: 'Selecting current-limiting resistors to protect delicate light-emitting diodes from overcurrent.',
        notes: 'In parallel branches, potential difference is identical across all paths while total current divides among branches.',
      },
    ],
    misconceptions: [
      'Believing batteries supply electric charges: the mobile electrons already exist throughout the wires; batteries provide the potential difference to push them.',
      'Thinking current is "used up" as it travels through resistors: current leaving a resistor is identical to current entering it.',
    ],
    commandTermGuidance: [
      { term: 'Determine', advice: 'Use network rules to calculate branch voltages and currents step-by-step.', mypExpectation: 'Show Kirchhoff loop and junction reasoning.' },
    ],
  },
  {
    id: 'phys-u8',
    subjectId: 'physics',
    name: 'Nuclear Physics, Radioactivity & Astrophysics',
    unit: 'Unit 8: Nuclear Physics & Astrophysics',
    description: 'Alpha, beta, and gamma radiation, nuclear fission vs fusion, half-life decay, and stellar life cycles.',
    strands: ['Criterion A: Radioactive decay modes', 'Criterion C: Half-life decay curve fitting', 'Criterion D: Nuclear energy environmental debate'],
    coreTheory: [
      'Unstable atomic nuclei undergo spontaneous radioactive decay by emitting alpha particles (helium nuclei), beta particles (high-speed electrons), or gamma rays (photons).',
      'The radioactive half-life is the characteristic time required for half of the unstable nuclei in a sample to decay.',
      'Nuclear fission splits heavy nuclei (such as uranium) to release millions of times more energy per reaction than chemical oxidation.',
      'Stars generate radiant energy through gravitational confinement and core hydrogen nuclear fusion, ending as white dwarfs, neutron stars, or black holes.',
    ],
    equations: [
      {
        name: 'Radioactive Half-Life Principle',
        meaning: 'After each successive half-life period, the remaining fraction of undecayed parent isotope is halved.',
        application: 'Radiocarbon dating of archaeological artifacts and medical radiotherapy isotope calibration.',
        notes: 'Radioactive decay is fundamentally stochastic; individual decay events cannot be predicted, only statistical decay of large populations.',
      },
    ],
    misconceptions: [
      'Assuming irradiated food becomes radioactive: radiation passes through without leaving behind radioactive isotopes.',
      'Believing half-life decreases when a sample is heated: nuclear decay rates are entirely independent of chemical temperature or pressure.',
    ],
    commandTermGuidance: [
      { term: 'Discuss', advice: 'Provide balanced analysis of nuclear power greenhouse benefits versus radioactive waste disposal risks.', mypExpectation: 'Address economic, environmental, and ethical facets.' },
    ],
  },

  // =========================================================================
  // 2. CHEMISTRY (8 COMPREHENSIVE UNITS)
  // =========================================================================
  {
    id: 'chem-u1',
    subjectId: 'chemistry',
    name: 'Atomic Structure, Isotopes & Electron Configurations',
    unit: 'Unit 1: Atomic Structure & Isotopes',
    description: 'Protons, neutrons, electrons, isotopes, relative atomic mass, and Bohr energy levels.',
    strands: ['Criterion A: Subatomic architecture', 'Criterion C: Mass spectrometer data', 'Criterion D: Radioisotope medical tracers'],
    coreTheory: [
      'Atoms consist of a dense, positively charged nucleus of protons and neutrons surrounded by electrons in discrete quantized energy levels.',
      'Isotopes are atoms of the same chemical element with identical proton counts but different numbers of neutrons, resulting in different atomic masses.',
      'Electrons occupy shells according to energy hierarchies, with valence electrons dictating the chemical reactivity and bonding capacity.',
      'When electrons absorb energy, they jump to excited higher levels; returning to ground state emits photons with wavelengths corresponding to discrete spectral lines.',
    ],
    equations: [
      {
        name: 'Relative Atomic Mass Weighted Principle',
        meaning: 'Average atomic mass is the abundance-weighted average of all naturally occurring isotopic masses.',
        application: 'Accurate stoichiometric calculations in chemical manufacturing and pharmacology.',
        notes: 'Accounts for fractional atomic masses on the periodic table (e.g. chlorine at 35.45 amu due to chlorine-35 and chlorine-37).',
      },
    ],
    misconceptions: [
      'Believing isotopes have different chemical properties: because they possess identical electron configurations, isotopes react identically in chemical reactions.',
      'Assuming electrons orbit like planets: quantum mechanics treats electrons as probability density clouds.',
    ],
    commandTermGuidance: [
      { term: 'Describe', advice: 'Explain subatomic particle location, relative mass, and electric charge.', mypExpectation: 'Differentiate nucleus vs orbital shells.' },
    ],
  },
  {
    id: 'chem-u2',
    subjectId: 'chemistry',
    name: 'Periodic Table Trends & Group Periodicity',
    unit: 'Unit 2: Periodic Table Trends & Periodicity',
    description: 'Periodic architecture, atomic radius, electronegativity, ionization energy, and chemical families.',
    strands: ['Criterion A: Periodic trend laws', 'Criterion B: Alkali metal reactivity inquiry', 'Criterion D: Rare earth mineral geopolitics'],
    coreTheory: [
      'The modern periodic table organizes elements in order of increasing atomic number, revealing periodic recurrences of physical and chemical properties.',
      'Atomic radius decreases across a period due to increasing positive nuclear pull on identical electron shells, and increases down groups as additional shells are added.',
      'First ionization energy measures the energy needed to remove the outermost valence electron from a gaseous atom.',
      'Electronegativity quantifies an atom’s attraction for shared bonding electrons, peaking toward fluorine and dropping toward francium.',
    ],
    equations: [
      {
        name: 'Nuclear Attraction vs Shielding Gradient',
        meaning: 'Effective nuclear charge increases across periods while inner electron shielding remains roughly constant, compressing the electron cloud.',
        application: 'Predicting whether combinations of elements will form ionic lattices or covalent molecules.',
        notes: 'Explains why non-metals have high electronegativities and attract electrons, while alkali metals readily lose valence electrons.',
      },
    ],
    misconceptions: [
      'Thinking atomic radius increases across a period because there are more protons: the increased positive charge pulls electrons closer, shrinking the radius.',
      'Confusing electron affinity with electronegativity: electronegativity refers to bonded pairs in molecules, not free gaseous ions.',
    ],
    commandTermGuidance: [
      { term: 'Explain', advice: 'Account for periodic trends using effective nuclear charge and electron shielding.', mypExpectation: 'Explicitly state both factors.' },
    ],
  },
  {
    id: 'chem-u3',
    subjectId: 'chemistry',
    name: 'Chemical Bonding & Molecular Structures',
    unit: 'Unit 3: Chemical Bonding & Lattice Structures',
    description: 'Ionic electron transfer, covalent sharing, metallic bonding, and macroscopic properties.',
    strands: ['Criterion A: Bonding mechanisms', 'Criterion B: Conductivity testing lab', 'Criterion D: Smart material shape-memory alloys'],
    coreTheory: [
      'Ionic bonding results from electrostatic attraction between oppositely charged ions formed by complete valence electron transfer.',
      'Covalent bonding involves the electrostatic attraction of two positive atomic nuclei for shared pairs of valence electrons.',
      'Metallic bonding consists of a giant regular lattice of positive metal ions immersed in a mobile "sea" of delocalized electrons.',
      'Macroscopic physical properties (melting point, electrical conductivity, malleability) directly reflect the strength and nature of constituent bonds.',
    ],
    equations: [
      {
        name: 'Electronegativity Difference & Bond Polarity',
        meaning: 'The magnitude of electronegativity disparity between bonded atoms dictates bond character from non-polar covalent to ionic.',
        application: 'Designing specialized polymers, adhesives, and water-soluble drug carriers.',
        notes: 'Symmetrical molecular geometry can cancel out individual polar bond dipoles, yielding non-polar molecules like carbon dioxide.',
      },
    ],
    misconceptions: [
      'Assuming ionic compounds conduct electricity in solid form: ions are locked in rigid crystal lattices and can only conduct when molten or dissolved in water.',
      'Believing covalent bonds break when water boils: boiling only overcomes weak intermolecular forces between molecules, leaving covalent bonds intact.',
    ],
    commandTermGuidance: [
      { term: 'Compare', advice: 'Contrast melting points and conductivities of ionic versus covalent compounds.', mypExpectation: 'Use particulate models in your explanation.' },
    ],
  },
  {
    id: 'chem-u4',
    subjectId: 'chemistry',
    name: 'Quantitative Chemistry, Moles & Stoichiometry',
    unit: 'Unit 4: Quantitative Chemistry & The Mole',
    description: 'The mole concept, balanced equations, molar mass, limiting reactants, and percentage yield.',
    strands: ['Criterion A: Stoichiometric calculations', 'Criterion C: Limiting reactant yield lab', 'Criterion D: Industrial atom economy green chemistry'],
    coreTheory: [
      'The mole provides a bridge between microscopic atoms and macroscopic laboratory masses in grams.',
      'Balanced chemical equations represent stoichiometric molar ratios in which chemical reactants combine and products form.',
      'The limiting reactant is completely consumed first in a reaction, capping the maximum theoretical yield of product formed.',
      'Percentage yield compares actual experimentally recovered product mass against the theoretical stoichiometric yield.',
    ],
    equations: [
      {
        name: 'Conservation of Mass & Molar Ratio Principle',
        meaning: 'In any closed chemical transformation, the total mass of reactants equals the total mass of products.',
        application: 'Optimizing industrial fertilizer production to minimize costly wasted chemical excess.',
        notes: 'Actual yield is almost always lower than theoretical yield due to side reactions, incomplete equilibrium, or filtration losses.',
      },
    ],
    misconceptions: [
      'Assuming the reactant present in the smallest gram mass is always limiting: limiting status depends on mole ratios and molar masses, not mass alone.',
      'Believing a 100% yield is possible in open student school laboratories without experimental recovery loss.',
    ],
    commandTermGuidance: [
      { term: 'Calculate', advice: 'Convert masses to moles, apply stoichiometric coefficients, then convert back to desired units.', mypExpectation: 'Show complete unit labels.' },
    ],
  },
  {
    id: 'chem-u5',
    subjectId: 'chemistry',
    name: 'Chemical Kinetics & Collision Theory',
    unit: 'Unit 5: Chemical Kinetics & Catalysis',
    description: 'Reaction rate factors, particle collisions, activation energy, Maxwell-Boltzmann curves, and catalysts.',
    strands: ['Criterion A: Kinetic theory principles', 'Criterion B: Reaction rate variable design', 'Criterion C: Rate curve analysis'],
    coreTheory: [
      'Reaction rate measures the speed at which reactants are consumed or products are formed over time.',
      'Collision theory requires reactant particles to collide with kinetic energy exceeding the activation energy barrier and with proper spatial orientation.',
      'Increasing temperature shifts the Maxwell-Boltzmann distribution, exponentially increasing the fraction of particles possessing activation energy.',
      'Catalysts accelerate reactions by providing an alternative reaction pathway with a lower activation energy, emerging chemically unchanged.',
    ],
    equations: [
      {
        name: 'Collision Theory Rate Principle',
        meaning: 'Reaction rate is proportional to collision frequency multiplied by the fraction of collisions exceeding the activation energy threshold.',
        application: 'Designing automotive catalytic converters to clean nitrogen oxides and unburned hydrocarbons at operating temperatures.',
        notes: 'A modest 10°C temperature increase roughly doubles reaction rates because the high-energy tail of the distribution broadens dramatically.',
      },
    ],
    misconceptions: [
      'Believing catalysts take no part in reactions: catalysts actively form temporary reaction intermediates before being regenerated.',
      'Thinking temperature increases rates primarily by causing more collisions: while collisions increase slightly, the dominant factor is that far more particles overcome activation energy.',
    ],
    commandTermGuidance: [
      { term: 'Explain', advice: 'Use Maxwell-Boltzmann distribution curves to explain temperature and catalyst effects.', mypExpectation: 'Reference activation energy threshold.' },
    ],
  },
  {
    id: 'chem-u6',
    subjectId: 'chemistry',
    name: 'Chemical Energetics & Thermochemistry',
    unit: 'Unit 6: Chemical Energetics & Calorimetry',
    description: 'Exothermic vs endothermic reactions, enthalpy changes, bond energy balance, and calorimetry.',
    strands: ['Criterion A: Enthalpy diagrams', 'Criterion B: Solution calorimetry method', 'Criterion C: Calorimetry error evaluations'],
    coreTheory: [
      'Chemical reactions involve breaking chemical bonds in reactants (requiring energy input) and forming new bonds in products (releasing energy).',
      'Exothermic reactions release thermal energy to the surroundings, yielding negative enthalpy changes and warming the surroundings.',
      'Endothermic reactions absorb thermal energy from the surroundings, yielding positive enthalpy changes and cooling the surroundings.',
      'Calorimetry measures enthalpy changes by transferring heat to or from a known mass of water and recording temperature change.',
    ],
    equations: [
      {
        name: 'Chemical Bond Energy Conservation Principle',
        meaning: 'Enthalpy change equals total energy required to break reactant bonds minus total energy released upon forming product bonds.',
        application: 'Evaluating energy density of alternative aviation fuels (hydrogen vs sustainable biofuels).',
        notes: 'If forming new product bonds releases more energy than breaking old reactant bonds required, the reaction is exothermic.',
      },
    ],
    misconceptions: [
      'Believing bond breaking releases energy: bond breaking ALWAYS absorbs energy; energy is only released when new stable bonds form.',
      'Assuming temperature increases in endothermic reactions: endothermic reactions absorb heat, causing container temperatures to drop.',
    ],
    commandTermGuidance: [
      { term: 'Annotate', advice: 'Label activation energy and enthalpy change clearly on reaction profile diagrams.', mypExpectation: 'Indicate reactant vs product energy levels.' },
    ],
  },
  {
    id: 'chem-u7',
    subjectId: 'chemistry',
    name: 'Dynamic Equilibrium & Le Chatelier’s Principle',
    unit: 'Unit 7: Dynamic Chemical Equilibrium',
    description: 'Reversible reactions, dynamic equilibrium conditions, and response to external disturbances.',
    strands: ['Criterion A: Equilibrium conditions', 'Criterion C: Equilibrium yield optimization', 'Criterion D: Haber-Bosch ammonia trade-offs'],
    coreTheory: [
      'Reversible chemical reactions reach dynamic equilibrium in closed systems when forward and reverse reaction rates become exactly equal.',
      'At equilibrium, macroscopic concentrations of reactants and products remain constant, even though microscopic reactions continue actively.',
      'Le Chatelier’s Principle states that if an equilibrium system experiences a change in concentration, temperature, or pressure, the position of equilibrium shifts to oppose that change.',
      'Catalysts accelerate both forward and reverse reaction rates equally, reaching equilibrium faster without altering the equilibrium position.',
    ],
    equations: [
      {
        name: 'Le Chatelier’s Dynamic Shift Principle',
        meaning: 'Equilibrium shifts toward whichever side counteracts the applied stress (e.g. shifts toward fewer gas moles when pressure increases).',
        application: 'Balancing temperature and pressure in industrial ammonia synthesis to maximize yield while maintaining viable reaction speed.',
        notes: 'Increasing temperature always favors the endothermic direction, as it absorbs the added thermal energy.',
      },
    ],
    misconceptions: [
      'Believing dynamic equilibrium means equal amounts of reactants and products: it means rates are equal, not concentrations.',
      'Assuming catalysts shift equilibrium toward products: catalysts only reduce time to achieve equilibrium.',
    ],
    commandTermGuidance: [
      { term: 'Justify', advice: 'Predict and justify equilibrium shifts using Le Chatelier’s principle.', mypExpectation: 'Reference specific pressure/temperature counteractions.' },
    ],
  },
  {
    id: 'chem-u8',
    subjectId: 'chemistry',
    name: 'Acids, Bases & Environmental Chemistry',
    unit: 'Unit 8: Acids, Bases & Environmental Chemistry',
    description: 'Acids and bases properties, pH scale, neutralisation, and acid rain environmental impacts.',
    strands: ['Criterion A: Acid-base reactions', 'Criterion B: Titration design lab', 'Criterion D: Acid rain ecological remediation'],
    coreTheory: [
      'Acids produce hydrogen ions in aqueous solution and act as proton donors, whereas bases accept protons or release hydroxide ions.',
      'The pH scale is logarithmic: every single unit decrease in pH represents a tenfold increase in hydrogen ion concentration.',
      'Neutralisation reactions between acids and bases produce neutral water and an ionic salt, typically releasing thermal energy.',
      'Anthropogenic emissions of sulfur dioxide and nitrogen oxides dissolve in atmospheric moisture to form acid deposition that damages aquatic ecosystems and stone architecture.',
    ],
    equations: [
      {
        name: 'Acid-Base Neutralisation Principle',
        meaning: 'Hydrogen ions from acids combine with hydroxide ions from bases to form stable neutral water molecules.',
        application: 'Industrial wastewater neutralization before environmental discharge and agricultural soil pH balancing.',
        notes: 'Weak acids only partially dissociate in water, maintaining an equilibrium between whole acid molecules and dissolved ions.',
      },
    ],
    misconceptions: [
      'Assuming all acids are dangerous while all bases are safe: concentrated bases like sodium hydroxide are equally corrosive to biological tissue.',
      'Confusing acid strength with acid concentration: strength refers to dissociation percentage; concentration refers to moles per unit volume.',
    ],
    commandTermGuidance: [
      { term: 'Evaluate', advice: 'Examine environmental strategies for combating acid precipitation (scrubbers vs catalytic converters).', mypExpectation: 'Address economic and ecological aspects.' },
    ],
  },

  // =========================================================================
  // 3. MATHEMATICS EXTENDED (8 COMPREHENSIVE UNITS)
  // =========================================================================
  {
    id: 'math-ext-u1',
    subjectId: 'math-ext',
    name: 'Advanced Algebraic Expressions & Remainder Theorem',
    unit: 'Unit 1: Advanced Algebra & Polynomials',
    description: 'Polynomial division, remainder and factor theorems, cubic factoring, and rational expressions.',
    strands: ['Criterion A: Polynomial factoring', 'Criterion B: Investigating polynomial roots', 'Criterion C: Line-by-line algebraic proofs'],
    coreTheory: [
      'Polynomials are formal expressions constructed from variables, coefficients, and non-negative integer exponents.',
      'The Remainder Theorem states that dividing a polynomial by a linear binomial yields a remainder equal to evaluating the polynomial at that root.',
      'The Factor Theorem establishes that a linear binomial is a factor if and only if the polynomial evaluates to zero at that value.',
      'Rational algebraic expressions require careful identification of excluded domain values where denominators equal zero.',
    ],
    equations: [
      {
        name: 'Factor Theorem Relationship',
        meaning: 'Evaluating a polynomial function at a candidate root determines whether the corresponding linear term divides the polynomial without remainder.',
        application: 'Factoring high-degree cubic and quartic engineering equations into solvable linear components.',
        notes: 'If remainder is zero, the polynomial can be completely factored into lower-degree expressions.',
      },
    ],
    misconceptions: [
      'Forgetting that dividing by a variable expression can eliminate valid solutions: factor terms instead of cancelling variables from both sides.',
      'Assuming all polynomial roots must be rational numbers: roots can be irrational surds or complex conjugates.',
    ],
    commandTermGuidance: [
      { term: 'Show that', advice: 'Proceed step-by-step from given expressions to target form without using the result backwards.', mypExpectation: 'Exhaustive algebraic steps.' },
    ],
  },
  {
    id: 'math-ext-u2',
    subjectId: 'math-ext',
    name: 'Quadratic Functions, Discriminant & Vertex Optimization',
    unit: 'Unit 2: Quadratic Optimization & Discriminant',
    description: 'Completing the square, discriminant analysis, vertex optimization, and non-routine systems.',
    strands: ['Criterion A: Quadratic analysis', 'Criterion B: Quadratic vertex pattern rules', 'Criterion D: Authentic revenue optimization'],
    coreTheory: [
      'Quadratic functions produce symmetrical parabolic graphs with a unique vertex representing either a global maximum or minimum.',
      'Completing the square converts standard quadratics into vertex form, immediately displaying the coordinates of the turning point.',
      'The quadratic discriminant indicates whether the parabola crosses the horizontal axis twice, touches it at one tangent root, or never intersects it.',
      'Optimization involves setting up quadratic models for real-world constraints (such as revenue vs price) to identify the vertex optimal point.',
    ],
    equations: [
      {
        name: 'Quadratic Discriminant Nature of Roots',
        meaning: 'The sign of the discriminant determines the number of real coordinate intercepts without needing to solve the full equation.',
        application: 'Determining whether an artillery shell clears an obstacle or whether two geometric paths intersect.',
        notes: 'Positive values guarantee two distinct real roots; zero indicates one repeated touching vertex root; negative indicates no real roots.',
      },
    ],
    misconceptions: [
      'Assuming the vertex of a parabola is always at the midpoint of any two points: it is only at the midpoint of points sharing identical vertical heights.',
      'Believing a negative discriminant means the equation has no solution: it has no real solutions, but possesses two complex solutions.',
    ],
    commandTermGuidance: [
      { term: 'Justify', advice: 'Use the sign of the discriminant to justify the number of physical intersections in a scenario.', mypExpectation: 'Explicitly evaluate the discriminant value.' },
    ],
  },
  {
    id: 'math-ext-u3',
    subjectId: 'math-ext',
    name: 'Non-Right Triangle Trigonometry, Sine & Cosine Laws',
    unit: 'Unit 3: Non-Right Triangle Trigonometry',
    description: 'Sine rule, ambiguous case, cosine rule, area of triangles, and 3D spatial bearings.',
    strands: ['Criterion A: Non-right triangle calculations', 'Criterion C: Multi-step spatial bearings diagrams', 'Criterion D: Geological surveying triangulation'],
    coreTheory: [
      'The Sine Rule establishes that the ratio of any side length to the sine of its opposite angle is constant for any triangle.',
      'The ambiguous case of the sine rule arises in side-side-angle configurations where two possible triangles can be formed (one acute, one obtuse).',
      'The Cosine Rule generalizes the Pythagorean theorem to any triangle, relating three sides and one included angle.',
      'Triangulation enables surveyors and navigators to determine distant positions and elevations using angular bearings measured from baseline reference points.',
    ],
    equations: [
      {
        name: 'Cosine Law Generalized Geometry',
        meaning: 'The square of an unknown side equals the sum of squares of the other two sides minus twice their product times the cosine of the included angle.',
        application: 'Maritime navigation bearings when navigating between three coastal lighthouses.',
        notes: 'Reduces exactly to the Pythagorean theorem when the included angle is ninety degrees, since cosine of ninety is zero.',
      },
    ],
    misconceptions: [
      'Overlooking the ambiguous case when using the sine rule to find an unknown angle: always verify whether an obtuse angle solution exists.',
      'Confusing compass bearings (measured clockwise from true North) with standard Cartesian angles (measured counter-clockwise from positive x-axis).',
    ],
    commandTermGuidance: [
      { term: 'Determine', advice: 'State which trigonometric law applies (SAS requires Cosine Rule; AAS/SSA requires Sine Rule).', mypExpectation: 'Show explicit substitution and step-by-step rounding.' },
    ],
  },
  {
    id: 'math-ext-u4',
    subjectId: 'math-ext',
    name: 'Periodic Sinusoidal Functions & Harmonic Wave Cycles',
    unit: 'Unit 4: Periodic Sinusoidal Functions & Waves',
    description: 'Radian angle measures, amplitude, period, vertical shifts, horizontal phase adjustments, and tidal modeling.',
    strands: ['Criterion A: Sinusoidal transformations', 'Criterion B: Harmonic pattern induction', 'Criterion D: Coastal harbor tidal prediction models'],
    coreTheory: [
      'Sinusoidal functions model repeating cyclical phenomena such as sound waves, ocean tides, and circadian rhythms.',
      'Amplitude measures the vertical distance from the horizontal equilibrium midline to the peak or trough.',
      'The period represents the horizontal duration required for the periodic curve to complete one full repeating cycle.',
      'Horizontal phase shifts translate the curve left or right to align mathematical models with real-world observed starting points.',
    ],
    equations: [
      {
        name: 'Periodic Harmonic Transformation Model',
        meaning: 'A sinusoidal model translates baseline wave cycles by scaling amplitude, stretching period, and applying horizontal phase and vertical midline offsets.',
        application: 'Forecasting coastal harbor water depths to ensure safe container ship docking clearances.',
        notes: 'The midline represents the average daily water depth; the amplitude indicates the height between mean depth and high tide.',
      },
    ],
    misconceptions: [
      'Confusing the horizontal coefficient with the period: the period is inversely related to the frequency multiplier.',
      'Forgetting that horizontal phase shifts operate in the opposite direction of the sign inside the bracket.',
    ],
    commandTermGuidance: [
      { term: 'Model', advice: 'Formulate sinusoidal parameters from peak, trough, and cycle timing data.', mypExpectation: 'Explicitly explain amplitude, midline, and period.' },
    ],
  },
  {
    id: 'math-ext-u5',
    subjectId: 'math-ext',
    name: 'Exponential & Logarithmic Growth and Decay Models',
    unit: 'Unit 5: Exponential & Logarithmic Functions',
    description: 'Exponential functions, logarithmic rules, solving indicial equations, and continuous decay models.',
    strands: ['Criterion A: Logarithmic operations', 'Criterion B: Investigating exponential base rules', 'Criterion D: Bacterial culture epidemic projections'],
    coreTheory: [
      'Exponential functions describe growth or decay where the rate of change is proportional to the current quantity.',
      'Logarithms are the mathematical inverses of exponentiation, answering what exponent is required to produce a given value.',
      'The laws of logarithms transform multiplicative relationships into additive steps, enabling linear analysis of exponential phenomena.',
      'Half-life decay models radioactive decay and pharmaceutical clearance from human bloodstream systems.',
    ],
    equations: [
      {
        name: 'Exponential Growth and Decay Principle',
        meaning: 'Quantities multiply by a constant growth factor over each equal interval of time rather than adding a fixed amount.',
        application: 'Modeling compound interest growth, pandemic transmission doubling times, and carbon-14 archaeological dating.',
        notes: 'Logarithmic transformation plots exponential curves as straight lines, simplifying parameter estimation.',
      },
    ],
    misconceptions: [
      'Assuming exponential growth can continue indefinitely in physical nature: environmental carrying capacity and resource limits eventually cap growth.',
      'Misapplying logarithm properties (e.g. confusing the log of a sum with the sum of logs).',
    ],
    commandTermGuidance: [
      { term: 'Solve', advice: 'Take logarithms of both sides to bring variable exponents down as linear multipliers.', mypExpectation: 'Show exact logarithmic steps before decimal rounding.' },
    ],
  },
  {
    id: 'math-ext-u6',
    subjectId: 'math-ext',
    name: 'Arithmetic & Geometric Progressions and Deductive Proof',
    unit: 'Unit 6: Sequences, Series & Deductive Proof',
    description: 'Arithmetic and geometric progressions, partial sums, infinite geometric series, and deductive induction.',
    strands: ['Criterion A: Sequence formula calculation', 'Criterion B: General rule inductive reasoning', 'Criterion C: Deductive algebraic proofs'],
    coreTheory: [
      'Arithmetic sequences advance by adding a constant common difference; geometric sequences advance by multiplying by a constant common ratio.',
      'The sum of an arithmetic series pairs terms from opposite ends to produce equal sum pairs.',
      'Infinite geometric series converge to a finite limiting sum if and only if the absolute value of the common ratio is strictly less than one.',
      'Mathematical proof requires deductive reasoning establishing that a rule must hold true universally for all cases, not merely verifying specific cases.',
    ],
    equations: [
      {
        name: 'Infinite Geometric Series Convergence Principle',
        meaning: 'When the multiplier between successive terms is smaller than one, an infinite sum approaches a finite limit.',
        application: 'Calculating long-term economic fiscal multipliers and bouncing ball total travel distance before stopping.',
        notes: 'If the common ratio is equal to or greater than one, the series diverges toward infinity.',
      },
    ],
    misconceptions: [
      'Confusing the n-th term with the sum of the first n terms.',
      'Believing testing five consecutive numbers constitutes a mathematical proof: verification tests examples, whereas proof demonstrates algebraic inevitability.',
    ],
    commandTermGuidance: [
      { term: 'Prove', advice: 'Use deductive algebraic manipulation to demonstrate the identity holds without reliance on numerical examples.', mypExpectation: 'Formulate an exhaustive algebraic argument.' },
    ],
  },
  {
    id: 'math-ext-u7',
    subjectId: 'math-ext',
    name: 'Coordinate Geometry of Circles, Tangents & Conics',
    unit: 'Unit 7: Circle Geometry, Tangents & Conics',
    description: 'Cartesian equations of circles, tangent-radius perpendicularity proofs, chord bisectors, and geometric loci.',
    strands: ['Criterion A: Circle equations & intercepts', 'Criterion B: Investigating tangent chord properties', 'Criterion C: Structured geometric proofs'],
    coreTheory: [
      'A circle is the geometric locus of all points in a plane equidistant from a fixed center point.',
      'Completing the square in both x and y converts general second-degree equations into standard circle form displaying center and radius.',
      'A tangent line intersects a circle at exactly one point and is strictly perpendicular to the radial segment drawn to that point of contact.',
      'The perpendicular bisector of any chord in a circle passes directly through the center point of the circle.',
    ],
    equations: [
      {
        name: 'Tangent-Radius Perpendicularity Principle',
        meaning: 'The gradient of a tangent line is the negative reciprocal of the gradient of the radius drawn to the point of contact.',
        application: 'Determining optimal entry and exit trajectories for spacecraft orbiting celestial bodies.',
        notes: 'Used to write linear equations of tangent lines given the coordinate of the contact point on the circumference.',
      },
    ],
    misconceptions: [
      'Confusing the radius squared term on the right side of circle equations with the actual radius length.',
      'Assuming secant lines and tangent lines share the same geometric properties: tangents touch once; secants cross twice.',
    ],
    commandTermGuidance: [
      { term: 'Show that', advice: 'Prove perpendicularity by showing the product of the two line gradients equals negative one.', mypExpectation: 'Demonstrate gradient calculation and reciprocal product.' },
    ],
  },
  {
    id: 'math-ext-u8',
    subjectId: 'math-ext',
    name: 'Non-Linear Systems, Inequalities & Optimization',
    unit: 'Unit 8: Non-Linear Systems & Optimization',
    description: 'Intersection of lines, circles, and parabolas, non-linear inequality regions, and authentic multivariable optimization.',
    strands: ['Criterion A: Non-linear systems', 'Criterion C: Shaded feasibility region graphs', 'Criterion D: Authentic logistical cost optimization'],
    coreTheory: [
      'Solving systems involving combinations of linear and non-linear relationships yields intersections representing simultaneous solutions.',
      'Inequality systems define two-dimensional feasibility regions on the Cartesian plane satisfying multiple simultaneous real-world constraints.',
      'Optimization identifies coordinates within the feasibility region that maximize or minimize an objective target function.',
      'Evaluating real-world validity requires confirming whether solutions conform to authentic physical boundaries (non-negative integers, material tolerances).',
    ],
    equations: [
      {
        name: 'Feasibility Boundary Optimization Principle',
        meaning: 'Optimal solutions to constrained linear and non-linear objective functions occur along the boundary vertices of the feasibility region.',
        application: 'Factory resource allocation maximizing production profits under constrained raw material budgets.',
        notes: 'Discrete constraints require testing neighboring integer coordinates if fractional items cannot physically exist.',
      },
    ],
    misconceptions: [
      'Assuming feasibility regions always contain a solution: contradictory constraints yield an empty set with no feasible solutions.',
      'Forgetting that flipping an inequality sign occurs when multiplying or dividing both sides by a negative number.',
    ],
    commandTermGuidance: [
      { term: 'Apply', advice: 'Model the contextual constraints as algebraic inequalities and identify the optimal vertex.', mypExpectation: 'State and justify the practical solution.' },
    ],
  },

  // =========================================================================
  // 4. MATHEMATICS STANDARD (8 COMPREHENSIVE UNITS)
  // =========================================================================
  {
    id: 'math-std-u1',
    subjectId: 'math-std',
    name: 'Number Systems, Surds & Scientific Notation',
    unit: 'Unit 1: Number Systems, Surds & Notation',
    description: 'Real number sets, index laws, operations with surds, and scientific notation in practical measurements.',
    strands: ['Criterion A: Index laws & surd operations', 'Criterion C: Standard notation clarity', 'Criterion D: Astronomical scale comparisons'],
    coreTheory: [
      'The real number system includes rational numbers (expressible as fractions) and irrational numbers (non-repeating, non-terminating decimals such as surds and pi).',
      'Surds represent exact square roots of non-square integers; operating with surds maintains complete precision without rounding errors.',
      'Index laws govern multiplication, division, and powers of expressions sharing identical base values.',
      'Scientific notation represents extremely large or small physical measurements concisely using powers of ten.',
    ],
    equations: [
      {
        name: 'Exact Radical Simplification Principle',
        meaning: 'Square roots of products can be decomposed into products of square roots to extract perfect square factors.',
        application: 'Maintaining exact precision in engineering design before final physical fabrication.',
        notes: 'Surds must only be converted to decimals at the very final step of a problem to prevent rounding error accumulation.',
      },
    ],
    misconceptions: [
      'Believing the square root of a sum equals the sum of square roots: radicals cannot be distributed across addition.',
      'Confusing negative exponents with negative numbers: negative exponents represent reciprocal fractions, not negative values.',
    ],
    commandTermGuidance: [
      { term: 'Simplify', advice: 'Express answers in simplest radical or exponential form without decimal approximations.', mypExpectation: 'No decimals in surd questions.' },
    ],
  },
  {
    id: 'math-std-u2',
    subjectId: 'math-std',
    name: 'Linear Relationships, Coordinate Geometry & Systems',
    unit: 'Unit 2: Linear Relationships & Gradients',
    description: 'Linear functions, slope-intercept equations, midpoint and distance formulas, and simultaneous linear systems.',
    strands: ['Criterion A: Linear equations', 'Criterion B: Gradient pattern investigations', 'Criterion D: Subscription plan cost comparison'],
    coreTheory: [
      'Linear relationships have a constant rate of change represented by the gradient of the line on a Cartesian graph.',
      'The slope-intercept form immediately indicates the steepness of the line and the vertical coordinate where it crosses the y-axis.',
      'Parallel lines have identical gradients; perpendicular lines have gradients that multiply to negative one.',
      'Simultaneous linear equations identify the unique point of intersection where two linear relationships produce identical values.',
    ],
    equations: [
      {
        name: 'Linear Rate of Change Relationship',
        meaning: 'Gradient measures the vertical change divided by the corresponding horizontal change between any two points on a line.',
        application: 'Determining fuel consumption rates per kilometer driven on road trips.',
        notes: 'Horizontal lines have zero gradient; vertical lines have undefined gradient.',
      },
    ],
    misconceptions: [
      'Confusing the x-intercept with the y-intercept: the y-intercept occurs where x is zero; the x-intercept occurs where y is zero.',
      'Assuming steep lines always have positive slopes: steep lines descending from left to right have large negative gradients.',
    ],
    commandTermGuidance: [
      { term: 'Calculate', advice: 'Show coordinate substitution into gradient or distance formulas clearly.', mypExpectation: 'Show working lines step-by-step.' },
    ],
  },
  {
    id: 'math-std-u3',
    subjectId: 'math-std',
    name: 'Quadratic Relations, Factoring & Parabolic Graphs',
    unit: 'Unit 3: Quadratic Relations & Factoring',
    description: 'Factoring quadratic expressions, solving by factorization, vertex coordinates, and parabolic projectile paths.',
    strands: ['Criterion A: Quadratic factorization', 'Criterion B: Parabola symmetry patterns', 'Criterion D: Projectile height trajectory models'],
    coreTheory: [
      'Quadratic relationships generate U-shaped curves called parabolas that possess a vertical axis of symmetry.',
      'Factoring quadratic expressions into linear binomials allows solving equations using the Null Factor Law.',
      'The x-intercepts of a parabola occur where the function equals zero; the vertex lies symmetrically halfway between these intercepts.',
      'In projectile motion, gravity produces quadratic downward curvature where the vertex represents maximum achieved altitude.',
    ],
    equations: [
      {
        name: 'Null Factor Law Principle',
        meaning: 'If the product of two real quantities equals zero, at least one of the individual factors must equal zero.',
        application: 'Finding launch and landing times of athletic jumps or launched projectiles.',
        notes: 'Only applies when one side of the equation equals zero; non-zero products cannot be solved this way.',
      },
    ],
    misconceptions: [
      'Attempting to apply the Null Factor Law when an equation equals a non-zero number (e.g. factoring when equal to 6).',
      'Forgetting that squaring a negative number yields a positive product.',
    ],
    commandTermGuidance: [
      { term: 'Solve', advice: 'Rearrange equation to equal zero, factor completely, and state both possible solutions.', mypExpectation: 'List both root values.' },
    ],
  },
  {
    id: 'math-std-u4',
    subjectId: 'math-std',
    name: 'Geometry, Surface Area, Volume & Trigonometry',
    unit: 'Unit 4: Geometry, Surface Area & Volume',
    description: 'Three-dimensional geometric solids, composite prisms, cylinders, spheres, cones, and right-angled trigonometry.',
    strands: ['Criterion A: Surface area & volume calculations', 'Criterion C: Annotated 3D solids sketches', 'Criterion D: Product packaging material efficiency'],
    coreTheory: [
      'Prisms have uniform cross-sections along their length; their volume equals cross-sectional area multiplied by perpendicular height.',
      'Pyramids and cones converge to an apex; their volume equals one-third of the corresponding prism with identical base and height.',
      'Surface area measures the total exterior boundary area of a three-dimensional object, requiring summing all face areas.',
      'Right-angled trigonometry relates acute angles to side ratios in right triangles via sine (opposite/hypotenuse), cosine (adjacent/hypotenuse), and tangent (opposite/adjacent).',
    ],
    equations: [
      {
        name: 'Right-Angled Trigonometric Ratio Principle',
        meaning: 'The ratios of side lengths in right triangles depend exclusively on the magnitude of the reference angle.',
        application: 'Calculating building heights using ground clinometer angle measurements and baseline distance.',
        notes: 'Tangent connects opposite to adjacent without needing to calculate hypotenuse length.',
      },
    ],
    misconceptions: [
      'Confusing the slant height of a cone or pyramid with the perpendicular vertical height.',
      'Using trigonometry ratios without first confirming that the triangle contains a true ninety-degree right angle.',
    ],
    commandTermGuidance: [
      { term: 'Calculate', advice: 'Substitute dimensions into volume or trigonometric formulas with appropriate square or cubic units.', mypExpectation: 'Include correct metric units.' },
    ],
  },
  {
    id: 'math-std-u5',
    subjectId: 'math-std',
    name: 'Bivariate Data Analysis, Correlation & Best Fit',
    unit: 'Unit 5: Bivariate Data & Best Fit Lines',
    description: 'Scatter plots, correlation direction and strength, lines of best fit, and interpolation vs extrapolation reliability.',
    strands: ['Criterion A: Correlation interpretation', 'Criterion B: Data trend rule discovery', 'Criterion C: Scatter plot axes & line of best fit'],
    coreTheory: [
      'Bivariate data examines the potential statistical relationship between two continuous quantitative variables.',
      'Scatter plots display paired observations, illustrating positive, negative, or zero correlation.',
      'A line of best fit models the central trend of scatter points, passing through the mean coordinate point (mean x, mean y).',
      'Interpolation predicts values within the range of original experimental data (generally reliable); extrapolation predicts beyond the measured range (high risk of error).',
    ],
    equations: [
      {
        name: 'Mean Point Centroid Principle',
        meaning: 'A reliable linear trendline must pass directly through the centroid coordinate formed by the mean of x and the mean of y.',
        application: 'Analyzing study hours versus exam performance in educational diagnostics.',
        notes: 'Outlier data points exert disproportionate leverage on trendlines and should be examined for recording errors.',
      },
    ],
    misconceptions: [
      'Assuming correlation proves causal connection: two variables can correlate due to a hidden third factor or pure coincidence.',
      'Assuming linear trendlines can be extrapolated indefinitely into the future.',
    ],
    commandTermGuidance: [
      { term: 'Describe', advice: 'State the direction (positive/negative), strength (strong/moderate/weak), and form (linear/non-linear) of correlation.', mypExpectation: 'Address all three characteristics.' },
    ],
  },
  {
    id: 'math-std-u6',
    subjectId: 'math-std',
    name: 'Probability, Venn Diagrams & Independent Events',
    unit: 'Unit 6: Probability & Compound Events',
    description: 'Theoretical vs experimental probability, sample space diagrams, mutually exclusive events, and probability trees.',
    strands: ['Criterion A: Probability calculations', 'Criterion C: Tree & Venn diagram representations', 'Criterion D: Quality control defect probability'],
    coreTheory: [
      'Probability measures the likelihood of an event occurring, scaled continuously from 0 (impossible) to 1 (certain).',
      'Experimental relative frequency approaches theoretical probability as the total number of experimental trials becomes very large (Law of Large Numbers).',
      'Two events are mutually exclusive if they cannot occur simultaneously; their joint intersection probability is zero.',
      'Probability tree diagrams multiply branch probabilities along paths to calculate compound event probabilities.',
    ],
    equations: [
      {
        name: 'Complementary Event Principle',
        meaning: 'The probability of an event happening plus the probability of it not happening always sums to exactly one.',
        application: 'Calculating the probability of getting "at least one" success by subtracting the probability of zero successes from one.',
        notes: 'Simplifies complex probability problems by avoiding long summations of multiple success scenarios.',
      },
    ],
    misconceptions: [
      'The "gambler’s fallacy": believing that after tossing four consecutive heads, a tail is "due" on the next toss; independent events retain identical probabilities.',
      'Adding probabilities of non-mutually exclusive events without subtracting their double-counted intersection.',
    ],
    commandTermGuidance: [
      { term: 'Determine', advice: 'Use Venn diagrams or tree diagrams to show the complete sample space before calculating probabilities.', mypExpectation: 'Express as exact fractions.' },
    ],
  },
  {
    id: 'math-std-u7',
    subjectId: 'math-std',
    name: 'Financial Mathematics, Currency & Compound Growth',
    unit: 'Unit 7: Financial Mathematics & Interest',
    description: 'Simple and compound interest, percentage inflation, depreciation of assets, currency exchange, and budgeting.',
    strands: ['Criterion A: Interest calculations', 'Criterion C: Structured financial balance sheets', 'Criterion D: Loan amortization vs savings plans'],
    coreTheory: [
      'Simple interest calculates returns based exclusively on the initial principal deposit over time.',
      'Compound interest calculates returns on both the initial principal and all accumulated interest from prior compounding periods.',
      'Depreciation models the decline in market value of machinery, vehicles, and technology over time due to wear and obsolescence.',
      'Currency exchange requires accounting for bid-ask bank commission spreads when converting between international currencies.',
    ],
    equations: [
      {
        name: 'Compound Growth Multiplier Principle',
        meaning: 'Balances grow by repeatedly applying a compound multiplier factor for each compounding cycle.',
        application: 'Comparing college tuition investment funds against mortgage borrowing interest costs.',
        notes: 'More frequent compounding intervals (e.g. monthly vs annually) yield slightly higher final balances for the same nominal annual rate.',
      },
    ],
    misconceptions: [
      'Confusing simple interest with compound interest: simple interest grows linearly; compound interest grows exponentially.',
      'Forgetting to adjust the interest rate and number of periods when interest compounds monthly or quarterly rather than annually.',
    ],
    commandTermGuidance: [
      { term: 'Justify', advice: 'Recommend the superior investment or loan option by comparing total financial interest costs over time.', mypExpectation: 'Provide clear monetary comparisons.' },
    ],
  },
  {
    id: 'math-std-u8',
    subjectId: 'math-std',
    name: 'Geometric Transformations, Congruence & Similarity',
    unit: 'Unit 8: Transformations, Congruence & Similarity',
    description: 'Translations, reflections, rotations, enlargements, scale factors in area and volume, and geometric proofs.',
    strands: ['Criterion A: Transformation coordinates', 'Criterion B: Area vs volume scaling rules', 'Criterion C: Deductive similarity proofs'],
    coreTheory: [
      'Isometries (translations, reflections, rotations) preserve shape and size, producing congruent geometric figures.',
      'Enlargements (dilatations) preserve shape and angle measures but alter size by a linear scale factor, producing similar figures.',
      'When linear dimensions scale by factor k, surface area scales by factor k squared, and volume scales by factor k cubed.',
      'Deductive geometric proofs establish congruence using formal conditions (SSS, SAS, ASA, RHS) and similarity using (AA, SAS, SSS ratios).',
    ],
    equations: [
      {
        name: 'Square-Cube Geometric Scaling Principle',
        meaning: 'Scaling linear lengths by a constant factor increases surface area by the square of that factor and volume by the cube of that factor.',
        application: 'Evaluating heat retention in living organisms (why small animals lose body heat far faster than large animals due to high surface-area-to-volume ratios).',
        notes: 'Doubling the linear dimensions of a sculpture quadruples the paint needed for its surface and octuples its weight.',
      },
    ],
    misconceptions: [
      'Assuming doubling the side length of a cube doubles its volume: volume increases eightfold (two cubed).',
      'Confusing line reflections with translations: reflections invert orientation; translations maintain parallel alignment.',
    ],
    commandTermGuidance: [
      { term: 'Prove', advice: 'Use geometric congruence tests with explicit angle and side reasons in parentheses.', mypExpectation: 'Cite formal geometric theorems.' },
    ],
  },
];

export const QUESTIONS: Question[] = [
  // Physics Criterion C
  {
    id: 'q-phys-01',
    subjectId: 'physics',
    topicId: 'phys-u6',
    topicName: 'Physics — Electromagnetic Induction',
    title: 'Faraday’s Law Induced Voltage & Energy Conservation',
    criterion: 'C',
    strand: 'Processing and evaluating experimental data',
    commandTerm: 'Calculate',
    difficulty: 'Extended',
    marks: 6,
    prompt: 'An experiment investigated the electromagnetic voltage induced across a wire coil positioned in a changing magnetic field. The magnetic field strength decreased uniformly from an initial value of 0.85 Tesla to 0.15 Tesla over an observed time duration of 0.120 seconds across a 250-turn circular coil with radius 0.040 meters.\n\n(a) **Explain** how the rate of change of magnetic flux generates an electromotive force across the terminals of the coil.\n\n(b) Using the experimental data, **calculate** the magnitude of the induced electromotive force generated across the coil.\n\n(c) The coil is connected to an external load resistor of 14.5 ohms. If the internal wire resistance of the coil is 0.50 ohms, **determine** the electric power dissipated as heat in the load resistor.',
    katexSnippet: 'Induced voltage depends on the time rate of change of magnetic flux through the coil',
    dataTable: {
      headers: ['Parameter', 'Measured Value', 'Experimental Uncertainty'],
      rows: [
        ['Number of turns in coil', '250 turns', 'Exact'],
        ['Coil radius', '0.040 m', '± 0.001 m'],
        ['Initial magnetic field', '0.85 T', '± 0.02 T'],
        ['Final magnetic field', '0.15 T', '± 0.02 T'],
        ['Duration of field decay', '0.120 s', '± 0.005 s'],
        ['Load resistance', '14.5 Ω', '± 0.1 Ω'],
      ],
      caption: 'Table 1: Coil dimensions and magnetic decay measurements',
    },
    hints: [
      'Step 1: Calculate the circular cross-sectional area of the coil using pi times radius squared.',
      'Step 2: Find the change in magnetic field (0.85 minus 0.15) and multiply by the cross-sectional area to get the flux change.',
      'Step 3: Multiply the rate of flux change by the 250 coil turns to find the induced voltage.',
      'Step 4: Total circuit resistance equals the external load plus internal coil wire resistance (15.0 ohms).',
    ],
    markScheme: [
      '[1 mark] Conceptual explanation: a changing magnetic field alters the magnetic flux through the loop, exerting force on mobile electrons to create a potential difference.',
      '[1 mark] Correct cross-sectional area calculation: approximately 0.00503 square meters.',
      '[1 mark] Correct calculation of magnetic field change: 0.70 Tesla.',
      '[1 mark] Accurate determination of induced electromotive force: approximately 7.33 Volts.',
      '[1 mark] Correct total circuit resistance: 14.5 + 0.5 = 15.0 ohms, yielding a current of approximately 0.489 Amperes.',
      '[1 mark] Accurate load power calculation: approximately 3.46 Watts.',
    ],
    sampleSolution: '**Part (a): Conceptual explanation:**\nWhen the magnetic field strength decreases, the total magnetic flux passing through the circular area of the coil drops. According to Faraday’s Law, this time rate of change in flux produces an electric field along the wire, driving electrons and inducing an electromotive force (voltage). By Lenz’s Law, the induced current flows in a direction that generates an opposing magnetic field to resist the decay.\n\n**Part (b): Induced Voltage:**\n1. Coil area = pi × (0.040 m)² = 0.00503 m²\n2. Change in magnetic field = 0.85 T - 0.15 T = 0.70 T\n3. Change in magnetic flux = 0.70 T × 0.00503 m² = 0.00352 Webers\n4. Induced voltage = 250 turns × (0.00352 Wb / 0.120 s) = 7.33 Volts\n\n**Part (c): Power in Load Resistor:**\n1. Total resistance = 14.5 Ω + 0.50 Ω = 15.0 Ω\n2. Circuit current = 7.33 V / 15.0 Ω = 0.489 Amperes\n3. Power dissipated in load = (0.489 A)² × 14.5 Ω = 3.46 Watts',
    criteriaLevelRubric: [
      { level: 'Level 1-2', descriptor: 'States the basic relationship between magnetism and electricity; incomplete calculations.' },
      { level: 'Level 3-4', descriptor: 'Correctly determines induced voltage but omits internal resistance or confuses power dissipation.' },
      { level: 'Level 5-6', descriptor: 'Thoroughly explains the conceptual mechanism, accurately calculates induced voltage and load power with consistent units and sensible precision.' },
    ],
  },

  // Chemistry Criterion B
  {
    id: 'q-chem-01',
    subjectId: 'chemistry',
    topicId: 'chem-u5',
    topicName: 'Chemistry — Chemical Kinetics',
    title: 'Reaction Rates, Temperature & Maxwell-Boltzmann Distributions',
    criterion: 'B',
    strand: 'Inquiring and designing — formulating hypotheses & variable control',
    commandTerm: 'Explain',
    difficulty: 'Extended',
    marks: 6,
    prompt: 'An experiment investigated the rate of reaction between sodium thiosulfate and hydrochloric acid at four designated temperatures, measuring the time taken for precipitated sulfur to obscure a black reference cross on paper beneath the reaction flask.\n\n(a) Using collision theory and the Maxwell-Boltzmann kinetic energy distribution model, **explain** why a modest temperature increase of 10°C (from 20°C to 30°C) roughly doubles the reaction rate, even though the average molecular speed increases by less than 2%.\n\n(b) **Identify** the independent variable, dependent variable, and **two** essential controlled variables required to ensure reliable experimental inquiry data.',
    katexSnippet: 'Reaction rates accelerate exponentially when kinetic energy distribution exceeds the activation threshold',
    dataTable: {
      headers: ['Trial', 'Temperature (°C)', 'Absolute Temp (K)', 'Reaction Time t (s)', 'Relative Rate (1/t)'],
      rows: [
        ['1', '20.0', '293.15', '56.0', '0.0179 s⁻¹'],
        ['2', '30.0', '303.15', '27.5', '0.0364 s⁻¹'],
        ['3', '40.0', '313.15', '14.0', '0.0714 s⁻¹'],
        ['4', '50.0', '323.15', '7.2', '0.1389 s⁻¹'],
      ],
      caption: 'Table 2: Temperature and reaction rate data',
    },
    hints: [
      'Consider the shape of the Maxwell-Boltzmann distribution curve: temperature flattens the curve and extends the high-energy tail to the right.',
      'Distinguish between the slight increase in collision frequency and the dramatic surge in the fraction of particles possessing energy equal to or greater than the activation threshold.',
      'For controlled variables, specify exact concentrations and volumes of both chemical reagents and the container geometry.',
    ],
    markScheme: [
      '[1 mark] Reference to Maxwell-Boltzmann energy distribution curve shifting toward higher kinetic energy.',
      '[1 mark] Crucial distinction: collision frequency increases only slightly, but the fraction of particles with energy exceeding activation energy increases exponentially.',
      '[1 mark] Conclusion that fruitful, successful collisions per second approximately double.',
      '[1 mark] Correct independent variable: Temperature of the reaction mixture.',
      '[1 mark] Correct dependent variable: Time taken for the reference cross to become obscured (or rate 1/t).',
      '[1 mark] Two valid controlled variables with specific control parameters (e.g. constant concentration and volume of reactants, constant flask shape and observer height).',
    ],
    sampleSolution: '**Part (a): Conceptual explanation:**\n1. In any chemical mixture, particles possess a broad distribution of kinetic energies described by the Maxwell-Boltzmann model.\n2. When temperature increases by 10°C, the average speed of molecules increases by under 2%, meaning collision frequency increases very modestly.\n3. However, the energy distribution curve broadens and shifts to the right. Consequently, the fraction of particles situated in the high-energy tail possessing kinetic energy exceeding the activation energy threshold approximately doubles.\n4. Therefore, the frequency of effective, reaction-producing collisions doubles, doubling the overall reaction rate.\n\n**Part (b): Variables:**\n- **Independent variable:** Temperature of the reacting solution (20°C, 30°C, 40°C, 50°C).\n- **Dependent variable:** Time in seconds taken for precipitated sulfur to obscure the reference cross.\n- **Controlled variables:**\n  1. Concentration and volume of sodium thiosulfate solution.\n  2. Concentration and volume of hydrochloric acid.\n  3. Container flask geometry and depth of solution.',
    criteriaLevelRubric: [
      { level: 'Level 1-2', descriptor: 'States that particles move faster at higher temperature; does not reference activation energy.' },
      { level: 'Level 3-4', descriptor: 'Mentions activation energy and identifies variables, but fails to explain the exponential surge in the high-energy tail.' },
      { level: 'Level 5-6', descriptor: 'Thoroughly explains the Maxwell-Boltzmann distribution shift, contrasts collision frequency with activation threshold fraction, and fully specifies variable controls.' },
    ],
  },

  // Math Extended Criterion D
  {
    id: 'q-math-01',
    subjectId: 'math-ext',
    topicId: 'math-ext-u4',
    topicName: 'Mathematics Extended — Periodic Functions',
    title: 'Coastal Tidal Depth Harmonic Function Modelling',
    criterion: 'D',
    strand: 'Applying mathematics in authentic real-life contexts',
    commandTerm: 'Evaluate',
    difficulty: 'Extended',
    marks: 6,
    prompt: 'A commercial cargo harbor requires a minimum water depth of 8.50 meters for deep-draft container vessels to safely dock without grounding.\n\nOver a 24-hour observation period, the tidal water depth was recorded at regular intervals:\n- Minimum low tide of 4.20 meters observed at 03:00 hours.\n- Maximum high tide of 12.80 meters observed at 09:12 hours (6.2 hours after low tide).\n\n(a) **Formulate** a sinusoidal mathematical function to model the tidal water depth as a function of time throughout the 24-hour cycle.\n\n(b) **Determine** the time intervals during the day when container ships can safely enter the harbor.\n\n(c) **Justify** whether this periodic model makes sense in an authentic maritime navigation context, identifying **two** real-world physical limitations.',
    katexSnippet: 'Sinusoidal models relate amplitude, equilibrium midline depth, and period to predict cyclical water levels',
    dataTable: {
      headers: ['Tide Phase', 'Observed Time', 'Water Depth (m)', 'Harbor Operational Status'],
      rows: [
        ['Low Tide 1', '03:00 (t = 3.0 h)', '4.20 m', 'Docking suspended (shallow)'],
        ['High Tide 1', '09:12 (t = 9.2 h)', '12.80 m', 'Safe for all vessels'],
        ['Low Tide 2', '15:24 (t = 15.4 h)', '4.20 m', 'Docking suspended (shallow)'],
        ['High Tide 2', '21:36 (t = 21.6 h)', '12.80 m', 'Safe for all vessels'],
      ],
      caption: 'Table 3: Harbor tidal cycle measurements',
    },
    hints: [
      'The equilibrium midline depth is the average of high tide and low tide: (12.80 + 4.20) / 2 = 8.50 meters.',
      'The amplitude is the maximum height above the midline: (12.80 - 4.20) / 2 = 4.30 meters.',
      'The period of one complete tidal cycle is from low tide to low tide (about 12.4 hours).',
      'For authentic limitations, consider weather storms, atmospheric pressure, and dredging silt accumulation.',
    ],
    markScheme: [
      '[1 mark] Correct midline calculation: 8.50 meters, and amplitude calculation: 4.30 meters.',
      '[1 mark] Correct period determination: 12.4 hours (half-cycle is 6.2 hours).',
      '[1 mark] Accurate sinusoidal model formulated with appropriate horizontal phase shift.',
      '[1 mark] Correct safe docking intervals: depths exceed 8.50 meters whenever the sinusoidal term is positive (roughly 6.1 hours per 12.4-hour cycle).',
      '[1 mark] Critical evaluation of real-life context: model accurately predicts cyclical lunar tides and provides clear operating windows.',
      '[1 mark] Identification of two realistic limitations (e.g. atmospheric storm surges altering water levels, and seasonal variations between spring and neap tides).',
    ],
    sampleSolution: '**Part (a): Formulating the Model:**\n1. Equilibrium midline depth = (12.80 m + 4.20 m) / 2 = 8.50 meters\n2. Amplitude = (12.80 m - 4.20 m) / 2 = 4.30 meters\n3. Period = 2 × (9.2 h - 3.0 h) = 12.4 hours\n4. Frequency coefficient = 2π / 12.4 ≈ 0.507 rad/hour\n5. Choosing a cosine model starting from low tide at t = 3.0 h: Depth(t) = 8.50 - 4.30 × cos(0.507 × (t - 3.0))\n\n**Part (b): Safe Docking Windows:**\nSafe docking requires depth ≥ 8.50 meters. Because 8.50 m is exactly the midline, the depth exceeds this threshold during the upper half of every cycle:\n- First window: from t = 6.1 h (06:06) to t = 12.3 h (12:18)\n- Second window: from t = 18.5 h (18:30) to t = 24.7 h (00:42 next day)\nTotal safe access time is approximately 12.4 hours per day.\n\n**Part (c): Real-World Validity & Limitations:**\n- **Contextual Validity:** The model provides harbor masters with clear operational schedules and safety clearances for maritime navigation.\n- **Limitation 1 (Meteorological Storm Surges):** Strong on-shore winds and low barometric atmospheric pressure can create storm surges that significantly alter water depth independently of astronomical tides.\n- **Limitation 2 (Spring vs Neap Tide Variations):** Lunar and solar alignments vary across the 28-day lunar month, meaning real tidal amplitudes fluctuate rather than remaining perfectly constant.',
    criteriaLevelRubric: [
      { level: 'Level 1-2', descriptor: 'Calculates basic amplitude or midline; does not formulate a periodic model.' },
      { level: 'Level 3-4', descriptor: 'Formulates periodic function and identifies docking windows, but offers superficial evaluation of limitations.' },
      { level: 'Level 5-6', descriptor: 'Formulates an accurate sinusoidal model, calculates docking windows correctly, and provides sophisticated real-world validation with realistic physical constraints.' },
    ],
  },
];

export const MISTAKES: MistakeRecord[] = [
  {
    id: 'mstk-101',
    questionId: 'q-phys-01',
    subjectId: 'physics',
    topicId: 'phys-u6',
    topicName: 'Physics — Electromagnetic Induction',
    questionTitle: 'Faraday’s Law Induced Voltage & Energy Conservation',
    criterion: 'C',
    strand: 'Processing and evaluating raw experimental data',
    errorType: 'Calculation',
    userNote: 'Forgot to add the internal resistance of the coil wire (0.50 ohms) to the load resistance (14.5 ohms), yielding an incorrect higher current.',
    actionPlan: 'Always draw a complete closed circuit diagram and label internal resistance in series with external components before calculating current.',
    date: '2026-09-24',
    resolved: false,
  },
  {
    id: 'mstk-102',
    questionId: 'q-chem-01',
    subjectId: 'chemistry',
    topicId: 'chem-u5',
    topicName: 'Chemistry — Chemical Kinetics',
    questionTitle: 'Reaction Rates, Temperature & Maxwell-Boltzmann Distributions',
    criterion: 'B',
    strand: 'Inquiring and designing — formulating hypotheses & variable control',
    errorType: 'Conceptual',
    userNote: 'Claimed that a 10°C temperature rise doubled the rate because particles collide twice as often. Examiner noted collision frequency only increases by ~1.7%.',
    actionPlan: 'Emphasize that the dominant factor is the exponential increase in particles possessing kinetic energy exceeding the activation energy threshold, not collision frequency.',
    date: '2026-09-25',
    resolved: false,
  },
  {
    id: 'mstk-103',
    questionId: 'q-math-01',
    subjectId: 'math-ext',
    topicId: 'math-ext-u4',
    topicName: 'Mathematics Extended — Periodic Functions',
    questionTitle: 'Coastal Tidal Depth Harmonic Function Modelling',
    criterion: 'D',
    strand: 'Applying mathematics in authentic real-life contexts',
    errorType: 'Data interpretation',
    userNote: 'Stated the model makes sense because "the calculations matched the numbers". Lost marks for not evaluating real physical constraints.',
    actionPlan: 'In Criterion D, always critique practical limitations such as meteorological weather surges and monthly spring/neap tidal fluctuations.',
    date: '2026-09-26',
    resolved: false,
  },
  {
    id: 'mstk-104',
    questionId: 'q-phys-01',
    subjectId: 'physics',
    topicId: 'phys-u6',
    topicName: 'Physics — Electromagnetic Induction',
    questionTitle: 'Faraday’s Law Induced Voltage & Energy Conservation',
    criterion: 'C',
    strand: 'Processing and evaluating raw experimental data',
    errorType: 'Careless',
    userNote: 'Used diameter instead of radius when calculating the cross-sectional area of the induction coil.',
    actionPlan: 'Check whether the problem statement specifies radius or diameter before calculating cross-sectional circular area.',
    date: '2026-09-27',
    resolved: true,
  },
];

export const MISTAKES_DATA = MISTAKES;

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'mock-phys-myp5',
    title: 'MYP 5 Physics On-Screen Examination',
    subjectId: 'physics',
    durationMinutes: 45,
    totalMarks: 24,
    questions: [QUESTIONS[0]],
    criteriaFocus: ['A', 'C'],
  },
  {
    id: 'mock-chem-myp5',
    title: 'MYP 5 Chemistry On-Screen Examination',
    subjectId: 'chemistry',
    durationMinutes: 45,
    totalMarks: 24,
    questions: [QUESTIONS[1]],
    criteriaFocus: ['B', 'D'],
  },
  {
    id: 'mock-mathext-myp5',
    title: 'MYP 5 Mathematics Extended On-Screen Examination',
    subjectId: 'math-ext',
    durationMinutes: 60,
    totalMarks: 30,
    questions: [QUESTIONS[2]],
    criteriaFocus: ['A', 'D'],
  },
];
