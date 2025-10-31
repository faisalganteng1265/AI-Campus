'use client';

import { useEffect, useState, useRef } from 'react';
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

    const duration = 2000; // 2 seconds
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
        <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 h-full">
          {/* Decorative glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10 text-center space-y-4">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-emerald-500/20">
              <span className="text-4xl">{icon}</span>
            </div>

            {/* Counter */}
            <div className="text-5xl md:text-6xl font-bold text-white">
              {count}{suffix}
            </div>

            {/* Label */}
            <div className="text-lg text-emerald-200/90 font-medium">{label}</div>
          </div>
        </div>
      </ElectricBorder>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Paint Splatter Effect - Same as FeaturesSection */}
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
        <div className="grid md:grid-cols-4 gap-6">
          <StatItem end={1000} label="Mahasiswa Aktif" suffix="+" icon="👥" />
          <StatItem end={50} label="Event per Bulan" suffix="+" icon="📅" />
          <StatItem end={95} label="Kepuasan Pengguna" suffix="%" icon="⭐" />
          <StatItem end={24} label="AI Support" suffix="/7" icon="🤖" />
        </div>
      </div>

      <style jsx>{`
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
