const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
    const letterDivs= document.querySelectorAll('.letter-box');

    for (let letterDiv of letterDivs){

      console.log("letterDiv classList", letterDiv.classList[1])

      if (letter === letterDiv.classList[1]){
        letterDiv.innerHTML = letter;
      }
    }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  // if numWrong equals 5, 
      //disable all buttons
      // show the hidden element (with id "play-again")
  //otherwise increment numWrong and update the image
  // display: ''

  // update the image
  const imageSection = document.querySelector('#shark-img');
  // console.log(imageSection.children);
  const image = imageSection.children[0];
  image.src = `/static/images/guess${numWrong}.png`;
  

  let buttons = document.querySelectorAll('button');
  let playAgain = document.getElementById('play-again');
  // console.log("playagain", playAgain);

  // console.log(buttons);
  if (numWrong === 5){
    for (let button of buttons){
      playAgain.style.display = ' ';
      button.disabled = true;
      playAgain.style.display = "block";
    }
    return;
  } 
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();
  
  
  for (const button of document.querySelectorAll('button')) {
    
    button.addEventListener('click', (evt) => {
      button.disabled = true;

      const letter = evt.target.innerHTML;
      if (isLetterInWord(letter)) {
          handleCorrectGuess(letter);
      }else {
        handleWrongGuess();
      }
    });
  }

  // add an event handler to handle clicking on the Play Again button
  // YOUR CODE HERE
  let playAgainBtn = document.getElementById('play-again');
    playAgainBtn.addEventListener('click', () => {
      resetGame();
      startGame();
   })
 

})();
