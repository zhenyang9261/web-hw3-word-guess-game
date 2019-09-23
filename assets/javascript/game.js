
var gameStarted = false;
var winCount = 0;

var hangman = {

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

        document.getElementById("win-count").innerHTML = winCount;
        document.getElementById("current-word").innerHTML = "";
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


