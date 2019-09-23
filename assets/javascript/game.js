
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
    remainGuesses: 15,
    win: 0,

    checkLetter: function(letter, word) {
        for(var i=0; i<word.length;i++) {
            if (str[i] === letter) 
                indices.push(i);
        }
        return indices;
    },

    play: function(key) {

        console.log(key);

        key = key.toLowerCase();
        var inGuessLetter = this.checkLetter(key, guessedLetters);
        var inTargetWord = this.checkLetter(key, targetWord);

        // If the letter is not already guessed
        if (inGuessLetter.length === 0) {

            // If the letter is not in the target word
            if (inTargetWord.length === 0) {

                // Remaining guess count reduce by 1

                // Remaing guess count is 0
                
                    // Display "You lost"

                    // Set gameStarted to false
            }
            // If the letter is in the target word
            else {
                // Replace currentWord letters at the index positions with the letter

                // Add the letter in the guessedLetters array

                // If the currentWord equals to targetWord
                    // Game win counter increase by 1

                    // Set gameStarted to false
            }

        }

        /*
        if (key === 'a') {
            winCount++;
            document.getElementById("result").innerHTML = "Congratuations! You won! <br> Press any key to start a new game";
            document.getElementById("result-img").innerHTML = '<img src="assets/images/flags-states/alabama.png" width="100%" height="auto" alt="USA state map">';
            document.getElementById("win-count").innerHTML = winCount;
        }
        else {
            document.getElementById("result").innerHTML = "Sorry. You Lost. <br> Press any key to start a new game";
            
        }
        */
    },

    reset: function() {

        gameStarted = true;
        this.guessedLetters.length = 0;
        this.remainGuesses = 15;

        var randomNum = Math.floor(Math.random() * 51);
        targetWord = words[randomNum];

        currentWord = new Array(targetWord.length + 1).join('_')

        document.getElementById("win-count").innerHTML = winCount;
        document.getElementById("current-word").innerHTML = currentWord;
        document.getElementById("guess-remain").innerHTML = this.remainGuesses;
        document.getElementById("guessed-letters").innerHTML = "";
        document.getElementById("result-img").innerHTML = '';

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


