document.getElementById("form-contacto").addEventListener("submit", function(e) {
    e.preventDefault(); // Previene envío real
  
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const acepto = document.getElementById("acepto").checked;
  
    if (!nombre || !email || !mensaje || !acepto) {
      alert("Por favor, completa todos los campos y acepta la política.");
      return;
    }
  
    alert("Gracias por contactarnos, " + nombre + ". Pronto te responderemos.");
    this.reset(); // Limpia el formulario
  });
  