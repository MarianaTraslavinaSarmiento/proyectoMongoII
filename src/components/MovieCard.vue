<script setup>

</script>

<template>

    <div class="movie__card">
        <div class="cover">
            <img src="" alt="">
        </div>
        <div class="movie__overviewer">
            <div>
                <h3>Nombre de la pelicula</h3>
                <small>genero, genero, genero</small>
            </div>
            <button> Watch Trailer</button>
        </div>
        <p>sinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsissinopsis</p>
    </div>

</template>

<style scoped>

.movie__card{
    background-color: blue;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
}



.cover {
    width: 95%;
    height: 60%;
    background-color: red;
    border: 1px solid var(--color-white);
    border-radius: 15px;
}

.movie__overviewer{
    display: flex;
    width: 100%;
    padding-inline: 15px;
    justify-content: space-between;
}

button{
    width: 30%;
    height: 30px;
    border-radius: 5px;
    border: none
}



</style>