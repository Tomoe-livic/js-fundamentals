const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const round = document.querySelector("#round");
const counter = document.querySelector("#counter");
const times = document.querySelector("#times");
let counting = 0;
let interval;
let time = 0;

play.addEventListener("click", function () {
    play.hidden = true;
    stop.hidden = false;
    round.disabled = false;
    round.hidden = false;
    reset.hidden = true;
    interval = setInterval(function () {
        time++;
        const cent = time % 100;
        const sec = Math.floor(time / 100) % 60;
        const min = Math.floor(time / 6000) % 60;
        const hour = Math.floor(time / 360000);
        counter.textContent = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(cent).padStart(2, "0")}`;
}, 10);
});

stop.addEventListener("click", function () {
    play.hidden = false;
    stop.hidden = true;
    round.hidden = true;
    reset.hidden = false;
    clearInterval(interval)
});

reset.addEventListener("click", function () {
    round.disabled = true;
    round.hidden = false;
    reset.hidden = true;
    times.innerHTML = "";
    counting = 0;
    time = 0;
    counter.textContent = "00:00:00,00";
});

round.addEventListener("click", function () {
    counting = counting + 1;

    if (counting > 1) {
        times.innerHTML += `<hr>`;
    }

    times.innerHTML += `<div class="rounds" style="display: flex; justify-content: space-between;"><span>Round ${counting}:</span> <span>${counter.textContent}</span></div>`;
    
     times.scrollTop = times.scrollHeight;
});