import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { randomUUID } from 'node:crypto'

type EventStatus = 'pending' | 'publish' | 'archived'

function daysFromNow(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .trim()
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomPrice(options: number[]): number {
  return randomPick(options)
}

// ─── Vocabulary pools ────────────────────────────────────────────────────────

const eventPrefixes = [
  'Eotech', 'Indonesia', 'Nusantara', 'Archipelago', 'Jakarta', 'Bandung',
  'Surabaya', 'Bali', 'Yogyakarta', 'Medan', 'Makassar', 'Semarang',
  'National', 'International', 'Annual', 'Grand', 'Premier', 'Elite',
]

const eventTypes = [
  'Developer Conference', 'Music Festival', 'Art Exhibition', 'Food Festival',
  'Tech Summit', 'Startup Pitch', 'Hackathon', 'Product Launch', 'Workshop',
  'Seminar', 'Cultural Festival', 'Sports Championship', 'Film Screening',
  'Fashion Show', 'Book Fair', 'Job Fair', 'Health Expo', 'Gaming Tournament',
  'Charity Gala', 'Comedy Night', 'Business Forum', 'Design Sprint',
  'Photography Contest', 'Culinary Class', 'Dance Competition', 'Science Expo',
  'Agriculture Expo', 'Tourism Fair', 'Education Summit', 'Green Summit',
]

const years = ['2024', '2025', '2026']

const indonesianCities = [
  'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur',
  'Bandung', 'Surabaya', 'Yogyakarta', 'Medan', 'Makassar', 'Semarang',
  'Palembang', 'Denpasar', 'Balikpapan', 'Manado', 'Pekanbaru', 'Banjarmasin',
  'Malang', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Solo', 'Samarinda',
  'Pontianak', 'Batam', 'Padang', 'Mataram', 'Kupang', 'Jayapura',
]

const venues = [
  'Convention Center', 'International Expo', 'Sports Hall', 'Cultural Center',
  'Grand Ballroom', 'Open Air Stage', 'Alun-Alun', 'GOR', 'Mall Atrium',
  'Co-working Space', 'University Hall', 'Hotel Ballroom', 'Waterfront Park',
  'Digital Hub', 'Science Park', 'Taman Kota', 'Lapangan Utama',
]

const ticketTierNames = [
  ['Free RSVP'],
  ['Early Bird', 'Regular'],
  ['Early Bird', 'Regular', 'VIP'],
  ['Bronze', 'Silver', 'Gold'],
  ['General Admission', 'Premium', 'VVIP'],
  ['Standard', 'Professional', 'Enterprise'],
  ['Day 1 Pass', 'Day 2 Pass', 'Full Pass'],
  ['Student', 'Regular', 'VIP'],
]

const ticketDescriptions = [
  'Akses penuh ke semua sesi dan area event.',
  'Termasuk makan siang dan goodie bag.',
  'Akses VIP eksklusif dengan meet & greet.',
  'Harga spesial untuk 100 pendaftar pertama.',
  'Tiket reguler dengan akses semua panggung.',
  'Termasuk workshop premium dan sertifikat.',
  'Akses networking dinner dan merchandise.',
  'Harga khusus mahasiswa, wajib tunjukkan KTM.',
  'Akses selama 2 hari penuh termasuk after-party.',
  'Free entry, kuota sangat terbatas.',
  'Termasuk lanyard eksklusif dan tote bag.',
  'Priority seating dan akses backstage.',
]

const statuses: EventStatus[] = ['pending', 'publish', 'publish', 'publish', 'archived']

// ─── Unsplash image URLs by event type ───────────────────────────────────────
// Each key matches a value in eventTypes for contextual image selection.
// Falls back to bannerUrlFallback when no key matches.
const bannerUrlsByType: Record<string, string[]> = {
  'Developer Conference': [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80',
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=80',
  ],
  'Music Festival': [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&q=80',
  ],
  'Art Exhibition': [
    'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1200&q=80',
    'https://images.unsplash.com/photo-1545033131-485ea67fd7c3?w=1200&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80',
  ],
  'Food Festival': [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=80',
  ],
  'Tech Summit': [
    'https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80',
  ],
  'Startup Pitch': [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
    'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=1200&q=80',
  ],
  'Hackathon': [
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
  ],
  'Product Launch': [
    'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80',
  ],
  'Workshop': [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
    'https://images.unsplash.com/photo-1558021211-6d1403321394?w=1200&q=80',
  ],
  'Seminar': [
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=1200&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  ],
  'Cultural Festival': [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
    'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
  ],
  'Sports Championship': [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80',
    'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1200&q=80',
    'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=1200&q=80',
  ],
  'Film Screening': [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
  ],
  'Fashion Show': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
  ],
  'Book Fair': [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80',
  ],
  'Job Fair': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
  ],
  'Health Expo': [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80',
  ],
  'Gaming Tournament': [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80',
    'https://images.unsplash.com/photo-1536007164985-da2fd2565f7c?w=1200&q=80',
  ],
  'Charity Gala': [
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
  ],
  'Comedy Night': [
    'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=1200&q=80',
    'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&q=80',
    'https://images.unsplash.com/photo-1560523159-4a9692d222f9?w=1200&q=80',
  ],
  'Business Forum': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
    'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  ],
  'Design Sprint': [
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
  ],
  'Photography Contest': [
    'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=1200&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80',
  ],
  'Culinary Class': [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1200&q=80',
    'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80',
  ],
  'Dance Competition': [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&q=80',
    'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=1200&q=80',
  ],
  'Science Expo': [
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=80',
    'https://images.unsplash.com/photo-1532094349884-543559c5b686?w=1200&q=80',
    'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=1200&q=80',
  ],
  'Agriculture Expo': [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80',
  ],
  'Tourism Fair': [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&q=80',
    'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80',
  ],
  'Education Summit': [
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
  ],
  'Green Summit': [
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
  ],
}

