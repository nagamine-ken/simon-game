var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;

function nextSequence(max){
   
    var randomNumber = Math.floor(Math.random() * max);
    console.log(randomNumber);

    var randomChosenColour =  buttonColours[randomNumber];
    console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);

    console.log(gamePattern);
    console.log(userClickedPattern);

    var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $('#' + randomChosenColour).addClass("pressed");
    setTimeout(function(){
        document.querySelector("." + randomChosenColour).classList.remove("pressed");
    }, 400);
  
}



$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);
    console.log(gamePattern);

    var sound = new Audio("sounds/" + userChosenColour + ".mp3");
    sound.play();
    $('#' + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $('#' + userChosenColour).addClass("pressed");
    setTimeout(function(){
        document.querySelector("." + userChosenColour).classList.remove("pressed");
    }, 400);

    var count = userClickedPattern.length - 1;

    console.log("count is: " + count);

    checkAnswer(count);
})



var ears = document.addEventListener("keypress", function(e){
    nextSequence(4);
    $("h1").text("Level: " + level);
    
})



function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       
        if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)){
            
            level ++;
            console.log("level is: " + level);
            $("h1").text("Level: " + level)
            userClickedPattern = [];

            setTimeout(function(){nextSequence(4)}, 1000);
        } 

    } else {
        $("body").addClass("game-over", setTimeout(function(){
            $("body").removeClass("game-over"); 
        }), 400);
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        $("h1").text("Game Over, Press Any Key To Start Over");
    }
}