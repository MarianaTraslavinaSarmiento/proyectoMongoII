<script setup>
</script>

<template>
    <main>
        <img style="width: 330px" src="../../public/img/logoCC.png" alt="">
        <div class="signup__container">
            <div class="signup__header">
                <h2 class="signup__title">Create an Account</h2>
                <p class="signup__subtitle">Join us and enjoy the experience!</p>
            </div>
            <form @submit.prevent="onSubmit" class="form">
                <div class="input__group">
                    <input type="text" v-model="fullName" placeholder="Full Name" required />
                </div>
                <div class="input__group">
                    <input type="email" v-model="email" placeholder="Email" required />
                </div>
                <div class="input__group">
                    <input type="text" v-model="username" placeholder="Username" required />
                </div>
                <div class="input__group">
                    <input type="password" v-model="password" placeholder="Password" required />
                </div>
                <div class="input__group">
                    <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
                </div>
                <button type="submit" class="signup__button">Sign up</button>
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
    background-color: var(--color-background);
    color: var(--color-white);
    margin: 0;
    padding: 0;
    height: 100vh;
    background-image: url('https://www.wradio.com.co/resizer/v2/FT4AKMQSPND7DIMMX6Z7FDJHO4.jpg?auth=9e61e4cea0af5a9c650539ef8c8ff13cd1d3ad778ff31d14304346cd36f04238&width=1600&quality=70&smart=true');
    background-position: center;
    position: relative;
    z-index: 1;
    gap: 25px
}

main::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.758);
    z-index: -1; 
    pointer-events: none; 
}


.signup__container {
    max-width: 400px;
    width: 85%;
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

.signup__header {
    margin-bottom: 30px;
    text-align: center;
}

.signup__title {
    font-size: 28px;
    color: var(--color-red);
    margin-bottom: 10px;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.signup__subtitle {
    font-size: 16px;
    color: var(--color-gray);
    font-weight: 300;
    margin-bottom: 50px;
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

.signup__button {
    padding: 14px;
    font-size: 16px;
    color: var(--color-white);
    margin-top: 30px;
    background: linear-gradient(145deg, #fe0000, #d50000);
    border: none;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.signup__button:hover {
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

.signup__container::before {
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

.signup__container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
}

.signup__container * {
    position: relative;
    z-index: 3;
}
</style>