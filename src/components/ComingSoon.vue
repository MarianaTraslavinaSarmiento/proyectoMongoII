<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios'

    const movies = ref([])
    let index = 0

    const moviesFetch = async()=>{
        try {
            const res = await axios.get('http://localhost:5001/peliculas');
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
        <div v-for="movie in movies" class="movie__box">
            <img :src="movie.caratula" alt="movie poster" class="movie_image">
            <div class="description">

                <p>{{ movie.titulo }}</p>
                <p>{{ movie.generos.join(', ') }}</p>

            </div>

        </div>
    </div>

</template>

<style scoped>
   .coming__soon {
    margin-top: 10px;
    padding: 5px 25px 0px 25px;
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
    min-width: 100px;
    height: 100px;
    object-fit: cover;
    margin-left: 15px;
    border-radius: 10px;

   }
   .coming__soon__list {
    margin: 0px 25px 10px 25px;
    height: auto;
   }

   .movie__box {
    margin-top: 10px;
    border-radius: 10px;
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
    font-size: 1em;
   }


   .description :last-child{
    font-size: 0.9em;
    margin-top: 5px;
    color: var(--color-gray);
   }


</style>