<?php
// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  20/05/2025
// @Descripción:        Obtiene los libros, autores y editorales de la base de datos
//                      según su predicado (WHERE).

// Indica el formato de salida en JSON
header('Content-Type: application/json');

// Genera una conexión a la base de datos
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

// Verifica si existe un error al conectar con la base de datos
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

// Obtiene el parámetro buscar, lo parametriza para evitar inyecciones SQL y convierte a mayúsculas
$buscar = isset($_GET['buscar']) ? mb_strtoupper($conn->real_escape_string($_GET['buscar']), 'UTF-8') : '';

// Genera la consulta base para obtener la información de los libros, autores y editoriales
$sql = "
SELECT 
    l.TITULO,
    l.SINOPSIS,
    l.ANIO_PUBLICACION,
    l.PRECIO,
    l.CANTIDAD_DISPONIBLE,
    CONCAT('../', l.RUTA_IMAGEN) AS RUTA_IMAGEN,
    CONCAT(a.NOMBRE, ' ', a.APELLIDO_PATERNO, IFNULL(CONCAT(' ', a.APELLIDO_MATERNO), '')) AS AUTOR_COMPLETO,
    e.NOMBRE AS EDITORIAL
FROM LIBRO l
JOIN AUTOR a ON l.AUTOR_ID = a.AUTOR_ID
JOIN EDITORIAL e ON l.EDITORIAL_ID = e.EDITORIAL_ID
";

// Si se ingreso una búsqueda se agrega el WHERE para filtrar libros según el texto ingresado por el usuario en la barra de búsqueda
if ($buscar !== '') {
    $sql .= " WHERE 
        UPPER(l.TITULO) LIKE '%$buscar%' OR 
        UPPER(a.NOMBRE) LIKE '%$buscar%' OR 
        UPPER(a.APELLIDO_PATERNO) LIKE '%$buscar%' OR 
        UPPER(a.APELLIDO_MATERNO) LIKE '%$buscar%' OR
        UPPER(e.NOMBRE) LIKE '%$buscar%'";
}

// Ondena los libros por el título
$sql .= " ORDER BY TITULO";

// Ejecuta la consulta
$resultado = $conn->query($sql);

// Inializa un arreglo para almacenar los registros de los libros obtenidos
$libros = [];

// Almacena los libros en el arreglo
while ($libro = $resultado->fetch_assoc()) {
    $libros[] = $libro;
}

// Devuelve el resultado a JS en JSON para procesarlo
echo json_encode($libros, JSON_UNESCAPED_UNICODE);
?>
