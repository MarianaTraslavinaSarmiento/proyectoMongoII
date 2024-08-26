<script setup>

import HeaderBack from '@/components/HeaderBack.vue';

</script>

<template>

    <HeaderBack header="Ticket" />

    <main>
        <div class="ticket">
            <div class="ticket__image">
                <img src="" alt="Puss In Boots">
            </div>
            <div class="ticket__body">
                <h2 class="ticket__title">Puss In Boots The Last Wish</h2>
                <p class="ticket__subtitle">Show this ticket at the entrance</p>
                
                <hr>

                <div class="ticket__cinema">
                    <div>
                        <span class="label">Cinema</span>
                        <span class="value">HARTONO MALL 12</span>
                    </div>
                    <img style="border-radius: 5px;" src="../../public/img/cinema.jpg" alt="Cinema Logo" class="cinema__logo">
                </div>

                <div class="ticket__grid">
                    <div class="ticket__item">
                        <span class="label">Date</span>
                        <span class="value">Sun , Feb 12th 2023</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Time</span>
                        <span class="value">13:00</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Cinema Hall #</span>
                        <span class="value">Cinema A</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Seat</span>
                        <span class="value">C5</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Cost</span>
                        <span class="value">$26,99</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Order ID</span>
                        <span class="value">12345678</span>
                    </div>
                </div>

                <div class="ticket__barcode"></div>
            </div>
        </div>
    </main>


</template>

<style scoped>
body {
    margin: 0;
    padding: 0;
    background-color: var(--color-lightGray);
    font-family: Arial, sans-serif;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    padding: 20px;
}

.ticket {
    width: 87%;
    height: 85dvh;
    padding: 25px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow-y: scroll;
}

.ticket__image {

    display: flex;
    height: 120px;
    overflow: hidden;
    border: 1px solid black;
    width: 100%;
    border-radius: 10px;
}

.ticket__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ticket__body {
    padding-block: 20px;
    min-width: 100%
}

.ticket__title {
    font-size: 22px;
    font-weight: bold;
    margin: 0 0 5px 0;
}

.ticket__subtitle {
    font-size: 15px;
    color: var(--color-textGray);
    margin: 0 0 20px 0;
}

.ticket__cinema {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 15px;
}

.ticket__cinema div{
    display: flex;
    flex-direction: column;
    
}

.ticket__cinema .label{
    font-size: 15px;
    color: var(--color-textGray);
    font-weight: bold;
}

.ticket__cinema .value{
    margin-block: 3px;
    font-size: 20px;
    font-weight: bold;


}
.cinema__logo {
    width: 45px;
    height: 45px;
}

.ticket__grid {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    gap: 25px;
    
    
}

.ticket__item {
    display: flex;
    flex-direction: column;
    font-size: 15px;

}

.ticket__item .label {
    color: var(--color-textGray);
    font-weight: bold;

}

.ticket__item .value {
    font-size: 16px; ;
    font-weight: bold;
}


.value {
    font-size: 14px;
    font-weight: bold;
}

.ticket__body::after {
    content: '';
    display: block;
    height: 1px;
    background-image: linear-gradient(to right, #000 70%, rgba(255, 255, 255, 0) 0%);
    background-position: bottom;
    background-size: 20px 10px;
    background-repeat: repeat-x;
    margin-top: 30px;
    position: absolute;
    width: 100%;
    left: 0;
}
</style>