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

    <div class="coming__soon">
        <p>Coming soon</p>      
        <p>See all</p>  
    </div>

    <div class="coming__soon__list">
        <div v-for="movie in movies" :key="movie.id" class="movie__box">
            <img :src="movie.caratula" alt="movie poster" class="movie_image">
            <div class="description">

                <p>{{ movie.titulo }}</p>
                <p>{{ movie.generos.join(', ') }}</p>
                <p>Clasificación: {{ movie.clasificacion }}</p>

            </div>

        </div>
    </div>

</template>

<style scoped>
   .coming__soon {
    margin-top: 10px;
    padding: 5px 15px 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   }

   .coming__soon p:first-child{
    color: var(--color-white);
    font-weight: bold;
    font-size: 1.2em;
   }

   .coming__soon :last-child{
    color: var(--color-red);
    font-weight: bold;
    font-size: 1em;
   }

   .movie_image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-left: 15px;
    border-radius: 10px;

   }
   .coming__soon__list {
    margin: 0px 15px 10px 15px;
   }

   .movie__box {
    margin-top: 13px;
    border-radius: 15px;
    height: 120px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color-white);
    background-color: var(--color-darkGray);
   }

   .description{
    gap: 3px
   }
   .description :first-child{
    font-weight: bold;
    font-size: 1.1em;
   }

   .description :last-child{
    font-size: 1em;
    margin-top: 10px;
    font-style: italic;
    color: var(--color-gray);
   }


</style>