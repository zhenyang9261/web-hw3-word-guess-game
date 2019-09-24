
var gameStarted = false;
var winCount = 0;
var words = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado",
             "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho",
             "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana",
             "maine", "maryland", "massachusetts", "michigan", "minnesota",
             "mississippi", "missouri", "montana", "nebraska", "nevada", "new_hampshire",
             "new_jersey", "new_mexico", "new_york", "north_carolina", "north_dakota", "ohio",
             "oklahoma", "oregon", "pennsylvania", "rhodeisland", "south_carolina",
             "south_dakota", "tennessee", "texas", "utah", "vermont", "virginia",
             "washington", "west_virginia", "wisconsin", "wyoming"];

var hangman = {

    targetWord: "",
    currentWord: "",
    guessedLetters: [],
    remainGuesses: 10,
    win: 0,
    audioElementWin: document.createElement("audio"),
    audioElementLose: document.createElement("audio"),

    // Check the position(s) of a letter in a word or array
    // If the letter is not in the word or array, the returned array will be empty
    checkLetter: function(letter, word) {
        var indices = [];
        for(var i=0; i<word.length; i++) {
            if (word[i] === letter) 
                indices.push(i);
        }
        return indices;
    },

    play: function(key) {

        key = key.toLowerCase();
        var inGuessLetter = this.checkLetter(key, this.guessedLetters);
        var inTargetWord = this.checkLetter(key, this.targetWord);

        // If the letter is not already guessed
        if (inGuessLetter.length === 0) {

            // Add the letter in the guessedLetters array
            this.guessedLetters.push(key);

            // Replace the guessed letters in HTML
            document.getElementById("guessed-letter").innerHTML = this.guessedLetters.join('');

            // If the letter is not in the target word
            if (inTargetWord.length === 0) {

                // Remaining guess count reduce by 1
                this.remainGuesses = this.remainGuesses - 1;

                // Remaing guess count is 0
                if (this.remainGuesses === 0) {

                    // Display "You lost"
                    document.getElementById("result").innerHTML = "Sorry. You Lost. <br> Press any key to start a new game";
                    
                    // Play "lose" music
                    this.audioElementLose.play();

                    // Set gameStarted to false
                    gameStarted = false;
                }
                
                // Replace remain guess counter in HTML
                document.getElementById("guess-remain").innerHTML = this.remainGuesses;
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
                document.getElementById("current-word").innerHTML = this.currentWord;

                // If the currentWord equals to targetWord
                if (this.currentWord === this.targetWord) {

                    // Display "You won"
                    document.getElementById("result").innerHTML = "Congratuations! You won! <br> Press any key to start a new game";
                    this.audioElementWin.play();

                    // Display state flag
                    document.getElementById("result-img").innerHTML = '<img src="assets/images/flags-states/' + this.targetWord + '.png" width="100%" height="auto" alt="USA state map">';

                    // Game win counter increase by 1
                    winCount++;

                    // Display new win count in HTML
                    document.getElementById("win-count").innerHTML = winCount;

                    // Set gameStarted to false
                    gameStarted = false;
                }
            }
        }
    },

    // User is seeing "Please press any key to star". 
    // Reset variables and empty HTML elements' content
    reset: function() {

        // Ready to play
        gameStarted = true;

        // Clear guessed letter array
        this.guessedLetters.length = 0;

        // Reset remaining guesses to the original value
        this.remainGuesses = 10;

        // Get a random word
        var randomNum = Math.floor(Math.random() * (words.length+1));
        this.targetWord = words[randomNum];

        // Reset current word to underlines 
        this.currentWord = new Array(this.targetWord.length + 1).join('_')

        // Set HTML element content
        document.getElementById("win-count").innerHTML = winCount;
        document.getElementById("current-word").innerHTML = this.currentWord;
        document.getElementById("guess-remain").innerHTML = this.remainGuesses;
        document.getElementById("guessed-letters").innerHTML = "";
        document.getElementById("result-img").innerHTML = '';
        document.getElementById("result").innerHTML = '';

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

        // If the game has started, pass the key user pressed to hangman, and play
        if (gameStarted === true) {
            if (userGuess.length != 1 || userGuess < "a" || userGuess > "z") {
                alert("Please input a valid letter");
            }
            else {
                hangman.play(userGuess);
            }
        }
        // If the game has not started, reset everything
        else {
            hangman.reset();
        }
    }
}