// Fallback pool for any type not explicitly mapped
const bannerUrlFallback = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80',
]

const getBannerUrl = (type: string): string => {
  const pool = bannerUrlsByType[type] ?? bannerUrlFallback
  return randomPick(pool)
}

// ─── Main Seeder ─────────────────────────────────────────────────────────────

export default class EventExtendedSeeder extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding 2000 extended events and ticket types...')

    const admins = await db
      .from('users')
      .select('user_id')
      .where('role', 'event_organizer_admin')
      .orderBy('created_at', 'asc')

    const superAdmin = await db
      .from('users')
      .select('user_id')
      .where('role', 'super_admin')
      .first()

    if (admins.length === 0 && !superAdmin) {
      throw new Error(
        '❌ Jalankan UserSeeder dulu: node ace db:seed --files database/seeders/user_seeder.ts'
      )
    }

    const ownerIds: string[] = admins.map((a) => a.user_id)
    if (ownerIds.length === 0) ownerIds.push(superAdmin!.user_id)

    const getOwner = (): string => randomPick(ownerIds)

    // ── Track used slugs to avoid duplicates ──────────────────────────────────
    const usedSlugs = new Set<string>()

    const makeUniqueSlug = (base: string): string => {
      let slug = slugify(base)
      let attempt = 0
      while (usedSlugs.has(slug)) {
        attempt++
        slug = slugify(`${base} ${attempt}`)
      }
      usedSlugs.add(slug)
      return slug
    }

    // ── Build events ──────────────────────────────────────────────────────────
    const TOTAL_EVENTS = 2000
    const BATCH_SIZE = 200

    const allTicketTypes: object[] = []
    let totalInserted = 0

    for (let batch = 0; batch < TOTAL_EVENTS / BATCH_SIZE; batch++) {
      const events: object[] = []

      for (let i = 0; i < BATCH_SIZE; i++) {
        const prefix = randomPick(eventPrefixes)
        const type = randomPick(eventTypes)
        const year = randomPick(years)
        const title = `${prefix} ${type} ${year}`
        const city = randomPick(indonesianCities)
        const venue = randomPick(venues)
        const status = randomPick(statuses)

        // Registration window relative to "now"
        const regStartOffset = randomInt(-120, 30)
        const regDuration = randomInt(14, 90)
        const regStart = daysFromNow(regStartOffset)
        const regEnd = daysFromNow(regStartOffset + regDuration)

        const eventId = randomUUID()
        const now = new Date()

        events.push({
          event_id: eventId,
          owner_id: getOwner(),
          title,
          description: `${type} tahunan yang diselenggarakan di ${city}. Hadirkan pengalaman terbaik bagi semua peserta.`,
          location: `${venue}, ${city}`,
          organizer_contact: `+62-812-${String(randomInt(1000, 9999))}-${String(randomInt(1000, 9999))}`,
          registration_start_at: regStart,
          registration_end_at: regEnd,
          banner: getBannerUrl(type),
          slug: makeUniqueSlug(title),
          status,
          created_at: now,
          updated_at: now,
        })

        // ── Ticket types for this event ────────────────────────────────────
        const tiers = randomPick(ticketTierNames)

        tiers.forEach((tierName, idx) => {
          const isFree = tierName === 'Free RSVP'
          const basePrice = isFree ? 0 : randomPrice([
            50_000, 75_000, 100_000, 150_000, 200_000,
            250_000, 350_000, 500_000, 750_000, 1_000_000,
          ])
          // Higher tiers cost more
          const price = isFree ? 0 : basePrice * (idx + 1)
          const quota = randomInt(50, 500)
          const salesStart = regStart
          const salesEnd = new Date(regEnd.getTime() - idx * 2 * 24 * 60 * 60 * 1000) // earlier tiers end sooner
          const perOrderLimit = randomInt(1, 6)

          allTicketTypes.push({
            ticket_type_id: randomUUID(),
            event_id: eventId,
            ticket_name: tierName,
            price,
            quota,
            sales_start_date: salesStart,
            sales_end_date: salesEnd > salesStart ? salesEnd : regEnd,
            per_order_limit: perOrderLimit,
            description: randomPick(ticketDescriptions),
            created_at: new Date(),
            updated_at: new Date(),
          })
        })
      }

      // Insert events batch
      await db.table('events').multiInsert(events)
      totalInserted += events.length

      console.log(`  ✅ Batch ${batch + 1}/${TOTAL_EVENTS / BATCH_SIZE} — inserted ${totalInserted} events so far`)
    }

    // ── Insert ticket types in batches of 500 ─────────────────────────────
    console.log(`\n🎟️  Inserting ${allTicketTypes.length} ticket types...`)
    const TICKET_BATCH = 500
    for (let i = 0; i < allTicketTypes.length; i += TICKET_BATCH) {
      const chunk = allTicketTypes.slice(i, i + TICKET_BATCH)
      await db.table('ticket_types').multiInsert(chunk)
      console.log(`  ✅ Ticket types: ${Math.min(i + TICKET_BATCH, allTicketTypes.length)} / ${allTicketTypes.length}`)
    }

    // ── Summary ───────────────────────────────────────────────────────────────
    const statusCount = { pending: 0, publish: 0, archived: 0 }
    // Re-query for accurate counts
    const rows = await db.from('events').select('status').whereNotNull('status')
    for (const r of rows) {
      if (r.status in statusCount) statusCount[r.status as EventStatus]++
    }

    console.log('\n📋 Final DB summary:')
    console.log(`  • publish  : ${statusCount.publish}`)
    console.log(`  • pending  : ${statusCount.pending}`)
    console.log(`  • archived : ${statusCount.archived}`)
    console.log(`  • Total events      : ${totalInserted}`)
    console.log(`  • Total ticket types: ${allTicketTypes.length}`)
    console.log('\n✨ Extended event seeder completed successfully.')
  }
}