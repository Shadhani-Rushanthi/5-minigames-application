<?php


// Check connection
function connectToDB(){
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "minigames";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
      return "";
    }
    echo "Connected successfully";
    return $conn;
}

function Insert($con, $name){
    $sql = "INSERT INTO players (name) VALUES ('".$name."')";
    echo 'query';  
    echo $sql;  
  if (mysqli_query($con, $sql)) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
  }
}

function InsertScore($con, $id, $score, $game){
  $sql = "INSERT INTO player_score (userId, score, game ) VALUES (".$id.", '".$score."', '".$game."')";
  echo 'query';  
  echo $sql;  
  if (mysqli_query($con, $sql)) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
  }
}

function endConnection($con){
  mysqli_close($con);
}


function getUser($con, $name, $score, $game){
  $sql = "select * from players where name ='".$name."'";
  echo 'query';
  echo $sql;
  $result = mysqli_query($con, $sql);
  if (mysqli_num_rows($result) > 0) {
    while ($row = $result->fetch_assoc()) {
      InsertScore($con, $row['id'], $score, $game);
    }
  } else {
    return Insert($con, $name);
    getUser($con, $name, $score, $game);
  }
}

?>