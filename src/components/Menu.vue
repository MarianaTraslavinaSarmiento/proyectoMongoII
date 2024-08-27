<script setup>

import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'


defineProps({
    focusSearchInput: {
        type: Function,
        required: true
    }
})

const activeIcon = ref('home')

const setActiveIcon = (icon) => {
    activeIcon.value = icon
}

</script>

<template>
    <nav class="container__menu">
      <div @click="setActiveIcon('home')" class="menu__item" :class="{ 'active': activeIcon == 'home' }">
        <i class="bi bi-house-door-fill"></i>
        <span>Home</span>
      </div>
      <div @click="focusSearchInput(); setActiveIcon('search')" class="menu__item" :class="{ 'active': activeIcon == 'search' }">
        <i class="bi bi-search"></i>
        <span>Browse</span>
      </div>
      <div @click="setActiveIcon('tickets')" class="menu__item" :class="{ 'active': activeIcon == 'tickets' }">
        <i class="bi bi-ticket-perforated-fill"></i>
        <span>Tickets</span>
      </div>
      <div @click="setActiveIcon('profile')" class="menu__item" :class="{ 'active': activeIcon == 'profile' }">
        <i class="bi bi-person-fill"></i>
        <span>Profile</span>
      </div>
    </nav>
  </template>

<style scoped>
.container__menu {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1a1a1a;
    padding: 10px 0;
    border-top: 1px solid #444;
    height: 90px;
    border-radius: 20px 20px 0px 0px;
    color: var(--color-white);
}

.menu__item {
    display: flex;
    flex-direction: column;
    text-align: center;
    flex: 1;
    transition: all 0.3s ease;
}

.menu__item i {
    font-size: 25px;
    margin-bottom: 5px;
    transition: color 0.3s ease;
}

.menu__item span {
    font-size: 12px;
    transition: color 0.3s ease;
}

.menu__item.active i,
.menu__item.active span {
  color: var(--color-red);
}

.menu__item:hover i,
.menu__item:hover span {
  color: var(--color-red);
}
</style>
