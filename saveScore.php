<?php
    include './DB.php';

    $con = connectToDB();

    if(isset($_POST['name'])){
        $result = getUser($con, $_POST['name'], $_POST['score'], $_POST['game']);
       return $result;

    }

    endConnection($con)
?>