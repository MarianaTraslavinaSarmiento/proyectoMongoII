<script setup>

import { ref } from 'vue';
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router';


const login = ref({
  nickname: '',
  password: ''
})


const onSubmit = ref()


const userLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5001/usuarios/login', login.value, {withCredentials: true});
      router.push('/home')

  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Try again',
      confirmButtonColor: '#FE0000',
      iconColor: '#FE0000',
      width: '95%',
      background: '#1f1f1f',
      color: 'white',
      customClass: 'border'
    })
  }
};
</script>

<template>
  <main>

    <img style="width: 300px; margin-bottom: 1rem;" src="/img/logoCC.png" alt="">
    <div class="login__container">
      <div class="login__header">
        <h2 class="login__title">Login here</h2>
        <p class="login__subtitle">Welcome back, you've been missed!</p>
      </div>
      <form @submit.prevent="onSubmit" class="form">
        <div class="input__group">
          <input type="text" v-model="login.nickname" placeholder="Username" required />
        </div>
        <div class="input__group">
          <input type="password" v-model="login.password" placeholder="Password" required />
        </div>
        <button type="submit" class="login__button" @click="userLogin">Sign in</button>
      </form>
    </div>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D');
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.646);
  z-index: -1;
  pointer-events: none;
}

body {
  background-color: var(--color-background);
  color: var(--color-white);
  margin: 0;
  padding: 0;

  height: 100vh;
}


.login__container {
  max-width: 350px;
  width: 100%;
  padding: 40px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg,
      var(--color-grayMovieSummary) 0%,
      var(--color-background) 100%);
}

.login__header {
  margin-bottom: 50px;
  text-align: center;
}

.login__title {
  font-size: 28px;
  color: var(--color-red);
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.login__subtitle {
  font-size: 16px;
  color: var(--color-gray);
  font-weight: 300;
}

.form {
  display: flex;
  flex-direction: column;
}

.input__group {
  margin-bottom: 20px;
}

.input__group input {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid var(--color-gray);
  border-radius: 12px;
  background-color: var(--color-grayMovieSummary);
  color: var(--color-white);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.input__group input::placeholder {
  color: var(--color-textGray);
  font-style: italic;
}

.input__group input:focus {
  border-color: var(--color-red);
  box-shadow: 0 0 8px rgba(254, 0, 0, 0.5);
  outline: none;
}

.login__button {
  padding: 14px;
  font-size: 16px;
  color: var(--color-white);
  margin-top: 50px;
  background: linear-gradient(145deg, #fe0000, #d50000);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.login__button:hover {
  background: linear-gradient(145deg, #d50000, #fe0000);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

@keyframes backgroundAnimation {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 100%;
  }
}

.login__container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background: radial-gradient(circle at center,
      rgba(255, 255, 255, 0.1),
      rgba(0, 0, 0, 0.1));
  opacity: 0.3;
  z-index: 1;
}

.login__container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.login__container * {
  position: relative;
  z-index: 3;
}
</style>
