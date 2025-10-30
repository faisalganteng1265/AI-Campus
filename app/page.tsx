export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navbar */}
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
              <a href="#features" className="text-gray-900 font-medium hover:text-blue-600 transition-colors drop-shadow-sm">Fitur</a>
              <a href="#how-it-works" className="text-gray-900 font-medium hover:text-blue-600 transition-colors drop-shadow-sm">Cara Kerja</a>
              <a href="#about" className="text-gray-900 font-medium hover:text-blue-600 transition-colors drop-shadow-sm">Tentang</a>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all shadow-md">
                Mulai Sekarang
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
                <span className="text-white drop-shadow-2xl" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.3)'}}>Navigasi Kampus</span>
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
                  <span className="text-sm text-gray-600">1000+ mahasiswa aktif</span>
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
                          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">1</span>
                          Login ke portal akademik
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">2</span>
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

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              ✨ Fitur Unggulan
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Semua yang Kamu Butuhkan
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                di Satu Tempat
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fitur-fitur canggih yang dirancang khusus untuk memudahkan kehidupan kampusmu
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">AI Campus Guide Chatbot</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Tanya apa saja tentang kampus! Dari cara mengisi KRS, lokasi gedung, info dosen, hingga prosedur beasiswa. AI siap membantu 24/7.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">KRS</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Info Gedung</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Beasiswa</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Info Dosen</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Event Recommender</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Dapatkan rekomendasi kegiatan yang sesuai dengan minatmu! Seminar, lomba, UKM, volunteering - semua disesuaikan untukmu.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Seminar</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Lomba</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">UKM</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Volunteering</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Smart Schedule Builder</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                AI bantu atur jadwal kuliah dan kegiatanmu agar seimbang. Tidak ada lagi bentrok jadwal atau overload kegiatan!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Auto Arrange</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Conflict Free</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Work-Life Balance</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Peer Connect AI</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Temukan teman atau mentor dengan minat yang sama! AI mencocokkan kamu dengan orang-orang yang tepat untuk berkembang bersama.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Find Friends</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Mentorship</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Study Group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="text-5xl font-bold">1000+</div>
              <div className="text-blue-100">Mahasiswa Aktif</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">50+</div>
              <div className="text-blue-100">Event per Bulan</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">95%</div>
              <div className="text-blue-100">Kepuasan Pengguna</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              🎯 Cara Kerja
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mudah Digunakan,
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Langsung Efektif
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">1️⃣</span>
              </div>
              <h3 className="text-2xl font-bold">Daftar & Setup</h3>
              <p className="text-gray-600">Buat akun dan atur preferensi minatmu dalam hitungan menit</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">2️⃣</span>
              </div>
              <h3 className="text-2xl font-bold">Eksplorasi Fitur</h3>
              <p className="text-gray-600">Gunakan chatbot, cari event, dan atur jadwalmu dengan AI</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">3️⃣</span>
              </div>
              <h3 className="text-2xl font-bold">Nikmati Hasilnya</h3>
              <p className="text-gray-600">Kehidupan kampus jadi lebih teratur dan menyenangkan!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Siap Memulai Petualangan
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kampus yang Lebih Cerdas?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Bergabunglah dengan ribuan mahasiswa yang sudah merasakan kemudahan navigasi kampus dengan AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all text-lg">
                Mulai Gratis Sekarang
              </button>
              <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all text-lg">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="#" className="hover:text-white transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Bantuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Campus Navigator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
