<script setup>

</script>

<template>

    <div class="search__container">
        <i class="bi bi-search search__icon"></i>
        <input
            type="text"
            class="search__input"
            placeholder="Search movie, cinema, genre..."
        />
    </div>
</template>
  

  
<style scoped>
    .search__container {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
        background-color: var(--color-darkGray);
        border: 1px solid  var(--color-lightGray);
        margin: 15px 25px 25px 25px;
        height: 50px;
    }
    
    .search__icon {
        color:var(--color-white);
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

</style>
  