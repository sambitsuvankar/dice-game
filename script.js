'use strict';

// Selecting Elements.............
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const section0 = document.querySelector('.player--0')
const section1 = document.querySelector('.player--1')

// Starting condition................
let scores, activePlayer, currentScore0, currentScore1 , playing;  // Here we declared the variables
// Initialisation function for starting condition*********
const init = function (){
    activePlayer = 0;
    currentScore0 = 0;  // and here we have assigned the values to the variables
    currentScore1 = 0;
    playing = true;
    scores = [0,0];

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden')
    section0.classList.remove('player--winner');
    section1.classList.remove('player--winner');
    section0.classList.add('player--active');
    section1.classList.remove('player--active');   
};

init(); // here we declared the init function which consists of all the starting constion .

//Rolling Dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
         // 1. generating a random dice roll*********
    const dice = Math.trunc(Math.random()*6) + 1;

    // 2. Display dice***********************
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


    // 3. Check for rolled 1: if true, switch to next player*************

    // Method 1*******************************

    // if(dice !== 1){ // Add dice to curreent score
    //     if(section0.classList.contains('player--active')){
    //         currentScore0 += dice
    //         current0El.textContent = currentScore0;
    //     }
    //     else{
    //         currentScore1 += dice
    //         current1El.textContent = currentScore1;
    //     }
          
        
    // }else{ // Switch to next player
    //     if(section0.classList.contains('player--active')){
    //         current0El.textContent = 0;
    //         section0.classList.remove('player--active')
    //         section1.classList.add('player--active')
            
    //     }
    //     else{
    //         current1El.textContent = 0;
    //         section1.classList.remove('player--active')
    //         section0.classList.add('player--active')
    //     }
    // }


    // Method 2 ****************************
     if (dice !== 1) { //Add dice to current score
        currentScore0 += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore0;

     }else{
         document.getElementById(`current--${activePlayer}`).textContent = 0;
        //  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
         currentScore0 = 0;
         activePlayer = activePlayer === 0 ? 1 : 0;
        //  document.querySelector(`.player--${activePlayer}`).classList.add('player--active')

         //Or we can use here the "toggle" method
         section0.classList.toggle('player--active');
         section1.classList.toggle('player--active');
     }
    }
   
})

// Hold functionality***********

btnHold.addEventListener('click', function(){
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore0;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(scores)

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100){
        playing = false;
        // Finish the game 
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

    }
    // Switch to the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore0 = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    section0.classList.toggle('player--active');
    section1.classList.toggle('player--active');
    }
    
)

btnNew.addEventListener('click', init)