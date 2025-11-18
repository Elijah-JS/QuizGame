// KINE 3050 – Quiz #3 Master Bank
// Built from your Quiz 3 notes: Disability & Family, Assessment, Lifespan Programs,
// Health-Related Fitness, Leisure, Adapted Sport, Policy & Participation.
//
// Each card has:
// - id: unique string
// - deck: one of the DECKS below
// - type: "mc" | "ma" | "tf" | "sa" | "match"
// - prompt: question shown to you
// - answer / answerBool / answerIndex / answerIndexes / pairs
// - explain: short exam-style clarification
// - learn: deeper notes for the Learn view

export const DECKS = [
  "All",

  // Families & Caregivers
  "Families & Caregivers",
  "Caregiver Stress, Grief & Coping",
  "Family Dynamics, Culture & Finances",

  // Assessment & Planning
  "Assessment vs Evaluation",
  "Paradigm for Effectiveness",
  "Assessment Tools & Issues",
  "Program Planning Across the Lifespan",

  // Health, Leisure, Promotion
  "Health-Related Fitness & Public Health",
  "Leisure & Recreation",
  "Barriers to Participation",
  "Promoting PA, Exercise, Recreation & Leisure",

  // Adapted Sport
  "Adapted Sport & Equal Opportunity",
  "School Policy, ADA & 504",
];

