

let score0Ele = document.getElementById('score--0');
let score1Ele = document.getElementById('score--1');
const userName = document.getElementById('name--0');
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let diceEle = document.querySelector('.dice');
const rules = document.querySelector('.modal')
//Starting conditions 
let scores, currentScore, activePlayer, playing;
const init = () => {
    //Game conditions 
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    //environmental variable
    playing = true;
    
    diceEle.classList.add('hidden');
    userName.textContent = 'Tonysmile'

    score0Ele.textContent = 0;
    score1Ele.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();
const switchPlayer = () => {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

}

//On load function
rules.addEventListener('onload', function(){
    rules.classList.remove('hidden')
})
//Rolling Dice Functionality 
btnRoll.addEventListener('click', function () {
    if (playing) {
        //generating random dice roll
        let dice = Math.trunc(Math.random() * 6) + 1;

        //Displaying the dice
        diceEle.classList.remove('hidden');
        diceEle.src = `dice-${dice}.png`

        if (dice !== 1) {
            //Add dice number to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //Switch player
            switchPlayer();
        }
    }
})
//Add Currentpoints to total points
btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            //finish the game
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEle.classList.add('hidden');
        } else {
            //Switch to next player
            switchPlayer();
        }
    }

})
//Reset the game

btnNew.addEventListener('click', init)