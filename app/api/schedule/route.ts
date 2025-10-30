import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface ScheduleItem {
  id?: string;
  type: 'kuliah' | 'kegiatan';
  name: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  duration?: number; // dalam menit untuk kegiatan fleksibel
  priority?: 'tinggi' | 'sedang' | 'rendah';
  isFlexible?: boolean; // bisa dipindah-pindah waktunya atau tidak
  description?: string;
}

interface ScheduleRequest {
  courses: ScheduleItem[]; // Jadwal kuliah yang sudah fixed
  activities: ScheduleItem[]; // Kegiatan yang ingin dijadwalkan
  preferences?: {
    wakeUpTime?: string;
    sleepTime?: string;
    breakDuration?: number;
    studySessionDuration?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: ScheduleRequest = await request.json();
    const { courses, activities, preferences } = data;

    if (!courses || !activities) {
      return NextResponse.json(
        { error: 'Courses and activities are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-thinking-exp-1219'
    });

    const prompt = `Kamu adalah AI Smart Schedule Builder untuk mahasiswa.

DATA YANG DITERIMA:

JADWAL KULIAH (Fixed - tidak bisa diubah):
${JSON.stringify(courses, null, 2)}

KEGIATAN YANG INGIN DIJADWALKAN:
${JSON.stringify(activities, null, 2)}

PREFERENSI MAHASISWA:
${JSON.stringify(preferences || {
  wakeUpTime: '06:00',
  sleepTime: '23:00',
  breakDuration: 60,
  studySessionDuration: 120
}, null, 2)}

TUGASMU:
1. Analisis jadwal kuliah yang sudah ada
2. Cari waktu kosong (gap) di antara jadwal kuliah
3. Atur kegiatan yang diminta di waktu-waktu yang optimal
4. Pertimbangkan:
   - Jangan jadwalkan kegiatan berat setelah jam kuliah padat
   - Beri waktu istirahat/makan antar kegiatan (min 30 menit)
   - Prioritaskan kegiatan berdasarkan priority (tinggi > sedang > rendah)
   - Balance antara belajar, kegiatan organisasi, dan istirahat
   - Hindari overload dalam satu hari
   - Sisakan waktu untuk istirahat malam yang cukup

5. Berikan rekomendasi jadwal LENGKAP untuk seminggu (Senin-Minggu)
6. Tambahkan TIPS untuk produktivitas

FORMAT RESPONSE (JSON yang valid):
{
  "optimizedSchedule": {
    "Senin": [
      {
        "time": "06:00-07:00",
        "activity": "Bangun & Persiapan Pagi",
        "type": "routine",
        "description": "Mandi, sarapan, siap-siap",
        "color": "gray"
      },
      {
        "time": "07:30-09:30",
        "activity": "Nama Kuliah",
        "type": "kuliah",
        "location": "Gedung X",
        "description": "Deskripsi kuliah",
        "color": "blue"
      },
      {
        "time": "10:00-12:00",
        "activity": "Belajar Mandiri",
        "type": "kegiatan",
        "description": "Fokus pada materi kuliah pagi",
        "color": "green"
      }
    ],
    "Selasa": [...],
    ...
  },
  "analysis": {
    "totalKuliah": number,
    "totalKegiatan": number,
    "avgStudyHoursPerDay": number,
    "avgFreeHoursPerDay": number,
    "workLoadBalance": "Seimbang/Terlalu Padat/Cukup Longgar"
  },
  "recommendations": [
    "Rekomendasi 1 dari AI",
    "Rekomendasi 2 dari AI",
    "Rekomendasi 3 dari AI"
  ],
  "tips": [
    "Tip produktivitas 1",
    "Tip produktivitas 2",
    "Tip produktivitas 3"
  ],
  "warnings": [
    "Peringatan jika ada konflik atau overload"
  ]
}

PENTING:
- Response HARUS dalam format JSON yang valid
- Jadwalkan SEMUA kegiatan yang diminta user
- Jika ada kegiatan yang tidak bisa dijadwalkan, masukkan ke warnings
- Buat jadwal yang REALISTIS dan SEIMBANG
- Include waktu untuk makan, istirahat, dan tidur yang cukup`;

    console.log('Generating schedule with AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean JSON response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let scheduleData;
    try {
      scheduleData = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      return NextResponse.json(
        {
          error: 'Failed to generate valid schedule',
          details: 'AI response was not in valid JSON format',
          rawResponse: text.substring(0, 500) // First 500 chars for debugging
        },
        { status: 500 }
      );
    }

    return NextResponse.json(scheduleData);

  } catch (error: any) {
    console.error('Error in schedule API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
