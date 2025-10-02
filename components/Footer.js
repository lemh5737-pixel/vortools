import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Vor<span className="text-primary-400">Tools</span>
            </h3>
            <p className="text-gray-400">
              Kumpulan tools online gratis untuk mempermudah pekerjaan sehari-hari Anda.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Downloader</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">AI Tools</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Generator</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Converter</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VorTools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
    }
