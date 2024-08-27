<script setup>

import HeaderBack from '@/components/HeaderBack.vue';
import { ref, onMounted, computed} from 'vue'
import { globalState } from '@/store/globalState';

import axios from 'axios';


const ticket = ref()
const tickets = async () => {
  try {
    const response = await axios.get('http://localhost:5001/boletos/latestTicket',{withCredentials: true});
    ticket.value = response.data.ticket
    console.log(response.data);
  } catch (error) {
    console.log('Error', error);
  }
};

const priceFormater = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

const shortOrderId = computed(() => {
  if (globalState.orderId) {
    return globalState.orderId.toString().substring(0, 7);
  }
  return '';
});

onMounted(tickets)


</script>

<template>

    <HeaderBack header="Ticket" />

    <main>
        <div class="ticket">
            <div class="ticket__image">
                <img :src="globalState.moviePoster" alt="movie cover">
            </div>
            <div class="ticket__body">
                <h2 class="ticket__title">{{ globalState.movieTitle }}</h2>
                <p class="ticket__subtitle">Show this ticket at the entrance</p>
                
                <hr>

                <div class="ticket__cinema">
                    <div>
                        <span class="label">Cinema</span>
                        <span style="font-size: 18px; font-family: interExtraBold;" class="value">AUDITORIO PRINCIPAL</span>
                    </div>
                    <img style="border-radius: 5px;" src="../../public/img/cinema.jpg" alt="Cinema Logo" class="cinema__logo">
                </div>

                <div class="ticket__grid">
                    <div class="ticket__item">
                        <span class="label">Date</span>
                        <span class="value">{{ new Date(new Date(globalState.screeningDate).setDate(new Date(globalState.screeningDate).getDate() +
                1)).toDateString() }}</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Time</span>
                        <span class="value">{{ globalState.screeningTime }} </span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Room</span>
                        <span class="value">{{ globalState.screeningRoom }}</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Seat</span>
                        <span class="value">{{ globalState.ticket_overview.numero_asiento }}</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Cost</span>
                        <span class="value">{{ priceFormater.format(globalState.current_price) }}</span>
                    </div>
                    <div class="ticket__item">
                        <span class="label">Order ID</span>
                        <span class="value">{{ shortOrderId }}</span>
                    </div>
                </div>


            </div>
            <div class="ticket__barcode">
                    <img src="../../public/img/Barcode.png" alt="">
            </div>
        </div>
    </main>


</template>

<style scoped>

.ticket__barcode{
    margin-top: 30px;
    width: 100%;
}

.ticket__barcode img{
    width: 100%;
}

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
    width: 350px;
    height: 95%;
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
    font-family: 'interExtraBold';
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
    gap:10px

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