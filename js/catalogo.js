document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("libros-container");
  const formBusqueda = document.getElementById("form-busqueda");
  const inputBusqueda = document.getElementById("campo-busqueda");
  const btnLimpiar = document.getElementById("btn-limpiar");

  let librosGlobal = [];

  function renderLibros(libros) {
    container.innerHTML = "";

    libros.forEach((libro, index) => {
      const item = document.createElement("div");
      item.className = "libro-item";
      item.dataset.index = index;

      item.innerHTML = `
        <img src="${libro.RUTA_IMAGEN}" alt="${libro.TITULO}">
        <h3>${libro.TITULO}</h3>
        <p><strong>Precio:</strong> $${parseFloat(libro.PRECIO).toFixed(2)}</p>
        <button class="btn-ver-mas">Ver más</button>
        <div class="detalle-libro" style="display: none;">
          <p><strong>Autor:</strong> ${libro.AUTOR_COMPLETO}</p>
          <p><strong>Editorial:</strong> ${libro.EDITORIAL}</p>
          <p><strong>Año:</strong> ${libro.ANIO_PUBLICACION}</p>
          <p><strong>Sinopsis:</strong> ${libro.SINOPSIS}</p>
          <p><strong>Disponibilidad:</strong> ${libro.CANTIDAD_DISPONIBLE} unidades</p>
        </div>
      `;

      item.querySelector(".btn-ver-mas").addEventListener("click", function () {
        const isExpanded = this.textContent === "Ver menos";

        if (isExpanded) {
          renderLibros(librosGlobal); // volver a mostrar todos
        } else {
          container.innerHTML = "";
          const solo = item.cloneNode(true);
          solo.querySelector(".detalle-libro").style.display = "block";
          solo.querySelector(".btn-ver-mas").textContent = "Ver menos";

          // Reasignar evento para volver
          solo.querySelector(".btn-ver-mas").addEventListener("click", () => renderLibros(librosGlobal));

          container.appendChild(solo);
        }
      });

      container.appendChild(item);
    });
  }

  function cargarLibros(query = "") {
    fetch(`../php/catalogo.php?buscar=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(libros => {
        librosGlobal = libros;

        if (libros.length === 0) {
          container.innerHTML = "<p>No se encontraron libros.</p>";
        } else {
          renderLibros(libros);
        }
      })
      .catch(err => console.error("Error al cargar los libros:", err));
  }

  // Carga inicial
  cargarLibros();

  formBusqueda.addEventListener("submit", e => {
    e.preventDefault();
    const query = inputBusqueda.value.trim();
    cargarLibros(query);
  });

  btnLimpiar.addEventListener("click", () => {
    inputBusqueda.value = "";
    inputBusqueda.focus();
    cargarLibros();
  });
});
