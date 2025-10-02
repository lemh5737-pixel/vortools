import { getToolById, getAllTools } from '../../data/tools';
import { ArrowLeft, ExternalLink, Tag, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ToolDetail({ tool }) {
  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tools Tidak Ditemukan
          </h1>
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                Beranda
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/#tools" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                Tools
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium">{tool.title}</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{tool.icon[0]}</span>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full">
                    {tool.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {tool.title}
                </h1>
                <p className="text-primary-100 text-lg">
                  {tool.deskripsi}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Tool Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Kategori</p>
                  <p className="font-medium text-gray-900 dark:text-white">{tool.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Waktu Pemrosesan</p>
                  <p className="font-medium text-gray-900 dark:text-white">Instan</p>
                </div>
              </div>
            </div>

            {/* Tool Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Deskripsi Lengkap
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {tool.deskripsi}. Tools ini dirancang untuk memberikan kemudahan dan efisiensi dalam menyelesaikan tugas-tugas Anda. 
                Dengan antarmuka yang intuitif dan proses yang cepat, Anda dapat menyelesaikan pekerjaan dengan hasil yang maksimal.
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Fitur Utama
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-400">Proses cepat dan efisien</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-400">Antarmuka yang user-friendly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-400">100% gratis tanpa batasan</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-400">Aman dan privasi terjamin</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Buka Tools</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/"
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Tools Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder untuk related tools */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                More tools coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const tools = getAllTools();
  const paths = tools.map((tool) => ({
    params: { id: tool.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tool = getToolById(params.id);

  return {
    props: {
      tool,
    },
  };
    }
