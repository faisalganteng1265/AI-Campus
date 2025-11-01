'use client';

import CardSwap, { Card } from './CardSwap';
import { useState, useRef, useEffect } from 'react';
import ElectricBorder from './ElectricBorder';

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  icon: string;
}

function StatItem({ end, label, suffix = '', icon }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; x: number }>>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(Math.round(increment * currentStep), end));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  // Rain drop effect on box - synchronized with background rain
  useEffect(() => {
    const addRainDrop = () => {
      const id = Date.now();
      const x = Math.random() * 100;
      setRainDrops((prev) => [...prev, { id, x }]);

      setTimeout(() => {
        setRainDrops((prev) => prev.filter((drop) => drop.id !== id));
      }, 1000);
    };

    // More frequent drops to match background rain (every 0.5-1.5 seconds)
    const interval = setInterval(addRainDrop, 500 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="group hover:-translate-y-1 transition-all duration-300">
      <ElectricBorder
        color="#10b981"
        speed={1}
        chaos={0.8}
        thickness={2}
        className="h-full"
        style={{ borderRadius: '1rem' }}
      >
        <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 h-full overflow-hidden">
          {/* Rain drops hitting the box */}
          {rainDrops.map((drop) => (
            <div key={drop.id} className="absolute top-0" style={{ left: `${drop.x}%` }}>
              {/* Water drop */}
              <div className="w-1 h-3 bg-emerald-400 rounded-full animate-drop-fall" />

              {/* Ripple effect on impact */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className="w-4 h-4 border-2 border-emerald-400/60 rounded-full animate-ripple" />
                <div className="w-4 h-4 border-2 border-emerald-400/40 rounded-full animate-ripple" style={{ animationDelay: '0.1s' }} />
                <div className="w-4 h-4 border-2 border-emerald-400/20 rounded-full animate-ripple" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-emerald-500/20">
              <span className="text-4xl">{icon}</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold text-white">
              {count}{suffix}
            </div>
            <div className="text-lg text-emerald-200/90 font-medium">{label}</div>
          </div>
        </div>
      </ElectricBorder>
    </div>
  );
}

export default function FeaturesSection() {
  const swapFunctionRef = useRef<(() => void) | null>(null);
  const pauseFunctionRef = useRef<(() => void) | null>(null);
  const resumeFunctionRef = useRef<(() => void) | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // Generate rain drops
  const rainDrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 1,
  }));

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
    <section id="features" className="pt-20 pb-32 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
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

      {/* Paint Splatter Effect - Deep Dark Green Blobs (Same Color for Overlap) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-900 blob-1 opacity-20"></div>
      <div className="absolute top-10 right-16 w-64 h-64 bg-emerald-900 blob-2 opacity-15"></div>
      <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-emerald-900 blob-3 opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-900 blob-4 opacity-18"></div>
      <div className="absolute top-1/2 left-1/3 w-68 h-68 bg-emerald-900 blob-5 opacity-15"></div>
      <div className="absolute top-40 right-1/3 w-60 h-60 bg-emerald-900 blob-1 opacity-18"></div>
      <div className="absolute bottom-40 left-1/2 w-64 h-64 bg-emerald-900 blob-2 opacity-20"></div>
      <div className="absolute top-60 left-20 w-56 h-56 bg-emerald-900 blob-3 opacity-15"></div>
      <div className="absolute bottom-60 right-1/4 w-68 h-68 bg-emerald-900 blob-4 opacity-18"></div>
      <div className="absolute top-1/3 right-10 w-60 h-60 bg-emerald-900 blob-5 opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-start mb-16">
          <h2 className=" text-5xl md:text-6xl mb-4 text-emerald-400" style={{ fontFamily: 'Bungee, sans-serif', letterSpacing: '0.02em' }}>
            Ada Fitur Apa Aja Sih?
          </h2>
        </div>

        {/* Decorative Line with Dot */}
        <div className="absolute left-0 top-110 right-1/2 z-0">

          {/* Line with Dot */}
          <div className="flex items-center">
            <div className="flex-1 h-0.5 bg-emerald-500" style={{ marginLeft: '-100vw' }}></div>
            <div className="relative">
              {/* Main dot */}
              <div className="w-8 h-4 rounded-full bg-emerald-500 relative z-10"></div>

              {/* Spotlight effect pointing to stats section */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible" style={{ width: '1px', height: '1px' }}>
                {/* Triangular spotlight beam - cone shape pointing downward to stats */}
                <div className="absolute spotlight-beam" style={{
                  width: '0',
                  height: '0',
                  borderLeft: '600px solid transparent',
                  borderRight: '600px solid transparent',
                  borderTop: '450px solid rgba(16, 185, 129, 0.12)',
                  filter: 'blur(80px)',
                  left: '50%',
                  top: '0px',
                  transform: 'translateX(-50%)',
                }}></div>

                {/* Second layer for depth */}
                <div className="absolute spotlight-beam" style={{
                  width: '0',
                  height: '0',
                  borderLeft: '500px solid transparent',
                  borderRight: '500px solid transparent',
                  borderTop: '400px solid rgba(16, 185, 129, 0.18)',
                  filter: 'blur(50px)',
                  left: '50%',
                  top: '0px',
                  transform: 'translateX(-50%)',
                  animationDelay: '0.5s',
                }}></div>

                {/* Inner cone - brightest */}
                <div className="absolute spotlight-beam" style={{
                  width: '0',
                  height: '0',
                  borderLeft: '350px solid transparent',
                  borderRight: '350px solid transparent',
                  borderTop: '350px solid rgba(16, 185, 129, 0.22)',
                  filter: 'blur(35px)',
                  left: '50%',
                  top: '0px',
                  transform: 'translateX(-50%)',
                  animationDelay: '1s',
                }}></div>

                {/* Pulsing glow from circles - light source */}
                <div className="absolute w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
                <div className="absolute w-20 h-20 bg-emerald-400/40 rounded-full blur-xl animate-pulse" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* CardSwap Implementation */}
        <div className="flex justify-end items-center min-h-[600px] pl-150 pt-10">
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
            {/* Feature 1: AI Campus Guide - Premium Design with Advanced Effects */}
            <Card className={`relative overflow-hidden ${activeCardIndex === 0 ? 'card-active' : ''}`}>
              {/* Gradient Background with Multiple Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Animated Gradient Orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl"></div>

              {/* Mesh Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

              {/* Glass Card Content */}
              <div className="relative p-8 flex flex-col justify-between h-full backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl shadow-2xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 rounded-2xl"></div>

                {/* Next Button - More Premium */}
                <button
                  className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-400/50 transition-all hover:scale-110 z-20 border border-white/40 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(0);
                  }}
                >
                  <svg className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative z-10">
                  {/* Icon Container - Premium Style */}
                  <div className="relative w-20 h-20 mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                      <span className="text-5xl drop-shadow-lg">💬</span>
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                    AI Campus Guide Chatbot
                  </h3>

                  <p className="text-white/95 mb-6 leading-relaxed text-base font-medium drop-shadow">
                    Tanya apa saja tentang kampus! Dari cara mengisi KRS, lokasi gedung, info dosen, hingga prosedur beasiswa. AI siap membantu 24/7.
                  </p>
                </div>

                {/* Tags with Better Design */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">KRS</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Info Gedung</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Beasiswa</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Info Dosen</span>
                </div>
              </div>
            </Card>

            {/* Feature 2: Event Recommender - Premium Design with Target Pattern */}
            <Card className={`relative overflow-hidden ${activeCardIndex === 1 ? 'card-active' : ''}`}>
              {/* Gradient Background - Same as Card 1 */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Animated Target Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-white/15 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/20 rounded-full"></div>

              {/* Glowing Orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

              {/* Dot Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>

              {/* Glass Card Content */}
              <div className="relative p-8 flex flex-col justify-between h-full backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl shadow-2xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 rounded-2xl"></div>

                {/* Next Button */}
                <button
                  className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-400/50 transition-all hover:scale-110 z-20 border border-white/40 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(1);
                  }}
                >
                  <svg className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                      <span className="text-5xl drop-shadow-lg">🎯</span>
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                    Event Recommender
                  </h3>

                  <p className="text-white/95 mb-6 leading-relaxed text-base font-medium drop-shadow">
                    Dapatkan rekomendasi kegiatan yang sesuai dengan minatmu! Seminar, lomba, UKM, volunteering - semua disesuaikan untukmu.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Seminar</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Lomba</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">UKM</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Volunteering</span>
                </div>
              </div>
            </Card>

            {/* Feature 3: Smart Schedule Builder - Premium Design with Grid Pattern */}
            <Card className={`relative overflow-hidden ${activeCardIndex === 2 ? 'card-active' : ''}`}>
              {/* Gradient Background - Same as Card 1 */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Animated Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              </div>

              {/* Glowing Orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

              {/* Diagonal Lines Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

              {/* Glass Card Content */}
              <div className="relative p-8 flex flex-col justify-between h-full backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl shadow-2xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 rounded-2xl"></div>

                {/* Next Button */}
                <button
                  className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-400/50 transition-all hover:scale-110 z-20 border border-white/40 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(2);
                  }}
                >
                  <svg className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                      <span className="text-5xl drop-shadow-lg">📅</span>
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                    Smart Schedule Builder
                  </h3>

                  <p className="text-white/95 mb-6 leading-relaxed text-base font-medium drop-shadow">
                    AI bantu atur jadwal kuliah dan kegiatanmu agar seimbang. Tidak ada lagi bentrok jadwal atau overload kegiatan!
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Auto Arrange</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Conflict Free</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Work-Life Balance</span>
                </div>
              </div>
            </Card>

            {/* Feature 4: Peer Connect AI - Premium Design with Network Pattern */}
            <Card className={`relative overflow-hidden ${activeCardIndex === 3 ? 'card-active' : ''}`}>
              {/* Gradient Background - Same as Card 1 */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Animated Network Nodes with Connecting Lines */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-white/60 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute top-16 right-12 w-3 h-3 bg-white/60 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-20 left-16 w-3 h-3 bg-white/60 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
              <div className="absolute bottom-12 right-20 w-3 h-3 bg-white/60 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/40 rounded-full"></div>

              {/* Connection Lines */}
              <div className="absolute top-8 left-8 w-32 h-px bg-gradient-to-r from-white/30 to-transparent rotate-45 origin-left"></div>
              <div className="absolute bottom-12 right-20 w-28 h-px bg-gradient-to-l from-white/30 to-transparent -rotate-45 origin-right"></div>

              {/* Glowing Orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

              {/* Hexagon Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>

              {/* Glass Card Content */}
              <div className="relative p-8 flex flex-col justify-between h-full backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl shadow-2xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 rounded-2xl"></div>

                {/* Next Button */}
                <button
                  className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-400/50 transition-all hover:scale-110 z-20 border border-white/40 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(3);
                  }}
                >
                  <svg className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                      <span className="text-5xl drop-shadow-lg">🤝</span>
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                    Peer Connect AI
                  </h3>

                  <p className="text-white/95 mb-6 leading-relaxed text-base font-medium drop-shadow">
                    Temukan teman atau mentor dengan minat yang sama! AI mencocokkan kamu dengan orang-orang yang tepat untuk berkembang bersama.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Find Friends</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Mentorship</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-white/25 to-white/10 text-white rounded-full text-xs font-semibold border border-white/30 backdrop-blur-md shadow-lg hover:shadow-emerald-400/50 transition-all hover:scale-105">Study Group</span>
                </div>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto relative z-10 mt-20 px-6">
        <div className="grid md:grid-cols-4 gap-6">
          <StatItem end={1000} label="Mahasiswa Aktif" suffix="+" icon="👥" />
          <StatItem end={50} label="Event per Bulan" suffix="+" icon="📅" />
          <StatItem end={95} label="Kepuasan Pengguna" suffix="%" icon="⭐" />
          <StatItem end={24} label="AI Support" suffix="/7" icon="🤖" />
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

        @keyframes drop-fall {
          0% {
            transform: translateY(-20px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes spotlight-sweep {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        :global(.animate-drop-fall) {
          animation: drop-fall 0.3s ease-out forwards;
        }

        :global(.animate-ripple) {
          animation: ripple 0.6s ease-out forwards;
        }

        :global(.spotlight-beam) {
          animation: spotlight-sweep 3s ease-in-out infinite;
        }

        .blob-1 {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(40px);
        }
        .blob-2 {
          border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          filter: blur(40px);
        }
        .blob-3 {
          border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
          filter: blur(40px);
        }
        .blob-4 {
          border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%;
          filter: blur(40px);
        }
        .blob-5 {
          border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          filter: blur(40px);
        }
      `}</style>
    </section>
  );
}
