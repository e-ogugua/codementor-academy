export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration_estimate: number; // in minutes
  tags: string[];
  learning_outcomes: string[];
  prerequisites?: string[];
  is_featured: boolean;
  price?: string;
  originalPrice?: string;
  author_id: string;
  related_portfolio_slug?: string;
  created_at: string;
  updated_at: string;
}

export type DifficultyLevel = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
export type SortOption = 'title' | 'difficulty' | 'duration';
