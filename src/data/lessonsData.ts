export interface Lesson {
  id: string;
  title: string;
  category: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'Node.js' | 'Python';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  objectives: string[];
  explanation: string;
  codeSnippet: string;
  tryItCode: string;
  isPremium?: boolean;
  challenges?: string[];
}

export const lessonsData: Lesson[] = [
  {
    id: 'html-basics',
    title: 'HTML Basics: Building Your First Web Page',
    category: 'HTML',
    level: 'Beginner',
    duration: '25 min',
    objectives: [
      'Understand HTML structure',
      'Create semantic markup',
      'Add images and links',
      'Build a simple webpage'
    ],
    explanation: 'HTML is the backbone of every web page. Learn the essential tags and structure to create your first webpage from scratch!',
    codeSnippet: '<!DOCTYPE html><html><head><title>My Page</title></head><body><h1>Hello World</h1></body></html>',
    tryItCode: 'Try creating your own HTML structure!',
    isPremium: false,
    challenges: ['Create a webpage with your name and a photo.', 'Add 3 different HTML elements.', 'Make a list of your favorite hobbies.']
  },
  {
    id: 'css-fundamentals',
    title: 'CSS Fundamentals: Styling Your Web Pages',
    category: 'CSS',
    level: 'Beginner',
    duration: '30 min',
    objectives: [
      'Apply CSS selectors',
      'Use colors and fonts',
      'Create layouts with flexbox',
      'Style a complete webpage'
    ],
    explanation: 'CSS brings life to your HTML! Learn how to style elements, create beautiful layouts, and make your webpages visually appealing.',
    codeSnippet: 'body { background: blue; } h1 { color: white; }',
    tryItCode: 'Style the HTML from the previous lesson!',
    isPremium: false,
    challenges: ['Style a navigation menu.', 'Create a responsive layout.', 'Add hover effects to buttons.']
  },
  {
    id: 'js-variables',
    title: 'JavaScript Variables and Data Types',
    category: 'JavaScript',
    level: 'Beginner',
    duration: '20 min',
    objectives: [
      'Declare variables with var, let, const',
      'Understand data types',
      'Use operators and expressions',
      'Debug basic JavaScript code'
    ],
    explanation: 'Variables are the foundation of JavaScript programming. Learn how to store and manipulate data in your scripts.',
    codeSnippet: 'let name = "Emmanuel"; const age = 25; console.log(name);',
    tryItCode: 'Declare your own variables and log them!',
    isPremium: false,
    challenges: ['Calculate the area of a rectangle.', 'Convert temperature from C to F.', 'Create an array of your favorite foods.']
  },
  {
    id: 'js-functions',
    title: 'JavaScript Functions: Reusable Code Blocks',
    category: 'JavaScript',
    level: 'Beginner',
    duration: '25 min',
    objectives: [
      'Define and call functions',
      'Use parameters and return values',
      'Understand scope and closures',
      'Create modular code'
    ],
    explanation: 'Functions allow you to write reusable code. Learn how to organize your JavaScript into manageable, callable blocks.',
    codeSnippet: 'function greet(name) { return "Hello " + name; }',
    tryItCode: 'Create your own functions!',
    isPremium: false,
    challenges: ['Build a tip calculator function.', 'Create a function that returns user info.', 'Make a function that generates random numbers.']
  },
  {
    id: 'react-components',
    title: 'React Components: Building User Interfaces',
    category: 'React',
    level: 'Intermediate',
    duration: '35 min',
    objectives: [
      'Create functional components',
      'Use JSX syntax',
      'Pass props to components',
      'Compose components together'
    ],
    explanation: 'React components are the building blocks of modern web apps. Learn how to create reusable UI elements with React.',
    codeSnippet: 'function Welcome(props) { return <h1>Hello {props.name}</h1>; }',
    tryItCode: 'Build a component that displays user info!',
    isPremium: false,
    challenges: ['Create a card component for products.', 'Build a todo item component.', 'Make a reusable button component.']
  },
  {
    id: 'react-state',
    title: 'React State Management with Hooks',
    category: 'React',
    level: 'Intermediate',
    duration: '40 min',
    objectives: [
      'Use useState hook',
      'Update state in event handlers',
      'Understand state vs props',
      'Build interactive components'
    ],
    explanation: 'State allows React components to be dynamic. Learn how to manage component state with the useState hook.',
    codeSnippet: 'const [count, setCount] = useState(0);',
    tryItCode: 'Create a stateful component!',
    isPremium: false,
    challenges: ['Build a simple todo app with state.', 'Create a color picker with state.', 'Make a temperature converter.']
  },
  {
    id: 'node-express',
    title: 'Node.js and Express: Building APIs',
    category: 'Node.js',
    level: 'Intermediate',
    duration: '45 min',
    objectives: [
      'Set up an Express server',
      'Handle HTTP requests',
      'Create RESTful endpoints',
      'Use middleware for logging'
    ],
    explanation: 'Node.js with Express allows you to build powerful backend APIs. Learn the fundamentals of server-side JavaScript.',
    codeSnippet: 'const express = require("express"); const app = express();',
    tryItCode: 'Set up a basic Express server!',
    isPremium: false,
    challenges: ['Create a CRUD API for tasks.', 'Add authentication middleware.', 'Build an API for blog posts.']
  },
  {
    id: 'python-loops',
    title: 'Python Loops and Control Flow',
    category: 'Python',
    level: 'Beginner',
    duration: '25 min',
    objectives: [
      'Use for and while loops',
      'Understand if/else statements',
      'Control loop execution',
      'Solve problems with loops'
    ],
    explanation: 'Loops and conditionals are essential for controlling program flow in Python. Learn how to iterate and make decisions in your code.',
    codeSnippet: 'for i in range(5): print(i)',
    tryItCode: 'Write a loop to print numbers 1-10!',
    isPremium: false,
    challenges: ['Print a multiplication table.', 'Find prime numbers up to 100.', 'Create a pattern with nested loops.']
  },
  {
    id: 'css-grid',
    title: 'CSS Grid Layout: Modern Web Design',
    category: 'CSS',
    level: 'Intermediate',
    duration: '35 min',
    objectives: [
      'Create grid layouts',
      'Use grid-template-areas',
      'Handle responsive design',
      'Build complex layouts'
    ],
    explanation: 'CSS Grid is a powerful layout system for the web. Learn how to create flexible, responsive designs with ease.',
    codeSnippet: 'display: grid; grid-template-columns: 1fr 2fr;',
    tryItCode: 'Create a grid layout for a dashboard!',
    isPremium: false,
    challenges: ['Build a photo gallery grid.', 'Create a card layout for articles.', 'Make a responsive product grid.']
  },
  {
    id: 'react-advanced',
    title: 'Advanced React: Hooks and Context',
    category: 'React',
    level: 'Advanced',
    duration: '50 min',
    objectives: [
      'Use useEffect for side effects',
      'Implement useContext for state sharing',
      'Create custom hooks',
      'Optimize performance'
    ],
    explanation: 'Take your React skills to the next level with advanced hooks and patterns. Learn to manage complex state and side effects.',
    codeSnippet: 'const [data, setData] = useState(null); useEffect(() => { /* fetch data */ }, []);',
    tryItCode: 'Create a custom hook for API data fetching!',
    isPremium: true,
    challenges: ['Build a theme switcher.', 'Create a data fetching hook.', 'Implement a shopping cart with context.']
  },
  {
    id: 'node-mongodb',
    title: 'Node.js with MongoDB: Database Integration',
    category: 'Node.js',
    level: 'Advanced',
    duration: '55 min',
    objectives: [
      'Connect to MongoDB',
      'Perform CRUD operations',
      'Use Mongoose for schema modeling',
      'Handle database errors'
    ],
    explanation: 'Integrate databases into your Node.js applications. Learn how to work with MongoDB and Mongoose for data persistence.',
    codeSnippet: 'mongoose.connect("mongodb://localhost/myapp");',
    tryItCode: 'Set up a MongoDB connection and basic CRUD!',
    isPremium: true,
    challenges: ['Build a full CRUD API with MongoDB.', 'Add user authentication.', 'Implement data validation.']
  },
  {
    id: 'python-classes',
    title: 'Python Object-Oriented Programming',
    category: 'Python',
    level: 'Intermediate',
    duration: '40 min',
    objectives: [
      'Define classes and objects',
      'Use inheritance and polymorphism',
      'Implement encapsulation',
      'Create real-world examples'
    ],
    explanation: 'OOP allows you to model real-world entities in code. Learn how to create classes, inheritance, and polymorphism in Python.',
    codeSnippet: 'class Person: def __init__(self, name): self.name = name',
    tryItCode: 'Create a class for a bank account!',
    isPremium: false,
    challenges: ['Build a car class with inheritance.', 'Create an employee management system.', 'Implement a simple game with classes.']
  },
  {
    id: 'html-forms',
    title: 'HTML Forms: Collecting User Input',
    category: 'HTML',
    level: 'Beginner',
    duration: '20 min',
    objectives: [
      'Create form elements',
      'Use input types and attributes',
      'Handle form submission',
      'Validate user input'
    ],
    explanation: 'Forms are how users interact with your web applications. Learn to create forms that collect and validate data.',
    codeSnippet: '<input type="text" name="username"> <button>Submit</button>',
    tryItCode: 'Create a form for user registration!',
    isPremium: false,
    challenges: ['Build a contact form.', 'Create a survey form.', 'Add form validation with JavaScript.']
  },
  {
    id: 'css-animations',
    title: 'CSS Animations: Bringing Pages to Life',
    category: 'CSS',
    level: 'Intermediate',
    duration: '30 min',
    objectives: [
      'Use transition and transform',
      'Create keyframes animations',
      'Animate elements on hover',
      'Build engaging interactions'
    ],
    explanation: 'Animations make your websites more engaging. Learn how to add smooth transitions and eye-catching effects with CSS.',
    codeSnippet: 'transition: all 0.3s ease;',
    tryItCode: 'Animate a button on hover!',
    isPremium: false,
    challenges: ['Create a loading spinner animation.', 'Build a slide-in effect for cards.', 'Animate a progress bar.']
  },
  {
    id: 'js-dom',
    title: 'JavaScript DOM Manipulation',
    category: 'JavaScript',
    level: 'Beginner',
    duration: '25 min',
    objectives: [
      'Select and modify DOM elements',
      'Handle events',
      'Create and remove elements',
      'Build interactive web pages'
    ],
    explanation: 'The DOM is how JavaScript interacts with HTML. Learn how to select, modify, and create dynamic web content.',
    codeSnippet: 'document.querySelector("h1").textContent = "Hello";',
    tryItCode: 'Create an interactive to-do list!',
    isPremium: false,
    challenges: ['Build a simple calculator.', 'Create a color picker tool.', 'Make a dynamic image gallery.']
  },
  {
    id: 'react-router',
    title: 'React Router: Navigation in Single Page Apps',
    category: 'React',
    level: 'Advanced',
    duration: '45 min',
    objectives: [
      'Set up React Router',
      'Create routes and components',
      'Use Link and NavLink',
      'Handle route parameters'
    ],
    explanation: 'React Router enables navigation in React apps. Learn how to create multi-page experiences in a single-page application.',
    codeSnippet: '<Route path="/about" component={About} />',
    tryItCode: 'Set up basic routing for a blog!',
    isPremium: true,
    challenges: ['Build a multi-page portfolio site.', 'Create a protected route for admin.', 'Add nested routes for categories.']
  },
  {
    id: 'python-flask',
    title: 'Python Flask: Building Web Applications',
    category: 'Python',
    level: 'Intermediate',
    duration: '50 min',
    objectives: [
      'Set up a Flask application',
      'Create routes and templates',
      'Handle forms and requests',
      'Use Jinja2 templating'
    ],
    explanation: 'Flask is a lightweight web framework for Python. Learn how to build dynamic web applications with routes, templates, and form handling.',
    codeSnippet: 'from flask import Flask; app = Flask(__name__)',
    tryItCode: 'Create a Flask app with multiple routes!',
    isPremium: true,
    challenges: ['Build a blog with Flask.', 'Create a REST API with Flask.', 'Add user authentication.']
  },
  {
    id: 'js-async',
    title: 'JavaScript Async Programming',
    category: 'JavaScript',
    level: 'Advanced',
    duration: '45 min',
    objectives: [
      'Use async/await syntax',
      'Handle promises',
      'Make API calls',
      'Manage asynchronous operations'
    ],
    explanation: 'Asynchronous programming is crucial for modern web apps. Learn how to handle API calls and other async operations effectively.',
    codeSnippet: 'async function fetchData() { const response = await fetch(url); }',
    tryItCode: 'Fetch data from an API and display it!',
    isPremium: true,
    challenges: ['Create a weather app with API calls.', 'Build a search feature with debouncing.', 'Implement infinite scrolling.']
  },
  {
    id: 'css-flexbox',
    title: 'CSS Flexbox: Flexible Layouts',
    category: 'CSS',
    level: 'Beginner',
    duration: '25 min',
    objectives: [
      'Use flexbox properties',
      'Create responsive layouts',
      'Align and distribute items',
      'Build modern web designs'
    ],
    explanation: 'Flexbox makes layout easy and responsive. Learn how to create flexible, aligned layouts for your web projects.',
    codeSnippet: 'display: flex; justify-content: space-between;',
    tryItCode: 'Create a flexbox layout for a navbar!',
    isPremium: false,
    challenges: ['Build a responsive card grid.', 'Create a mobile-first layout.', 'Design a pricing table.']
  },
  {
    id: 'react-testing',
    title: 'Testing React Applications',
    category: 'React',
    level: 'Advanced',
    duration: '60 min',
    objectives: [
      'Write unit tests with Jest',
      'Test React components',
      'Use React Testing Library',
      'Mock dependencies'
    ],
    explanation: 'Testing ensures your React apps are reliable. Learn how to write comprehensive tests for your components and functions.',
    codeSnippet: 'test("renders correctly", () => { render(<App />); });',
    tryItCode: 'Write tests for a simple component!',
    isPremium: true,
    challenges: ['Test a form component.', 'Mock API calls in tests.', 'Write integration tests.']
  }
];
