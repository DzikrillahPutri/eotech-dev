<script setup lang="ts">
import { ref } from 'vue'
import { Head, useForm } from '@inertiajs/vue3'

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const form = useForm({
  fullName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const submit = () => {
  form.post('/signup')
}
</script>

<template>
  <Head title="Daftar - Eotech Tiket" />

  <div class="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0D4433]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#0D4433]/10 rounded-full blur-3xl"></div>

    <div class="w-full max-w-md px-6 z-10">
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 bg-[#0D4433] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d4433]/20 mb-4 transition-transform hover:scale-105 duration-300">
          <svg class="text-white w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-[#0D4433] tracking-tight">Daftar Akun</h1>
        <p class="text-slate-500 text-sm text-center">Masukkan detail Anda untuk membuat akun baru</p>
      </div>

      <div class="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50">
        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0D4433] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input 
                v-model="form.fullName"
                type="text" 
                placeholder="Nama lengkap Anda"
                class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D4433]/20 focus:border-[#0D4433] outline-none transition-all placeholder:text-slate-300"
                required
              />
            </div>
            <div v-if="form.errors.fullName" class="text-red-500 text-xs mt-1">{{ form.errors.fullName }}</div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Alamat Email</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0D4433] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="your@email.com"
                class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D4433]/20 focus:border-[#0D4433] outline-none transition-all placeholder:text-slate-300"
                required
              />
            </div>
            <div v-if="form.errors.email" class="text-red-500 text-xs mt-1">{{ form.errors.email }}</div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2 ml-1">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Kata Sandi</label>
            </div>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0D4433] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
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
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            <div v-if="form.errors.password" class="text-red-500 text-xs mt-1">{{ form.errors.password }}</div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2 ml-1">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Konfirmasi Kata Sandi</label>
            </div>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0D4433] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input 
                v-model="form.passwordConfirmation"
                :type="showPasswordConfirmation ? 'text' : 'password'" 
                placeholder="••••••••"
                class="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0D4433]/20 focus:border-[#0D4433] outline-none transition-all placeholder:text-slate-300"
                required
              />
              <button 
                type="button"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg v-if="!showPasswordConfirmation" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            <div v-if="form.errors.passwordConfirmation" class="text-red-500 text-xs mt-1">{{ form.errors.passwordConfirmation }}</div>
          </div>

          <button 
            type="submit" 
            :disabled="form.processing"
            class="w-full bg-[#0D4433] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#0d4433]/30 hover:bg-[#0a3528] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
          >
            <span v-if="!form.processing">Daftar</span>
            <span v-else>Memproses...</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100">
          <div class="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            <span>Sudah punya akun? <a href="/login" class="text-[#0D4433] hover:underline">Masuk</a></span>
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
