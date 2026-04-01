<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { 
  Calendar, Clock, MapPin, CheckCircle2, 
  Minus, Plus, ArrowRight, ChevronRight,
  Info, ShieldCheck, Mail, Phone
} from 'lucide-vue-next'
import { ref } from 'vue'

const ticketCount = ref(1)
</script>

<template>
  <Head title="Eotech Summit 2024 - Detail Event" />

  <div class="min-h-screen bg-white font-['Plus_Jakarta_Sans']">
    <nav class="h-20 border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div class="text-[#0D4433] font-[800] text-[20px] tracking-tight">Eotech Tiket</div>
      <div class="flex items-center space-x-8 text-[13px] font-[700] text-slate-600">
        <Link href="/" class="hover:text-[#0D4433]">Beranda</Link>
        <Link href="#" class="text-[#0D4433] border-b-2 border-[#0D4433] pb-1">Cari Event</Link>
        <Link href="/check-status" class="hover:text-[#0D4433]">Cek Status Tiket</Link>
        <Link href="/login" class="bg-[#0D4433] text-white px-6 py-2.5 rounded-lg hover:bg-[#0a3528] transition-all">Login Admin</Link>
      </div>
    </nav>

    <main class="max-w-[1200px] mx-auto py-10 px-6">
      
      <div class="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-slate-200">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12">
          <div class="flex space-x-3 mb-6">
            <span class="bg-emerald-500 text-white text-[10px] font-[800] px-3 py-1 rounded-full uppercase tracking-widest">Teknologi</span>
            <span class="bg-orange-500 text-white text-[10px] font-[800] px-3 py-1 rounded-full uppercase tracking-widest">Limited Slots</span>
          </div>
          <h1 class="text-white text-[42px] font-[800] leading-[1.1] tracking-tight max-w-3xl">
            Eotech Summit 2024: Masa Depan Artifisial Intelejen di Indonesia
          </h1>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div class="lg:col-span-7 space-y-12">
          
          <div class="grid grid-cols-3 gap-4">
            <div v-for="info in [
              { label: 'Tanggal', val: '24 Oktober 2024', icon: Calendar },
              { label: 'Waktu', val: '09:00 - 17:00 WIB', icon: Clock },
              { label: 'Lokasi', val: 'The Ritz-Carlton, Jakarta', icon: MapPin }
            ]" :key="info.label" class="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
              <info.icon class="w-5 h-5 text-[#0D4433] mb-4" />
              <p class="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1">{{ info.label }}</p>
              <p class="text-[14px] font-[800] text-slate-800 leading-tight">{{ info.val }}</p>
            </div>
          </div>

          <div class="space-y-6">
            <h2 class="text-[22px] font-[800] text-slate-800 flex items-center">
              <span class="w-1.5 h-8 bg-[#0D4433] rounded-full mr-4"></span> Deskripsi Acara
            </h2>
            <div class="text-[15px] text-slate-500 font-medium leading-relaxed space-y-4">
              <p>Eotech Summit 2024 hadir sebagai wadah kurasi teknologi terdepan di Indonesia. Tahun ini, kami memfokuskan seluruh ekosistem pada revolusi AI dan bagaimana dampaknya terhadap ekonomi kreatif digital di tanah air.</p>
              <p>Menghadirkan pembicara internasional dari Silicon Valley dan pemimpin industri lokal, acara ini dirancang untuk memberikan wawasan mendalam (insight) yang tidak akan Anda temukan di seminar lainnya.</p>
            </div>
            <ul class="space-y-4">
              <li v-for="point in ['Panel Diskusi Eksklusif dengan CEO Startup Unicorn.', 'Workshop Teknis: Membangun LLM Kustom untuk Bisnis.', 'Networking Night dengan para Investor Terkemuka.']" 
                :key="point" class="flex items-center space-x-3 text-[14px] font-[700] text-slate-700">
                <CheckCircle2 class="w-5 h-5 text-emerald-500" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <div class="space-y-6">
            <h2 class="text-[22px] font-[800] text-slate-800 flex items-center">
              <span class="w-1.5 h-8 bg-[#0D4433] rounded-full mr-4"></span> Panduan Lokasi
            </h2>
            <div class="relative w-full h-[300px] rounded-[2rem] overflow-hidden border border-slate-100 shadow-inner group">
              <div class="absolute inset-0 bg-slate-200 animate-pulse" v-if="false"></div>
              <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/106.8272, -6.1751,12/1200x600?access_token=YOUR_TOKEN" class="w-full h-full object-cover grayscale" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-[#0D4433] p-3 rounded-2xl shadow-2xl text-white animate-bounce">
                  <MapPin class="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="sticky top-28 space-y-6">
            <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 class="text-[18px] font-[800] text-slate-800 mb-8 tracking-tight">Pilih Kategori Tiket</h3>
              
              <div class="space-y-4 mb-10">
                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 opacity-60">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <div class="flex items-center space-x-3 mb-1">
                        <p class="text-[14px] font-[800] text-slate-800">Early Bird</p>
                        <span class="bg-slate-200 text-slate-500 text-[9px] font-[800] px-2 py-0.5 rounded uppercase">Habis Terjual</span>
                      </div>
                      <p class="text-[11px] text-slate-400 font-medium">Akses terbatas dengan harga spesial</p>
                    </div>
                  </div>
                  <p class="text-[15px] font-[800] text-slate-400 line-through mt-2">Rp 450.000</p>
                  <p class="text-[10px] font-[800] text-rose-500 uppercase mt-1 tracking-wider">Stok Habis</p>
                </div>

                <div class="p-6 rounded-2xl bg-white border-2 border-[#0D4433] shadow-lg shadow-[#0d4433]/5">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <p class="text-[14px] font-[800] text-slate-800 mb-1">Regular Pass</p>
                      <p class="text-[11px] text-slate-400 font-medium leading-relaxed">Akses penuh ke seluruh sesi & snack</p>
                    </div>
                    <div class="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <button class="p-1 text-slate-400 hover:text-[#0D4433]"><Minus class="w-4 h-4" /></button>
                      <span class="text-[14px] font-[800] text-slate-800 px-1">1</span>
                      <button class="p-1 text-slate-400 hover:text-[#0D4433]"><Plus class="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p class="text-[16px] font-[800] text-[#0D4433] mt-2">Rp 750.000</p>
                  <p class="text-[10px] font-[800] text-emerald-500 uppercase mt-1 tracking-wider">Tersedia</p>
                </div>

                <div class="p-6 rounded-2xl bg-white border border-slate-100">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <div class="flex items-center space-x-2 mb-1">
                        <p class="text-[14px] font-[800] text-slate-800">VIP Experience</p>
                        <Info class="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p class="text-[11px] text-slate-400 font-medium leading-relaxed">Akses barisan depan, lounge eksklusif & merchandise</p>
                    </div>
                    <div class="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl">
                      <button class="p-1 text-slate-300"><Minus class="w-4 h-4" /></button>
                      <span class="text-[14px] font-[800] text-slate-300 px-1">0</span>
                      <button class="p-1 text-slate-400 hover:text-[#0D4433]"><Plus class="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p class="text-[16px] font-[800] text-slate-800 mt-2">Rp 2.500.000</p>
                  <p class="text-[10px] font-[800] text-orange-500 uppercase mt-1 tracking-wider">Sisa 2 Tiket</p>
                </div>
              </div>

              <div class="space-y-4 pt-6 border-t border-slate-100">
                <div class="flex justify-between items-center text-[13px] font-[700] text-slate-400">
                  <span>Ringkasan Pesanan</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[14px] font-medium text-slate-600">1x Regular Pass</span>
                  <span class="text-[14px] font-[800] text-slate-800 tracking-tight">Rp 750.000</span>
                </div>
                <div class="flex justify-between items-center pt-2">
                  <span class="text-[15px] font-[800] text-slate-800">Total Pembayaran</span>
                  <span class="text-[18px] font-[800] text-emerald-600 tracking-tight">Rp 750.000</span>
                </div>
                <Link href="/checkout/confirm" class="w-full bg-[#0D4433] text-white py-5 rounded-[1.5rem] font-[800] text-[15px] flex items-center justify-center space-x-3 shadow-xl shadow-[#0d4433]/20 hover:bg-[#0a3528] active:scale-[0.98] transition-all mt-6">
                  <span>Lanjut ke Pembayaran</span>
                  <ArrowRight class="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div class="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <p class="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-6">Penyelenggara</p>
              <div class="flex items-center space-x-5 mb-6">
                <div class="w-12 h-12 bg-[#0D4433] text-white rounded-xl flex items-center justify-center font-[800] text-[16px]">ET</div>
                <div>
                  <div class="flex items-center space-x-2 mb-1">
                    <p class="text-[15px] font-[800] text-slate-800 leading-none">Eotech Indonesia</p>
                  </div>
                  <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Verified Organizer</p>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-center space-x-3 text-[13px] text-slate-500 font-medium">
                  <Mail class="w-4 h-4 text-slate-300" /> <span>halo@eotech.id</span>
                </div>
                <div class="flex items-center space-x-3 text-[13px] text-slate-500 font-medium">
                  <Phone class="w-4 h-4 text-slate-300" /> <span>+62 21 5550 1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-[#0D4433] text-white py-20 mt-20">
      <div class="max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-6">
          <div class="font-[800] text-[22px]">Eotech Tiket</div>
          <p class="text-emerald-100/60 text-[13px] leading-relaxed">Platform kurasi event teknologi dan bisnis terbaik di Indonesia. Memberikan pengalaman ticketing yang aman, cepat, dan profesional.</p>
          <p class="text-[11px] text-emerald-100/40 uppercase font-bold tracking-[0.2em]">© 2024 EOTECH TIKET. PROFESIONAL & TERPERCAYA.</p>
        </div>
        <div v-for="cat in [
          { title: 'Perusahaan', links: ['Tentang Kami', 'Pusat Bantuan'] },
          { title: 'Legal', links: ['Syarat & Ketentuan', 'Kebijakan Privasi'] },
          { title: 'Sosial Media', links: ['Instagram', 'LinkedIn'] }
        ]" :key="cat.title" class="space-y-6">
          <h5 class="text-[14px] font-[800] uppercase tracking-widest">{{ cat.title }}</h5>
          <ul class="space-y-4">
            <li v-for="link in cat.links" :key="link" class="text-[13px] text-emerald-100/60 hover:text-white cursor-pointer transition-colors">{{ link }}</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>