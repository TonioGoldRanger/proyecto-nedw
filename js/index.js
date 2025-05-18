// @Autor(es):          Arias Quintero Luis Antonio
//                      Canchola Cruz Fernando
//                      Villalpando Aguilar Jesica
// @Fecha de creación:  12/05/2025
// @Descripción:        Define el JS para mostrar los libros más vendidos.

// Declaración de arreglos
let libros = []; // Libros cargados
let indice = 0; // índice del libro del arreglo

function mostrarLibro(index) {
  const contenedor = document.getElementById("libroCarrusel"); // Contenedor del libro
  const libro = libros[index]; // Obtiene el libro en la posición mostrada

  // Válida que el libro exista
  if (!libro) {
    contenedor.innerHTML = `<p>Error al mostrar el libro.</p>`;
    return;
  }

  // Agrega el libro al carrusel usando HTML
  contenedor.innerHTML = `
    <img src="${libro.ruta_imagen}" alt="${libro.titulo}">
    <p class="titulo-libro">${libro.titulo}</p>
    <p class="descripcion-libro">${libro.sinopsis}</p>
  `;
}

// Muestra el siguiente libro en el carrusel
function siguienteLibro() {
  if (libros.length === 0) return;
  indice = (indice + 1) % libros.length;
  mostrarLibro(indice);
}

// Muestra el anterior libro en el carrusel
function anteriorLibro() {
  if (libros.length === 0) return;
  indice = (indice - 1 + libros.length) % libros.length;
  mostrarLibro(indice);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("php/index.php") //Procesa el php para obtener los libros
    .then(response => {
      // Maneja cualquier error obtenido al extraer los libros de la base de datos
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json(); // Convierte los libros a formato JSON
    })
    .then(data => {
      console.log("Datos:", data);
      libros = data;

      if (libros.length > 0) {
        mostrarLibro(indice); // Muestra el primer libro obtenido de la base de datos
      } else {
        document.getElementById("libroCarrusel").innerHTML = "<p>No hay libros disponibles.</p>";
      }
    })
    .catch(err => {
      // Manejo de errores por problemas de obtención de los libros desde la base de datos
      console.error("Error al cargar el carrusel de libros:", err);
      document.getElementById("libroCarrusel").innerHTML = "<p>Error al cargar los libros.</p>";
    });
});
