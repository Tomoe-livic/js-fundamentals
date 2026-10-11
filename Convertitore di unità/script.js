const tipologia = document.querySelector("#tipologia");
const valori = document.querySelectorAll(".valore");
const numeri = document.querySelectorAll(".numero");

const lunghezza = {
    millimetro: 0.001,
    centimetro: 0.01,
    decimetro: 0.1,
    metro: 1,
    decametro: 10,
    ettometro: 100,
    chilometro: 1000,
};

const volume = {
    millilitro: 0.001,
    centilitro: 0.01,
    decilitro: 0.1,
    litro: 1,
    decalitro: 10,
    ettolitro: 100,
    chilolitro: 1000,
};

const massa = {
    milligrammo: 0.001,
    centigrammo: 0.01,
    decigrammo: 0.1,
    grammo: 1,
    decagrammo: 10,
    ettogrammo: 100,
    chilogrammo: 1000,
};

const tempo = {
    secondo: 1,
    minuto: 60,
    ora: 3600,
    giorno: 86400,
};

const versoCelsius = {
    celsius: x => x,
    kelvin: x => x - 273.15,
    fahrenheit: x => (x - 32) * 5 / 9,
};

const daCelsius = {
    celsius: x => x,
    kelvin: x => x + 273.15,
    fahrenheit: x => x * 9 / 5 + 32,
};

const tabelle = {
    lunghezza: lunghezza,
    volume: volume,
    massa: massa,
    tempo: tempo,
};

tipologia.addEventListener("change", () => {
    let currentSet = document.querySelector(".set.attivo");
    currentSet.classList.remove("attivo");
    document.querySelector(".set." + tipologia.value).classList.add("attivo");
});

valori.forEach(menu => {
    menu.addEventListener("change", () => {
        let menuAttivi = document.querySelectorAll(".set.attivo .valore");
        if (tipologia.value === "temperatura") {
            let celsius = versoCelsius[menuAttivi[0].value](Number(numeri[0].value));
            numeri[1].value = Number(daCelsius[menuAttivi[1].value](celsius).toFixed(10));
        } else {
            let tabella = tabelle[tipologia.value];
            numeri[1].value = Number((Number(numeri[0].value) * tabella[menuAttivi[0].value] / tabella[menuAttivi[1].value]).toFixed(10));
        }    
    });
})

numeri[0].addEventListener("input", () => {
    let menuAttivi = document.querySelectorAll(".set.attivo .valore");
    if (tipologia.value === "temperatura") {
        let celsius = versoCelsius[menuAttivi[0].value](Number(numeri[0].value));
        numeri[1].value = Number(daCelsius[menuAttivi[1].value](celsius).toFixed(10));
    } else {
        let tabella = tabelle[tipologia.value];
        numeri[1].value = Number((Number(numeri[0].value) * tabella[menuAttivi[0].value] / tabella[menuAttivi[1].value]).toFixed(10));
    }
});

numeri[1].addEventListener("input", () => {
    let menuAttivi = document.querySelectorAll(".set.attivo .valore");
    if (tipologia.value === "temperatura") {
        let celsius = versoCelsius[menuAttivi[1].value](Number(numeri[1].value));
        numeri[0].value = Number(daCelsius[menuAttivi[0].value](celsius).toFixed(10));
    } else {
        let tabella = tabelle[tipologia.value];
        numeri[0].value = Number((Number(numeri[1].value) * tabella[menuAttivi[1].value] / tabella[menuAttivi[0].value]).toFixed(10));
    }
});