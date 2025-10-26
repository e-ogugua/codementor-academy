import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Code,
  ExternalLink,
  FileText,
  Users,
} from 'lucide-react';
import { type Resource, resourcesData } from '../data/resourcesData';

export function ResourcesPage() {
  const [savedResources, setSavedResources] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const saved = localStorage.getItem('savedResources');
    if (saved) {
      setSavedResources(JSON.parse(saved));
    }
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(resourcesData.map((r: Resource) => r.category))),
  ];

  const filteredResources =
    selectedCategory === 'All'
      ? resourcesData
      : resourcesData.filter((r: Resource) => r.category === selectedCategory);

  const handleSaveResource = (resourceId: string) => {
    const newSaved = savedResources.includes(resourceId)
      ? savedResources.filter((id: string) => id !== resourceId)
      : [...savedResources, resourceId];
    setSavedResources(newSaved);
    localStorage.setItem('savedResources', JSON.stringify(newSaved));
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'Tools':
        return Code;
      case 'Cheat Sheets':
        return FileText;
      case 'Tutorials':
        return BookOpen;
      case 'Communities':
        return Users;
      case 'Career Tips':
        return ExternalLink;
      case 'Developer Tools':
        return Code;
      case 'Code Challenges':
        return ExternalLink;
      default:
        return ExternalLink;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl font-bold text-white mb-4'>
            <span className='text-cyber-purple'>Resources</span> Library
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            Curated tools, tutorials, and communities to accelerate your coding journey.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className='mb-8'>
          <div className='flex flex-wrap gap-2 justify-center'>
            {categories.map((category: string) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyber-purple text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {categories.slice(1).map((category: string, index: number) => {
          const categoryResources = filteredResources.filter(
            (r: Resource) => r.category === category
          );
          if (categoryResources.length === 0) return null;
          const Icon = getIcon(category);

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='mb-12'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Icon className='w-6 h-6 text-cyber-purple' />
                <h2 className='text-2xl font-bold text-white'>{category}</h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categoryResources.map((resource: Resource, resIndex: number) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + resIndex * 0.05 }}
                    className='bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300'
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <h3 className='text-lg font-semibold text-white'>{resource.title}</h3>
                      <motion.button
                        onClick={() => handleSaveResource(resource.id)}
                        className='text-gray-400 hover:text-cyber-purple transition-colors'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {savedResources.includes(resource.id) ? (
                          <BookmarkCheck className='w-5 h-5 text-cyber-purple' />
                        ) : (
                          <Bookmark className='w-5 h-5' />
                        )}
                      </motion.button>
                    </div>
                    <p className='text-gray-300 text-sm mb-4'>{resource.description}</p>

                    {resource.type === 'embed' && resource.embedId ? (
                      <div className='aspect-video bg-gray-800 rounded-lg overflow-hidden'>
                        <iframe
                          src={`https://www.youtube.com/embed/${resource.embedId}`}
                          title={resource.title}
                          className='w-full h-full'
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <a
                        href={resource.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 bg-cyber-purple hover:bg-cyber-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
                      >
                        Visit Resource
                        <ExternalLink className='w-4 h-4' />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

export default ResourcesPage;
