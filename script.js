const holes = document.querySelectorAll('.hole');
let scoreBoard = document.getElementById('score');
let startButton = document.getElementById('start-button');
let level = 1;
let score = 0;
let timeUp = false;
let lastHole;

const backgrounds = [
    'girlfriend.jpg',    // Background for level 1
    'girlfriend-level2.jpg', // Background for level 2
    'girlfriend-level3.jpg', // Background for level 3
    'girlfriend-level4.jpg', // Background for level 4
    'girlfriend-level5.jpg', // Background for level 5
    'girlfriend-level6.jpg'  // Background for level 6
];

const moleImages = [
    'your-face.jpg',      // Mole image for level 1
    'your-face-level2.jpg', // Mole image for level 2
    'your-face-level3.jpg', // Mole image for level 3
    'your-face-level4.jpg', // Mole image for level 4
    'your-face-level5.jpg', // Mole image for level 5
    'your-face-level6.jpg', // Mole image for level 5
    
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
    level = 1; // Start from level 1
    scoreBoard.textContent = score;
    timeUp = false;
    updateLevel(); // Initialize with level 1
    peep();
}

function updateLevel() {
    if (level <= backgrounds.length) {
        document.body.style.backgroundImage = `url(${backgrounds[level - 1]})`;
        const moles = document.querySelectorAll('.mole');
        moles.forEach(mole => mole.style.backgroundImage = `url(${moleImages[level - 1]})`);
    }
}

function nextLevel() {
    level++;
    if (level > backgrounds.length) {
        alert('Game Over! You have completed all levels.');
        return;
    }
    score = 0;
    scoreBoard.textContent = score;
    updateLevel(); // Change background and mole image for new level
    peep();
}

function whack(e) {
    if (!e.isTrusted) return; // Cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
    if (score >= 5) {
        timeUp = true; // Stop the current level
        setTimeout(() => {
            nextLevel();
            timeUp = false; // Resume game in the next level
        }, 1000); // Move to next level after a short pause
    }
}

document.querySelectorAll('.mole').forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);
