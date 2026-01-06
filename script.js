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
            startFireworks();
        }
    }, 500);
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


const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}`;
document.head.appendChild(style);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        for (let i = 0; i < 80; i++) {
            this.particles.push(new Particle(x, y));
        }
    }

    update() {
        this.particles.forEach(p => p.update());
    }

    draw() {
        this.particles.forEach(p => p.draw());
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.color = randomColor();
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 5 + 2;
        this.life = 100;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life--;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    fireworks.push(new Firework(x, y));
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();

        if (fw.particles[0].life <= 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    setInterval(createFirework, 800);
    animateFireworks();
}
