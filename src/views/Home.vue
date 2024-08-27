<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  HeaderUser  from '../components/HeaderUser.vue'
import SearchInput from '../components/SearchInput.vue'
import moviesCarousel from '../components/moviesCarousel.vue'
import ComingSoon from '../components/ComingSoon.vue'
import Menu from '../components/Menu.vue'
import { ref } from 'vue'

const searchInputRef = ref(null)

const focusSearchInput = () => {
  if (searchInputRef.value) {
    searchInputRef.value.focusInput()
  }
}
</script>

<template>
  <main>
    <HeaderUser />
    <SearchInput ref="searchInputRef" />
    <moviesCarousel />
    <ComingSoon />
    <Menu :focusSearchInput="focusSearchInput" />
    <div class="container"></div>
  </main>
</template>


<style scoped>

.container{
    width: 100%;
    height: 90px;
}


</style>
