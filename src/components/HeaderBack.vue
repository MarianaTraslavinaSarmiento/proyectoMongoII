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
        <i @click="router.back()" class='bx bx-chevron-left'></i>
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
     border-radius: 10px;
     height: 60px;
   }

   .header__back i:first-child{
    font-size: 35px;
    color: var(--color-white);
   }

   i{
     font-size: 24px;
     color: var(--color-white);
   }
</style>