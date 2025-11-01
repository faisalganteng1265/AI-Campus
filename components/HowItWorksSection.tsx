'use client';

import { useState, useEffect } from 'react';

export default function HowItWorksSection() {
  // Generate rain drops on client-side only to avoid hydration errors
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  // Generate grass blades on client-side
  const [grassBg, setGrassBg] = useState<Array<{ id: number; left: number; height: number; delay: number; opacity: number }>>([]);
  const [grassFg, setGrassFg] = useState<Array<{ id: number; left: number; height: number; delay: number }>>([]);
  const [grassSmall, setGrassSmall] = useState<Array<{ id: number; left: number; height: number; delay: number }>>([]);

  useEffect(() => {
    setRainDrops(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 1,
    })));

    setGrassBg(Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: i * 2,
      height: Math.random() * 40 + 40,
      delay: Math.random() * 2,
      opacity: 0.6,
    })));

    setGrassFg(Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: i * 1.8,
      height: Math.random() * 60 + 50,
      delay: Math.random() * 3,
    })));

    setGrassSmall(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: i * 1.3,
      height: Math.random() * 30 + 20,
      delay: Math.random() * 4,
    })));
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
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
        {/* Header with Badge */}
        

        {/* Steps - Staircase Layout (Tangga) */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Step 1 - Top (Small Box) */}
          <div className="w-full md:mt-0">
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 animate-box-pulse-1">
                {/* Number Badge */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    {/* Main circle */}
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-full flex items-center justify-center border-2 border-emerald-400/30">
                      <span className="text-3xl font-bold text-white drop-shadow-lg">1</span>
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 mx-auto bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    <span className="text-4xl">📝</span>
                  </div>
                </div>

                {/* Content - Center aligned */}
                <div className="relative text-center space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Daftar & Setup
                  </h3>
                  <p className="text-emerald-200/80 text-sm leading-relaxed">
                    Buat akun dan atur preferensi minatmu dalam hitungan menit
                  </p>
                </div>
              </div>
            </div>
            {/* "Mudah Digunakan," Text (no box) - Below box, right aligned */}
            <div className="mt-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-right" style={{ fontFamily: 'Bungee, sans-serif', letterSpacing: '0.02em' }}>
                MUDAH DIGUNAKAN
              </h2>
            </div>
          </div>

          {/* Step 2 - Middle (Medium Box) */}
          <div className="w-full md:mt-0">
            {/* "Cara Kerja" Text (no box) */}
            <div className="mb-20 flex justify-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold bg-white bg-clip-text text-transparent" style={{ fontFamily: 'Bungee, sans-serif' }}>
                CARA 
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bungee, sans-serif' }}>
                KERJA
              </p>
            </div>
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 animate-box-pulse-2">
                {/* Number Badge */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    {/* Main circle */}
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-full flex items-center justify-center border-2 border-emerald-400/30">
                      <span className="text-3xl font-bold text-white drop-shadow-lg">2</span>
                    </div>
                    {/* Rotating ring */}
                    <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-spin-slow"></div>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 mx-auto bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    <span className="text-4xl">🚀</span>
                  </div>
                </div>

                {/* Content - Center aligned */}
                <div className="relative text-center space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Eksplorasi Fitur
                  </h3>
                  <p className="text-emerald-200/80 text-sm leading-relaxed">
                    Gunakan chatbot, cari event, dan atur jadwalmu dengan AI
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 - Bottom (Small Box) */}
          <div className="w-full md:mt-48">
            {/* "Langsung Efektif" Text (no box) */}
            <div className="mb-6 flex justify-end">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent" style={{ fontFamily: 'Bungee, sans-serif' }}>
                LANGSUNG EFEKTIF
              </p>
            </div>
            <div className="group relative">
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 animate-box-pulse-3">
                {/* Number Badge */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    {/* Main circle */}
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-full flex items-center justify-center border-2 border-emerald-400/30">
                      <span className="text-3xl font-bold text-white drop-shadow-lg">3</span>
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 mx-auto bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    <span className="text-4xl">🎉</span>
                  </div>
                </div>

                {/* Content - Center aligned */}
                <div className="relative text-center space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Nikmati Hasilnya
                  </h3>
                  <p className="text-emerald-200/80 text-sm leading-relaxed">
                    Kehidupan kampus jadi lebih teratur dan menyenangkan!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grass decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20">
        {/* Grass layer 1 - Background */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          {grassBg.map((grass) => (
            <div
              key={`grass-bg-${grass.id}`}
              className="grass-blade-bg absolute bottom-0"
              style={{
                left: `${grass.left}%`,
                height: `${grass.height}px`,
                animationDelay: `${grass.delay}s`,
                opacity: grass.opacity,
                width: '10px',
                background: 'linear-gradient(to top, #065f46, #10b981)',
                borderRadius: '50% 50% 0 0',
                transformOrigin: 'bottom center',
              }}
            />
          ))}
        </div>

        {/* Grass layer 2 - Foreground */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          {grassFg.map((grass) => (
            <div
              key={`grass-fg-${grass.id}`}
              className="grass-blade-fg absolute bottom-0"
              style={{
                left: `${grass.left}%`,
                height: `${grass.height}px`,
                animationDelay: `${grass.delay}s`,
                width: '8px',
                background: 'linear-gradient(to top, #047857, #34d399)',
                borderRadius: '60% 60% 0 0',
                transformOrigin: 'bottom center',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
              }}
            />
          ))}
        </div>

        {/* Small grass details */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          {grassSmall.map((grass) => (
            <div
              key={`grass-small-${grass.id}`}
              className="grass-blade-small absolute bottom-0"
              style={{
                left: `${grass.left}%`,
                height: `${grass.height}px`,
                animationDelay: `${grass.delay}s`,
                width: '5px',
                background: 'linear-gradient(to top, #064e3b, #059669)',
                borderRadius: '50% 50% 0 0',
                transformOrigin: 'bottom center',
                opacity: 0.8,
              }}
            />
          ))}
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

        @keyframes box-pulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 0 0 rgba(16, 185, 129, 0);
            border-color: rgba(16, 185, 129, 0.2);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            box-shadow: 0 35px 70px -12px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4);
            border-color: rgba(16, 185, 129, 0.8);
          }
        }

        :global(.animate-spin-slow) {
          animation: spin-slow 8s linear infinite;
        }

        :global(.animate-box-pulse-1) {
          animation: box-pulse 3s ease-in-out infinite;
        }

        :global(.animate-box-pulse-2) {
          animation: box-pulse 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        :global(.animate-box-pulse-3) {
          animation: box-pulse 3s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes grass-sway {
          0%, 100% {
            transform: rotate(0deg) translateX(0);
          }
          25% {
            transform: rotate(2deg) translateX(2px);
          }
          75% {
            transform: rotate(-2deg) translateX(-2px);
          }
        }

        @keyframes grass-sway-strong {
          0%, 100% {
            transform: rotate(0deg) translateX(0);
          }
          25% {
            transform: rotate(4deg) translateX(3px);
          }
          75% {
            transform: rotate(-4deg) translateX(-3px);
          }
        }

        :global(.grass-blade-bg) {
          position: absolute;
          bottom: 0;
          width: 8px;
          background: linear-gradient(to top, #065f46, #10b981);
          border-radius: 50% 50% 0 0;
          transform-origin: bottom center;
          animation: grass-sway 3s ease-in-out infinite;
          filter: blur(0.5px);
        }

        :global(.grass-blade-fg) {
          position: absolute;
          bottom: 0;
          width: 6px;
          background: linear-gradient(to top, #047857, #34d399);
          border-radius: 60% 60% 0 0;
          transform-origin: bottom center;
          animation: grass-sway-strong 2.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        :global(.grass-blade-small) {
          position: absolute;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to top, #064e3b, #059669);
          border-radius: 50% 50% 0 0;
          transform-origin: bottom center;
          animation: grass-sway 4s ease-in-out infinite;
          opacity: 0.8;
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
