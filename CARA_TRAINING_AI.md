# Cara "Training" AI Chatbot dengan Data Kampus

AI Gemini tidak perlu "training" dalam artian machine learning tradisional. Yang kita lakukan adalah memberikan **konteks** melalui **System Prompt**.

## 📝 Apa itu System Prompt?

System Prompt adalah instruksi dan data yang diberikan ke AI setiap kali ada percakapan. Ini seperti "briefing" kepada AI tentang siapa dia dan apa yang harus dia lakukan.

File: `app/api/chat/route.ts` baris 37-88

## 🎯 Cara Menambah Data Kampus

### 1. Edit System Prompt

Buka file [app/api/chat/route.ts](app/api/chat/route.ts) dan cari bagian `systemPrompt`.

### 2. Tambahkan Informasi Spesifik

Contoh struktur yang bisa ditambahkan:

```typescript
const systemPrompt = `Kamu adalah AI Campus Navigator untuk [NAMA KAMPUS].

INFORMASI KAMPUS:

📚 KRS (Kartu Rencana Studi):
- Jadwal pembukaan: [kapan KRS dibuka]
- Website: [link SIAKAD kampus]
- Batas SKS maksimal: [berapa SKS]
- Batas SKS minimal: [berapa SKS]
- Cara mengisi KRS:
  1. Login ke [nama sistem]
  2. Pilih menu KRS
  3. [step by step detail]

📍 Lokasi Gedung:
- Gedung A: Fakultas Teknik (Lantai 1-5)
  - Ruang Lab: Lantai 2
  - Ruang Dosen: Lantai 3
- Gedung B: Fakultas Ekonomi (Lantai 1-4)
- Perpustakaan: Gedung C (Buka 08.00-20.00)

👨‍🏫 Daftar Dosen:
- Prof. Ahmad (ahmad@kampus.ac.id): Pemrograman Web, Database
- Dr. Budi (budi@kampus.ac.id): Algoritma, Struktur Data
- [tambahkan dosen lain]

💰 Beasiswa:
- Beasiswa A: Syarat IPK >= 3.5, KTM aktif
- Beasiswa B: Untuk mahasiswa berprestasi
- Cara daftar:
  1. [step by step]

🎯 UKM:
- UKM IT: Pertemuan Jumat 16.00 di Lab Komputer
- UKM Seni: Pertemuan Kamis 15.00 di Aula
- [tambahkan UKM lain]

📅 Kalender Akademik 2025:
- Semester Ganjil: September 2025 - Januari 2026
- KRS: 1-15 September 2025
- Perkuliahan: 16 September - 15 Desember 2025
- UTS: 28 Oktober - 2 November 2025
- UAS: 16-21 Desember 2025

🏫 Fasilitas:
- Wifi: [nama wifi] password [jika ada]
- Kantin: [lokasi dan jam buka]
- Fotocopy: [lokasi]
- ATM: [lokasi]

📞 Kontak Penting:
- Akademik: [nomor telepon]
- Kemahasiswaan: [nomor telepon]
- Biro Administrasi: [nomor telepon]

Tugasmu:
- Jawab pertanyaan dengan informasi di atas
- Berikan panduan step-by-step
- Gunakan bahasa ramah dan santai
- Jika tidak tahu, arahkan ke website/kontak yang tepat
`;
```

## 💡 Tips Menambah Data

### ✅ Data yang Bagus untuk Ditambahkan:

1. **Prosedur/SOP yang sering ditanya:**
   - Cara mengisi KRS
   - Cara daftar beasiswa
   - Cara mengurus surat keterangan
   - Cara mengajukan cuti akademik

2. **Informasi Lokasi:**
   - Gedung dan ruangan spesifik
   - Jam operasional fasilitas
   - Petunjuk arah (dari gerbang ke gedung X)

3. **Kontak Penting:**
   - Email fakultas
   - Nomor telepon bagian akademik
   - Jam pelayanan

