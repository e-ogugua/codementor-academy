export interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  details: string[];
}

export const premiumFeatures: PremiumFeature[] = [
  {
    id: 'advanced-lessons',
    title: 'Advanced Lessons',
    description: 'Deep-dive tutorials on advanced topics like state management and APIs.',
    icon: 'BookOpen',
    details: [
      'React Hooks in-depth',
      'API integration with Axios',
      'Advanced CSS animations',
      'Database queries with MongoDB',
    ],
  },
  {
    id: 'mentor-sessions',
    title: '1-on-1 Mentor Sessions',
    description: 'Personalized guidance from expert developers.',
    icon: 'Users',
    details: ['Weekly video calls', 'Code reviews', 'Career advice', 'Project feedback'],
  },
  {
    id: 'project-templates',
    title: 'Project Templates',
    description: 'Ready-to-use codebases for real-world projects.',
    icon: 'FileCode',
    details: [
      'E-commerce site template',
      'Social media dashboard',
      'Portfolio generator',
      'API server boilerplate',
    ],
  },
  {
    id: 'certificates',
    title: 'Certificates',
    description: 'Earn verifiable certificates to showcase your skills.',
    icon: 'Award',
    details: [
      'Course completion certificates',
      'Skill badges for LinkedIn',
      'Progress reports',
      'Achievement unlocks',
    ],
  },
];

export const premiumPlans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99/month',
    features: [
      'All advanced lessons',
      '1 mentor session/month',
      'Project templates',
      'Certificates',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$99/year',
    features: [
      'Everything in Monthly',
      '2 mentor sessions/month',
      'Priority support',
      'Exclusive webinars',
    ],
  },
];
