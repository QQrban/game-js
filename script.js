const canvas = document.getElementById("canvas1");
const dropdown = document.getElementById("animations");
let chooseState = "Idle";

const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 120;
const CANVAS_HEIGHT = canvas.height = 130;

const playerImage = new Image();
playerImage.src = `Idle.png`;
const spriteWidth = 128;
const spriteHeight = 150;
let gameFrame = 0;
const staggerFrames = 13;
const spriteAnimations = [];
const animationStates = [
    {
        name: "Walk",
        frames: 7,
        img: "Walk.png",
    },
    {
        name: "Idle",
        frames: 7,
        img: "Idle.png",
    },
    {
        name: "Run",
        frames: 7,
        img: "Run.png",
    },
    {
        name: "Attack",
        frames: 3,
        img: "Attack.png",
    },
    {
        name: "Dead",
        frames: 4,
        img: "Dead.png",
    },
    {
        name: "Grenade",
        frames: 9,
        img: "grenade.png",
    },
    {
        name: "Recharge",
        frames: 13,
        img: "grenade.png",
    },
    {
        name: "Shot_1",
        frames: 4,
        img: "Shot_1.png",
    },
    {
        name: "Shot_2",
        frames: 4,
        img: "Shot_2.png",
    },
];
animationStates.forEach((state) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let posX = j * spriteWidth;
        frames.loc.push(posX);
    }
    spriteAnimations[state.name] = frames;
});

dropdown.addEventListener("change", e => {
    chooseState = e.target.value;
    playerImage.src = `${chooseState}.png`;
});
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
        chooseState = "Run"
    } else if (e.key === "f" || e.key === "F") {
        chooseState = "Shot_1"
    } else if (e.key === "d" || e.key === "D") {
        chooseState = "Shot_2"
    } else if (e.key === "r" || e.key === "R") {
        chooseState = "Recharge"

    } else if (e.key === "g" || e.key === "G") {
        chooseState = "Grenade"
    }
    playerImage.src = `${chooseState}.png`;
});

document.addEventListener("keyup", e => {
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "f" || e.key === "F") {
        chooseState = "Idle"
    }
    playerImage.src = `${chooseState}.png`;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[chooseState].loc.length;
    let frameX = spriteWidth * position
    ctx.drawImage(playerImage, frameX, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}


animate();