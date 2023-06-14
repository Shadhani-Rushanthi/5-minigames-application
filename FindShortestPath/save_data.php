<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "minigames";

// Create a new MySQLi connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the data sent from the client
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the data from the request
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data["username"];
    $totalPoints = $data["totalPoints"];
    $answers = $data["answers"];

    // Insert into 'user' table
    $stmt = $conn->prepare("INSERT INTO users (username) VALUES (?)");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    // Get the inserted user id
    $userId = $stmt->insert_id;

    // Insert into 'total_points' table
    $stmt = $conn->prepare("INSERT INTO total_points (user_id, total_points) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $totalPoints);
    $stmt->execute();

    // Insert into 'user_answers' table
    $stmt = $conn->prepare("INSERT INTO user_answers (user_id, city, distance, is_correct) VALUES (?, ?, ?, ?)");
    foreach ($answers as $answer) {
        $city = $answer["city"];
        $distance = $answer["userAnswer"];
        $isCorrect = ($distance === $distances[$i]) ? 1 : 0;
        $stmt->bind_param("issi", $userId, $city, $distance, $isCorrect);
        $stmt->execute();
    }

    // Check if the insertions were successful
    if ($stmt->affected_rows > 0) {
        echo "Data saved successfully.";
    } else {
        echo "Error saving data.";
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>