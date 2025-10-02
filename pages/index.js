import { useState, useEffect } from 'react';
import { getAllTools, filterTools } from '../data/tools';
import ToolCard from '../components/ToolCard';
import { Search, Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);

  useEffect(() => {
    const allTools = getAllTools();
    setTools(allTools);
    setFilteredTools(allTools);
  }, []);

  useEffect(() => {
    const filtered = filterTools(searchTerm);
    setFilteredTools(filtered);
  }, [searchTerm]);

  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vor<span className="text-yellow-300">Tools</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Kumpulan Tools Online Gratis & Powerful
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span>Super Fast</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari tools berdasarkan nama atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
            </div>
            {searchTerm && (
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                Ditemukan {filteredTools.length} tools untuk "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Semua Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Pilih tools yang Anda butuhkan dari berbagai kategori
            </p>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada tools yang ditemukan untuk pencarian "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kategori Tools
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchTerm(category)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg font-medium transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
              }
