<script setup>
import { Head } from '@inertiajs/vue3'
import { 
  Search, MapPin, Music, GraduationCap, Compass, Trophy, 
  Calendar, ChevronRight, Instagram, Linkedin, Youtube 
} from 'lucide-vue-next'
import ButtonLogin from '../components/ButtonLogin.vue'
import ButtonRegister from '../components/ButtonRegister.vue'
import EventListPublic from '../components/EventListPublic.vue'

const categories = [
  { name: 'Konser', icon: Music },
  { name: 'Seminar', icon: GraduationCap },
  { name: 'Workshop', icon: Compass },
  { name: 'Olahraga', icon: Trophy },
]

const latestEvents = [
  { title: 'Electronic Night Out', loc: 'PIK, Jakarta', price: 'IDR 150K', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800' },
  { title: 'Family Food Feast', loc: 'Taman Anggrek', price: 'GRATIS', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800' },
  { title: 'Tech Art Expo 2024', loc: 'Sarinah, Jakarta', price: 'IDR 50K', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800' },
  { title: 'Startup Networking Day', loc: 'SCBD, Jakarta', price: 'IDR 100K', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800' },
]
</script>

<template>
  <Head title="Eotech Tiket - Beranda" />

  <div class="min-h-screen bg-white font-sans text-gray-900">
    
    <nav class="flex items-center justify-between px-6 md:px-20 py-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div class="flex items-center gap-12">
        <h1 class="text-2xl font-bold text-[#0D4433] tracking-tight">Eotech Tiket</h1>
        <div class="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" class="text-[#0D4433] border-b-2 border-[#0D4433] pb-1 uppercase">Beranda</a>
          <a href="#" class="text-gray-500 hover:text-[#0D4433] uppercase">Cari Event</a>
          <a href="#" class="text-gray-500 hover:text-[#0D4433] uppercase">Cek Status Tiket</a>
        </div>
      </div>
      <div class="flex justify-between gap-2">
        <ButtonLogin />
        <ButtonRegister />
      </div>
    </nav>

    <section class="px-6 md:px-20 py-8 text-left">
      <div class="relative h-[480px] w-full rounded-[40px] overflow-hidden shadow-2xl bg-gray-900">
        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1500" class="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div class="absolute inset-0 bg-black/40 flex flex-col justify-center px-16">
          <h1 class="text-6xl font-bold text-white max-w-xl leading-tight mb-10">Cari Event Seru di Sekitarmu</h1>
          
          <div class="bg-white p-2 rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row gap-2 max-w-4xl items-center border border-gray-100">
            <div class="flex items-center gap-3 flex-1 px-6 border-r border-gray-100 w-full md:w-auto">
              <Search class="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Cari nama event..." class="w-full focus:outline-none text-[#0D4433] bg-transparent py-3" />
            </div>
            <div class="flex items-center gap-3 flex-1 px-6 w-full md:w-auto">
              <MapPin class="w-5 h-5 text-gray-400" />
              <select class="w-full bg-transparent focus:outline-none text-gray-500 appearance-none py-3">
                <option>Pilih kota</option>
                <option>Jakarta</option>
              </select>
            </div>
            <button class="bg-[#0D4433] text-white px-10 py-4 rounded-xl md:rounded-full font-bold hover:bg-[#155e47] transition-all w-full md:w-auto">
              Cari Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 md:px-20 py-12 text-left bg-gray-50/50">
      <p class="text-[10px] font-bold text-[#0D4433] uppercase tracking-[0.2em] mb-2">Eksplorasi</p>
      <h2 class="text-3xl font-bold mb-10 text-gray-900 tracking-tight">Kategori Pilihan</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="cat in categories" :key="cat.name" 
             class="bg-white p-10 rounded-[32px] flex flex-col items-center justify-center gap-6 hover:shadow-xl transition-all cursor-pointer group border border-gray-100 shadow-sm text-center">
          <div class="text-[#0D4433] group-hover:scale-110 transition-transform">
            <component :is="cat.icon" class="w-12 h-12 stroke-[1.5px]" />
          </div>
          <span class="font-bold text-gray-700 tracking-tight">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <section class="px-6 md:px-20 py-12 text-left bg-white">
      <p class="text-[10px] font-bold text-[#0D4433] uppercase tracking-[0.2em] mb-2">Terlaris</p>
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900">Event Populer</h2>
        <button class="text-[#0D4433] font-bold text-sm flex items-center gap-1 hover:underline">
          Lihat Semua <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 relative group rounded-[40px] overflow-hidden h-[450px] shadow-lg bg-gray-900 border-4 border-white">
          <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
             <span class="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest shadow-md">Unggulan</span>
             <h3 class="text-4xl font-bold text-white mb-6 leading-tight tracking-tight text-left">Jakarta Music Festival 2024</h3>
             <div class="flex items-center gap-6 text-gray-200 text-sm border-t border-white/20 pt-6">
                <span class="flex items-center gap-2"><MapPin class="w-4 h-4" /> GBK, Jakarta</span>
                <span class="font-bold text-emerald-400 text-lg">IDR 450.000++</span>
                <button class="ml-auto bg-white text-[#0D4433] px-10 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">Beli Tiket</button>
             </div>
          </div>
        </div>
        <div class="lg:col-span-5 bg-white border border-gray-100 rounded-[40px] p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
          <div class="w-full h-[220px] rounded-[32px] overflow-hidden mb-6 bg-gray-100">
             <img src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 px-2 text-left">
            <span class="text-red-600 text-[10px] font-bold uppercase tracking-wider">Seminar Bisnis</span>
            <h3 class="text-2xl font-bold mt-3 mb-6 text-gray-950 tracking-tight leading-snug">Creative Leaders Forum 2024</h3>
            <div class="space-y-2.5 text-gray-500 text-sm mb-8 pt-2 border-t border-gray-50">
              <p class="flex items-center gap-2.5"><Calendar class="w-4 h-4" /> 15 September 2024</p>
              <p class="flex items-center gap-2.5"><MapPin class="w-4 h-4" /> ICE BSD, Tangerang</p>
            </div>
            <div class="flex justify-between items-center pt-5 border-t border-gray-100">
               <span class="text-2xl font-bold text-[#0D4433]">IDR 250.000</span>
               <ChevronRight class="text-gray-300 w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <EventListPublic />

    <footer class="bg-[#0D4433] text-white px-6 md:px-20 py-24 mt-20 text-left border-t border-white/10 shadow-inner">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-16">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-white tracking-tighter text-left">Eotech Tiket</h2>
          <p class="text-gray-300 text-sm leading-relaxed text-left">Platform ekosistem teknologi terdepan di Indonesia. Memberikan pengalaman ticketing yang aman dan cepat.</p>
        </div>
        <div>
          <h4 class="font-bold mb-8 uppercase text-xs tracking-widest text-gray-400 text-left">Perusahaan</h4>
          <ul class="space-y-4 text-sm text-gray-300 text-left">
            <li><a href="#" class="hover:text-white transition-colors text-gray-300">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-white transition-colors text-gray-300">Pusat Bantuan</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-8 uppercase text-xs tracking-widest text-gray-400 text-left">Bantuan</h4>
          <ul class="space-y-4 text-sm text-gray-300 text-left">
            <li><a href="#" class="hover:text-white transition-colors text-gray-300">Syarat & Ketentuan</a></li>
            <li><a href="#" class="hover:text-white transition-colors text-gray-300">Kebijakan Privasi</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-8 uppercase text-xs tracking-widest text-gray-400 text-left">Media Sosial</h4>
          <div class="flex gap-4">
            <div class="p-3 border border-white/10 hover:bg-white/5 cursor-pointer transition-all"><Instagram class="w-5 h-5 text-white" /></div>
            <div class="p-3 border border-white/10 hover:bg-white/5 cursor-pointer transition-all"><Linkedin class="w-5 h-5 text-white" /></div>
            <div class="p-3 border border-white/10 hover:bg-white/5 cursor-pointer transition-all"><Youtube class="w-5 h-5 text-white" /></div>
          </div>
        </div>
      </div>
      <div class="border-t border-white/10 mt-20 pt-10 text-center text-xs text-gray-500">
        © 2026 Eotech Tiket. Indonesia's Tech Ecosystem.
      </div>
    </footer>

  </div>
</template>