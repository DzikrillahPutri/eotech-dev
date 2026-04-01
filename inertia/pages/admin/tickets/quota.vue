<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
// 1. PERBAIKAN: Tambahkan "Link" ke dalam import
import { Head, Link } from '@inertiajs/vue3' 
import { 
  Plus, FileText, Download, Edit2, 
  TrendingUp, AlertTriangle, XCircle, Zap, Bell
} from 'lucide-vue-next'

defineOptions({ layout: AdminLayout })

const quotaData = [
  { id: 1, event: 'Java Jazz Festival 2024', category: 'VIP', quota: 500, sold: 120, remaining: 380, status: 'AVAILABLE', thumb: 'https://ui-avatars.com/api/?name=JJ&background=0D4433&color=fff' },
  { id: 2, event: 'Tech Indonesia Summit', category: 'EARLY BIRD', quota: 1000, sold: 985, remaining: 15, status: 'LOW STOCK', thumb: 'https://ui-avatars.com/api/?name=TI&background=0369a1&color=fff' },
  { id: 3, event: 'Contemporary Art Expo', category: 'REGULAR', quota: 2500, sold: 2500, remaining: 0, status: 'SOLD OUT', thumb: 'https://ui-avatars.com/api/?name=CA&background=334155&color=fff' },
  { id: 4, event: 'Jakarta Culinary Night', category: 'VIP', quota: 300, sold: 145, remaining: 155, status: 'AVAILABLE', thumb: 'https://ui-avatars.com/api/?name=JC&background=92400e&color=fff' },
  { id: 5, event: 'Standup Special: Radical', category: 'EARLY BIRD', quota: 400, sold: 388, remaining: 12, status: 'LOW STOCK', thumb: 'https://ui-avatars.com/api/?name=SR&background=7e22ce&color=fff' },
]
</script>

