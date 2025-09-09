// ===========================================
// Variables que almacenan elementos del DOM
// ===========================================
const $formulario = document.querySelector(".form"),
  $tabla = document.querySelector(".table"),
  $plantilla = document.querySelector(".template").content,
  $fragmento = document.createDocumentFragment(),
  $clon = document.importNode($fragmento, true);
console.log($formulario, $tabla, $plantilla);

// ===========================================
// Variables globales de estado
// ===========================================

// --- Lógica captura info. De los inputs ---

// const contacto = {};

// --- Lógica almacenamos contactos en nuestra base de datos ---
// const db = [];

// ===========================================
// Funciónes que manejan el CRUD
// ===========================================
// const crearContacto = () => {};
// const leerContactos = () => {};
// const editarContacto = () => {};
// const eliminarContacto = () => {};

// ===========================================
// Delegación de Eventos + Evento "submit" (Interacción del Usuario)
// ===========================================
// $formulario.addEventListener("submit", (e) => {});

// ===========================================
// Delegación de Eventos + Evento "click" (Interacción del Usuario)
// ===========================================
// document.addEventListener("click", (e) => {});
