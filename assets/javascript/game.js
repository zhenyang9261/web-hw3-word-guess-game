
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

    // Check the position(s) of a letter in a word or array
    checkLetter: function(letter, word) {
        var indices = [];
        for(var i=0; i<word.length;i++) {
            if (word[i] === letter) 
                indices.push(i);
        }
        return indices;
    },

    play: function(key) {

        console.log(key);

        key = key.toLowerCase();
        var inGuessLetter = this.checkLetter(key, this.guessedLetters);
        var inTargetWord = this.checkLetter(key, this.targetWord);

        // If the letter is not already guessed
        if (inGuessLetter.length === 0) {

            // Add the letter in the guessedLetters array
            this.guessedLetters.push(key);

            // Replace the guessed letters in HTML
            document.getElementById("guessed-letters").innerHTML = this.guessedLetters.join('');

            // If the letter is not in the target word
            if (inTargetWord.length === 0) {

                // Remaining guess count reduce by 1
                this.remainGuesses = this.remainGuesses - 1;

                // Remaing guess count is 0
                if (this.remainGuesses === 0) {

                    // Display "You lost"
                    document.getElementById("result").innerHTML = "Sorry. You Lost. <br> Press any key to start a new game";

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

    reset: function() {

        gameStarted = true;
        this.guessedLetters.length = 0;
        this.remainGuesses = 10;

        var randomNum = Math.floor(Math.random() * (words.length+1));
        this.targetWord = words[randomNum];

        this.currentWord = new Array(this.targetWord.length + 1).join('_')

        document.getElementById("win-count").innerHTML = winCount;
        document.getElementById("current-word").innerHTML = this.currentWord;
        document.getElementById("guess-remain").innerHTML = this.remainGuesses;
        document.getElementById("guessed-letters").innerHTML = "";
        document.getElementById("result-img").innerHTML = '';
        document.getElementById("result").innerHTML = '';

    }
}

window.onload = function() {
    document.onkeyup = function() {

        // Capture the key user pressed
        var userGuess = event.key;

        if (gameStarted === true) {
            hangman.play(userGuess);
        }
        else {
            hangman.reset();
        }
    }
}


