<script setup>

import router from '@/router'

defineProps(
    {
        header: {
            type: String,
            required: true
        }
    }
)

</script>

<template>

    <div class="header__back">
        <i @click="router.push('/')" class="bi bi-arrow-left-circle"></i>
        <h3 style="color: var(--color-white)">{{ header }}</h3>
        <i class="bi bi-three-dots-vertical"></i>
    </div>

</template>

<style scoped>

   .header__back {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 20px;
     border-radius: 10px
   }

   i{
     font-size: 24px;
     color: var(--color-white);
   }
</style>