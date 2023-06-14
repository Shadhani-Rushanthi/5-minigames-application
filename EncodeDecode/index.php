<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <script src="../TicTacToe/script.js" defer></script> -->
    <script src="./index.js" defer></script>
    <script src="./huffmanAlgo.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="main-container">
        <div class="start-game" id="start-game">
            <div class="name-container">
                <div class="name">
                    Please enter your name
                    <input type="text" id="name-input" required>
                </div>
                <div class="word-type">
                    <div class="name">Select game option</div>
                    <div class="types-wrapper">
                        <div class="types" types id="option1">Write Enocde value</div>
                        <div class="types" types id="option2">Write Decode value</div>
                    </div>
                </div>
                <input type="ENsubmit" class="start btn" id="start" value="Start"/>
            </div>
        </div>
        <div class="notification">
            <div class="userDetails">
                <div class="user-name" username>userName : X</div>
            </div>
            <div class="score" id="score">Score : 00</div>
        </div>
        <div class="board">
            <div class="wordContainer">
                <div class="randomString">
                    <div class="desc" id="desc">Write the enocde value of the word</div>
                    <div class="selectedWord" id="selectedWord">Word</div>
                </div>
                <div class="word" id="word">
                    <input type="text" class="letter" placeholder="_" code maxlength="1"/>
                </div>
                <div class="huffcode" id="huffcode">
                    
                </div>          
            </div>
        </div>
        <div class="winner" id="winner">
            <div class="message">
            </div>
        </div>
        <div class="btn-container">
            <button class="back btn" id="menu"><a href="../index.php">Main Menu</a></button>
            <button class="reset btn" id="reset" onclick="window.location=`?">Restart</button>
            <button class="next btn" id="next">Next Level</button>
            <button class="save btn" id="save">Save Score</button>
        </div>
    </div>
</body>
</html>