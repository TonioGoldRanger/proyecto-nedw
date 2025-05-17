<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$sql = "
SELECT 
    NOMBRE,
    DESCRIPCION,
    CONCAT('../', RUTA_IMAGEN) AS RUTA_IMAGEN,
    FECHA_INICIO,
    FECHA_FIN
FROM EVENTO
ORDER BY FECHA_INICIO
";

$resultado = $conn->query($sql);

$eventos = [];

while ($evento = $resultado->fetch_assoc()) {
    $eventos[] = $evento;
}

echo json_encode($eventos, JSON_UNESCAPED_UNICODE);
?>