// BANK
export const BANK = [
  /* =========================================================
   * FAMILIES & CAREGIVERS — BIG PICTURE
   * ========================================================= */
  {
    id: "fc_roles_mc",
    deck: "Families & Caregivers",
    type: "mc",
    prompt:
      "Which statement best describes the role of families/caregivers in disability and physical activity?",
    options: [
      "They are mostly passive observers of services.",
      "They act as gatekeepers who can enable or limit participation.",
      "They only matter in hospital settings.",
      "They are responsible for curing the disability.",
    ],
    answerIndex: 1,
    explain:
      "Caregivers decide if, when, and how someone participates. Their beliefs, time, and support shape access.",
    learn: [
      "Caregivers choose programs, manage schedules, arrange transport, and handle paperwork.",
      "Their stress level, cultural beliefs, and knowledge strongly affect participation in PA, sport, recreation, and leisure.",
    ],
  },
  {
    id: "fc_factors_ma",
    deck: "Families & Caregivers",
    type: "ma",
    prompt:
      "Which are general factors that affect families and caregivers of people with disabilities?",
    options: [
      "Emotional and psychological factors",
      "Social and family dynamics",
      "Financial and economic considerations",
      "Astrology signs",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Quiz 3 notes group family factors into emotional/psychological, social/family, financial/economic, legal/policy, individual characteristics, and culture.",
    learn: [
      "Emotional: stress, burnout, grief, resilience.",
      "Social: cohesion, sibling roles, stigma, isolation.",
      "Financial: cost of care, employment impact, access to financial support.",
    ],
  },
  {
    id: "fc_institutions_tf",
    deck: "Families & Caregivers",
    type: "tf",
    prompt:
      "True/False: Families of individuals with disabilities often rely on institutions like schools, healthcare, and rehab centers to access services.",
    answerBool: true,
    explain:
      "Institutions deliver education, therapy, medical care, and supports that families cannot provide alone.",
    learn: [
      "Access to institutions is shaped by culture, SES, and type/severity of disability.",
      "Barriers at institutional level (paperwork, waitlists, policy) directly affect families.",
    ],
  },
  {
    id: "fc_pa_benefits_sa",
    deck: "Families & Caregivers",
    type: "sa",
    prompt:
      "Name one benefit to the family when a person with a disability regularly participates in physical activity, sport, exercise, or leisure.",
    answer: "It supports caregiver well-being by providing rest and reducing stress.",
    explain:
      "Families also gain bonding time, positive shared experiences, and better health for the family member.",
    learn: [
      "When individuals participate, caregivers may get respite, see progress, and feel less overwhelmed.",
      "Family activities (walking, swimming, hiking) can strengthen relationships and build positive memories.",
    ],
  },

  /* =========================================================
   * CAREGIVER STRESS, GRIEF & COPING
   * ========================================================= */
  {
    id: "cg_stress_def_sa",
    deck: "Caregiver Stress, Grief & Coping",
    type: "sa",
    prompt:
      "Briefly define caregiver stress/burnout in the context of disability caregiving.",
    answer:
      "Caregiver stress/burnout is the emotional and physical exhaustion that results from ongoing, demanding caregiving responsibilities.",
    explain:
      "Signs include irritability, sadness, mental fatigue, and feeling overwhelmed.",
    learn: [
      "Caregiving is often 24/7 with medical, behavioral, and scheduling demands.",
      "Without support, burnout reduces caregiver health and their ability to promote participation.",
    ],
  },
  {
    id: "cg_grief_adjustment_mc",
    deck: "Caregiver Stress, Grief & Coping",
    type: "mc",
    prompt:
      "Which statement about grief and adjustment in families is most accurate?",
    options: [
      "Families grieve once after diagnosis, then never again.",
      "Grief and adjustment can recur at different life stages (school entry, adolescence, adulthood).",
      "Grief only occurs if the disability is severe.",
      "Grief is always a sign of failure to cope.",
    ],
    answerIndex: 1,
    explain:
      "Families may re-experience grief as new milestones highlight differences or new demands.",
    learn: [
      "Adjustment includes redefining expectations, roles, and futures.",
      "Professionals should normalize this and support healthy coping over time.",
    ],
  },
  {
    id: "cg_resilience_ma",
    deck: "Caregiver Stress, Grief & Coping",
    type: "ma",
    prompt:
      "Which are examples of healthy coping and resilience strategies for families?",
    options: [
      "Support groups and peer connections",
      "Therapy or counseling",
      "Developing routines and structure",
      "Ignoring feelings and never asking for help",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Healthy coping improves long-term stability; suppression and isolation increase burnout.",
    learn: [
      "Meaning-making (finding purpose in caregiving) can also support resilience.",
      "Professionals can connect families to resources and reinforce strengths.",
    ],
  },
  {
    id: "cg_gatekeeping_tf",
    deck: "Caregiver Stress, Grief & Coping",
    type: "tf",
    prompt:
      "True/False: Caregiver burnout can unintentionally reduce a person’s access to physical activity, sport, and recreation.",
    answerBool: true,
    explain:
      "When caregivers are exhausted, they may lack energy, time, or motivation to arrange activities.",
    learn: [
      "Supporting caregiver health is indirectly a PA intervention for the individual.",
      "Respite care and flexible programs can help reduce this barrier.",
    ],
  },

  /* =========================================================
   * FAMILY DYNAMICS, CULTURE & FINANCES
   * ========================================================= */
  {
    id: "fd_cohesion_sa",
    deck: "Family Dynamics, Culture & Finances",
    type: "sa",
    prompt:
      "What is family cohesion, and how does it help in disability caregiving?",
    answer:
      "Family cohesion is the strength of emotional bonds and teamwork within a family, which helps share caregiving roles and reduce burnout.",
    explain:
      "Strong cohesion supports better division of labor and emotional support.",
    learn: [
      "Families with high cohesion can plan around PA opportunities more easily.",
      "Teamwork improves care quality and sustainability over time.",
    ],
  },
  {
    id: "fd_siblings_mc",
    deck: "Family Dynamics, Culture & Finances",
    type: "mc",
    prompt:
      "Which is a common experience siblings may face in families with a child with a disability?",
    options: [
      "Always receiving more attention than the child with a disability",
      "Feeling overlooked or pressured to take extra responsibilities",
      "Never being affected by caregiving at all",
      "Being legally barred from helping",
    ],
    answerIndex: 1,
    explain:
      "Siblings may feel ignored, over-responsible, or conflicted about their role.",
    learn: [
      "This can affect emotional development and relationships.",
      "Programs should consider sibling inclusion and support.",
    ],
  },
  {
    id: "fd_financial_ma",
    deck: "Family Dynamics, Culture & Finances",
    type: "ma",
    prompt:
      "Select the financial/economic factors that often affect families of individuals with disabilities:",
    options: [
      "Cost of medical appointments and therapy",
      "Adaptive equipment and assistive devices",
      "Transportation to services and activities",
      "Unlimited free funding for all needs",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Quiz 3 notes emphasize costs of care, equipment, and transportation as key economic burdens.",
    learn: [
      "Caregivers may reduce work hours or leave jobs, reducing income and career growth.",
      "Not all families know about financial assistance programs or qualify for them.",
    ],
  },
  {
    id: "fd_culture_tf",
    deck: "Family Dynamics, Culture & Finances",
    type: "tf",
    prompt:
      "True/False: Cultural beliefs and language barriers can affect whether families seek and use disability services.",
    answerBool: true,
    explain:
      "Some cultures normalize disability; others attach stigma or shame, and language barriers make systems harder to navigate.",
    learn: [
      "Professionals must use culturally responsive practice and accessible communication.",
      "Family decisions about PA, sport, and public participation are shaped by these beliefs.",
    ],
  },

  /* =========================================================
   * ASSESSMENT vs EVALUATION
   * ========================================================= */
  {
    id: "ae_def_assessment_sa",
    deck: "Assessment vs Evaluation",
    type: "sa",
    prompt:
      "In this course, what is the main purpose of assessment in adapted physical activity?",
    answer:
      "Assessment is used to gather information about an individual’s abilities, needs, and health status to plan appropriate programs and services.",
    explain:
      "Assessment = information collection to guide decisions, placement, and goal setting.",
    learn: [
      "Assessment can include health status, motor skills, cognition, psychosocial factors, and environment.",
      "It answers: Where is the person starting from? What do they need?",
    ],
  },
  {
    id: "ae_def_evaluation_sa",
    deck: "Assessment vs Evaluation",
    type: "sa",
    prompt:
      "How is evaluation different from assessment in the paradigm of effectiveness?",
    answer:
      "Evaluation occurs after or during an intervention to judge whether goals are met and whether the program is effective.",
    explain:
      "Assessment = BEFORE (baseline and planning). Evaluation = AFTER/DURING (did it work?).",
    learn: [
      "Evaluation compares new performance to baseline data.",
      "It guides program modification, continuation, or redesign.",
    ],
  },
  {
    id: "ae_compare_tf",
    deck: "Assessment vs Evaluation",
    type: "tf",
    prompt:
      "True/False: Both assessment and evaluation are part of the same effectiveness cycle, but they occur at different stages.",
    answerBool: true,
    explain:
      "The paradigm uses assess → plan → implement → evaluate → feedback.",
    learn: [
      "Assessment kicks off the cycle; evaluation informs the next planning phase.",
      "Both rely on good data and understanding of the individual and context.",
    ],
  },
  {
    id: "ae_purpose_mc",
    deck: "Assessment vs Evaluation",
    type: "mc",
    prompt:
      "Which is NOT a main purpose of assessment listed in your Quiz 3 notes?",
    options: [
      "Assessing health status",
      "Determining eligibility for services",
      "Helping with placement decisions",
      "Choosing the cheapest equipment for the program",
    ],
    answerIndex: 3,
    explain:
      "Equipment cost might matter, but core purposes are health status, eligibility, qualification, and placement.",
    learn: [
      "Assessment also helps plan intervention goals and motivate individuals by showing progress.",
    ],
  },

  /* =========================================================
   * PARADIGM FOR EFFECTIVENESS (ASSESS → PLAN → IMPLEMENT → EVALUATE)
   * ========================================================= */
  {
    id: "pe_steps_match",
    deck: "Paradigm for Effectiveness",
    type: "match",
    prompt: "Match each phase of the effectiveness paradigm to its focus.",
    pairs: [
      ["Assess", "Gather information about abilities, needs, health, context"],
      ["Plan", "Set goals, choose activities, adaptations, safety measures"],
      ["Implement", "Deliver the program, teach and supervise"],
      ["Evaluate", "Check progress and effectiveness; adjust as needed"],
    ],
    explain:
      "Everything sits inside environmental effects and feedback loops.",
    learn: [
      "Think of a circle: Assess → Plan → Implement → Evaluate → back to Assess with new info.",
      "Environment (facility, culture, transportation, weather, policy) affects all stages.",
    ],
  },
  {
    id: "pe_feedback_tf",
    deck: "Paradigm for Effectiveness",
    type: "tf",
    prompt:
      "True/False: In the paradigm for effectiveness, feedback and environmental effects influence every step of the cycle.",
    answerBool: true,
    explain:
      "Slides show two-way arrows and environmental context surrounding the whole model.",
    learn: [
      "Changes in environment (e.g., new equipment, new policy, different staff) can change assessment results and program success.",
    ],
  },
  {
    id: "pe_baseline_sa",
    deck: "Paradigm for Effectiveness",
    type: "sa",
    prompt:
      "Why is establishing baseline data an essential part of the effectiveness paradigm?",
    answer:
      "Baseline data gives a clear starting point so you can later compare and see whether the intervention worked.",
    explain:
      "Without a baseline, you can’t objectively judge progress or effectiveness.",
    learn: [
      "Baseline might include strength, endurance, range of motion, skill tests, or participation levels.",
      "Motivation: showing improvement over time can encourage individuals to keep participating.",
    ],
  },
  {
    id: "pe_motivation_mc",
    deck: "Paradigm for Effectiveness",
    type: "mc",
    prompt:
      "How can assessment and evaluation data be used to motivate individuals in adapted physical activity?",
    options: [
      "By hiding their results from them",
      "By showing improvement over time and celebrating progress",
      "By only focusing on failures",
      "By comparing them negatively to others",
    ],
    answerIndex: 1,
    explain:
      "Positive feedback based on real data supports confidence and long-term engagement.",
    learn: [
      "Visual charts, goal checklists, and small-win celebrations are practical tools.",
    ],
  },

  /* =========================================================
   * ASSESSMENT TOOLS & ISSUES (VALIDITY, RELIABILITY, FORMAL vs INFORMAL)
   * ========================================================= */
  {
    id: "at_validity_sa",
    deck: "Assessment Tools & Issues",
    type: "sa",
    prompt:
      "In one sentence, define validity in the context of assessment.",
    answer:
      "Validity is the degree to which a test actually measures what it is intended to measure.",
    explain: "Valid tests give meaningful, accurate information.",
    learn: [
      "Example: A balance test should actually evaluate balance, not just leg strength.",
      "If a test is invalid for a population (e.g., norms don’t match), the scores can mislead placement decisions.",
    ],
  },
  {
    id: "at_reliability_sa",
    deck: "Assessment Tools & Issues",
    type: "sa",
    prompt:
      "In one sentence, define reliability in the context of assessment.",
    answer:
      "Reliability is the consistency of a test in producing similar results when conditions stay the same.",
    explain:
      "A reliable test gives similar scores if repeated under similar conditions.",
    learn: [
      "Example: If someone walks the same distance at the same speed, their score on a 6-minute walk test should be similar.",
      "A test can be reliable but not valid (consistently wrong).",
    ],
  },
  {
    id: "at_formal_informal_mc",
    deck: "Assessment Tools & Issues",
    type: "mc",
    prompt:
      "Which statement best describes the difference between formal and informal assessment?",
    options: [
      "Formal assessments are standardized with protocols; informal assessments are flexible and observational.",
      "Formal assessments are guesses; informal are always data-based.",
      "Informal assessments must always involve expensive equipment.",
      "Formal assessments never measure physical skills.",
    ],
    answerIndex: 0,
    explain:
      "Formal tools (like Brockport, TGMD) have manuals and norms; informal uses checklists, rubrics, and observation.",
    learn: [
      "Both have a place in adapted PA; together they give a fuller picture.",
      "Informal assessments can be more person-centered and context-specific.",
    ],
  },
  {
    id: "at_issues_ma",
    deck: "Assessment Tools & Issues",
    type: "ma",
    prompt:
      "Select problems/issues associated with assessment listed in your notes:",
    options: [
      "Assessments can be time-consuming and require equipment.",
      "Many professionals lack training in assessment.",
      "Some tests are outdated or not valid for the population.",
      "Assessments are always free, quick, and perfectly designed.",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Time, training, cost, validity, and relevance are major real-world issues.",
    learn: [
      "Professionals must ask: Why am I using this test, and how will the results guide intervention?",
      "Using self-made tests without checking reliability/validity can lead to poor decisions.",
    ],
  },
  {
    id: "at_content_ref_tf",
    deck: "Assessment Tools & Issues",
    type: "tf",
    prompt:
      "True/False: A content-reference test is usually a teacher-made or program-specific test that measures exactly what was taught.",
    answerBool: true,
    explain:
      "It’s based on course content, not broad population norms.",
    learn: [
      "Examples: rubrics for a swimming skill, checklists for a walking route, or PE unit tests.",
      "Helpful for monitoring progress toward specific program goals.",
    ],
  },

  /* =========================================================
   * PROGRAM PLANNING ACROSS THE LIFESPAN
   * ========================================================= */
  {
    id: "lp_individual_needs_mc",
    deck: "Program Planning Across the Lifespan",
    type: "mc",
    prompt:
      "What is the MOST important factor when planning a physical activity program across the lifespan?",
    options: [
      "The popularity of the sport on social media",
      "The individual’s needs, abilities, health, and goals",
      "The instructor’s favorite activity",
      "The cheapest equipment available",
    ],
    answerIndex: 1,
    explain:
      "Your notes repeat that individual needs and abilities are the top priority.",
    learn: [
      "Functional limitations, comorbidities, preferences, and goals shape everything else.",
      "Even within one diagnosis (e.g., CP, autism), abilities differ widely.",
    ],
  },
  {
    id: "lp_lifespan_stages_match",
    deck: "Program Planning Across the Lifespan",
    type: "match",
    prompt: "Match age groups to primary program focuses.",
    pairs: [
      ["Children & Youth", "Fundamental skills, fun, social integration"],
      ["Adults", "Maintaining fitness, independence, community participation"],
      ["Older Adults", "Balance, fall prevention, mobility, joint-friendly movement"],
    ],
    explain:
      "Program focus shifts with developmental stage and life tasks.",
    learn: [
      "Children: games, exploration, confidence and peer interaction.",
      "Adults: routines that fit work/family, community roles, and self-management.",
      "Older adults: preserve function, prevent falls, reduce isolation.",
    ],
  },
  {
    id: "lp_accessibility_tf",
    deck: "Program Planning Across the Lifespan",
    type: "tf",
    prompt:
      "True/False: Physical accessibility (ramps, wide doorways, accessible restrooms) and transportation are critical considerations when planning programs.",
    answerBool: true,
    explain:
      "Many people never reach the program if buildings and transport aren’t accessible.",
    learn: [
      "Lack of transportation is one of the most powerful hidden barriers.",
      "Virtual or home-based options can expand access when travel is difficult.",
    ],
  },
  {
    id: "lp_motivation_sa",
    deck: "Program Planning Across the Lifespan",
    type: "sa",
    prompt:
      "Name one psychosocial factor you must consider when planning a physical activity program.",
    answer:
      "Motivation and enjoyment are critical so individuals want to keep participating.",
    explain:
      "Programs that are fun and meaningful have better adherence.",
    learn: [
      "Other factors: self-efficacy, preferences, routine needs, social support.",
      "Empowerment and choice increase ownership and long-term participation.",
    ],
  },
  {
    id: "lp_apta_goal_mc",
    deck: "Program Planning Across the Lifespan",
    type: "mc",
    prompt:
      "Which element is part of a well-written goal following APTA-style standards?",
    options: [
      "Vague language with no time frame",
      "A clear movement task, context, time frame, and rationale",
      "Only listing which equipment will be used",
      "Ignoring where the movement happens",
    ],
    answerIndex: 1,
    explain:
      "Your notes emphasize: who, movement problem, functional link, context, time frame, body part/impairment, target level, rationale.",
    learn: [
      "Example: ‘In 4 weeks, Alex will walk 20 meters from his classroom to the cafeteria with a walker and supervision to increase school independence.’",
    ],
  },

  /* =========================================================
   * HEALTH-RELATED FITNESS & PUBLIC HEALTH
   * ========================================================= */
  {
    id: "hf_health_def_sa",
    deck: "Health-Related Fitness & Public Health",
    type: "sa",
    prompt: "Give the definition of health used in this course.",
    answer:
      "Health is a dynamic, multidimensional state of complete physical, mental, and social well-being, not just the absence of disease.",
    explain:
      "Your notes also emphasize that good health can exist in the presence of disability.",
    learn: [
      "Dimensions: physical, mental, social, and intellectual well-being.",
      "Health exists on a continuum and changes over the lifespan.",
    ],
  },
  {
    id: "hf_physical_vs_exercise_mc",
    deck: "Health-Related Fitness & Public Health",
    type: "mc",
    prompt:
      "Which option correctly distinguishes physical activity from exercise?",
    options: [
      "Physical activity is any energy-requiring body movement, while exercise is planned, structured, and repetitive to improve fitness.",
      "Physical activity is always competitive sport, exercise is only stretching.",
      "Exercise is random movement; physical activity is strictly scheduled.",
      "They are identical terms with no differences.",
    ],
    answerIndex: 0,
    explain:
      "Exercise is a subcategory of physical activity with the explicit goal of improving or maintaining fitness.",
    learn: [
      "Examples PA: walking to class, cleaning, playing with kids.",
      "Examples Exercise: planned strength workout, jog, yoga class.",
    ],
  },
  {
    id: "hf_components_ma",
    deck: "Health-Related Fitness & Public Health",
    type: "ma",
    prompt:
      "Which are components of health-related fitness highlighted in your notes?",
    options: [
      "Cardiorespiratory endurance",
      "Muscular strength and endurance",
      "Flexibility",
      "Body composition",
      "Gambling skill",
    ],
    answerIndexes: [0, 1, 2, 3],
    explain:
      "Health-related fitness focuses on components that affect health and function.",
    learn: [
      "Improving these components helps prevent disease and maintain independence.",
    ],
  },
  {
    id: "hf_activity_stats_tf",
    deck: "Health-Related Fitness & Public Health",
    type: "tf",
    prompt:
      "True/False: Less than 5% of U.S. adults participate in 30 minutes of physical activity each day.",
    answerBool: true,
    explain:
      "Your slides describe low activity levels across adults, adolescents, and children.",
    learn: [
      "Only ~1 in 4 adults and 1 in 5 adolescents meet combined guidelines.",
      "This is a major public health concern tied to many chronic conditions.",
    ],
  },
  {
    id: "hf_guidelines_mc",
    deck: "Health-Related Fitness & Public Health",
    type: "mc",
    prompt:
      "For basic health promotion, about how much daily activity do the slides recommend?",
    options: [
      "10 minutes of slow walking once a week",
      "30 minutes of brisk walking (about 150 calories) on most days",
      "2 hours of high-intensity running daily",
      "No physical activity is needed for health",
    ],
    answerIndex: 1,
    explain:
      "30 minutes of moderate intensity, most days, is a core recommendation.",
    learn: [
      "For weight management, 60+ minutes/day; for weight loss maintenance, 60–90 minutes/day.",
      "Activity can be broken into shorter bouts across the day.",
    ],
  },
  {
    id: "hf_public_health_sa",
    deck: "Health-Related Fitness & Public Health",
    type: "sa",
    prompt:
      "Define public health as it is framed in this course.",
    answer:
      "Public health is what we, as a society, do collectively to ensure the conditions in which people can be healthy.",
    explain:
      "It includes government efforts, preventive medicine, health education, sanitation, and environmental monitoring.",
    learn: [
      "It is not just about individual choices, but systems: policies, environments, and access.",
      "Kinesiology contributes by promoting physical activity and health-related fitness at population levels.",
    ],
  },

  /* =========================================================
   * LEISURE & RECREATION
   * ========================================================= */
  {
    id: "lr_leisure_def_sa",
    deck: "Leisure & Recreation",
    type: "sa",
    prompt:
      "Give a concise definition of leisure activities from your notes.",
    answer:
      "Leisure activities are things people choose to do in their free time for pleasure, relaxation, or personal satisfaction.",
    explain:
      "Leisure is not mandatory work or chores; it’s chosen and enjoyable.",
    learn: [
      "Examples: reading, painting, gaming, sports, music, going out with friends.",
      "Leisure is vital for physical, emotional, and social well-being.",
    ],
  },
  {
    id: "lr_benefits_ma",
    deck: "Leisure & Recreation",
    type: "ma",
    prompt:
      "Select the major benefit areas of leisure listed in your notes:",
    options: [
      "Physical benefits",
      "Psychological and emotional benefits",
      "Social benefits",
      "Guaranteed lottery winnings",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Leisure supports body, mind, and social connection when it is meaningful and accessible.",
    learn: [
      "Physical: mobility, motor skills, fitness, prevention of obesity and CVD.",
      "Psychological: confidence, emotional regulation, independence, stress reduction.",
      "Social: friendships, community belonging, reduced isolation and stigma.",
    ],
  },
  {
    id: "lr_types_mc",
    deck: "Leisure & Recreation",
    type: "mc",
    prompt:
      "Which is an example of technology-based leisure for individuals with disabilities?",
    options: [
      "Video gaming with adapted controllers",
      "Only in-person running clubs",
      "Mandatory hospital visits",
      "Paper-based standardized tests",
    ],
    answerIndex: 0,
    explain:
      "Your notes mention gaming, VR, and leisure apps accessible with assistive tech.",
    learn: [
      "Apps: meditation, drawing, storytelling, music creation, social platforms.",
      "Tech can expand access when in-person options are limited.",
    ],
  },
  {
    id: "lr_disability_purpose_tf",
    deck: "Leisure & Recreation",
    type: "tf",
    prompt:
      "True/False: For individuals with disabilities, leisure is considered extra and not essential to quality of life.",
    answerBool: false,
    explain:
      "Your notes emphasize leisure is essential for life skills, independence, community adjustment, and emotional health.",
    learn: [
      "Leisure provides a context for practicing skills in meaningful, motivating ways.",
      "It supports identity, self-expression, and community participation.",
    ],
  },
  {
    id: "lr_locations_ma",
    deck: "Leisure & Recreation",
    type: "ma",
    prompt:
      "Which places were listed as potential locations for leisure and recreation?",
    options: [
      "Schools",
      "YMCA/YWCA",
      "Parks and ballparks",
      "Shopping malls and theme parks",
      "Secret underground labs only",
    ],
    answerIndexes: [0, 1, 2, 3],
    explain:
      "Your notes stress using real community settings, not just clinics.",
    learn: [
      "Other examples: movie theaters, Easter Seals programs, neighborhood spaces.",
      "Using typical community locations supports inclusion and community presence.",
    ],
  },
  {
    id: "lr_easy_adapt_sa",
    deck: "Leisure & Recreation",
    type: "sa",
    prompt:
      "Name one easily adapted leisure activity from your notes.",
    answer: "Swimming is one example of an easily adapted leisure activity.",
    explain:
      "Others include softball/Wiffle ball, goalball, walking/wheelchair walking, yoga, gardening, dance, and more.",
    learn: [
      "Easily adapted activities often allow modifications in rules, equipment, or intensity so many people can join.",
    ],
  },

  /* =========================================================
   * BARRIERS TO PARTICIPATION
   * ========================================================= */
  {
    id: "bp_policy_mc",
    deck: "Barriers to Participation",
    type: "mc",
    prompt:
      "Which is a policy/systemic barrier to leisure and physical activity participation?",
    options: [
      "Strong enforcement of ADA and 504",
      "Lack of enforcement or awareness of disability laws",
      "Universal free adaptive equipment",
      "Unlimited staff training funds",
    ],
    answerIndex: 1,
    explain:
      "When laws exist on paper but aren’t enforced or known, access can still be blocked.",
    learn: [
      "Underinvestment in adapted or therapeutic recreational programs is also a systemic barrier.",
    ],
  },
  {
    id: "bp_economic_sa",
    deck: "Barriers to Participation",
    type: "sa",
    prompt:
      "Describe one economic barrier to participation mentioned in your notes.",
    answer:
      "High cost of adapted equipment or program fees is a major economic barrier.",
    explain:
      "Limited financial resources and underemployment often make these costs hard to cover.",
    learn: [
      "Families may have to choose between essential medical care and recreation.",
      "Sliding-scale fees, grants, and equipment loans are potential solutions.",
    ],
  },
  {
    id: "bp_physical_ma",
    deck: "Barriers to Participation",
    type: "ma",
    prompt:
      "Select examples of physical/environmental barriers from the notes:",
    options: [
      "Inaccessible venues or equipment",
      "Lack of transportation",
      "No personal assistance when needed",
      "Beautifully designed accessible trails",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Physical barriers include both facility design and the ability to get to the program.",
    learn: [
      "Accessible design and reliable transportation are foundational to participation.",
    ],
  },
  {
    id: "bp_attitudinal_tf",
    deck: "Barriers to Participation",
    type: "tf",
    prompt:
      "True/False: Stigma and misconceptions about the abilities of individuals with disabilities can reduce programming and participation.",
    answerBool: true,
    explain:
      "Attitudinal barriers lead to fewer opportunities and less inclusion.",
    learn: [
      "Providers may avoid offering programs due to low expectations or fear.",
      "Training and exposure can shift attitudes over time.",
    ],
  },
  {
    id: "bp_school_barriers_sa",
    deck: "Barriers to Participation",
    type: "sa",
    prompt:
      "Give one barrier mentioned in your notes that affects whole-school health approaches.",
    answer:
      "A lack of adequate funding and staff buy-in is a key barrier to whole-school health approaches.",
    explain:
      "Other issues: insufficient staff training, not engaging students, administrative inconsistency, high staff turnover.",
    learn: [
      "Whole-school health connects learning and health; barriers prevent that connection from being fully realized.",
    ],
  },

  /* =========================================================
   * PROMOTING PA, EXERCISE, RECREATION & LEISURE
   * ========================================================= */
  {
    id: "pr_inclusive_programs_mc",
    deck: "Promoting PA, Exercise, Recreation & Leisure",
    type: "mc",
    prompt:
      "Which strategy best reflects promoting participation according to your notes?",
    options: [
      "Offer only segregated, disability-only programs in separate buildings",
      "Provide inclusive and adaptive opportunities where disabled and nondisabled participants can participate together when possible",
      "Avoid modifying equipment so programs stay ‘standard’",
      "Discourage families from attending to reduce crowding",
    ],
    answerIndex: 1,
    explain:
      "Inclusive programming + adaptive equipment were emphasized as key strategies.",
    learn: [
      "Unified programs, adapted classes, and flexible formats help normalize participation.",
    ],
  },
  {
    id: "pr_family_education_tf",
    deck: "Promoting PA, Exercise, Recreation & Leisure",
    type: "tf",
    prompt:
      "True/False: Educating and empowering families about adaptive sports and community resources is a key strategy to increase participation.",
    answerBool: true,
    explain:
      "Your notes highlight workshops, resource lists, and mentorship.",
    learn: [
      "Families often don’t know what exists or how to adapt activities at home.",
      "Connecting experienced and new families builds confidence.",
    ],
  },
  {
    id: "pr_reduce_barriers_ma",
    deck: "Promoting PA, Exercise, Recreation & Leisure",
    type: "ma",
    prompt:
      "Which strategies from your notes help reduce participation barriers?",
    options: [
      "Offering sliding-scale prices and scholarships",
      "Providing accessible transportation or closer locations",
      "Scheduling only during school/work hours",
      "Using community-based, nearby programs",
    ],
    answerIndexes: [0, 1, 3],
    explain:
      "Cost, transport, and location are major modifiable barriers.",
    learn: [
      "Flexible scheduling (evenings/weekends) also helps busy families.",
    ],
  },
  {
    id: "pr_social_support_sa",
    deck: "Promoting PA, Exercise, Recreation & Leisure",
    type: "sa",
    prompt:
      "Name one way to build social support networks around physical activity and leisure.",
    answer:
      "Creating peer support groups or buddy systems helps build social inclusion and motivation.",
    explain:
      "Schools, clinics, and organizations can partner to create these networks.",
    learn: [
      "Social support increases attendance, enjoyment, and long-term engagement.",
    ],
  },
  {
    id: "pr_celebrate_progress_tf",
    deck: "Promoting PA, Exercise, Recreation & Leisure",
    type: "tf",
    prompt:
      "True/False: Your notes recommend celebrating effort, attendance, and teamwork—not just winning—to sustain motivation.",
    answerBool: true,
    explain:
      "Certificates, visual aids, and storytelling were specifically mentioned.",
    learn: [
      "Celebrating progress builds community pride and reinforces participation.",
    ],
  },

  /* =========================================================
   * ADAPTED SPORT & EQUAL OPPORTUNITY
   * ========================================================= */
  {
    id: "sp_def_sa",
    deck: "Adapted Sport & Equal Opportunity",
    type: "sa",
    prompt:
      "In one sentence, define adapted sport for individuals with disabilities.",
    answer:
      "Adapted sport is sport that is modified or specifically designed so individuals with disabilities can participate safely and effectively for recreation, competition, or therapy.",
    explain:
      "It includes individual, dual, and team activities with physical exertion and skill.",
    learn: [
      "Examples: wheelchair basketball, goalball, sitting volleyball, power soccer, adapted skiing.",
    ],
  },
  {
    id: "sp_benefits_ma",
    deck: "Adapted Sport & Equal Opportunity",
    type: "ma",
    prompt:
      "Select the benefit areas of adapted sports highlighted in your notes:",
    options: [
      "Physical benefits (cardiovascular, strength, flexibility)",
      "Cognitive and emotional benefits",
      "Affective and social benefits",
      "Guaranteed professional contracts",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Sport supports body, brain, emotions, and social identity.",
    learn: [
      "Physical: improved health, reduced secondary conditions, better motor control.",
      "Cognitive/emotional: decision-making, focus, confidence, reduced depression/anxiety.",
      "Social: teamwork, leadership, friendship, visibility.",
    ],
  },
  {
    id: "sp_delivery_mc",
    deck: "Adapted Sport & Equal Opportunity",
    type: "mc",
    prompt:
      "Which term describes a model where individuals with and without disabilities play together on the same team?",
    options: ["Segregated sport", "Unified sport", "Parallel sport", "Virtual sport"],
    answerIndex: 1,
    explain:
      "Unified sport mixes disabled and nondisabled athletes on the same team.",
    learn: [
      "Parallel sport: disabled athletes on same team but may compete separately.",
      "Segregated sport: only disabled athletes.",
      "Virtual sport: remote or online competition formats.",
    ],
  },
  {
    id: "sp_paralympics_tf",
    deck: "Adapted Sport & Equal Opportunity",
    type: "tf",
    prompt:
      "True/False: Paralympic sports are governed by the International Paralympic Committee (IPC) and include sports like wheelchair basketball and sitting volleyball.",
    answerBool: true,
    explain:
      "Your notes list specific Paralympic sports and the IPC’s role.",
    learn: [
      "Special Olympics focuses on intellectual disabilities; Deaflympics focuses on athletes who are deaf or hard of hearing.",
    ],
  },
  {
    id: "sp_barriers_ma",
    deck: "Adapted Sport & Equal Opportunity",
    type: "ma",
    prompt:
      "Which are barriers specific to disability sport listed in your notes?",
    options: [
      "Limited programs, especially in rural or low-income areas",
      "High cost of specialized equipment",
      "Shortage of trained coaches in adapted techniques",
      "Automatic high media coverage and funding",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "Accessibility, resources, and training are major limits; media coverage is often low.",
    learn: [
      "Classification complexity and mental health/burnout are also noted challenges.",
    ],
  },
  {
    id: "sp_empowerment_sa",
    deck: "Adapted Sport & Equal Opportunity",
    type: "sa",
    prompt:
      "According to your notes, what is the big-picture role of sport for individuals with disabilities in society?",
    answer:
      "Sports for individuals with disabilities are a pathway to empowerment, inclusion, and equity.",
    explain:
      "They provide visibility, challenge stereotypes, and build skills and confidence.",
    learn: [
      "But access problems (funding, awareness, availability) still limit who can benefit.",
      "Coordinated efforts from governments, schools, communities, and sport bodies are needed.",
    ],
  },

  /* =========================================================
   * SCHOOL POLICY, ADA & 504
   * ========================================================= */
  {
    id: "sc_504_tf",
    deck: "School Policy, ADA & 504",
    type: "tf",
    prompt:
      "True/False: Section 504 of the Rehabilitation Act requires schools receiving federal funds to provide equal opportunity in extracurricular activities, including sports, for students with disabilities.",
    answerBool: true,
    explain:
      "Not offering assistance can violate Section 504.",
    learn: [
      "Schools must provide reasonable accommodations and aids unless it fundamentally alters the program.",
    ],
  },
  {
    id: "sc_reasonable_accom_ma",
    deck: "School Policy, ADA & 504",
    type: "ma",
    prompt:
      "Which are examples of reasonable accommodations in school sports from your notes?",
    options: [
      "Using a visual cue instead of a starter gun for a deaf runner",
      "Exempting a one-arm amputee from a two-hand touch rule in swimming",
      "Providing glucose testing and insulin support for a diabetic athlete",
      "Canceling the team so nobody can play",
    ],
    answerIndexes: [0, 1, 2],
    explain:
      "These accommodations adjust rules/equipment while still keeping the sport meaningful and safe.",
    learn: [
      "Refusing all assistance would violate Section 504 responsibilities.",
    ],
  },
  {
    id: "sc_equal_opportunity_mc",
    deck: "School Policy, ADA & 504",
    type: "mc",
    prompt:
      "What must schools do to show they are providing equal opportunity in athletics?",
    options: [
      "Guarantee every student with a disability a starting position on the team",
      "Make reasonable accommodations and allow participation to the maximum appropriate extent",
      "Only allow students with disabilities to practice, not compete",
      "Provide separate programs and never modify general programs",
    ],
    answerIndex: 1,
    explain:
      "Skill requirements and tryouts can still exist, but barriers must be reduced with accommodations.",
    learn: [
      "If general programs don’t work even with accommodations, schools should offer special/adapted programs with equal support.",
    ],
  },
  {
    id: "sc_special_programs_tf",
    deck: "School Policy, ADA & 504",
    type: "tf",
    prompt:
      "True/False: Separate adapted sport programs (like wheelchair basketball) are acceptable, but they should be supported equally with other athletic activities.",
    answerBool: true,
    explain:
      "They are in addition to, not replacements for, inclusive opportunities.",
    learn: [
      "Support includes funding, facilities, coaching, scheduling, and recognition.",
    ],
  },
  {
    id: "sc_policy_barriers_sa",
    deck: "School Policy, ADA & 504",
    type: "sa",
    prompt:
      "Name one policy barrier that can prevent students with disabilities from engaging in sport or PE.",
    answer:
      "Schools may fail to enforce or implement ADA/504 requirements, limiting equal opportunity.",
    explain:
      "Other barriers: lack of administrator support, lack of staff training, unclear policies.",
    learn: [
      "Policy on paper must translate to practice in facilities, schedules, and program design.",
    ],
  },
  {
    id: "sc_gao_2010_mc",
    deck: "School Policy, ADA & 504",
    type: "mc",
    prompt:
      "The 2010 GAO report on public schools concluded that:",
    options: [
      "Participation in extracurricular sports offers no benefits for students with disabilities.",
      "Benefits of participation for students with disabilities exist and warrant development and continuation of opportunities.",
      "Schools have no responsibility to offer sports to students with disabilities.",
      "Sports should only be offered at private clubs.",
    ],
    answerIndex: 1,
    explain:
      "The report reinforced that schools and society have a responsibility to offer sports activities.",
    learn: [
      "This helps justify investment in inclusive and adapted school sport programs.",
    ],
  },
];
