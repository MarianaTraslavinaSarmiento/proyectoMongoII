<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios'

const movie = ref([])
let index = 0

const moviesFetch = async()=>{
    try {
        const res = await axios.get('');
        movie.value = res.data;
    } catch (error) {
        console.error(error)
    }
}







</script>

<template>

    <div class="now__playing">
        <p>Now playing</p>      
        <p>See all</p>  
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


</style>