<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head } from '@inertiajs/vue3'
import { 
  Wallet, Ticket, Clock, TrendingUp, 
  Lightbulb, FileDown, MoreHorizontal, Filter,
  ChevronLeft, ChevronRight, Calendar
} from 'lucide-vue-next'

defineOptions({ layout: AdminLayout })

const categories = [
  { name: 'VIP Experience', sold: 150, total: 200, value: 'Rp 112.500.000', occupancy: 75, color: '#92400E' },
  { name: 'Regular Access', sold: 850, total: 1000, value: 'Rp 127.500.000', occupancy: 85, color: '#0D4433' },
  { name: 'Early Bird', sold: 420, total: 420, value: 'Rp 44.500.000', occupancy: 100, color: '#10B981' },
]
</script>

<template>
  <Head title="Laporan Penjualan - Eotech" />

  <div class="space-y-8 animate-in fade-in duration-700 font-['Plus_Jakarta_Sans']">
    
    <div class="flex justify-between items-start px-2">
      <div class="space-y-1">
        <p class="text-[11px] font-[800] text-[#1D7A65] uppercase tracking-[0.2em] mb-2">Analisis Mendalam</p>
        <h1 class="text-[28px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">Laporan Penjualan Detail</h1>
        <p class="text-slate-400 text-[15px] font-medium mt-3">Pantau performa tiket Anda dengan data real-time dan analisis tren harian.</p>
      </div>

      <div class="bg-white p-1.5 rounded-[1.25rem] border border-slate-100 shadow-sm flex items-center">
        <button class="px-6 py-2.5 bg-[#F8FAFC] text-[#0D4433] rounded-xl text-[12px] font-[800] shadow-sm border border-slate-100/50">7 Hari Terakhir</button>
        <button class="px-6 py-2.5 text-slate-400 text-[12px] font-[700] hover:text-slate-600 transition-colors">30 Hari</button>
        <div class="h-6 w-[1px] bg-slate-100 mx-2"></div>
        <button class="px-6 py-2.5 text-slate-400 text-[12px] font-[700] flex items-center space-x-2">
          <Calendar class="w-4 h-4" /> <span>Pilih Rentang</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(stat, index) in [
        { label: 'Total Pendapatan', val: 'Rp 284.500.000', grow: '+12.5%', icon: Wallet, color: 'text-emerald-500' },
        { label: 'Tiket Terjual', val: '1,420', unit: 'Pcs', grow: '+8.2%', icon: Ticket, color: 'text-emerald-500' },
        { label: 'Rata-rata / Jam', val: '12.4', unit: 'Transaksi', grow: 'Stabil', icon: Clock, color: 'text-amber-500' }
      ]" :key="index" class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm">
        <div class="flex justify-between items-start mb-6">
          <div class="p-4 bg-[#F1F5F9] text-slate-500 rounded-2xl"><component :is="stat.icon" class="w-6 h-6" /></div>
          <span :class="stat.grow === 'Stabil' ? 'text-amber-600 bg-amber-50' : 'text-emerald-500 bg-emerald-50'" class="text-[10px] font-[800] px-3 py-1 rounded-full uppercase tracking-widest">{{ stat.grow }}</span>
        </div>
        <p class="text-[11px] font-[800] text-slate-400 uppercase tracking-[0.2em] mb-2">{{ stat.label }}</p>
        <div class="flex items-baseline space-x-2">
          <h3 class="text-[32px] font-[800] text-slate-800 tracking-tight">{{ stat.val }}</h3>
          <span v-if="stat.unit" class="text-slate-300 font-[700] text-sm">{{ stat.unit }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-10">
        <div class="flex justify-between items-center px-2">
          <h4 class="text-[16px] font-[800] text-slate-800 tracking-tight">Tren Penjualan Harian</h4>
          <div class="flex items-center space-x-6">
             <div class="flex items-center space-x-2"><span class="w-2.5 h-2.5 rounded-full bg-[#0D4433]"></span><span class="text-[11px] font-[700] text-slate-400">Pendapatan</span></div>
             <div class="flex items-center space-x-2"><span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span><span class="text-[11px] font-[700] text-slate-400">Target</span></div>
          </div>
        </div>
        
        <div class="flex items-end justify-between h-56 px-6 gap-6">
          <div v-for="h in [30, 45, 80, 50, 100, 70, 40]" :key="h" 
            :class="h === 100 ? 'bg-[#0D4433] shadow-lg shadow-[#0d4433]/20' : 'bg-slate-50'" 
            class="flex-1 rounded-2xl transition-all duration-500 relative"
            :style="{ height: h + '%' }">
            <span v-if="h === 100" class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-[800] text-slate-800">JUM</span>
          </div>
        </div>
        <div class="flex justify-between px-6 text-[10px] font-[800] text-slate-300 uppercase tracking-widest pt-4">
          <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span></span><span>Sab</span><span>Min</span>
        </div>

        <div class="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 flex items-center space-x-5">
           <div class="p-3 bg-white rounded-xl shadow-sm text-[#0D4433]"><Lightbulb class="w-5 h-5" /></div>
           <p class="text-[13px] text-slate-500 font-medium leading-relaxed">
             Penjualan tertinggi terjadi pada hari **Kamis**, dipicu oleh rilis kategori <span class="text-slate-800 font-bold">Early Bird Batch II</span>.
           </p>
        </div>
      </div>

      <div class="lg:col-span-4 bg-[#0D4433] p-10 rounded-[2.5rem] flex flex-col items-center justify-between relative overflow-hidden shadow-2xl shadow-[#0d4433]/20">
        <div class="w-full text-left space-y-1 relative z-10">
          <h4 class="text-white font-[800] text-[18px] tracking-tight">Target Penjualan</h4>
          <p class="text-emerald-100/50 text-[13px] font-medium">Target bulanan: 2.000 Tiket</p>
        </div>

        <div class="relative flex items-center justify-center my-10 z-10">
          <svg class="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="70" stroke="currentColor" stroke-width="12" fill="transparent" class="text-emerald-900/30" />
            <circle cx="96" cy="96" r="70" stroke="currentColor" stroke-width="12" fill="transparent" stroke-dasharray="440" stroke-dashoffset="123" class="text-emerald-400 rounded-full" />
          </svg>
          <div class="absolute text-center">
            <span class="text-[36px] font-[800] text-white leading-none block">72%</span>
          </div>
        </div>

        <button class="w-full bg-white text-[#0D4433] py-4 rounded-[1.25rem] font-[800] text-[13px] uppercase tracking-wider shadow-xl shadow-black/10 transition-transform active:scale-95 relative z-10">
          Unduh Laporan PDF
        </button>

        <div class="absolute top-10 right-10 opacity-10"><TrendingUp class="w-24 h-24 text-white" /></div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
      <div class="p-8 border-b border-slate-50 flex justify-between items-center">
        <h4 class="text-[17px] font-[800] text-slate-800 tracking-tight">Breakdown Penjualan Kategori</h4>
        <div class="flex space-x-3">
          <button class="p-2.5 text-slate-400 hover:text-slate-600 transition-colors"><Filter class="w-5 h-5" /></button>
          <button class="p-2.5 text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal class="w-5 h-5" /></button>
        </div>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] font-[800] text-slate-300 uppercase tracking-[0.2em] bg-slate-50/50">
            <th class="px-10 py-5">Kategori Tiket</th>
            <th class="px-10 py-5 text-center">Tiket Terjual</th>
            <th class="px-10 py-5 text-center">Total Nilai</th>
            <th class="px-10 py-5">Okupansi Kuota</th>
            <th class="px-10 py-5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="cat in categories" :key="cat.name" class="group hover:bg-slate-50/30 transition-all duration-300">
            <td class="px-10 py-7">
              <div class="flex items-center space-x-4">
                <span :style="{ backgroundColor: cat.color }" class="w-2 h-2 rounded-full"></span>
                <span class="text-[15px] font-[800] text-slate-800 tracking-tight">{{ cat.name }}</span>
              </div>
            </td>
            <td class="px-10 py-7 text-center">
              <span class="text-[15px] font-[700] text-slate-500">{{ cat.sold }} / {{ cat.total }}</span>
            </td>
            <td class="px-10 py-7 text-center">
              <span class="text-[15px] font-[800] text-[#0D4433] tracking-tight">{{ cat.value }}</span>
            </td>
            <td class="px-10 py-7">
              <div class="flex flex-col space-y-2 w-48">
                <div class="flex justify-between items-center text-[11px] font-[800]">
                  <span :class="cat.occupancy === 100 ? 'text-emerald-500' : 'text-slate-400'">{{ cat.occupancy === 100 ? 'Full (100%)' : cat.occupancy + '%' }}</span>
                </div>
                <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div :style="{ width: cat.occupancy + '%', backgroundColor: cat.occupancy === 100 ? '#10B981' : cat.color }" class="h-full rounded-full transition-all duration-1000"></div>
                </div>
              </div>
            </td>
            <td class="px-10 py-7 text-right pr-12">
              <button class="p-2 text-slate-300 hover:text-slate-600 transition-colors"><TrendingUp class="w-4 h-4" /></button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="px-10 py-6 flex justify-between items-center bg-slate-50/30 border-t border-slate-50">
        <p class="text-[11px] font-[800] text-slate-400 uppercase tracking-widest italic">Terakhir diperbarui: Hari ini, 14:32 WIB</p>
        <div class="flex space-x-3">
          <button class="p-2 border border-slate-100 rounded-xl text-slate-300 hover:bg-white transition-all"><ChevronLeft class="w-4 h-4" /></button>
          <button class="w-9 h-9 bg-[#0D4433] text-white rounded-xl text-[12px] font-[800]">1</button>
          <button class="w-9 h-9 text-slate-400 font-[800] text-[12px] hover:bg-white rounded-xl">2</button>
          <button class="p-2 border border-slate-100 rounded-xl text-slate-300 hover:bg-white transition-all"><ChevronRight class="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  </div>
</template>