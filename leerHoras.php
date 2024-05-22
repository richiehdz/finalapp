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

// Preparar la consulta SQL
$sql = "SELECT codigoAlumno, nombreAlumno, horas, minutos, segundos FROM TiempoTranscurrido";

// Ejecutar la consulta y obtener los resultados
$result = $conn->query($sql);

// Verificar si hay resultados y formatearlos como JSON
if ($result->num_rows > 0) {
    $registrosTiempo = array();
    while($row = $result->fetch_assoc()) {
        $registro = array(
            'codigoAlumno' => $row['codigoAlumno'],
            'nombreAlumno' => $row['nombreAlumno'],
            'horas' => $row['horas'],
            'minutos' => $row['minutos'],
            'segundos' => $row['segundos']
        );
        array_push($registrosTiempo, $registro);
    }
    // Devolver los resultados como JSON
    echo json_encode($registrosTiempo);
} else {
    echo "No se encontraron registros de tiempo transcurrido";
}

// Cerrar la conexión
$conn->close();
?>
