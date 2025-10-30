'use client';

import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  category: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  registrationLink: string;
  quota: number;
  fee: string;
  relevanceScore?: number;
  recommendationReason?: string;
}

interface RecommendationResponse {
  recommendations: Event[];
  summary: string;
  totalEvents?: number;
  matchedEvents?: number;
}

const interestOptions = [
  { value: 'teknologi', label: 'Teknologi & IT', icon: '💻' },
  { value: 'bisnis', label: 'Bisnis & Entrepreneurship', icon: '💼' },
  { value: 'seni', label: 'Seni & Kreatif', icon: '🎨' },
  { value: 'sosial', label: 'Sosial & Volunteering', icon: '🤝' },
  { value: 'akademik', label: 'Akademik & Penelitian', icon: '📚' },
  { value: 'olahraga', label: 'Olahraga & Kesehatan', icon: '⚽' },
  { value: 'leadership', label: 'Leadership & Organisasi', icon: '👑' },
  { value: 'lingkungan', label: 'Lingkungan & Sustainability', icon: '🌱' },
];

const categoryColors: { [key: string]: string } = {
  'Seminar': 'bg-blue-500',
  'Lomba': 'bg-purple-500',
  'UKM': 'bg-green-500',
  'Volunteering': 'bg-orange-500',
};

export default function EventRecommender() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Event[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const getRecommendations = async () => {
    if (selectedInterests.length === 0) {
      alert('Pilih minimal 1 minat!');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interests: selectedInterests,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data: RecommendationResponse = await response.json();
      setRecommendations(data.recommendations);
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold text-white mb-2">Event Recommender</h1>
            <p className="text-purple-100 text-lg">
              Temukan event kampus yang sesuai dengan minatmu!
            </p>
          </div>

          {/* Interest Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>✨</span>
              Pilih Minat Kamu (bisa lebih dari 1):
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {interestOptions.map((interest) => (
                <button
                  key={interest.value}
                  onClick={() => toggleInterest(interest.value)}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all border-2 ${
                    selectedInterests.includes(interest.value)
                      ? 'bg-white text-purple-600 border-white shadow-lg scale-105'
                      : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  <span className="text-2xl">{interest.icon}</span>
                  <span className="text-sm font-medium">{interest.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={getRecommendations}
              disabled={isLoading || selectedInterests.length === 0}
              className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Mencari Event Terbaik...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Cari Event Rekomendasi</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">AI sedang menganalisis event yang cocok untukmu...</p>
          </div>
        )}

        {!isLoading && hasSearched && recommendations.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-2xl">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-white mb-2">Tidak Ada Event yang Cocok</h3>
            <p className="text-gray-400">Coba pilih minat yang berbeda atau tunggu event baru!</p>
          </div>
        )}

        {!isLoading && recommendations.length > 0 && (
          <>
            {/* Summary */}
            {summary && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">🤖</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Rekomendasi AI:</h3>
                    <p className="text-gray-300">{summary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Event Cards */}
            <div className="space-y-4">
              {recommendations.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">#{index + 1}</span>
                        <span className={`${categoryColors[event.category] || 'bg-gray-500'} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {event.category}
                        </span>
                        {event.relevanceScore && (
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {event.relevanceScore}% Match
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">📅 {formatDate(event.date)} • 📍 {event.location}</p>
                    </div>
                  </div>

                  {event.recommendationReason && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
                      <p className="text-purple-200 text-sm">
                        <span className="font-semibold">💡 Kenapa cocok untuk kamu: </span>
                        {event.recommendationReason}
                      </p>
                    </div>
                  )}

                  <p className="text-gray-300 mb-4">{event.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <div className="flex gap-6 text-sm text-gray-400">
                      <div>
                        <span className="font-semibold">Penyelenggara:</span> {event.organizer}
                      </div>
                      <div>
                        <span className="font-semibold">Kuota:</span> {event.quota} orang
                      </div>
                      <div>
                        <span className="font-semibold">Biaya:</span> {event.fee}
                      </div>
                    </div>
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <span>Daftar Sekarang</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-2">Pilih Minatmu di Atas</h3>
            <p className="text-gray-400">AI akan merekomendasikan event yang paling sesuai untukmu!</p>
          </div>
        )}
      </div>
    </div>
  );
}
