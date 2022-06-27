// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
let imageList = [
{name: 'Agra India', img: 'images/Agra India.jpg'}, 
{name: 'Athens Greece', img: 'images/Athens Greece.jpg'}, 
{name: 'Dubai United Arab Emirates', img: 'images/Dubai United Arab Emirates.jpg'}, 
{name: 'London', img: 'images/London.jpg'}, 
{name: 'Malmo Sweden', img: 'images/Malmo Sweden.jpg'}, 
{name: 'Moscow Russia', img: 'images/Moscow Russia.jpg'}, 
{name: 'New York USA', img: 'images/New York USA.jpg'}, 
{name: 'Rome Italy', img: 'images/Rome Italy.jpg'},
{name: 'Sydney Austrailia', img: 'images/Sydney Austrailia.jpg'},
{name: 'Paris France', img: 'images/Paris France.jpg'}]

document.addEventListener("DOMContentLoaded", e => {
    console.log('page loaded')
});

function createBoard() {
    for (image of imageList) {
        let card = document.createElement('div');
        card.classList.add('card');

        card.appendChild(document.createElement('img'))
        let cardChild = card.firstChild
        cardChild.
               
        let gameArea = document.querySelector('.game-content');
        gameArea.append(card)
    }
}

function timer() {
    let timeLeft = 5;
    let time = document.querySelector('.timer');
    let countdown = setInterval(e => {
        timeLeft--
        time.innerText = timeLeft;
        if (timeLeft < 1){
            clearInterval(countdown)
        }
    }, 1000);
}

createBoard()
