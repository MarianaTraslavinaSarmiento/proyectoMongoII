<script setup>
import router from '@/router';
import { ref } from 'vue';

const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};
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
            <p style="color: var(--color-red); font-size: 18px;">The Hunger Games: The Ballad of Songbirds & Snakes</p>
            <small>Action</small>
            <p style="font-size: 18px; margin: 30px 0px 0px 0px; color: var(--color-white); ">SALA 3D</p>
            <small>Sun, 12 Feb 2023. 13:00</small>
        </div>
    </div>

    <div class="order-summary">
        <div class="order-number">
            <span style="font-size: 13px;" class="label">ORDER NUMBER : </span>
            <span style="font-size: 13px; color:var(--color-white)" class="value">123456786</span>
        </div>

        <div class="price-item">
            <span style="color: var(--color-textGray)" class="ticket__count">1 TICKET</span>
            <span class="seat__number">C7</span>
        </div>

        <hr style="height: 8px;">

        <div class="price-item">
            <span class="item-name">REGULAR SEAT</span>
            <span class="item-price">$24,99 x 3</span>
        </div>

        <hr>
    </div>

    <div class="payment__container">
        <div class="payment__method">
            <h3 class="payment__title">Payment method</h3>
            <div 
                class="payment__card" 
                :class="{ 'payment__card--active': isActive }"
                @click="toggleActive"
            >
                <img src="../../public/img/vipCard.png" alt="MasterCard" class="payment__logo">
                <div class="card__info">
                    <span class="payment__card__info">MasterCard</span>
                    <span class="payment__card__number">**** **** 0998 7865</span>
                </div>
                <div class="payment__card__indicator">
                    <div v-if="isActive" class="payment__card__indicator__inner"></div>
                </div>
            </div>
        </div>
        <div class="payment__timer">
            <span class="payment__timer__text">Complete your payment in</span>
            <span class="payment__timer__countdown">04:59</span>
        </div>
        <button @click="router.push('/tickets')">Buy Ticket</button>
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
    font-size: 18px;
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
    min-width: 35%;
    background-color: var(--color-textGray);
    height: 11rem;
    border-radius: 7px;
}

.movie__projection {
    background-color: var(--color-grayMovieSummary);
    padding: 5px 25px 15px 25px;
    display: flex;
    gap: 10px;
    height: 27vh;
    align-items: center;
}

.summary:nth-child(2),
.summary:nth-child(4) {
    color: var(--color-textGray);
    font-size: 18px;
}

.order-summary {
    color: #999999;
    padding: 20px 25px 0px 25px;
    font-weight: bold;
}

.order-number {
    margin-bottom: 20px;
}

.ticket-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-white)
}

hr {
    border: none;
    border-top: 1px solid #333333;
    margin: 15px 0;
}

.price-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 16px;
    color: var(--color-textGray)
}

.payment__container {
    color: white;
    padding: 5px 25px 16px 25px;
    border-radius: 12px;
    width: 100%;
}

.payment__title {
    font-size: 18px;
    margin-bottom: 12px;
}

.payment__card {
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    height: 80px;
    cursor: pointer;
    gap: 25px
}

.payment__card img{
    width: 25%;
    height: 100%;
    border-radius: 5px

}
.card__info {
    display: flex;
    flex-direction: column;
    gap: 5px
}

.payment__logo {
    width: 40px;
    height: 24px;
}

.payment__card__info {
    font-weight: bold;
}

.payment__card__number {
    color: #a0a0a0;
}

.payment__card__indicator {
    width: 30px;
    height: 30px;
    border: 2px solid var(--color-red);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
}

.payment__card__indicator__inner {
    width: 20px;
    height: 20px;
    background-color: var(--color-red);
    border-radius: 50%;

}

.payment__timer {
    background-color: #3a1a1a;
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}

.payment__timer__text {
    color: #ff6b6b;
}

.payment__timer__countdown {
    font-weight: bold;
    color: #ff6b6b;
}

.payment__card--active{
    border: 1px solid var(--color-textGray)
}


button {

background-color: var(--color-red);
color: var(--color-white);
width: 100%;
padding: 15px 0px;
border: none;
border-radius: 10px;
font-size: 15px;
font-weight: bold;
margin-top: 10rem;
}

</style>