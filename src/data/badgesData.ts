export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  condition: string; // Description of how to earn it
  earned?: boolean;
}

export const badgesData: Badge[] = [
  {
    id: 'first-line',
    name: 'First Line of Code',
    description: 'Wrote your very first line of code.',
    icon: 'Code',
    condition: 'Complete your first lesson.',
  },
  {
    id: 'html-hero',
    name: 'HTML Hero',
    description: 'Mastered the basics of HTML.',
    icon: 'FileText',
    condition: 'Complete the HTML Basics lesson.',
  },
  {
    id: 'css-stylist',
    name: 'CSS Stylist',
    description: 'Styled your first web page.',
    icon: 'Palette',
    condition: 'Complete the CSS Styling lesson.',
  },
  {
    id: 'js-juggler',
    name: 'JavaScript Juggler',
    description: 'Handled variables and functions like a pro.',
    icon: 'Zap',
    condition: 'Complete the JavaScript Variables lesson.',
  },
  {
    id: 'react-builder',
    name: 'React Builder',
    description: 'Built your first React component.',
    icon: 'Atom',
    condition: 'Complete the React Components lesson.',
  },
  {
    id: 'node-ninja',
    name: 'Node Ninja',
    description: 'Set up a server with Node.js.',
    icon: 'Server',
    condition: 'Complete the Node.js Basics lesson.',
  },
  {
    id: 'python-pioneer',
    name: 'Python Pioneer',
    description: 'Conquered loops in Python.',
    icon: 'Repeat',
    condition: 'Complete the Python Loops lesson.',
  },
  {
    id: 'async-hero',
    name: 'Async Hero',
    description: 'Mastered asynchronous programming.',
    icon: 'Clock',
    condition: 'Complete 5 lessons overall.',
  },
];
