const holes = document.querySelectorAll('.hole');
let scoreBoard = document.getElementById('score');
let startButton = document.getElementById('start-button');
let level = 1;
let score = 0;
let timeUp = false;
let lastHole;

const backgrounds = [
    'girlfriend.jpg',   
    'girlfriend-level2.jpg'
];

const moleImages = [
    'your-face.jpg',      
    'your-face-level2.jpg'
];

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    scoreBoard.textContent = score;
    timeUp = false;
    level = 1;
    updateLevel();
    peep();
}

function updateLevel() {
    document.body.style.backgroundImage = `url(${backgrounds[level - 1]})`;
    const moles = document.querySelectorAll('.mole');
    moles.forEach(mole => mole.style.backgroundImage = `url(${moleImages[level - 1]})`);
}

function nextLevel() {
    level++;
    if (level > backgrounds.length) {
        alert('არა ბიჭოს ახლა არ დამიჭერდი');
        return;
    }
    score = 0;
    scoreBoard.textContent = score;
    updateLevel();
    peep();
}

function whack(e) {
    if (!e.isTrusted) return; // Cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
    if (score >= 5) {
        timeUp = true; // Stop current level
        setTimeout(() => {
            nextLevel();
            timeUp = false; // Resume game in next level
        }, 1000); // Move to next level after a short pause
    }
}

document.querySelectorAll('.mole').forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);
