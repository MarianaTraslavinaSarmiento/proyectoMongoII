

<script setup>
import router from '@/router'
import { ref, onMounted } from 'vue';

const movies = ref([])
const currentIndex = ref(0)

const moviesFetch = async () => {
  try {
    const res = await fetch('http://localhost:5001/peliculas');
    const data = await res.json()
    movies.value = data.slice(5);
  } catch (error) {
    console.error('Error fetching movies', error)
  }
}

onMounted(moviesFetch);

const showDetailsMovies = (movie) => {
  router.push(`/movie/${movie._id}`)
}

const handleScrolling = (event) => {
  const scrollLeft = event.target.scrollLeft;
  const interval = 180
  currentIndex.value = Math.floor(scrollLeft / interval)
}

</script>

<template>
  <div class="now__playing">
    <p>Now playing</p>
    <p>See all</p>
  </div>

  <div class="movies__carousel">
    <div class="movie__slider" @scroll="handleScrolling">
      <div v-for="(movie, index) in movies" 
           :key="movie.id" 
           class="movie__slide" 
           @click="showDetailsMovies(movie)">
        <img :src="movie.caratula" :alt="movie.titulo" class="movie__poster">
      </div>
    </div>
  </div>

  <div v-if="movies[currentIndex]" class="current__movie__info">
    <h3>{{ movies[currentIndex].titulo }}</h3>
    <p style="color: var(--color-textGray); margin-block: 5px; font-size: 13px;">{{ movies[currentIndex].generos.join(', ') }}</p>
  </div>

  <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
    <div v-for="(movie, index) in movies" 
         :key="index"
         :class="{ 'dot_active': currentIndex === index, 'dot_inactive': currentIndex !== index }"
         @click="currentIndex = index">
    </div>
  </div>
</template>

<style scoped>

.current__movie__info{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.current__movie__info h3{
  width: 50%; 
  text-align: center; 
  text-overflow: ellipsis;  
  white-space: nowrap; 
  overflow: hidden;
  color: var(--color-white)
}
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
  height: 450px;
}

.movie__slider {
  display: flex;
  transition: transform 0.5s ease;
  height: 450px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  overflow-y: hidden;
  padding-inline: 25px;
  gap: 15px;
  scrollbar-width: none;

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
  border-radius: 20px;
  transition: all 0.2s ;
}
.dot_inactive {
  width: 10px;
  background-color: var(--color-gray);
}
.dot_active {
  width: 30px;
  background-color: var(--color-red);
}

</style>