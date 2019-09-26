
// Global condition checker to track whether the game has stated
var gameStarted = false;

// Global counter to track how many games won
var winCount = 0;

// Words to guess
var words = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado",
             "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho",
             "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana",
             "maine", "maryland", "massachusetts", "michigan", "minnesota",
             "mississippi", "missouri", "montana", "nebraska", "nevada", "new_hampshire",
             "new_jersey", "new_mexico", "new_york", "north_carolina", "north_dakota", "ohio",
             "oklahoma", "oregon", "pennsylvania", "rhodeisland", "south_carolina",
             "south_dakota", "tennessee", "texas", "utah", "vermont", "virginia",
             "washington", "west_virginia", "wisconsin", "wyoming"];

// HTML Elements
var resultImgElem = document.getElementById("result-img");
var resultElem = document.getElementById("result");
var noticeElem = document.getElementById("notice");
var winCountElem = document.getElementById("win-count");
var currentWordElem = document.getElementById("current-word");
var remainGuessesElem = document.getElementById("guess-remain");
var guessedLettersElem = document.getElementById("guessed-letters");

// Hangman game object
var hangman = {

    targetWord: "",
    currentWord: "",
    guessedLetters: [],
    remainGuesses: 8,
    audioElementWin: document.createElement("audio"),
    audioElementLose: document.createElement("audio"),

    /*
     * Function: checkLetter
     * Input param 1: letter to check
     * Input param 2: string or array
     * Output: array that contains the position(s) of the letter in the input string 
     *         array will be empty if the letter is not in the string or array
     *
     * Check if a letter is in a word or array
     */
    checkLetter: function(letter, word) {
        var indices = [];
        for(var i=0; i<word.length; i++) {
            if (word[i] === letter) 
                indices.push(i);
        }
        return indices;
    },

    /*
     * Function: play
     * Input param: the key user pressed
     *
     * Hangman game logic in this function
     */
    play: function(key) {

        var inGuessLetter = this.checkLetter(key, this.guessedLetters);
        var inCurrentWord = this.checkLetter(key, this.currentWord);
        var inTargetWord = this.checkLetter(key, this.targetWord);

        // If the letter is not already guessed or already in the partially guessed word
        if (inGuessLetter.length === 0 && inCurrentWord.length === 0) {

            // If the letter is not in the target word
            if (inTargetWord.length === 0) {

                // Remaining guess count reduce by 1
                this.remainGuesses = this.remainGuesses - 1;

                // Remaing guess count is 0
                if (this.remainGuesses === 0) {

                    // Display "You lost" and set style
                    resultElem.innerHTML = "SORRY, YOU LOST.  &#x1F626";
                    resultElem.setAttribute("class", "result-lose");

                    // Display "PRESS ANY KEY TO START A NEW GAME"
                    noticeElem.innerHTML = "PRESS ANY KEY TO START A NEW GAME";
                                    
                    // Play "lose" music
                    this.audioElementLose.play();

                    // Set gameStarted to false
                    gameStarted = false;
                }
                
                // Replace remain guess counter in HTML
                remainGuessesElem.innerHTML = this.remainGuesses;

                // Add the letter in the guessedLetters array
                this.guessedLetters.push(key);

                // Replace the guessed letters in HTML
                guessedLettersElem.innerHTML = this.guessedLetters.join('');
            }
            // If the letter is in the target word
            else {

                // Replace currentWord letters at the index positions with the letter
                for (var i=0; i<inTargetWord.length; i++) {

                    var pos = inTargetWord[i];

                    var currentWordArray = this.currentWord.split('');
                    currentWordArray[pos] = key;

                    this.currentWord = currentWordArray.join('');
                }

                // Replace the current word in HTML
                currentWordElem.innerHTML = this.currentWord;

                // If the currentWord equals to targetWord
                if (this.currentWord === this.targetWord) {

                    // Display "You won", and set the style
                    resultElem.innerHTML = "CONGRATULATIONS! YOU WON!  &#x1F603";
                    resultElem.setAttribute("class", "result-win");

                    // Display "PRESS ANY KEY TO START A NEW GAME"
                    noticeElem.innerHTML = "PRESS ANY KEY TO START A NEW GAME";

                    // Play "win" music
                    this.audioElementWin.play();

                    // Display state flag
                    resultImgElem.innerHTML = '<img src="assets/images/flags-states/' + this.targetWord + '.png" width="100%" height="auto" alt="USA state map">';

                    // Game win counter increase by 1
                    winCount++;

                    // Display new win count in HTML
                    winCountElem.innerHTML = winCount;

                    // Set gameStarted to false
                    gameStarted = false;
                }
            }
        }
    },

    /*
     * Function: reset
     *
     * User is seeing "PRESS ANY KEY TO START". Reset variables and empty HTML elements' content.
     */
    reset: function() {

        // Ready to play
        gameStarted = true;

        // Clear guessed letter array
        this.guessedLetters.length = 0;

        // Reset remaining guesses to the original value
        this.remainGuesses = 8;

        // Get a random word
        var randomNum = Math.floor(Math.random() * (words.length));
        this.targetWord = words[randomNum];

        // Reset current word to underlines 
        this.currentWord = new Array(this.targetWord.length + 1).join('_')

        // Reset HTML element content
        winCountElem.innerHTML = winCount;
        currentWordElem.innerHTML = this.currentWord;
        remainGuessesElem.innerHTML = this.remainGuesses;
        guessedLettersElem.innerHTML = "";

        resultElem.innerHTML = "GOOD LUCK!"
        resultElem.setAttribute("class", "result-luck");
        noticeElem.innerHTML = "";

        resultImgElem.innerHTML = '<img src="assets/images/usa-map.png" width="100%" height="auto" alt="USA map">';

        // Stop playing the music
        this.audioElementWin.setAttribute("src", "assets/audio/win.mp3")
        this.audioElementWin.pause();

        this.audioElementLose.setAttribute("src", "assets/audio/lose.mp3")
        this.audioElementLose.pause();
    }
}

window.onload = function() {
    document.onkeyup = function() {

        // Capture the key user pressed
        var userGuess = event.key;

        // If the game has started, pass lower case of the key user pressed to hangman, and play
        if (gameStarted === true) {

            // When user pressed a character key (not function keys such as 'Ctrl', 'Shift'.. )
            // and the key is a small or capital letter, play
            if (userGuess.length == 1 && ((userGuess >= "a" && userGuess <= "z") || (userGuess >= "A" && userGuess <= "Z"))) {
                noticeElem.innerHTML = ""; 
                hangman.play(userGuess.toLowerCase());
            }
            else {
                noticeElem.innerHTML = "PLEASE PRESS A VALID LETTER";  
            }
        }
        // If the game has not started, reset everything
        else {
            hangman.reset();
        }
    }
}


