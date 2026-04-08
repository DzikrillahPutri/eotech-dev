<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head, Link } from '@inertiajs/vue3'
import { 
  Plus, Search, Eye, Edit2, Rocket, Clock, 
  CheckCircle, FileText, Trash2, ChevronLeft, 
  ChevronRight, Lightbulb, MapPin, Calendar 
} from 'lucide-vue-next'
import { ref, onMounted, computed } from 'vue'

defineOptions({ layout: AdminLayout })

interface EventData {
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

interface ApiResponse {
  message_id: string
  message: string
  data: {
    meta: {
      total: number
      per_page: number
      current_page: number
      last_page: number
      first_page_url: string
      last_page_url: string
      next_page_url?: string
      previous_page_url?: string
    }
    data_events: EventData[]
  },
  trace_code?: string,
  total_data?: number
}

const events = ref<EventData[]>([])
const loading = ref(false)
const stats = ref({
  totalDraft: 0,
  waitingReview: 0,
  activeEvents: 0
})
const currentPage = ref(1)
const totalPages = ref(1)
const totalEvents = ref(0)
const searchQuery = ref('')
const selectedStatus = ref('publish') // 'all', 'publish', 'pending', 'archived'
const itemsPerPage = ref(10)

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)
  
  let start = Math.max(1, currentPage.value - half)
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const fetchStats = async () => {
  try {
    // Fetch counts for each status

    const apiEvent = '/events'


    const [draftRes, reviewRes, activeRes] = await Promise.allSettled([
      fetch(`${apiEvent}?status=pending&page=1&limit=1`),
      fetch(`${apiEvent}?status=archived&page=1&limit=1`), // Assuming archived = waiting review
      fetch(`${apiEvent}?status=publish&page=1&limit=1`)
    ])

    if (draftRes.status === 'fulfilled' && draftRes.value.ok) {
      const draftData: ApiResponse = await draftRes.value.json()
      stats.value.totalDraft = draftData.data.meta.total
    }

    if (reviewRes.status === 'fulfilled' && reviewRes.value.ok) {
      const reviewData: ApiResponse = await reviewRes.value.json()
      stats.value.waitingReview = reviewData.data.meta.total
    }

    if (activeRes.status === 'fulfilled' && activeRes.value.ok) {
      const activeData: ApiResponse = await activeRes.value.json()
      stats.value.activeEvents = activeData.data.meta.total
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Don't show alert for stats errors, just log them
  }
}

const fetchEvents = async (page = 1, status = 'publish', search = '') => {
  loading.value = true
  currentPage.value = page

  try {
    let url = `/events?page=${page}&limit=${itemsPerPage.value}`
    
    if (status !== 'all') {
      url += `&status=${status}`
    }
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch events')

    const result: ApiResponse = await response.json()
    events.value = result.data.data_events
    totalPages.value = result.data.meta.last_page
    totalEvents.value = result.data.meta.total
  } catch (error) {
    console.error('Error fetching events:', error)
    events.value = [] // Set empty array on error
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchStats(), fetchEvents()])
})

const handleSearch = () => {
  fetchEvents(1, selectedStatus.value, searchQuery.value)
}

const handleStatusFilter = (status: string) => {
  selectedStatus.value = status
  fetchEvents(1, status, searchQuery.value)
}

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchEvents(page, selectedStatus.value, searchQuery.value)
  }
}

const publishEvent = async (eventId: string) => {
  try {
    const response = await fetch(`/api/v1/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
      },
      body: JSON.stringify({ status: 'publish' })
    })
    
    if (response.ok) {
      await Promise.all([fetchStats(), fetchEvents(currentPage.value, selectedStatus.value, searchQuery.value)])
    } else {
      alert('Failed to publish event')
    }
  } catch (error) {
    console.error('Error publishing event:', error)
    alert('Failed to publish event')
  }
}

const deleteEvent = async (eventId: string) => {
  if (!confirm('Are you sure you want to delete this event?')) return
  
  try {
    const response = await fetch(`/api/v1/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
      }
    })
    
    if (response.ok) {
      await Promise.all([fetchStats(), fetchEvents(currentPage.value, selectedStatus.value, searchQuery.value)])
    } else {
      alert('Failed to delete event')
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    alert('Failed to delete event')
  }
}

