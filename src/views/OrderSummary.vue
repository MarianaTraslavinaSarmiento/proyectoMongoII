<script setup>
import router from '@/router';
import { globalState } from '@/store/globalState';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';


const id = ref()

globalState.orderId = id

const newId = async () => {

try {

    const response = await axios(`http://localhost:5001/boletos/newid`,  {withCredentials: true});
    id.value = response.data;
} catch (error) {
    console.log('Error fetching movie: ', error);
}
}


const isActive = ref(false);

const activeCard = () => {
    if(isActive.value) {
        return
    }
    isActive.value = true;   
    globalState.current_price -= globalState.current_price * (cards.value[0].descuento_porcentaje / 100)
}


const route = useRoute();
const movie = ref(null)

const priceFormater = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});


const fetchingMovie = async () => {

    try {
        const id = route.params.id
        const res = await fetch(`http://localhost:5001/peliculas/${id}`);
        const data = await res.json();
        movie.value = data
    } catch (error) {
        console.log('Error fetching movie: ', error);
    }
}




let cards = ref(null)

const getCardByUser = async () => {
  try {
    const response = await axios.get('http://localhost:5001/tarjetasvip/getbyid', {withCredentials: true});
    cards.value = response.data.card;
    console.log(cards.value);

  } catch (error) {
    console.log('Error', error);
  }
};


if (!globalState.screeningDate) {
    router.back();
}


//Timer

let minutes = ref(30);
let seconds = ref(0);
let countdownText = computed(() => {
    return `${minutes.value}:${seconds.value < 10 ? '0' : ''}${seconds.value}`;
})

function timer() {
    setInterval(() => {
        seconds.value--;
        if (seconds.value < 0) {
            minutes.value--;
            seconds.value = 59;
        }

        if (minutes.value == 0 && seconds.value == 0) {
            clearInterval(timer);
            router.back();

            Swal.fire({
            title: 'Alert',
            text: 'Time is up',
            icon: 'warning',
            confirmButtonText: 'Try again',
            confirmButtonColor: '#FE0000',
            iconColor: '#FE0000',
            width: '95%',
            background: '#1f1f1f',
            color: 'white',
            customClass: 'border'
        })

        }
    }, 1000);

}

const purchasingTicket = async()=>{
    try {
        const response = await axios.post('http://localhost:5001/boletos/comprar_boleto', {
            _id: id,
            proyeccion_id: globalState.selectedScreeningId,
            codigo_asiento: globalState.ticket_overview.numero_asiento,
            porcentaje_descuento_VIP: cards.porcentaje_descuento_VIP || 0,
            total: globalState.current_price

        }, {withCredentials: true})

        router.push('/tickets')
    } catch (error) {
        console.error("Error buying ticket:", error.message)

    }

}


timer()
onMounted(() => {
    fetchingMovie();
    getCardByUser();
    newId();
});

</script>

<template>
    <div class="header__back">
        <i @click="router.back()" class='bx bx-chevron-left'></i>
        <h3 style="color: var(--color-textGray)">Order Summary</h3>
        <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="movie__projection">
        <div v-if="movie" class="movie__pic">
            <img style="width: 100%; height: 100%; border-radius: 10px;" :src="movie.caratula" alt="">
        </div>
        <div style="font-weight: bold;" class="summary">
            <p v-if="movie" style="color: var(--color-red); font-size: 18px;">{{ movie.titulo }}</p>
            <small v-if="movie">{{ movie.generos.join(', ') }}</small>
            <p style="font-size: 18px; margin: 30px 0px 0px 0px; color: var(--color-white); ">SALA {{
                globalState.screeningRoom }}</p>
            <small>{{ new Date(new Date(globalState.screeningDate).setDate(new Date(globalState.screeningDate).getDate() +
                1)).toDateString() }}, {{ globalState.screeningTime }} </small>
        </div>
    </div>

    <div class="order-summary">
        <div class="order-number">
            <span style="font-size: 13px;" class="label" >ORDER NUMBER : {{ id }} </span>
            <span style="font-size: 13px; color:var(--color-white)" class="value"></span>
        </div>

        <div class="price-item">
            <span style="color: var(--color-textGray)" class="ticket__count">1 TICKET</span>
            <span class="seat__number">{{ globalState.ticket_overview.numero_asiento }}</span>
        </div>

        <hr style="height: 8px;">

        <div class="price-item">
            <span class="item-name">{{ globalState.selectedSeatType == "regular" ? "REGULAR" : "VIP" }} SEAT</span>
            <span class="item-price">{{ priceFormater.format(globalState.current_price) }}</span>
        </div>

        <hr>
    </div>

    <div class="payment__container">
        <div v-if="cards" class="payment__method">
            <h3 class="payment__title">Payment method</h3>
            <div class="payment__card" :class="{ 'payment__card--active': isActive }" @click="activeCard">
                <img src="../../public/img/vipCard.png" alt="MasterCard" class="payment__logo">
                <div class="card__info">
                    <span class="payment__card__info">VIP card</span>
                    <span v-if="cards" class="payment__card__number" >{{ cards[0].numero_tarjeta || null }}</span>
                </div>
                <div class="payment__card__indicator">
                    <div v-if="isActive" class="payment__card__indicator__inner"></div>
                </div>
            </div>
        </div>
        <div v-else class="dont__have">
            <h3 class="payment__title">Don't have a VIP card?</h3>
            <p class="payment__description">To get a VIP card, please contact your ticket office for more information.</p>

        </div>
        <div class="payment__timer">
            <span class="payment__timer__text">Complete your payment in</span>
            <span class="payment__timer__countdown">{{ countdownText }}</span>
        </div>
        <button @click="purchasingTicket" >Buy Ticket</button>
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
    height: 11rem;
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

.payment__card img {
    width: 25%;
    height: 100%;
    border-radius: 5px
}

.card__info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 40%;

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


.payment__timer__countdown {
    font-weight: bold;
    color: var(--color-red)
}

.payment__card--active {
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