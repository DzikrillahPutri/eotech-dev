<script setup lang="ts">
import AdminLayout from '../../layouts/AdminLayout.vue'
import { Head } from '@inertiajs/vue3'
import { 
  Ticket, Wallet, Calendar, Users, FileText, 
  Download, Sparkles, MoreVertical, LayoutDashboard 
} from 'lucide-vue-next'

defineOptions({ layout: AdminLayout })

const recentEvents = [
  { id: 1, title: 'Festival Gema Suara 2024', date: '12 Des 2024', location: 'Istora Senayan', status: 'PUBLISHED', quota: 1000, sold: 820, revenue: 'Rp 410.000.000' },
  { id: 2, title: 'Tech Summit Indonesia', date: '20 Jan 2025', location: 'ICE BSD', status: 'DRAFT', quota: 500, sold: 0, revenue: 'Rp 0' },
  { id: 3, title: 'Jazz Night Under The Stars', date: '15 Nov 2024', location: 'Taman Mini', status: 'PUBLISHED', quota: 200, sold: 185, revenue: 'Rp 27.750.000' },
]
</script>

<template>
  <Head title="Dashboard - Eotech Tiket" />

  <div class="space-y-8 animate-in fade-in duration-700">
    <div class="flex justify-between items-end">
      <div class="space-y-1">
        <h1 class="text-[26px] font-extrabold text-slate-800 tracking-tight">Ringkasan Performa</h1>
        <p class="text-slate-400 text-[13px] font-medium">Update terakhir: Hari ini, 09:42 WIB</p>
      </div>
      <div class="flex space-x-3">
        <button class="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
          <FileText class="w-4 h-4" /> <span>Laporan Peserta</span> <Download class="w-4 h-4 ml-1" />
        </button>
        <button class="flex items-center space-x-2 px-6 py-2.5 bg-[#0D4433] rounded-xl text-[13px] font-bold text-white hover:bg-[#0a3528] transition-all shadow-lg shadow-[#0d4433]/20">
          <LayoutDashboard class="w-4 h-4" /> <span>Ekspor CSV Transaksi</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="(stat, index) in [
        { label: 'Total Tiket Terjual', value: '1,240', grow: '+12.5%', icon: Ticket },
        { label: 'Pendapatan Kotor', value: 'Rp 1.5M', grow: '+8.2%', icon: Wallet },
        { label: 'Event Aktif', value: '5', icon: Calendar },
        { label: 'Total Peserta', value: '3,200', grow: '+245', icon: Users }
      ]" :key="index" class="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-5">
          <div class="p-3 bg-[#E7F3F0] rounded-xl text-[#0D4433]">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span v-if="stat.grow" class="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">{{ stat.grow }}</span>
        </div>
        <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mb-1.5">{{ stat.label }}</p>
        <h3 class="text-[28px] font-extrabold text-slate-800 tracking-tight">{{ stat.value }}</h3>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
        <div class="flex justify-between items-center mb-10 px-2">
          <h4 class="text-[15px] font-extrabold text-slate-800">Tren Penjualan 7 Hari Terakhir</h4>
          <div class="bg-slate-50 px-4 py-2 rounded-xl text-[11px] font-bold text-slate-500 flex items-center space-x-2 cursor-pointer border border-slate-100">
            <span>7 Hari Terakhir</span> <MoreVertical class="w-3 h-3 rotate-90" />
          </div>
        </div>
        
        <div class="flex items-end justify-between h-52 px-6 gap-5">
          <div class="flex-1 bg-slate-50 rounded-xl h-[40%] hover:bg-emerald-50 transition-colors"></div>
          <div class="flex-1 bg-slate-50 rounded-xl h-[60%] hover:bg-emerald-50 transition-colors"></div>
          <div class="flex-1 bg-slate-50 rounded-xl h-[85%] hover:bg-emerald-50 transition-colors"></div>
          <div class="flex-1 bg-slate-50 rounded-xl h-[55%] hover:bg-emerald-50 transition-colors"></div>
          <div class="flex-1 bg-[#0D4433] rounded-xl h-[100%] relative shadow-lg shadow-[#0d4433]/20">
             <span class="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[11px] font-black text-slate-800">JUM</span>
          </div>
          <div class="flex-1 bg-slate-50 rounded-xl h-[78%] hover:bg-emerald-50 transition-colors"></div>
          <div class="flex-1 bg-slate-50 rounded-xl h-[35%] hover:bg-emerald-50 transition-colors"></div>
        </div>
        <div class="flex justify-between px-6 mt-10">
            <span v-for="day in ['SEN','SEL','RAB','KAM','','SAB','MIN']" :key="day" class="flex-1 text-center text-[10px] font-extrabold text-slate-300 tracking-widest">{{day}}</span>
        </div>
      </div>

      <div class="lg:col-span-4 bg-[#1D7A65] p-9 rounded-[2.5rem] text-white flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-emerald-900/10">
        <div class="relative z-10">
          <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
            <Sparkles class="w-6 h-6 text-emerald-300" />
          </div>
          <h4 class="text-[24px] font-extrabold leading-tight mb-4 tracking-tight">Insight Mingguan</h4>
          <p class="text-emerald-50/70 text-[14px] leading-relaxed font-medium">
            Penjualan tiket konser "Gema Suara" meningkat 40% setelah kampanye media sosial kemarin.
          </p>
        </div>
        <button class="w-full bg-white text-[#1D7A65] py-4.5 rounded-[1.25rem] font-extrabold text-sm mt-10 transition-all hover:bg-emerald-50 active:scale-95 shadow-xl shadow-black/5 relative z-10">
          Lihat Analitik Lengkap
        </button>
        <div class="absolute -bottom-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div class="absolute -top-16 -left-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </div>

    <div class="space-y-5 pb-12">
      <div class="flex justify-between items-center px-2">
        <h4 class="text-[15px] font-extrabold text-slate-800">Event Terbaru</h4>
        <button class="text-[#0D4433] text-[12px] font-black hover:opacity-70 transition-opacity uppercase tracking-wider">Lihat Semua Event</button>
      </div>
      
      <div class="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
        <table class="w-full text-left">
          <thead>
            <tr class="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/50 border-b border-slate-50">
              <th class="px-10 py-5">Detail Event</th>
              <th class="px-10 py-5">Status</th>
              <th class="px-10 py-5 text-center">Progres Kuota</th>
              <th class="px-10 py-5 text-right">Penjualan</th>
              <th class="px-10 py-5 pr-12 text-right"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="event in recentEvents" :key="event.id" class="group hover:bg-slate-50/30 transition-all duration-300">
              <td class="px-10 py-6">
                <div class="flex items-center space-x-5">
                  <div class="w-13 h-13 bg-slate-100 rounded-[1.25rem] overflow-hidden flex items-center justify-center border border-slate-50">
                    <img v-if="event.id === 1" src="https://ui-avatars.com/api/?name=G&background=0D4433&color=fff" />
                    <img v-else-if="event.id === 2" src="https://ui-avatars.com/api/?name=T&background=334155&color=fff" />
                    <img v-else src="https://ui-avatars.com/api/?name=J&background=9333ea&color=fff" />
                  </div>
                  <div>
                    <p class="text-[14px] font-extrabold text-slate-800 group-hover:text-[#0D4433] transition-colors leading-tight mb-1">{{ event.title }}</p>
                    <p class="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{{ event.date }} • {{ event.location }}</p>
                  </div>
                </div>
              </td>
              <td class="px-10 py-6">
                <span :class="event.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'" class="px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest">
                  {{ event.status }}
                </span>
              </td>
              <td class="px-10 py-6">
                <div class="flex items-center justify-center space-x-5 max-w-[240px] mx-auto">
                    <span class="text-[11px] font-extrabold text-slate-500 min-w-[70px]">{{ event.sold }} / {{ event.quota }}</span>
                    <div class="h-2 flex-1 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <div class="h-full bg-[#0D4433] rounded-full transition-all duration-1000" :style="{ width: (event.sold/event.quota)*100 + '%' }"></div>
                    </div>
                    <span class="text-[11px] font-bold text-slate-300">{{ Math.round((event.sold/event.quota)*100) }}%</span>
                </div>
              </td>
              <td class="px-10 py-6 text-right">
                <p class="text-[14px] font-black text-slate-700 tracking-tight">{{ event.revenue }}</p>
              </td>
              <td class="px-10 py-6 text-right pr-12">
                <button class="p-2.5 hover:bg-slate-50 rounded-xl transition-colors">
                  <MoreVertical class="w-5 h-5 text-slate-300 hover:text-slate-600" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-slate-50/50 py-5 text-center border-t border-slate-50">
             <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Menampilkan 3 dari 5 event aktif</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Menghaluskan font di macOS/Chrome */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Transisi Progress Bar */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>