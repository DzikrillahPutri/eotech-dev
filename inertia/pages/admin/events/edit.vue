<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { 
  Info, MapPin, UploadCloud, 
  Bold, Italic, List, Link as LinkIcon, 
  MessageSquare, Rocket, ArrowLeft 
} from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

defineOptions({ layout: AdminLayout })

interface Props {
  eventId: string
}

const props = defineProps<Props>()
const eventId = props.eventId

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
  organizer_contact: string
  created_at: string
  updated_at: string
}

const form = useForm({
  title: '',
  description: '',
  location: '',
  registration_start_date: '',
  registration_start_time: '',
  registration_end_date: '',
  registration_end_time: '',
  organizer_contact: '',
  banner: null as File | null,
  status: 'pending'
})

const bannerPreview = ref<string | null>(null)
const isSubmitting = ref(false)
const loading = ref(true)

const fetchEvent = async () => {
  try {
    const response = await fetch(`/api/v1/events/${eventId}`)
    if (!response.ok) throw new Error('Failed to fetch event')

    const result = await response.json()
    const event: EventData = result.data

    // Populate form
    form.title = event.title
    form.description = event.description
    form.location = event.location
    form.organizer_contact = event.organizer_contact
    form.status = event.status

    // Split datetime
    const startDate = new Date(event.registration_start_at)
    const endDate = new Date(event.registration_end_at)
    
    form.registration_start_date = startDate.toISOString().split('T')[0]
    form.registration_start_time = startDate.toTimeString().slice(0, 5)
    form.registration_end_date = endDate.toISOString().split('T')[0]
    form.registration_end_time = endDate.toTimeString().slice(0, 5)

    if (event.banner) {
      bannerPreview.value = event.banner
    }
  } catch (error) {
    console.error('Error fetching event:', error)
    alert('Failed to load event')
  } finally {
    loading.value = false
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.banner = file
    const reader = new FileReader()
    reader.onload = (e) => {
      bannerPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    // Combine date and time
    const startDateTime = new Date(`${form.registration_start_date}T${form.registration_start_time}`)
    const endDateTime = new Date(`${form.registration_end_date}T${form.registration_end_time}`)
    
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('location', form.location)
    formData.append('organizer_contact', form.organizer_contact)
    formData.append('registration_start_at', startDateTime.toISOString())
    formData.append('registration_end_at', endDateTime.toISOString())
    formData.append('status', form.status)
    
    if (form.banner) {
      formData.append('banner', form.banner)
    }
    
    const response = await fetch(`/api/v1/events/${eventId}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
      }
    })
    
    if (response.ok) {
      alert('Event updated successfully!')
      window.location.href = '/admin/events'
    } else {
      const error = await response.json()
      alert('Error: ' + error.message)
    }
  } catch (error) {
    console.error('Error updating event:', error)
    alert('Failed to update event')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchEvent()
})
</script>

<template>
  <Head title="Edit Event - Eotech" />

  <div class="max-w-[1200px] mx-auto pb-20 animate-in fade-in duration-700 font-['Plus_Jakarta_Sans']">
    <div class="mb-10 px-2">
      <nav class="flex items-center space-x-2 text-[11px] text-slate-400 font-[700] uppercase tracking-[0.1em] mb-4">
        <Link href="/admin/events" class="hover:text-[#0D4433] transition-colors">Kelola Event</Link>
        <span class="text-slate-300">›</span>
        <span class="text-slate-800 font-[700]">Edit Event</span>
      </nav>
      <div class="flex items-center space-x-4">
        <Link href="/admin/events" class="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          <ArrowLeft class="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 class="text-[30px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">Edit Event</h1>
          <p class="text-slate-400 text-[15px] font-medium mt-2 italic">Perbarui informasi event Anda.</p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D4433]"></div>
      <span class="ml-3 text-slate-600">Loading event...</span>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      <div class="lg:col-span-8 space-y-8">
        
        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center space-x-5 mb-10">
            <div class="p-3.5 bg-[#E7F3F0] text-[#0D4433] rounded-[1.25rem] shadow-inner">
              <Info class="w-7 h-7" />
            </div>
            <h3 class="text-[20px] font-[800] text-slate-800 tracking-tight">Informasi Dasar</h3>
          </div>
          
          <div class="space-y-8">
            <div>
              <label class="block text-[13px] font-[700] text-slate-700 tracking-[-0.01em] mb-2.5">
                Nama Event <span class="text-rose-500 font-black">*</span>
              </label>
              <input type="text" v-model="form.title" placeholder="Contoh: Eotech Music Festival 2024" 
                class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-4.5 px-6 text-[15px] text-slate-700 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-[#0D4433]/5 focus:border-[#0D4433] outline-none transition-all font-medium" />
            </div>

            <div>
              <label class="block text-[13px] font-[700] text-slate-700 tracking-[-0.01em] mb-2.5">
                Deskripsi Event <span class="text-rose-500 font-black">*</span>
              </label>
              <div class="border border-slate-100 rounded-[1.5rem] bg-white overflow-hidden group focus-within:border-[#0D4433] focus-within:ring-4 focus-within:ring-[#0D4433]/5 transition-all shadow-sm">
                <div class="flex items-center space-x-6 px-6 py-4 bg-[#F8FAFC] border-b border-slate-100 text-slate-400">
                  <Bold class="w-4 h-4 cursor-pointer hover:text-black" />
                  <Italic class="w-4 h-4 cursor-pointer hover:text-black" />
                  <List class="w-4 h-4 cursor-pointer hover:text-black" />
                  <LinkIcon class="w-4 h-4 cursor-pointer hover:text-black" />
                </div>
                <textarea rows="8" v-model="form.description" placeholder="Ceritakan detail event Anda di sini..." 
                  class="w-full bg-transparent border-none p-6 text-[15px] text-slate-600 placeholder:text-slate-300 focus:ring-0 outline-none font-medium leading-relaxed"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center space-x-5 mb-10">
            <div class="p-3.5 bg-[#E7F3F0] text-[#0D4433] rounded-[1.25rem] shadow-inner">
              <MapPin class="w-7 h-7" />
            </div>
            <h3 class="text-[20px] font-[800] text-slate-800 tracking-tight">Waktu & Lokasi</h3>
          </div>
          
          <div class="space-y-8">
            <div class="grid grid-cols-2 gap-8">
              <div>
                <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Tanggal Mulai <span class="text-rose-500">*</span></label>
                <input type="date" v-model="form.registration_start_date" class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-xl py-4.5 px-6 text-sm text-slate-600 outline-none focus:bg-white focus:border-[#0D4433]" />
              </div>
              <div>
                <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Waktu Mulai <span class="text-rose-500">*</span></label>
                <input type="time" v-model="form.registration_start_time" class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-xl py-4.5 px-6 text-sm text-slate-600 outline-none focus:bg-white focus:border-[#0D4433]" />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-8">
              <div>
                <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Tanggal Selesai <span class="text-rose-500">*</span></label>
                <input type="date" v-model="form.registration_end_date" class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-xl py-4.5 px-6 text-sm text-slate-600 outline-none focus:bg-white focus:border-[#0D4433]" />
              </div>
              <div>
                <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Waktu Selesai <span class="text-rose-500">*</span></label>
                <input type="time" v-model="form.registration_end_time" class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-xl py-4.5 px-6 text-sm text-slate-600 outline-none focus:bg-white focus:border-[#0D4433]" />
              </div>
            </div>
            
            <div>
              <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Nama Lokasi <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.location" placeholder="Gedung, Mall, atau Nama Tempat" class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-5 px-6 text-[15px] text-slate-700 font-medium outline-none focus:bg-white focus:border-[#0D4433]" />
            </div>
          </div>
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center space-x-5 mb-10">
            <div class="p-2.5 bg-[#E7F3F0] text-[#0D4433] rounded-xl shadow-inner">
              <MessageSquare class="w-6 h-6" />
            </div>
            <h3 class="text-[20px] font-[800] text-slate-800 tracking-tight">Kontak Penyelenggara</h3>
          </div>
          
          <div>
            <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Nomor WhatsApp <span class="text-rose-500">*</span></label>
            <input type="text" v-model="form.organizer_contact" placeholder="0812xxxxxx" 
              class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-5 px-6 text-[15px] text-slate-700 font-medium outline-none focus:bg-white placeholder:text-slate-300" />
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-8 sticky top-28">
        
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <div class="flex items-center space-x-4 mb-8 font-[700] text-[15px] text-slate-800 tracking-tight">
            <div class="p-2.5 bg-[#E7F3F0] text-[#0D4433] rounded-xl"><UploadCloud class="w-5 h-5" /></div>
            <span>Poster Event</span>
          </div>
          
          <div class="relative bg-[#D1D5DB] rounded-[2rem] p-5 border border-slate-200 overflow-hidden shadow-inner group cursor-pointer hover:border-[#0D4433]/30 transition-all duration-500">
            <input type="file" @change="handleFileUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div v-if="bannerPreview" class="bg-white rounded-2xl py-14 flex flex-col items-center justify-center text-center space-y-5 border border-dashed border-slate-100">
              <img :src="bannerPreview" class="w-20 h-20 object-cover rounded-lg shadow-sm" />
              <div>
                <p class="text-[15px] font-[700] text-slate-800 mb-2 leading-none">Poster Event</p>
                <p class="text-[12px] text-slate-400 font-medium leading-relaxed">Klik untuk mengganti</p>
              </div>
            </div>
            <div v-else class="bg-white rounded-2xl py-14 flex flex-col items-center justify-center text-center space-y-5 border border-dashed border-slate-100">
               <div class="w-16 h-16 bg-[#E7F3F0] rounded-full flex items-center justify-center text-[#0D4433] shadow-lg shadow-[#0d4433]/10 group-hover:scale-110 transition-transform">
                 <UploadCloud class="w-8 h-8" />
               </div>
               <div>
                  <p class="text-[15px] font-[700] text-slate-800 mb-2 leading-none">Unggah Poster</p>
                  <p class="text-[12px] text-slate-400 font-medium leading-relaxed">Rasio 3:4, Format JPG/PNG. <br> Maks 5MB.</p>
               </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
          <div class="flex items-center space-x-4 mb-2 font-[700] text-[15px] text-slate-800 tracking-tight">
            <div class="p-2.5 bg-[#E7F3F0] text-[#0D4433] rounded-xl"><Rocket class="w-5 h-5" /></div>
            <span>Status & Publikasi</span>
          </div>
          
          <div class="space-y-4">
            <label class="flex items-center p-5 bg-[#F1F5F9] border-2 border-transparent hover:border-[#0D4433]/10 rounded-[1.5rem] cursor-pointer transition-all">
              <input type="radio" v-model="form.status" value="pending" class="w-6 h-6 text-[#0D4433] border-slate-300 focus:ring-0 cursor-pointer mr-5" />
              <div>
                <p class="text-[14px] font-[700] text-slate-800 leading-none mb-2">Draft</p>
                <p class="text-[11px] text-slate-400 font-medium">Simpan sebagai draft</p>
              </div>
            </label>
            <label class="flex items-center p-5 bg-white border-2 border-slate-50 hover:border-[#0D4433]/10 rounded-[1.5rem] cursor-pointer transition-all shadow-sm">
              <input type="radio" v-model="form.status" value="publish" class="w-6 h-6 text-[#0D4433] border-slate-300 focus:ring-0 cursor-pointer mr-5" />
              <div>
                <p class="text-[14px] font-[700] text-slate-800 leading-none mb-2">Published</p>
                <p class="text-[11px] text-slate-400 font-medium">Tayangkan event</p>
              </div>
            </label>
            <label class="flex items-center p-5 bg-white border-2 border-slate-50 hover:border-[#0D4433]/10 rounded-[1.5rem] cursor-pointer transition-all shadow-sm">
              <input type="radio" v-model="form.status" value="archived" class="w-6 h-6 text-[#0D4433] border-slate-300 focus:ring-0 cursor-pointer mr-5" />
              <div>
                <p class="text-[14px] font-[700] text-slate-800 leading-none mb-2">Archived</p>
                <p class="text-[11px] text-slate-400 font-medium">Arsipkan event</p>
              </div>
            </label>
          </div>

          <button @click="submitForm" :disabled="isSubmitting" class="w-full bg-[#0D4433] text-white py-5 rounded-[1.5rem] font-[700] text-[15px] shadow-xl shadow-[#0d4433]/20 hover:bg-[#0a3528] active:scale-[0.98] transition-all flex items-center justify-center tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-else>Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea { resize: none; }
input:focus, textarea:focus { background-color: white !important; }
</style>