
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

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

    <div class="cine__cast">
        <h3>Cast</h3>
        <div class="cast__carousel">
            <div v-if="movie" class="actor__info">
                <img :src="movie.caratula" alt="" class="actor__pic">
                <p class="actor__name"></p>
                <p class="character"></p>
            </div>
        </div>  
        
    </div>

</template>

<style scoped>

.cine__cast {
    padding-inline: 25px;
    color: var(--color-white)
}
.cast__carousel{
    display: flex;
    width: 100%;
    overflow-x: auto;
    gap: 1rem;
    background-color: red;
    height: 3rem;
    
}

.actor__info {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 200px;
}

.actor__pic {
    width: 3.5rem;
    height: 3.5rem; 
    border-radius: 50%;
    object-fit: cover;
}
</style>