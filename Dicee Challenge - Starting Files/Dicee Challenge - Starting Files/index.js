function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

var randomNum1 = getRandomDice().toString();
var randomNum2 = getRandomDice().toString();

var img1 = document.querySelector("img.img1");
var img2 = document.querySelector("img.img2");

img1Src = "/Dicee Challenge - Starting Files/Dicee Challenge - Starting Files/images/dice" + randomNum1 +".png"
img2Src = "/Dicee Challenge - Starting Files/Dicee Challenge - Starting Files/images/dice"+ randomNum2 + ".png"

img1.setAttribute("src", img1Src);
img2.setAttribute("src", img2Src);

if(randomNum1 > randomNum2) {
    document.querySelector("h1").textContent = "🚩Player 1 Wins!";
}
else if(randomNum1 === randomNum2) {
    document.querySelector("h1").textContent = "Draw!";
}else if(randomNum1 < randomNum2) {
    document.querySelector("h1").textContent = "Player 2 Wins!🚩";
}
