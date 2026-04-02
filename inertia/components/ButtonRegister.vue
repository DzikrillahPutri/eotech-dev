<template>
    <button
        @click="handleClick"
        class="bg-[#0D4433] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#0a3528] transition-all"
        id="RegisterButton">
        {{ label }}
    </button>
</template>


<script>
import { router } from '@inertiajs/vue3'

export default {
    name: "ButtonRegister",
    props: {
        label: {
            type: String,
            default: "Register"
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
                router.visit('/signup')
                this.$emit("click");
            }
        }
    }
};
</script>