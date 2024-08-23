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
    suggestions.value = movies.value.filter(movie => 
      movie.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.generos.some(genre => genre.toLowerCase().includes(searchQuery.value.toLowerCase()))
    ).slice(0, 4);
  } else {
    suggestions.value = [];
  }
};

onMounted(allMovies)


</script>

<template>
  <div class="search__wrapper">
    <div class="search__container" :class="{ 'active': showSuggestions }">
      <i class="bi bi-search search__icon"></i>
      <input 
        v-model="searchQuery" 
        @input="updateSuggestions" 
        type="text" 
        class="search__input" 
        placeholder="Search movie, cinema, genre..." 
      />
    </div>

    <transition name="slide-fade">
      <ul v-if="showSuggestions" class="suggestions__list">
        <li v-for="suggestion in suggestions" :key="suggestion._id" @click="router.push(`/movie/${suggestion._id}`)">
          <div class="suggestion__content">
            <div class="suggestion__poster-wrapper">
              <img :src="suggestion.caratula" alt="Movie poster" class="suggestion__poster">
            </div>
            <div class="suggestion__info">
              <h3 class="suggestion__title">{{ suggestion.titulo }}</h3>
              <div class="suggestion__genres">
                <span v-for="(genre, index) in suggestion.generos" :key="index" class="suggestion__genre">
                  {{ genre }}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>

.search__wrapper {
  position: relative;
  max-width: 700px;
  margin: 15px 0px 20px 0px;
  display: flex;
  justify-content: center;

}

.search__container {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  border-radius: 13px;
  background: var(--color-black);
  width: 90%;
  height: 55px;
  border: 1px solid var(--color-white)
}

.search__container.active {
  transform: translateY(-5px);
  border-color: var(--color-white);

}

.search__icon {
  color: var(--color-gray);
  margin-right: 20px;
  font-size: 22px;
  transition: color 0.3s ease;
}

.search__container.active {
  border-color: var(--color-red);
}
.search__container.active .search__icon {
  color: var(--color-red);
}

.search__input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--color-white);
  font-size: 20px;
  font-weight: 300;
  outline: none;
}

.search__input::placeholder {
  color: var(--color-gray);
  font-size: 16px;
}

.suggestions__list {
  position: absolute;
  width: calc(100%);
  top: 70px;
  background: var(--color-black);
  border-radius: 0px 0px 20px 20px;
  list-style-type: none;
  padding: 20px;
  margin: 0;
  z-index: 10;
  box-shadow: 
    inset 5px 5px 15px #1c1c1c,
    inset -5px -5px 15px #383838;
  overflow: hidden;
}

.suggestions__list li {
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 20px;
  margin-bottom: 10px;
}

.suggestions__list li:hover {
  background: #333333;
  box-shadow: 
    5px 5px 10px #1c1c1c,
    -5px -5px 10px #383838;
}

.suggestion__content {
  display: flex;
  align-items: center;
}

.suggestion__poster-wrapper {
  width: 80px;
  height: 120px;
  margin-right: 25px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}

.suggestion__poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.suggestion__content:hover .suggestion__poster {
  transform: scale(1.1);
}

.suggestion__info {
  flex: 1;
}

.suggestion__title {
  color: var(--color-white);
  font-size: 18px;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.suggestion__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.suggestion__genre {
  background: var(--color-gray);
  color: #1c1c1c;
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.suggestion__genre:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--color-gray);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

