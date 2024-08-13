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
    </div>

</template>

<style scoped>

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


</style>