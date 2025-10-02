// components/ToolCard.js

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ToolCard({ tool }) {
  // Cek apakah link adalah URL eksternal
  const isExternal = tool.link.startsWith('http://') || tool.link.startsWith('https://');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            {tool.category}
          </span>
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">{tool.icon[0]}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {tool.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {tool.deskripsi}
        </p>
        
        {/* Render link berdasarkan apakah eksternal atau internal */}
        {isExternal ? (
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Open</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : (
          <Link href={tool.link}>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Open</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
