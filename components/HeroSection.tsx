export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Campus Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')] bg-cover bg-center"></div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle */}
        <p className="text-emerald-400 text-sm md:text-base font-medium tracking-wider mb-8 uppercase">
          Panduan Kehidupan Kampus Cerdas
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Empowering<br />
          Students Through<br />
          Intelligent<br />
          <span className="text-emerald-400">Guidance</span>
        </h1>

        {/* Description */}
        <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          AI membantu mahasiswa menavigasi dunia kampus dengan lebih cerdas<br className="hidden md:block" />
          dan efisien
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-md font-medium hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20">
            <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">▶</span>
            </span>
            VIDEO
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-emerald-400 text-emerald-400 rounded-md font-medium hover:bg-emerald-400 hover:text-white transition-all">
            GET STARTED
          </button>
        </div>
      </div>

      {/* Scroll Down Arrow - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
