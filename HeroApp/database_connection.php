<?php
$host = "127.0.0.1";
$db_name = "hero_card_db";
$username = "root";
$password = "Sw33tLikeSugar!";

$mysqli = new mysqli($host, $username, $password, $db_name);
if($mysqli->connect_error) {
  exit('Could not connect');
}

$query = "SELECT first_name FROM users WHERE account_number = 307863";
$stmt = $mysqli->prepare($query);
//$stmt->bind_param("s", $_GET['q']);

$stmt->execute();
$stmt->store_result();

$stmt->bind_result($returned_name);
$stmt->fetch();
$stmt->close();

echo json_encode( array( 'returned_name' => $returned_name) );
?>
