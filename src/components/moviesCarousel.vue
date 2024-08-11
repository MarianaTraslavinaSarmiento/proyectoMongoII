<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios'

const movies = ref([])
let index = 0

const moviesFetch = async()=>{
    try {
        const res = await axios.get('http://localhost:5001/peliculas');
        console.log(res.data)
        movies.value = res.data;
    } catch (error) {
        console.error(error)
    }
}


onMounted(moviesFetch);

</script>

<template>

    <div class="now__playing">
        <p>Now playing</p>      
        <p>See all</p>  
    </div>

    <div class="movies__carousel">
        <div class="movie__slider" :style="{ transform: `translateX(-${index.value * 100}%)` }">
            <div v-for="movie in movies" :key="movie.id" class="movie__slide">
                <img :src="movie.caratula" :alt="movie.titulo" class="movie__poster">
                <h3 class="movie__title">{{ movie.titulo }}</h3>
                <p class="movie__genre">{{ movie.generos.join(', ') }}</p>
            </div>
        </div>
    </div>

</template>

<style scoped>

   .now__playing {
    padding: 5px 15px 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   }

   .now__playing p:first-child{
    color: var(--color-white);
    font-weight: bold;
    font-size: 1.2em;
   }

   .now__playing :last-child{
    color: var(--color-red);
    font-weight: bold;
    font-size: 1em;
   }

   .movies__carousel {
      position: relative;
      width: 100%;
      height: 470px;
    }

    .movie__slider {
      display: flex;
      transition: transform 0.5s ease;
      height: 480px;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      overflow-y: hidden;
      margin-left: 15px;

    }

    .movie__slide {
      padding: 15px 15px 0px 0px;
      color: var(--color-white);
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      max-height: 100%;
      scroll-snap-align: center;
      
    }
    .movie__poster {
    
      width: 270px;
      height: 90%;
      border-radius: 10px;

    }

    .movie__title {
      margin-top: 10px;
      font-size: 16px;
      text-align: center;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 250px;

    }

    .movie__genre {
      color: #666;
      font-size: 14px;
      text-align: center;
      margin-top: 3px;
    }



</style>