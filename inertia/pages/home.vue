<script setup>
import { Head } from '@inertiajs/vue3'

const events = [
  { 
    id: 1, 
    title: 'Festival Musik Neon Pulse', 
    date: '20 Agustus 2026', 
    location: 'Stadion Utama GBK, Jakarta', 
    price: '1.200.000',
    image: '/images/neon-pulse.png'
  }
]
</script>

<template>
  <Head title="Eotech - Premium Concert" />

  <div class="min-h-screen bg-[#050505] text-white font-sans">
    <section class="relative h-[80vh] flex items-center px-8 md:px-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
      <img :src="events[0].image" class="absolute inset-0 w-full h-full object-cover opacity-60" />
      
      <div class="relative z-20 max-w-2xl">
        <span class="px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Featured Event</span>
        <h1 class="text-6xl md:text-8xl font-black mt-4 leading-none tracking-tighter">
          NEON <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">PULSE</span>
        </h1>
        <p class="mt-6 text-gray-400 text-lg">Rasakan energi musik masa kini dalam balutan visual neon yang memukau.</p>
        
        <div class="flex gap-4 mt-10">
          <button class="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-500 transition-all">Beli Tiket</button>
        </div>
      </div>
    </section>

    <section class="px-8 md:px-20 py-20">
      <h2 class="text-3xl font-bold mb-12">Jelajahi Konser</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="event in events" :key="event.id" class="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all">
          <img :src="event.image" class="aspect-[4/5] object-cover" />
          <div class="p-6">
            <p class="text-blue-400 text-xs font-bold">{{ event.date }}</p>
            <h3 class="text-xl font-bold mt-2">{{ event.title }}</h3>
            <p class="text-gray-400 text-sm mt-2">📍 {{ event.location }}</p>
            <div class="flex justify-between items-center mt-6">
              <p class="font-bold text-lg">Rp {{ event.price }}</p>
              <button class="w-10 h-10 bg-white text-black rounded-full">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>