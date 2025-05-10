document.addEventListener("DOMContentLoaded", () => {
  fetch("catalogo.php")
    .then(response => response.json())
    .then(libros => {
      const container = document.getElementById("libros-container");
      libros.forEach(libro => {
        const item = document.createElement("div");
        item.className = "libro-item";

        item.innerHTML = `
          <img src="${libro.RUTA_IMAGEN}" alt="${libro.TITULO}">
          <h3>${libro.TITULO}</h3>
          <p><strong>Precio:</strong> $${parseFloat(libro.PRECIO).toFixed(2)}</p>
          <button onclick="verDetalle(this)">Ver más</button>
          <div class="detalle-libro" style="display: none;">
            <p><strong>Autor:</strong> ${libro.AUTOR_COMPLETO}</p>
            <p><strong>Editorial:</strong> ${libro.EDITORIAL}</p>
            <p><strong>Año:</strong> ${libro.ANIO_PUBLICACION}</p>
            <p><strong>Sinopsis:</strong> ${libro.SINOPSIS}</p>
            <p><strong>Disponibilidad:</strong> ${libro.CANTIDAD_DISPONIBLE} unidades</p>
          </div>
        `;

        container.appendChild(item);
      });
    })
    .catch(err => console.error("Error al cargar los libros:", err));
});

function verDetalle(boton) {
  const detalle = boton.nextElementSibling;
  const visible = detalle.style.display === 'block';
  detalle.style.display = visible ? 'none' : 'block';
  boton.textContent = visible ? 'Ver más' : 'Ver menos';
}
