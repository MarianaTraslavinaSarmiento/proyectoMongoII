<script setup></script>
<template>
    <body>
        <div class="splash__background"></div>
        <div class="splash__container">
            <div class="content">
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/3d-cinema-illustration-download-in-png-blend-fbx-gltf-file-formats--red-logo-movie-film-glasses-pack-entertainment-illustrations-3902086.png"
                    alt="Cinema Icon" class="cinema__icon" />
                <h1>Discover Your Next Movie Adventure!</h1>
                <p>
                    Explore our wide selection of movies and book your tickets easily.
                </p>
            </div>
            <div class="buttons">
                <button class="login__button">Login</button>
                <button class="register__button">Register</button>
            </div>
        </div>
    </body>
</template>

<style scoped>
body {
    margin: 0;
    background-color: var(--color-background);
    color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    position: relative;
}

.splash__container {
    z-index: 1;
    text-align: center;
    padding: 40px;
    border-radius: 15px;
    background: var(--color-background);
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cinema__icon {
    width: 23rem;
    height: 23rem;
    animation: bounce 3s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

h1 {
    font-size: 32px;
    margin-bottom: 15px;
    color: var(--color-red);
    letter-spacing: 1.5px;
    animation: fadeIn 1.5s ease-in;
}

p {
    font-size: 18px;
    margin-bottom: 100px;
    color: #ddd;
    max-width: 400px;
    animation: fadeIn 1.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
}

.login__button,
.register__button {
    padding: 12px 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    width: 45%;
    transition: transform 0.3s, background-color 0.3s, color 0.3s;
    font-weight: bold;
}

.login__button {
    background-color: var(--color-red);
    color: var(--color-white);
}

.register__button {
    background-color: transparent;
    border: 2px solid var(--color-red);
    color: var(--color-red)
}

.login__button:hover {
    transform: scale(1.05);
    background-color: #ff3333;
}

.register__button:hover {
    transform: scale(1.05);
    background-color: #ff0000;
    color: var(--color-white);
    border-color: #ff3333;
}
</style>
