<?php
// Retrieve the submitted name from the form
$name = $_POST['Name'];
$q1 = $_POST['Q1'];
$q2 = $_POST['Q2'];
$q3 = $_POST['Q3'];
$q4 = $_POST['Q4'];
$q5 = $_POST['Q5'];
$q6 = $_POST['Q6'];
$q7 = $_POST['Q7'];
$q8 = $_POST['Q8'];

// Check if the number of queens is equal to 8
if ($q1 && $q2 && $q3 && $q4 && $q5 && $q6 && $q7 && $q8) {
    // Insert the name into the database
    try {
        $db = new PDO('mysql:host=localhost;dbname=8queenpuzzle', 'root', '');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $db->prepare('INSERT INTO usersdata (Name, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8) VALUES (:name, :q1, :q2, :q3, :q4, :q5, :q6, :q7, :q8)');
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':q1', $q1);
        $stmt->bindParam(':q2', $q2);
        $stmt->bindParam(':q3', $q3);
        $stmt->bindParam(':q4', $q4);
        $stmt->bindParam(':q5', $q5);
        $stmt->bindParam(':q6', $q6);
        $stmt->bindParam(':q7', $q7);
        $stmt->bindParam(':q8', $q8);

        $stmt->execute();

        echo 'Data inserted successfully!';
    } catch (PDOException $e) {
        echo 'Database error: ' . $e->getMessage();
    }
} else {
    echo 'Please place 8 queens on the chessboard.';
}
?>
