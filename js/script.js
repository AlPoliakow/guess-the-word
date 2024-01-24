const guessedLettersElement = document.querySelector(".guessed-letters");
const button =document.querySelector(".guess");
const letterInput = document.querySelector(".guess-form input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters=[]; 


const placeholder = function (){
    const placeholderLetters=[]; 
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText= placeholderLetters.join("");
};


placeholder(word);


button.addEventListener("click", function(e){
    e.preventDefault(); 
    message.innerText="";

    const guess = letterInput.value.toUpperCase();
    const validatedGuess= validateInput(guess);
   
   letterInput.value="";
   makeGuess(validatedGuess); 
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {  
        message.innerText="Please enter a letter to guess";
    } else if (input.length > 1){ 
        message.innerText = "Please guess one letter a time";
    } else if (!input.match(acceptedLetter)) {   
        message.innerText = "Please make sure your guess is a letter (a-z)";
    } else {
        message.innerText = "Your guess has been accepted"
        return input;
    }
};


const makeGuess = function(guess){
    guess=guess.toUpperCase(); 

    if (guessedLetters.includes(guess)){
    message.innerText='You have already guessed that letter, try a different letter';
    } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    displayGuessedLetters(guess);
    updateWordInProgress(guessedLetters);
    }
};

const displayGuessedLetters = function(){
    guessedLettersElement.innerHTML="";
    for (const letter of guessedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    const revealLetter = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealLetter.push(letter.toUpperCase());
        } else {
            revealLetter.push("●");
        }
    }
    wordInProgress.innerText = revealLetter.join("");
    checkForWin();
};

const checkForWin = function () { 
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

