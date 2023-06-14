var gameName = document.getElementById("game-name")
var btnSound = document.getElementById("sound")
var btnMute = document.getElementById("mute")
var gamebox = document.querySelectorAll("[game]")
var sounds = new sound("./Home/bgmusic.wav")

gamebox.forEach((box)=>{
    box.addEventListener('mouseover', changeName)
    box.addEventListener('mouseout', backtogame)
    // box.addEventListener('click', navigatetogame)
})

btnSound.addEventListener('click', ()=>{
    btnSound.style.display="none";
    btnMute.style.display="flex";
    sounds.stop()
})

btnMute.addEventListener('click', ()=>{
    btnMute.style.display="none";
    btnSound.style.display="flex";
    sounds.play()
})

Window.addEventListener('load',()=>{ 
    sounds.play()
})

function changeName(e){
    gameName.innerHTML= e.target.id;
}

function backtogame(){
    gameName.innerHTML= "Mini Games! select your game";
}

function navigatetogame(e){
    sounds.stop()
    switch(e.target.id){
        case "Encode-Decode":
            window.location.replace("./EncodeDecode/index");
            break;
        case "Tic Tac Toe":
            window.location.replace("./TicTacToe/index");
            break;
        case "Minimum Connectors":
            window.location.replace("./MinimumConnector/game");
            break;
        case "8 Queen Puzzle game":
            window.location.replace("./EightQueen/WelcomeScreen");
            break;        
        case "Find Sortest Path":
            window.location.replace("./FindShortestPath/index.html");
            break;        
        default:
            window.location.replace("");
            break;
    }
}




function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("mute", "muted");
    this.sound.setAttribute("autoplay", "true");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}