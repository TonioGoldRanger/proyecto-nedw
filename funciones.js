function cambiarImagen() {
    const img = document.getElementById("imagenLibro");
    img.src = img.src.includes("libro1.jpg") ? "imagenes/libro2.jpg" : "imagenes/libro1.jpg";
  }
  

  const libros = [
    {
      imagen: "images/cien-anios-soledad.jpg",
      titulo: "Cien años de soledad",
      descripcion: "Una saga familiar mágica y poética escrita por Gabriel García Márquez."
    },
    {
      imagen: "images/1984.jpg",
      titulo: "1984",
      descripcion: "Distopía política de George Orwell sobre vigilancia y represión estatal."
    },
    {
      imagen: "images/prince.jpg",
      titulo: "El Principito",
      descripcion: "Un cuento filosófico lleno de simbolismo sobre la amistad y la vida."
    }
  ];
  
  let indice = 0;
  
  function mostrarLibro(index) {
    const contenedor = document.getElementById("libroCarrusel");
    contenedor.innerHTML = `
      <img src="${libros[index].imagen}" alt="${libros[index].titulo}">
      <p class="titulo-libro">${libros[index].titulo}</p>
      <p class="descripcion-libro">${libros[index].descripcion}</p>
    `;
  }
  
  function siguienteLibro() {
    indice = (indice + 1) % libros.length;
    mostrarLibro(indice);
  }
  
  function anteriorLibro() {
    indice = (indice - 1 + libros.length) % libros.length;
    mostrarLibro(indice);
  }
  
  // Mostrar el primer libro al cargar
  document.addEventListener("DOMContentLoaded", () => {
    mostrarLibro(indice);
  });