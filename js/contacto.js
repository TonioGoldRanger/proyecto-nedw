document.getElementById("form-contacto").addEventListener("submit", function(e) {
  e.preventDefault();

  const tipoValor = document.querySelector('input[name="tipo"]:checked')?.value.trim();
  const tipoMap = {
    consulta: 'C',
    sugerencia: 'S',
    reclamo: 'R',
    otro: 'O'
  };

  const tipo = tipoMap[tipoValor?.toLowerCase()];
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const acepto = document.getElementById("acepto").checked;

  if (!nombre || !email || !tipo || !mensaje || !acepto) {
    alert("Por favor, completa todos los campos y acepta la política.");
    return;
  }

  const formData = new FormData();
  formData.append("tipo", tipo);
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("mensaje", mensaje);

  fetch("../php/contacto.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("Error al insertar: " + data.error);
        return;
      }

      if (tipo === 'R') {
        alert(nombre + ", lamentamos los inconvenientes. Responderemos lo más pronto posible.");
      } else {
        alert("Gracias por contactarnos, " + nombre + ". Responderemos lo más pronto posible.");
      }

      document.getElementById("form-contacto").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Hubo un error al enviar el formulario.");
    });
});