let libros = [];
let indice = 0;

function mostrarLibro(index) {
  const contenedor = document.getElementById("libroCarrusel");
  const libro = libros[index];

  if (!libro) {
    contenedor.innerHTML = `<p>Error al mostrar el libro.</p>`;
    return;
  }

  contenedor.innerHTML = `
    <img src="${libro.ruta_imagen}" alt="${libro.titulo}">
    <p class="titulo-libro">${libro.titulo}</p>
    <p class="descripcion-libro">${libro.sinopsis}</p>
  `;
}

function siguienteLibro() {
  if (libros.length === 0) return;
  indice = (indice + 1) % libros.length;
  mostrarLibro(indice);
}

function anteriorLibro() {
  if (libros.length === 0) return;
  indice = (indice - 1 + libros.length) % libros.length;
  mostrarLibro(indice);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("inicio.php")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Datos recibidos desde PHP:", data);
      libros = data;

      if (libros.length > 0) {
        mostrarLibro(indice);
      } else {
        document.getElementById("libroCarrusel").innerHTML = "<p>No hay libros disponibles.</p>";
      }
    })
    .catch(err => {
      console.error("Error al cargar el carrusel de libros:", err);
      document.getElementById("libroCarrusel").innerHTML = "<p>Error al cargar los libros.</p>";
    });
});
