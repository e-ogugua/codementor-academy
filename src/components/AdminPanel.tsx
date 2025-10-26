import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Database, Download, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { AdminAPI } from '../api/admin';

interface AdminPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AdminPanel({ isVisible, onClose }: AdminPanelProps) {
  const [importResults, setImportResults] = useState<{ success: number; errors: string[] } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'stats'>('import');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setImportResults(null);

    try {
      const text = await file.text();
      let results;

      if (file.name.endsWith('.json')) {
        const jsonData = JSON.parse(text) as Record<string, unknown>[];
        results = await AdminAPI.importFromJSON(Array.isArray(jsonData) ? jsonData : [jsonData]);
      } else if (file.name.endsWith('.csv')) {
        results = await AdminAPI.importFromCSV(text);
      } else {
        throw new Error('Unsupported file type. Please use JSON or CSV files.');
      }

      setImportResults(results);
    } catch (error) {
      setImportResults({
        success: 0,
        errors: [`File processing error: ${String(error)}`],
      });
    } finally {
      setIsLoading(false);
      // Clear the input
      event.target.value = '';
    }
  };

  const handleExport = (format: 'json' | 'csv') => {
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(AdminAPI.exportToJSON(), null, 2);
      filename = 'codementor-topics.json';
      mimeType = 'application/json';
    } else {
      content = AdminAPI.exportToCSV();
      filename = 'codementor-topics.csv';
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = AdminAPI.getStats();

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-gray-900 border border-purple-500/20 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-white flex items-center gap-2'>
            <Database className='w-6 h-6 text-purple-400' />
            Admin Panel
          </h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white transition-colors'>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className='flex gap-4 mb-6 border-b border-gray-700'>
          {(['import', 'export', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 capitalize transition-colors ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-3'>Import Topics</h3>
              <p className='text-gray-400 mb-4'>
                Upload JSON or CSV files to import topic data. Existing topics with matching slugs
                will be updated.
              </p>

              <div className='border-2 border-dashed border-gray-600 rounded-lg p-8 text-center'>
                <Upload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <label className='cursor-pointer'>
                  <input
                    type='file'
                    accept='.json,.csv'
                    onChange={handleFileUpload}
                    className='hidden'
                    disabled={isLoading}
                  />
                  <span className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors'>
                    {isLoading ? 'Processing...' : 'Choose File'}
                  </span>
                </label>
                <p className='text-gray-500 mt-2'>JSON or CSV files only</p>
              </div>
            </div>

            {/* Import Results */}
            {importResults && (
              <div className='bg-gray-800 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  {importResults.success > 0 ? (
                    <CheckCircle className='w-5 h-5 text-green-400' />
                  ) : (
                    <AlertCircle className='w-5 h-5 text-red-400' />
                  )}
                  <h4 className='font-semibold text-white'>Import Results</h4>
                </div>

                <div className='space-y-2'>
                  <p className='text-green-400'>
                    ✓ {importResults.success} topics imported successfully
                  </p>
                  {importResults.errors.length > 0 && (
                    <div>
                      <p className='text-red-400 mb-2'>✗ {importResults.errors.length} errors:</p>
                      <ul className='text-red-300 text-sm space-y-1 ml-4'>
                        {importResults.errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CSV Format Guide */}
            <div className='bg-gray-800 rounded-lg p-4'>
              <h4 className='font-semibold text-white mb-2'>CSV Format Guide</h4>
              <p className='text-gray-400 text-sm mb-2'>Required columns:</p>
              <code className='text-xs text-green-400 block bg-gray-900 p-2 rounded'>
                id,title,slug,description,tags,difficulty,duration_estimate,author,is_featured,learning_outcomes,prerequisites,related_portfolio_slugs
              </code>
              <p className='text-gray-400 text-xs mt-2'>
                • Use semicolons (;) to separate multiple values in array fields (tags,
                learning_outcomes, etc.) • difficulty must be: Beginner, Intermediate, or Advanced •
                duration_estimate should be in minutes
              </p>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-3'>Export Topics</h3>
              <p className='text-gray-400 mb-6'>
                Download all topic data in JSON or CSV format for backup or external processing.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <button
                  onClick={() => handleExport('json')}
                  className='bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center gap-3'
                >
                  <FileText className='w-6 h-6' />
                  <div className='text-left'>
                    <div className='font-semibold'>Export as JSON</div>
                    <div className='text-sm opacity-80'>Structured data format</div>
                  </div>
                </button>

                <button
                  onClick={() => handleExport('csv')}
                  className='bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center gap-3'
                >
                  <Download className='w-6 h-6' />
                  <div className='text-left'>
                    <div className='font-semibold'>Export as CSV</div>
                    <div className='text-sm opacity-80'>Spreadsheet compatible</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-3'>Topic Statistics</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                <div className='bg-gray-800 rounded-lg p-4 text-center'>
                  <div className='text-2xl font-bold text-purple-400'>{stats.total}</div>
                  <div className='text-gray-400'>Total Topics</div>
                </div>

                <div className='bg-gray-800 rounded-lg p-4 text-center'>
                  <div className='text-2xl font-bold text-green-400'>{stats.featured}</div>
                  <div className='text-gray-400'>Featured</div>
                </div>

                <div className='bg-gray-800 rounded-lg p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-400'>
                    {Math.round(stats.totalDuration / 60)}h
                  </div>
                  <div className='text-gray-400'>Total Duration</div>
                </div>

                <div className='bg-gray-800 rounded-lg p-4 text-center'>
                  <div className='text-2xl font-bold text-yellow-400'>
                    {stats.uniqueTags.length}
                  </div>
                  <div className='text-gray-400'>Unique Tags</div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Difficulty Distribution */}
                <div className='bg-gray-800 rounded-lg p-4'>
                  <h4 className='font-semibold text-white mb-3'>By Difficulty</h4>
                  <div className='space-y-2'>
                    {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
                      <div key={difficulty} className='flex justify-between items-center'>
                        <span className='text-gray-300'>{difficulty}</span>
                        <span className='text-white font-semibold'>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className='bg-gray-800 rounded-lg p-4'>
                  <h4 className='font-semibold text-white mb-3'>All Tags</h4>
                  <div className='flex flex-wrap gap-2 max-h-32 overflow-y-auto'>
                    {stats.uniqueTags.map(tag => (
                      <span
                        key={tag}
                        className='px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default AdminPanel;
