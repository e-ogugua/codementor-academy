import { type Topic, topics } from '../data/topics';

/**
 * Migration utility for updating topic data structure
 * Handles adding new fields and updating existing data
 */
export class TopicMigration {
  /**
   * Migrate topics to include new required fields
   */
  static migrateTopicsSchema(): { migrated: number; errors: string[] } {
    const results = { migrated: 0, errors: [] as string[] };

    topics.forEach((topic, index) => {
      try {
        let needsUpdate = false;
        const updatedTopic = { ...topic };

        // Add missing author_id field
        if (!topic.author_id) {
          updatedTopic.author_id = 'emmanuel-ogugua';
          needsUpdate = true;
        }

        // Add missing timestamp fields
        if (!topic.created_at) {
          updatedTopic.created_at = new Date('2024-01-01').toISOString();
          needsUpdate = true;
        }

        if (!topic.updated_at) {
          updatedTopic.updated_at = new Date().toISOString();
          needsUpdate = true;
        }

        // Ensure arrays exist for optional fields
        if (!topic.learning_outcomes) {
          updatedTopic.learning_outcomes = [];
          needsUpdate = true;
        }

        if (!topic.prerequisites) {
          updatedTopic.prerequisites = [];
          needsUpdate = true;
        }

        if (!topic.related_portfolio_slug) {
          updatedTopic.related_portfolio_slug = '';
          needsUpdate = true;
        }

        // Ensure is_featured is boolean
        if (typeof topic.is_featured !== 'boolean') {
          updatedTopic.is_featured = Boolean(topic.is_featured);
          needsUpdate = true;
        }

        if (needsUpdate) {
          topics[index] = updatedTopic as Topic;
          results.migrated++;
        }
      } catch (error) {
        results.errors.push(`Topic ${index}: ${error}`);
      }
    });

    return results;
  }

  /**
   * Add learning outcomes to topics that don't have them
   */
  static addLearningOutcomes(): { updated: number; errors: string[] } {
    const results = { updated: 0, errors: [] as string[] };

    const defaultOutcomes: Record<string, string[]> = {
      'react-mastery': [
        'Master advanced React patterns and hooks',
        'Optimize React app performance',
        'Implement complex state management',
        'Build reusable component libraries',
      ],
      'typescript-fullstack': [
        'Build type-safe full-stack applications',
        'Master TypeScript advanced features',
        'Implement proper error handling',
        'Create scalable API architectures',
      ],
      'system-design': [
        'Design scalable distributed systems',
        'Understand system design patterns',
        'Master load balancing and caching',
        'Prepare for system design interviews',
      ],
    };

    topics.forEach((topic, index) => {
      if (!topic.learning_outcomes || topic.learning_outcomes.length === 0) {
        const outcomes = defaultOutcomes[topic.slug] || [
          `Master ${topic.title.toLowerCase()}`,
          'Apply best practices and patterns',
          'Build production-ready solutions',
          'Understand advanced concepts',
        ];

        topics[index] = {
          ...topic,
          learning_outcomes: outcomes,
          updated_at: new Date().toISOString(),
        };
        results.updated++;
      }
    });

    return results;
  }

  /**
   * Add prerequisites to advanced topics
   */
  static addPrerequisites(): { updated: number; errors: string[] } {
    const results = { updated: 0, errors: [] as string[] };

    const prerequisiteMap: Record<string, string[]> = {
      'react-mastery': ['JavaScript ES6+', 'Basic React knowledge', 'HTML/CSS'],
      'typescript-fullstack': ['JavaScript fundamentals', 'Node.js basics', 'REST API concepts'],
      'system-design': ['Programming experience', 'Database knowledge', 'Network fundamentals'],
      'devops-cloud': ['Linux basics', 'Command line proficiency', 'Git version control'],
      'api-microservices': ['Backend development', 'Database design', 'HTTP protocols'],
      'database-optimization': ['SQL fundamentals', 'Database concepts', 'Query writing'],
      cybersecurity: ['Web development basics', 'Network concepts', 'Security awareness'],
      'ai-ml-developers': ['Python programming', 'Mathematics basics', 'Data structures'],
      'blockchain-web3': ['JavaScript/Solidity', 'Cryptography basics', 'Web development'],
    };

    topics.forEach((topic, index) => {
      if (
        topic.difficulty === 'Advanced' &&
        (!topic.prerequisites || topic.prerequisites.length === 0)
      ) {
        const prerequisites = prerequisiteMap[topic.slug] || [
          'Programming fundamentals',
          'Problem-solving skills',
        ];

        topics[index] = {
          ...topic,
          prerequisites,
          updated_at: new Date().toISOString(),
        };
        results.updated++;
      }
    });

    return results;
  }

