<script setup>
</script>

<template>
  <div class="screen">
    <img style="width: 80%; " src="../assets/img/vector.png" alt="">
    <small style="color: var(--color-white); position: absolute; top: 85px ; z-index: 5;">Screen This Way</small>
  </div>

  <section class="asientos">
    <article class="standard__seats">
      <div fila="1">
        <small>A</small>
        <div class="seat__list">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>

        </div>
      </div>
      <div fila="2">
        <small>B</small>
        <div class="seat__list">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
        </div>
      </div>
    </article>
    <article class="premium__seats">
      <div column="3">
        <small>C</small>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>

        </div>
      </div>
      <div column="4">
        <small>D</small>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>

        </div>
      </div>
      <div column="5">
        <small>E</small>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
        </div>
      </div>
      <div column="6">
        <small>F</small>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>

.screen {
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.asientos {
  padding: 0 25px;
  color: var(--color-white)
}

.standard__seats {
  margin-bottom: 55px !important;
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
  background: #323232;
  border-radius: 5px;
}

.premium__seats small {
  margin-right: 6px;
}
</style>