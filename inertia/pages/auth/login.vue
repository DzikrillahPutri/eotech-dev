<script setup lang="ts">
import { ref } from 'vue'
import { Head, useForm } from '@inertiajs/vue3'
import { UserCheck, Lock, Eye, EyeOff, ArrowRight } from 'lucide-vue-next'

const showPassword = ref(false)

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const submit = () => {
  form.post('/login')
}
</script>

<template>
  <Head title="Login Admin - Eotech Tiket" />

  <div class="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0D4433]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#0D4433]/10 rounded-full blur-3xl"></div>

    <div class="w-full max-w-md px-6 z-10">
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 bg-[#0D4433] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d4433]/20 mb-4 transition-transform hover:scale-105 duration-300">
          <UserCheck class="text-white w-8 h-8" />
        </div>
        <h1 class="text-2xl font-bold text-[#0D4433] tracking-tight">Eotech Tiket</h1>
      </div>

      <div class="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-800">Selamat Datang</h2>
          <p class="text-slate-500 text-sm">Masukkan kredensial anda untuk melanjutkan.</p>
        </div>

        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Alamat Email</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0D4433] transition-colors">
                <UserCheck class="w-5 h-5" />
              </div>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="admin@eotechtiket.com"
                class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D4433]/20 focus:border-[#0D4433] outline-none transition-all placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2 ml-1">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Kata Sandi</label>
              <a href="#" class="text-[11px] font-bold text-[#0D4433] hover:underline decoration-2">Lupa Sandi?</a>
            </div>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0D4433] transition-colors">
                <Lock class="w-5 h-5" />
              </div>
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••"
                class="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D4433]/20 focus:border-[#0D4433] outline-none transition-all placeholder:text-slate-300"
                required
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="form.processing"
            class="w-full bg-[#0D4433] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#0d4433]/30 hover:bg-[#0a3528] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
          >
            <span v-if="!form.processing">Masuk ke Dashboard</span>
            <span v-else>Memproses...</span>
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100">
          <div class="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            <span>Hanya untuk Personel Berwenang</span>
          </div>
        </div>
      </div>

      <div class="text-center mt-8">
        <a href="/" class="text-slate-400 hover:text-[#0D4433] text-xs font-bold transition-colors inline-flex items-center space-x-2">
          <span>← Kembali ke Beranda Utama</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tambahan efek shadow smooth */
input:focus {
  box-shadow: 0 10px 15px -3px rgba(13, 68, 51, 0.05);
}
</style>