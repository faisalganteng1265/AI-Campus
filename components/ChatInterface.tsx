'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickQuestion {
  icon: string;
  question: string;
  category: string;
}

const quickQuestions: QuickQuestion[] = [
  { icon: '📚', question: 'Bagaimana cara mengisi KRS di UNS?', category: 'KRS' },
  { icon: '🏛️', question: 'Di mana lokasi perpustakaan pusat?', category: 'Gedung' },
  { icon: '👨‍🏫', question: 'Bagaimana cara mencari info dosen?', category: 'Dosen' },
  { icon: '💰', question: 'Beasiswa apa saja yang tersedia di UNS?', category: 'Beasiswa' },
  { icon: '📅', question: 'Kapan jadwal UTS dan UAS?', category: 'Akademik' },
  { icon: '🎯', question: 'UKM apa saja yang ada di UNS?', category: 'UKM' },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya AI Campus Navigator UNS. Saya siap membantu menjawab pertanyaan seputar kampus. Silakan pilih pertanyaan cepat di bawah atau ketik pertanyaan Anda sendiri!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (question?: string) => {
    const messageText = question || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Maaf, terjadi kesalahan: ${error.message}. Silakan coba lagi.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSubmit(question);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">🤖</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Campus Guide Chatbot</h1>
              <p className="text-emerald-100">Asisten virtual UNS - Siap membantu 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-800">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    : 'bg-gray-700'
                }`}>
                  <span className="text-xl">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </span>
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-5 py-3 shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <p className={`text-xs mt-1 px-2 ${
                    message.role === 'user' ? 'text-emerald-300' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Questions */}
          {showQuickQuestions && messages.length === 1 && (
            <div className="bg-gray-700/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-600">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>⚡</span>
                Pertanyaan Cepat:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(item.question)}
                    className="flex items-start gap-3 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl transition-all text-left group border border-gray-600 hover:border-emerald-500"
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {item.question}
                      </p>
                      <span className="text-xs text-emerald-400 mt-1 inline-block">
                        {item.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="bg-gray-700 text-gray-100 rounded-2xl px-5 py-3">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 border-t border-gray-700 p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan tentang kampus..."
              className="flex-1 bg-gray-800 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 border border-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full px-8 py-4 font-medium hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>

          {/* Helper Text */}
          <p className="text-gray-500 text-xs mt-3 text-center">
            💡 Tips: Tanya tentang KRS, gedung, dosen, beasiswa, atau kehidupan kampus
          </p>
        </div>
      </div>
    </div>
  );
}
