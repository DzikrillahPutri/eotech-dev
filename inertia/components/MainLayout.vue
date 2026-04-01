<script setup>
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 py-4 px-6 md:px-20 flex justify-between items-center">
      <div class="flex items-center gap-8">
        <Link href="/" class="text-2xl font-bold text-[#0D4433]">Eotech Tiket</Link>
        <div class="hidden md:flex gap-6 text-sm font-medium text-gray-500">
          <Link href="/" class="hover:text-[#0D4433] transition-colors">Beranda</Link>
          <Link href="#" class="hover:text-[#0D4433] transition-colors text-[#0D4433] border-b-2 border-[#0D4433]">Cari Event</Link>
          <Link href="#" class="hover:text-[#0D4433] transition-colors">Cek Status Tiket</Link>
        </div>
      </div>
      <button class="bg-[#0D4433] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#0a3528] transition-all">
        Login Admin
      </button>
    </nav>

    <main>
      <slot />
    </main>

    <footer class="bg-[#0D4433] text-white py-16 px-6 md:px-20 mt-20">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-white">Eotech Tiket</h2>
          <p class="text-gray-300 text-sm leading-relaxed">
            Platform ekosistem teknologi terdepan di Indonesia. Memberikan pengalaman ticketing yang aman, cepat, dan profesional.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="font-bold">PERUSAHAAN</h3>
          <ul class="text-gray-300 text-sm space-y-2">
            <li>Tentang Kami</li>
            <li>Pusat Bantuan</li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3 class="font-bold">LEGAL</h3>
          <ul class="text-gray-300 text-sm space-y-2">
            <li>Syarat & Ketentuan</li>
            <li>Kebijakan Privasi</li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3 class="font-bold">SOCIAL MEDIA</h3>
          <ul class="text-gray-300 text-sm space-y-2">
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <p class="pt-8 text-xs text-gray-400 text-center md:text-left">
        © 2024 Eotech Tiket. Indonesia's Tech Ecosystem.
      </p>
    </footer>
  </div>
</template>