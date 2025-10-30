export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Campus Background Image - More visible */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')] bg-cover bg-center opacity-70 animate-slow-zoom"></div>

        {/* Very Light Gradient Overlay - minimal to preserve campus image */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-blue-50/30 to-purple-50/40"></div>

        {/* Floating Elements - Subtle glass effect */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-3xl backdrop-blur-md animate-float border border-white/20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-md animate-float-delayed border border-white/20"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-white/10 rounded-3xl backdrop-blur-md animate-float-slow border border-white/20"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/10 rounded-3xl backdrop-blur-md animate-float border border-white/20"></div>
        <div className="absolute bottom-32 right-10 w-36 h-36 bg-white/10 rounded-3xl backdrop-blur-md animate-float-delayed border border-white/20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-white/95 backdrop-blur-md text-blue-600 rounded-full text-sm font-semibold shadow-xl">
              🚀 Panduan Kehidupan Kampus Cerdas
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
                Navigasi Kampus
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                Jadi Lebih Mudah
              </span>
            </h1>
            <p className="text-lg text-gray-900 leading-relaxed bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl">
              AI Campus Navigator membantu mahasiswa menavigasi kehidupan kampus dengan lebih cerdas, efisien, dan menyenangkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all">
                Coba Gratis Sekarang
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all">
                Lihat Demo
              </button>
            </div>
            <div className="flex items-center gap-8 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                </div>
                <span className="text-sm text-gray-900 font-medium drop-shadow">1000+ mahasiswa aktif</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                    <p className="text-gray-700">Halo! Ada yang bisa saya bantu tentang kampus?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">👤</span>
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4">
                    <p className="text-white">Bagaimana cara mengisi KRS?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                    <p className="text-gray-700">Berikut langkah-langkah mengisi KRS...</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
                          1
                        </span>
                        Login ke portal akademik
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
                          2
                        </span>
                        Pilih menu KRS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-3xl opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
