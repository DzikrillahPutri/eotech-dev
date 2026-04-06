<template>
  <section class="px-6 md:px-20 py-12 text-left bg-gray-50/50">
    <p class="text-[10px] font-bold text-[#0D4433] uppercase tracking-[0.2em] mb-2">Event</p>
    <h2 class="text-3xl font-bold mb-10 text-gray-900 tracking-tight">Event Terbaru</h2>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D4433]"></div>
    </div>

    <div v-else-if="events.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="event in events" :key="event.event_id" class="group bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all text-left">
        <div class="relative rounded-[24px] overflow-hidden aspect-[1/1] mb-5 bg-gray-100">
          <img :src="event.banner || '/images/default-event.jpg'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <span class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#0D4433]">TERBARU</span>
        </div>
        <h3 class="font-bold text-lg mb-1.5 text-gray-950 tracking-tight leading-snug">{{ event.title }}</h3>
        <p class="text-gray-400 text-xs mb-5 flex items-center gap-1.5"><span class="w-3 h-3 bg-gray-300 rounded-full"></span> {{ event.location }}</p>
        <div class="flex justify-between items-center pt-5 border-t border-gray-100">
          <span class="font-extrabold text-lg tracking-tight text-[#0D4433]">IDR 0++</span>
          <button class="text-[10px] font-bold text-[#0D4433] border-2 border-[#0D4433]/20 px-4 py-2 rounded-xl hover:bg-[#0D4433] hover:text-white transition-all shadow-sm">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Tidak ada event tersedia saat ini.</p>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="flex justify-center mt-12">
      <div class="flex space-x-2">
        <button
          v-if="pagination.current_page > 1"
          @click="goToPage(pagination.current_page - 1)"
          class="px-4 py-2 text-sm font-medium text-[#0D4433] bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg',
            page === pagination.current_page
              ? 'text-white bg-[#0D4433]'
              : 'text-[#0D4433] bg-white border border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>

        <button
          v-if="pagination.current_page < pagination.last_page"
          @click="goToPage(pagination.current_page + 1)"
          class="px-4 py-2 text-sm font-medium text-[#0D4433] bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Event {
  event_id: string
  title: string
  description: string
  location: string
  banner?: string
  slug: string
  status: string
  registration_start_at: string
  registration_end_at: string
  created_at: string
  updated_at: string
}

interface PaginationMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url?: string
  previous_page_url?: string
}

interface ApiResponse {
  message_id: string
  message: string
  data: {
    data: Event[]
    meta: PaginationMeta
  },
  trace_code?: string,
  total_data?: number
}

const events = ref<Event[]>([])
const pagination = ref<PaginationMeta | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchEvents = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`/events?page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse = await response.json()

    events.value = result.data.data
    pagination.value = result.data.meta

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch events'
    console.error('Error fetching events:', err)
  } finally {
    loading.value = false
  }
}

const goToPage = (page: number) => {
  fetchEvents(page)
}

const visiblePages = computed(() => {
  if (!pagination.value) return []

  const current = pagination.value.current_page
  const last = pagination.value.last_page
  const delta = 2
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (current + delta < last - 1) {
    rangeWithDots.push('...', last)
  } else if (last > 1) {
    rangeWithDots.push(last)
  }

  return rangeWithDots.filter(item => typeof item === 'number') as number[]
})

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
/* Additional styles if needed */
</style>