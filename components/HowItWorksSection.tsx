'use client';

export default function HowItWorksSection() {
  // Generate rain drops
  const rainDrops = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 1,
  }));

  return (
    <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Rain Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-0.5 h-12 bg-gradient-to-b from-emerald-400/60 to-transparent"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              animationName: 'rain-fall',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          />
        ))}
      </div>

      {/* Paint Splatter Effect */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-900 blob-1 opacity-15"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-900 blob-2 opacity-20"></div>
      <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-emerald-900 blob-3 opacity-18"></div>
      <div className="absolute bottom-20 right-1/3 w-88 h-88 bg-emerald-900 blob-4 opacity-15"></div>
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-emerald-900 blob-5 opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="text-2xl">🎯</span>
            <span>Cara Kerja</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white" style={{ fontFamily: 'Bungee, sans-serif', letterSpacing: '0.02em' }}>
            Mudah Digunakan,
          </h2>
          <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bungee, sans-serif' }}>
            Langsung Efektif
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines - Hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 z-0">
            <div className="relative w-full h-full">
              <div className="absolute left-[16.66%] right-[16.66%] h-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"></div>
              {/* Animated dots on the line */}
              <div className="absolute left-[16.66%] top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute right-[16.66%] top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Step 1 */}
          <div className="group relative">
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 h-full">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent rounded-3xl transition-all duration-300"></div>

              {/* Number Badge */}
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  {/* Main circle */}
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-full flex items-center justify-center border-4 border-emerald-400/30 group-hover:border-emerald-400/60 transition-all">
                    <span className="text-5xl font-bold text-white drop-shadow-lg">1</span>
                  </div>
                  {/* Rotating ring */}
                  <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-spin-slow"></div>
                </div>
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-5xl">📝</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center space-y-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Daftar & Setup
                </h3>
                <p className="text-emerald-200/80 text-lg leading-relaxed">
                  Buat akun dan atur preferensi minatmu dalam hitungan menit
                </p>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg"></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative">
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 h-full">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent rounded-3xl transition-all duration-300"></div>

              {/* Number Badge */}
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  {/* Main circle */}
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-full flex items-center justify-center border-4 border-emerald-400/30 group-hover:border-emerald-400/60 transition-all">
                    <span className="text-5xl font-bold text-white drop-shadow-lg">2</span>
                  </div>
                  {/* Rotating ring */}
                  <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-spin-slow" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-5xl">🚀</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center space-y-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Eksplorasi Fitur
                </h3>
                <p className="text-emerald-200/80 text-lg leading-relaxed">
                  Gunakan chatbot, cari event, dan atur jadwalmu dengan AI
                </p>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg"></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative">
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 h-full">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent rounded-3xl transition-all duration-300"></div>

              {/* Number Badge */}
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  {/* Main circle */}
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-full flex items-center justify-center border-4 border-emerald-400/30 group-hover:border-emerald-400/60 transition-all">
                    <span className="text-5xl font-bold text-white drop-shadow-lg">3</span>
                  </div>
                  {/* Rotating ring */}
                  <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-spin-slow" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-5xl">🎉</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center space-y-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Nikmati Hasilnya
                </h3>
                <p className="text-emerald-200/80 text-lg leading-relaxed">
                  Kehidupan kampus jadi lebih teratur dan menyenangkan!
                </p>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rain-fall {
          0% {
            transform: translateY(-100%);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0.3;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        :global(.animate-spin-slow) {
          animation: spin-slow 8s linear infinite;
        }

        .blob-1 {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(60px);
        }
        .blob-2 {
          border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          filter: blur(60px);
        }
        .blob-3 {
          border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
          filter: blur(60px);
        }
        .blob-4 {
          border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%;
          filter: blur(60px);
        }
        .blob-5 {
          border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          filter: blur(60px);
        }
      `}</style>
    </section>
  );
}