  /**
   * Link topics to related portfolio projects
   */
  static linkPortfolioProjects(): { updated: number; errors: string[] } {
    const results = { updated: 0, errors: [] as string[] };

    const portfolioLinks: Record<string, string[]> = {
      'react-mastery': ['e-ogugua-portfolio', 'ai-finance-advisor'],
      'typescript-fullstack': ['codementor-academy', 'ceowrites-emmanuel-blog'],
      'devops-cloud': ['emmdra-empire', 'poshpoule-farms-suite'],
      'api-microservices': ['apivault', 'flowx-exchange'],
      'database-optimization': ['zereth-commerce-suite', 'crypto-autotrader'],
      cybersecurity: ['securevault-cli', 'ai-utility-hub'],
      'ai-ml-developers': ['emmanuel-ai', 'ai-finance-advisor'],
      'business-strategy': ['ceotr-suite', 'emmdra-lifestyle-suite'],
      'blockchain-web3': ['crypto-autotrader', 'flowx-exchange'],
      'react-native': ['agriverse', 'bible-game-hub'],
    };

    topics.forEach((topic, index) => {
      if (!topic.related_portfolio_slug || topic.related_portfolio_slug.length === 0) {
        const relatedProjects = portfolioLinks[topic.slug] || [];

        if (relatedProjects.length > 0) {
          topics[index] = {
            ...topic,
            related_portfolio_slug: relatedProjects.join(','),
            updated_at: new Date().toISOString(),
          };
          results.updated++;
        }
      }
    });

    return results;
  }

  /**
   * Run all migrations
   */
  static runAllMigrations(): {
    schema: { migrated: number; errors: string[] };
    outcomes: { updated: number; errors: string[] };
    prerequisites: { updated: number; errors: string[] };
    portfolio: { updated: number; errors: string[] };
  } {
    console.log('🔄 Running topic migrations...');

    const schema = this.migrateTopicsSchema();
    console.log(`✅ Schema migration: ${schema.migrated} topics updated`);

    const outcomes = this.addLearningOutcomes();
    console.log(`✅ Learning outcomes: ${outcomes.updated} topics updated`);

    const prerequisites = this.addPrerequisites();
    console.log(`✅ Prerequisites: ${prerequisites.updated} topics updated`);

    const portfolio = this.linkPortfolioProjects();
    console.log(`✅ Portfolio links: ${portfolio.updated} topics updated`);

    console.log('🎉 All migrations completed!');

    return { schema, outcomes, prerequisites, portfolio };
  }

  /**
   * Validate topic data integrity
   */
  static validateTopics(): { valid: number; invalid: { index: number; errors: string[] }[] } {
    const results = { valid: 0, invalid: [] as { index: number; errors: string[] }[] };

    topics.forEach((topic, index) => {
      const errors: string[] = [];

      // Required fields
      if (!topic.id) errors.push('Missing id');
      if (!topic.title) errors.push('Missing title');
      if (!topic.slug) errors.push('Missing slug');
      if (!topic.description) errors.push('Missing description');
      if (!topic.difficulty) errors.push('Missing difficulty');
      if (!topic.duration_estimate) errors.push('Missing duration_estimate');

      // Array fields
      if (!Array.isArray(topic.tags)) errors.push('Tags must be array');
      if (!Array.isArray(topic.learning_outcomes)) errors.push('Learning outcomes must be array');
      if (!Array.isArray(topic.prerequisites)) errors.push('Prerequisites must be array');
      if (!Array.isArray(topic.related_portfolio_slug))
        errors.push('Related portfolio slug must be array');

      // Enum validation
      if (!['Beginner', 'Intermediate', 'Advanced'].includes(topic.difficulty)) {
        errors.push('Invalid difficulty level');
      }

      // Type validation
      if (typeof topic.duration_estimate !== 'number' || topic.duration_estimate <= 0) {
        errors.push('Duration estimate must be positive number');
      }

      if (typeof topic.is_featured !== 'boolean') {
        errors.push('is_featured must be boolean');
      }

      if (errors.length > 0) {
        results.invalid.push({ index, errors });
      } else {
        results.valid++;
      }
    });

    return results;
  }
}
