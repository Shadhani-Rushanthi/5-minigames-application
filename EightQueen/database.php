<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "8queenpuzzle";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
  echo"connected";
  }

// try {
//   $db = new PDO('mysql:host=localhost;dbname=8queenpuzzle', 'root', '');
//   // Set PDO error mode to exception
//   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
//   echo "Database connection successful!";
  
//   // Perform database operations here
  
// } catch(PDOException $e) {
//   echo "Database connection failed: " . $e->getMessage();
// }

?>

