<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  HeaderUser  from '../src/components/HeaderUser.vue'
import SearchInput from '../src/components/SearchInput.vue'
import moviesCarousel from '../src/components/moviesCarousel.vue'
</script>

<template>

  <main>

  <HeaderUser />
  <SearchInput />
  <moviesCarousel />

  </main>

</template>



<style scoped>
</style>
