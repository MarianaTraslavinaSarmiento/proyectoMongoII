<script setup>
</script>

<template>
  <div class="screen">
    <img style="width: 80%; " src="../assets/img/vector.png" alt="">
    <small style="color: var(--color-white); position: absolute; top: 100px ;">Screen This Way</small>
  </div>

  <section class="asientos">
    <article class="standard__seats">
      <div fila="1">
        <small>A</small>
        <div class="seat__list">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>

        </div>
      </div>
      <div fila="2">
        <small>B</small>
        <div class="seat__list">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
    </article>
    <article class="premium__seats">
      <div column="3">
        <small>C</small>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>

        </div>
      </div>
      <div column="4">
        <small>D</small>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>

        </div>
      </div>
      <div column="5">
        <small>E</small>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
      <div column="6">
        <small>F</small>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
    </article>
  </section>

  <div class="status__seats">
    
    <div class="item">
      <i style="color: var(--color-black)" class="bi bi-circle-fill"></i>
      <small>Available</small>
    </div>

    <div class="item">
      <i style="color: var(--color-gray)" class="bi bi-circle-fill"></i>
      <small>Reserved</small>
    </div>

    <div class="item">
      <i style="color: var(--color-red)" class="bi bi-circle-fill"></i>
      <small>Selected</small>
    </div>
  
  </div>


</template>

<style scoped>

.status__seats{
  display: flex;
  gap: 45px;
  justify-content: center;
}

.item{
  display: flex;
  gap: 10px;
  color: var(--color-white)
}
.item i{

  font-size: 13px;

}

.screen {
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.asientos {
  padding: 5px 25px;
  color: var(--color-white)
}

.standard__seats {
  margin-bottom: 60px !important;
}

.standard__seats,
.premium__seats {
  display: flex;
  gap: 10px;
  margin: 30px 0;
  flex-direction: column;
  align-items: center;
}

.standard__seats div,
.premium__seats div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seat__list button,
.premium__seats button {
  outline: none;
  border: none;
  width: 35px;
  height: 35px;
  margin: 0 3px;
  background: var(--color-black);
  border-radius: 5px;
}

.premium__seats small {
  margin-right: 6px;
}
</style>