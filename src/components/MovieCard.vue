<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const router = useRoute()
const movie = ref(null)

const fetchingMovies = async() =>{

    try{
        const id = router.params.id
        const res = await axios.get(`http://localhost:5001/peliculas/${id}`);
        movie.value = res.data
    }catch(error){
        console.log('Error fetching movie: ', error);

    }
}

onMounted(fetchingMovies)

</script>

<template>

    <div class="movie__card">

        <div v-if="movie" class="cover">
            <img  :src="movie.caratula" alt="">
        </div>
        <div class="movie__overviewer">
            <div v-if="movie">
                <h3>{{ movie.titulo }}</h3>
                <small style="color: var(--color-gray)">{{ movie.generos.join(', ') }}</small>
            </div>
            <button> 
                <i class="bi bi-play-fill"></i>
                <p>Watch Trailer</p>
            </button>
        </div>
        <p v-if="movie" id="synopsis">{{ movie.sinopsis }}</p>

        <!-- <div class="cast__carousel">
            <div class="actor__slide">
                <img src="" alt="" class="actor__pic">
                <p class="actor__name"></p>
                <p class="character"></p>
            </div>
        </div>  -->

            <!-- <div class="actor-list">
        <div class="actor-info">
            <img src="https://i.postimg.cc/qRGy3vB2/furiosa.jpg" alt="Antonio Banderas">
            <div>
                <p class="actor-name">Antonio Ban</p>
                <p class="actor-role">Puss in Boots</p>
            </div>
        </div>
        <div class="actor-info">
            <img src="https://i.postimg.cc/qRGy3vB2/furiosa.jpg" alt="Salma Hayek">
            <div>
                <p class="actor-name">Salma Hayek</p>
                <p class="actor-role">Kitty Softpaws</p>
            </div>
        </div>
        <div class="actor-info">
            <img src="https://i.postimg.cc/qRGy3vB2/furiosa.jpg" alt="Harvey Guillén">
            <div>
                <p class="actor-name">Harvey Guillén</p>
                <p class="actor-role">Perro</p>
            </div>
        </div>
    </div> -->

    </div>

</template>

<style scoped>

.cast__carousel{
    height: 30px;
    background-color: red;
    width: 100%;

}
.movie__card{
    height: 70vh;
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


button{
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

button i{
    font-size: 20px;
}

/* .actor-list {
    display: flex;
    width: 100%;
    overflow-x: auto;
    gap: 1rem;
}

.actor-info {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 200px;
}

.actor-info img {
    width: 3.5rem;
    height: 3.5rem; 
    border-radius: 50%;
    object-fit: cover;
} */
</style>