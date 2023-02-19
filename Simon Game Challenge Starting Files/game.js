var colors = ["green","red","yellow","blue"];

var gamePattern = [];

var clickedColors = [];

var levelNum = 1;

var gameStatus = false;

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

$("html").keydown(function (e) { 
    newGame();
    $("html").off();
});

function newGame() {
    var randomIndex = nextSequence();
    var randomColor = colors[randomIndex];

    gamePattern.push(randomColor);

    flashButton(randomColor);
    $("h1").text("Level " + levelNum);

    gameStatus = true;
}

$(".btn").click(function (e) {
    if(gameStatus) {
        flashButton(this.id);
        setTimeout(() => {
            checkClick(this.id);
        }, 500)
    }
});

function playAudio(color) {
    var audio = new Audio("/Simon Game Challenge Starting Files/sounds/" + color + ".mp3");
    audio.play();
}

function flashButton(color) {
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(color);
}

function checkClick(color) {
    clickedColors.push(color);
    var index = clickedColors.length - 1;
    if(clickedColors[index] === gamePattern[index] && index === (gamePattern.length - 1)) {
        goNextLevel();
    }
    else if (clickedColors[index] !== gamePattern[index] ){
        gameOver();
    }
}

function goNextLevel() {
    levelNum++;
    clickedColors = [];
    $("h1").text("Level " + levelNum);
    var randomIndex = nextSequence();
    var randomColor = colors[randomIndex];

    gamePattern.push(randomColor);

    flashButton(randomColor);
}

function gameOver() {
    gameStatus = false;
    levelNum = 1;
    $("h1").text("Game over, Press A Key to Start");
    gamePattern = [];
    clickedColors = [];
    $("body").css("background-color", "red");
    $("html").keydown(function (e) { 
        newGame();
        $("html").off();
    });
    playAudio("wrong");
    setTimeout(() => {
        $("body").css("background-color", "#011F3F");
    }, 500);

}
