<template>
    <button
        @click="handleClick"
        class="border border-[#0D4433] text-[#0D4433] px-6 py-4 rounded-lg text-sm font-semibold hover:bg-[#0D4433] hover:text-white transition-all"
        id="LoginButton">
        {{ label }}
    </button>
</template>


<script>
import { router } from '@inertiajs/vue3'

export default {
    name: "ButtonLogin",
    props: {
        label: {
            type: String,
            default: "Login"
        },
        icon: {
            type: String,
            default: "" // e.g., "pi pi-user" for PrimeIcons
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ["click"],
    methods: {
        handleClick() {
            if (!this.loading) {
                router.visit('/login')
                this.$emit("click");
            }
        }
    }
};
</script>