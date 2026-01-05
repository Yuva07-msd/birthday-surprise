const intro = document.getElementById("intro");
const countdown = document.getElementById("countdown");
const main = document.getElementById("main");
const wish = document.getElementById("wish");
const cake = document.getElementById("cake");
const music = document.getElementById("music");
const count = document.getElementById("count"); 
const canvas  = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let second = 3;
let musicPlaying = false;

function startsuprise() {
    const name = document.getElementById("nameInput").value || "Friend";
    wish.innerHTML = `🎉 Happy Birthday ${name}! 🎉`;

    intro.classList.add("hidden");
    countdown.classList.remove("hidden");

    second = 3;

    const timer = setInterval(() => {
        count.innerHTML = second;
        second--;

        if (second < 0) {
            clearInterval(timer);
            countdown.classList.add("hidden");
            main.classList.remove("hidden");
            createConfetti();
        }
    }, 1000);
}

function blowcandle() {
    document.querySelector(".flame").innerHTML = "💨";
    createConfetti();
}

function togglemusic() {
    if (!musicPlaying) {
        music.play();
    } else {
        music.pause();
    }
    musicPlaying = !musicPlaying;
}

function createConfetti() {
    for (let i = 0; i < 120; i++) { 
        const c = document.createElement("div");
        c.style.position = "absolute";
        c.style.width = "10px";
        c.style.height = "10px";
        c.style.background = randomColor();
        c.style.left = Math.random() * window.innerWidth + "px";
        c.style.top = "-10px";
        c.style.borderRadius = "50%";
        c.style.animation = "fall 3s linear";

        document.body.appendChild(c);
        setTimeout(() => c.remove(), 3000);
    }
}

function randomColor() {
    return ["#ff4081", "#ffc107", "#4caf50", "#2196f3"]
        [Math.floor(Math.random() * 4)];
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}`;
document.head.appendChild(style);

