# Cara Mengintegrasikan Data Event dari Web

Panduan lengkap untuk mengambil data event real-time dari website kampus atau platform event.

## 🎯 Overview

Saat ini, Event Recommender menggunakan **mock data** (data dummy). Untuk production, kamu bisa:
1. **Web Scraping** - Ambil data dari website kampus
2. **API Integration** - Gunakan API dari platform event
3. **Database** - Simpan data event di database sendiri

## 📊 Opsi 1: Web Scraping

### Install Dependencies

```bash
npm install cheerio axios
```

### Update API Route

Edit file `app/api/events/route.ts`:

```typescript
import axios from 'axios';
import * as cheerio from 'cheerio';

async function fetchEventsFromWeb() {
  try {
    // Contoh scraping dari website UNS atau platform event
    const response = await axios.get('https://uns.ac.id/id/event');
    const $ = cheerio.load(response.data);

    const events = [];

    // Selector CSS tergantung struktur website
    $('.event-item').each((index, element) => {
      const event = {
        id: index + 1,
        title: $(element).find('.event-title').text().trim(),
        category: $(element).find('.event-category').text().trim() || 'Seminar',
        organizer: $(element).find('.event-organizer').text().trim() || 'UNS',
        date: $(element).find('.event-date').text().trim(),
        location: $(element).find('.event-location').text().trim(),
        description: $(element).find('.event-description').text().trim(),
        tags: [], // Parse dari kategori atau description
        registrationLink: $(element).find('.event-link').attr('href') || '#',
        quota: 100, // Default jika tidak ada
        fee: $(element).find('.event-fee').text().trim() || 'Gratis'
      };
      events.push(event);
    });

    return events;
  } catch (error) {
    console.error('Error scraping events:', error);
    return [];
  }
}
```

### Contoh Website yang Bisa Di-scrape:

1. **Website UNS**: https://uns.ac.id/id/event
2. **Event Campus**: https://eventcampus.id
3. **Kompetisi.id**: https://kompetisi.id
4. **Instagram API** (dengan proper authentication)

### Tips Web Scraping:

✅ **DO:**
- Cek robots.txt website terlebih dahulu
- Tambahkan delay antar request (rate limiting)
- Handle error dengan baik
- Cache hasil scraping (jangan scrape tiap request)

❌ **DON'T:**
- Scrape terlalu sering (bisa di-ban)
- Scrape website yang melarang scraping
- Lupa handle perubahan struktur HTML

## 📡 Opsi 2: API Integration

Gunakan API dari platform event yang sudah ada:

### Contoh dengan Eventbrite API:

```typescript
async function fetchEventsFromAPI() {
  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
      headers: {
        'Authorization': `Bearer ${process.env.EVENTBRITE_API_KEY}`
      },
      params: {
        'location.address': 'Surakarta',
        'categories': 'educational',
        'expand': 'venue,organizer'
      }
    });

    const events = response.data.events.map((event: any, index: number) => ({
      id: index + 1,
      title: event.name.text,
      category: 'Seminar', // Map dari event category
      organizer: event.organizer?.name || 'Unknown',
      date: event.start.local,
      location: event.venue?.name || 'Online',
      description: event.description.text,
      tags: [],
      registrationLink: event.url,
      quota: event.capacity || 100,
      fee: event.is_free ? 'Gratis' : 'Berbayar'
    }));

    return events;
  } catch (error) {
    console.error('Error fetching from API:', error);
    return [];
  }
}
```

### Platform API yang Bisa Digunakan:

1. **Eventbrite API** - https://www.eventbrite.com/platform/api
2. **Meetup API** - https://www.meetup.com/api/
3. **Kompetisi.id API** (jika tersedia)
4. **Custom Campus API** - Jika kampus punya API sendiri

## 🗄️ Opsi 3: Database Integration

Buat sistem admin untuk input event manual:

### Setup Prisma (ORM):

```bash
npm install prisma @prisma/client
npx prisma init
```

### Schema Database:

```prisma
// prisma/schema.prisma
model Event {
  id              Int      @id @default(autoincrement())
  title           String
  category        String
  organizer       String
  date            DateTime
  location        String
  description     String
  tags            String[] // PostgreSQL array
  registrationLink String
  quota           Int
  fee             String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Fetch dari Database:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchEventsFromDB() {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date() // Only upcoming events
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    return events;
  } catch (error) {
    console.error('Error fetching from DB:', error);
    return [];
  }
}
```

## 🔄 Opsi 4: Hybrid (Kombinasi)

Gunakan kombinasi beberapa sumber:

```typescript
async function fetchEventsFromWeb() {
  try {
    // 1. Fetch dari database internal
    const dbEvents = await fetchEventsFromDB();

    // 2. Fetch dari web scraping
    const scrapedEvents = await scrapeUNSWebsite();

    // 3. Fetch dari API eksternal
    const apiEvents = await fetchFromEventAPI();

    // 4. Combine dan deduplicate
    const allEvents = [
      ...dbEvents,
      ...scrapedEvents,
      ...apiEvents
    ];

    // Remove duplicates based on title
    const uniqueEvents = Array.from(
      new Map(allEvents.map(event => [event.title, event])).values()
    );

    return uniqueEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
```

## ⚡ Caching untuk Performance

Tambahkan caching agar tidak perlu fetch terus-menerus:

```typescript
// Simple in-memory cache
let cachedEvents: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchEventsFromWeb() {
  const now = Date.now();

  // Return cache if still valid
  if (cachedEvents.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    console.log('Returning cached events');
    return cachedEvents;
  }

  // Fetch new data
  console.log('Fetching fresh events');
  const events = await scrapeOrFetchEvents();

  // Update cache
  cachedEvents = events;
  lastFetchTime = now;

  return events;
}
```

## 🎨 Contoh Implementasi Lengkap

### 1. Install Dependencies

```bash
npm install cheerio axios
```

### 2. Update `app/api/events/route.ts`

Ganti fungsi `fetchEventsFromWeb()` dengan salah satu metode di atas.

### 3. Environment Variables

Tambahkan di `.env.local`:

```env
EVENTBRITE_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```

### 4. Test API

```bash
# Test GET endpoint
curl http://localhost:3000/api/events

# Test POST endpoint (recommendations)
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"interests":["teknologi","bisnis"]}'
```

## 📝 Rekomendasi

### Untuk Development:
✅ Gunakan **mock data** (sudah ada)
- Cepat dan mudah
- Tidak perlu API key
- Bagus untuk testing

### Untuk Production:
✅ Gunakan **Database + API Integration**
- Database untuk event internal kampus
- API untuk event eksternal
- Web scraping sebagai backup

### Untuk Kampus:
✅ Buat **Admin Panel** untuk input event
- Staff kampus bisa input event manual
- Lebih akurat dan terkontrol
- Tidak bergantung pada website lain

## 🔒 Security Tips

1. **Rate Limiting**: Batasi jumlah request
2. **API Keys**: Simpan di environment variables
3. **Error Handling**: Jangan expose error detail ke user
4. **Validation**: Validasi semua input dari user
5. **CORS**: Set CORS policy yang benar

## 📚 Resources

- **Cheerio Docs**: https://cheerio.js.org/
- **Axios Docs**: https://axios-http.com/
- **Prisma Docs**: https://www.prisma.io/docs/
- **Web Scraping Best Practices**: https://www.scrapingbee.com/blog/web-scraping-best-practices/

---

**Selamat mencoba! 🚀**

Kalau ada pertanyaan atau butuh bantuan implementasi, silakan tanya!
