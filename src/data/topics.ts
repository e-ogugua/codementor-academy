export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration_estimate: number; // in minutes
  author_id: string;
  related_portfolio_slug?: string;
  cover_image?: string;
  is_featured: boolean;
  prerequisites?: string[];
  learning_outcomes: string[];
  price?: string;
  originalPrice?: string;
  created_at: string;
  updated_at: string;
}

export const topics: Topic[] = [
  {
    id: '1',
    title: 'PC Repair & Troubleshooting',
    slug: 'pc-repair',
    description:
      'Quick practical fixes for Windows hardware & software. Learn systematic troubleshooting, common failure patterns, and hands-on repair techniques.',
    tags: ['hardware', 'repair'],
    difficulty: 'Beginner',
    duration_estimate: 120,
    author_id: 'emmanuel',
    related_portfolio_slug: 'repair-services',
    cover_image: '/images/topics/pc-repair.jpg',
    is_featured: true,
    prerequisites: [],
    learning_outcomes: [
      'Diagnose common hardware failures',
      'Troubleshoot Windows boot issues',
      'Replace components safely',
      'Use diagnostic tools effectively',
    ],
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Intro to Linux & CLI',
    slug: 'linux-cli',
    description:
      'Shell essentials and system maintenance. Master command-line navigation, file operations, and basic system administration.',
    tags: ['linux', 'sysadmin'],
    difficulty: 'Beginner',
    duration_estimate: 180,
    author_id: 'emmanuel',
    cover_image: '/images/topics/linux-cli.jpg',
    is_featured: false,
    prerequisites: [],
    learning_outcomes: [
      'Navigate filesystem with confidence',
      'Manage files and permissions',
      'Use pipes and redirection',
      'Basic system monitoring',
    ],
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Frontend Fundamentals (HTML/CSS)',
    slug: 'frontend-basics',
    description:
      'Crisp, accessible UI foundations. Build semantic HTML and responsive CSS with modern best practices.',
    tags: ['frontend', 'html', 'css'],
    difficulty: 'Beginner',
    duration_estimate: 240,
    author_id: 'emmanuel',
    related_portfolio_slug: 'web-development',
    cover_image: '/images/topics/frontend-basics.jpg',
    is_featured: true,
    prerequisites: [],
    learning_outcomes: [
      'Write semantic HTML markup',
      'Design responsive layouts',
      'Implement animations',
      'Optimize for performance',
      'Cross-browser compatibility',
    ],
    price: '$45',
    originalPrice: '$69',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
  },
  {
    id: '4',
    title: 'JavaScript for Builders',
    slug: 'js-for-builders',
    description:
      'Core JS patterns for real apps. Focus on practical patterns, DOM manipulation, and building interactive interfaces.',
    tags: ['javascript', 'frontend'],
    difficulty: 'Intermediate',
    duration_estimate: 300,
    author_id: 'emmanuel',
    related_portfolio_slug: 'web-development',
    cover_image: '/images/topics/javascript.jpg',
    is_featured: true,
    prerequisites: ['frontend-basics'],
    learning_outcomes: [
      'Diagnose hardware failures',
      'Install drivers and software',
      'Optimize system performance',
      'Backup and recovery strategies',
    ],
    price: '$29',
    originalPrice: '$49',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '5',
    title: 'Python for Backend',
    slug: 'python-backend',
    description:
      'Build API services and utils. Create robust backend services with FastAPI, database integration, and deployment.',
    tags: ['python', 'backend'],
    difficulty: 'Intermediate',
    duration_estimate: 360,
    author_id: 'emmanuel',
    related_portfolio_slug: 'api-development',
    cover_image: '/images/topics/python-backend.jpg',
    is_featured: false,
    prerequisites: [],
    learning_outcomes: [
      'Build REST APIs',
      'Database integration',
      'System design principles',
      'Scalability patterns',
      'Performance optimization',
      'Architecture decisions',
    ],
    price: '$99',
    originalPrice: '$149',
    created_at: '2024-01-26T10:00:00Z',
    updated_at: '2024-01-26T10:00:00Z',
  },
  {
    id: '6',
    title: 'Databases: Oracle & SQL',
    slug: 'oracle-sql',
    description:
      'Practical database admin & queries. Master SQL fundamentals, Oracle-specific features, and performance optimization.',
    tags: ['database', 'oracle', 'sql'],
    difficulty: 'Intermediate',
    duration_estimate: 420,
    author_id: 'emmanuel',
    related_portfolio_slug: 'database-services',
    cover_image: '/images/topics/oracle-sql.jpg',
    is_featured: false,
    prerequisites: ['python-backend'],
    learning_outcomes: [
      'Design RESTful APIs',
      'Implement microservice patterns',
      'Game development basics',
      'Unity fundamentals',
      'Game mechanics',
      'Publishing games',
    ],
    price: '$49',
    originalPrice: '$69',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
  },
  {
    id: '7',
    title: 'APIs & Microservices',
    slug: 'apis-microservices',
    description:
      'Design and test reliable APIs. Build scalable microservices with proper error handling, testing, and documentation.',
    tags: ['api', 'backend'],
    difficulty: 'Advanced',
    duration_estimate: 480,
    author_id: 'emmanuel',
    related_portfolio_slug: 'api-development',
    cover_image: '/images/topics/apis.jpg',
    is_featured: false,
    prerequisites: ['python-backend'],
    learning_outcomes: [
      'Design RESTful APIs',
      'Implement microservice patterns',
      'Game development basics',
      'Unity fundamentals',
      'Game mechanics',
      'Publishing games',
    ],
    price: '$49',
    originalPrice: '$69',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
  },
  {
    id: '8',
    title: 'DevOps Essentials',
    slug: 'devops-essentials',
    description:
      'CI/CD, deployments and simple infra. Set up automated pipelines, containerization, and cloud deployments.',
    tags: ['devops', 'infra'],
    difficulty: 'Advanced',
    duration_estimate: 360,
    author_id: 'emmanuel',
    related_portfolio_slug: 'devops-services',
    cover_image: '/images/topics/devops.jpg',
    is_featured: false,
    prerequisites: ['linux-cli'],
    learning_outcomes: [
      'Implement authentication best practices',
      'Secure API endpoints',
      'Mobile app architecture',
      'Cross-platform development',
      'Set up React development environment',
      'Create functional components',
      'Manage component state',
      'Handle user interactions',
    ],
    price: '$39',
    originalPrice: '$59',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: '9',
    title: 'Security Basics for Small Teams',
    slug: 'security-basics',
    description:
      'Practical checks and checklist approach. Essential security practices for startups and small development teams.',
    tags: ['security'],
    difficulty: 'Intermediate',
    duration_estimate: 180,
    author_id: 'emmanuel',
    related_portfolio_slug: 'security-services',
    cover_image: '/images/topics/security.jpg',
    is_featured: false,
    prerequisites: [],
    learning_outcomes: [
      'Implement authentication best practices',
      'Secure API endpoints',
      'Conduct security audits',
      'Handle sensitive data properly',
    ],
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z',
  },
  {
    id: '10',
    title: 'Building MVPs Fast',
    slug: 'mvp-fast',
    description:
      'Product-first engineering approach. Learn to validate ideas quickly, build lean prototypes, and iterate based on feedback.',
    tags: ['product', 'startup'],
    difficulty: 'Intermediate',
    duration_estimate: 240,
    author_id: 'emmanuel',
    related_portfolio_slug: 'startup-services',
    cover_image: '/images/topics/mvp.jpg',
    is_featured: true,
    prerequisites: ['js-for-builders'],
    learning_outcomes: [
      'Validate product ideas quickly',
      'Build lean prototypes',
      'Implement user feedback loops',
      'Launch and iterate rapidly',
    ],
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z',
  },
  {
    id: '11',
    title: 'UX for Engineers',
    slug: 'ux-for-engineers',
    description:
      'Practical design rules to make apps usable. Essential UX principles for developers who need to create user-friendly interfaces.',
    tags: ['ux', 'design'],
    difficulty: 'Beginner',
    duration_estimate: 150,
    author_id: 'emmanuel',
    related_portfolio_slug: 'design-services',
    cover_image: '/images/topics/ux-design.jpg',
    is_featured: false,
    prerequisites: ['frontend-basics'],
    learning_outcomes: [
      'Apply fundamental UX principles',
      'Design intuitive interfaces',
      'Conduct basic user research',
      'Create effective wireframes',
    ],
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z',
  },
  {
    id: '12',
    title: 'Farming + Tech Ops',
    slug: 'agro-tech-ops',
    description:
      'Sensors, data and ops for small farms. Apply technology solutions to agricultural operations with IoT sensors and data analysis.',
    tags: ['agritech', 'ops'],
    difficulty: 'Advanced',
    duration_estimate: 300,
    author_id: 'emmanuel',
    related_portfolio_slug: 'agritech-services',
    cover_image: '/images/topics/agritech.jpg',
    is_featured: false,
    prerequisites: ['python-backend', 'devops-essentials'],
    learning_outcomes: [
      'Deploy IoT sensors for farming',
      'Analyze agricultural data',
      'Automate farm operations',
      'Optimize crop yields with data',
    ],
    created_at: '2025-09-01T00:00:00Z',
    updated_at: '2025-09-01T00:00:00Z',
  },
];

export const getTopicBySlug = (slug: string): Topic | undefined => {
  return topics.find(topic => topic.slug === slug);
};

export const getTopicsByTag = (tag: string): Topic[] => {
  return topics.filter(topic => topic.tags.includes(tag));
};

export const getFeaturedTopics = (): Topic[] => {
  return topics.filter(topic => topic.is_featured);
};

export const getTopicsByDifficulty = (difficulty: Topic['difficulty']): Topic[] => {
  return topics.filter(topic => topic.difficulty === difficulty);
};

export const getAllTags = (): string[] => {
  const allTags = topics.flatMap(topic => topic.tags);
  return [...new Set(allTags)].sort();
};

// Export alias for compatibility
export const topicsData = topics;
