<script setup>
import { Link } from '@inertiajs/vue3'
import { LogOut } from 'lucide-vue-next'
</script>

<template>
    <Link href="/logout" method="post" as="button" class="w-full flex items-center space-x-3.5 px-5 py-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all outline-none">
        <LogOut class="w-5 h-5" />
        <span class="text-[13px] font-bold">Keluar</span>
    </Link>
</template>