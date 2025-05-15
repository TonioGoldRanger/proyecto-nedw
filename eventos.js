document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("eventos-container");

  function renderEventos(eventos) {
    container.innerHTML = "";

    eventos.forEach(evento => {
      const item = document.createElement("div");
      item.className = "evento-item";

      item.innerHTML = `
        <div class="evento-contenido">
          <div class="evento-imagen">
            <img src="${evento.RUTA_IMAGEN}" alt="${evento.NOMBRE}">
          </div>
          <div class="evento-detalles">
            <h4 class="evento-titulo">${evento.NOMBRE}</h4>
            <p><strong>Fecha:</strong> ${new Date(evento.FECHA_INICIO).toLocaleDateString()} – ${new Date(evento.FECHA_FIN).toLocaleDateString()}</p>
            <p>${evento.DESCRIPCION}</p>
          </div>
        </div>
      `;

      container.appendChild(item);
    });
  }

  function cargarEventos() {
    fetch("eventos.php")
      .then(response => response.json())
      .then(eventos => {
        if (eventos.length === 0) {
          container.innerHTML = "<p>No se encontraron eventos.</p>";
        } else {
          renderEventos(eventos);
        }
      })
      .catch(err => {
        console.error("Error al cargar los eventos:", err);
        container.innerHTML = "<p>Error al cargar los eventos.</p>";
      });
  }

  cargarEventos();
});