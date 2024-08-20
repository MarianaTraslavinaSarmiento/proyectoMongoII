<script setup>

import router from '@/router';
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router';
import {globalState} from '../store/globalState.js'

const weekDays = ref([]);
const selectedDate = ref();
const route = useRoute();
const screenings = ref([]);
const movieId = ref(route.params.id);
const requestData = ref();


const generateWeekDays = () => {
    const today = new Date();
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);

        date.setDate(today.getDate() + i);
        
        days.push({
            day: dayNames[date.getDay()], // ! date.getDay() returns a number from 0 to 6 (0 is Sunday)
            date: date.getDate(),
            fullDate: formatDate(date)
        });
    }
    weekDays.value = days;

    selectedDate.value = days[0].fullDate

};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`
}


const selectDate = (day) => {
    selectedDate.value = day.fullDate
    requestData.value = {
        movieId: movieId.value,
        date: day.fullDate,
    }

    screeningFetch();
}

const screeningFetch = async () => {

    if (!requestData.value) return;
    await fetch('http://localhost:5001/proyecciones/pelicula/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData.value)

    }).then(response => response.json())
    .then(data => {
        screenings.value = data;
    }).catch(error => {
        console.error('Error al obtener las proyecciones:', error);
    })
    
}

const priceFormater = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

onMounted(() => {
    generateWeekDays();
    if (weekDays.value.length > 0) {
        selectDate(weekDays.value[0]); 
    }
});

const screeningIndex = ref(null)
const dayIndex = ref(0)

const selectedScreeningId = ref(null);

const selectScreening = async (id, index) => {
    screeningIndex.value = index;
    selectedScreeningId.value = id;

    if (selectedScreeningId.value) {
        try {
            const res = await fetch(`http://localhost:5001/proyecciones/${selectedScreeningId.value}/asientos`);
            const data = await res.json();
            globalState.dataSeats.push(...data);
            console.log(globalState.dataSeats);

        } catch (error) {
            console.error('Error al obtener los asientos:', error);
        }
    }
};


</script>

<template>
    <section class="calendar__functions">

        <div class="days__week">
            <div v-for="(day, index) in weekDays" :key="index" @click="selectDate(day); dayIndex = index" :class="['day__card', { active: dayIndex == index}] ">
                <span class="day">{{ day.day }}</span>
                <span style="font-weight: bold;" class="date">{{ day.date }}</span>
            </div>
        </div>


        <div class="date__available">

            <div v-for="(screen,index) in screenings" :key="screen._id" :class="['showtime__card', { active: screeningIndex == index}]" @click="screeningIndex = index; selectScreening(screen._id, index)" >
                <span class="time">{{ screen.hora }}</span>
                <span class="price">{{ priceFormater.format(screen.precio) }} • {{ screen.sala_id.tipo }}</span>
            </div>

        </div>

        <div class="booking__seat">

            <div style="font-size: 18px" class="total__price">
                <p style="margin-bottom: 10px;">Price</p>
                <p style="font-weight: bold">$40.000</p>
            </div>
            <button @click="router.push('/buyticket')">Buy Ticket</button>
        </div>

    </section>
</template>

<style scoped>


.calendar__functions {
    padding: 25px 0px 15px 25px;
}

.days__week {
    display: flex;
    overflow-x: auto;
    padding: 10px;
    gap: 15px;
    scrollbar-width: none;
}

.days__week .day{
    color: var(--color-textGray);
    font-weight: bold;
}

.day__card.active .day{
    color: var(--color-white);
}

.day__card.active,
.showtime__card.active {
    background-color: var(--color-red);
    color: var(--color-white)
}

.day__card {
    display: flex;
    background-color: var(--color-lightGray);
    color: var(--color-black);
    padding: 15px;
    text-align: center;
    flex-direction: column;
    border-radius: 10px;
    min-width: 60px;
    cursor: pointer;

}

.day__card .day {
    font-size: 0.8em;
    margin-bottom: 10px;

}

.day__card .date {
    font-size: 24px;
    font-weight: bold;
}

.date__available {
    display: flex;
    overflow-x: auto;
    padding: 10px 0px 0px 10px;
    gap: 20px;
    scrollbar-width: none;
}

.showtime__card {
    background-color: var(--color-lightGray);
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
    flex-shrink: 0;
    min-width: 90px;
    height: 70px;
    justify-content: center;
}

.showtime__card .time {
    display: block;
    font-weight: bold;
    font-size: 18px;
}

.showtime__card .price {
    font-size: 14px;
    font-weight: normal;
}


.booking__seat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px 15px 15px;
    color: var(--color-white);
    margin-top: 30px;
    margin-right: 30px;
}

button {

    background-color: var(--color-red);
    color: var(--color-white);
    width: 65%;
    padding: 15px 0px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
}
</style>