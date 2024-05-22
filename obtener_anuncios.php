<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "id22172680_foro";
$password = "Artchpla*2828";
$dbname = "id22172680_foro";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id, titulo, descripcion, fecha FROM anuncios ORDER BY fecha DESC";
$result = $conn->query($sql);

$anuncios = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $anuncios[] = $row;
    }
}

echo json_encode($anuncios);

$conn->close();
?>
