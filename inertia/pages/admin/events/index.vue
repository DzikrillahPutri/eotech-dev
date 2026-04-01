<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head, Link } from '@inertiajs/vue3'
import { 
  Plus, Search, Eye, Edit2, Rocket, Clock, 
  CheckCircle, FileText, Trash2, ChevronLeft, 
  ChevronRight, Lightbulb, MapPin, Calendar 
} from 'lucide-vue-next'

defineOptions({ layout: AdminLayout })

const events = [
  { id: 'EVT-98210', title: 'Jakarta Tech Summit 2024', category: 'Konferensi', date: '12 Okt 2023', status: 'AKTIF', poster: 'https://ui-avatars.com/api/?name=JTS&background=0D4433&color=fff' },
  { id: 'EVT-00412', title: 'Sound of Java: Indie Fest', category: 'Konser', date: '05 Nov 2023', status: 'DRAFT', poster: 'https://ui-avatars.com/api/?name=SOJ&background=334155&color=fff' },
  { id: 'EVT-11523', title: 'Night Beats: EDM Night', category: 'Hiburan', date: '02 Nov 2023', status: 'DRAFT', poster: 'https://ui-avatars.com/api/?name=NB&background=9333ea&color=fff' },
  { id: 'EVT-55290', title: 'Business Mastery Workshop', category: 'Workshop', date: '28 Okt 2023', status: 'MENUNGGU REVIEW', poster: 'https://ui-avatars.com/api/?name=BMW&background=ea580c&color=fff' },
]
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
        { label: 'Total Draf', val: '12', icon: FileText, color: 'text-slate-500', bg: 'bg-[#F1F5F9]' },
        { label: 'Menunggu Review', val: '04', icon: Clock, color: 'text-[#C2410C]', bg: 'bg-[#FFEDD5]' },
        { label: 'Event Aktif', val: '28', icon: CheckCircle, color: 'text-[#059669]', bg: 'bg-[#D1FAE5]' }
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
      <div class="p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 class="text-[16px] font-[800] text-slate-800 tracking-tight">Daftar Event Terbaru</h3>
        <div class="flex bg-slate-50 p-1.5 rounded-2xl space-x-1 border border-slate-100">
          <button class="px-5 py-2 bg-white shadow-sm rounded-xl text-[11px] font-[800] text-slate-700 tracking-tight">Semua</button>
          <button class="px-5 py-2 text-[11px] font-[800] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Aktif</button>
          <button class="px-5 py-2 text-[11px] font-[800] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Draft</button>
        </div>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] font-[800] text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
            <th class="px-10 py-5">Poster & Nama Event</th>
            <th class="px-10 py-5">Kategori</th>
            <th class="px-10 py-5">Tanggal Dibuat</th>
            <th class="px-10 py-5">Status</th>
            <th class="px-10 py-5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="event in events" :key="event.id" class="group hover:bg-slate-50/30 transition-all duration-300">
            <td class="px-10 py-6">
              <div class="flex items-center space-x-5">
                <img :src="event.poster" class="w-13 h-16 rounded-[1.25rem] object-cover shadow-sm group-hover:scale-105 transition-transform duration-500" />
                <div>
                  <p class="text-[15px] font-[800] text-slate-800 group-hover:text-[#0D4433] transition-colors leading-tight mb-1.5 tracking-tight">{{ event.title }}</p>
                  <p class="text-[11px] text-slate-400 font-[700] tracking-tight uppercase">ID: {{ event.id }}</p>
                </div>
              </div>
            </td>
            <td class="px-10 py-6">
              <span class="px-3.5 py-1.5 bg-slate-100 text-slate-500 text-[9px] font-[800] rounded-full uppercase tracking-widest">{{ event.category }}</span>
            </td>
            <td class="px-10 py-6 text-[12px] font-[700] text-slate-500 tracking-tight">{{ event.date }}</td>
            <td class="px-10 py-6">
              <span :class="{
                'text-emerald-500 bg-emerald-50': event.status === 'AKTIF',
                'text-slate-400 bg-slate-50': event.status === 'DRAFT',
                'text-orange-500 bg-orange-50': event.status === 'MENUNGGU REVIEW',
              }" class="flex items-center space-x-2 text-[10px] font-[800] px-3.5 py-1.5 rounded-full inline-flex tracking-widest border border-current/10">
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>{{ event.status }}</span>
              </span>
            </td>
            <td class="px-10 py-6 text-right">
              <div v-if="event.status === 'DRAFT'" class="flex items-center justify-end space-x-3">
                <button class="flex items-center space-x-2 px-4 py-2 border border-slate-100 rounded-xl text-[11px] font-[800] text-slate-600 hover:bg-slate-50 transition-all"><Eye class="w-3.5 h-3.5" /> <span>PRATINJAU</span></button>
                <button class="flex items-center space-x-2 px-4 py-2 bg-[#E7F3F0] text-[#0D4433] rounded-xl text-[11px] font-[800] hover:bg-[#d5e9e3] transition-all"><Rocket class="w-3.5 h-3.5" /> <span>PUBLIKASIKAN</span></button>
              </div>
              <div v-else class="flex items-center justify-end space-x-4 text-slate-300">
                <button class="hover:text-[#0D4433] transition-colors"><Eye class="w-5 h-5" /></button>
                <button class="hover:text-rose-500 transition-colors" v-if="event.status === 'MENUNGGU REVIEW'"><Trash2 class="w-5 h-5" /></button>
                <button class="hover:text-[#0D4433] transition-colors" v-else><Edit2 class="w-5 h-5" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="px-10 py-6 bg-slate-50/50 flex justify-between items-center border-t border-slate-50">
        <p class="text-[11px] font-[800] text-slate-400 uppercase tracking-[0.2em]">Menampilkan 4 dari 44 event</p>
        <div class="flex items-center space-x-3">
          <button class="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all"><ChevronLeft class="w-4 h-4" /></button>
          <button class="w-9 h-9 bg-[#0D4433] text-white rounded-xl text-[12px] font-[800] shadow-lg shadow-[#0d4433]/20">1</button>
          <button class="w-9 h-9 text-slate-400 text-[12px] font-[800] hover:bg-white hover:text-slate-600 rounded-xl transition-all">2</button>
          <button class="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all"><ChevronRight class="w-4 h-4" /></button>
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