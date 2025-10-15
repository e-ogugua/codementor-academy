import { topics, type Topic } from '../data/topics';

// Admin API endpoints for topic management
export class AdminAPI {
  private static validateTopic(data: Record<string, unknown>): Topic | null {
    const required: (keyof Topic)[] = ['id', 'title', 'slug', 'description', 'tags', 'difficulty', 'duration_estimate'];
    
    for (const field of required) {
      if (!data[field]) {
        console.error(`Missing required field: ${field}`);
        return null;
      }
    }

    // Validate difficulty
    const difficulty = data.difficulty as string;
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
      console.error(`Invalid difficulty: ${difficulty}`);
      return null;
    }

    // Validate duration_estimate is a number
    const duration = data.duration_estimate as number;
    if (typeof duration !== 'number' || duration <= 0) {
      console.error(`Invalid duration_estimate: ${duration}`);
      return null;
    }

    // Ensure tags is an array
    const tags = data.tags as string[];
    if (!Array.isArray(tags)) {
      console.error(`Tags must be an array: ${tags}`);
      return null;
    }

    return {
      id: data.id as string,
      title: data.title as string,
      slug: data.slug as string,
      description: data.description as string,
      tags: tags,
      difficulty: difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
      duration_estimate: duration,
      is_featured: Boolean(data.is_featured),
      learning_outcomes: (data.learning_outcomes as string[]) || [],
      prerequisites: (data.prerequisites as string[]) || [],
      related_portfolio_slug: (data.related_portfolio_slug as string) || undefined,
      author_id: (data.author_id as string) || 'emmanuel-ogugua',
      created_at: (data.created_at as string) || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  static async importFromJSON(jsonData: Record<string, unknown>[]): Promise<{ success: number; errors: string[] }> {
    const results = { success: 0, errors: [] as string[] };
    
    for (let i = 0; i < jsonData.length; i++) {
      const topic = this.validateTopic(jsonData[i]);
      if (topic) {
        // Check for duplicate slugs
        const existingIndex = topics.findIndex(t => t.slug === topic.slug);
        if (existingIndex >= 0) {
          topics[existingIndex] = topic; // Update existing
        } else {
          topics.push(topic); // Add new
        }
        results.success++;
      } else {
        results.errors.push(`Row ${i + 1}: Invalid topic data`);
      }
    }

    return results;
  }

  static async importFromCSV(csvText: string): Promise<{ success: number; errors: string[] }> {
    const results = { success: 0, errors: [] as string[] };
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      results.errors.push('CSV must have at least a header row and one data row');
      return results;
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const rowData: Record<string, unknown> = {};
        
        headers.forEach((header, index) => {
          let value: string | string[] | number | boolean = values[index] || '';
          
          // Parse special fields
          if (header === 'tags' || header === 'learning_outcomes' || header === 'prerequisites' || header === 'related_portfolio_slug') {
            value = value ? value.split(';').map((v: string) => v.trim()) : [];
          } else if (header === 'duration_estimate') {
            value = parseInt(value) || 0;
          } else if (header === 'is_featured') {
            value = value.toLowerCase() === 'true';
          }
          
          rowData[header] = value;
        });

        const topic = this.validateTopic(rowData);
        if (topic) {
          // Check for duplicate slugs
          const existingIndex = topics.findIndex(t => t.slug === topic.slug);
          if (existingIndex >= 0) {
            topics[existingIndex] = topic; // Update existing
          } else {
            topics.push(topic); // Add new
          }
          results.success++;
        } else {
          results.errors.push(`Row ${i + 1}: Invalid topic data`);
        }
      } catch (error) {
        results.errors.push(`Row ${i + 1}: Parse error - ${error}`);
      }
    }

    return results;
  }

  static exportToJSON(): Topic[] {
    return [...topics];
  }

  static exportToCSV(): string {
    const headers = [
      'id', 'title', 'slug', 'description', 'tags', 'difficulty', 
      'duration_estimate', 'is_featured', 'learning_outcomes', 
      'prerequisites', 'related_portfolio_slug'
    ];

    const csvRows = [headers.join(',')];
    
    topics.forEach(topic => {
      const row = headers.map(header => {
        let value: string | string[] | number | boolean | undefined = topic[header as keyof Topic];
        
        // Handle arrays by joining with semicolons
        if (Array.isArray(value)) {
          value = value.join(';');
        }
        
        // Convert to string and wrap in quotes, escape existing quotes
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }

  static getTopicById(id: string): Topic | undefined {
    return topics.find(t => t.id === id);
  }

  static getTopicBySlug(slug: string): Topic | undefined {
    return topics.find(t => t.slug === slug);
  }

  static deleteTopic(slug: string): boolean {
    const index = topics.findIndex(t => t.slug === slug);
    if (index >= 0) {
      topics.splice(index, 1);
      return true;
    }
    return false;
  }

  static getAllTopics(): Topic[] {
    return [...topics];
  }

  static getStats() {
    const stats = {
      total: topics.length,
      byDifficulty: {
        Beginner: 0,
        Intermediate: 0,
        Advanced: 0
      },
      featured: 0,
      totalDuration: 0,
      uniqueTags: new Set<string>()
    };

    topics.forEach(topic => {
      stats.byDifficulty[topic.difficulty]++;
      if (topic.is_featured) stats.featured++;
      stats.totalDuration += topic.duration_estimate;
      topic.tags.forEach(tag => stats.uniqueTags.add(tag));
    });

    return {
      ...stats,
      uniqueTags: Array.from(stats.uniqueTags).sort()
    };
  }
}
