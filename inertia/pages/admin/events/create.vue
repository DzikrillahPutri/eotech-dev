<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { 
  Info, MapPin, Calendar, Users, UploadCloud, 
  Map, Save, Bold, Italic, List, Link as LinkIcon, 
  MessageSquare, Rocket 
} from 'lucide-vue-next'
import { ref } from 'vue'

defineOptions({ layout: AdminLayout })

const form = useForm({
  title: '',
  description: '',
  location: '',
  registration_start_date: '',
  registration_start_time: '',
  registration_end_date: '',
  registration_end_time: '',
  organizer_name: '',
  organizer_contact: '',
  banner: null as File | null,
  status: 'pending'
})

const bannerPreview = ref<string | null>(null)
const isSubmitting = ref(false)

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
    
    const response = await fetch('/api/v1/events', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      alert('Event created successfully!')
      window.location.href = '/admin/events'
    } else {
      const error = await response.json()
      alert('Error: ' + error.message)
    }
  } catch (error) {
    console.error('Error creating event:', error)
    alert('Failed to create event')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Head title="Buat Event Baru - Eotech" />

  <div class="max-w-[1200px] mx-auto pb-20 animate-in fade-in duration-700 font-['Plus_Jakarta_Sans']">
    <div class="mb-10 px-2">
      <nav class="flex items-center space-x-2 text-[11px] text-slate-400 font-[700] uppercase tracking-[0.1em] mb-4">
        <Link href="/admin/events" class="hover:text-[#0D4433] transition-colors">Kelola Event</Link>
        <span class="text-slate-300">›</span>
        <span class="text-slate-800 font-[700]">Buat Event Baru</span>
      </nav>
      <h1 class="text-[30px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">Buat Event Baru</h1>
      <p class="text-slate-400 text-[15px] font-medium mt-2 italic">Lengkapi informasi di bawah ini untuk mengkurasi pengalaman event terbaik.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
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

            <div>
              <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">URL Google Maps</label>
              <div class="relative flex items-center group">
                <input type="text" placeholder="http://googleusercontent.com/maps..." class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-5 pl-6 pr-14 text-[14px] text-slate-700 font-medium outline-none focus:bg-white" />
                <MapPin class="absolute right-5 w-5 h-5 text-slate-300 group-focus-within:text-[#0D4433]" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center space-x-5 mb-10">
            <div class="p-3 bg-[#E7F3F0] text-[#0D4433] rounded-xl shadow-inner">
              <MessageSquare class="w-6 h-6" />
            </div>
            <h3 class="text-[20px] font-[800] text-slate-800 tracking-tight">Kontak Penyelenggara</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Nama Penyelenggara</label>
              <input type="text" v-model="form.organizer_name" placeholder="Nama Komunitas/PT" 
                class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-5 px-6 text-[15px] text-slate-700 font-medium outline-none focus:bg-white placeholder:text-slate-300" />
            </div>
            <div>
              <label class="block text-[13px] font-[700] text-slate-700 mb-2.5">Nomor WhatsApp <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.organizer_contact" placeholder="0812xxxxxx" 
                class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-5 px-6 text-[15px] text-slate-700 font-medium outline-none focus:bg-white placeholder:text-slate-300" />
            </div>
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
                <p class="text-[15px] font-[700] text-slate-800 mb-2 leading-none">Poster Dipilih</p>
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
            <span>Publikasi</span>
          </div>
          
          <div class="space-y-4">
            <label class="flex items-center p-5 bg-[#F1F5F9] border-2 border-transparent hover:border-[#0D4433]/10 rounded-[1.5rem] cursor-pointer transition-all">
              <input type="radio" v-model="form.status" value="pending" class="w-6 h-6 text-[#0D4433] border-slate-300 focus:ring-0 cursor-pointer mr-5" />
              <div>
                <p class="text-[14px] font-[700] text-slate-800 leading-none mb-2">Draft</p>
                <p class="text-[11px] text-slate-400 font-medium">Simpan untuk diedit nanti</p>
              </div>
            </label>
            <label class="flex items-center p-5 bg-white border-2 border-slate-50 hover:border-[#0D4433]/10 rounded-[1.5rem] cursor-pointer transition-all shadow-sm">
              <input type="radio" v-model="form.status" value="publish" class="w-6 h-6 text-[#0D4433] border-slate-300 focus:ring-0 cursor-pointer mr-5" />
              <div>
                <p class="text-[14px] font-[700] text-slate-800 leading-none mb-2">Published</p>
                <p class="text-[11px] text-slate-400 font-medium">Langsung tayang di website</p>
              </div>
            </label>
          </div>

          <button @click="submitForm" :disabled="isSubmitting" class="w-full bg-[#0D4433] text-white py-5 rounded-[1.5rem] font-[700] text-[15px] shadow-xl shadow-[#0d4433]/20 hover:bg-[#0a3528] active:scale-[0.98] transition-all flex items-center justify-center tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-else>Simpan</span>
          </button>
          
          <div class="p-5 bg-[#E7F3F0]/50 rounded-2xl border border-[#0D4433]/5">
             <p class="text-[10px] text-slate-500 font-medium flex items-start space-x-3 leading-relaxed">
               <Info class="w-3.5 h-3.5 mt-0.5 text-[#0D4433] shrink-0" />
               <span>Admin akan meninjau kelengkapan data sebelum tiket dapat dibeli oleh pengguna.</span>
             </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[11px] font-[700] text-slate-300 uppercase tracking-[0.2em]">
       <p>© 2026 Eotech Tiket Management System. All rights reserved.</p>
       <div class="flex space-x-8">
          <a href="#" class="hover:text-slate-500">Panduan</a>
          <a href="#" class="hover:text-slate-500">Syarat</a>
          <a href="#" class="hover:text-slate-500">Support</a>
       </div>
    </div>
  </div>
</template>

<style scoped>
textarea { resize: none; }
input:focus, textarea:focus { background-color: white !important; }
</style>