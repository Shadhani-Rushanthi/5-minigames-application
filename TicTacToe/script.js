var user = "X";
var computer= "O";
let computerTurn=false;
var userName="";
var score=0;
var currentUser = computerTurn ? computer : user;
var conditions = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
];

var board = [['', '', ''],
            ['', '', ''],
            ['', '', '']]

var cells = document.querySelectorAll("[cell]")
var btnReset = document.getElementById("reset")
var btnStart = document.getElementById("start")
var btnBack = document.getElementById("menu")
var currentUserMsg = document.getElementById("user")
var winnerMsg = document.getElementById("winner")
currentUserMsg.innerHTML = currentUser+ "'s Turn"


cells.forEach(cell => {
    cell.addEventListener('click', clickCell, { once:true })
})
btnReset.addEventListener('click', reset)
btnStart.addEventListener('click', startGame)
btnBack.addEventListener('click', ()=>{window.location.replace("../Home/../index");})

function startGame(){
    try{
        userName = document.getElementById("name-input").value;
        if(userName != ""){
            document.querySelector("[username]").innerHTML = userName +" : X"
            console.log(userName)
            document.getElementById("start-game").style.display="none";
        }
    }catch(error){
        console.log(error)
    }
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


function clickCell(e){
    try{
        const cell = e.target !== undefined ? e.target : e;
        var clickSound = new sound("./click.m4a")
        clickSound.play()
        cell.innerHTML = currentUser
        fillBoard(board, cell.id, false)
        cell.classList.add("selected")
        let result = checkWinner(board, currentUser)
        if(result.status && result.player != "tie"){       
            var clickSound = new sound("./win.wav")
            clickSound.play()
            winnerMsg.classList.add("winner-message");
            winnerMsg.children[0].innerHTML = `<div class="msg">`+currentUser+ ` wins the game</div>
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
            currentUser === "X" ? score+=10: "";
            saveScore()
            return 1
        } else if(result.player === "tie"){
            var clickSound = new sound("./win.wav")
            clickSound.play()
            winnerMsg.classList.add("winner-message");
            winnerMsg.children[0].innerHTML = `<div class="msg">No one wins, Try again !!!</div>`
            saveScore()
            return 1
        }
        changeUser()
        if(currentUser === "O"){
            cells.forEach((cell)=>{cell.removeEventListener('click', clickCell)})
            setTimeout(function(){
                AI(board, currentUser)
            }, 500);
        }
    }catch(error){
        console.log(error)
    }
}

function AI(board, player){
    try {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == '') {
                board[i][j] = player;
                let score = minimax(board, user);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
        }
        board[move.i][move.j] = player;
        var cell = fillBoard(board, move.i.toString() + move.j.toString(), true)
        clickCell(cells[cell])
        cells.forEach((cell)=>{cell.addEventListener('click', clickCell, {once:true})})
    } catch(error){
        console.log(error)
    }
}

function minimax(board, player){
    try{
        var result = checkWinner(board, player==user ? computer : user)
        if(result.player == 'X' && result.status== true){
            return -10
        } else if(result.player == 'O' && result.status== true){
            return 10
        }else if(result.player == 'tie'){
            return 0
        }
        var bestScore = player === computer ? -Infinity : Infinity;
        for(var i=0; i<3; i++){
            for(var j=0; j<3; j++){
                if(board[i][j] == ''){
                    board[i][j] = player;
                    
                    if(player == computer)
                    {
                        var result = minimax(board, user)
                        bestScore =  Math.max(result, bestScore)
                    }else if(player == user){
                        var result = minimax(board, computer)
                        bestScore = Math.min(result, bestScore)
                    }
                    board[i][j] = '';
                }
            }
        }
    }catch(error){
        console.log(error)
    }
    return bestScore
}

function fillBoard(board,id, fillAI){
    let cell;
    switch(id){
        case '0':
        case "00":
            fillAI ? cell = 0 : board[0][0] = currentUser;
            return cell;
        
        case('1'):
        case("01"):
            fillAI ? cell = 1 : board[0][1] = currentUser;
            return cell;
        
        case('2'):
        case("02"):
            fillAI ? cell = 2 : board[0][2] = currentUser;
            return cell;
    
        case('3'):
        case("10"):
            fillAI ? cell = 3 : board[1][0] = currentUser;
            return cell;
            
        case('4'):
        case("11"):
            fillAI ? cell = 4 : board[1][1] = currentUser;
            return cell;
            
        case('5'):
        case("12"):
            fillAI ? cell = 5 : board[1][2] = currentUser;
            return cell;
        
        case('6'):
        case("20"):
            fillAI ? cell = 6 : board[2][0] = currentUser;
            return cell;
    
        case('7'):
        case("21"):
            fillAI ? cell = 7 : board[2][1] = currentUser;
            return cell;
            
        case('8'):
        case("22"):
            fillAI ? cell = 8 : board[2][2] = currentUser;
            return cell;
        default:
            console.log('no match')
    }
}

function changeUser(){
    computerTurn= !computerTurn;
    currentUser = computerTurn ? computer : user;
    currentUserMsg.innerHTML = currentUser+ "'s Turn";
}

function checkWinner(board,user){
    let winner={"player": "",
            "status":false};
    for (var condition of conditions){
        if(board[condition[0][0]][condition[0][1]]=== user &&
            board[condition[1][0]][condition[1][1]]=== user &&
            board[condition[2][0]][condition[2][1]]=== user){
                winner.status =true;
                winner.player = user;
                return winner;
        }else if (board.filter(v=> v.includes('')).length === 0 ){
            winner.player = 'tie';
            winner.status = true;
            return winner
        }
    }
    return winner
}


function reset(){
    try{
        cells.forEach(cell=>{
            cell.innerHTML=""
            cell.classList.remove("selected")
            cell.addEventListener('click', clickCell, { once:true });
        })
        currentUser=user;
        computerTurn=false;
        winnerMsg.children[0].innerHTML="" ;
        winnerMsg.classList.remove("winner-message");
        board = [['', '', ''],
                ['', '', ''],
                ['', '', '']]
        resetTime()
    }catch(error){
        console.log(error)
    }
}

function saveScore(){
    try{    
        const data = new FormData(); 
        data.append("name", userName)
        data.append("score", score)
        data.append("game", "TicTacToe")

        fetch('../saveScore.php', {method:"POST", body: data})
        .then(response => {
            console.log(response)
            // btnSave.innerHTML="Saved"
        })
        .then(data => {
        console.log(data)
        });
    }catch(error){
        console.log(error)
    }
}