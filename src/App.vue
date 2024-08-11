<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  HeaderUser  from '../src/components/HeaderUser.vue'
import SearchInput from '../src/components/SearchInput.vue'
import moviesCarousel from '../src/components/moviesCarousel.vue'
import ComingSoon from '../src/components/ComingSoon.vue'
</script>

<template>

  <main>

  <HeaderUser />
  <SearchInput />
  <moviesCarousel />
  <ComingSoon />

  </main>

</template>



<style scoped>
</style>
