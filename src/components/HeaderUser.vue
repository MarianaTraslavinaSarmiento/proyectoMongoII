<script setup>
</script>

<template>
    
    <div class="user__header">
        <div class="user__info">
            <img class="user__avatar" src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" />
            <div class="user__greeting">
                <p class="user__name">Hi, Mariana Traslaviña!</p>
                <p class="user__message">Let's watch a movie together!</p>
            </div>
        </div>
        <div class="notification__icon">
            <i class="bi bi-bell"></i>
        </div>
    </div>

</template>

<style scoped>
.user__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 5px 15px;
  background-color: var(--color-background);
  color: var(--color-white);
  
}

.user__info {
  display: flex;
  align-items: center;
}

.user__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user__greeting {
  display: flex;
  flex-direction: column;
  gap: 3px
}

.user__name {
  font-weight: bold;

}

.notification__icon {
    width: 45px;
    height: 45px;
    color: var(--color-white);
    border: 1px solid #888888c5;
    margin-right: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.notification__icon i{
    font-size: 25px;
}


</style>