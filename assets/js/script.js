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
