<!DOCTYPE html>
<html>
<head>
  <title>Minimum Connectors Game</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <h1>Minimum Connectors Game</h1>
  <div class="container">
    <div class="game-info">
      <h2>Game Information</h2>
      <label id="startingCityLabel"></label>
      <div class="distances" id="distancesLabel"></div>
    </div>
    <div class="game-play">
      <h2>Game Play</h2>
      <label for="playerName">Player Name:</label>
      <input type="text" id="playerName" />
      <button id="startButton">Start Game</button>
      <div id="answerContainer" style="display: none;">
        <label id="answerLabel"></label>
        <div id="connectorFields"></div>
        <button id="submitButton">Submit Answer</button>
        <button id="backButton"><a href="../index.php">Main Menu</a></button>
      </div>
    </div>
  </div>

  <script src="priorityqueue.js"></script>
  <script src="game.js"></script>
</body>
</html>
