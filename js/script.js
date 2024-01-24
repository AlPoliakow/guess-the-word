const guessedLettersElement = document.querySelector(".guessed-letters");
const button =document.querySelector(".guess");
const letterInput = document.querySelector(".guess-form input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters=[]; //empty array


const placeholder = function (){
    const placeholderLetters=[]; 
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText= placeholderLetters.join("");
};

//action the function
placeholder(word);

//click event
button.addEventListener("click", function(e){
    e.preventDefault(); // stops page from reloading
    message.innerText="";

    const guess = letterInput.value.toUpperCase();
    // call the function that checks the input and pass it the input value as an argument
     //save the result of this function call to a variable and log it out to the console
    const validatedGuess= validateInput(guess);
   // console.log(validatedGuess);
   letterInput.value="";
   makeGuess(validatedGuess); //if guess is used; validateInput is bypassed
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;// to check that the input is a letter

    if (input.length === 0) {  // if input is empty  
        message.innerText="Please enter a letter to guess";
    } else if (input.length > 1){ //input is more than one letter
        message.innerText = "Please guess one letter a time";
    } else if (!input.match(acceptedLetter)) {   //a chacter that isn't a letter
        message.innerText = "Please make sure your guess is a letter (a-z)";
    } else {
        message.innerText = "Your guess has been accepted"
        return input;
    }
};

// function that accepts a letter as the parameter
const makeGuess = function(guess){
    guess=guess.toUpperCase(); // convert to upper case for JavaScript

    if (guessedLetters.includes(guess)){
    message.innerText='You have already guessed that letter, try a different letter';
    } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    displayGuessedLetters(guess);
    updateWordInProgress(guessedLetters);
    }
};

//create a function to show the guessed letters
const displayGuessedLetters = function(){
    guessedLettersElement.innerHTML="";
    // create a new list item for each letter inside the guessedLetters array and add it to the unordered list
    for (const letter of guessedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters){
    //change letters to uppercase
    const wordUpper = word.toUpperCase();
    //split the word string into an array so that the letter can appear in the guessedLetters array
    const wordArray = wordUpper.split("");
    //check if it works
    console.log(wordArray);
    //create a variable/array to show the correctly guessed letters (replaces placeholder)
    const revealLetter = [];
    for (const letter of wordArray){
        //if the guess is included
        if (guessedLetters.includes(letter)){
            revealLetter.push(letter.toUpperCase());
            //if the guess is not included
        } else {
            revealLetter.push("●");
        }
    }
    //check if it works
    //console.log(revealLetter);
    //update the circle symbol with the correct letter
    wordInProgress.innerText = revealLetter.join("");
    checkForWin();
};

const checkForWin = function () { 
    //if the word in progress matches the word to guess
    if (wordInProgress.innerText === word.toUpperCase()) {
        //update message class to add win
        message.classList.add("win");
        //update message contents
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

