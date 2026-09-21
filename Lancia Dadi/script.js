const lancio = document.querySelector("#throw");
const aggiungi = document.querySelector("#plus");
const rimuovi = document.querySelector("#minus");
const dado = document.querySelector(".dado");
const main = document.querySelector("#main");
let conteggio = 0;

lancio.addEventListener("click", function () {
    const dadi = document.querySelectorAll(".dado");

    dadi.forEach(dado => {

        function scegliFaccia() {
            let facce = dado.querySelectorAll(".dice");
            return facce[Math.floor(Math.random() * 6)];
        };

        const currentFace = dado.querySelector(".active");
        let nextFace = scegliFaccia();

    currentFace.classList.remove("active");
    nextFace.classList.add("active");
    });
    calcolaDadi();
});

aggiungi.addEventListener("click", function() {
    
if (conteggio < 17) {
        const copia = dado.cloneNode(true);
        main.appendChild(copia);
        conteggio = conteggio + 1;
    };
    calcolaDadi();
});

rimuovi.addEventListener("click", function() {
    if (conteggio > 0) {
        main.lastElementChild.remove();
        conteggio = conteggio - 1;
    };
    calcolaDadi();
});

function calcolaDadi() {
    const dadi = document.querySelectorAll(".dado");
    const listaDadi = Array.from(dadi);
    const totale = listaDadi.reduce((somma, dado) => {
    const facciaAttiva = dado.querySelector(".active");
    const valore = Number(facciaAttiva.dataset.value);
    return somma + valore;
}, 0);

document.querySelector("#calcolo").textContent = totale;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}