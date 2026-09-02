export const profile = {
  name: 'Immanuvel Alex',
  tagline:
    'IT & Network Professional building toward Cybersecurity & AI Automation',
  location: 'Ernakulam, Kerala, India',
  email: 'alex.immanuvel1997@gmail.com',
  phone: '+91 70126 41543',
  linkedin: 'https://www.linkedin.com/in/immanuvel-alex',
  github: 'https://github.com/A3lxq',
  resumeUrl: '/Immanuvel-Alex-Resume-2026.pdf',
  summary:
    "I solve technical problems, simplify complex workflows, and build technology that helps people work better. My background spans IT support, networking, and project coordination in enterprise environments — and today I'm channeling that same hands-on discipline into cybersecurity and AI automation research, building tools like AegisX and exploring agentic AI systems, Linux hardening, and network security.",
} as const

export const skillGroups = [
  {
    title: 'IT & Networking',
    items: [
      'Network Diagnostics & Troubleshooting',
      'Systems Administration',
      'Active Directory',
      'Hardware & Peripheral Setup',
    ],
  },
  {
    title: 'Cybersecurity',
    items: [
      'Linux Hardening',
      'Vulnerability Research',
      'OWASP Fundamentals',
      'Ethical Hacking (learning)',
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      'Claude Skills & Agent Development',
      'Gen AI Agents',
      'RAG / Knowledge Retrieval',
      'MCP Integration',
    ],
  },
  {
    title: 'Web & UI Development',
    items: ['Front-End Development', 'UI Design', 'React', 'TypeScript'],
  },
] as const

export type ExperienceEntry = {
  title: string
  org: string
  period: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Independent Researcher — Cybersecurity & AI',
    org: 'Self-directed R&D',
    period: '2025 — Present',
    bullets: [
      'Building AegisX, a cybersecurity-focused platform centered on practical security workflows and automation.',
      'Researching agentic AI operations, RAG architectures, and MCP-based knowledge systems.',
      'Hands-on lab work in Linux hardening, networking, and vulnerability research.',
    ],
  },
  {
    title: 'Assistant Project Lead – IT',
    org: 'Wipro',
    period: '2023 — 2025',
    bullets: [
      'Supported project operations, stakeholder coordination, and reporting across IT initiatives.',
      'Coordinated compliance tracking and technical documentation for enterprise projects.',
    ],
  },
  {
    title: 'Computer System Technician (part-time)',
    org: 'Vianet Communication',
    period: '2020 — 2022',
    bullets: [
      'Diagnosed and resolved hardware and network issues to improve system performance and uptime.',
      'Installed, configured, and maintained computer systems, peripherals, and network infrastructure.',
    ],
  },
  {
    title: 'Network Technician',
    org: 'DataMine Internet Marketing Solutions',
    period: '2019 — 2021',
    bullets: [
      'Installed and configured network hardware to optimize connectivity and performance.',
      'Monitored network systems with industry-standard tools to maintain operational integrity.',
    ],
  },
]

export type ProjectEntry = {
  name: string
  description: string
  tags: string[]
}

export const projects: ProjectEntry[] = [
  {
    name: 'AI Chatbot Automation',
    description:
      'An automation-focused chatbot project exploring rules-based and AI-driven conversational flows for practical support workflows.',
    tags: ['AI Automation', 'Chatbots'],
  },
  {
    name: 'Portfolio Website',
    description:
      'This site — rebuilt from a single static HTML page into a Vite + React + TypeScript build with real content, an accessible mobile-first layout, and a Three.js hero scene that degrades gracefully on low-power devices and under reduced-motion.',
    tags: ['React', 'TypeScript', 'Three.js'],
  },
]

export const certifications = [
  'IBM SkillsBuild',
  'Cisco Networking Academy',
  'Harvard CS50',
  'Microsoft Learn',
  'Claude Code in Action (Anthropic)',
  'AI Fundamentals: Foundations for Understanding AI (Anthropic)',
  'Gen AI Agents (Anthropic)',
  'Introduction to Cybersecurity',
  'Linux Essentials',
  'University of Helsinki / MinnaLearn — Elements of AI',
  'Google Cloud Skills Boost',
  'HP LIFE',
] as const

export type EducationEntry = {
  school: string
  credential: string
  period: string
}

export const education: EducationEntry[] = [
  {
    school: 'Rajagiri College of Management & Applied Sciences, Kochi',
    credential: 'Bachelor of Computer Applications, Information Technology',
    period: 'Mar 2015 — Apr 2018',
  },
  {
    school: 'Cambrian College',
    credential: 'Computer Hardware and Network Technician',
    period: '',
  },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
] as const
