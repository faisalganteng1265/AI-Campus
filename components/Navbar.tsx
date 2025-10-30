export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">AI</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Campus Navigator
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-gray-900 font-medium hover:text-blue-600 transition-colors drop-shadow-sm">
              Fitur
            </a>
            <a href="#how-it-works" className="text-gray-900 font-medium hover:text-blue-600 transition-colors drop-shadow-sm">
              Cara Kerja
            </a>
            <a href="#about" className="text-gray-900 font-medium hover:text-blue-600 transition-colors drop-shadow-sm">
              Tentang
            </a>
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all shadow-md">
              Mulai Sekarang
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
