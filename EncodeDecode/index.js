var userName = ""
var optionType="";
var word=""
var encodedWord=""
var hangmanStep=1;
var score =0;
var huffmanCodes =""
wordList =["Circumlocution", "Idiosyncratic", "Ubiquitous", "Anachronistic", "Trichotillomania", "Incomprehensibility", "Tergiversation",
"Antidisestablishmentarianism", "Sesquipedalianism", "Incomprehensibilities" ]


var btnReset = document.getElementById("reset")
var btnStart = document.getElementById("start")
var btnNext = document.getElementById("next")
var btnSave = document.getElementById("save")
var btnBack = document.getElementById("menu")
var winnerMsg = document.getElementById("winner")
var txtType = document.getElementById("typeName")
var wordBox = document.getElementById("word")
var btnType = document.querySelectorAll("[types]")
var btnKey = document.querySelectorAll("[key]")
var txtCode;

btnReset.addEventListener('click', reset)
btnNext.addEventListener('click', NextLevel)
btnSave.addEventListener('click', save)
btnStart.addEventListener('click', ()=>{startGame("")})
btnBack.addEventListener('click', ()=>{window.location.replace("../Home/../index");})
btnType.forEach(btn => {
    btn.addEventListener('click', selectType)
})


function selectType(e){ 
    console.log(e)
    optionType != "" ? document.getElementById(optionType).style.backgroundColor="#2E0249" : "" ;
    optionType= e.target.id
    document.getElementById(optionType).style.backgroundColor="black";
}

function startGame(name){ 
    try{
        name != "" ? userName = name : userName = document.getElementById("name-input").value;
        console.log(userName, optionType)
        let x = Math.floor((Math.random() * 10));
        word = wordList[x]
        if(userName != ""){
            document.querySelector("[username]").innerHTML = "User Name : "+userName
            document.getElementById("start-game").style.display="none";
            document.getElementById("score").innerHTML= "Score : " +score;
            btnNext.style.display="none";
            btnSave.style.display="none";
            word = word.toUpperCase()
            const huffmanTree = new buildHuffmanTree()
            huffmanCodes = huffmanTree.getHuffmanTree(word)
            encodedWord = huffmanTree.setEncodeWord(word)
            console.log(huffmanCodes, encodedWord)
            let content = "";
            if(optionType == "option1"){
                for(let w of encodedWord){
                    document.getElementById("selectedWord").innerHTML= word;
                    document.getElementById("desc").innerHTML= "Write the enocde value of the word";
                    content += `<input type="text" class="letter" id="`+w+ `" placeholder="_" pattern="[0-1]{1}" maxlength="1" code/> `
                }
            }else{
                document.getElementById("selectedWord").innerHTML= encodedWord;
                document.getElementById("desc").innerHTML= "Write the decode value of the word";
                let huffmancontent="";
                let letter = word
                for(let l of letter){
                    huffmancontent += l + " : " + huffmanCodes[l] + ", "
                    letter.trim(l)
                }
                document.getElementById("huffcode").innerHTML= huffmancontent;
                for(let w of word){
                    content += `<input type="text" class="letter" id="`+w+ `" placeholder="_" pattern="[0-1]{1}" maxlength="1" code/> `
                }
            }
            console.log(word)
            wordBox.innerHTML = content;
            txtCode = document.querySelectorAll("[code]")
            txtCode.forEach(code => {
                code.addEventListener('change', typeCode)
            })
        }
    }catch(error){
        console.log(error)
    }
}

function typeCode(e){
    try{
        let inputValue = e.target.value;
        console.log(inputValue)
        let clickSound = new sound("./click.m4a")
        clickSound.play()
        let result = checkWin()
        if(result === "win"){
            let clickSound2 = new sound("./win.wav")
            score+=10;
            clickSound2.play()
            winnerMsg.classList.add("winner-message");
            winnerMsg.children[0].innerHTML = `<div class="msg">You Won <br/> Your Score : `+score+`</div>
                                                <div class="ballons">
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                    <div class="ballon"><i class="fa-solid fa-circle"></i></div>
                                                </div>`
            btnNext.style.display="flex";
            btnSave.style.display="flex";
            saveScore()
            return 1
        }else if(result === "end"){
            let clickSound2 = new sound("./win.wav")
            clickSound2.play()
            let correct = optionType === "option1" ? encodedWord: word;
            winnerMsg.classList.add("winner-message");
            winnerMsg.children[0].innerHTML = `<div class="msg">Bad Luck! Answer Is</div>
                                                <div class="msg">`+correct +`</div>`
            saveScore()
            return 1
        }
    }catch(error){
        console.log(error)
    }
}

function checkWin(){
    let userEnteredWord="";let status=""
    try{
        let letter = document.querySelectorAll("[code]")
        letter.forEach(l=>{
            userEnteredWord += l.value
            if(l.value === ""){
                status= "continue";
            }
            console.log(l.innerHTML)
        })
        if(status!="continue"){
            if(optionType == "option1"){
                if(userEnteredWord == encodedWord){
                    status= "win"
                }else{
                    status= "end"
                }
            }else{
                userEnteredWord = userEnteredWord.toUpperCase()
                if(userEnteredWord == word){
                    status= "win"
                }else{
                    status= "end"
                }
            }
        }
    }catch(error){
        console.log(error)
    }
    return status
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function saveUser(){
    try{
        const data = new FormData(); 
        data.append("name", userName)
        data.append("score", score)

        fetch('../getGame.php', {method:"POST", body: data})
        .then(response => {
            console.log(response)
            console.log(response.text())
            response.text()
        })
        .then(data => {
        console.log(data)
        });
    }catch(error){
        console.log(error)
    }
}

function reset(){
    word="";
    encodedWord=""
    huffmanCodes =""
    score=0;
    winnerMsg.classList.remove("winner-message");
    winnerMsg.children[0].innerHTML = ""
    startGame(userName)
}

function NextLevel(){
    var filtered = wordList.filter((value)=>{value != word})
    console.log(filtered)
    word="";    
    encodedWord=""
    hangmanStep=1;
    huffmanCodes =""
    winnerMsg.classList.remove("winner-message");
    winnerMsg.children[0].innerHTML = ""
    startGame(userName)
    // resetTime()
}


function save(){
    const data = new FormData(); 
    data.append("name", userName)
    data.append("score", score)
    data.append("game", "EncodeDecode")

    fetch('../saveScore.php', {method:"POST", body: data})
    .then(response => {
        btnSave.innerHTML="Saved"
    })
    .then(data => {
      console.log(data)
    });
}


