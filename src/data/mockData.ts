export const openTypes = [
  "Coffee chats",
  "Mentoring",
  "Resume review",
  "Referrals",
  "Speaking at events",
];
export const pathways = [
  {
    id: "design",
    name: "Learning Experience & Instructional Design",
    short: "Learning design",
    description: "Design learning that makes a meaningful difference in workplaces and beyond.",
    roles: ["Learning experience designer", "Instructional designer", "Learning strategist"],
    employers: ["Brightpath Learning", "Evergreen Labs"],
    skills: ["Learning design", "Figma", "Facilitation"],
    trajectory: ["LDIT design studio", "Learning designer", "Senior learning strategist"],
  },
  {
    id: "product",
    name: "EdTech Product Management",
    short: "EdTech product",
    description: "Bring learner needs into the decisions about what gets built.",
    roles: ["Associate product manager", "Product manager", "Product operations lead"],
    employers: ["Northstar Education", "Curio Learning"],
    skills: ["Product strategy", "Data analysis", "Prototyping"],
    trajectory: ["LDIT product project", "Associate PM", "Product lead"],
  },
  {
    id: "research",
    name: "UX & Learning Research",
    short: "UX / learning research",
    description: "Understand how people learn and translate evidence into better experiences.",
    roles: ["UX researcher", "Learning scientist", "Research coordinator"],
    employers: ["Openfield Research", "Mosaic Studio"],
    skills: ["Research", "Data analysis", "Interviewing"],
    trajectory: ["LDIT research assistant", "UX researcher", "Research lead"],
  },
  {
    id: "higher-ed",
    name: "Higher Education Learning Innovation",
    short: "Higher education",
    description: "Partner with faculty to create accessible, engaging university learning.",
    roles: ["Learning designer", "Faculty development specialist", "Digital learning director"],
    employers: ["Lakebridge University", "Westhaven College"],
    skills: ["Learning design", "Accessibility", "Facilitation"],
    trajectory: ["LDIT practicum", "Faculty learning partner", "Digital learning director"],
  },
  {
    id: "k12",
    name: "K–12 Curriculum & Technology Leadership",
    short: "K–12 leadership",
    description: "Lead thoughtful curriculum and technology change in schools.",
    roles: ["Curriculum designer", "Instructional coach", "Technology director"],
    employers: ["Riverbend Schools", "Oakline Academy"],
    skills: ["Curriculum", "Coaching", "Accessibility"],
    trajectory: ["LDIT school partnership", "Instructional coach", "District learning leader"],
  },
  {
    id: "impact",
    name: "Nonprofit, Social Impact & Policy",
    short: "Social impact",
    description: "Use learning and evidence to advance equitable public outcomes.",
    roles: ["Program manager", "Policy analyst", "Learning and evaluation lead"],
    employers: ["Learning Commons", "Civic Futures"],
    skills: ["Evaluation", "Facilitation", "Research"],
    trajectory: ["LDIT community project", "Program associate", "Impact director"],
  },
  {
    id: "startup",
    name: "Entrepreneurship & Startups",
    short: "Entrepreneurship",
    description: "Build something new around a learning problem worth solving.",
    roles: ["Founder", "Venture designer", "Learning consultant"],
    employers: ["Wonderwork", "Small Steps Studio"],
    skills: ["Prototyping", "Product strategy", "Learning design"],
    trajectory: ["LDIT prototype", "Founder / consultant", "Growing a learning venture"],
  },
  {
    id: "doctoral",
    name: "Doctoral & Academic Research",
    short: "Doctoral research",
    description: "Pursue sustained inquiry into learning, technology, and society.",
    roles: ["Doctoral researcher", "Research associate", "Assistant professor"],
    employers: ["Lakebridge University", "Eastmere Institute"],
    skills: ["Research", "Data analysis", "Academic writing"],
    trajectory: ["LDIT thesis / RA role", "Doctoral researcher", "Research faculty"],
  },
];
export type Alum = {
  id: string;
  name: string;
  headline: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  cohort: number;
  pathways: string[];
  bio: string;
  skills: string[];
  hobbies: string[];
  undergrad: string;
  major: string;
  pastRoles: string[];
  education: string[];
  askAbout: string[];
  wish: string;
  openTo: string[];
  availability: string;
  linkedin: string;
  optedIn: boolean;
  hidden: string[];
  imported: string[];
};
const seeds = [
  [
    "maya-chen",
    "Maya Chen",
    "Senior Learning Designer",
    "Brightpath Learning",
    "Corporate learning",
    "Boston, MA",
    2021,
    "design",
    "Psychology",
    "Lakebridge University",
    "Teaching",
    "Figma,Learning design,Facilitation",
    "Hiking,Photography",
  ],
  [
    "samir-patel",
    "Samir Patel",
    "Product Manager",
    "Northstar Education",
    "EdTech",
    "New York, NY",
    2020,
    "product",
    "Computer Science",
    "Westhaven College",
    "Software engineering",
    "Product strategy,Data analysis,Prototyping",
    "Cooking,Cycling",
  ],
  [
    "elena-rivera",
    "Elena Rivera",
    "UX Research Lead",
    "Openfield Research",
    "EdTech",
    "Boston, MA",
    2019,
    "research",
    "Psychology",
    "Lakebridge University",
    "Teaching",
    "Research,Interviewing,Data analysis",
    "Hiking,Reading",
  ],
  [
    "jordan-brooks",
    "Jordan Brooks",
    "Digital Learning Director",
    "Lakebridge University",
    "Higher education",
    "Chicago, IL",
    2015,
    "higher-ed",
    "History",
    "Maplecrest College",
    "Higher education",
    "Learning design,Accessibility,Facilitation",
    "Running,Music",
  ],
  [
    "amina-osei",
    "Amina Osei",
    "Curriculum Innovation Lead",
    "Riverbend Schools",
    "K–12",
    "Atlanta, GA",
    2018,
    "k12",
    "Education",
    "Eastmere Institute",
    "Teaching",
    "Curriculum,Coaching,Accessibility",
    "Gardening,Reading",
  ],
  [
    "lucas-moreno",
    "Lucas Moreno",
    "Learning & Evaluation Manager",
    "Civic Futures",
    "Nonprofit",
    "Washington, DC",
    2022,
    "impact",
    "Sociology",
    "Westhaven College",
    "Nonprofit",
    "Evaluation,Research,Facilitation",
    "Cooking,Music",
  ],
  [
    "priya-nair",
    "Priya Nair",
    "Founder",
    "Wonderwork",
    "EdTech",
    "San Francisco, CA",
    2023,
    "startup",
    "Engineering",
    "Oakridge University",
    "Consulting",
    "Prototyping,Product strategy,Learning design",
    "Climbing,Photography",
  ],
  [
    "theo-williams",
    "Theo Williams",
    "Doctoral Researcher",
    "Eastmere Institute",
    "Higher education",
    "Boston, MA",
    2025,
    "doctoral",
    "Psychology",
    "Lakebridge University",
    "Research",
    "Research,Data analysis,Academic writing",
    "Reading,Hiking",
  ],
  [
    "sofia-vasquez",
    "Sofia Vasquez",
    "Museum Learning Producer",
    "Mosaic Studio",
    "Arts & culture",
    "New York, NY",
    2017,
    "design",
    "Industrial Engineering",
    "Universidad del Pacifico Norte",
    "Banking",
    "Learning design,Prototyping,Figma",
    "Dance,Photography",
  ],
  [
    "oliver-kim",
    "Oliver Kim",
    "Climate Learning Strategist",
    "Learning Commons",
    "Nonprofit",
    "Seattle, WA",
    2024,
    "impact",
    "Environmental Science",
    "Oakridge University",
    "Environmental advocacy",
    "Facilitation,Evaluation,Research",
    "Hiking,Cycling",
  ],
  [
    "nadia-hassan",
    "Nadia Hassan",
    "Game Learning Designer",
    "Curio Learning",
    "EdTech",
    "Remote",
    2021,
    "design",
    "Architecture",
    "Maplecrest College",
    "Architecture",
    "Figma,Prototyping,Learning design",
    "Gaming,Drawing",
  ],
  [
    "benjamin-reed",
    "Benjamin Reed",
    "Faculty Learning Partner",
    "Westhaven College",
    "Higher education",
    "Chicago, IL",
    2016,
    "higher-ed",
    "English",
    "Eastmere Institute",
    "Teaching",
    "Accessibility,Learning design,Coaching",
    "Music,Running",
  ],
] as const;
export const alumni: Alum[] = seeds.map((s, i) => ({
  id: s[0],
  name: s[1],
  headline: `${s[2]} · Learning, people & possibility`,
  role: s[2],
  company: s[3],
  industry: s[4],
  location: s[5],
  cohort: s[6],
  pathways: [s[7], ...(i === 0 ? ["research"] : [])],
  major: s[8],
  undergrad: s[9],
  pastRoles: [`${s[10]} specialist at ${i % 2 ? "Fieldstone Collective" : "Bridgeway Group"}`],
  education: [`${s[9]} · ${s[8]}`, `HGSE · LDIT ${s[6]}`],
  skills: s[11].split(","),
  hobbies: s[12].split(","),
  bio: `I work at the intersection of learning and ${s[4].toLowerCase()}. LDIT helped me connect research with practice. I enjoy sharing the winding path from ${s[10].toLowerCase()} to my work at ${s[3]}.`,
  askAbout: ["Breaking into " + s[4].toLowerCase(), "Portfolio projects", "Career transitions"],
  wish: "You do not need your entire career mapped out. Start with a small project and a genuinely curious conversation.",
  openTo: [
    "Coffee chats",
    ...(i % 2 === 0 ? ["Mentoring", "Resume review"] : ["Referrals"]),
    ...(i % 3 === 0 ? ["Speaking at events"] : []),
  ],
  availability: "One or two 20-minute chats a month; weekday afternoons work best.",
  linkedin: `https://www.linkedin.com/in/demo-${s[0]}`,
  optedIn: true,
  hidden: [],
  imported: [],
}));
export type Student = {
  name: string;
  program: string;
  cohort: number;
  undergrad: string;
  major: string;
  pastWork: string;
  skills: string[];
  hobbies: string[];
  industries: string[];
  roles: string[];
  locations: string[];
  pathways: string[];
  goal: string;
};
export const sampleStudent: Student = {
  name: "Alex Morgan",
  program: "LDIT",
  cohort: 2026,
  undergrad: "Lakebridge University",
  major: "Psychology",
  pastWork: "Teaching specialist at Bridgeway Group",
  skills: ["Learning design", "Figma", "Research"],
  hobbies: ["Hiking", "Photography"],
  industries: ["EdTech", "Corporate learning"],
  roles: ["Learning designer", "UX researcher"],
  locations: ["Boston, MA", "Remote"],
  pathways: ["design", "research"],
  goal: "Explore learning design and research roles, get portfolio feedback, and build lasting connections.",
};
export const blankAlum: Alum = {
  id: "my-profile",
  name: "Alex Morgan",
  headline: "LDIT alum · Exploring what comes next",
  role: "Learning Designer",
  company: "Fieldstone Collective",
  industry: "EdTech",
  location: "Boston, MA",
  cohort: 2025,
  pathways: ["design"],
  bio: "",
  skills: [],
  hobbies: [],
  undergrad: "",
  major: "",
  pastRoles: [],
  education: [],
  askAbout: [],
  wish: "",
  openTo: ["Coffee chats"],
  availability: "",
  linkedin: "",
  optedIn: false,
  hidden: [],
  imported: [],
};
export const importedProfile = {
  headline: "Learning Designer · Building learner-centered experiences",
  role: "Learning Designer",
  company: "Evergreen Labs",
  location: "Boston, MA",
  pastRoles: [
    "Teaching specialist at Bridgeway Group",
    "Learning associate at Fieldstone Collective",
  ],
  education: ["Lakebridge University · Psychology", "HGSE · LDIT"],
  skills: ["Learning design", "Figma", "Facilitation"],
  industry: "Corporate learning",
};
export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  function: string;
  date: string;
  description: string;
  alumId?: string | undefined;
  url: string;
};
export const jobs: Job[] = (
  [
    [
      "Learning Experience Designer",
      "Brightpath Learning",
      "Boston, MA · Hybrid",
      "Full-time",
      "Mid-level",
      "Learning design",
      "maya-chen",
    ],
    [
      "Associate Product Manager",
      "Northstar Education",
      "New York, NY · Hybrid",
      "Full-time",
      "Entry-level",
      "Product",
      "samir-patel",
    ],
    [
      "UX Research Intern",
      "Openfield Research",
      "Remote",
      "Internship",
      "Entry-level",
      "UX research",
      "elena-rivera",
    ],
    [
      "Learning Design Fellow",
      "Lakebridge University",
      "Chicago, IL",
      "Fellowship",
      "Entry-level",
      "Higher ed",
      "jordan-brooks",
    ],
    [
      "Curriculum Designer",
      "Riverbend Schools",
      "Atlanta, GA",
      "Contract",
      "Mid-level",
      "Teaching / K–12",
      "amina-osei",
    ],
    [
      "Program Associate",
      "Civic Futures",
      "Washington, DC · Hybrid",
      "Full-time",
      "Entry-level",
      "Program management",
      "lucas-moreno",
    ],
    [
      "Learning Product Consultant",
      "Wonderwork",
      "Remote",
      "Contract",
      "Mid-level",
      "Product",
      "priya-nair",
    ],
    [
      "Research Coordinator",
      "Eastmere Institute",
      "Boston, MA",
      "Full-time",
      "Entry-level",
      "UX research",
      "theo-williams",
    ],
    [
      "Impact Evaluation Fellow",
      "Learning Commons",
      "Seattle, WA · Hybrid",
      "Fellowship",
      "Entry-level",
      "Nonprofit",
      "oliver-kim",
    ],
  ] as const
).map((s, i) => ({
  id: `job-${i}`,
  title: s[0],
  company: s[1],
  location: s[2],
  type: s[3],
  level: s[4],
  function: s[5],
  alumId: s[6],
  date: `2026-11-${String(18 - i).padStart(2, "0")}`,
  description:
    "Collaborate with a thoughtful team to turn learner needs into accessible experiences. Bring curiosity, evidence, and a portfolio of work you care about.",
  url: "https://example.com/demo-opportunity",
}));
export type NetworkEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  host: string;
  description: string;
  alumIds: string[];
};
export const events: NetworkEvent[] = (
  [
    [
      "Designing your first learning portfolio",
      "2026-11-24T17:00:00",
      "Virtual",
      "Workshop",
      "Maya Chen",
      "A hands-on session on choosing projects and telling the story behind your design decisions.",
      "maya-chen",
    ],
    [
      "Beyond the obvious: LDIT career paths",
      "2026-12-03T18:00:00",
      "Cambridge, MA",
      "Panel",
      "HGSE LDIT community",
      "Hear from alums who took their learning expertise into museums, climate action, and games.",
      "sofia-vasquez,oliver-kim,nadia-hassan",
    ],
    [
      "Coffee & connections",
      "2026-11-28T10:00:00",
      "Cambridge, MA",
      "Networking",
      "LDIT alumni circle",
      "Small-group conversations with students and alumni over coffee.",
      "elena-rivera,maya-chen",
    ],
    [
      "Inside an EdTech product team",
      "2026-12-10T16:00:00",
      "Virtual",
      "Info session",
      "Samir Patel",
      "Explore how product teams collaborate with learning designers and researchers.",
      "samir-patel",
    ],
    [
      "Research that reaches learners",
      "2026-12-15T17:30:00",
      "Virtual",
      "Speaker",
      "Theo Williams",
      "An informal conversation about doctoral study and building a research agenda.",
      "theo-williams",
    ],
    [
      "End-of-semester community gathering",
      "2026-12-18T18:00:00",
      "Cambridge, MA",
      "Social",
      "LDIT community",
      "Celebrate the semester and reconnect with classmates and alumni.",
      "priya-nair",
    ],
    [
      "Making a career pivot",
      "2026-10-20T17:00:00",
      "Virtual",
      "Panel",
      "Sofia Vasquez",
      "Stories of changing fields and making previous experience part of your new path.",
      "sofia-vasquez",
    ],
    [
      "Portfolio feedback circle",
      "2026-11-05T16:00:00",
      "Cambridge, MA",
      "Workshop",
      "Nadia Hassan",
      "Peer feedback on learning design portfolios.",
      "nadia-hassan",
    ],
  ] as const
).map((s, i) => ({
  id: `event-${i}`,
  title: s[0],
  date: s[1],
  location: s[2],
  type: s[3],
  host: s[4],
  description: s[5],
  alumIds: s[6].split(","),
}));
export const questionGroups = [
  {
    category: "Getting started",
    questions: [
      "What has been energizing you at work lately?",
      "What drew you to learning design and technology?",
      "What would you like me to know about your work before we start?",
    ],
  },
  {
    category: "Their career path",
    questions: [
      "How did you get from LDIT to your current role?",
      "Which career transition taught you the most?",
      "Was there a project or person that opened a door for you?",
      "How did your earlier experience shape your current work?",
    ],
  },
  {
    category: "Day-to-day work",
    questions: [
      "What does a typical week look like for you?",
      "What problem is your team working on right now?",
      "Who do you collaborate with most often?",
      "How do you measure whether your work helps learners?",
    ],
  },
  {
    category: "Skills & breaking in",
    questions: [
      "Which skills do you use most often?",
      "What makes a portfolio stand out to your team?",
      "How do people usually get hired in your field?",
      "What is one small project I could try this semester?",
    ],
  },
  {
    category: "The LDIT experience",
    questions: [
      "Which HGSE course or project still shapes your work?",
      "What do you wish you had tried during LDIT?",
      "How did you make use of the HGSE community?",
      "How did you translate your coursework into a portfolio?",
    ],
  },
  {
    category: "Industry & trends",
    questions: [
      "What changes in your industry are you watching?",
      "Where do you see opportunities for early-career professionals?",
      "How is AI changing the work without losing the learner perspective?",
      "Which communities help you stay informed?",
    ],
  },
  {
    category: "Advice",
    questions: [
      "What would you do if you were in my position today?",
      "What do you wish you had known before your first role?",
      "How do you decide whether an opportunity is a good fit?",
      "Are there labs or organizations you suggest exploring?",
    ],
  },
  {
    category: "Closing",
    questions: [
      "Is there anyone else you think I should speak with?",
      "If a relevant role opens, would you feel comfortable considering a referral?",
      "Would it be okay to keep you posted?",
      "Is there something I can help you with?",
    ],
  },
];
export const questions = questionGroups.flatMap((g, gi) =>
  g.questions.map((text, i) => ({
    id: `q-${gi}-${i}`,
    category: g.category,
    text,
    pathways: [
      "design",
      "product",
      "research",
      "higher-ed",
      "k12",
      "impact",
      "startup",
      "doctoral",
    ],
  })),
);
export const pathwayQuestions = pathways.map((p) => ({
  id: `q-path-${p.id}`,
  category: "Pathway focus",
  text: `What would you recommend to someone entering ${p.short.toLowerCase()}?`,
  pathways: [p.id],
}));
export const resources = [
  {
    category: "Career services & advising",
    title: "Career conversation planner",
    description:
      "A sample worksheet for planning an advising appointment and mapping your next steps.",
  },
  {
    category: "Portfolio & resume",
    title: "Learning designer portfolio review",
    description: "Sample prompts for making your process, evidence, and impact visible.",
  },
  {
    category: "Interview preparation",
    title: "Tell the story behind your project",
    description:
      "Practice explaining the problem, your decisions, the results, and what you learned.",
  },
  {
    category: "Professional communities",
    title: "Learning Design Circle",
    description:
      "A fictional community for monthly critiques and conversations with learning professionals.",
  },
  {
    category: "Newsletters & podcasts",
    title: "The Curious Learner",
    description:
      "A fictional weekly digest of learning science, design practice, and career stories.",
  },
  {
    category: "LDIT-specific",
    title: "LDIT project-to-portfolio checklist",
    description: "A sample guide to turning course projects and practica into work you can share.",
  },
];
export const storyExample =
  "Hi, I'm Sofia — I'm in the LDIT master's program at HGSE. Before Harvard I studied industrial engineering in Lima and ran training programs at a bank. Watching people learn under real constraints pulled me into this field. Now I'm exploring learning experience design and AI tools that support teachers. I'd love to hear how you found your way into this work.";

