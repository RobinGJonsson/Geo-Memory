/*jshint esversion: 6 */
const imageList = ['assets/images/india.jpg', 'assets/images/greece.jpg',
'assets/images/dubai.jpg','assets/images/uk.jpg', 'assets/images/sweden.jpg',
'assets/images/russia.jpg', 'assets/images/usa.jpg', 'assets/images/italy.jpg', 
'assets/images/austrailia.jpg', 'assets/images/france.jpg'];

//Contains the matched cards 
let matchedCards = [];

//Will recive the first flipped card of and revert back to null after the second card is flipped 
let cardToCheck = null;

//Declare difficulty
let difficulty = 'Easy';

//Declare lvl
let lvl = 1;

//Timer value
let timeLeft = 0;

//Score value
let score = 0;

let savedScore = 0; 

//Moves value
let moves = 0;

//The total number of cards 
let cardCount = 0;

let timer = null;

let flippedTimer = null;

//Call gameOptions when DOM is loaded 
document.addEventListener("DOMContentLoaded", e => {

    //Define difficulty container
    let difficultyContainer = document.querySelector('.choose-difficulty').querySelectorAll('input');
    //Define lvl container
    let lvlContainer = document.querySelector('.choose-lvl').querySelectorAll('input');

    for (const radio of difficultyContainer) {
        radio.addEventListener('change', () => {
            difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        });
    }

    for (const radio of lvlContainer) {
        radio.addEventListener('change', () => {
            lvl = document.querySelector('input[name="lvl"]:checked').value;
        });
    }
    
    //Need to add to the game page specifically??????
    document.querySelector('.start').addEventListener('click', () => {
        startGame(difficulty, lvl);
        savedScore = 0;
    });

    //Increment one level when next level button is clicked and start game 
    document.querySelector('.nxt-lvl').addEventListener('click', () => {
        startGame(difficulty, ++lvl);
    });

    //Open game-start modal to allow change in difficulty and level
    document.querySelector('.new-game').addEventListener('click', () => {
        document.querySelector('.game-start.modal').style.display = 'block';
        savedScore = 0;
    });

    //If close modal button is clicked the modals will display none 
    let allCloseBtns = document.querySelectorAll('.close-modal');
    let allModals = document.querySelectorAll('.modal');
    allCloseBtns.forEach(closeBtn => {
        //Change to choose a specific modal 
        //Change all modals on page to display none
        closeBtn.addEventListener('click', e => {
            allModals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
});

/** Calls all necessary functions to start the game */
function startGame(difficulty, lvl) {

    document.querySelector('.lvl').innerText = lvl;
    document.querySelector('.difficulty-lvl').innerText = difficulty;

    //Make variable to append to the cards to 
    let gameArea = document.querySelector('.game-area');

    //Clear the game area
    document.querySelectorAll('.card').forEach(card => {
        card.remove();
    });

    //Calculate amount of cards based on level 
    cardCount = (lvl * 4 + 4);

    if (lvl > 3) {
        gameArea.style.gridTemplateColumns = 'repeat(5, auto)';
    }

    //Create the cards 
    let cards = addCards(cardCount);

    //Clear matchedCards
    matchedCards = [];
    
    //Set timer based on difficulty
    let timer = document.querySelector('.timer');

    score = 0;

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

    //Add 5 seconds for each level
    timeLeft += (5 * (lvl - 1));

    //set score and moves to 0
    document.querySelector('.score').innerText = score;
    moves = 0;
    document.querySelector('.moves').innerText = 0;

    //Shuffle cards
    shuffleCards(cards);

    //Append the cards to the board
    cards.forEach(card => gameArea.appendChild(card));

    //Start timer
    startTimer(timeLeft);

    //When game starts the view will be of the board
    gameArea.scrollIntoView();
}

/**Returns an array of cards with duplicates */
function addCards(cardCount) {
    //Array of elements to append
    let cardArray = [];

    //Create the cards
    for (const image of imageList.slice(0, (cardCount/2))) {

        //Create two of the same card
        for (var i = 0; i < 2; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            
            //Create card back and front 
            let cardFront = document.createElement('div');
            let cardBack = document.createElement('div');
            let frontImg = document.createElement('img');
            let backImg = document.createElement('img');
            //Give the elements classes and attributes
            cardFront.classList.add('card-front', 'card-face');
            cardBack.classList.add('card-back', 'card-face');
            frontImg.classList.add('front-img');
            frontImg.setAttribute('src', image);
            backImg.setAttribute('src', 'assets/images/back.jpg');

            //Append img elements to the front and back classes
            cardFront.append(frontImg);
            cardBack.append(backImg);

            //Append both sides of the card to card
            card.append(cardFront);
            card.append(cardBack);
 
            card.addEventListener('click', e => {
                flipCard(card);
            });

            //Append card to a list to append to the gameArea after loop is finished
            cardArray.push(card);
        }
    }
    return cardArray;
}

/**Returns true if card isn't currently flipped */
function canFlip(card) {

    //If card does not have the class of visible return true else false
    return !card.classList.contains('visible');
}

/**Adds a visible class to the card that is clicked and calls hideCards if there already are two visible cards on board */
function flipCard(card) {

    let activeCards = document.querySelectorAll('.active');
    
    if (activeCards.length == 2) {
        hideCards(activeCards);
        clearTimeout(flippedTimer);
    }

    if (canFlip(card)) {
        //Increment flips 
        ++moves;
        document.querySelector('.moves').innerText = moves;

        card.classList.add('visible');
        card.classList.add('active');

        //Hide the cards when a new card is clicked 
        if (cardToCheck) {
            //Check if cardToCheck content is equal to the flipped card
            checkMatch(card, cardToCheck);
            cardToCheck = null;
        } else {
            cardToCheck = card;
        }
    }
}

/**Places cardArray on random spaces on board */
function shuffleCards(cardArray) {

    for (var i = cardArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cardArray[randIndex].style.order = i;
        cardArray[i].style.order = randIndex;
    }
}

/**Removes visible from cards */
function hideCards(cardArray) {

    cardArray.forEach(card => {
        card.classList.remove('visible', 'active');
    });
}

/**Starts timer with the time parameter as a basis */
function startTimer(time) {
    
    //Timer value will be based on difficulty 
    let gametimer = document.querySelector('.timer');

    //Set timer interval to 1 second
    timer = setInterval(() => {
        time--;
        timeLeft = time;
        gametimer.innerText = time;

        //If time runs out call gameLose
        if (time == 0){
            stopTimer(timer);
            gameOver('lose');
        }
    }, 1000);
}

/**Calls clearInterval on timer */
function stopTimer(timer) {
    clearInterval(timer);
}

/**Checks if two cards match, if they do call gameOver, if not call hideCards */
function checkMatch(card1, card2) {

    let cardImg1 = card1.querySelector('.front-img').getAttribute('src');
    let cardImg2 = card2.querySelector('.front-img').getAttribute('src');

    if (cardImg1 === cardImg2) {
        //If they match add the card to matchedCards
        matchedCards.push(card1, card2);
        
        [card1, card2].forEach(card => {
            card.classList.remove('active');
        });

        //Increment score 
        score += 10;
        document.querySelector('.score').innerText = score;

        if (matchedCards.length === cardCount) {
            stopTimer(timer);

            //If the level is less than 4  run gameOver win, else the game has reached the end and run gameover
            if (lvl < 4) {
                gameOver('win');    
            } else {
                gameOver('game-over');
            }
        }
    } else {
        //If they don't match flip back over
        let time = 1000;
        switch (difficulty) {
            case 'Easy':
                time = 1000;
                break;
            case 'Medium':
                time = 500;
                break;
            case 'Hard':
                time = 250;
                break;
        }

        //Decrement score
        score -= 2;
        document.querySelector('.score').innerText = score;

        //Display cards for seconds based on difficulty 
        flippedTimer = setTimeout(() => {
            hideCards([card1, card2]);
        }, time);
    }
}

/**Displays the game over modal that represents the reason for the game over */
function gameOver(gameEndReason) {

     //Make submit high score 

    //Display lose modal when game over
    document.querySelector(`.${gameEndReason}.modal`).style.display = 'block';

    calcScore();   
}

/**Calculate and display end results */
function calcScore() {

        //Display difficulty multiplier 
        let difMlp = 1; 
        switch (difficulty) {
            case 'Easy':
                difMlp = 1;
                break;
            case 'Medium':
                difMlp = 2;
                break;
            case 'Hard':
                difMlp = 3;
                break;
        }

        (document.querySelectorAll('.dif-mlp')).forEach(difElement => {
            difElement.innerText = difMlp;
        });
    
        //Display the score
        (document.querySelectorAll('.score')).forEach(scoreElement => {
            scoreElement.innerText = score;
        });

        //Display time multiplier
        (document.querySelectorAll('.time-mlp')).forEach(timeElement => {
            timeLeft = timeLeft == 0 ? 1 : timeLeft;
            timeElement.innerText = timeLeft;
        });

        (document.querySelectorAll('.saved-score')).forEach(savedScoreElement => {
            savedScoreElement.innerText = savedScore;            
        });

        //Calculate final score and display it 
        let finalScore = savedScore + (score * difMlp * timeLeft);
        savedScore = finalScore;
        (document.querySelectorAll('.final-score')).forEach(finalScoreElement => {
            finalScoreElement.innerText = finalScore;
        });
}
