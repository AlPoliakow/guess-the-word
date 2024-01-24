const guessedLetters = document.querySelector(".guessed-letters");
const button =document.querySelector(".guess");
const input = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainginSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = function (){
    const placeholderLetters=[]; 
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    };
    progress.innerText= placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function(e){
    e.preventDefault(); 
    const guess = input.value;
    console.log(guess);
    input.value="";
});

