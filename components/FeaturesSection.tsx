'use client';

import CardSwap, { Card } from './CardSwap';
import { useState, useRef } from 'react';

export default function FeaturesSection() {
  const swapFunctionRef = useRef<(() => void) | null>(null);
  const pauseFunctionRef = useRef<(() => void) | null>(null);
  const resumeFunctionRef = useRef<(() => void) | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const handleSwapTrigger = (swapFn: () => void) => {
    swapFunctionRef.current = swapFn;
  };

  const handlePauseResume = (pauseFn: () => void, resumeFn: () => void) => {
    pauseFunctionRef.current = pauseFn;
    resumeFunctionRef.current = resumeFn;
  };

  const handleCardClick = (cardIndex: number) => {
    if (activeCardIndex === cardIndex) {
      // Klik lagi - deactivate dan resume auto swap
      setActiveCardIndex(null);
      if (resumeFunctionRef.current) {
        resumeFunctionRef.current();
      }
    } else {
      // Activate card dan pause auto swap
      setActiveCardIndex(cardIndex);
      if (pauseFunctionRef.current) {
        pauseFunctionRef.current();
      }
    }
  };

  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Paint Splatter Effect - Deep Dark Green Blobs (Same Color for Overlap) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-800 blob-1 opacity-35"></div>
      <div className="absolute top-10 right-16 w-64 h-64 bg-emerald-800 blob-2 opacity-30"></div>
      <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-emerald-800 blob-3 opacity-35"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-800 blob-4 opacity-32"></div>
      <div className="absolute top-1/2 left-1/3 w-68 h-68 bg-emerald-800 blob-5 opacity-28"></div>
      <div className="absolute top-40 right-1/3 w-60 h-60 bg-emerald-800 blob-1 opacity-30"></div>
      <div className="absolute bottom-40 left-1/2 w-64 h-64 bg-emerald-800 blob-2 opacity-33"></div>
      <div className="absolute top-60 left-20 w-56 h-56 bg-emerald-800 blob-3 opacity-28"></div>
      <div className="absolute bottom-60 right-1/4 w-68 h-68 bg-emerald-800 blob-4 opacity-30"></div>
      <div className="absolute top-1/3 right-10 w-60 h-60 bg-emerald-800 blob-5 opacity-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4 text-emerald-800" style={{ fontFamily: 'Bungee, sans-serif', letterSpacing: '0.02em' }}>
            Ada Fitur Apa Aja Sih?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fitur-fitur canggih yang dirancang khusus untuk memudahkan kehidupan kampusmu
          </p>
        </div>

        {/* CardSwap Implementation */}
        <div className="flex justify-end items-center min-h-[600px] pr-20">
          <CardSwap
            width={450}
            height={350}
            cardDistance={50}
            verticalDistance={60}
            delay={4000}
            pauseOnHover={false}
            skewAmount={4}
            easing="elastic"
            onSwapTrigger={handleSwapTrigger}
            onPauseResume={handlePauseResume}
          >
            {/* Feature 1: AI Campus Guide - Fresh Green Theme with Chat Bubble Pattern */}
            <Card className={`bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 border border-emerald-400/30 p-8 flex flex-col justify-between relative overflow-hidden ${activeCardIndex === 0 ? 'card-active' : ''}`}>
              {/* Decorative Chat Bubbles Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl"></div>

              {/* Next Button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-300/50 transition-all hover:scale-110 z-10 border border-white/30 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(0);
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">AI Campus Guide Chatbot</h3>
                <p className="text-emerald-50/90 mb-4 leading-relaxed text-sm">
                  Tanya apa saja tentang kampus! Dari cara mengisi KRS, lokasi gedung, info dosen, hingga prosedur beasiswa. AI siap membantu 24/7.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">KRS</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Info Gedung</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Beasiswa</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Info Dosen</span>
              </div>
            </Card>

            {/* Feature 2: Event Recommender - Medium Green Theme with Target Pattern */}
            <Card className={`bg-gradient-to-br from-green-700 via-emerald-700 to-green-800 border border-green-400/30 p-8 flex flex-col justify-between relative overflow-hidden ${activeCardIndex === 1 ? 'card-active' : ''}`}>
              {/* Decorative Target Circles Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-full"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"></div>

              {/* Next Button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-green-300/50 transition-all hover:scale-110 z-10 border border-white/30 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(1);
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Event Recommender</h3>
                <p className="text-green-50/90 mb-4 leading-relaxed text-sm">
                  Dapatkan rekomendasi kegiatan yang sesuai dengan minatmu! Seminar, lomba, UKM, volunteering - semua disesuaikan untukmu.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Seminar</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Lomba</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">UKM</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Volunteering</span>
              </div>
            </Card>

            {/* Feature 3: Smart Schedule Builder - Fresh Green Theme with Grid Pattern */}
            <Card className={`bg-gradient-to-br from-teal-700 via-emerald-700 to-teal-800 border border-teal-400/30 p-8 flex flex-col justify-between relative overflow-hidden ${activeCardIndex === 2 ? 'card-active' : ''}`}>
              {/* Decorative Grid Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl"></div>

              {/* Next Button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-teal-300/50 transition-all hover:scale-110 z-10 border border-white/30 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(2);
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Smart Schedule Builder</h3>
                <p className="text-teal-50/90 mb-4 leading-relaxed text-sm">
                  AI bantu atur jadwal kuliah dan kegiatanmu agar seimbang. Tidak ada lagi bentrok jadwal atau overload kegiatan!
                </p>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Auto Arrange</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Conflict Free</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Work-Life Balance</span>
              </div>
            </Card>

            {/* Feature 4: Peer Connect AI - Deep Green Theme with Network Pattern */}
            <Card className={`bg-gradient-to-br from-emerald-800 via-green-800 to-emerald-900 border border-emerald-400/30 p-8 flex flex-col justify-between relative overflow-hidden ${activeCardIndex === 3 ? 'card-active' : ''}`}>
              {/* Decorative Network Dots Background */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute top-12 right-8 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute bottom-16 left-12 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute bottom-8 right-16 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-2xl"></div>

              {/* Next Button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-300/50 transition-all hover:scale-110 z-10 border border-white/30 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(3);
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30">
                  <span className="text-4xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Peer Connect AI</h3>
                <p className="text-emerald-50/90 mb-4 leading-relaxed text-sm">
                  Temukan teman atau mentor dengan minat yang sama! AI mencocokkan kamu dengan orang-orang yang tepat untuk berkembang bersama.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Find Friends</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Mentorship</span>
                <span className="px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-sm">Study Group</span>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
