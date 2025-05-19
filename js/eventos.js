// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  12/05/2025
// @Descripción:        Define el JS para desplegar todos los eventos programados y
//                      almacenados en la base de datos.

document.addEventListener("DOMContentLoaded", () => {

  // Define las referencias a los elementos del DOM
  const container = document.getElementById("eventos-container");

  function renderEventos(eventos) {
    container.innerHTML = ""; // Limpia el contenedor de eventos antes de cargar los eventos

    // Procesa cada evento de la base de datos
    eventos.forEach(evento => {
      const item = document.createElement("div"); // Crea un contenedor para cada evento
      item.className = "evento-item"; // Asigna la clase

      // Agrega el evento en HTML
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
    fetch("../php/eventos.php") // Obtiene los eventos de la base de datos
      .then(response => response.json())
      .then(eventos => {

        // Valida la existencia de eventos en la base de datos
        if (eventos.length === 0) {
          container.innerHTML = "<p>No se encontraron eventos.</p>";
        } else {
          renderEventos(eventos); // Muestra los eventos
        }
      })
      .catch(err => {
        // Manejo de errores por problemas de obtención de los eventos desde la base de datos
        console.error("Error al cargar los eventos:", err);
        container.innerHTML = "<p>Error al cargar los eventos.</p>";
      });
  }

  cargarEventos(); // Carga todos los eventos
});