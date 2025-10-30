import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Fungsi untuk fetch event data dari berbagai sumber
async function fetchEventsFromWeb() {
  try {
    // Simulasi data event - dalam production bisa diganti dengan web scraping atau API
    // Bisa scrape dari: uns.ac.id, eventcampus.id, atau platform lainnya
    const mockEvents = [
      {
        id: 1,
        title: 'Workshop Machine Learning untuk Pemula',
        category: 'Seminar',
        organizer: 'Himpunan Mahasiswa Informatika UNS',
        date: '2025-11-05',
        location: 'Gedung Informatika Lt. 3',
        description: 'Workshop intensif tentang dasar-dasar Machine Learning dengan TensorFlow',
        tags: ['teknologi', 'AI', 'programming'],
        registrationLink: 'https://bit.ly/ml-workshop-uns',
        quota: 50,
        fee: 'Gratis'
      },
      {
        id: 2,
        title: 'Lomba Business Plan Nasional 2025',
        category: 'Lomba',
        organizer: 'BEM FEB UNS',
        date: '2025-11-15',
        location: 'Online',
        description: 'Kompetisi business plan tingkat nasional dengan total hadiah 25 juta',
        tags: ['bisnis', 'entrepreneurship', 'kompetisi'],
        registrationLink: 'https://bit.ly/bizplan-uns',
        quota: 100,
        fee: 'Rp 150.000/tim'
      },
      {
        id: 3,
        title: 'Rekrutmen UKM Robotika',
        category: 'UKM',
        organizer: 'UKM Robotika UNS',
        date: '2025-11-01',
        location: 'Lab Robotika Gedung Teknik',
        description: 'Pendaftaran anggota baru UKM Robotika periode 2025/2026',
        tags: ['robotika', 'teknologi', 'organisasi'],
        registrationLink: 'https://bit.ly/ukm-robotika',
        quota: 30,
        fee: 'Gratis'
      },
      {
        id: 4,
        title: 'Volunteer Teaching di Desa Binaan',
        category: 'Volunteering',
        organizer: 'KKN Tematik UNS',
        date: '2025-11-10',
        location: 'Desa Sukamaju, Karanganyar',
        description: 'Program mengajar anak-anak di desa binaan UNS',
        tags: ['sosial', 'pendidikan', 'volunteer'],
        registrationLink: 'https://bit.ly/volunteer-uns',
        quota: 20,
        fee: 'Gratis'
      },
      {
        id: 5,
        title: 'Seminar Nasional: Inovasi Teknologi Hijau',
        category: 'Seminar',
        organizer: 'Fakultas Pertanian UNS',
        date: '2025-11-20',
        location: 'Auditorium Utama UNS',
        description: 'Seminar tentang teknologi ramah lingkungan dan sustainable agriculture',
        tags: ['lingkungan', 'teknologi', 'pertanian'],
        registrationLink: 'https://bit.ly/greentech-seminar',
        quota: 200,
        fee: 'Rp 50.000'
      },
      {
        id: 6,
        title: 'Hackathon Smart Campus 2025',
        category: 'Lomba',
        organizer: 'HMIF & IEEE UNS',
        date: '2025-12-01',
        location: 'Lab Komputer Gedung Informatika',
        description: '24 jam non-stop coding competition untuk solusi smart campus',
        tags: ['teknologi', 'programming', 'kompetisi', 'AI'],
        registrationLink: 'https://bit.ly/hackathon-uns',
        quota: 60,
        fee: 'Rp 100.000/tim'
      },
      {
        id: 7,
        title: 'Pelatihan Public Speaking & Leadership',
        category: 'Seminar',
        organizer: 'BEM Universitas UNS',
        date: '2025-11-08',
        location: 'Student Center UNS',
        description: 'Workshop meningkatkan kemampuan berbicara di depan umum dan kepemimpinan',
        tags: ['soft-skill', 'leadership', 'komunikasi'],
        registrationLink: 'https://bit.ly/public-speaking-uns',
        quota: 80,
        fee: 'Gratis'
      },
      {
        id: 8,
        title: 'Bakti Sosial & Donor Darah',
        category: 'Volunteering',
        organizer: 'PMI & KSR UNS',
        date: '2025-11-03',
        location: 'Lapangan Parkir UNS',
        description: 'Kegiatan donor darah dan bakti sosial untuk masyarakat sekitar kampus',
        tags: ['sosial', 'kesehatan', 'volunteer'],
        registrationLink: 'https://bit.ly/donor-darah-uns',
        quota: 150,
        fee: 'Gratis'
      },
      {
        id: 9,
        title: 'Rekrutmen UKM Teater Kampus',
        category: 'UKM',
        organizer: 'UKM Teater Sakata UNS',
        date: '2025-11-02',
        location: 'Gedung Kesenian UNS',
        description: 'Open recruitment untuk anggota baru yang tertarik seni teater',
        tags: ['seni', 'teater', 'organisasi', 'kreatif'],
        registrationLink: 'https://bit.ly/teater-uns',
        quota: 25,
        fee: 'Gratis'
      },
      {
        id: 10,
        title: 'Lomba Karya Tulis Ilmiah Nasional',
        category: 'Lomba',
        organizer: 'FMIPA UNS',
        date: '2025-11-25',
        location: 'Online',
        description: 'Kompetisi penulisan karya ilmiah dengan tema Sains & Teknologi',
        tags: ['akademik', 'penelitian', 'kompetisi'],
        registrationLink: 'https://bit.ly/kti-nasional',
        quota: 200,
        fee: 'Rp 75.000/tim'
      }
    ];

    return mockEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { interests } = await request.json();

    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return NextResponse.json(
        { error: 'Interests array is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Fetch events from web/database
    const allEvents = await fetchEventsFromWeb();

    if (allEvents.length === 0) {
      return NextResponse.json(
        { error: 'No events available at the moment' },
        { status: 404 }
      );
    }

    // Use Gemini AI to analyze and recommend events based on user interests
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-thinking-exp-1219'
    });

    const prompt = `Kamu adalah AI Event Recommender untuk kampus UNS.

User memiliki minat di: ${interests.join(', ')}

Berikut adalah daftar event yang tersedia:
${JSON.stringify(allEvents, null, 2)}

Tugasmu:
1. Analisis minat user dan cocokkan dengan event yang tersedia
2. Rekomendasikan 5-7 event yang PALING SESUAI dengan minat user
3. Urutkan dari yang paling relevan ke yang kurang relevan
4. Berikan penjelasan singkat (1-2 kalimat) kenapa event ini cocok untuk user

Format response dalam JSON:
{
  "recommendations": [
    {
      "eventId": number,
      "relevanceScore": number (1-100),
      "reason": "string (kenapa event ini cocok)"
    }
  ],
  "summary": "string (ringkasan rekomendasi dalam 2-3 kalimat)"
}

PENTING: Response harus dalam format JSON yang valid!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean JSON response (remove markdown code blocks if any)
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let aiRecommendations;
    try {
      aiRecommendations = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      // Fallback: simple filtering based on tags
      const filteredEvents = allEvents
        .filter(event =>
          event.tags.some(tag =>
            interests.some(interest =>
              tag.toLowerCase().includes(interest.toLowerCase()) ||
              interest.toLowerCase().includes(tag.toLowerCase())
            )
          )
        )
        .slice(0, 5);

      return NextResponse.json({
        recommendations: filteredEvents,
        summary: `Menemukan ${filteredEvents.length} event yang sesuai dengan minat Anda.`
      });
    }

    // Map recommendations with full event data
    const recommendedEvents = aiRecommendations.recommendations
      .map((rec: any) => {
        const event = allEvents.find(e => e.id === rec.eventId);
        if (!event) return null;
        return {
          ...event,
          relevanceScore: rec.relevanceScore,
          recommendationReason: rec.reason
        };
      })
      .filter((e: any) => e !== null);

    return NextResponse.json({
      recommendations: recommendedEvents,
      summary: aiRecommendations.summary,
      totalEvents: allEvents.length,
      matchedEvents: recommendedEvents.length
    });

  } catch (error: any) {
    console.error('Error in events API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

// GET endpoint untuk mendapatkan semua event
export async function GET() {
  try {
    const events = await fetchEventsFromWeb();
    return NextResponse.json({
      events,
      total: events.length
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
