<?php
// Configuración de la conexión a la base de datos MySQL
$servername = "localhost";
$username = "id22172680_foro";
$password = "Artchpla*2828";
$dbname = "id22172680_foro";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir los datos del tiempo transcurrido
$codigoAlumno = $_POST['codigoAlumno'];
$nombreAlumno = $_POST['nombreAlumno'];
$horas = $_POST['horas'];
$minutos = $_POST['minutos'];
$segundos = $_POST['segundos'];

// Preparar la consulta SQL
$sql = "INSERT INTO TiempoTranscurrido (codigoAlumno, nombreAlumno, horas, minutos, segundos) VALUES ('$codigoAlumno', '$nombreAlumno', '$horas', '$minutos', '$segundos')";

// Ejecutar la consulta y verificar si fue exitosa
if ($conn->query($sql) === TRUE) {
    echo "Tiempo transcurrido almacenado correctamente";
} else {
    echo "Error al almacenar el tiempo transcurrido: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>