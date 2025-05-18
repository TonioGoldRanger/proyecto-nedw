<?php
// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  20/05/2025
// @Descripción:        Almacen en la base de datos los datos capturados
//                      en el formulario de contacto.

// Indica el formato de salida en JSON
header('Content-Type: application/json');

// Genera una conexión a la base de datos
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

// Verifica si existe un error al conectar con la base de datos
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

// Obtiene los datos del formulario capturados en el HTML pasando por JS
$tipo = $_POST['tipo'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

// Genera una sentencia DML insert parametrizada para almacenar los datos de contacto del formulario
$sql = "INSERT INTO SOLICITUD_CONTACTO(TIPO_SOLICITUD, NOMBRE, EMAIL, MENSAJE) VALUES (?, ?, ?, ?)";

// Ejecuta la sentencia
$stmt = $conn->prepare($sql);

// Asocia los datos capturados en VALUES para evitar inyecciones SQL
$stmt->bind_param("ssss", $tipo, $nombre, $email, $mensaje);

// Verifica si la sentencia se ejecutó correcta o incorrectamente
if ($stmt->execute()) {
    echo json_encode(["success" => "Datos insertados."]);
} else {
    echo json_encode(["error" => "Error al insertar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
