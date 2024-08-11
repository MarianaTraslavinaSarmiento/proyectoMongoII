<script setup>

    import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

    <nav class="container__menu">
        <div class="menu__item">
            <i class="bi bi-house-door-fill"></i>
            <span>Home</span>
        </div>
        <div class="menu__item">
            <i class="bi bi-search"></i>
            <span>Browse</span>
        </div>
        <div class="menu__item">
            <i class="bi bi-ticket-perforated-fill"></i>
            <span>Tickets</span>
        </div>
        <div class="menu__item">
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
        flex-direction: column;;
        text-align: center;
        flex: 1;
    }

    .menu__item i {
        font-size: 25px;
        margin-bottom: 5px;
    }

    .menu__item span {
        font-size: 12px;
    }


</style>
