import ChatInterface from '@/components/ChatInterface';

export default function Fitur1() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block mb-4">
            <span className="text-6xl">🤖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Campus Guide Chatbot
          </h1>
          <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
            Asisten virtual cerdas untuk membantu menjawab semua pertanyaan seputar kampus UNS
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl mb-2">📚</div>
              <p className="text-white text-sm font-medium">Info KRS</p>
              <p className="text-emerald-100 text-xs">Panduan lengkap</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl mb-2">🏛️</div>
              <p className="text-white text-sm font-medium">Lokasi Gedung</p>
              <p className="text-emerald-100 text-xs">Navigasi kampus</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl mb-2">👨‍🏫</div>
              <p className="text-white text-sm font-medium">Info Dosen</p>
              <p className="text-emerald-100 text-xs">Data lengkap</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-white text-sm font-medium">Beasiswa</p>
              <p className="text-emerald-100 text-xs">Prosedur & info</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="h-[calc(100vh-320px)] min-h-[500px]">
        <ChatInterface />
      </div>

      {/* Footer Info */}
      <div className="bg-gray-900 border-t border-gray-700 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Online 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Respons Instan</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>Akurat & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Aman & Privat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
