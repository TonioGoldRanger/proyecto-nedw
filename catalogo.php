<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

$buscar = isset($_GET['buscar']) ? $conn->real_escape_string($_GET['buscar']) : '';

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
        l.TITULO LIKE '%$buscar%' OR 
        a.NOMBRE LIKE '%$buscar%' OR 
        a.APELLIDO_PATERNO LIKE '%$buscar%' OR 
        a.APELLIDO_MATERNO LIKE '%$buscar%' OR
        e.NOMBRE LIKE '%$buscar%'";
}

$sql .= " ORDER BY TITULO";

$resultado = $conn->query($sql);

$libros = [];

while ($libro = $resultado->fetch_assoc()) {
    $libros[] = $libro;
}

echo json_encode($libros, JSON_UNESCAPED_UNICODE);
?>
