// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  12/05/2025
// @Descripción:        Define el JS para depslegar todos los libros del cátalogo de la base
//                      de datos. Además implementa un buscador.

document.addEventListener("DOMContentLoaded", () => {
  // Define las referencias a los elementos del DOM
  const container = document.getElementById("libros-container");    // Sección de libros
  const formBusqueda = document.getElementById("form-busqueda");    // Sección de búsqueda
  const inputBusqueda = document.getElementById("campo-busqueda");  // Barra de búsqueda
  const btnLimpiar = document.getElementById("btn-limpiar");        // Botón de limpieza del buscador

  let librosGlobal = []; // Libros cargados

  // Coloca los libros en el contenedor
  function renderLibros(libros) {
    container.innerHTML = ""; // Limpia el contenedor antes de cargar libros

    // Procesa cada libro de la base de datos
    libros.forEach((libro, index) => {
      const item = document.createElement("div"); // Crea un contenedor para cada libro
      item.className = "libro-item"; // Asigna la clase
      item.dataset.index = index; // Guarda el índice de cada libro

      // Agrega el libro en HTML
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

      // Agrega el botón "Ver más" al contenedor del libro
      item.querySelector(".btn-ver-mas").addEventListener("click", function () {
        const isExpanded = this.textContent === "Ver menos"; // Verifica sí "ver más" está desplegado

        if (isExpanded) {
          renderLibros(librosGlobal); // Muestra todo los libros si está expandido
        } else {
          container.innerHTML = ""; // Limpia el contenedor
          const solo = item.cloneNode(true); 
          solo.querySelector(".detalle-libro").style.display = "block"; // Muestra los detalles de cada libro
          solo.querySelector(".btn-ver-mas").textContent = "Ver menos"; // Cambia el texto del botón a "Ver menos"

          // Agrega un evento para ver los detalles del libro
          solo.querySelector(".btn-ver-mas").addEventListener("click", () => renderLibros(librosGlobal));
          
          // Muestra únicamente el libro seleccionado en "Ver más"
          container.appendChild(solo);
        }
      });

      container.appendChild(item);
    });
  }

  function cargarLibros(query = "") {
    fetch(`../php/catalogo.php?buscar=${encodeURIComponent(query)}`) // Obtiene libro según el término a buscar
      .then(response => response.json()) // Transforma lo obtenido de php a JSON
      .then(libros => {
        librosGlobal = libros; // Guarda los libros obtenidos

        // Verifica la existencia de libros para el término buscado
        if (libros.length === 0) {
          container.innerHTML = "<p>No se encontraron libros.</p>";
        } else {
          renderLibros(libros); // Si hay libros, los muestra
        }
      })
      .catch(err => console.error("Error al cargar los libros:", err));
  }

  // Carga inicial de libros al cargar la página
  cargarLibros();

  formBusqueda.addEventListener("submit", e => {
    e.preventDefault();
    const query = inputBusqueda.value.trim(); // Obtiene el texto y limpia la barra de búsqueda
    cargarLibros(query); // Carga los libros que coincidad con la búsqueda
  });

  btnLimpiar.addEventListener("click", () => {
    inputBusqueda.value = ""; // Limpia la barra de búsqueda
    inputBusqueda.focus();
    cargarLibros(); // Carga todos los libros
  });
});
