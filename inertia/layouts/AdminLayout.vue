<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { 
  LayoutDashboard, Calendar, BarChart3, 
  Ticket, Users, LogOut, Bell, Settings, Search 
} from 'lucide-vue-next'

const page = usePage()
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-['Plus_Jakarta_Sans']">
    
    <aside class="w-[260px] bg-white border-r border-slate-100 flex flex-col fixed h-full z-30">
      <div class="p-8 mb-2">
        <h1 class="text-[#0D4433] font-[800] text-[20px] tracking-tight leading-none">
          Eotech Tiket
        </h1>
        <p class="text-slate-400 text-[10px] font-[700] uppercase tracking-[0.15em] mt-2">
          Admin Console
        </p>
      </div>

      <nav class="flex-1 px-4 space-y-1">
        <Link href="/admin/dashboard" 
          :class="[page.url === '/admin/dashboard' ? 'bg-[#E7F3F0] text-[#0D4433]' : 'text-slate-400 hover:bg-slate-50']" 
          class="flex items-center space-x-3.5 px-5 py-3 rounded-2xl transition-all group">
          <LayoutDashboard class="w-5 h-5" :class="page.url === '/admin/dashboard' ? 'text-[#0D4433]' : 'text-slate-300 group-hover:text-slate-500'" />
          <span class="text-[13px] font-[700]">Dashboard</span>
        </Link>

        <Link href="/admin/events" 
          :class="[page.url.startsWith('/admin/events') ? 'bg-[#E7F3F0] text-[#0D4433]' : 'text-slate-400 hover:bg-slate-50']" 
          class="flex items-center space-x-3.5 px-5 py-3 rounded-2xl transition-all group">
          <Calendar class="w-5 h-5" :class="page.url.startsWith('/admin/events') ? 'text-[#0D4433]' : 'text-slate-300 group-hover:text-slate-500'" />
          <span class="text-[13px] font-[700]">Kelola Event</span>
        </Link>

        <Link href="/admin/reports" 
          :class="[page.url === '/admin/reports' ? 'bg-[#E7F3F0] text-[#0D4433]' : 'text-slate-400 hover:bg-slate-50']" 
          class="flex items-center space-x-3.5 px-5 py-3 rounded-2xl transition-all group">
          <BarChart3 class="w-5 h-5" :class="page.url === '/admin/reports' ? 'text-[#0D4433]' : 'text-slate-300 group-hover:text-slate-500'" />
          <span class="text-[13px] font-[700]">Laporan Penjualan</span>
        </Link>

        <Link href="/admin/tickets/quota" 
          :class="[page.url === '/admin/tickets/quota' ? 'bg-[#E7F3F0] text-[#0D4433]' : 'text-slate-400 hover:bg-slate-50']" 
          class="flex items-center space-x-3.5 px-5 py-3 rounded-2xl transition-all group">
          <Ticket class="w-5 h-5" :class="page.url === '/admin/tickets/quota' ? 'text-[#0D4433]' : 'text-slate-300 group-hover:text-slate-500'" />
          <span class="text-[13px] font-[700]">Kuota Tiket</span>
        </Link>

        <Link href="/admin/partners" 
          :class="[page.url === '/admin/partners' ? 'bg-[#E7F3F0] text-[#0D4433]' : 'text-slate-400 hover:bg-slate-50']" 
          class="flex items-center space-x-3.5 px-5 py-3 rounded-2xl transition-all group">
          <Users class="w-5 h-5" :class="page.url === '/admin/partners' ? 'text-[#0D4433]' : 'text-slate-300 group-hover:text-slate-500'" />
          <span class="text-[13px] font-[700]">Kolaborasi Partner</span>
        </Link>
      </nav>

      <div class="p-6 border-t border-slate-50">
        <Link href="/logout" method="post" as="button" 
          class="w-full flex items-center space-x-3.5 px-5 py-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all outline-none">
          <LogOut class="w-5 h-5" />
          <span class="text-[13px] font-[700]">Keluar</span>
        </Link>
      </div>
    </aside>

    <main class="flex-1 ml-[260px] min-h-screen flex flex-col">
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
        <div class="relative w-80">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari transaksi atau data..." 
            class="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-11 text-[13px] focus:ring-1 focus:ring-[#0D4433]/20 transition-all outline-none font-medium" 
          />
        </div>

        <div class="flex items-center space-x-5">
          <button class="p-2 hover:bg-slate-50 rounded-lg transition-colors relative">
            <Bell class="w-5 h-5 text-slate-400" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div class="flex items-center space-x-4 border-l pl-5 border-slate-100">
            <div class="text-right">
              <p class="text-[13px] font-[800] text-slate-800 leading-none">Admin Utama</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">Super Admin</p>
            </div>
            <img src="https://ui-avatars.com/api/?name=Admin+Utama&background=0D4433&color=fff" class="w-10 h-10 rounded-xl shadow-sm border border-slate-100" />
          </div>
        </div>
      </header>

      <div class="p-10 max-w-[1600px] w-full mx-auto flex-1">
        <slot />
      </div>

      <footer class="p-8 text-center text-[11px] text-slate-300 font-bold tracking-[0.2em] uppercase">
        © 2026 Eotech Tiket Management System
      </footer>
    </main>
  </div>
</template>

<style scoped>
.transition-all {
  transition-duration: 300ms;
}
</style>