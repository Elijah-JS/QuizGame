// KINE 3050 – Quiz #1 Master Bank (BUILT ONLY from your provided notes)
// Update: Every card now includes a rich `learn` field so the Learn page shows the full,
 // in-depth yet simple explanation (no “review” prompts anywhere).
 // Types supported by the app remain the same.
// Deck filters for the UI:
export const DECKS = [
  "All",
  "Ableism vs Disablism",
  "Universal Design (UD)",
  "Barriers to Inclusion",
  "Health & Physical Activity Benefits/Risks",
  "Policy, Law & Rights",
  "Employment & Poverty",
  "Labeling & Language",
  "Activism, Leadership & Case Studies",
  "Public Health & Disparities",
];

// mc  = multiple choice (single)
// ma  = multiple answer (multi-select)
// tf  = true/false
// sa  = short answer (exact graded)
// match = matching [ [left, right], ... ]

export const BANK = [
  /* ================================
   * ABLEISM vs DISABLISM
   * ================================ */
  {
    id: "ad_def_ableism_sa",
    deck: "Ableism vs Disablism",
    type: "sa",
    prompt: "Define Ableism in one sentence, as used here.",
    answer:
      "Ableism is the belief system—often unconscious—that non-disabled bodies/minds are ‘normal,’ superior, or more valuable.",
    explain:
      "Ableism = BELIEFS/NORMS that rank non-disabled ways of being as better; these beliefs set the stage for exclusion.",
    learn: [
      "Think: attitudes + assumptions (e.g., low expectations, pity, ‘othering’).",
      "Ableism can be internalized by disabled and non-disabled people alike.",
      "It shows up as: assuming someone can’t be an athlete; treating sport as ‘therapy only’.",
      "Anti-ableist move: assume capability; ask what supports/contexts unlock that capability.",
    ],
  },
  {
    id: "ad_def_disablism_sa",
    deck: "Ableism vs Disablism",
    type: "sa",
    prompt: "Define Disablism in one sentence, as used here.",
    answer:
      "Disablism is the systemic discrimination and oppression that disables people via barriers (physical, cultural, institutional, attitudinal).",
    explain:
      "Disablism = SYSTEMS/ACTIONS that enact exclusion (policies, designs, practices).",
    learn: [
      "Examples: inaccessible facilities/equipment; ‘able-bodied only’ program rules; unequal clearance policies.",
      "Key idea: people are ‘disabled’ by environments and systems, not just by bodies.",
      "Fixing disablism means removing barriers (ramps, policies, funding, training), not fixing people.",
    ],
  },
  {
    id: "ad_compare_tf",
    deck: "Ableism vs Disablism",
    type: "tf",
    prompt:
      "True/False: Ableism is primarily about beliefs and norms; Disablism is primarily about systems and actions.",
    answerBool: true,
    explain: "Beliefs (ableism) → drive structures/actions (disablism).",
    learn: [
      "Ableism = mindset; Disablism = outcomes.",
      "Both must be addressed: change culture AND change policy/design.",
      "Practical test: if a rule treats disabled people differently by default → disablism.",
    ],
  },
  {
    id: "ad_fix_model_mc",
    deck: "Ableism vs Disablism",
    type: "mc",
    prompt: "Redefining disability shifts the focus from ______ to ______.",
    options: [
      "fix the person; fix the policy",
      "fix the environment; fix the person",
      "fix the person; fix the environment",
      "measure impairment; measure attitude",
    ],
    answerIndex: 2,
    explain:
      "Model shift: from medical (change the person) → social (change barriers & contexts).",
    learn: [
      "Start with the environment: space, stuff, social norms, safety (S³+S).",
      "Ask: ‘What change lets this person participate right now?’",
      "Design inclusion by default (UD), not as an add-on.",
    ],
  },
  {
    id: "ad_manifest_ma",
    deck: "Ableism vs Disablism",
    type: "ma",
    prompt: "Select all examples of ableism’s manifestations given in the notes:",
    options: [
      "Exclusion by design (no ramps, inaccessible layouts)",
      "Framing participation as ‘therapy’ rather than sport",
      "Tokenism and ‘inspiration’ narratives",
      "Automatic parity in funding and coverage",
      "Assumptions of inferiority or inability",
    ],
    answerIndexes: [0, 1, 2, 4],
    explain:
      "Funding parity is not automatic; it’s a goal. The other items are explicit manifestations.",
    learn: [
      "Design ≠ neutral: if it blocks chairs or sensory needs, it excludes.",
      "Narratives matter: cover strategy/performance, not pity.",
      "Set expectations high: disabled athletes are athletes.",
    ],
  },
  {
    id: "ad_action_summary_sa",
    deck: "Ableism vs Disablism",
    type: "sa",
    prompt: "List two demands of ‘Redefining Disability’ per the summary (F section).",
    answer:
      "Design systems/spaces to be inclusive by default; elevate disabled leadership.",
    explain:
      "Also reject stereotypes and value participation & connection alongside performance.",
    learn: [
      "Default inclusion reduces stigma and wait time for access.",
      "Leadership with lived experience drives relevant, sustainable change.",
    ],
  },

  /* ================================
   * UNIVERSAL DESIGN (UD)
   * ================================ */
  {
    id: "ud_def_sa",
    deck: "Universal Design (UD)",
    type: "sa",
    prompt: "Give the concise definition of Universal Design (UD).",
    answer:
      "UD is designing products, environments, and experiences so everyone can use them, to the greatest extent possible, without later adaptation.",
    explain: "Inclusion as the starting point, not an afterthought.",
    learn: [
      "Why UD? Cheaper than retrofits; reduces stigma; boosts participation.",
      "UD spans: facilities, equipment, programs, tech, policies, and marketing.",
      "Flashcard tip: ‘Design for all from day one.’",
    ],
  },
  {
    id: "ud_principles_match",
    deck: "Universal Design (UD)",
    type: "match",
    prompt: "Match UD principles to examples in PA/fitness.",
    pairs: [
      ["Equitable Use", "One main automatic entrance for everyone"],
      ["Flexibility in Use", "Cable stacks usable seated or standing"],
      ["Simple & Intuitive", "Clear icons and one-button quick-start"],
      ["Perceptible Information", "Large/tactile labels + audio prompts"],
      ["Tolerance for Error", "Soft-stop treadmills; generous clearance"],
      ["Low Physical Effort", "Power-assist doors; easy-glide adjustments"],
      ["Size & Space for Use", "36–42\" aisles; turning radii in lockers"],
    ],
    explain: "Direct mapping of all seven principles to concrete gym examples.",
    learn: [
      "Memory hook: SPACE (1 & 7), STUFF (2,3,6), SOCIAL (1,3,4), SAFETY (5).",
      "Audit questions: Can a wheelchair user start/stop/use it safely? Can a low-vision user find/read it?",
    ],
  },
  {
    id: "ud_layers_mc",
    deck: "Universal Design (UD)",
    type: "mc",
    prompt: "The S³ + S mental model re-groups UD into which buckets?",
    options: [
      "Space, Stuff, Social + Safety",
      "Policy, People, Place + Profit",
      "Screen, Sound, Sync + Security",
      "Skills, Strategy, Sport + Science",
    ],
    answerIndex: 0,
    explain: "S³+S = SPACE • STUFF • SOCIAL + SAFETY.",
    learn: [
      "SPACE: arrival, doors, aisles, lockers.",
      "STUFF: adjustable, intuitive, low-effort equipment.",
      "SOCIAL: norms, language, comms, mixed-ability participation.",
      "SAFETY: tolerance for error, safe stops, clearances.",
    ],
  },
  {
    id: "ud_before_after_tf",
    deck: "Universal Design (UD)",
    type: "tf",
    prompt:
      "True/False: UD changes more than architecture; it also reshapes programs, tech, culture, and marketing.",
    answerBool: true,
    explain: "UD is a whole-system lens, not just a ramp.",
    learn: [
      "Programs: provide options/progressions; mixed-ability events.",
      "Tech: voiceover-friendly apps; tactile labels; large text.",
      "Culture: show diverse bodies; publish access info.",
    ],
  },
  {
    id: "ud_first_fixes_ma",
    deck: "Universal Design (UD)",
    type: "ma",
    prompt: "Select high-impact ‘first fixes’ recommended in the notes:",
    options: [
      "Entrances and door openers",
      "Aisle/clearance spacing",
      "Locker rooms/restrooms access",
      "Uniform color changes",
      "Signage/wayfinding and access guides",
    ],
    answerIndexes: [0, 1, 2, 4],
    explain: "Fix chokepoints first; decor can wait.",
    learn: [
      "Post an Access & Sensory Guide with photos and specs.",
      "Add at least one upper-body cardio erg with removable seat.",
    ],
  },
  {
    id: "ud_try_monday_sa",
    deck: "Universal Design (UD)",
    type: "sa",
    prompt: "Name one Monday action to implement UD in a gym/clinic from the list provided.",
    answer:
      "Publish an Access & Sensory Guide (routes, specs, noise/lighting, contacts).",
    explain: "Other ‘Monday’ moves: arm-erg class, staff training, advisory boards.",
    learn: [
      "Small wins stack: a door button + a clear aisle + a posted guide = immediate impact.",
    ],
  },

  /* ================================
   * BARRIERS TO INCLUSION
   * ================================ */
  {
    id: "bi_physinfra_mc",
    deck: "Barriers to Inclusion",
    type: "mc",
    prompt: "Which is an infrastructure barrier listed in the notes?",
    options: [
      "Automated captioning on all screens",
      "Inaccessible gyms, parks, pools, locker rooms",
      "Abundant adaptive equipment",
      "Guaranteed paratransit for all programs",
    ],
    answerIndex: 1,
    explain: "Physical chokepoints prevent participation before it begins.",
    learn: [
      "Look for: steps w/o ramps, narrow aisles, heavy doors, no pool lift, cramped lockers.",
      "Fix order: entrance → aisles → lockers → signage/equipment.",
    ],
  },
  {
    id: "bi_attitudes_tf",
    deck: "Barriers to Inclusion",
    type: "tf",
    prompt:
      "True/False: Low expectations and stigma are attitudinal barriers tied to ableism/disablism.",
    answerBool: true,
    explain: "Attitudes shape access: assumptions gatekeep opportunities.",
    learn: [
      "Language check: avoid ‘inspirational’ pity; focus on skill, role, strategy.",
      "Set high expectations with real supports.",
    ],
  },
  {
    id: "bi_programmatic_sa",
    deck: "Barriers to Inclusion",
    type: "sa",
    prompt: "Name one programmatic/policy barrier from the notes.",
    answer: "Lack of inclusive policies and inadequate professional training.",
    explain:
      "Also: program scarcity; reactive ‘MD clearance’ used as blanket gatekeeping.",
    learn: [
      "Solution: policy updates + staff training + explicit inclusion in schedules.",
    ],
  },
  {
    id: "bi_comm_econ_ma",
    deck: "Barriers to Inclusion",
    type: "ma",
    prompt: "Select the economic/communication barriers highlighted:",
    options: [
      "Cost of programs/equipment",
      "Funding shortfalls",
      "Overabundance of access info",
      "Communication gaps (Braille/ASL/clear formats missing)",
    ],
    answerIndexes: [0, 1, 3],
    explain: "Money + missing information = major friction points.",
    learn: [
      "Post costs, scholarships, and grants; offer plain-language, Braille/ASL/alt-text resources.",
    ],
  },
  {
    id: "bi_riskculture_mc",
    deck: "Barriers to Inclusion",
    type: "mc",
    prompt: "Which statement aligns with the notes on health/safety barriers?",
    options: [
      "Medical clearance is never needed and should be ignored.",
      "Risk aversion and blanket ‘clearance’ demands can become barriers when overused.",
      "High-intensity training is safest for everyone on day one.",
      "Disability means no PA is recommended.",
    ],
    answerIndex: 1,
    explain:
      "Balance safety with access: start low; progress as tolerated; monitor.",
    learn: [
      "Use condition-specific controls (e.g., seizure plans, skin checks, heat protocols).",
    ],
  },
  {
    id: "bi_framework_sa",
    deck: "Barriers to Inclusion",
    type: "sa",
    prompt: "Name one item from the ‘Framework of Support’ that reduces barriers.",
    answer: "Knowledge & training for staff (adapted PA competencies).",
    explain:
      "Also helpful: social support, UD environment, policy backing, caregiver empowerment.",
    learn: [
      "Train → confidence rises → fewer unnecessary exclusions.",
    ],
  },

  /* =========================================
   * HEALTH & PHYSICAL ACTIVITY BENEFITS/RISKS
   * ========================================= */
  {
    id: "hpr_why_tf",
    deck: "Health & Physical Activity Benefits/Risks",
    type: "tf",
    prompt:
      "True/False: Excluding people with disabilities from PA, sport, recreation, and leisure is a direct cause of poorer health outcomes.",
    answerBool: true,
    explain: "PA access is a health resource and a rights issue.",
    learn: [
      "Benefits: mobility, strength, independence, mental health, community.",
      "Public health view: disparities are preventable with inclusive systems.",
    ],
  },
  {
    id: "hpr_start_gradual_mc",
    deck: "Health & Physical Activity Benefits/Risks",
    type: "mc",
    prompt: "When supporting new participation, notes emphasize:",
    options: [
      "Begin high-intensity intervals immediately",
      "Start slow, personalize, and progress gradually",
      "Only strength training is useful",
      "Avoid peer supports",
    ],
    answerIndex: 1,
    explain:
      "Personalize + gradual load = safer and stickier participation.",
    learn: [
      "Use multiple activity options; prioritize routine over intensity at first.",
      "Peer/assistant models can boost confidence and adherence.",
    ],
  },
  {
    id: "hpr_mod_equip_ma",
    deck: "Health & Physical Activity Benefits/Risks",
    type: "ma",
    prompt:
      "Select all examples of modifications/adaptive equipment from the notes:",
    options: ["Hand cycles", "Sports chairs", "Communication boards", "Remove all safety rules"],
    answerIndexes: [0, 1, 2],
    explain: "Modifications expand entry points; safety remains required.",
    learn: [
      "Also consider: water-based options; seated/standing variations; assistive tech.",
    ],
  },
  {
    id: "hpr_benefits_sa",
    deck: "Health & Physical Activity Benefits/Risks",
    type: "sa",
    prompt:
      "List two general benefits of regular PA emphasized for people with disabilities.",
    answer: "Improved mobility/strength and improved mental health (reduced depression/anxiety).",
    explain:
      "Other gains: independence, social connection, chronic disease management.",
    learn: [
      "Even small, regular amounts matter; consistency beats intensity at the start.",
    ],
  },
  {
    id: "hpr_concussion_tf",
    deck: "Health & Physical Activity Benefits/Risks",
    type: "tf",
    prompt:
      "True/False: The notes endorse gradual sub-symptom activity 24–48 hours after concussion rather than strict prolonged rest.",
    answerBool: true,
    explain: "Controlled early activity > extended bed rest (per notes).",
    learn: [
      "Progress stepwise only if asymptomatic; monitor closely.",
    ],
  },
  {
    id: "hpr_sci_risks_mc",
    deck: "Health & Physical Activity Benefits/Risks",
    type: "mc",
    prompt: "Unique risks in SCI highlighted include higher risk of:",
    options: [
      "Altitude sickness only",
      "Autonomic dysreflexia, heat illness risk, orthostatic hypotension, skin breakdown",
      "Type 1 diabetes",
      "Isolated calf cramp",
    ],
    answerIndex: 1,
    explain:
      "Autonomic issues + equipment interfaces = distinct risk profile.",
    learn: [
      "Controls: pre-cooling, hydration, skin checks, equipment fit, AD protocols.",
    ],
  },

  /* ================================
   * POLICY, LAW & RIGHTS
   * ================================ */
  {
    id: "plr_right_not_nice_tf",
    deck: "Policy, Law & Rights",
    type: "tf",
    prompt:
      "True/False: Participation in recreation, leisure, and sport is a right recognized by international policy.",
    answerBool: true,
    explain: "UN CRPD Article 30.5 recognizes this right.",
    learn: [
      "Rights frame = enforceable access, not optional charity.",
      "Programs should avoid unnecessary segregation.",
    ],
  },
  {
    id: "plr_us_ed_sa",
    deck: "Policy, Law & Rights",
    type: "sa",
    prompt:
      "Name the 2013 guidance that clarified inclusive PE and interscholastic sports in U.S. schools.",
    answer: "The 2013 ‘Dear Colleague’ letter.",
    explain:
      "Equal opportunity for PE/sports; separate/different services only when necessary.",
    learn: [
      "Schools must provide reasonable modifications and aids; LRE applies in PE.",
    ],
  },
  {
    id: "plr_discrimination_mc",
    deck: "Policy, Law & Rights",
    type: "mc",
    prompt:
      "Section 504/Rehab Act (and related laws) primarily address:",
    options: [
      "Fitness programming tips",
      "Civil-rights protections against disability discrimination in federally funded programs",
      "Only collegiate varsity sport rules",
      "Marathon classification systems",
    ],
    answerIndex: 1,
    explain: "504 anchors anti-discrimination in public, federally funded settings.",
    learn: [
      "Policies must translate into real access: facilities, info, programming.",
    ],
  },
  {
    id: "plr_symbol_policy_sa",
    deck: "Policy, Law & Rights",
    type: "sa",
    prompt:
      "According to the notes, what must accompany adoption of a ‘new/active’ symbol to avoid tokenism?",
    answer:
      "Policy, budget, and training commitments so inclusion becomes default practice.",
    explain: "Symbol change without resources = optics only.",
    learn: [
      "Tie symbols to measurable targets (equipment, schedules, hiring).",
    ],
  },
  {
    id: "plr_adv_cases_ma",
    deck: "Policy, Law & Rights",
    type: "ma",
    prompt: "Select the advocacy/legal items cited in the notes:",
    options: [
      "Tatyana McFadden case leading to MD Fitness & Athletics Equity Act",
      "Pistorius/CAS case on prostheses participation if no unfair advantage",
      "NCAA universal mandate fully integrating adaptive varsity sports",
      "UN CRPD Article 30.5",
    ],
    answerIndexes: [0, 1, 3],
    explain:
      "NCAA integration is uneven; not a universal mandate per notes.",
    learn: [
      "Advocacy + evidence can shift rules toward inclusion.",
    ],
  },
  {
    id: "plr_parity_tf",
    deck: "Policy, Law & Rights",
    type: "tf",
    prompt:
      "True/False: The notes advocate Title IX–like mechanisms to improve disability sport inclusion.",
    answerBool: true,
    explain: "Equity levers can be adapted to disability sport.",
    learn: [
      "Set coverage/funding targets; track access metrics; enforce.",
    ],
  },

  /* ================================
   * EMPLOYMENT & POVERTY
   * ================================ */
  {
    id: "ep_cycle_tf",
    deck: "Employment & Poverty",
    type: "tf",
    prompt: "True/False: Disability and poverty reinforce each other bidirectionally.",
    answerBool: true,
    explain:
      "Reduced opportunities ↔ higher risks; cycle persists without systemic fixes.",
    learn: [
      "Costs rise (devices, transport) while access falls (jobs, education).",
      "Breaking the cycle: enforce rights, UD workplaces, training, accessible transit.",
    ],
  },
  {
    id: "ep_accommodations_ma",
    deck: "Employment & Poverty",
    type: "ma",
    prompt: "Select examples of reasonable accommodations from the notes:",
    options: [
      "Flexible schedules",
      "Assistive technology/software",
      "Remote/hybrid options",
      "Mandatory overtime only",
      "Workspace changes",
    ],
    answerIndexes: [0, 1, 2, 4],
    explain: "Accommodations are legal rights, not favors.",
    learn: [
      "Outcome focus: enable essential job functions with minimal undue burden.",
    ],
  },
  {
    id: "ep_barriers_mc",
    deck: "Employment & Poverty",
    type: "mc",
    prompt: "Which employment barrier aligns with the notes?",
    options: [
      "Inaccessible job applications (digital)",
      "Guaranteed accessible transit",
      "Overfunded adaptive programs",
      "No bias in hiring",
    ],
    answerIndex: 0,
    explain: "Digital + physical access issues block hiring and retention.",
    learn: [
      "Fixes: accessible ATS platforms, alternative interview formats, UD office layouts.",
    ],
  },
  {
    id: "ep_pa_feedback_match",
    deck: "Employment & Poverty",
    type: "match",
    prompt: "Match PA outcomes to employment benefits per the notes.",
    pairs: [
      ["Strength & endurance", "Greater capacity to work"],
      ["Mental health & confidence", "Job readiness/interview performance"],
      ["Social engagement", "Networking & connections"],
      ["Routine & structure", "Productivity & attendance"],
      ["Team play", "Transferable teamwork/leadership"],
    ],
    explain: "PA → employability and stability → more access to PA (virtuous loop).",
    learn: [
      "Practical: schedule regular PA as part of job-readiness plans.",
    ],
  },
  {
    id: "ep_policy_recs_sa",
    deck: "Employment & Poverty",
    type: "sa",
    prompt:
      "Name one policy/practice recommendation to break the disability–poverty cycle.",
    answer:
      "Implement Universal Design in public/work spaces and fund adaptive equipment/programs.",
    explain:
      "Also: enforce anti-discrimination, inclusive education/training, accessible healthcare/PA.",
    learn: [
      "Include disabled leadership in workforce planning and advisory roles.",
    ],
  },
  {
    id: "ep_global_poverty_mc",
    deck: "Employment & Poverty",
    type: "mc",
    prompt: "According to the notes, which statement reflects global poverty risk?",
    options: [
      "Up to 80% of people with disabilities in developing countries live in poverty",
      "Less than 1% face poverty globally",
      "Poverty and disability are unrelated",
      "Only rural residents are affected",
    ],
    answerIndex: 0,
    explain:
      "Intersectionality (gender, race, rurality, age) can amplify risk.",
    learn: [
      "Solutions must be local + systemic: transit, healthcare, education, legal enforcement.",
    ],
  },

  /* ================================
   * LABELING & LANGUAGE
   * ================================ */
  {
    id: "ll_therapy_frame_tf",
    deck: "Labeling & Language",
    type: "tf",
    prompt:
      "True/False: Framing participation as ‘therapy’ instead of real sport can be an ableist narrative.",
    answerBool: true,
    explain:
      "It can devalue performance and belonging; center athletes as athletes.",
    learn: [
      "Use sport language: role, strategy, intensity, skill—not pity terms.",
    ],
  },
  {
    id: "ll_inspiration_mc",
    deck: "Labeling & Language",
    type: "mc",
    prompt: "Which best describes the notes’ position on ‘inspiration’ narratives?",
    options: [
      "They are always empowering",
      "They often praise basic participation while ignoring systemic barriers",
      "They guarantee funding parity",
      "They eliminate tokenism",
    ],
    answerIndex: 1,
    explain: "Shift to covering competition/performance like any sport.",
    learn: [
      "Ask: what policy/equipment/training changes would make this routine, not exceptional?",
    ],
  },
  {
    id: "ll_language_sa",
    deck: "Labeling & Language",
    type: "sa",
    prompt: "Give one communication upgrade recommended in the notes.",
    answer:
      "Publish access information with photos, equipment specs, sensory notes, and contacts.",
    explain: "Perceptible information lowers uncertainty and friction.",
    learn: [
      "Also add captions/alt-text; use clear, plain language.",
    ],
  },
  {
    id: "ll_norms_ma",
    deck: "Labeling & Language",
    type: "ma",
    prompt: "Select narrative shifts recommended by the notes:",
    options: [
      "Cover performance/strategy like any sport",
      "Avoid pity or ‘inspiration porn’ framing",
      "Market only ‘able-bodied’ images",
      "Include captions/alt text and access info",
    ],
    answerIndexes: [0, 1, 3],
    explain: "Representation + concrete access info normalize inclusion.",
    learn: [
      "Show mixed-ability teams and real roles; list how to join.",
    ],
  },
  {
    id: "ll_tokenism_tf",
    deck: "Labeling & Language",
    type: "tf",
    prompt:
      "True/False: ‘Include one or two’ participants without structural change is performative inclusion.",
    answerBool: true,
    explain: "Tokenism = optics; systems remain unchanged.",
    learn: [
      "Replace with: budgets, schedules, staffing, equipment, metrics.",
    ],
  },
  {
    id: "ll_symbol_policy_mc",
    deck: "Labeling & Language",
    type: "mc",
    prompt: "A ‘new active symbol’ should be paired with:",
    options: [
      "No further actions",
      "Policy, budget, and training to make inclusion default",
      "Only social media posts",
      "Separate entrances",
    ],
    answerIndex: 1,
    explain: "Symbol → commit resources or it’s just branding.",
    learn: [
      "Tie to targets (e.g., add an arm-erg class; publish access guide Q1; hire disabled co-leader).",
    ],
  },

  /* ==========================================
   * ACTIVISM, LEADERSHIP & CASE STUDIES
   * ========================================== */
  {
    id: "al_leadership_ma",
    deck: "Activism, Leadership & Case Studies",
    type: "ma",
    prompt: "Select leadership steps recommended in the notes:",
    options: [
      "Advisory boards led by disabled athletes with decision power",
      "Hire disabled staff/coaches",
      "Anonymous suggestion box only",
      "Co-design programs with lived experience",
    ],
    answerIndexes: [0, 1, 3],
    explain:
      "Power + representation → better design and accountability.",
    learn: [
      "Set standing seats for disabled leaders; pay them; give real veto/approval powers.",
    ],
  },
  {
    id: "al_story_moral_sa",
    deck: "Activism, Leadership & Case Studies",
    type: "sa",
    prompt: "What is the stated moral from the personal story in the notes?",
    answer: "Expectations plus opportunity ignite participation.",
    explain:
      "Coaching + access + community built athlete identity and performance.",
    learn: [
      "Replicate: invite early, provide peers/equipment, celebrate skill (not pity).",
    ],
  },
  {
    id: "al_mixed_ability_tf",
    deck: "Activism, Leadership & Case Studies",
    type: "tf",
    prompt:
      "True/False: Mixed-ability programs (e.g., sled hockey, seated volleyball, arm-erg ‘spin’) are showcased as UD-aligned solutions.",
    answerBool: true,
    explain: "They normalize shared intensity and belonging.",
    learn: [
      "Design one event anyone can join; publish the access plan in advance.",
    ],
  },
  {
    id: "al_adv_precedent_mc",
    deck: "Activism, Leadership & Case Studies",
    type: "mc",
    prompt:
      "Which case directly led to a state-level inclusion mandate in school athletics?",
    options: ["Pistorius/CAS", "McFadden (Maryland) → MD Fitness & Athletics Equity Act", "Title IX", "NCAA memo"],
    answerIndex: 1,
    explain: "The McFadden case catalyzed the MD inclusion law.",
    learn: [
      "Legal wins + policy follow-through = lasting change for students.",
    ],
  },
  {
    id: "al_training_cert_sa",
    deck: "Activism, Leadership & Case Studies",
    type: "sa",
    prompt:
      "Name one training resource from the notes to build inclusive fitness competency.",
    answer: "ACSM × NCHPAD Certified Inclusive Fitness Trainer.",
    explain: "Credential-based training closes practice gaps.",
    learn: [
      "Make it required for hiring or promotion to embed standards.",
    ],
  },
  {
    id: "al_new_symbol_thesis_tf",
    deck: "Activism, Leadership & Case Studies",
    type: "tf",
    prompt:
      "True/False: The talk’s thesis includes shifting from a static symbol to an active, autonomous one and acting on that assumption of capability.",
    answerBool: true,
    explain: "Assume capability; design and budget like you mean it.",
    learn: [
      "Pair with metrics: participation, equipment uptime, staff trained, events run.",
    ],
  },

  /* =================================
   * PUBLIC HEALTH & DISPARITIES
   * ================================= */
  {
    id: "ph_disparity_def_sa",
    deck: "Public Health & Disparities",
    type: "sa",
    prompt: "Define ‘health disparities’ as framed in the notes.",
    answer:
      "Preventable differences in health and access caused by discrimination, systemic barriers, and lack of inclusive environments/policies.",
    explain: "System-caused, not inevitable.",
    learn: [
      "They improve when systems change: UD spaces, inclusive policies, transport, funding.",
    ],
  },
  {
    id: "ph_preventable_tf",
    deck: "Public Health & Disparities",
    type: "tf",
    prompt:
      "True/False: The notes stress these disparities are preventable with inclusive design and policy.",
    answerBool: true,
    explain: "Public-health lens → change contexts, change outcomes.",
    learn: [
      "Action list: audit, fix chokepoints, add programs, publish access info, train staff, add leadership seats.",
    ],
  },
  {
    id: "ph_intersection_ma",
    deck: "Public Health & Disparities",
    type: "ma",
    prompt: "Which intersections can amplify inequities per the notes?",
    options: [
      "Disability + racial/ethnic minority status",
      "Disability + low income",
      "Disability + female",
      "Disability + unlimited private resources",
    ],
    answerIndexes: [0, 1, 2],
    explain: "Intersectionality compounds risk and barriers.",
    learn: [
      "Programs should expect diversity within disability and plan supports accordingly.",
    ],
  },
  {
    id: "ph_top_barriers_mc",
    deck: "Public Health & Disparities",
    type: "mc",
    prompt: "Which set reflects the top modifiable barriers reported in the notes?",
    options: [
      "Time, fear, lack of interest only",
      "Cost, where to find programs, transportation, and not knowing how",
      "Only equipment maintenance",
      "Only social media visibility",
    ],
    answerIndex: 1,
    explain: "Information, transport, and cost dominate.",
    learn: [
      "Practical: publish ‘how to start’ guides; list transit; offer subsidies/scholarships.",
    ],
  },
  {
    id: "ph_counsel_gap_sa",
    deck: "Public Health & Disparities",
    type: "sa",
    prompt:
      "What ‘clinic policy’ does the notes propose to close counseling gaps?",
    answer:
      "‘Counsel every time’—routinely discuss/prescribe PA with specific, accessible steps.",
    explain: "Normalize exercise Rx for disabled patients.",
    learn: [
      "Add condition-aware advice + referrals to inclusive programs/equipment.",
    ],
  },
  {
    id: "ph_program_actions_ma",
    deck: "Public Health & Disparities",
    type: "ma",
    prompt: "Select Monday actions that directly address disparities:",
    options: [
      "Audit/fix chokepoints (entrances/aisles/lockers) using a checklist",
      "Add mixed-ability class and publish access info",
      "Require inclusive-practice training; add disabled leadership",
      "Rely only on inspirational posters",
    ],
    answerIndexes: [0, 1, 2],
    explain: "Operational steps beat optics.",
    learn: [
      "Measure outputs (classes, trained staff) AND outcomes (participation, satisfaction).",
    ],
  },
];
