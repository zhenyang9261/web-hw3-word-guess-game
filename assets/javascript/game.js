
var gameStarted = false;
var winCount = 0;
var words = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado",
             "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho",
             "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana",
             "maine", "maryland", "massachusetts", "michigan", "minnesota",
             "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire",
             "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio",
             "oklahoma", "oregon", "pennsylvania", "rhodeisland", "south carolina",
             "south dakota", "tennessee", "texas", "utah", "vermont", "virginia",
             "washington", "west virginia", "wisconsin", "wyoming"];

var hangman = {

    targetWord: "",
    currentWord: "",
    guessedLetters: [],
    remainGuesses: 15,
    win: 0,

    play: function(key) {

        console.log(key);
        if (key === 'a') {
            winCount++;
            document.getElementById("result").innerHTML = "Congratuations! You won! <br> Press any key to start a new game";
            document.getElementById("result-img").innerHTML = '<img src="assets/images/flags-states/alabama.png" width="100%" height="auto" alt="USA state map">';
            document.getElementById("win-count").innerHTML = winCount;
        }
        else {
            document.getElementById("result").innerHTML = "Sorry. You Lost. <br> Press any key to start a new game";
            document.getElementById("result-img").innerHTML = '';
        }
    },

    reset: function() {

        gameStarted = true;
        this.guessedLetters.length = 0;
        this.remainGuesses = 15;

        var randomNum = Math.floor(Math.random() * 51);
        targetWord = words[randomNum];
        console.log(targetWord);

        currentWord = new Array(targetWord.length + 1).join('_')

        document.getElementById("win-count").innerHTML = winCount;
        document.getElementById("current-word").innerHTML = currentWord;
        document.getElementById("guess-remain").innerHTML = this.remainGuesses;
        document.getElementById("guessed-letters").innerHTML = "";

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


