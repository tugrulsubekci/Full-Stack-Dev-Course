var allButtons = document.querySelectorAll("button");

for(var i = 0 ; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
        var innerHtml = this.innerHTML;

        makeSound(innerHtml);

        animateButton(innerHtml);
    })
}

document.addEventListener("keydown", function(eventData) {
    var key = eventData.key;

    makeSound(key);

    animateButton(key);
})

function makeSound(parameter) {
    switch (parameter) {
        case "w":
            var audio = new Audio("/Drum Kit Starting Files/sounds/crash.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("/Drum Kit Starting Files/sounds/kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("/Drum Kit Starting Files/sounds/snare.mp3");
            audio.play();
            break;            
        case "d":
            var audio = new Audio("/Drum Kit Starting Files/sounds/tom-1.mp3");
            audio.play();
            break;            
        case "j":
            var audio = new Audio("/Drum Kit Starting Files/sounds/tom-2.mp3");
            audio.play();
            break;           
        case "k":
            var audio = new Audio("/Drum Kit Starting Files/sounds/tom-3.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("/Drum Kit Starting Files/sounds/tom-4.mp3");
            audio.play();
            break;
        default:
            alert(key + " pressed");
            break;
    }
}

function animateButton(curKey) {
    var activeButton = document.querySelector("." + curKey);

    activeButton.classList.add("pressed");

    setTimeout(() => {
        activeButton.classList.remove("pressed");
    }, 100);
}