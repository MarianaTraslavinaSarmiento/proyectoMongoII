<script setup>
import HeaderBack from '@/components/HeaderBack.vue';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { globalState } from '@/store/globalState';

const allTickets = ref([])
const tickets = async () => {
    try {
        const response = await axios.get('http://localhost:5001/boletos/allTickets', { withCredentials: true });
        allTickets.value = response.data
        console.log(allTickets.value);

    } catch (error) {
        console.log('Error', error);
    }

};


onMounted(tickets)

</script>

<template>

    <main>
        <HeaderBack header="Tickets" />

        <div v-if="allTickets" class="ticket-carousel">
            <div class="ticket" v-for="ticket in allTickets" :key="ticket.id">
                <div class="ticket__image">
                    <img :src="ticket.proyeccion_id.pelicula_id.caratula" alt="movie cover">
                </div>
                <div class="ticket__body">
                    <h2 class="ticket__title">{{ ticket.proyeccion_id.pelicula_id.titulo }}</h2>
                    <p class="ticket__subtitle">Show this ticket at the entrance</p>
                    <hr>

                    <div class="ticket__cinema">
                        <div>
                            <span class="label">Cinema</span>
                            <span style="font-size: 18px; font-family: interExtraBold;" class="value">AUDITORIO
                                PRINCIPAL</span>
                        </div>
                        <img style="border-radius: 5px;" src="../../public/img/cinema.jpg" alt="Cinema Logo"
                            class="cinema__logo">
                    </div>

                    <div v-if="allTickets" class="ticket__grid">
                        <div class="ticket__item">
                            <span class="label">Date</span>

                            <span class="value">{{ new Date(new Date(ticket.proyeccion_id.fecha).setDate(new Date(ticket.proyeccion_id.fecha).getDate() + 1)).toDateString() }}</span>
                        </div>
                        <div class="ticket__item">
                            <span class="label">Time</span>
                            <span class="value">{{ ticket.proyeccion_id.hora }} </span>
                        </div>
                        <div class="ticket__item">
                            <span class="label">Room</span>
                            <span class="value">{{ ticket.proyeccion_id.sala_id.tipo }}</span>
                        </div>
                        <div class="ticket__item">
                            <span class="label">Seat</span>
                            <span class="value">{{ ticket.codigo_asiento }}</span>
                        </div>
                        <div class="ticket__item">
                            <span class="label">Cost</span>
                            <span class="value">{{ ticket.total }}</span>
                        </div>
                        <div class="ticket__item">
                            <span class="label">Order ID</span>
                            <span class="value">{{ ticket._id.slice(0,7) }}</span>
                        </div>
                    </div>
                </div>
                <div class="ticket__barcode">
                    <img src="../../public/img/Barcode.png" alt="">
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.ticket-carousel {
    height: 90%;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    padding: 20px;
    display: flex;
    align-items: center;
    margin-left: 1.5rem;
}

.ticket-carousel::-webkit-scrollbar {
    display: none;
}

.ticket {
    flex: 0 0 auto;
    width: 350px;
    height: 95%;
    padding: 25px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow-y: scroll;
    scroll-snap-align: start;
    margin-right: 2.5rem;

}

.ticket__barcode {
    margin-top: 30px;
    width: 100%;
}

.ticket__barcode img {
    width: 100%;
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

.ticket__cinema div {
    display: flex;
    flex-direction: column;
}

.ticket__cinema .label {
    font-size: 15px;
    color: var(--color-textGray);
    font-weight: bold;
}

.ticket__cinema .value {
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
    gap: 10px
}

.ticket__item .label {
    color: var(--color-textGray);
    font-weight: bold;
}

.ticket__item .value {
    font-size: 16px;
    ;
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
