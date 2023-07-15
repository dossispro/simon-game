var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false
var level = 0

$(function() {
    console.log( "ready!" );
});

$(document).on("keypress", function() {
    if (!started) {
        nextSequence()
        started = true
    }
});



function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeTo(50, 0.15).fadeTo(50, 0.0).fadeTo(50, 1);
    playSound(randomChosenColour);
    console.log("Game pattern is: " + gamePattern);
    userClickedPattern = [];
}


$(".btn").click(function(event) {
    if (started === false) return
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("user clicked pattern is: " + userClickedPattern)
    playSound(userChosenColour);
    pressedButton(userChosenColour);
    checkAnswer(userChosenColour);
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function pressedButton(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {$("#" + currentColour).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
    var currentIndex = userClickedPattern.length - 1
    if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
        console.log("failure!");
        gameOver();
        return;
    }
    console.log("success!");
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(nextSequence, 400) 
    } 


}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");}, 400);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver()
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
