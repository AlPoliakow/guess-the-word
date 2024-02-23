const guessedLettersElement = document.querySelector(".guessed-letters");
const button =document.querySelector(".guess");
const letterInput = document.querySelector(".guess-form input");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
let word="magnolia";
var remainingGuesses= 8;
let guessedLetters=[]; 
const guessForm = document.querySelector(".enter");
const guessBox = document.querySelector(".letter");

const getWord = async function (){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    console.log(randomIndex); 
    word = wordArray[randomIndex].trim(); 
    placeholder(word);
};

getWord();

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
    guessCount(guess);
    updateWordInProgress(guessedLetters);
    }
};

const displayGuessedLetters = function(){
    guessedLettersElement.innerHTML="";
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    for (const letter of guessedLetters){
        if (!wordArray.includes(letter)){
            const li = document.createElement("li");
            li.innerText = letter;
            guessedLettersElement.append(li);
    }
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

const guessCount = function(guess){
    wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)){
        message.innerText="You guessed one of the mystery letters!";
    } else {
        message.innerText = `Good guess, but the mystery word doesn't include "${guess}".`;
        remainingGuesses=remainingGuesses-1;
    }

    if (remainingGuesses===0){
        message.innerHTML=`<p>GAMEOVER<br> ☠ ☠ ☠ <br><br>The mystery word was "${wordUpper}"</p>`;
        startOver();
    }
    if (remainingGuesses===1){
        remainingSpan.innerText = "1 FINAL guess";
    }
    if (remainingGuesses>=2){
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkForWin = function () { 
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function(){
    button.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    guessForm.classList.add("hide");
    guessBox.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText="";
    guessedLettersElement.innerHTML="";
    guessedLetters=[];
    guessedLettersElement.classList.remove("hide");
    button.classList.remove("hide");
    playAgain.classList.add("hide");
    guessForm.classList.remove("hide");
    guessBox.classList.remove("hide");
    remainingGuesses=8;
    remainingSpan.innerText=`${remainingGuesses} guesses`;
    remaining.classList.remove("hide");
    getWord();
    placeholder(word);
});

