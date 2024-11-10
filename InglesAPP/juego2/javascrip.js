let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 30; // Tiempo en segundos para el juego
let tiempoRegresivoId = null;

// Selección de elementos del DOM
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// Definición de los audios
let winAudio = new Audio('./sonido/ganar.wav');
let loseAudio = new Audio('./sonido/perder.wav');
let clickAudio = new Audio('./sonido/sound (5).wav');
let pares = new Audio('./sonido/sound (2).wav');

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;

        if (tiempo <= 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(); // Bloquea todas las tarjetas
            loseAudio.play(); // Reproducir sonido de pérdida
            mostrarTiempo.innerHTML = "Tiempo agotado";
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = `<img src="./imagen/${numeros[i]}.png" alt="">`;
        tarjeta.disabled = true;
    }
}

function destapar(id) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    
    if (tarjetasDestapadas === 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./imagen/${primerResultado}.png" alt="">`;
        clickAudio.play();
        tarjeta1.disabled = true;

    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./imagen/${segundoResultado}.png" alt="">`;
        clickAudio.play();
        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            pares.play(); // Sonido al hacer un par

            if (aciertos === 8) {
                winAudio.play(); // Sonido de victoria
                mostrarAciertos.innerHTML = `¡Felicidades! Movimientos: ${movimientos}`;
                clearInterval(tiempoRegresivoId);
            }
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

function reiniciarJuego() {
    clearInterval(tiempoRegresivoId);

    tiempo = 30;
    tarjetasDestapadas = 0;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;

    numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    numeros = numeros.sort(() => Math.random() - 0.5);

    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;

    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }
}
