<?php
// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  20/05/2025
// @Descripción:        Obtiene los próximos eventos almacenados en la base de datos.

// Indica el formato de salida en JSON
header('Content-Type: application/json');

// Genera una conexión a la base de datos
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

// Verifica si existe un error al conectar con la base de datos
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

// Genera la consulta para obtener los eventos ordenados pos su fecha de inicio
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

// Ejecuta la consulta
$resultado = $conn->query($sql);

// Inializa un arreglo para almacenar los registros de los eventos obtenidos
$eventos = [];

// Almacena los eventos en el arreglo
while ($evento = $resultado->fetch_assoc()) {
    $eventos[] = $evento;
}

// Devuelve el resultado a JS en JSON para procesarlo
echo json_encode($eventos, JSON_UNESCAPED_UNICODE);
?>
