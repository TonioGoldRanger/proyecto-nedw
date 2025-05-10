function resaltarParrafo() {
    const parrafo = document.getElementById("historia");
    parrafo.classList.toggle("destacado");
  }
  
  function cambiarImagen(img) {
    const original = "images/equipo.jpg";
    const alternativa = "images/equipo2.jpg";
  
    img.src = img.src.includes("equipo2.jpg") ? original : alternativa;
  }
  