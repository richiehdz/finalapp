<?php
// Configuración de la conexión a la base de datos MySQL
$servername = "localhost";
$username = "id22172680_foro";
$password = "Artchpla*2828";
$dbname = "id22172680_foro";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir datos del tiempo transcurrido
$codigoAlumno = isset($_POST['codigoAlumno']) ? $_POST['codigoAlumno'] : '';
$nombreAlumno = isset($_POST['nombreAlumno']) ? $_POST['nombreAlumno'] : '';
$horas = isset($_POST['horas']) ? intval($_POST['horas']) : 0;
$minutos = isset($_POST['minutos']) ? intval($_POST['minutos']) : 0;
$segundos = isset($_POST['segundos']) ? intval($_POST['segundos']) : 0;

// Validar los datos recibidos
if(empty($codigoAlumno) || empty($nombreAlumno)) {
    die("Error: Código de alumno y nombre son obligatorios.");
}

// Consulta SQL para verificar si existe un registro con el codigoAlumno dado
$sql_check = "SELECT * FROM TiempoTranscurrido WHERE codigoAlumno = ?";
$stmt = $conn->prepare($sql_check);
$stmt->bind_param("s", $codigoAlumno);
$stmt->execute();
$result_check = $stmt->get_result();

if ($result_check->num_rows > 0) {
    // Si existe un registro, sumar el tiempo proporcionado a los valores existentes
    $row = $result_check->fetch_assoc();
    $horas += $row['horas'];
    $minutos += $row['minutos'];
    $segundos += $row['segundos'];

    // Ajustar los minutos y segundos si exceden 60
    $minutos += floor($segundos / 60);
    $segundos = $segundos % 60;
    $horas += floor($minutos / 60);
    $minutos = $minutos % 60;

    // Actualizar el registro existente con el nuevo tiempo
    $sql_update = "UPDATE TiempoTranscurrido SET horas = ?, minutos = ?, segundos = ? WHERE codigoAlumno = ?";
    $stmt = $conn->prepare($sql_update);
    $stmt->bind_param("iiis", $horas, $minutos, $segundos, $codigoAlumno);
    if ($stmt->execute()) {
        echo "Los datos del tiempo transcurrido se han actualizado correctamente.";
    } else {
        echo "Error al actualizar los datos: " . $conn->error;
    }
} else {
    // Si no existe un registro, insertar uno nuevo
    $sql_insert = "INSERT INTO TiempoTranscurrido (codigoAlumno, nombreAlumno, horas, minutos, segundos) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql_insert);
    $stmt->bind_param("ssiis", $codigoAlumno, $nombreAlumno, $horas, $minutos, $segundos);
    if ($stmt->execute()) {
        echo "Los datos del tiempo transcurrido se han insertado correctamente.";
    } else {
        echo "Error al insertar los datos: " . $conn->error;
    }
}

// Cerrar declaración y conexión
$stmt->close();
$conn->close();
?>
