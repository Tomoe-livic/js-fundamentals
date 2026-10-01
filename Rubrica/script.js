const add = document.querySelector("#contactForm");
const inputNome = document.querySelector("#newN");
const inputTel = document.querySelector("#newNu");
const lista = document.querySelector("#list");
let cerca = document.querySelector("#search");
let counting = 0;

let contatti = [];

const datiSalvati = localStorage.getItem("contatti");

if (datiSalvati) {
    contatti = JSON.parse(datiSalvati);
    disegnaLista();
}

add.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = inputNome.value;
    const tel = inputTel.value;

    const numeroEsistente = contatti.some(
        contatto => contatto.telefono === tel
    );

    if (numeroEsistente) {
        alert("Questo numero esiste già!");
        return;
    }

    const nuovoContatto = { nome: nome, telefono: tel, id: counting };
    counting = counting + 1;

    contatti.push(nuovoContatto);

    disegnaLista();
    localStorage.setItem("contatti", JSON.stringify(contatti));
});

function disegnaLista() {

     lista.innerHTML="";

    contatti.forEach(nuovoContatto => {
        lista.innerHTML += `<div class="line"><span>${nuovoContatto.nome}:</span> <span>${nuovoContatto.telefono}</span><button type="button" class="del" data-id="${nuovoContatto.id}">X</button></div><hr>`;
    });

}

lista.addEventListener("click", (evento) => {
    
    if (confirm("Vuoi eliminare questo contatto?")) {
        if (evento.target.classList.contains("del")) {
        const idDaRimuovere = Number(evento.target.dataset.id);
        contatti = contatti.filter(contatto => contatto.id !== idDaRimuovere);
        
        disegnaLista();

        localStorage.setItem("contatti", JSON.stringify(contatti));
        }
    }

});

cerca.addEventListener("input", function() {
    trova();
})

function trova() {
    const testoCercato = cerca.value.toLowerCase();

    lista.innerHTML = "";

    for (let i = 0; i < contatti.length; i++) {
        const contatto = contatti[i];

        if (contatto.nome.toLowerCase().includes(testoCercato)) {
            lista.innerHTML += `<div class="line"><span>${contatto.nome}:</span> <span>${contatto.telefono}</span><button type="button" class="del" data-id="${contatto.id}">X</button></div><hr>`;
        }
    }
}