4. **FAQ (Frequently Asked Questions):**
   - "Kalau lupa password SIAKAD gimana?"
   - "Syarat wisuda apa aja?"
   - "Cara print KHS dimana?"

### ❌ Hindari:

1. **Data yang sering berubah:**
   - Jadwal kuliah per semester (terlalu detail)
   - Harga kantin (bisa berubah)
   - Event temporary

2. **Data sensitif:**
   - Password sistem
   - Data pribadi mahasiswa/dosen
   - Informasi rahasia kampus

3. **Data yang terlalu umum:**
   - Informasi yang sudah diketahui semua orang
   - Copy-paste dari Wikipedia

## 🔄 Cara Update Data

### Langkah-langkah:

1. **Edit file route.ts**
   ```bash
   # Buka file
   code app/api/chat/route.ts
   ```

2. **Ubah bagian systemPrompt** (baris 37-88)

3. **Save file** (Ctrl+S)

4. **Refresh browser**
   - Tidak perlu restart server
   - Cukup refresh halaman

5. **Test chatbot**
   - Tanya sesuatu yang berhubungan dengan data baru
   - Pastikan AI menjawab dengan benar

## 📊 Contoh Data dari Database (Advanced)

Jika kamu punya database kampus, kamu bisa load data secara dinamis:

```typescript
// Contoh mengambil data dosen dari database
async function getDosenData() {
  const dosens = await db.query('SELECT * FROM dosen');
  return dosens.map(d => `- ${d.nama} (${d.email}): ${d.matkul}`).join('\n');
}

export async function POST(request: NextRequest) {
  try {
    // ... kode lainnya ...

    // Load data dinamis
    const dosenList = await getDosenData();

    const systemPrompt = `...

👨‍🏫 Daftar Dosen:
${dosenList}

    ...`;

    // ... lanjutan kode ...
  }
}
```

## 🎨 Mengatur Tone AI

Kamu juga bisa mengatur gaya bahasa AI:

### Formal:
```typescript
Tugasmu:
- Jawab dengan bahasa formal dan profesional
- Gunakan sapaan "Anda" bukan "kamu"
- Selalu awali dengan salam
```

### Santai/Friendly:
```typescript
Tugasmu:
- Jawab dengan bahasa santai dan ramah
- Gunakan emoji kalau perlu 😊
- Seperti ngobrol dengan teman
```

### Informatif:
```typescript
Tugasmu:
- Berikan jawaban yang detail dan terstruktur
- Gunakan bullet points
- Sertakan langkah-langkah jika diperlukan
```

## 📝 Template Lengkap

Saya sudah sediakan template lengkap di file ini yang bisa kamu copy-paste dan sesuaikan dengan kampus kamu.

File: [app/api/chat/route.ts](app/api/chat/route.ts)

## 🧪 Testing & Iterasi

1. **Test dengan pertanyaan nyata** yang sering ditanya mahasiswa
2. **Catat jawaban yang kurang tepat**
3. **Tambahkan info yang kurang** di system prompt
4. **Test lagi sampai puas**

## 🚀 Pro Tips

### 1. Gunakan Format yang Konsisten
- Emoji untuk kategori (📚 KRS, 📍 Lokasi, 💰 Beasiswa)
- Bullet points untuk list
- Numbering untuk step-by-step

### 2. Prioritaskan Info Penting
- Taruh info yang paling sering ditanya di atas
- Info yang jarang ditanya di bawah

### 3. Berikan Fallback
Selalu tambahkan instruksi: "Jika tidak tahu, arahkan ke website/kontak resmi"

### 4. Update Berkala
- Setiap awal semester: update kalender akademik
- Setiap ada perubahan: update prosedur
- Setiap ada dosen/gedung baru: update data

## 📚 Resources

Ambil data dari:
- Website resmi kampus
- Handbook mahasiswa
- Grup WhatsApp mahasiswa (untuk FAQ)
- Bagian akademik kampus
- Senior yang sudah berpengalaman

---

**Happy Training! 🎓**

Kalau ada pertanyaan, silakan tanya di chatbot-nya sendiri! 😄
