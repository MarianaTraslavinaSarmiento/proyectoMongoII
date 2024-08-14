
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
        <div v-if="movie" class="cast__carousel">
            <div v-for="actor in movie.reparto" :key="actor.actor" class="actor__info">
                <img :src="actor.foto" alt="actor.actor" class="actor__pic">
                <div class="text__box">
                    <p class="actor__name">{{ actor.actor }}</p>
                    <p class="character">{{ actor.personaje }}</p>
                </div>
            </div>
        </div>  
        
    </div>

</template>

<style scoped>

.cine__cast {
    padding-inline: 25px;
    color: var(--color-white);
}

.cine__cast h3{
    margin-bottom: 5px;
}
.cast__carousel{
    display: flex;
    width: 100%;
    overflow-x: auto;
    gap: 0.5rem;
    height: 4rem;
    
}

.actor__info {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 180px;
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

.character{
    color: var(--color-gray)
}
</style>