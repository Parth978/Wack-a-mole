const squareDivs = document.querySelectorAll(".square");
const startButton = document.querySelector('.start');
const level = document.querySelector('#difficulty');
const counter = document.querySelector('.counter');
const score = document.querySelector('.score');
const endGame = document.querySelector('.over');
const endButton = document.querySelector('.end');

let gameScore = 0;
let gameTime = 30;
let selectRandomSquareTimer;
let decreaseCounterTimer; 

squareDivs.forEach((e) => {
    e.onclick = () => {
        if(e.classList.contains('mole-img')){
            gameScore += 1;
            score.innerText = gameScore;
        } 
    }
})

const selectRandomSquare = () => {
    squareDivs.forEach((e) => {
        e.classList.remove('mole-img');
    })
    const randomDiv = squareDivs[Math.floor(Math.random() * 9)];
    randomDiv.classList.add('mole-img');
}


const decreaseCounter = () => {
    gameTime = gameTime - 1;
    counter.innerText = gameTime + " sec ";
    if (gameTime === 0){
        clearInterval(selectRandomSquareTimer);
        clearInterval(decreaseCounterTimer);
        endGame.innerText = "Game Over";
        startButton.disabled = false;
    }
}

startButton.addEventListener('click',() => {
    gameTime = 30;
    gameScore = 0;
    score.innerText = gameScore;
    endGame.innerText = " ";
    let intervalTime;
    if( level.value === 'easy'){
        intervalTime = 800;
    }else if( level.value === 'medium'){
        intervalTime = 500;
    }else{
        intervalTime = 300;
    }
    selectRandomSquareTimer =setInterval(() => {
        selectRandomSquare();
    },intervalTime);
    decreaseCounterTimer = setInterval(() => {
        decreaseCounter();
    },1000);
    startButton.disabled = true;
    endButton.disabled = false;
})

endButton.addEventListener('click',() => {
    clearInterval(selectRandomSquareTimer);
    clearInterval(decreaseCounterTimer);
    startButton.disabled = false;
    endButton.disabled = true;
    endGame.innerText = "Game Over!";
})