const archiveEvent = async (eventId: string) => {
  try {
    const response = await fetch(`/api/v1/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
      },
      body: JSON.stringify({ status: 'archived' })
    })
    
    if (response.ok) {
      await Promise.all([fetchStats(), fetchEvents(currentPage.value, selectedStatus.value, searchQuery.value)])
    } else {
      alert('Failed to archive event')
    }
  } catch (error) {
    console.error('Error archiving event:', error)
    alert('Failed to archive event')
  }
}
</script>

<template>
  <Head title="Manajemen Event - Eotech" />

  <div class="space-y-7 animate-in fade-in duration-700">
    <div class="flex justify-between items-start">
      <div class="space-y-1">
        <h1 class="text-[26px] font-[800] text-slate-800 tracking-[-0.04em]">Manajemen Event</h1>
        <p class="text-slate-400 text-[14px] font-medium ">Pantau dan kelola seluruh publikasi tiket Anda di sini.</p>
      </div>
      <Link href="/admin/events/create" class="flex items-center space-x-2 px-6 py-3 bg-[#0D4433] text-white rounded-2xl font-[800] text-[13px] hover:bg-[#0a3528] transition-all shadow-lg shadow-[#0d4433]/20">
        <Plus class="w-5 h-5" /> <span>Buat Event Baru</span>
      </Link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="stat in [
        { label: 'Total Draf', val: stats.totalDraft, icon: FileText, color: 'text-slate-500', bg: 'bg-[#F1F5F9]' },
        { label: 'Menunggu Review', val: stats.waitingReview, icon: Clock, color: 'text-[#C2410C]', bg: 'bg-[#FFEDD5]' },
        { label: 'Event Aktif', val: stats.activeEvents, icon: CheckCircle, color: 'text-[#059669]', bg: 'bg-[#D1FAE5]' }
      ]" :key="stat.label" 
      class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm flex items-center space-x-7 transition-all hover:shadow-md">
        
        <div :class="[stat.bg, stat.color]" class="p-5 rounded-[1.5rem] shadow-inner">
          <component :is="stat.icon" class="w-9 h-9" />
        </div>
        
        <div>
          <p class="text-[11px] font-[800] text-slate-400 uppercase tracking-[0.2em] leading-none mb-3">
            {{ stat.label }}
          </p>
          <h3 class="text-[42px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">
            {{ stat.val }}
          </h3>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
      <div class="p-8 border-b border-slate-50 space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-[16px] font-[800] text-slate-800 tracking-tight">Daftar Event Terbaru</h3>
          <div class="flex bg-slate-50 p-1.5 rounded-2xl space-x-1 border border-slate-100">
            <button @click="handleStatusFilter('all')" :class="selectedStatus === 'all' ? 'bg-white shadow-sm' : ''" class="px-5 py-2 rounded-xl text-[11px] font-[800] tracking-tight transition-all">Semua</button>
            <button @click="handleStatusFilter('publish')" :class="selectedStatus === 'publish' ? 'bg-white shadow-sm' : ''" class="px-5 py-2 text-[11px] font-[800] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Aktif</button>
            <button @click="handleStatusFilter('pending')" :class="selectedStatus === 'pending' ? 'bg-white shadow-sm' : ''" class="px-5 py-2 text-[11px] font-[800] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Draft</button>
            <button @click="handleStatusFilter('archived')" :class="selectedStatus === 'archived' ? 'bg-white shadow-sm' : ''" class="px-5 py-2 text-[11px] font-[800] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Arsip</button>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-md">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Cari event..." 
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#0D4433] focus:ring-2 focus:ring-[#0D4433]/10 outline-none transition-all"
            />
          </div>
          <button @click="handleSearch" class="px-6 py-3 bg-[#0D4433] text-white rounded-xl font-[700] text-[13px] hover:bg-[#0a3528] transition-all">
            Cari
          </button>
        </div>
      </div>
      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] font-[800] text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
            <th class="px-10 py-5">Poster & Nama Event</th>
            <th class="px-10 py-5">Lokasi</th>
            <th class="px-10 py-5">Tanggal Dibuat</th>
            <th class="px-10 py-5">Status</th>
            <th class="px-10 py-5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody v-if="!loading" class="divide-y divide-slate-50">
          <tr v-for="event in events" :key="event.event_id" class="group hover:bg-slate-50/30 transition-all duration-300">
            <td class="px-10 py-6">
              <div class="flex items-center space-x-5">
                <img :src="event.banner || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(event.title) + '&background=0D4433&color=fff'" class="w-13 h-16 rounded-[1.25rem] object-cover shadow-sm group-hover:scale-105 transition-transform duration-500" />
                <div>
                  <p class="text-[15px] font-[800] text-slate-800 group-hover:text-[#0D4433] transition-colors leading-tight mb-1.5 tracking-tight">{{ event.title }}</p>
                  <p class="text-[11px] text-slate-400 font-[700] tracking-tight uppercase">ID: {{ event.event_id }}</p>
                </div>
              </div>
            </td>
            <td class="px-10 py-6">
              <span class="px-3.5 py-1.5 bg-slate-100 text-slate-500 text-[9px] font-[800] rounded-full uppercase tracking-widest">{{ event.location }}</span>
            </td>
            <td class="px-10 py-6 text-[12px] font-[700] text-slate-500 tracking-tight">{{ new Date(event.created_at).toLocaleDateString('id-ID') }}</td>
            <td class="px-10 py-6">
              <span :class="{
                'text-emerald-500 bg-emerald-50': event.status === 'publish',
                'text-slate-400 bg-slate-50': event.status === 'pending',
                'text-orange-500 bg-orange-50': event.status === 'archived',
              }" class="flex items-center space-x-2 text-[10px] font-[800] px-3.5 py-1.5 rounded-full inline-flex tracking-widest border border-current/10">
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>{{ event.status === 'publish' ? 'AKTIF' : event.status === 'pending' ? 'DRAFT' : 'ARSIP' }}</span>
              </span>
            </td>
            <td class="px-10 py-6 text-right">
              <div v-if="event.status === 'pending'" class="flex items-center justify-end space-x-3">
                <button class="flex items-center space-x-2 px-4 py-2 border border-slate-100 rounded-xl text-[11px] font-[800] text-slate-600 hover:bg-slate-50 transition-all"><Eye class="w-3.5 h-3.5" /> <span>PRATINJAU</span></button>
                <button @click="publishEvent(event.event_id)" class="flex items-center space-x-2 px-4 py-2 bg-[#E7F3F0] text-[#0D4433] rounded-xl text-[11px] font-[800] hover:bg-[#d5e9e3] transition-all"><Rocket class="w-3.5 h-3.5" /> <span>PUBLIKASIKAN</span></button>
              </div>
              <div v-else class="flex items-center justify-end space-x-2">
                <Link :href="`/admin/events/${event.event_id}/edit`" class="p-2 text-slate-400 hover:text-[#0D4433] transition-colors rounded-lg hover:bg-slate-50">
                  <Edit2 class="w-4 h-4" />
                </Link>
                <button v-if="event.status === 'publish'" @click="archiveEvent(event.event_id)" class="p-2 text-slate-400 hover:text-orange-500 transition-colors rounded-lg hover:bg-slate-50" title="Arsipkan">
                  <Clock class="w-4 h-4" />
                </button>
                <button @click="deleteEvent(event.event_id)" class="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-50" title="Hapus">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="divide-y divide-slate-50">
          <tr>
            <td colspan="5" class="px-10 py-12 text-center text-slate-400">
              <div class="flex items-center justify-center space-x-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400"></div>
                <span>Loading events...</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="px-10 py-6 bg-slate-50/50 flex justify-between items-center border-t border-slate-50">
        <p class="text-[11px] font-[800] text-slate-400 uppercase tracking-[0.2em]">Menampilkan {{ events.length }} dari {{ totalEvents }} event</p>
        <div class="flex items-center space-x-3">
          <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage <= 1" class="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft class="w-4 h-4" />
          </button>
          
          <template v-for="page in visiblePages" :key="page">
            <button 
              @click="handlePageChange(page)" 
              :class="page === currentPage ? 'bg-[#0D4433] text-white shadow-lg shadow-[#0d4433]/20' : 'text-slate-400 hover:bg-white hover:text-slate-600'"
              class="w-9 h-9 rounded-xl text-[12px] font-[800] transition-all"
            >
              {{ page }}
            </button>
          </template>
          
          <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage >= totalPages" class="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div class="bg-[#E7F3F0] p-8 rounded-[2.5rem] flex items-center justify-between border border-[#d5e9e3]">
      <div class="flex items-center space-x-7 px-2">
        <div class="p-5 bg-white rounded-[1.5rem] shadow-sm text-[#0D4433]"><Lightbulb class="w-9 h-9" /></div>
        <div class="max-w-xl">
          <h4 class="text-[17px] font-[800] text-[#0D4433] tracking-tight">Tips: Tingkatkan Penjualan Tiket</h4>
          <p class="text-[14px] text-[#0D4433]/70 mt-1 font-medium leading-relaxed">Gunakan gambar poster berkualitas tinggi dan deskripsi event yang jelas untuk meningkatkan konversi pembeli hingga 40%.</p>
        </div>
      </div>
      <button class="px-7 py-3.5 bg-[#42695E] text-white rounded-2xl font-[800] text-[13px] shadow-lg shadow-emerald-900/10 hover:bg-[#34524a] transition-all tracking-tight uppercase">Pelajari Selengkapnya</button>
    </div>
  </div>
</template>