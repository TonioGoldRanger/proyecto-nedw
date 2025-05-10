<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

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
JOIN AUTOR a
    ON l.AUTOR_ID = a.AUTOR_ID
JOIN EDITORIAL e
    ON l.EDITORIAL_ID = e.EDITORIAL_ID
ORDER BY TITULO
";

$resultado = $conn->query($sql);

$libros = [];

while ($libro = $resultado->fetch_assoc()) {
    $libros[] = $libro;
}

echo json_encode($libros, JSON_UNESCAPED_UNICODE);
?>