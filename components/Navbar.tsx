'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set threshold sekitar 50px dari top untuk transisi lebih cepat
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 overflow-visible">
      <div className={`transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'max-w-7xl mx-auto px-6 py-4'
          : 'w-full px-8 py-6'
      }`}>
        <div
          className={`relative transition-all duration-700 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl px-6 py-3 shadow-emerald-500/10'
              : 'bg-transparent'
          }`}
          style={{
            transform: isScrolled ? 'translateY(0) scale(1)' : 'translateY(0) scale(1)',
            transformOrigin: 'center top',
          }}
        >
          {/* Animated Border Gradient */}
          {isScrolled && (
            <>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl opacity-20 blur-sm animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent rounded-2xl"></div>
            </>
          )}

          <div className="flex items-center justify-between relative z-10">
            {/* Logo Section with Slide Animation */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ease-out ${
                isScrolled
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-0 opacity-100'
              }`}
              style={{
                transitionDelay: isScrolled ? '150ms' : '0ms'
              }}
            >
              <div className={`relative transition-all duration-700 ease-out ${
                isScrolled
                  ? 'w-10 h-10'
                  : 'w-12 h-12'
              } bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg overflow-hidden`}>
                {/* Spinning Gradient Background on Logo */}
                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 transition-opacity duration-700 ${
                  isScrolled ? 'opacity-20 animate-spin-slow' : ''
                }`}></div>
                <span className={`relative z-10 text-emerald-500 font-bold transition-all duration-500 ${
                  isScrolled ? 'text-xl' : 'text-xl'
                }`}>AI</span>
              </div>
              <div className={`transition-all duration-700 ease-out transform ${
                isScrolled
                  ? 'text-gray-900 translate-y-0 opacity-100'
                  : 'text-white translate-y-0 opacity-100'
              }`}
              style={{
                transitionDelay: isScrolled ? '200ms' : '0ms'
              }}>
                <div className="font-bold text-lg leading-tight">CAMPUS</div>
                <div className="text-sm font-medium leading-tight">NAVIGATOR</div>
              </div>
            </div>

            {/* Menu Items with Staggered Animation */}
            <div className="hidden md:flex gap-8 items-center">
              <a
                href="#features"
                className={`font-medium transition-all duration-700 ease-out transform ${
                  isScrolled
                    ? 'text-gray-700 hover:text-emerald-500 translate-y-0 opacity-100'
                    : 'text-white/90 hover:text-emerald-400 translate-y-0 opacity-100'
                } hover:-translate-y-0.5 hover:scale-105`}
                style={{
                  transitionDelay: isScrolled ? '250ms' : '0ms'
                }}
              >
                Fitur
              </a>
              <a
                href="#how-it-works"
                className={`font-medium transition-all duration-700 ease-out transform ${
                  isScrolled
                    ? 'text-gray-700 hover:text-emerald-500 translate-y-0 opacity-100'
                    : 'text-white/90 hover:text-emerald-400 translate-y-0 opacity-100'
                } hover:-translate-y-0.5 hover:scale-105`}
                style={{
                  transitionDelay: isScrolled ? '300ms' : '0ms'
                }}
              >
                Cara Kerja
              </a>
              <a
                href="#about"
                className={`font-medium transition-all duration-700 ease-out transform ${
                  isScrolled
                    ? 'text-gray-700 hover:text-emerald-500 translate-y-0 opacity-100'
                    : 'text-white/90 hover:text-emerald-400 translate-y-0 opacity-100'
                } hover:-translate-y-0.5 hover:scale-105`}
                style={{
                  transitionDelay: isScrolled ? '350ms' : '0ms'
                }}
              >
                Tentang
              </a>
              <button
                className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-700 ease-out transform overflow-hidden group ${
                  isScrolled
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 translate-y-0 opacity-100 hover:shadow-emerald-500/50'
                    : 'border-2 border-emerald-400 text-emerald-400 translate-y-0 opacity-100'
                } hover:scale-110`}
                style={{
                  transitionDelay: isScrolled ? '400ms' : '0ms'
                }}
              >
                {/* Animated Gradient Overlay on Hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Mulai Sekarang</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <svg
                className={`w-6 h-6 transition-all duration-500 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </nav>
  );
}
