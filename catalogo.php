<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$buscar = isset($_GET['buscar']) ? mb_strtoupper($conn->real_escape_string($_GET['buscar']), 'UTF-8') : '';

$sql = "
SELECT 
    l.TITULO,
    l.SINOPSIS,
    l.ANIO_PUBLICACION,
    l.PRECIO,
    l.CANTIDAD_DISPONIBLE,
    l.RUTA_IMAGEN,
    CONCAT(a.NOMBRE, ' ', a.APELLIDO_PATERNO, IFNULL(CONCAT(' ', a.APELLIDO_MATERNO), '')) AS AUTOR_COMPLETO,
    e.NOMBRE AS EDITORIAL
FROM LIBRO l
JOIN AUTOR a ON l.AUTOR_ID = a.AUTOR_ID
JOIN EDITORIAL e ON l.EDITORIAL_ID = e.EDITORIAL_ID
";

if ($buscar !== '') {
    $sql .= " WHERE 
        UPPER(l.TITULO) LIKE '%$buscar%' OR 
        UPPER(a.NOMBRE) LIKE '%$buscar%' OR 
        UPPER(a.APELLIDO_PATERNO) LIKE '%$buscar%' OR 
        UPPER(a.APELLIDO_MATERNO) LIKE '%$buscar%' OR
        UPPER(e.NOMBRE) LIKE '%$buscar%'";
}

$sql .= " ORDER BY TITULO";

$resultado = $conn->query($sql);

$libros = [];

while ($libro = $resultado->fetch_assoc()) {
    $libros[] = $libro;
}

echo json_encode($libros, JSON_UNESCAPED_UNICODE);
?>
