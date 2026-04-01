<script setup lang="ts">
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { Head, Link } from '@inertiajs/vue3'
import { 
  ChevronLeft, 
  Ticket, 
  Save, 
  AlertCircle, 
  Info 
} from 'lucide-vue-next'
import { ref } from 'vue'

defineOptions({ layout: AdminLayout })

// State sederhana untuk simulasi pilihan kategori
const selectedCategory = ref('VIP')
const categories = ['VIP', 'Regular', 'Early Bird', 'Student']
</script>

<template>
  <Head title="Tambah Kuota Tiket - Eotech" />

  <div class="max-w-[800px] mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-['Plus_Jakarta_Sans']">
    
    <div class="mb-10 px-2">
      <nav class="flex items-center space-x-2 text-[11px] text-slate-400 font-[700] uppercase tracking-[0.2em] mb-4">
        <Link href="/admin/tickets/quota" class="hover:text-[#0D4433] transition-colors">Manajemen Kuota</Link>
        <span class="text-slate-300">›</span>
        <span class="text-slate-800 font-[700]">Tambah Kuota</span>
      </nav>
      
      <div class="flex items-center space-x-5">
        <Link href="/admin/tickets/quota" class="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#0D4433] hover:border-[#0D4433]/20 transition-all shadow-sm">
          <ChevronLeft class="w-5 h-5" />
        </Link>
        <div>
          <h1 class="text-[32px] font-[800] text-slate-800 tracking-[-0.05em] leading-none">Tambah Kuota</h1>
          <p class="text-slate-400 text-[15px] font-medium mt-2">Tambahkan ketersediaan tiket untuk kategori yang sudah ada.</p>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <div class="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm transition-all">
        <div class="flex items-center space-x-5 mb-10">
          <div class="p-3.5 bg-[#E7F3F0] text-[#0D4433] rounded-[1.25rem] shadow-inner">
            <Ticket class="w-7 h-7" />
          </div>
          <h3 class="text-[20px] font-[800] text-slate-800 tracking-tight">Detail Kuota Baru</h3>
        </div>

        <div class="space-y-8">
          <div>
            <label class="block text-[13px] font-[700] text-slate-700 tracking-[-0.01em] mb-3">
              Pilih Event <span class="text-rose-500 font-bold">*</span>
            </label>
            <div class="relative">
              <select class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-5 px-6 text-[15px] text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-[#0D4433]/5 focus:border-[#0D4433] transition-all font-semibold appearance-none">
                <option value="">Pilih Event Aktif</option>
                <option value="1">Java Jazz Festival 2024</option>
                <option value="2">Tech Indonesia Summit</option>
              </select>
              <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronLeft class="w-5 h-5 -rotate-90" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-[13px] font-[700] text-slate-700 tracking-[-0.01em] mb-3">
              Kategori Tiket <span class="text-rose-500 font-bold">*</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                v-for="cat in categories" 
                :key="cat" 
                @click="selectedCategory = cat"
                type="button"
                class="py-4 px-2 rounded-2xl border text-[13px] font-[700] text-center transition-all duration-300"
                :class="selectedCategory === cat 
                  ? 'bg-[#0D4433] text-white shadow-lg shadow-[#0D4433]/20 border-transparent' 
                  : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-600'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-[13px] font-[700] text-slate-700 tracking-[-0.01em] mb-3">
              Jumlah Tambahan Kuota <span class="text-rose-500 font-bold">*</span>
            </label>
            <div class="relative flex items-center group">
              <input 
                type="number" 
                placeholder="0" 
                class="w-full bg-[#F1F5F9]/60 border border-slate-100 rounded-[1.25rem] py-7 px-8 text-[36px] font-[800] text-slate-800 placeholder:text-slate-200 focus:bg-white focus:ring-4 focus:ring-[#0D4433]/5 focus:border-[#0D4433] outline-none transition-all"
              />
              <div class="absolute right-8 text-slate-300 font-[800] text-sm uppercase tracking-widest group-focus-within:text-[#0D4433]">
                Tiket
              </div>
            </div>
            <div class="mt-4 flex items-center text-[12px] text-orange-600 font-bold bg-orange-50/80 px-4 py-3 rounded-xl border border-orange-100">
              <AlertCircle class="w-4 h-4 mr-2 shrink-0" />
              <span>Kuota saat ini: <b class="text-orange-700">500</b>. Akumulasi setelah ditambah akan otomatis terupdate.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          href="/admin/tickets/quota" 
          class="w-full sm:flex-1 bg-white border border-slate-200 text-slate-400 py-5 rounded-[1.5rem] font-[700] text-[15px] text-center hover:bg-slate-50 hover:text-slate-600 transition-all"
        >
          Batal
        </Link>
        <button 
          type="submit"
          class="w-full sm:flex-[2] bg-[#0D4433] text-white py-5 rounded-[1.5rem] font-[700] text-[15px] shadow-xl shadow-[#0D4433]/20 hover:bg-[#0a3528] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
        >
          <Save class="w-5 h-5" />
          <span>Konfirmasi & Simpan</span>
        </button>
      </div>
      
      <div class="p-8 bg-blue-50/40 rounded-[2.5rem] border border-blue-100 flex items-start space-x-5">
        <div class="p-3 bg-white rounded-xl text-blue-500 shadow-sm border border-blue-50">
          <Info class="w-5 h-5" />
        </div>
        <div class="space-y-1">
          <p class="text-[14px] font-[800] text-blue-900 tracking-tight">Catatan Transparansi</p>
          <p class="text-[13px] text-blue-700/70 font-medium leading-relaxed">
            Perubahan kuota bersifat <b>instan</b>. Pastikan angka yang dimasukkan sudah sesuai dengan alokasi fisik atau stok sistem Anda.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hilangkan arrow default di input number */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>