
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import HeaderBack from '../components/HeaderBack.vue';
import router from '@/router';
import { globalState } from '@/store/globalState';


const route = useRoute();
const movie = ref(null)

const fetchingMovies = async() =>{

    try{
        const id = route.params.id
        const res = await fetch(`http://localhost:5001/peliculas/${id}`);
        const data = await res.json();
        movie.value = data
        globalState.moviePoster = data.caratula
        globalState.movieTitle = data.titulo

    }catch(error){
        console.log('Error fetching movie: ', error);
    }
}

onMounted(fetchingMovies)

</script>

<template>

    <HeaderBack header="Details of the movie"/>

    <div class="movie__card">

        <div v-if="movie" class="cover">
            <img  :src="movie.caratula" alt="">
        </div>
        <div class="movie__overviewer">
            <div v-if="movie">
                <h3>{{ movie.titulo }}</h3>
                <small style="color: var(--color-gray)">{{ movie.generos.join(', ') }}</small>
            </div>
            <a v-if="movie" :href="movie.trailer">
                <button class="trailer"> 
                <i class="bi bi-play-fill"></i>
                <p>Watch Trailer</p>
                </button>
            </a>

        </div>
        <p v-if="movie" id="synopsis">{{ movie.sinopsis }}</p>

    </div>

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

        <div class="cinema__box">
            <div class="cinema__overviwer">
                <p style="color: var(--color-white)">CampusLands</p>
                <small style="color: var(--color-gray)">Auditorio principal</small>
            </div>
            <img class="cinema__photo" style="border-radius: 5px;" src="../../public/img/cinema.jpg" alt="">
        </div>
    </div>

    <button v-if="movie && movie.estado == 'disponible'"  class="book__ticket" @click="router.push(`/movie/${route.params.id}/rooms`)">Book Now</button>

</div>
   


</template>

<style scoped>


template{
    overflow-y: hidden;
}

.movie__card{
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding-inline: 25px ;
    color: var(--color-white)
}

#synopsis{
    font-size: 0.9em;

}

.cover {
    width: 100%;
    height: 60%;
}

.cover img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 15px;
}

.movie__overviewer{
    display: flex;
    width: 100%;
}

.movie__overviewer div{
    width: 70%;
}


.trailer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 110px;
    right: 25px;
    gap: 2px;
    height: 25px;
    border-radius: 5px;
    border: none;
    background-color: var(--color-red);
    color: var(--color-white)
}

.trailer i{
    font-size: 20px;
}

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
        border-color: var(--color-red);

    }

    .cinema__photo {
        width: 50px;
        object-fit: cover;
    }

    .book__ticket{
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