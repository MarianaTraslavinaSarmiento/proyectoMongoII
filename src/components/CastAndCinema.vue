
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const movie = ref(null)

const fetchingMovies = async()=>{

    try{
        const id = route.params.id
        const res = await fetch(`http://localhost:5001/peliculas/${id}`)
        const data = await res.json()
        movie.value = data
    }catch(error){
        console.log('Error fetching the movies: ', error);
    }

}

onMounted(fetchingMovies)



</script>
<template>

<div class="container">
    <div style="color: var(--color-white);" class="cine__cast">
        <h3  style="margin-block: 5px;">Cast</h3>
        <div v-if="movie" class="cast__carousel">
            <div v-for="actor in movie.reparto" :key="actor.actor" class="actor__info">
                <img :src="actor.foto" alt="actor.actor" class="actor__pic">
                <div class="text__box">
                    <p class="actor__name">{{ actor.actor }}</p>
                    <p class="character" style="color: var(--color-gray)">{{ actor.personaje }}</p>
                </div>
            </div>
        </div>  
        
    </div>

    <div class="cinema">
        <h3  style="margin-block: 10px; color: var(--color-white)">Cinema</h3>

        <div tabindex="0" class="cinema__box">
            <div class="cinema__overviwer">
                <p style="color: var(--color-white)">CampusLands</p>
                <small style="color: var(--color-gray)">Auditorio principal</small>
            </div>
            <img style="border-radius: 5px;" src="../assets/img/cineCampus.png" alt="">
        </div>

        
    </div>

    <button @click="router.push('/rooms')">Book Now</button>
</div>
   

</template>

<style scoped>

    .container {
        padding-inline: 25px;
        gap: 15px;
        display: flex;
        flex-direction: column;
        height: 40vh;
    }

    .cast__carousel{
        display: flex;
        width: 100%;
        overflow-x: auto;
        gap: 0.5rem;
        height: 4rem;
        scrollbar-width: none;

        
    }
    .actor__info {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        min-width: 170px;
    }

    .actor__pic {
        width: 3.5rem;
        height: 3.5rem; 
        border-radius: 50%;
        object-fit: cover;
    }

    .text__box {
        display: flex;
        flex-direction: column;
        font-size: 0.7em;
    }


    .cinema__box {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        border: 2px solid var(--color-darkGray);
        background-color: var(--color-darkGray);
        padding: 10px;
        border-radius: 10px;
        height: 80px;

    }

    .cinema__box:focus{
        border-color: var(--color-red);
        outline: none;
    }

    button{
        background-color: var(--color-red);
        border: none;
        border-radius: 10px;
        height: 45px;
        margin-top: 40px;
        font-size: 15px;
        color: var(--color-white);
        font-weight: bold;
}


</style>