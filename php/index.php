<?php
// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  15/05/2025
// @Descripción:        Obtiene los 3 libros más vendidos según la cantidad de 
//                      unidades disponibles.

// Indica el formato de salida en JSON
header('Content-Type: application/json');

// Genera una conexión a la base de datos
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

// Verifica si existe un error al conectar con la base de datos
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

// Genera la consulta para obtener los 3 libros más vendidos
$sql = "
SELECT 
    ruta_imagen,
    titulo,
    sinopsis
FROM libro
LIMIT 3
";

// Ejecuta la consulta
$resultado = $conn->query($sql);

// Inializa un arreglo para almacenar los registros de los libros obtenidos
$libros = [];

// Almacena los eventos en el arreglo
if ($resultado && $resultado->num_rows > 0) {
    while ($libro = $resultado->fetch_assoc()) {
        $libros[] = $libro;
    }
}

// Devuelve el resultado a JS en JSON para procesarlo
echo json_encode($libros, JSON_UNESCAPED_UNICODE);
?>
