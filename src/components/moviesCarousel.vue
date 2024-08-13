<script setup>

import router from '@/router'

import { ref, onMounted } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

const movies = ref([])

const moviesFetch = async () => {
  try {
    const res = await axios.get('http://localhost:5001/peliculas');
    movies.value = res.data;
  } catch (error) {
    console.error(error)
  }
}

onMounted(moviesFetch);

const currentMovie = ref(0)

const handleScrolling = (event) => {
  const scrollLeft = event.target.scrollLeft;
  const scrollLimits = [144, 358, 592, 796, 1000, 1204, 1408, 1650, 1890, 2200];
  const movieIndex = scrollLimits.findIndex(limit => scrollLeft < limit);
  currentMovie.value = movieIndex == -1 ? scrollLimits.length : movieIndex;
}

const showDetailsMovies = (movie) =>{
  router.push(`/movie/${movie._id}`)

}


</script>

<template>
  <div class="now__playing">
    <p>Now playing</p>
    <p>See all</p>
  </div>

  <div class="movies__carousel">
    <div @scroll="handleScrolling" class="movie__slider">
      <div v-for="movie in movies" :key="movie.id" class="movie__slide" @click="showDetailsMovies(movie)">
        <img :src="movie.caratula" :alt="movie.titulo" class="movie__poster">
        <h3 class="movie__title">{{ movie.titulo }}</h3>
        <p class="movie__genre">{{ movie.generos.join(', ') }}</p>
      </div>
    </div>
  </div>

  <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
    <template v-for="(movie, index) in movies">
      <div :class="{
        'dot_inactive': currentMovie !== index,
        'dot_active': currentMovie === index
      }"></div>
    </template>
  </div>
</template>

<style scoped>
.now__playing {
  padding: 5px 25px 0px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.now__playing p:first-child {
  color: var(--color-white);
  font-weight: bold;
  font-size: 1.2em;
}

.now__playing :last-child {
  color: var(--color-red);
  font-weight: bold;
  font-size: 1em;
}

.movies__carousel {
  position: relative;
  width: 100%;
  height: 465px;
}

.movie__slider {
  display: flex;
  transition: transform 0.5s ease;
  height: 450px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  overflow-y: hidden;
  padding-inline: 25px;
  gap: 15px

}

.movie__slide {
  padding: 15px 0px 0px 0px;
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

  width: 230px;
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
  max-width: 225px;

}

.movie__genre {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin-top: 3px;
}

.dot_active, .dot_inactive {
  height: 10px;
  border-radius: 40%;
  transition: all 0.2s ;
}
.dot_inactive {
  width: 10px;
  background-color: var(--color-gray);
}
.dot_active {
  width: 20px;
  background-color: var(--color-red);
}

</style>