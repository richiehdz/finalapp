<?php
session_start();

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

// Si se recibe una solicitud POST para borrar un anuncio
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_id'])) {
    $id = $_POST['delete_id'];

    // Verificar si el ID existe
    $check_sql = "SELECT * FROM anuncios WHERE id=$id";
    $check_result = $conn->query($check_sql);
    if ($check_result->num_rows > 0) {
        $sql = "DELETE FROM anuncios WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo "Anuncio con ID $id borrado exitosamente";
        } else {
            echo "Error al borrar anuncio: " . $conn->error;
        }
    } else {
        echo "El ID $id no existe";
    }
}

// Generar y almacenar el token CSRF
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Si se recibe una solicitud POST para agregar un nuevo anuncio
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['titulo']) && isset($_POST['descripcion'])) {
    // Verificar el token CSRF
    if (!empty($_POST['csrf_token']) && hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        $titulo = $_POST['titulo'];
        $descripcion = $_POST['descripcion'];

        // Validar si los campos del formulario de creación están vacíos
        if (!empty($titulo) && !empty($descripcion)) {
            $sql = "INSERT INTO anuncios (titulo, descripcion) VALUES ('$titulo', '$descripcion')";

            if ($conn->query($sql) === TRUE) {
                // Redirigir después de procesar el formulario
                header("Location: " . $_SERVER['PHP_SELF']);
                exit();
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Error: Los campos del formulario de creación de anuncios no pueden estar vacíos";
        }
    } else {
        echo "";
    }
}

// Obtener datos de la base de datos con orden descendente por ID
$sql = "SELECT id, titulo, descripcion FROM anuncios ORDER BY id DESC";
$result = $conn->query($sql);

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anuncios</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1>Anuncios</h1>
    <form id="anuncioForm" method="POST">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" required><br>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea><br>
        <button type="submit">Enviar</button>
    </form>
    <br>
    <form id="borrarAnuncioForm" method="POST">
        <label for="delete_id">ID del Anuncio a Borrar:</label>
        <input type="text" id="delete_id" name="delete_id" required>
        <button type="submit">Borrar</button>
    </form>
    <br>
    <table>
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["titulo"] . "</td>";
                echo "<td>" . $row["descripcion"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='3'>No hay anuncios disponibles</td></tr>";
        }
        ?>
    </table>
</body>
</html>
