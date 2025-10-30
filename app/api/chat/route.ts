import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    const { message, history } = await request.json();
    console.log('Message received:', message);

    if (!message) {
      console.error('No message provided');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('API key not found in environment');
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    console.log('API key found, initializing Gemini...');

    // Get the Gemini model - Using gemini-2.0-flash-thinking-exp (latest & most powerful)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-thinking-exp-1219'
    });

    // System prompt untuk konteks kampus
    const systemPrompt = `Kamu adalah AI Campus Navigator, asisten virtual untuk mahasiswa kampus di Indonesia.
Tugasmu adalah membantu mahasiswa dengan:
- Informasi tentang KRS (Kartu Rencana Studi)
- Lokasi gedung dan fasilitas kampus
- Informasi tentang dosen dan mata kuliah
- Prosedur beasiswa dan bantuan finansial
- Event kampus dan kegiatan mahasiswa
- Tips kehidupan kampus
- Informasi UKM (Unit Kegiatan Mahasiswa)
- Jadwal akademik

Jawab dengan ramah, informatif, dan dalam bahasa Indonesia yang santai tapi profesional.
Jika ada pertanyaan di luar konteks kampus, arahkan kembali ke topik kampus dengan sopan.`;

    // Build conversation history
    const chatHistory = (history || [])
      .filter((msg: any) => msg.role !== 'assistant' || msg.content !== 'Halo! Saya AI Campus Navigator. Ada yang bisa saya bantu tentang kampus?')
      .slice(-10) // Only keep last 10 messages for context
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send message with system prompt context
    const result = await chat.sendMessage(
      chatHistory.length === 0
        ? `${systemPrompt}\n\nUser: ${message}`
        : message
    );

    const response = await result.response;
    const text = response.text();

    console.log('Response generated successfully');
    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    console.error('Error details:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