// Authored fictional profiles and scripts from the uploaded First Hello activity.
export const firstHelloData = {
  profiles: [
    {
      name: "Maya",
      role: "Learning designer at an education nonprofit",
      plain:
        "I help teachers learn and try new ways of teaching. A nonprofit is an organization working toward a mission; mine supports public-school teachers.",
      path: "I taught primary school, studied learning design through LDIT, and moved into a team that supports teacher learning.",
      day: "I talk with teachers about a classroom problem, plan a workshop, write activities, and check what teachers actually use afterward. I also discuss priorities with school leaders and the organizations funding our work.",
      project:
        "We created a workshop about giving students useful feedback. Teachers liked the session, but some stopped using the activities a month later. We are trying to understand why.",
      curious:
        "How can a short workshop lead to changes that last? I enjoy hearing examples from people who have taught or supported learners.",
      replies: [
        [
          "A",
          "I assumed being a good teacher would automatically make me a good designer. I had to learn to ask teachers what they needed instead of turning every idea from my own classroom into a workshop.",
        ],
        [
          "B",
          "I visit a classroom, ask what made the idea hard to use, and simplify the activity with a teacher. Sometimes the problem is lack of planning time, not lack of interest.",
        ],
        [
          "C",
          "I am curious about what helps teachers keep trying something after a workshop ends. A student’s example of learning a new habit could give me another way to think about that problem.",
        ],
      ],
    },
    {
      name: "Dev",
      role: "Learning researcher at an education technology company",
      plain:
        "I study how people learn with a digital tool so the team can improve it. Education technology means tools such as learning websites or apps.",
      path: "I helped run community learning activities, studied at LDIT, and joined a company that makes an adult-learning app.",
      day: "I watch people try an activity, interview them, review where they get stuck, and discuss changes with the people who design and build the app.",
      project:
        "Our team made hints to help adults learn a new skill. Some learners clicked through without understanding them. We are testing shorter hints and asking learners what they expected.",
      curious:
        "How can we make feedback useful without making learners feel judged? I like hearing about confusing learning experiences, including students’ own.",
      replies: [
        [
          "A",
          "I thought research would mainly mean running formal experiments. Much of my week is listening carefully, writing clear notes, and helping a team reconsider an idea it was excited about.",
        ],
        [
          "B",
          "I watch someone use the hint, ask what they thought it meant, and compare that with what we intended. A click can tell us something happened; it does not by itself show understanding.",
        ],
        [
          "C",
          "I am exploring how to give useful feedback without making someone feel judged. Hearing a specific example of feedback that helped or discouraged you could give me a useful perspective.",
        ],
      ],
    },
    {
      name: "Rae",
      role: "Learning experience designer at a museum",
      plain:
        "I create activities that help museum visitors notice, wonder, and learn. Learning here can happen through an object, a conversation, or a short activity rather than a school lesson.",
      path: "I worked in visual design, studied at LDIT, and joined a museum team. I wanted to work on learning but did not initially know what that career could be called.",
      day: "I plan an activity with museum staff, make a simple version, watch families use it, and change the instructions or materials when visitors are confused or lose interest.",
      project:
        "We are making a five-minute activity in which families compare objects. Some visitors rush past; others stay to ask questions. We are exploring what invites curiosity without forcing participation.",
      curious:
        "How do you know a short activity mattered to someone? I enjoy hearing how different people experience museums and public learning spaces.",
      replies: [
        [
          "A",
          "I used to judge my design by how polished it looked. In a museum, a beautiful activity can still be confusing. Watching a family use a rough version taught me more than refining it alone.",
        ],
        [
          "B",
          "I place a simple version near the objects, watch where visitors pause, and ask what they noticed. Then I change one instruction or material. We cannot assume everyone wants a structured lesson.",
        ],
        [
          "C",
          "I wonder what makes someone stay with an activity for five minutes. A student’s memory of an engaging or uncomfortable museum visit could help me notice something our team has overlooked.",
        ],
      ],
    },
    {
      name: "Ari",
      role: "Program evaluator at a community organization",
      plain:
        "I check whether a program is doing what it promises, who it helps, and what should improve. A program might be tutoring or a youth club. I study the program; I do not grade individual students.",
      path: "I supported a youth program, studied at LDIT, and became interested in how organizations decide whether their work helps people.",
      day: "I agree on questions with staff and families, design short surveys, interview participants, review attendance or learning information, and explain findings in ordinary language.",
      project:
        "We are reviewing an after-school tutoring program. Attendance and test results tell part of the story; families also want children to feel confident asking for help. We are deciding what information would be useful.",
      curious:
        "How can participants help define success? I value hearing what students would want adults to notice about a learning experience.",
      replies: [
        [
          "A",
          "I expected the job to be mostly working with numbers. I spend a lot of time asking what people mean by success and helping them understand what the evidence can and cannot tell us.",
        ],
        [
          "B",
          "I talk with families and tutors, review attendance, and look at learning information together. If scores rise, I still ask what else changed. An improvement alone does not prove tutoring caused it.",
        ],
        [
          "C",
          "I am interested in what young people consider a successful program. A student might notice confidence, belonging, or asking for help. Those ideas can shape what we ask about, alongside learning results.",
        ],
      ],
    },
    {
      name: "Noor",
      role: "Workplace learning designer at a large organization",
      plain:
        "I help adults learn what they need for their jobs. That might mean a short practice activity, a useful guide, or support from a manager. It does not always mean creating a course.",
      path: "I helped new colleagues learn their jobs, studied at LDIT, and joined a team that supports employee learning.",
      day: "I ask employees where work becomes difficult, discuss priorities with managers, design ways to practice, and check whether employees can use what they learned in real work.",
      project:
        "New team leaders complete a course on giving feedback but hesitate in actual conversations. We are trying short practice sessions and a one-page guide they can use before meeting a colleague.",
      curious:
        "What makes learning possible when people have little time? I welcome examples of learning something difficult while managing other responsibilities.",
      replies: [
        [
          "A",
          "I thought success meant building a strong course. I learned that someone may understand the course and still lack time, support, or permission to try a different way of working.",
        ],
        [
          "B",
          "I ask a team leader to practice one feedback conversation, notice where they hesitate, and revise the guide. I also ask managers whether the work environment supports using the new skill.",
        ],
        [
          "C",
          "I am exploring how to help people learn in small amounts of time. A student’s experience balancing study, work, or family responsibilities could help me think about realistic opportunities to practice.",
        ],
      ],
    },
    {
      name: "Leo",
      role: "Independent learning designer working with several clients",
      plain:
        "I design learning activities for organizations that hire me for a project. A client is an organization paying for that work. Independent means I also find projects, agree on fees, and manage my time.",
      path: "I taught community workshops, studied at LDIT, worked on a design team, and later began taking projects independently.",
      day: "I meet a client to understand a learning problem, agree on what I will deliver, make and test materials, and review changes. I also write proposals and handle the business side of the work.",
      project:
        "A community organization wants an online course for volunteers. After talking with volunteers, I suspect a short guide and one practice session may be more useful. We are deciding what to build.",
      curious:
        "How can a designer recommend a simpler solution when a client expects a course? I like discussing how people explain and negotiate their design decisions.",
      replies: [
        [
          "A",
          "I expected independence to mean spending all my time designing. Finding work, agreeing on a clear project, and setting boundaries also take time. I enjoy variety, but uncertain income can be difficult.",
        ],
        [
          "B",
          "I ask volunteers what they need to do, make a small example, and test it with them. Then I explain to the client why a guide and practice session might help more than a full course.",
        ],
        [
          "C",
          "I am curious about how designers explain a simpler solution without dismissing a client’s idea. Hearing how a student handled disagreement in a group project could give me another example to think about.",
        ],
      ],
    },
  ],
  questions: [
    {
      letter: "A",
      title: "My Path",
      stem: "You moved from ___ to ___. What surprised you?",
      instruction: "Use a detail from the profile. Reader reads answer A.",
    },
    {
      letter: "B",
      title: "Everyday Work",
      stem: "In your project about ___, what do you actually do when ___?",
      instruction: "Use a detail from the profile. Reader reads answer B.",
    },
    {
      letter: "C",
      title: "Shared Curiosity",
      stem: "You are curious about ___. What are you exploring, and what perspective might be useful?",
      instruction: "Reader reads answer C.",
    },
  ],
  realities: [
    {
      title: "A smaller opening",
      text: "Read this scripted reply: “I cannot meet this month, but I can answer one question by email.”\nTogether, choose one focused question and a respectful response. One minute total.",
    },
    {
      title: "No reply",
      text: "A week has passed with no reply; you do not know why.\nDiscuss one brief follow-up or letting the invitation rest. There is no required choice and no invented alumni reply. One minute total.",
    },
    {
      title: "A change of plan",
      text: "You agreed to meet, but now you cannot make it.\nTogether, draft one sentence that communicates promptly and offers a manageable next step. No one invents an alum’s answer. One minute total.",
    },
  ],
  guide:
    "This card does not answer that. Let’s use the A, B, or C stem, or save your question for a real alum.",
  caveat:
    "A script is one fictional perspective; it does not predict what a real alum would say or establish how an entire field works.",
  reminder:
    "Use a real, verified detail before sending. Placeholders are fine during play. Find a relevant alum, refine a question, or send an invitation when ready. Nothing is sent by the game.",
};
