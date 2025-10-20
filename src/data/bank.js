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
    answerBool: true,
    explain: "Low public visibility reflected stigma and lack of rights protections."
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
    explain: "Nugent helped prototype the built-environment changes adopted widely later."
  },
  {
    id: "ah_barrier_free_ansi_sa",
    deck: "Activism & History",
    type: "sa",
    prompt: "Name the early U.S. consensus standard (year + gist) that predated ADA and targeted accessibility in buildings.",
    answer: "ANSI 1961: 'Making Buildings Accessible to and Usable by the Physically Handicapped.' Non-enforceable until adopted by states.",
    explain: "Barrier-free design gained technical footing before federal enforcement."
  },
  {
    id: "ah_ud_mace_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Who coined 'Universal Design' and what problem was it solving?",
    options: [
      "Ludwig Guttmann; to expand Paralympic classification",
      "Ronald Mace; to move beyond late, segregated, costly 'add-on' accessibility",
      "Oscar Pistorius; to balance prosthesis length rules",
      "Eleanor Roosevelt; to advance hospital charity"
    ],
    answerIndex: 1,
    explain: "UD = design usable by all, to the greatest extent possible, without later adaptation."
  },
  {
    id: "ah_pistorius_cas_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: The CAS ruling in the Pistorius case allowed prosthesis users in IAAF events when no unfair advantage could be proven.",
    answerBool: true,
    explain: "Case broadened inclusion debates and evidence standards."
  },
  {
    id: "ah_mcfadden_case_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "The Tatyana McFadden case in Maryland directly contributed to:",
    options: [
      "Repealing IDEA",
      "The MD Fitness & Athletics Equity Act (wheelchair racing and inclusion in school athletics)",
      "Banning adaptive sport in high schools",
      "Eliminating 504 protections"
    ],
    answerIndex: 1,
    explain: "Activated state-level inclusion mandates with ripple effects."
  },
  {
    id: "ah_charity_vs_rights_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Which framing best reflects the shift championed by disability activists?",
    options: [
      "Charity model: kindness when convenient",
      "Rights-based model: enforceable access and equal participation",
      "Medical model only: cure impairment first",
      "Fitness model: prioritize elite performance"
    ],
    answerIndex: 1,
    explain: "The rights-based model moves from optional charity to enforceable civil rights."
  },
  {
    id: "ah_curb_cuts_benefit_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: Curb cuts primarily help wheelchair users and are rarely useful to others.",
    answerBool: false,
    explain: "They benefit many (strollers, carts, luggage), illustrating UD’s 'helps everyone' effect."
  },
  {
    id: "ah_tokenism_example_sa",
    deck: "Activism & History",
    type: "sa",
    prompt: "Give one example of tokenism in sport programs.",
    answer: "Featuring one disabled athlete on marketing but keeping rules/equipment/space unchanged so most disabled athletes cannot actually participate.",
    explain: "Tokenism signals inclusion without structural change."
  },
  {
    id: "ah_disability_prevalence_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Which estimate best matches disability prevalence used in the talk?",
    options: ["1–2% globally", "5–8% globally", "15–20% globally", "40–50% globally"],
    answerIndex: 2,
    explain: "The global estimate used was ~15–20% (>1B people), highlighting scale."
  },
  {
    id: "ah_symbol_policy_link_sa",
    deck: "Activism & History",
    type: "sa",
    prompt: "What policy/budget step should accompany adopting an 'active' wheelchair symbol?",
    answer: "Pair symbol change with inclusive design budgets, staff training, and coverage targets so inclusion is default, not optics.",
    explain: "Symbols without resources = tokenism."
  },

  /* =========================
   * LAWS & PRINCIPLES
   * ========================= */
  {
    id: "lp_504_scope_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Section 504 of the Rehabilitation Act (1973) prohibits disability discrimination in:",
    options: [
      "Only private clubs",
      "Federally funded programs and activities (e.g., public schools, universities)",
      "Small businesses under 15 employees only",
      "Professional sports leagues only"
    ],
    answerIndex: 1,
    explain: "504 predates ADA and anchors rights in federally funded settings."
  },
  {
    id: "lp_ada_titleII_tf",
    deck: "Laws & Principles",
    type: "tf",
    prompt: "True/False: ADA Title II applies to state and local government services (including parks & rec).",
    answerBool: true,
    explain: "Public entities must ensure program accessibility and effective communication."
  },
  {
    id: "lp_uncrpd_305_sa",
    deck: "Laws & Principles",
    type: "sa",
    prompt: "Cite the UN CRPD article relevant to recreation, leisure, and sport and its core message.",
    answer: "Article 30.5 — recognizes the right of persons with disabilities to participate in recreational, leisure, and sporting activities.",
    explain: "Frames PA/sport as a right, not a luxury."
  },
  {
    id: "lp_dear_colleague_2013_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "The 2013 'Dear Colleague' letter clarified that schools must:",
    options: [
      "Offer only separate programs for students with disabilities",
      "Provide equal opportunity for participation in PE and interscholastic athletics, and avoid unnecessary segregation",
      "Wait for medical clearance for any activity",
      "Defer all decisions to external clinics"
    ],
    answerIndex: 1,
    explain: "Separate/different services when unnecessary are discriminatory."
  },
  {
    id: "lp_rights_not_favors_tf",
    deck: "Laws & Principles",
    type: "tf",
    prompt: "True/False: Reasonable accommodations in employment are legal rights, not favors.",
    answerBool: true,
    explain: "ADA and 504 require accommodations barring undue hardship."
  },
  {
    id: "lp_ada_titles_match",
    deck: "Laws & Principles",
    type: "match",
    prompt: "Match ADA titles to scope.",
    pairs: [
      ["Title I", "Employment"],
      ["Title II", "State and local government services (e.g., parks & rec)"],
      ["Title III", "Public accommodations (private businesses open to the public)"],
      ["Title IV", "Telecommunications"],
    ],
    explain: "Knowing scopes guides where to assert rights and plan modifications."
  },
  {
    id: "lp_504_vs_idea_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "Which statement best contrasts Section 504 and IDEA?",
    options: [
      "504 is only for academics; IDEA is for athletics",
      "504 prohibits discrimination broadly in federally funded entities; IDEA governs special education services/IEPs",
      "IDEA only covers college; 504 only covers K–12",
      "They are identical in scope"
    ],
    answerIndex: 1,
    explain: "504 is an anti-discrimination civil-rights law; IDEA structures special education and IEPs."
  },
  {
    id: "lp_undue_burden_sa",
    deck: "Laws & Principles",
    type: "sa",
    prompt: "Define 'undue burden' in the ADA/504 context and give one example.",
    answer: "A modification that would impose significant difficulty or expense relative to resources. Example: A small, cash-strapped youth club may not be required to immediately rebuild its entire facility, but must still offer reasonable program modifications.",
    explain: "Balancing feasibility with rights; cannot be used to justify inaction when reasonable options exist."
  },

  /* =========================
   * IEP & LRE
   * ========================= */
  {
    id: "il_iepscope_mc",
    deck: "IEP & LRE",
    type: "mc",
    prompt: "The 'Least Restrictive Environment' (LRE) principle means:",
    options: [
      "Students must always be in general PE without supports",
      "Placement is individualized and as inclusive as possible with needed supports",
      "Students should be segregated for safety by default",
      "Only academic classes apply, not PE"
    ],
    answerIndex: 1,
    explain: "LRE balances access, support, and individual needs; PE is part of it."
  },
  {
    id: "il_iepteammembers_ma",
    deck: "IEP & LRE",
    type: "ma",
    prompt: "Select all that typically participate in the IEP process for PE decisions:",
    options: [
      "Parent/guardian",
      "Student (when appropriate)",
      "General PE teacher",
      "Special education teacher",
      "Administrator/designee",
      "Paraprofessional or related service providers"
    ],
    answerIndexes: [0,1,2,3,4,5],
    explain: "Collaborative team determines goals, supports, accommodations."
  },
  {
    id: "il_dearcolleague_pe_sa",
    deck: "IEP & LRE",
    type: "sa",
    prompt: "State one PE-specific implication of the 2013 Dear Colleague letter.",
    answer: "Schools must offer students with disabilities an equal opportunity to participate in PE and interscholastic sports, with reasonable modifications and aids, and avoid unnecessary separate programs.",
    explain: "Equality of opportunity applies to athletics as well as academics."
  },
  {
    id: "il_assim_vs_accom_mc",
    deck: "IEP & LRE",
    type: "mc",
    prompt: "Which is an example of accommodation (not assimilation) in PE?",
    options: [
      "Requiring the student to perform identical fitness tests without supports",
      "Allowing rule modifications and alternate roles to enable meaningful participation",
      "Excusing the student entirely from PE",
      "Assigning only scorekeeping every class"
    ],
    answerIndex: 1,
    explain: "Accommodation changes how the student participates, not whether they can."
  },
  {
    id: "il_smart_goals_tf",
    deck: "IEP & LRE",
    type: "tf",
    prompt: "True/False: IEP PE goals should be specific, measurable, achievable, relevant, and time-bound (SMART).",
    answerBool: true,
    explain: "SMART goals clarify expectations and progress."
  },
  {
    id: "il_access_accommodations_sa",
    deck: "IEP & LRE",
    type: "sa",
    prompt: "Give two examples of PE accommodations that support LRE.",
    answer: "Visual schedules and rule cards; alternate roles (defense/passing); adapted scoring; assistive tech; extra processing time; proximity and peer supports.",
    explain: "Accommodations preserve participation while respecting needs."
  },

  /* =========================
   * PROGRAM CONTROLS & CONTRAINDICATIONS
   * ========================= */
  {
    id: "pc_screening_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Best first step when initiating PA with complex conditions:",
    options: [
      "Delay indefinitely until maximal testing is available",
      "Take history/PE, stratify risk, start light and progress as tolerated",
      "Begin high-intensity intervals immediately",
      "Only strength training, no aerobic exercise"
    ],
    answerIndex: 1,
    explain: "Guidelines endorse starting low and progressing; testing is helpful but should not block participation."
  },
  {
    id: "pc_concussion_berlin_tf",
    deck: "Program Controls & Contraindications",
    type: "tf",
    prompt: "True/False: Berlin (2017) guidance supports gradual sub-symptom activity 24–48 hours after concussion rather than strict prolonged rest.",
    answerBool: true,
    explain: "Shifted from bed rest to controlled early activity."
  },
  {
    id: "pc_sci_risks_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Unique risks in SCI athletes include higher risk of:",
    options: [
      "Lower limb ACL tears",
      "Heat illness (autonomic dysfunction), orthostatic hypotension, autonomic dysreflexia, skin breakdown",
      "Altitude sickness only",
      "Type 1 diabetes"
    ],
    answerIndex: 1,
    explain: "Autonomic issues + equipment interface raise distinctive risks."
  },
  {
    id: "pc_shoulder_paralympians_tf",
    deck: "Program Controls & Contraindications",
    type: "tf",
    prompt: "True/False: Paralympians tend to have more upper-extremity injuries (e.g., shoulder) compared to Olympians’ typical lower-extremity profiles.",
    answerBool: true,
    explain: "Wheelchair propulsion and transfers stress shoulders."
  },
  {
    id: "pc_epilepsy_flag_sa",
    deck: "Program Controls & Contraindications",
    type: "sa",
    prompt: "Name one control for a participant with epilepsy engaging in PA.",
    answer: "Monitor triggers; ensure supervision and seizure plan; water activities with precautions; avoid sleep deprivation; consistent medication routines.",
    explain: "Safety planning enables participation."
  },
  {
    id: "pc_skin_check_tf",
    deck: "Program Controls & Contraindications",
    type: "tf",
    prompt: "True/False: Routine skin checks around equipment interfaces are essential for wheelchair users and prosthesis users.",
    answerBool: true,
    explain: "Prevents pressure injury and infection."
  },
  {
    id: "pc_autonomic_dysreflexia_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Signs of autonomic dysreflexia (SCI at/above T6) during training include:",
    options: [
      "Bradycardia only, cold skin below level, no headache",
      "Sudden severe headache, flushing/sweating above lesion, piloerection, nasal congestion, elevated BP",
      "Only thirst",
      "Isolated calf cramp"
    ],
    answerIndex: 1,
    explain: "AD is a medical emergency; stop activity, sit upright, loosen clothing, search for triggers (bladder/bowel/skin), and activate protocols."
  },
  {
    id: "pc_heat_illness_prevent_sa",
    deck: "Program Controls & Contraindications",
    type: "sa",
    prompt: "List two preventive steps for heat illness in athletes with autonomic dysfunction.",
    answer: "Pre-cooling and scheduled cooling breaks; aggressive hydration; avoid peak heat; monitor for signs (dizziness, flushing) and adjust intensity.",
    explain: "Autonomic impairment reduces thermoregulation."
  },
  {
    id: "pc_pressure_relief_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Which practice helps prevent pressure injuries during seated training?",
    options: [
      "Static sitting without breaks",
      "Routine pressure reliefs (weight shifts), proper cushioning, skin checks",
      "Tight straps to reduce movement",
      "Skipping equipment adjustments"
    ],
    answerIndex: 1,
    explain: "Regular offloading and fit checks protect skin integrity."
  },

  /* =========================
   * CONDITIONS: EARLY (0–5)
   * ========================= */
  {
    id: "c_early_devplay_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "Most appropriate PA focus for 0–5 with motor delays:",
    options: [
      "High-load resistance programs",
      "Play-based gross motor practice with varied sensory input and caregiver coaching",
      "Endurance-only treadmill work",
      "Only seated tasks to reduce falls"
    ],
    answerIndex: 1,
    explain: "Motor learning thrives on play, repetition, and supportive environments."
  },
  {
    id: "c_early_cp_tf",
    deck: "Conditions: Early (0–5)",
    type: "tf",
    prompt: "True/False: In young children with CP, task-specific practice and supported standing can aid function alongside fun, social play.",
    answerBool: true,
    explain: "Function + enjoyment matter in adherence and development."
  },
  {
    id: "c_early_caregiver_sa",
    deck: "Conditions: Early (0–5)",
    type: "sa",
    prompt: "One way to reduce caregiver overprotectiveness while keeping safety:",
    answer: "Provide coaching on graded risk, use safe environments, set achievable goals, and celebrate small wins to build confidence.",
    explain: "Empowered caregivers enable participation."
  },
  {
    id: "c_early_sensory_mc",
    deck: "Conditions: Early (0–5)",
    type: "mc",
    prompt: "For toddlers with sensory modulation challenges, PE/play should emphasize:",
    options: [
      "Unpredictable loud environments only",
      "Predictable routines, gradual exposure, and multiple sensory channels (visual, tactile, auditory) with choice",
      "Only verbal instructions",
      "No caregiver involvement"
    ],
    answerIndex: 1,
    explain: "Perceptible info + simple/intuitive structure supports engagement."
  },

  /* =========================
   * CONDITIONS: SCHOOL AGE (6–21)
   * ========================= */
  {
    id: "c_school_lre_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "A 9th grader with spina bifida in general PE wants team play. Best LRE-aligned step:",
    options: [
      "Assign only equipment setup forever",
      "Provide mixed-role options (passing/defense), seated volleyball nights, and arm-erg conditioning within class",
      "Exclude from all ball sports",
      "Require varsity tryout only"
    ],
    answerIndex: 1,
    explain: "Meaningful roles + adapted rules preserve team participation."
  },
  {
    id: "c_school_autism_tf",
    deck: "Conditions: School Age (6–21)",
    type: "tf",
    prompt: "True/False: For autistic students, clear visual schedules, simplified rules, and predictable routines can increase PE engagement.",
    answerBool: true,
    explain: "Perceptible information + simple/intuitive UD principles."
  },
  {
    id: "c_school_concussion_sa",
    deck: "Conditions: School Age (6–21)",
    type: "sa",
    prompt: "State a return-to-learn/play principle after mild TBI.",
    answer: "Gradual, stepwise increase in cognitive and physical activity below symptom threshold; monitor and progress only if asymptomatic.",
    explain: "Berlin 2017 style progression."
  },
  {
    id: "c_school_transport_mc",
    deck: "Conditions: School Age (6–21)",
    type: "mc",
    prompt: "A common barrier for after-school adaptive sport is:",
    options: [
      "Lack of interest only",
      "Accessible transportation and late buses",
      "Overabundance of adaptive coaches",
      "Excess media coverage"
    ],
    answerIndex: 1,
    explain: "Transportation is a top modifiable barrier for youth participation."
  },

  /* =========================
   * CONDITIONS: ADULTS (21–50)
   * ========================= */
  {
    id: "c_adult_stroke_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "Evidence-based benefits of PA post-stroke include gains in:",
    options: [
      "Only biceps size",
      "Cardiometabolic fitness, ambulation, mood (↓depression), cognition; ↓post-stroke fatigue",
      "None; activity is unsafe",
      "Vision only"
    ],
    answerIndex: 1,
    explain: "AHA-aligned multi-domain improvements."
  },
  {
    id: "c_adult_tbi_mc",
    deck: "Conditions: Adults (21–50)",
    type: "mc",
    prompt: "For moderate–severe TBI, small trials show improvements particularly in:",
    options: [
      "Trail-making and other executive tasks with structured aerobic training",
      "Only VO2max",
      "No measurable outcomes",
      "Bone density exclusively"
    ],
    answerIndex: 0,
    explain: "Cognitive gains reported in small controlled studies."
  },
  {
    id: "c_adult_sci_guideline_tf",
    deck: "Conditions: Adults (21–50)",
    type: "tf",
    prompt: "True/False: Recent SCI guidelines suggest ≥30 minutes, 3×/week, moderate–vigorous PA at minimum for cardiometabolic health.",
    answerBool: true,
    explain: "This is a floor, not a ceiling; FES can augment 'whole-body' stimulus."
  },
  {
    id: "c_adult_depression_sa",
    deck: "Conditions: Adults (21–50)",
    type: "sa",
    prompt: "Name one mental-health benefit of regular PA relevant to adults with disabilities.",
    answer: "Reduced depression/anxiety, improved self-efficacy, and enhanced social connection.",
    explain: "Psychological benefits are central to participation and employment."
  },

  /* =========================
   * CONDITIONS: 50+ & AGING
   * ========================= */
  {
    id: "c_aging_udbenefit_tf",
    deck: "Conditions: 50+ & Aging",
    type: "tf",
    prompt: "True/False: UD features (e.g., lever handles, power-assist doors, clear signage) benefit older adults and reduce fatigue and falls.",
    answerBool: true,
    explain: "UD helps across the lifespan, not just disability categories."
  },
  {
    id: "c_aging_joint_mc",
    deck: "Conditions: 50+ & Aging",
    type: "mc",
    prompt: "An older adult with knee OA asks for cardio options. UD-aligned, joint-friendly choice:",
    options: [
      "High-impact sprinting",
      "Arm ergometer or recumbent cycle with adjustable entry height and stable transfers",
      "Only stair running",
      "Plyometric jumps"
    ],
    answerIndex: 1,
    explain: "Low-effort access + flexible equipment options reduce barriers."
  },
  {
    id: "c_aging_visual_sa",
    deck: "Conditions: 50+ & Aging",
    type: "sa",
    prompt: "One perceptible-information upgrade that aids aging users with low vision in gyms:",
    answer: "High-contrast, large-print labels and tactile markers on equipment; audible prompts; clear floor markings.",
    explain: "UD Principle—Perceptible Information."
  },
  {
    id: "c_aging_balance_tf",
    deck: "Conditions: 50+ & Aging",
    type: "tf",
    prompt: "True/False: Balance and power training can reduce fall risk and improve function for older adults, including those with disabilities.",
    answerBool: true,
    explain: "Programming should include safe, progressive neuromotor elements."
  },

  /* =========================
   * BENEFITS & LABELING
   * ========================= */
  {
    id: "bl_benefits_global_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which is most accurate about PA for people with disabilities?",
    options: [
      "Mainly therapeutic; not real sport",
      "A right and health resource that improves function, mental health, social inclusion, and independence",
      "Unsafe in most cases",
      "Only useful for elite athletes"
    ],
    answerIndex: 1,
    explain: "Reframe from 'therapy only' to authentic participation and health."
  },
  {
    id: "bl_labeling_expectancy_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Labels can trigger self-fulfilling expectations in schools and clinics.",
    answerBool: true,
    explain: "Language shapes opportunity, expectations, and confidence."
  },
  {
    id: "bl_person_first_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Language choice that avoids 'othering' in general contexts:",
    options: [
      "‘The disabled’ as a single category",
      "Person-first or identity-first based on community preference and individual choice",
      "Comic relief metaphors",
      "Euphemisms that obscure reality (e.g., 'differently-abled' only)"
    ],
    answerIndex: 1,
    explain: "Respect autonomy and lived language preferences."
  },
  {
    id: "bl_inspiration_porn_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: 'Inspiration' narratives that praise basic participation can hide systemic barriers and reinforce ableist hierarchies.",
    answerBool: true,
    explain: "Tokenism distracts from policy and design fixes."
  },
  {
    id: "bl_labeling_scenario_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "A clinic note calls a patient 'noncompliant' after missing a class that had no accessible transport. Best reframing:",
    options: [
      "Maintain 'noncompliant'—accuracy matters",
      "Note the environmental barrier (transport), offer options, and avoid pejorative labels",
      "Remove the patient from the program",
      "Ignore attendance entirely"
    ],
    answerIndex: 1,
    explain: "Language should identify barriers and solutions, not blame the patient."
  },

  /* =========================
   * ABLEISM vs DISABLISM
   * ========================= */
  {
    id: "ad_compare_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "In one sentence each, define Ableism (beliefs) vs Disablism (systems) and give one example of each.",
    answer: "Ableism: Belief that non-disabled ways of being are 'normal/superior'—e.g., assuming a wheelchair user can’t be competitive. Disablism: Systemic actions/policies that exclude—e.g., gym with narrow aisles that block chair users.",
    explain: "Beliefs inform systems; systems enact exclusion."
  },
  {
    id: "ad_detect_tokenism_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which scenario best illustrates disablism rather than just ableist attitudes?",
    options: [
      "A coach privately doubts ability but still adapts drills",
      "A facility’s policies require physician clearance for disabled participants only, regardless of activity risk",
      "A peer asks awkward questions about a prosthesis",
      "A teammate offers unsolicited help once"
    ],
    answerIndex: 1,
    explain: "A systemic rule applied unequally is institutional disablism."
  },

  /* =========================
   * UNIVERSAL DESIGN (UD)
   * ========================= */
  {
    id: "ud_principles_match",
    deck: "Laws & Principles",
    type: "match",
    prompt: "Match UD principle to a PA example.",
    pairs: [
      ["Equitable Use", "One main automatic entrance used by all participants"],
      ["Flexibility in Use", "Cable stacks usable seated or standing; removable seats on ergs"],
      ["Simple & Intuitive", "Clear icons and one-button start on equipment"],
      ["Perceptible Information", "Large-print + tactile labels; audible prompts"],
      ["Tolerance for Error", "Soft-stop on treadmills; generous clearance around machines"],
      ["Low Physical Effort", "Power-assist doors; easy-glide adjustments"],
      ["Size & Space for Use", "36–42\" aisles; turning radii in locker rooms"]
    ],
    explain: "UD maps cleanly onto facility, equipment, and program design."
  },
  {
    id: "ud_space_stuff_social_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "The 'S³ + S' mental model (Space • Stuff • Social + Safety) re-groups which UD ideas?",
    options: [
      "Only architecture",
      "Space (arrival/clearances), Stuff (flexible/intuitive/low effort interfaces), Social (equitable norms/comms), Safety (tolerance for error)",
      "Finance only",
      "Programming only"
    ],
    answerIndex: 1,
    explain: "Helps staff remember which bucket a fix belongs to."
  },
  {
    id: "ud_pa_role_sa",
    deck: "Laws & Principles",
    type: "sa",
    prompt: "State how UD reduces ableism/disablism in sport and leisure with one concrete example.",
    answer: "By making inclusion the default: e.g., mixed-ability 'arm-erg spin' class with removable seats allows wheelchair and non-wheelchair users to train together at the same intensity.",
    explain: "Default design removes gatekeeping and stigma."
  },
  {
    id: "ud_facility_audit_mc",
    deck: "Laws & Principles",
    type: "mc",
    prompt: "High-impact 'first fixes' in a UD facility audit typically include:",
    options: [
      "Decor changes only",
      "Entrances/doors, aisles/clearances, restrooms/locker rooms, and signage/wayfinding",
      "Only advanced equipment purchases",
      "Staff uniforms"
    ],
    answerIndex: 1,
    explain: "Chokepoints block access; fixing them yields outsized benefits."
  },

  /* =========================
   * PUBLIC HEALTH & DISPARITIES
   * ========================= */
  {
    id: "ph_inactivity_data_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which statement reflects the public-health case from national data (NHIS/CDC)?",
    options: [
      "Most adults with disabilities exceed aerobic guidelines",
      "Nearly half report no aerobic PA; inactivity links to higher chronic disease",
      "No counseling gaps exist in healthcare",
      "Disability and PA are unrelated"
    ],
    answerIndex: 1,
    explain: "Inactivity and counseling gaps are documented and modifiable."
  },
  {
    id: "ph_counseling_gap_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Only ~44% of adults with disabilities report receiving PA recommendations from a health professional.",
    answerBool: true,
    explain: "Closing counseling gaps is a Monday-morning action item."
  },
  {
    id: "ph_social_determinants_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "Name two social determinants that limit PA access for people with disabilities.",
    answer: "Lower employment/income, transportation barriers, inaccessible facilities, limited program availability, and lack of inclusive information.",
    explain: "Public-health framing targets system change, not individuals."
  },

  /* =========================
   * EMPLOYMENT & POVERTY
   * ========================= */
  {
    id: "emp_cycle_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Disability and poverty can reinforce each other bidirectionally.",
    answerBool: true,
    explain: "Reduced opportunities increase poverty; poverty increases disability risk."
  },
  {
    id: "emp_accommodation_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which is a reasonable accommodation in employment?",
    options: [
      "Flexible schedule, assistive tech, remote/hybrid options, workspace changes",
      "No breaks allowed",
      "Mandatory overtime only",
      "Eliminate benefits for fairness"
    ],
    answerIndex: 0,
    explain: "Core ADA/504 accommodation toolkit."
  },
  {
    id: "emp_pa_feedbackloop_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "Name two ways PA participation can support employment outcomes.",
    answer: "Improves strength/endurance and mental health (confidence), builds routine/productivity, and fosters social networks for job connections.",
    explain: "PA → function & psychosocial gains → job readiness/success."
  },
  {
    id: "emp_wellness_inclusive_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "An inclusive workplace wellness program should:",
    options: [
      "Offer only step challenges",
      "Include UD-informed options (chair workouts, flexible goals), accessible platforms, and accommodations",
      "Exclude remote employees",
      "Require physician letters for disabled staff only"
    ],
    answerIndex: 1,
    explain: "Equal access to health resources is part of inclusion."
  },

  /* =========================
   * CAREGIVER & SUPPORT SYSTEMS
   * ========================= */
  {
    id: "cg_roles_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which statement best reflects caregivers’ role in PA participation?",
    options: [
      "They usually hinder participation and should be excluded",
      "When trained and supported, they are primary facilitators of engagement and adherence",
      "They only manage medical tasks",
      "They decide sport classification"
    ],
    answerIndex: 1,
    explain: "Caregiver empowerment reduces burnout and overprotection."
  },
  {
    id: "cg_supports_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "List two supports that reduce caregiver stress while promoting PA.",
    answer: "Peer groups/respite; clear PA plans; transportation assistance; access to adaptive equipment; goal-setting with visible wins.",
    explain: "Support structures enable sustainability."
  },
  {
    id: "cg_overprotect_risk_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which plan best addresses caregiver overprotectiveness?",
    options: [
      "Prohibit all risk",
      "Introduce graded challenges with safety measures, coach caregivers, and celebrate progress",
      "Exclude caregivers from sessions",
      "Ignore caregiver concerns"
    ],
    answerIndex: 1,
    explain: "Graded exposure + coaching builds confidence safely."
  },

  /* =========================
   * BARRIERS & SOLUTIONS (SYSTEMIC)
   * ========================= */
  {
    id: "bs_barriers_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Top modifiable barriers reported by adults with disabilities include:",
    options: [
      "Only motivation",
      "Cost, transportation, where to find programs, and not knowing how",
      "Gym fashion rules",
      "Coach availability only"
    ],
    answerIndex: 1,
    explain: "Addressable via funding, transit, info, and UD programs."
  },
  {
    id: "bs_tokenism_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: 'Include one or two' participants without structural change is performative inclusion.",
    answerBool: true,
    explain: "Tokenism preserves barriers and signals conditional belonging."
  },
  {
    id: "bs_monday_action_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "Give two 'Monday actions' to improve inclusion in a community gym.",
    answer: "Walk the floor with an ADA/UD checklist and fix chokepoints (entrances/aisles); add a mixed-ability class (arm-erg spin); publish an Access & Sensory Guide; train staff in inclusive practice.",
    explain: "Practical steps convert intent to access."
  },
  {
    id: "bs_marketing_access_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Marketing should include access info (routes, equipment, sensory notes) to reduce uncertainty barriers.",
    answerBool: true,
    explain: "Perceptible information is a UD principle applied to comms."
  },

  /* =========================
   * ACTIVISM & HISTORY — ADDITIONAL
   * ========================= */
  {
    id: "ah_barrier_free_movement_tf",
    deck: "Activism & History",
    type: "tf",
    prompt: "True/False: The barrier-free movement accelerated post-WWII due to veteran advocacy.",
    answerBool: true,
    explain: "Catalyzed public access reforms and employment pushes."
  },
  {
    id: "ah_symbol_shift_mc",
    deck: "Activism & History",
    type: "mc",
    prompt: "Speaker’s 'new symbol' idea urges what shift?",
    options: [
      "From active to static imagery",
      "From static wheelchair icon to active, capable participation as default",
      "From ramps to stairs",
      "From inclusion to segregation"
    ],
    answerIndex: 1,
    explain: "Assume capability; design and budget accordingly."
  },

  /* =========================
   * PROFESSIONAL PREPARATION
   * ========================= */
  {
    id: "pp_prep_gap_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Coaches/trainers/teachers often lack formal training in inclusive practice, contributing to exclusion.",
    answerBool: true,
    explain: "Training gaps → attitudinal/program barriers."
  },
  {
    id: "pp_training_cert_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "A program that builds inclusive fitness competency is:",
    options: [
      "Random YouTube tips only",
      "ACSM × NCHPAD Certified Inclusive Fitness Trainer",
      "No training needed",
      "Unrelated finance certification"
    ],
    answerIndex: 1,
    explain: "Credential-based training improves practice quality."
  },
  {
    id: "pp_counsel_every_time_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "What is a 'counsel every time' policy in clinics?",
    answer: "Routinely discussing and prescribing PA for patients with disabilities at each relevant visit, with specific, accessible steps.",
    explain: "Normalizes PA as standard of care."
  },
  {
    id: "pp_disabled_leadership_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "Which step most directly elevates disabled leadership in programs?",
    options: [
      "Volunteer photo shoots",
      "Advisory boards led by disabled athletes with decision power",
      "Anonymous suggestion boxes only",
      "Annual inspiration posts"
    ],
    answerIndex: 1,
    explain: "Leadership roles shift power and improve design relevance."
  },

  /* =========================
   * RISKS & BENEFITS (CONDITION-SPECIFIC)
   * ========================= */
  {
    id: "rb_stroke_screen_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "For post-stroke clients without access to graded exercise testing:",
    options: [
      "Do not start PA until testing is available",
      "Start low-intensity activity and progress as tolerated while monitoring vitals/symptoms",
      "High-intensity only",
      "Strength only"
    ],
    answerIndex: 1,
    explain: "Lack of testing should not delay initiation."
  },
  {
    id: "rb_tbi_chronic_tf",
    deck: "Program Controls & Contraindications",
    type: "tf",
    prompt: "True/False: For persistent post-concussive symptoms (>1 month), aerobic exercise plus education/motivation can reduce symptoms.",
    answerBool: true,
    explain: "Evidence supports structured return."
  },
  {
    id: "rb_fes_sci_sa",
    deck: "Program Controls & Contraindications",
    type: "sa",
    prompt: "Name one metabolic/fitness benefit of FES-assisted training in SCI.",
    answer: "Improved VO₂, better lipids, reduced CRP, increased lean mass/strength.",
    explain: "FES adds 'whole-body' stimulus via neuromuscular activation."
  },
  {
    id: "rb_shoulder_prevention_mc",
    deck: "Program Controls & Contraindications",
    type: "mc",
    prompt: "Which elements best prevent shoulder overuse in wheelchair athletes?",
    options: [
      "High repetition pushing only",
      "Balanced strengthening (scapular stabilizers, rotator cuff), propulsion technique, equipment fit, recovery",
      "No upper-body training",
      "Avoiding stretching"
    ],
    answerIndex: 1,
    explain: "Balanced programs reduce overload and impingement risk."
  },

  /* =========================
   * GENERAL SOCIETY QUESTIONS
   * ========================= */
  {
    id: "gs_normal_body_tf",
    deck: "Benefits & Labeling",
    type: "tf",
    prompt: "True/False: Fitness culture’s obsession with a narrow 'normal' body ideal contributes to ableist and exclusionary environments.",
    answerBool: true,
    explain: "Cultural norms shape access and identity."
  },
  {
    id: "gs_visibility_mc",
    deck: "Benefits & Labeling",
    type: "mc",
    prompt: "A media practice that reduces disablism in sport coverage:",
    options: [
      "Focus on pity and 'overcoming'",
      "Cover strategy, performance, and competition like any sport",
      "Avoid showing disabled athletes",
      "Use infantilizing tone"
    ],
    answerIndex: 1,
    explain: "Narratives shift norms and resource flows."
  },
  {
    id: "gs_access_info_sa",
    deck: "Benefits & Labeling",
    type: "sa",
    prompt: "One 'communication barrier' fix a gym can implement this week:",
    answer: "Publish an Access & Sensory Guide with photos of routes, equipment specs, noise/lighting notes, and contacts for assistance.",
    explain: "Perceptible information lowers uncertainty and friction."
  }
];