<template>
  <Head title="Manajemen Kuota - Eotech" />

  <div class="space-y-10 animate-in fade-in duration-700 font-['Plus_Jakarta_Sans']">
    
    <div class="flex justify-between items-end px-2">
      <div class="space-y-1">
        <h1 class="text-[32px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">Manajemen Kuota Tiket</h1>
        <p class="text-slate-400 text-[15px] font-medium mt-3">Pantau ketersediaan stok tiket secara real-time untuk semua event aktif.</p>
      </div>
      <div class="flex space-x-3">
        <button class="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-100 rounded-xl text-[13px] font-[700] text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
          <Download class="w-4 h-4" /> <span>Ekspor Laporan</span>
        </button>

        <Link 
          href="/admin/tickets/quota/create" 
          class="flex items-center space-x-2 px-6 py-3 bg-[#0D4433] text-white rounded-xl text-[13px] font-[700] hover:bg-[#0a3528] transition-all shadow-lg shadow-[#0d4433]/20"
        >
          <Plus class="w-4 h-4" /> <span>Tambah Kuota</span>
        </Link>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="(stat, index) in [
        { label: 'Total Tiket Tersedia', val: '12,450', sub: '+12% MoM', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Tiket Terjual', val: '8,120', sub: '65% dari total kuota', icon: FileText, color: 'text-slate-400', bg: 'bg-slate-50' },
        { label: 'Stok Menipis (Low)', val: '14', sub: 'Kategori di bawah 15%', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Habis Terjual', val: '5', sub: 'Segera restock jika memungkinkan', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' }
      ]" :key="index" class="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
        <p class="text-[10px] font-[800] text-slate-400 uppercase tracking-[0.2em] mb-4">{{ stat.label }}</p>
        <h3 class="text-[32px] font-[800] text-slate-800 tracking-tight leading-none mb-4">{{ stat.val }}</h3>
        <div class="flex items-center space-x-2">
           <span v-if="stat.icon && index === 0" class="text-emerald-500"><component :is="stat.icon" class="w-3.5 h-3.5" /></span>
           <p class="text-[11px] font-[700]" :class="index === 0 ? 'text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md' : 'text-slate-300'">{{ stat.sub }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
      <div class="p-8 border-b border-slate-50 flex justify-between items-center">
        <div class="flex space-x-4">
          <select class="bg-slate-50 border-none rounded-xl px-5 py-3 text-[13px] font-[700] text-slate-600 outline-none focus:ring-2 focus:ring-[#0D4433]/10">
            <option>Semua Event</option>
          </select>
          <select class="bg-slate-50 border-none rounded-xl px-5 py-3 text-[13px] font-[700] text-slate-600 outline-none focus:ring-2 focus:ring-[#0D4433]/10">
            <option>Semua Status</option>
          </select>
        </div>
        <p class="text-[11px] font-[700] text-slate-300 italic">Menampilkan 24 kategori tiket</p>
      </div>

      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] font-[800] text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50 border-b border-slate-50">
            <th class="px-10 py-5">Nama Event</th>
            <th class="px-10 py-5 text-center">Kategori</th>
            <th class="px-10 py-5 text-center">Total Kuota</th>
            <th class="px-10 py-5 text-center">Terjual</th>
            <th class="px-10 py-5 text-center">Sisa</th>
            <th class="px-10 py-5">Status</th>
            <th class="px-10 py-5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="item in quotaData" :key="item.id" class="group hover:bg-slate-50/30 transition-all duration-300">
            <td class="px-10 py-6">
              <div class="flex items-center space-x-4">
                <img :src="item.thumb" class="w-10 h-10 rounded-xl object-cover" />
                <span class="text-[14px] font-[700] text-slate-800 leading-tight">{{ item.event }}</span>
              </div>
            </td>
            <td class="px-10 py-6 text-center">
              <span class="text-[9px] font-[800] text-purple-500 bg-purple-50 px-2.5 py-1 rounded-md tracking-tighter">{{ item.category }}</span>
            </td>
            <td class="px-10 py-6 text-center text-[14px] font-[700] text-slate-500">{{ item.quota }}</td>
            <td class="px-10 py-6 text-center text-[14px] font-[700] text-slate-500">{{ item.sold }}</td>
            <td class="px-10 py-6 text-center text-[14px] font-[800]" :class="item.remaining < 20 ? 'text-orange-600' : 'text-slate-800'">{{ item.remaining }}</td>
            <td class="px-10 py-6">
              <span :class="{
                'text-emerald-500 bg-emerald-50': item.status === 'AVAILABLE',
                'text-orange-500 bg-orange-50': item.status === 'LOW STOCK',
                'text-rose-500 bg-rose-50': item.status === 'SOLD OUT'
              }" class="flex items-center space-x-2 text-[9px] font-[800] px-3 py-1.5 rounded-full inline-flex tracking-widest uppercase">
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>{{ item.status }}</span>
              </span>
            </td>
            <td class="px-10 py-6 text-right">
              <button class="p-2 text-slate-300 hover:text-[#0D4433] transition-colors"><Edit2 class="w-4 h-4" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 bg-[#0D4433] p-10 rounded-[2.5rem] text-white flex flex-col justify-between relative overflow-hidden">
        <div class="relative z-10 space-y-4">
          <h4 class="text-[24px] font-[800] tracking-tight">Optimalkan Kuota Anda</h4>
          <p class="text-emerald-100/70 text-[15px] max-w-md leading-relaxed font-medium">Gunakan fitur Dynamic Pricing untuk mengatur harga berdasarkan sisa stok yang ada secara otomatis.</p>
        </div>
        <button class="bg-white text-[#0D4433] px-8 py-4 rounded-2xl font-[800] text-[13px] w-fit mt-8 shadow-xl shadow-black/10 relative z-10 transition-transform active:scale-95">
          Aktifkan Dynamic Pricing
        </button>
        <div class="absolute right-10 top-1/2 -translate-y-1/2 opacity-10"><Zap class="w-48 h-48" /></div>
      </div>

      <div class="lg:col-span-4 bg-[#92400e] p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl shadow-amber-900/10">
        <div class="space-y-4">
          <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6"><Bell class="w-6 h-6" /></div>
          <h4 class="text-[20px] font-[800] tracking-tight">Notifikasi Stok</h4>
          <p class="text-amber-100/70 text-[13px] font-medium leading-relaxed">Dapatkan email otomatis saat kuota kategori tertentu di bawah 5%.</p>
        </div>
        
        <div class="flex items-center justify-between mt-10 p-4 bg-black/10 rounded-2xl">
          <span class="text-[11px] font-[800] tracking-widest uppercase">Aktif</span>
          <div class="w-12 h-6 bg-emerald-400 rounded-full relative p-1 cursor-pointer">
            <div class="w-4 h-4 bg-white rounded-full absolute right-1"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>