<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$sql = "
SELECT 
    ruta_imagen,
    titulo,
    sinopsis
FROM libro
LIMIT 3
";

$resultado = $conn->query($sql);

$libros = [];

if ($resultado && $resultado->num_rows > 0) {
    while ($libro = $resultado->fetch_assoc()) {
        $libros[] = $libro;
    }
}

echo json_encode($libros, JSON_UNESCAPED_UNICODE);
?>
