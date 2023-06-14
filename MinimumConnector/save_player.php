<?php
// Get the player information from the AJAX request
$playerName = $_POST['playerName'];
$answers = json_decode($_POST['answers'], true);

// Connect to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minigames";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Insert the player information into the database
$sql = "INSERT INTO players (name) VALUES ('$playerName')";
if ($conn->query($sql) === true) {
  $playerId = $conn->insert_id;
  foreach ($answers as $cityName => $distance) {
    $sql = "INSERT INTO player_answers (player_id, city_name, distance) VALUES ($playerId, '$cityName', $distance)";
    $conn->query($sql);
  }
  echo "Player information saved successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
