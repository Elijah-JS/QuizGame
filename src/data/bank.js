// src/data/bank.js
// KINE 3050 – Quiz #1 Master Bank (non-redundant; built from your slides & study guide)

// Decks used:
// - "Activism & History"
// - "Laws & Principles"
// - "IEP & LRE"
// - "Program Controls & Contraindications"
// - "Conditions: Early (0–5)"
// - "Conditions: School Age (6–21)"
// - "Conditions: Adults (21–50)"
// - "Conditions: 50+ & Aging"
// - "Benefits & Labeling"

export const BANK = [
  /* =========================
   * ACTIVISM & HISTORY
   * ========================= */
  {
    id: "ah_goal_movement_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Main goal of the Disability Rights Movement:",
    options: [
      "Increase charity programs for disabled people",
      "Remove institutional, physical, and societal barriers to equal participation",
      "Focus only on hospital-based rehab",
      "Keep disability as a private/family issue"
    ],
    answerIndex: 1,
    explain: "The movement reframed disability as a civil-rights issue aimed at barrier removal."
  },
  {
    id: "ah_pre1950s_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: Before the 1950s, disability was largely treated as a private/family matter with minimal public support.",
    answerBool: true,
    explain: "Public framing and policy action expanded significantly after the 1950s."
  },
  {
    id: "ah_fdr_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Why did FDR minimize his visible disability in public life?",
    options: [
      "He had fully recovered from polio",
      "He feared stigma and appearing weak during national crises",
      "He opposed the disability movement",
      "He wanted to set a new fashion trend"
    ],
    answerIndex: 1,
    explain: "Illustrates historical stigma prior to civil-rights framing."
  },
  {
    id: "ah_parents1950s_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: In the 1950s, parents often kept a low profile due to fears of stigma or institutionalization.",
    answerBool: true
  },
  {
    id: "ah_tim_nugent_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Tim Nugent’s research and advocacy primarily:",
    options: [
      "Created the Paralympic Games",
      "Established early barrier-free design standards (ramps, curb cuts, elevators) used in modern codes",
      "Eliminated Section 504",
      "Focused strictly on medical treatments"
    ],
    answerIndex: 1,
    explain: "He documented barriers and helped set the architectural groundwork for accessibility."
  },
  {
    id: "ah_independent_living_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "The Independent Living movement (Berkeley, 1960s) emphasized:",
    options: [
      "Professionals make all decisions for clients",
      "Self-direction and people with disabilities designing their own solutions",
      "Return to institutional care",
      "No political organization"
    ],
    answerIndex: 1,
    explain: "Edward Roberts and peers led a self-determination approach."
  },
  {
    id: "ah_core_domains_recall",
    deck: "Activism & History",
    type: "recall",
    prompt: "Name 4+ life domains targeted by the movement for equal opportunity.",
    expected: "Independent living; Employment; Education; Housing; Transportation; Recreation & leisure; Accessibility/safety",
    explain: "Know the breadth: not just school, but community life."
  },
  {
    id: "ah_judy_heumann_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: Judy Heumann helped lead the Section 504 sit-ins that pushed federal enforcement.",
    answerBool: true
  },

  /* =========================
   * LAWS & PRINCIPLES
   * ========================= */
  {
    id: "lp_architectural_barriers_act_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Architectural Barriers Act (1968) requires:",
    options: [
      "All buildings everywhere must be retrofitted",
      "Federally built/financed facilities to be accessible",
      "Only private gyms to be accessible",
      "No actual accessibility changes"
    ],
    answerIndex: 1
  },
  {
    id: "lp_504_scope_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Section 504 (PL 93-112, 1973) prohibits disability discrimination in:",
    options: [
      "Any program receiving federal financial assistance",
      "Private residences only",
      "Military bases only",
      "Healthcare settings only"
    ],
    answerIndex: 0,
    explain: "Requires reasonable accommodations; foundational anti-discrimination law."
  },
  {
    id: "lp_ada_scope_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "ADA (PL 101-336, 1990) extends civil-rights protections to:",
    options: [
      "Employment, public services (state/local), public accommodations & transportation",
      "K–12 education only",
      "Military service only",
      "Home schooling only"
    ],
    answerIndex: 0
  },
  {
    id: "lp_dev_disabilities_act_tf",
    deck: "Laws & Principles",
    type: "tf",
    prompt: "True/False: The Developmental Disabilities Assistance & Bill of Rights Act supports funding and advocacy protections for people with developmental disabilities.",
    answerBool: true
  },
  {
    id: "lp_amateur_sports_act_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Amateur Sports Act / Olympic & Amateur Sports Act requires:",
    options: [
      "Segregation of athletes with disabilities",
      "Equal opportunity for athletes with disabilities within amateur/Olympic systems",
      "Access only for elite disabled athletes",
      "No relation to disability sport"
    ],
    answerIndex: 1
  },
  {
    id: "lp_eha_idea_ideia_timeline_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Correct evolution of education law:",
    options: [
      "IDEIA → IDEA → EHA",
      "EHA (1975) → IDEA (1990) → IDEIA (2004)",
      "ADA → 504 → EHA",
      "504 → ADA → EHA"
    ],
    answerIndex: 1
  },
  {
    id: "lp_pe_explicit_tf",
    deck: "Laws & Principles",
    type: "tf",
    prompt: "True/False: Physical Education is explicitly included in IDEIA’s definition of special education.",
    answerBool: true
  },
  {
    id: "lp_ideia_7_principles_recall",
    deck: "Laws & Principles",
    type: "recall",
    prompt: "List the 7 IDEIA principles.",
    expected: "FAPE; Zero Reject/Child Find; Non-discriminatory Testing; IEP; LRE; Procedural Due Process; Caregiver Participation"
  },
  {
    id: "lp_fape_equipment_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Under FAPE, when specialized PE equipment is recommended:",
    options: [
      "Caregivers pay for it",
      "The district provides it at no cost to caregivers",
      "PE is exempt from FAPE",
      "Only high schoolers qualify"
    ],
    answerIndex: 1
  },
  {
    id: "lp_lre_core_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Least Restrictive Environment (LRE) primarily means:",
    options: [
      "Only segregated classes",
      "Placement in the most typical setting the student can benefit from, with supports; continuum allowed",
      "Placement based only on test scores",
      "Must match general-education pace or remove"
    ],
    answerIndex: 1
  },
  {
    id: "lp_due_process_tf",
    deck: "Laws & Principles",
    type: "tf",
    prompt: "True/False: Procedural due process includes prior written notice in caregivers’ native language and access to impartial hearings.",
    answerBool: true
  },

  /* =========================
   * IEP & LRE
   * ========================= */
  {
    id: "il_iep_must_include_mc",
    deck: "IEP & LRE",
    type: "mc",
    prompt: "An IEP must include:",
    options: [
      "Present levels and eligibility",
      "Goals/objectives and service dates",
      "Instructional strategies (program controls/contraindications), related services, equipment, review dates",
      "All of the above"
    ],
    answerIndex: 3
  },
  {
    id: "il_paradigm_recall",
    deck: "IEP & LRE",
    type: "recall",
    prompt: "State the effective intervention paradigm used in APE.",
    expected: "Assess → Plan → Implement → Evaluate → Feedback"
  },
  {
    id: "il_inclusion_def_mc",
    deck: "IEP & LRE",
    type: "mc",
    prompt: "Inclusion (in education/PE) is best described as:",
    options: [
      "Moving the person to services only",
      "Educating in the same schools/classrooms/gyms with supports brought to the student",
      "Only typical students in general PE",
      "No modifications allowed"
    ],
    answerIndex: 1
  },
  {
    id: "il_inclusion_principles_mc",
    deck: "IEP & LRE",
    type: "mc",
    prompt: "Key inclusion planning ideas include:",
    options: [
      "Portability of supports and natural proportions",
      "No supports",
      "Eliminate collaboration",
      "Services only in separate rooms"
    ],
    answerIndex: 0
  },

  /* =========================
   * PROGRAM CONTROLS & CONTRAINDICATIONS
   * ========================= */
  {
    id: "pc_diabetes_interval_scenario",
    deck: "Program Controls & Contraindications",
    type: "scenario",
    prompt: "Vigorous intervals planned. Student with diabetes: BG just measured at 85 mg/dL. Best immediate action:",
    options: [
      "Proceed without changes",
      "Provide fast-acting carbohydrate, recheck as per plan; coordinate insulin/snack timing; monitor",
      "Skip warm-up",
      "Ban all activity"
    ],
    answerIndex: 1,
    explain: "Prevent hypoglycemia; plan and monitor."
  },
  {
    id: "pc_asthma_coldair_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Asthma on a cold/dry air day. Best control:",
    options: [
      "Hard sprints without warm-up",
      "Move indoors if possible; gradual warm-up/cool-down; inhaler ready",
      "No medication access",
      "Ignore symptoms"
    ],
    answerIndex: 1
  },
  {
    id: "pc_blind_resistance_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Blind student starting resistance training. Best initial plan:",
    options: [
      "Randomly rearrange equipment weekly",
      "Machine-based resistance, consistent layout, tactile orientation, spotter",
      "Heavy free-weight Olympic lifts immediately",
      "No orientation allowed"
    ],
    answerIndex: 1
  },
  {
    id: "pc_deaf_signals_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Key PE adaptation for deaf/hard-of-hearing students:",
    options: [
      "Whistle-only starts/stops",
      "Visual start/stop cues (lights/flags/hand signals) and ensure line-of-sight",
      "No signals",
      "Random cues"
    ],
    answerIndex: 1
  },
  {
    id: "pc_arthritis_contra_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Generally contraindicated for symptomatic arthritis:",
    options: [
      "High-impact repetitive jumping and heavy end-range loading during flare",
      "Warm-water exercise and ROM",
      "Low-impact aerobic (bike/walk) with pacing",
      "Gentle isometrics"
    ],
    answerIndex: 0
  },
  {
    id: "pc_epilepsy_pool_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Epilepsy: which pool safety plan is best?",
    options: [
      "Unsupervised lap swim if seizures rare",
      "1:1 close supervision in water; know seizure plan and meds adherence",
      "Strobe-light dance warm-up",
      "High diving without harness"
    ],
    answerIndex: 1
  },
  {
    id: "pc_oi_contra_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Osteogenesis Imperfecta (OI): avoid:",
    options: [
      "Impact, contact, twisting/torque, heavy resistance, high fall-risk tasks",
      "Aquatics",
      "Gentle ROM",
      "Careful transfers"
    ],
    answerIndex: 0
  },

  /* =========================
   * CONDITIONS: EARLY (0–5)
   * ========================= */
  {
    id: "c05_id_definition_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Intellectual Disability includes:",
    options: [
      "IQ ≥ 100 and superior adaptive skills",
      "IQ ≈ < 70 with adaptive behavior deficits; onset before 18",
      "Only motor impairment",
      "Adult-onset memory loss"
    ],
    answerIndex: 1
  },
  {
    id: "c05_id_comorbid_tf",
    deck: "Conditions: Early (0–5)",
    type: "tf",
    prompt: "True/False: Common ID comorbidities include psychiatric conditions and epilepsy/CP.",
    answerBool: true
  },
  {
    id: "c05_id_program_controls_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Programming for ID should emphasize:",
    options: [
      "Complex, lengthy verbal directions",
      "Varied, fun practice (dance/swim), consistent routines, simplified rules, ETAT",
      "Only elimination games",
      "Avoidance of visuals"
    ],
    answerIndex: 1
  },
  {
    id: "c05_asd_features_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Common autism characteristics include:",
    options: [
      "Preference for chaotic environments",
      "Echolalia, insistence on routines, distress at change",
      "Sudden adult-onset paralysis",
      "High interest in elimination games"
    ],
    answerIndex: 1
  },
  {
    id: "c05_asd_activity_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "ASD PE programming should emphasize:",
    options: [
      "Unpredictable drills with loud music",
      "Visual schedules/ABA strategies and lifetime MVPA (dance, swim, yoga)",
      "Only high-contact sports",
      "No routine"
    ],
    answerIndex: 1
  },
  {
    id: "c05_cp_definition_tf",
    deck: "Conditions: Early (0–5)",
    type: "tf",
    prompt: "True/False: Cerebral Palsy is a non-progressive disorder of movement/posture from early brain motor-control damage.",
    answerBool: true
  },
  {
    id: "c05_cp_program_controls_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Helpful CP programming includes:",
    options: [
      "Ballistic jerky movements",
      "Swimming, gentle ROM, safe transfers, controlled resistance, patience",
      "Only static holds",
      "Maximal Oly lifts"
    ],
    answerIndex: 1
  },
  {
    id: "c05_deaf_identity_tf",
    deck: "Conditions: Early (0–5)",
    type: "tf",
    prompt: "True/False: Many in the Deaf community identify as a linguistic minority rather than disabled.",
    answerBool: true
  },
  {
    id: "c05_deaf_pa_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Best practice for Deaf/hard-of-hearing in PE:",
    options: [
      "Whistle-only cues",
      "Visual cues (lights/flags), clear sightlines, captions, basic ASL",
      "Turn away while speaking",
      "Random start/stop signals"
    ],
    answerIndex: 1
  },
  {
    id: "c05_blind_legalblind_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Legal blindness is typically:",
    options: [
      "20/40 with correction",
      "20/200 or worse in the better eye with best correction",
      "Color vision deficiency",
      "20/200 in the worse eye only"
    ],
    answerIndex: 1
  },
  {
    id: "c05_blind_controls_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Program controls for blind/VI:",
    options: [
      "Frequent layout changes",
      "Tactile/auditory orientation, uncluttered space, guides if needed",
      "No orientation",
      "High platforms only"
    ],
    answerIndex: 1
  },

  /* =========================
   * CONDITIONS: SCHOOL AGE (6–21)
   * ========================= */
  {
    id: "c621_ld_definition_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "Learning Disability is a disorder in:",
    options: [
      "Basic psychological processes for understanding/using language",
      "Only motor skills",
      "Vision only",
      "Hearing only"
    ],
    answerIndex: 0
  },
  {
    id: "c621_ld_exclusionary_tf",
    deck: "Conditions: School Age (6–21)",
    type: "tf",
    prompt: "True/False: LD is not primarily due to sensory disabilities, intellectual disability, or environmental/economic disadvantage.",
    answerBool: true
  },
  {
    id: "c621_ld_pa_controls_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "Effective LD instruction in PE should:",
    options: [
      "Use short cues, modeling, fixed routines; manage distractions (figure–ground); ETAT",
      "Be lecture-only",
      "Avoid structure",
      "Use punishment primarily"
    ],
    answerIndex: 0
  },
  {
    id: "c621_ed_definition_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "Under IDEIA, Emotional Disturbance refers to:",
    options: [
      "A brief mood swing",
      "A long-term marked condition affecting education (e.g., inappropriate behaviors/feelings under normal conditions)",
      "Only delinquency",
      "Only anxiety"
    ],
    answerIndex: 1
  },
  {
    id: "c621_ed_program_controls_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "Program controls for ED/BD include:",
    options: [
      "ABA behavior plans, conflict resolution, clear rules, high praise ratio, warm aquatics",
      "Chaotic routines",
      "Public shaming",
      "Ignoring transitions"
    ],
    answerIndex: 0
  },
  {
    id: "c621_sci_controls_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "SCI programming should prioritize:",
    options: [
      "Assume fragility and avoid exercise",
      "Independence, accessible space, safe transfers, pressure relief, adapted equipment",
      "Only contact sports",
      "Ignore seating/skin care"
    ],
    answerIndex: 1
  },
  {
    id: "c621_dmd_signs_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "Classic DMD sign:",
    options: [
      "Gowers’ sign and calf pseudohypertrophy",
      "Only sensory loss",
      "Hyperreflexia only",
      "No early motor delay"
    ],
    answerIndex: 0
  },
  {
    id: "c621_dmd_contra_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "For DMD avoid:",
    options: [
      "Maximal eccentrics, high-impact running/jumping, exhaustive bouts",
      "Gentle ROM",
      "Hydration and rest breaks",
      "Positioning aids"
    ],
    answerIndex: 0
  },
  {
    id: "c621_diabetes_controls_scenario",
    deck: "Conditions: School Age (6–21)",
    type: "scenario",
    prompt: "Diabetes + vigorous circuit planned. Best practice:",
    options: [
      "No snack access",
      "Check glucose, have fast carbs ready, plan insulin/snacks, hydrate, monitor",
      "Ban activity",
      "Skip warm-up"
    ],
    answerIndex: 1
  },
  {
    id: "c621_epilepsy_heights_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "Epilepsy and heights:",
    options: [
      "Allowed without harness",
      "Use harness/avoid heights; pool requires 1:1 close supervision; follow seizure plan",
      "Flashing lights are recommended",
      "No need to know seizure type"
    ],
    answerIndex: 1
  },

  /* =========================
   * CONDITIONS: ADULTS (21–50)
   * ========================= */
  {
    id: "c2150_ra_definition_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "Rheumatoid Arthritis primarily involves:",
    options: [
      "Acute muscle tear only",
      "Autoimmune synovial inflammation causing joint damage/deformity risk",
      "Bone cancer",
      "Only tendonitis"
    ],
    answerIndex: 1
  },
  {
    id: "c2150_ra_controls_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "RA program controls include:",
    options: [
      "High-impact plyometrics during flares",
      "Low-impact aerobic, ROM/flexibility, gentle strength in pain-free ranges, frequent rest",
      "Prolonged exhaustive sessions",
      "Forceful end-range stretching of inflamed joints"
    ],
    answerIndex: 1
  },
  {
    id: "c2150_back_pain_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "Chronic non-specific back pain: best approach is:",
    options: [
      "Bed rest indefinitely",
      "Core stabilization, gentle mobility, graded exposure; walking/aquatics/yoga with technique coaching",
      "Loaded spinal flexion/rotation early",
      "Ignore pain signals"
    ],
    answerIndex: 1
  },
  {
    id: "c2150_mh_tf",
    deck: "Conditions: Adults (21–50)",
    type: "tf",
    prompt: "True/False: Regular PA can improve mood, anxiety, sleep, and cognition in common mental-health conditions.",
    answerBool: true
  },
  {
    id: "c2150_ms_controls_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "MS programming should emphasize:",
    options: [
      "Overheating to build tolerance",
      "Cooling strategies, fatigue-managed sessions, balance/gait/core work, frequent rests",
      "Maximal intensity daily",
      "Static stretching only"
    ],
    answerIndex: 1
  },
  {
    id: "c2150_pd_controls_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "For Parkinson’s disease, best practices include:",
    options: [
      "Rhythmic full-body movement (dance/tai chi), cueing (metronome/visual), balance/posture work",
      "Dual-task gait training on day one",
      "Rushing transitions",
      "Only machine strength"
    ],
    answerIndex: 0
  },
  {
    id: "c2150_cvd_controls_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "Cardiovascular condition programming:",
    options: [
      "Skip clearance and start HIIT",
      "Gradual aerobic build with HR/BP/RPE monitoring, warm-up/cool-down; add light–moderate resistance",
      "Only isometrics",
      "No breathing/pacing cues"
    ],
    answerIndex: 1
  },
  {
    id: "c2150_hiv_tf",
    deck: "Conditions: Adults (21–50)",
    type: "tf",
    prompt: "True/False: For HIV, moderate PA supports function and mood; avoid overtraining and follow standard precautions.",
    answerBool: true
  },
  {
    id: "c2150_lupus_controls_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "Lupus (SLE) program controls include:",
    options: [
      "Train through flares/fever",
      "Low-impact activity, flexible scheduling around flares, stress reduction; sun protection as needed",
      "Extreme heat training",
      "Ignore fatigue"
    ],
    answerIndex: 1
  },

  /* =========================
   * CONDITIONS: 50+ & AGING
   * ========================= */
  {
    id: "c50_mobility_controls_mc",
    deck: "Conditions: 50+ & Aging",
    type: "mc",
    prompt: "Mobility/physical function limitations (older adults): good programming includes:",
    options: [
      "High-impact, unstable tasks",
      "Chair-based, aquatic, or supported standing exercise; balance, core stability; adapt equipment",
      "Exclude assistive devices",
      "Ignore fatigue"
    ],
    answerIndex: 1
  },
  {
    id: "c50_sensory_controls_mc",
    deck: "Conditions: 50+ & Aging",
    type: "mc",
    prompt: "Sensory disability (vision/hearing) programming should:",
    options: [
      "Rely on a single cue method",
      "Use verbal/tactile orientation for vision, visual/written prompts for hearing; reduce clutter/noise; ensure lighting",
      "Assume inability based on sensory loss",
      "Keep spaces dim/noisy"
    ],
    answerIndex: 1
  },
  {
    id: "c50_cognitive_controls_mc",
    deck: "Conditions: 50+ & Aging",
    type: "mc",
    prompt: "Cognitive disability (e.g., dementia) programming should prioritize:",
    options: [
      "Complex multi-step rapid instructions",
      "Structured, repetitive routines; familiar rhythmic activities; clear demonstrations; ETA/ETAT",
      "Loud, chaotic settings",
      "Rushing for quick responses"
    ],
    answerIndex: 1
  },
  {
    id: "c50_chronic_controls_mc",
    deck: "Conditions: 50+ & Aging",
    type: "mc",
    prompt: "Chronic-illness functional limits (heart disease, COPD, stroke, etc.)—best practice:",
    options: [
      "Ignore vital signs",
      "Medical clearance when indicated; start low–moderate; rest breaks; monitor HR/BP/O₂",
      "Max intensity from day one",
      "Exercise during acute infection"
    ],
    answerIndex: 1
  },

  /* =========================
   * BENEFITS & LABELING
   * ========================= */
  {
    id: "bl_benefits_lifespan_recall",
    deck: "Benefits & Labeling",
    type: "recall",
    prompt: "List 4+ benefits of physical activity across the lifespan ('diapers to diapers').",
    expected: "Motor development; cardiovascular health; bone/strength; mood/cognition; social connection; independence and fall reduction in older age"
  },
  {
    id: "bl_labeling_adv_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "One advantage of labeling (Henley/Ramsey/Algozzine) is:",
    options: [
      "Perfect diagnostic reliability",
      "Organizes funding, common language among professionals, and advocacy focus",
      "Eliminates stereotypes",
      "Removes need for assessment"
    ],
    answerIndex: 1
  },
  {
    id: "bl_labeling_disadv_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "One disadvantage of labeling is:",
    options: [
      "Always raises expectations",
      "Can lower expectations, promote stereotyping, and delay help until labeled",
      "Guarantees early services",
      "Eliminates parent guilt"
    ],
    answerIndex: 1
  },
  {
    id: "bl_eta_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Ecological Task Analysis adapts task/environment/learner variables so all can succeed.",
    answerBool: true
  },

  /* =========================
   * HIGH-YIELD SCENARIOS (mixed)
   * ========================= */
  {
    id: "scen_polling_ada_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: Inaccessible polling places can violate ADA Title II.",
    answerBool: true
  },
  {
    id: "scen_sidewalks_504_ada_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "City rebuilds sidewalks with no curb ramps. Which laws apply?",
    options: [
      "IDEIA only",
      "ADA Title II / Section 504 (if federal funds used)",
      "FERPA",
      "HIPAA"
    ],
    answerIndex: 1
  },
  {
    id: "scen_ms_heat_sensitivity_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "MS student fatigues in hot gym. Best immediate shift:",
    options: [
      "Increase sprinting",
      "Cooler setting, rest breaks, moderate intensity; consider cool pool",
      "Max heavy lifts",
      "No changes"
    ],
    answerIndex: 1
  },
  {
    id: "scen_pd_freezing_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "PD student experiences gait freezing. Best coaching cue:",
    options: [
      "“Hurry up!”",
      "Use rhythmic cueing (metronome), visual lines, BIG movements, calm reset",
      "Dual-task while walking",
      "Turn off all cues"
    ],
    answerIndex: 1
  },
  {
    id: "scen_ld_figure_ground_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "LD student struggles with figure–ground. Best class change:",
    options: [
      "Increase visual clutter",
      "Remove clutter; enhance relevant cues; simplify environment; consistent routines",
      "Faster, complex directions",
      "Louder music"
    ],
    answerIndex: 1
  },
  {
    id: "scen_ed_transitions_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "ED/BD student escalates during transitions. Best approach:",
    options: [
      "Randomize transitions",
      "Predictable formations/routines; pre-correct; reinforce; conflict-resolution skills",
      "Public reprimand first",
      "Ignore behavior"
    ],
    answerIndex: 1
  },
  {
    id: "scen_blind_orient_scenario",
    deck: "Program Controls & Contraindications",
    type: "scenario",
    prompt: "Blind/VI learner entering a new gym space. Best initial step:",
    options: [
      "Start scrimmage immediately",
      "Provide tactile ‘walk-through’ of boundaries/equipment, consistent layout, auditory cues",
      "Dim the lights",
      "Scatter small obstacles to train agility"
    ],
    answerIndex: 1
  },
  {
    id: "scen_ra_flare_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "RA flare day. Best class modification:",
    options: [
      "Force end-range stretches through pain",
      "Reduce impact; warm-up longer; light ROM and aquatic options; frequent rest",
      "Max eccentric loading",
      "Ignore pain"
    ],
    answerIndex: 1
  }
];
