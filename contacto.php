<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "admin_libreria", "admin_libreria", "eq3libreria");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$tipo = $_POST['tipo'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

$sql = "INSERT INTO SOLICITUD_CONTACTO(TIPO_SOLICITUD, NOMBRE, EMAIL, MENSAJE) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $tipo, $nombre, $email, $mensaje);

if ($stmt->execute()) {
    echo json_encode(["success" => "Datos insertados."]);
} else {
    echo json_encode(["error" => "Error al insertar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
