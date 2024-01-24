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

    const guess = letterInput.value;
    // call the function that checks the input and pass it the input value as an argument
     //save the result of this function call to a variable and log it out to the console
    const validatedGuess= validateInput(guess);
   // console.log(validatedGuess);
   letterInput.value="";
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


//up to Create a Function to Capture Input