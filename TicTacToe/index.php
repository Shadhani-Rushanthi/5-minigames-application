<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="./style.css">
    <script src="./script.js" defer></script>
    <script src="./timer.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <div class="main-container">
        <div class="start-game" id="start-game">
            <div class="name-container">
                <div class="name">
                    Please enter your name
                    <input type="text" id="name-input" required>
                </div>
                <input type="submit" class="start btn" id="start" value="Start"/>
            </div>
        </div>
        <div class="notification">
            <div class="userDetails">
                <div class="user-name" username>userName : X</div>
                <div class="computer">Computer : O</div>
            </div>
            <div class="time" id="time">
                <span id="hour">00</span>:<span id="minute">00</span>:<span id="second">00</span>
            </div>
        </div>
        <div class="user" id="user">X's Turn</div>
        <div class="board">
            <div class="cell" cell id="0"> </div>
            <div class="cell" cell id="1"></div>
            <div class="cell" cell id="2"></div>
            <div class="cell" cell id="3"></div>
            <div class="cell" cell id="4"></div>
            <div class="cell" cell id="5"></div>
            <div class="cell" cell id="6"></div>
            <div class="cell" cell id="7"></div>
            <div class="cell" cell id="8"></div>
        </div>
        <div class="winner" id="winner">
            <div class="message"></div>
        </div>
        <div class="btn-container">
            <button class="back btn" id="menu"><a href="../index.php">Main Menu</a></button>
            <button class="reset btn" id="reset">Restart</button>
        </div>
    </div>
</body>
</html>