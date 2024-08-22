<script setup>
import router from '@/router';
import { onMounted, ref, computed } from 'vue';


const searchQuery = ref('')
const suggestions = ref([])

const showSuggestions = computed(() => {
  return searchQuery.value.length > 0 && suggestions.value.length > 0;
})


const movies = ref([])

const allMovies = async () => {

  try {
    const res = await fetch('http://localhost:5001/peliculas')
    const data = await res.json();
    movies.value = data

  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

const updateSuggestions = () => {
  if (searchQuery.value) {
    suggestions.value = movies.value.filter(movie => movie.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())).slice(0, 5);
  }
};

onMounted(allMovies)


</script>

<template>
  <div class="search__container">
    <i class="bi bi-search search__icon"></i>
    <input v-model="searchQuery" @input="updateSuggestions" type="text" class="search__input" placeholder="Search movie, cinema, genre..." />
  </div>

  <ul v-if="showSuggestions" class="suggestions__list">
    <li v-for="suggestion in suggestions" :key="suggestion._id" @click="router.push(`/movie/${suggestion._id}`)">
      {{ suggestion.titulo }}
    </li>
  </ul>

</template>
  
<style scoped>
.search__container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--color-darkGray);
  border: 1px solid var(--color-lightGray);
  margin: 15px 25px 25px 25px;
  height: 50px;
  position: relative;
}

.search__icon {
  color: var(--color-white);
  margin-right: 10px;
  font-size: 20px;
}

.search__input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--color-white);
  font-size: 16px;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.suggestions__list {
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  background-color: var(--color-darkGray);
  border: 1px solid var(--color-lightGray);
  border-top: none;
  border-radius: 0 0 10px 10px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1;
}

.suggestions__list li {
  padding: 10px;
  cursor: pointer;
  color: var(--color-white);
}

.suggestions__list li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
  