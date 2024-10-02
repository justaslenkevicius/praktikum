const birdButton = document.getElementById('birdButton');
const calculatorButton = document.getElementById('calculatorButton');

const flappybirdGame = document.getElementById('flappybirdGame');
const calculatorApp = document.getElementById('calculatorApp');


function showFlappyBird() {
    flappybirdGame.style.display = 'block';
    calculatorApp.style.display = 'none';

    birdButton.classList.add("active");
    calculatorButton.classList.remove("active");
}

function showCalculator() {
    calculatorApp.style.display = 'block';
    flappybirdGame.style.display = 'none';

    
    birdButton.classList.remove("active");
    calculatorButton.classList.add("active");
}

birdButton.addEventListener('click', showFlappyBird);

calculatorButton.addEventListener('click', showCalculator);