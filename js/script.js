const guessedLetters = document.querySelector(".guessed-letters");
const button =document.querySelector(".guess");
const input = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainginSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

//guess word
const word = "magnolia";


 

const placeholder = function (){
    const placeholderLetters=[]; //empty array 
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    };
    progress.innerText= placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function(e){
    e.preventDefault(); // prevents page automatically reloading
    const guess = input.value;
    console.log(guess);
    input.value=""; //value, not innerText as it's for an input
});

