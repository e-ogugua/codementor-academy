export interface Lesson {
  id: string;
  title: string;
  category: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'Node.js' | 'Python';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., "15 min"
  objectives: string[];
  explanation: string;
  codeSnippet: string;
  tryItCode: string; // Sample code for "Try It Yourself"
  completed?: boolean;
  isPremium?: boolean;
  challenges?: string[]; // Beginner-friendly challenges
}
