import ChatInterface from '@/components/ChatInterface';
import Navbar from '@/components/Navbar';

export default function Fitur1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 pt-32 pb-12 overflow-hidden">
        {/* Decorative Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Icon with glow effect */}
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <span className="text-7xl">💬</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI Campus Guide Chatbot
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Asisten virtual cerdas untuk membantu menjawab semua pertanyaan seputar kampus
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📚</div>
              <p className="text-white text-base font-semibold mb-1">Info KRS</p>
              <p className="text-emerald-100 text-sm">Panduan lengkap</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏛️</div>
              <p className="text-white text-base font-semibold mb-1">Lokasi Gedung</p>
              <p className="text-emerald-100 text-sm">Navigasi kampus</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👨‍🏫</div>
              <p className="text-white text-base font-semibold mb-1">Info Dosen</p>
              <p className="text-emerald-100 text-sm">Data lengkap</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💰</div>
              <p className="text-white text-base font-semibold mb-1">Beasiswa</p>
              <p className="text-emerald-100 text-sm">Prosedur & info</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[calc(100vh-400px)] min-h-[600px]">
            <ChatInterface />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-black/50 backdrop-blur-md border-t border-emerald-500/20 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <span className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
                <span className="relative w-3 h-3 bg-emerald-400 rounded-full block"></span>
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Online 24/7</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
              <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Respons Instan</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-2xl group-hover:scale-110 transition-transform">🎯</span>
              <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Akurat & Terpercaya</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-2xl group-hover:scale-110 transition-transform">🔒</span>
              <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Aman & Privat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
