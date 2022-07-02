//ADD docstrings
//when two cards have been flipped Make so that the cards flip back over when a new card is clicked and disregard the default timer  
//Calculate score etc on win screen 
//Start timer after first flipped card

const imageList = ['assets/images/india.jpg', 'assets/images/greece.jpg',
'assets/images/dubai.jpg','assets/images/uk.jpg', 'assets/images/sweden.jpg',
'assets/images/russia.jpg', 'assets/images/usa.jpg', 'assets/images/italy.jpg', 
'assets/images/austrailia.jpg', 'assets/images/france.jpg']

//Contains the matched cards 
let matchedCards = [];

//Will recive the first flipped card of and revert back to null after the second card is flipped 
let cardToCheck = null

//Declare difficulty
let difficulty = 'Easy';

//Declare lvl
let lvl = 1;

//Timer value
let timeLeft = 0;

//Score value
let score = 0;

//Moves value
let moves = 0;

//The total number of cards 
let cardCount = 0;

let timer = null;

//Call gameOptions when DOM is loaded 
document.addEventListener("DOMContentLoaded", e => {

    //Define difficulty container
    let difficultyContainer = document.querySelector('.choose-difficulty').querySelectorAll('input');
    //Define lvl container
    let lvlContainer = document.querySelector('.choose-lvl').querySelectorAll('input');

    /*WHY DOESN'T THIS WORK???????????

    for (radio of difficultyContainer) {
        console.log(radio)
        radio.addEventListener('change', e => {
            console.log(radio)
            difficulty = radio.value;
            console.log(difficulty)
        })
    }


    for (radio of lvlContainer) {
        console.log(radio)
        radio.addEventListener('change', e => {
            lvl = radio.value;
            console.log(lvl)
        })
    }
    */

    for (const radio of difficultyContainer) {
        console.log(radio)
        radio.addEventListener('change', () => {
            difficulty = document.querySelector('input[name="difficulty"]:checked').value;
            console.log(difficulty)
        })
    }

    for (const radio of lvlContainer) {
        console.log(radio)
        radio.addEventListener('change', () => {
            lvl = document.querySelector('input[name="lvl"]:checked').value;
            console.log(lvl)
        })
    }
        
    //Need to add to the game page specifically??????
    document.querySelector('.start').addEventListener('click', () => {
        startGame(difficulty, lvl);
    });

    //Increment one level when next level button is clicked and start game 
    document.querySelector('.nxt-lvl').addEventListener('click', () => {
        startGame(difficulty, ++lvl)
    })

    //Open game-start modal to allow change in difficulty and level
    document.querySelector('.new-game').addEventListener('click', () => {
        document.querySelector('.game-start.modal').style.display = 'block';
    });

    //If close modal button is clicked the modals will display none 
    let allCloseBtns = document.querySelectorAll('.close-modal');
    let allModals = document.querySelectorAll('.modal');
    allCloseBtns.forEach(closeBtn => {
        //Change to choose a specific modal 
        //Change all modals on page to display none
        closeBtn.addEventListener('click', e => {
            allModals.forEach(modal => {
                modal.style.display = 'none'
            });
        });
    });
});

function startGame(difficulty, lvl) {

    document.querySelector('.lvl').innerText = lvl;
    document.querySelector('.difficulty-lvl').innerText = difficulty;

    //Make variable to append to the cards to 
    let gameArea = document.querySelector('.game-area');

    //Clear the game area
    console.log(document.querySelectorAll('.card'))

    document.querySelectorAll('.card').forEach(card => {
        card.remove();
    });

    //Calculate amount of cards based on level 
    cardCount = (lvl * 4 + 4)

    //Create the cards 
    let cards = addCards(cardCount);

    //Clear matchedCards
    matchedCards = [];
    
    //Set timer based on difficulty
    let timer = document.querySelector('.timer')

    switch (difficulty) {
        case 'Easy':
            timeLeft = 60;
            timer.innerText = timeLeft;
            break;
        case 'Medium':
            timeLeft = 45;
            timer.innerText = timeLeft;
            break;
        case 'Hard':
            timeLeft = 30;
            timer.innerText = timeLeft;
            break;
    }

    //set score and moves to 0
    score = 0;
    document.querySelector('.score').innerText = 0;
    moves = 0;
    document.querySelector('.moves').innerText = 0;

    //Shuffle cards
    shuffleCards(cards);

    //Append the cards to the board
    cards.forEach(card => gameArea.appendChild(card));

    //Start timer
    startTimer(timeLeft);
}
