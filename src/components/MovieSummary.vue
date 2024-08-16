<script setup>

import router from '@/router';

</script>

<template>
    <div class="header__back">
        <i @click="router.back()" class='bx bx-chevron-left'></i>
        <h3 style="color: var(--color-textGray)">Order Summary</h3>
        <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="movie__projection">
        <div class="movie__pic">
            <img src="" alt="">
        </div>
        <div style="font-weight: bold;" class="summary">
            <p style="color: var(--color-red)">The Marvels</p>
            <small>Action</small>
            <p style="margin: 30px 0px 5px 0px; color: var(--color-white)">SALA 3D</p>
            <small>Sun, 12 Feb 2023. 13:00</small>
        </div>

    </div>
</template>

<style scoped>
.header__back {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 60px;
    background-color: var(--color-grayMovieSummary);
}

.header__back i:first-child {
    font-size: 35px;
    color: var(--color-textGray);
}

i {
    font-size: 24px;
    color: var(--color-textGray);
}

.movie__pic {
    width: 35%;
    background-color: var(--color-textGray);
    height: 75%;
    border-radius: 7px;
}

.movie__projection {
    background-color: var(--color-grayMovieSummary);
    padding: 0px 25px 10px 25px;
    display: flex;
    gap: 10px;
    height: 25vh;
    align-items: center;
}

.summary:nth-child(2),
.summary:nth-child(4){
    color: var(--color-textGray)
}

</style>