export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">AI</span>
              </div>
              <span className="text-xl font-bold">Campus Navigator</span>
            </div>
            <p className="text-gray-400">Panduan kehidupan kampus cerdas dengan teknologi AI</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produk</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Harga
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Demo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Dukungan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AI Campus Navigator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
