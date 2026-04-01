<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head } from '@inertiajs/vue3'
import { 
  Wand2, Filter, Download, 
  ChevronLeft, ChevronRight, ShieldCheck, 
  QrCode, History, Info, Users
} from 'lucide-vue-next'

defineOptions({ layout: AdminLayout })

const collaborators = [
  { id: 1, name: 'Andi Saputra', email: 'andi.saputra@events.co.id', role: 'Partner EO', status: 'Active', initials: 'AS', color: 'bg-emerald-100 text-emerald-600' },
  { id: 2, name: 'Rina Melati', email: 'rina.m@staff.eotech.id', role: 'Gate Staff', status: 'Invited', initials: 'RM', color: 'bg-blue-100 text-blue-600' },
  { id: 3, name: 'Deni Kurnia', email: 'denikur@mail.com', role: 'Gate Staff', status: 'Expired', initials: 'DK', color: 'bg-slate-100 text-slate-400' },
  { id: 4, name: 'Siti Maryam', email: 'siti.maryam@production.id', role: 'Partner EO', status: 'Active', initials: 'SM', color: 'bg-teal-100 text-teal-600' },
]
</script>

<template>
  <Head title="Kolaborasi Partner - Eotech" />

  <div class="space-y-10 animate-in fade-in duration-700 font-['Plus_Jakarta_Sans']">
    
    <div class="px-2">
      <div class="space-y-2">
        <h1 class="text-[32px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">Kolaborasi Partner</h1>
        <p class="text-slate-400 text-[15px] font-medium leading-relaxed max-w-2xl">
          Kelola akses staff lapangan dan partner penyelenggara acara Anda. <br>
          Gunakan Magic Link untuk mengundang kolaborator baru dengan aman.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div class="lg:col-span-4 space-y-8">
        
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center space-x-4 mb-8">
            <div class="p-3 bg-orange-50 text-orange-600 rounded-xl shadow-inner"><Wand2 class="w-6 h-6" /></div>
            <h3 class="text-[18px] font-[800] text-slate-800 tracking-tight">Buat Magic Link</h3>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-[11px] font-[800] text-slate-400 uppercase tracking-widest mb-2.5">Nama Lengkap</label>
              <input type="text" placeholder="e.g. Budi Santoso" class="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-[14px] font-medium focus:ring-2 focus:ring-[#0D4433]/10 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-[11px] font-[800] text-slate-400 uppercase tracking-widest mb-2.5">Email Partner</label>
              <input type="email" placeholder="budi@email.com" class="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-[14px] font-medium focus:ring-2 focus:ring-[#0D4433]/10 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-[11px] font-[800] text-slate-400 uppercase tracking-widest mb-2.5">Peran (Role)</label>
              <div class="relative">
                <select class="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-[14px] font-bold text-slate-600 focus:ring-2 focus:ring-[#0D4433]/10 outline-none appearance-none cursor-pointer">
                  <option>Partner EO</option>
                  <option>Gate Staff</option>
                </select>
                <ChevronRight class="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 rotate-90" />
              </div>
            </div>
            <button class="w-full bg-[#0D4433] text-white py-4 rounded-xl font-[800] text-[14px] shadow-lg shadow-[#0d4433]/10 hover:bg-[#0a3528] transition-all active:scale-95">
              Generate Magic Link
            </button>
            
            <div class="p-4 bg-orange-50/50 rounded-xl border border-orange-100 flex items-start space-x-3">
               <div class="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-[10px] shrink-0 mt-0.5 font-bold italic">i</div>
               <p class="text-[11px] text-orange-800 leading-relaxed">
                 <span class="font-bold">Penting:</span> Magic Link akan dikirim ke email tujuan dan hanya berlaku selama 24 jam demi keamanan.
               </p>
            </div>
          </div>
        </div>

        <div class="bg-[#0D4433] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-[#0d4433]/20 relative overflow-hidden">
           <p class="text-[11px] font-[800] uppercase tracking-widest opacity-50 mb-6">Ringkasan Tim</p>
           <div class="space-y-8 relative z-10">
              <div class="flex justify-between items-end">
                <div><p class="text-[14px] font-medium text-emerald-100">Partner Aktif</p></div>
                <div class="text-right"><p class="text-[24px] font-[800]">12</p></div>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full w-[60%] bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></div>
              </div>
              <div class="flex justify-between items-end">
                <div><p class="text-[14px] font-medium text-emerald-100">Gate Staff Lapangan</p></div>
                <div class="text-right"><p class="text-[24px] font-[800]">48</p></div>
              </div>
           </div>
           <Users class="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
        </div>
      </div>

      <div class="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden flex flex-col min-h-[600px] transition-all hover:shadow-md">
        <div class="p-8 border-b border-slate-50 flex justify-between items-center">
          <h4 class="text-[18px] font-[800] text-slate-800 tracking-tight">Daftar Kolaborator</h4>
          <div class="flex space-x-3 text-slate-400">
             <button class="p-2.5 hover:text-slate-600 transition-colors"><Filter class="w-5 h-5" /></button>
             <button class="p-2.5 hover:text-slate-600 transition-colors"><Download class="w-5 h-5" /></button>
          </div>
        </div>

        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-[800] text-slate-300 uppercase tracking-widest border-b border-slate-50 bg-slate-50/30">
              <th class="px-8 py-5">Nama & Email</th>
              <th class="px-8 py-5">Peran</th>
              <th class="px-8 py-5">Status</th>
              <th class="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="col in collaborators" :key="col.id" class="group hover:bg-slate-50/50 transition-all duration-300">
              <td class="px-8 py-6">
                <div class="flex items-center space-x-4">
                  <div :class="col.color" class="w-10 h-10 rounded-xl flex items-center justify-center font-[800] text-[13px] shadow-sm">
                    {{ col.initials }}
                  </div>
                  <div>
                    <p class="text-[14px] font-[800] text-slate-800 leading-none mb-1.5">{{ col.name }}</p>
                    <p class="text-[12px] text-slate-400 font-medium">{{ col.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span class="text-[10px] font-[800] px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-tight">
                  {{ col.role }}
                </span>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center space-x-2">
                  <span :class="{
                    'bg-emerald-500': col.status === 'Active',
                    'bg-amber-500': col.status === 'Invited',
                    'bg-rose-500': col.status === 'Expired'
                  }" class="w-1.5 h-1.5 rounded-full"></span>
                  <span class="text-[13px] font-[800]" :class="{
                    'text-slate-800': col.status === 'Active',
                    'text-amber-600': col.status === 'Invited',
                    'text-rose-600': col.status === 'Expired'
                  }">{{ col.status }}</span>
                </div>
              </td>
              <td class="px-8 py-6 text-right">
                <div class="flex items-center justify-end space-x-4">
                  <button v-if="col.status !== 'Active'" class="text-[11px] font-[800] text-teal-600 hover:text-[#0D4433] transition-colors">Resend</button>
                  <button class="text-[11px] font-[800] text-rose-600 hover:text-rose-800 transition-colors">Revoke</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-auto px-8 py-6 flex justify-between items-center bg-slate-50/30 border-t border-slate-50">
           <p class="text-[12px] font-medium text-slate-400 italic">Menampilkan 4 dari 60 partner aktif</p>
           <div class="flex space-x-3 text-slate-300">
             <button class="w-9 h-9 border border-slate-100 rounded-xl hover:bg-white hover:text-[#0D4433] transition-all flex items-center justify-center shadow-sm"><ChevronLeft class="w-4 h-4" /></button>
             <button class="w-9 h-9 border border-slate-100 rounded-xl hover:bg-white hover:text-[#0D4433] transition-all flex items-center justify-center shadow-sm"><ChevronRight class="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
      <div v-for="(info, i) in [
        { title: 'Keamanan Terjamin', desc: 'Setiap akses staff dibatasi hanya pada fitur yang mereka butuhkan tanpa akses ke data finansial.', icon: ShieldCheck },
        { title: 'Staff Lapangan (Gate)', desc: 'Berikan akses scanning tiket tanpa perlu login password, cukup klik link dari email mereka.', icon: QrCode },
        { title: 'Log Aktivitas', desc: 'Pantau aktivitas setiap staff secara real-time untuk transparansi operasional acara Anda.', icon: History }
      ]" :key="i" class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm text-center flex flex-col items-center group hover:shadow-md transition-all">
         <div class="p-4 bg-slate-50 text-slate-400 rounded-2xl mb-8 group-hover:bg-[#E7F3F0] group-hover:text-[#0D4433] transition-colors"><component :is="info.icon" class="w-8 h-8" /></div>
         <h5 class="text-[16px] font-[800] text-slate-800 mb-4">{{ info.title }}</h5>
         <p class="text-[13px] text-slate-400 leading-relaxed font-medium px-4">{{ info.desc }}</p>
      </div>
    </div>

  </div>
</template>