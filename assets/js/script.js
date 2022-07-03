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
        score = 0;
    });

    //Increment one level when next level button is clicked and start game 
    document.querySelector('.nxt-lvl').addEventListener('click', () => {
        startGame(difficulty, ++lvl)
    })

    //Open game-start modal to allow change in difficulty and level
    document.querySelector('.new-game').addEventListener('click', () => {
        document.querySelector('.game-start.modal').style.display = 'block';
        score = 0;
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
    document.querySelector('.score').innerText = score;
    moves = 0;
    document.querySelector('.moves').innerText = 0;

    //Shuffle cards
    shuffleCards(cards);

    //Append the cards to the board
    cards.forEach(card => gameArea.appendChild(card));

    //Start timer
    startTimer(timeLeft);
}

function addCards(cardCount) {
    //Array of elements to append
    let cardArray = [];

    //Create the cards
    for (const image of imageList.slice(0, (cardCount/2))) {
        console.log(imageList.slice(0, (cardCount/2)))
        console.log('image', image)

        //Create two of the same card
        for (var i = 0; i < 2; i++) {
            let card = document.createElement('div');
            card.classList.add('card')
            
            //Create card back and front 
            let cardFront = document.createElement('div');
            let cardBack = document.createElement('div');
            let frontImg = document.createElement('img');
            let backImg = document.createElement('img');
            //Give the elements classes and attributes
            cardFront.classList.add('card-front', 'card-face');
            cardBack.classList.add('card-back', 'card-face');
            frontImg.classList.add('front-img')
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
        };
    };
    return cardArray;
};

function canFlip(card) {
    console.log('checking to flip ', card)
    //If card does not have the class of visible return true else false
    return !card.classList.contains('visible');
}

function flipCard(card) {

    if (canFlip(card)) {
        console.log(card, 'can be flipped ')
        //Increment flips 
        ++moves;
        document.querySelector('.moves').innerText = moves;

        card.classList.add('visible');

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

function shuffleCards(cardArray) {

    for (var i = cardArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cardArray[randIndex].style.order = i;
        cardArray[i].style.order = randIndex;
    };
}

function hideCards(card1, card2) {

    [card1, card2].forEach(card => {
        card.classList.remove('visible') 
    });
}

function startTimer(time) {
    
    //Timer value will be based on difficulty 
    let gametimer = document.querySelector('.timer');

    //Set timer interval to 1 second
    timer = setInterval(() => {
        time--
        timeLeft = time;
        gametimer.innerText = time;

        //If time runs out call gameOver 
        if (time == 0){
            stopTimer(timer)
            gameOver();
        }
    }, 1000);
}

function stopTimer(timer) {
    clearInterval(timer);
    console.log('stopped timer')
}

function checkMatch(card1, card2) {

    let cardImg1 = card1.querySelector('.front-img').getAttribute('src')
    let cardImg2 = card2.querySelector('.front-img').getAttribute('src')

    if (cardImg1 === cardImg2) {
        //If they match add the card to matchedCards
        matchedCards.push(card1, card2);

        //Increment score 
        score += 10;
        document.querySelector('.score').innerText = score;

        if (matchedCards.length === cardCount) {
            stopTimer(timer);
            gameWin();

        }
    } else {
        //If they don't match flip back over
        let time = 2000;
        switch (difficulty) {
            case 'Easy':
                time = 2000;
                break;
            case 'Medium':
                time = 1000;
                break;
            case 'Hard':
                time = 500;
                break;
        }

        //Decrement score
        score -= 2;
        document.querySelector('.score').innerText = score;

        //Display cards for seconds based on difficulty 
        setTimeout(() => {
            hideCards(card1, card2)
        }, time)
    }
}

function gameOver() {
    //Display lose modal when game over
    document.querySelector('.lose.modal').style.display = 'block';

    calcScore();
}

function gameWin() {
    //Make submit high score 

    //Display lose modal when game over
    document.querySelector('.win.modal').style.display = 'block';

    calcScore();
}

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
            console.log(timeElement)

            timeElement.innerText = ((timeLeft == 0) ? 1 : timeLeft);
        });

        //Calculate final score and display it 
        let finalScore = (score * difMlp * timeLeft);
        (document.querySelectorAll('.final-score')).forEach(finalScoreElement => {
            console.log(finalScoreElement)
            finalScoreElement.innerText = finalScore;
        });

}

