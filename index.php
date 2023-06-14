<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Games</title>
    <link rel="stylesheet" href="./Home/Home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="./home.js" defer></script>
</head>
<body>
    <div class="main-container" id="main">
        <div class="sound-icon">
            <img src="./Home/sound.png" alt="" id="sound">
            <img src="./Home/mute.png" alt="" id="mute">
        </div>
        <div class="game-name" id="game-name">Mini Games! select your game</div>
        <div class="games">
            <div class="game">
                <a href="./EightQueen/WelcomeScreen.html">
                    <img src="./Home/queen.png" alt="" game class="game-img" id="8 Queen Puzzle game">
                </a>
            </div>
            <div class="game">
                <a href="./EncodeDecode/index.php">
                    <img src="./Home/encode.png" alt="" game class="game-img" id="Encode-Decode">
                </a>
            </div>
            <div class="game">
                <a href="./TicTacToe/index.php">
                    <img src="./Home/tictactoe.png" alt="" game class="game-img" id="Tic Tac Toe">
                </a>
            </div>
            <div class="game">
                <a href="./FindShortestPath/index.html">
                    <img src="./Home/shortpath.png" alt="" game class="game-img" id="Find Sortest Path">
                </a>
            </div>
            <div class="game" >
                <a href="./MinimumConnector/game.php">
                    <img src="./Home/minimum.png" alt="" game class="game-img" id="Minimum Connectors">
                </a>
            </div>
        </div>
    </div>
</body>
</html>