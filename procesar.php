
<?php
$nombre = $_POST['nombre'];
$genero = $_POST['genero'];
$formato = implode(", ", $_POST['formato']);
$pais = $_POST['pais'];

echo "<h1>Gracias por tu sugerencia, $nombre!</h1>";
echo "<p>Género: $genero</p>";
echo "<p>Formato preferido: $formato</p>";
echo "<p>País: $pais</p>";
?>
