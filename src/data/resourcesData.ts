export interface Resource {
  id: string;
  title: string;
  category:
    | 'Tools'
    | 'Cheat Sheets'
    | 'Tutorials'
    | 'Communities'
    | 'Career Tips'
    | 'Developer Tools'
    | 'Code Challenges';
  description: string;
  url: string;
  type: 'link' | 'embed';
  embedId?: string;
  saved?: boolean;
}

export const resourcesData: Resource[] = [
  {
    id: 'mdn-docs',
    title: 'MDN Web Docs',
    category: 'Tools',
    description: 'Comprehensive documentation for HTML, CSS, and JavaScript.',
    url: 'https://developer.mozilla.org',
    type: 'link',
  },
  {
    id: 'css-tricks',
    title: 'CSS-Tricks',
    category: 'Cheat Sheets',
    description: 'Tips, tricks, and techniques for CSS.',
    url: 'https://css-tricks.com',
    type: 'link',
  },
  {
    id: 'react-docs',
    title: 'React Official Documentation',
    category: 'Tools',
    description: 'Learn React from the official source.',
    url: 'https://react.dev',
    type: 'link',
  },
  {
    id: 'nodejs-docs',
    title: 'Node.js Documentation',
    category: 'Tools',
    description: 'Guides and API references for Node.js.',
    url: 'https://nodejs.org/en/docs/',
    type: 'link',
  },
  {
    id: 'python-docs',
    title: 'Python Official Documentation',
    category: 'Tools',
    description: 'Tutorials and references for Python.',
    url: 'https://docs.python.org/3/',
    type: 'link',
  },
  {
    id: 'freecodecamp',
    title: 'freeCodeCamp YouTube',
    category: 'Tutorials',
    description: 'Free coding tutorials on YouTube.',
    url: 'https://www.youtube.com/c/freecodecamp',
    type: 'embed',
    embedId: 'PkZNo7MFNFg',
  },
  {
    id: 'github',
    title: 'GitHub',
    category: 'Developer Tools',
    description: 'Host and share your code repositories.',
    url: 'https://github.com',
    type: 'link',
  },
  {
    id: 'stackoverflow',
    title: 'Stack Overflow',
    category: 'Communities',
    description: 'Q&A community for programmers.',
    url: 'https://stackoverflow.com',
    type: 'link',
  },
  {
    id: 'tailwind-cheat',
    title: 'Tailwind CSS Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Quick reference for Tailwind utilities.',
    url: 'https://tailwindcss.com/docs/utility-first',
    type: 'link',
  },
  {
    id: 'js-cheat',
    title: 'JavaScript Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Essential JS methods and syntax.',
    url: 'https://javascript.info',
    type: 'link',
  },
  {
    id: 'leetcode',
    title: 'LeetCode',
    category: 'Code Challenges',
    description: 'Practice coding problems and improve your skills.',
    url: 'https://leetcode.com',
    type: 'link',
  },
  {
    id: 'hackerrank',
    title: 'HackerRank',
    category: 'Code Challenges',
    description: 'Coding challenges and interview preparation.',
    url: 'https://www.hackerrank.com',
    type: 'link',
  },
  {
    id: 'roadmap-sh',
    title: 'roadmap.sh',
    category: 'Career Tips',
    description: 'Developer roadmaps for different tech stacks.',
    url: 'https://roadmap.sh',
    type: 'link',
  },
  {
    id: 'egghead',
    title: 'egghead.io',
    category: 'Tutorials',
    description: 'Bite-sized video lessons on web development.',
    url: 'https://egghead.io',
    type: 'link',
  },
  {
    id: 'w3schools',
    title: 'W3Schools',
    category: 'Tutorials',
    description: 'Interactive tutorials for web technologies.',
    url: 'https://www.w3schools.com',
    type: 'link',
  },
  {
    id: 'codepen',
    title: 'CodePen',
    category: 'Developer Tools',
    description: 'Online code editor for testing and sharing snippets.',
    url: 'https://codepen.io',
    type: 'link',
  },
  {
    id: 'jsfiddle',
    title: 'JSFiddle',
    category: 'Developer Tools',
    description: 'Test and share JavaScript, HTML, and CSS code.',
    url: 'https://jsfiddle.net',
    type: 'link',
  },
  {
    id: 'dev-to',
    title: 'DEV Community',
    category: 'Communities',
    description: 'A community of software developers writing about code.',
    url: 'https://dev.to',
    type: 'link',
  },
  {
    id: 'reddit-r-learnprogramming',
    title: 'r/learnprogramming',
    category: 'Communities',
    description: 'Reddit community for learning programming.',
    url: 'https://www.reddit.com/r/learnprogramming/',
    type: 'link',
  },
  {
    id: 'codecademy',
    title: 'Codecademy',
    category: 'Tutorials',
    description: 'Interactive coding lessons and projects.',
    url: 'https://www.codecademy.com',
    type: 'link',
  },
  {
    id: 'udemy-web-dev',
    title: 'Udemy Web Development Courses',
    category: 'Tutorials',
    description: 'Thousands of courses on web development.',
    url: 'https://www.udemy.com/topic/web-development/',
    type: 'link',
  },
  {
    id: 'coursera-web-dev',
    title: 'Coursera Web Development',
    category: 'Tutorials',
    description: 'University-level courses on web technologies.',
    url: 'https://www.coursera.org/browse/computer-science/software-development',
    type: 'link',
  },
  {
    id: 'html-cheat-sheet',
    title: 'HTML Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Complete reference for HTML tags and attributes.',
    url: 'https://htmlcheatsheet.com/',
    type: 'link',
  },
  {
    id: 'css-grid-cheat',
    title: 'CSS Grid Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Visual guide to CSS Grid properties.',
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    type: 'link',
  },
  {
    id: 'react-cheat',
    title: 'React Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Quick reference for React hooks and components.',
    url: 'https://reactcheatsheet.com/',
    type: 'link',
  },
  {
    id: 'python-cheat',
    title: 'Python Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Essential Python syntax and libraries.',
    url: 'https://www.pythoncheatsheet.org/',
    type: 'link',
  },
  {
    id: 'node-cheat',
    title: 'Node.js Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Common Node.js modules and patterns.',
    url: 'https://nodejs.dev/en/learn/',
    type: 'link',
  },
];
