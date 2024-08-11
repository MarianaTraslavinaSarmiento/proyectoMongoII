<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  HeaderUser  from '../components/HeaderUser.vue'
import SearchInput from '../components/SearchInput.vue'
import moviesCarousel from '../components/moviesCarousel.vue'
import ComingSoon from '../components/ComingSoon.vue'
import Menu from '../components/Menu.vue'

</script>

<template>

  <main>

  <HeaderUser />
  <SearchInput />
  <moviesCarousel />
  <ComingSoon />
  <Menu />
  <div class="container"></div>
  
  </main>

</template>



<style scoped>

.container{
    width: 100%;
    height: 90px;
}


</style>
