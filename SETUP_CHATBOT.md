# Setup Chatbot AI dengan Gemini

Panduan lengkap untuk mengintegrasikan dan men-train chatbot AI menggunakan Google Gemini.

## 1. Dapatkan API Key Gemini

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google kamu
3. Klik tombol **"Create API Key"**
4. Copy API key yang diberikan

## 2. Setup Environment Variable

1. Buka file `.env.local` di root project
2. Ganti `your_gemini_api_key_here` dengan API key yang sudah kamu dapatkan:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

3. Simpan file

## 3. Cara Kerja Chatbot

### Struktur File:

```
components/Chatbot.tsx          # UI komponen chatbot
app/api/chat/route.ts           # API endpoint untuk handle request
```

### Flow:
1. User mengetik pesan di chatbot UI
2. Pesan dikirim ke `/api/chat` endpoint
3. API route mengirim pesan ke Gemini AI
4. Response dari Gemini dikirim kembali ke UI
5. UI menampilkan response

## 4. Cara "Train" atau Customize AI

### Mengubah System Prompt

Buka file `app/api/chat/route.ts` dan edit bagian `systemPrompt`:

```typescript
const systemPrompt = `Kamu adalah AI Campus Navigator, asisten virtual untuk mahasiswa kampus di Indonesia.
Tugasmu adalah membantu mahasiswa dengan:
- Informasi tentang KRS (Kartu Rencana Studi)
- Lokasi gedung dan fasilitas kampus
...
`;
```

Di sini kamu bisa:
- Menambah atau mengurangi topik yang bisa dijawab
- Mengubah tone/gaya bahasa AI
- Menambahkan konteks spesifik kampus kamu

### Contoh Customization:

**Untuk kampus tertentu:**
```typescript
const systemPrompt = `Kamu adalah AI Campus Navigator untuk Universitas XYZ di Jakarta.
Kampus memiliki 4 gedung utama:
- Gedung A: Fakultas Teknik (Lantai 1-5)
- Gedung B: Fakultas Ekonomi (Lantai 1-4)
...

Informasi penting:
- KRS dibuka setiap awal semester (minggu pertama)
- Perpustakaan buka: Senin-Jumat 08.00-20.00
...
`;
```

**Untuk tone yang lebih formal:**
```typescript
const systemPrompt = `Anda adalah asisten virtual resmi kampus.
Berikan jawaban yang profesional dan formal...`;
```

**Untuk menambah data spesifik:**
```typescript
const systemPrompt = `...
Daftar Dosen:
- Prof. Ahmad: Pemrograman Web (ahmad@kampus.ac.id)
- Dr. Budi: Database (budi@kampus.ac.id)

Daftar UKM:
- UKM IT: Fokus pada teknologi, pertemuan Jumat 16.00
- UKM Seni: Fokus pada seni budaya, pertemuan Kamis 15.00
...`;
```

## 5. Mengatur Parameter AI

Di file `app/api/chat/route.ts`, kamu bisa mengatur:

```typescript
generationConfig: {
  maxOutputTokens: 1000,    // Panjang maksimal response (lebih tinggi = lebih panjang)
  temperature: 0.7,          // Kreativitas (0.0-1.0, lebih tinggi = lebih kreatif)
}
```

- **temperature**:
  - 0.0-0.3: Sangat konsisten dan faktual
  - 0.4-0.7: Seimbang (recommended)
  - 0.8-1.0: Lebih kreatif dan variatif

- **maxOutputTokens**:
  - 500: Jawaban singkat
  - 1000: Jawaban medium (recommended)
  - 2000+: Jawaban panjang dan detail

## 6. Menambah Context dari Database

Jika kamu ingin AI menggunakan data dari database kampus:

```typescript
// Contoh: Ambil data dosen dari database
const dosenList = await fetchDosenFromDB();
const dosenContext = dosenList.map(d => `${d.nama}: ${d.matkul}`).join('\n');

const systemPrompt = `...
Daftar Dosen di kampus:
${dosenContext}
...`;
```

## 7. Testing Chatbot

1. Jalankan development server:
```bash
npm run dev
```

2. Buka browser di `http://localhost:3000`
3. Klik tombol chatbot di kanan bawah
4. Coba tanya:
   - "Apa itu KRS?"
   - "Gimana cara daftar beasiswa?"
   - "Di mana lokasi perpustakaan?"
   - "Event apa yang sedang berlangsung?"

## 8. Tips untuk Hasil Terbaik

### ✅ DO:
- Berikan konteks yang spesifik dan detail di system prompt
- Update system prompt dengan informasi terbaru kampus
- Test dengan berbagai macam pertanyaan
- Simpan conversation history (sudah diimplementasi)

### ❌ DON'T:
- Jangan masukkan data sensitif di system prompt
- Jangan set temperature terlalu tinggi (>0.8) untuk chatbot informasi
- Jangan lupa restart dev server setelah ubah .env.local

## 9. Production Deployment

Sebelum deploy ke production:

1. **Pastikan API key aman:**
   - Jangan commit `.env.local` ke git
   - Tambahkan `.env.local` ke `.gitignore`

2. **Set environment variable di hosting:**
   - Vercel: Dashboard → Project → Settings → Environment Variables
   - Netlify: Site settings → Build & deploy → Environment

3. **Monitor usage:**
   - Cek quota API di [Google Cloud Console](https://console.cloud.google.com/)
   - Gemini API biasanya free untuk usage tertentu

## 10. Troubleshooting

### Error: "Gemini API key not configured"
- Pastikan file `.env.local` ada dan berisi API key yang valid
- Restart development server setelah menambah API key

### Error: "Failed to process request"
- Cek API key masih valid di Google AI Studio
- Cek koneksi internet
- Cek quota API belum habis

### Chatbot tidak muncul
- Pastikan komponen `<Chatbot />` sudah diimport di `app/page.tsx`
- Clear cache browser dan refresh

### Response AI tidak sesuai harapan
- Edit `systemPrompt` dengan lebih spesifik
- Kurangi `temperature` untuk jawaban lebih konsisten
- Tambah contoh dialog di system prompt

## Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini Pricing](https://ai.google.dev/pricing)

---

**Selamat mencoba! 🚀**

Jika ada pertanyaan atau butuh bantuan lebih lanjut, silakan hubungi tim development.
