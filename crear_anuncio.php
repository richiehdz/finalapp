<?php
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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];

    $sql = "INSERT INTO anuncios (titulo, descripcion) VALUES ('$titulo', '$descripcion')";

    if ($conn->query($sql) === TRUE) {
        echo "Nuevo anuncio creado exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Anuncio</title>
</head>
<body>
    <h1>Crear Anuncio</h1>
    <form id="anuncioForm">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" required><br>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea><br>
        <button type="button" onclick="enviarAnuncio()">Enviar</button>
    </form>

    <script>
        function enviarAnuncio() {
            var xhr = new XMLHttpRequest();
            var url = 'crear_anuncio.php';
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert('Anuncio creado exitosamente');
                    document.getElementById('anuncioForm').reset();
                }
            };
            var titulo = document.getElementById('titulo').value;
            var descripcion = document.getElementById('descripcion').value;
            var data = 'titulo=' + encodeURIComponent(titulo) + '&descripcion=' + encodeURIComponent(descripcion);
            xhr.send(data);
        }
    </script>
</body>
</html>