// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  12/05/2025
// @Descripción:        Define el JS para almacenar la información obtenida del
//                      formulario de contacto en la base de datos.

document.getElementById("form-contacto").addEventListener("submit", function(e) {
  e.preventDefault(); // Evita recargar la página

  // Obtiene el valor seleccionado del tipo de mensaje
  const tipoValor = document.querySelector('input[name="tipo"]:checked')?.value.trim();
  
  // Crea un mapa para asignar una letra al atributo TIPO_CONTACTO de la base de datos
  const tipoMap = {
    consulta: 'C',
    sugerencia: 'S',
    reclamo: 'R',
    otro: 'O'
  };

  // Convierte el valor seleccionado en la letra correspondiente
  const tipo = tipoMap[tipoValor?.toLowerCase()];

  // Obtiene los valores ingresados en el campo del formulario de contacto
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const acepto = document.getElementById("acepto").checked;

  // Verifica que los campos no tengan nulos
  if (!nombre || !email || !tipo || !mensaje || !acepto) {
    alert("Por favor, completa todos los campos y acepta la política.");
    return;
  }

  // Prepara los datos en un FormData antes de enviar al PHP
  const formData = new FormData();
  formData.append("tipo", tipo);
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("mensaje", mensaje);

  // Envía los datos obtenidos al PHP para ser procesados
  fetch("../php/contacto.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json()) // Transforma lo obtenido del PHP en JSON
    .then(data => {

      // Verifica que la inserción del nuevo registro sea exitosa
      if (data.error) {
        alert("Error al insertar: " + data.error);
        return;
      }

      // Muestra un mensaje al usuario según el tipo de contacto seleccionado
      if (tipo === 'R') {
        alert(nombre + ", lamentamos los inconvenientes. Responderemos lo más pronto posible.");
      } else {
        alert("Gracias por contactarnos, " + nombre + ". Responderemos lo más pronto posible.");
      }

      // Limpia el formulario tras el envío exitoso
      document.getElementById("form-contacto").reset();
    })
    .catch(error => {
      // Manejo de errores por problemas de insersión en la base de datos
      console.error("Error:", error);
      alert("Hubo un error al enviar el formulario.");
    });
});