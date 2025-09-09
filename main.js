// ===========================================
// Variables que almacenan elementos del DOM
// ===========================================
const d = document,
  $formulario = d.querySelector(".formulario"),
  $tabla = d.querySelector(".tabla"),
  $plantilla = d.querySelector(".plantilla").content,
  $fragmento = d.createDocumentFragment(),
  $clon = d.importNode($fragmento, true);

// ===========================================
// Variables globales de estado
// ===========================================

// --- Almacenamos contactos en nuestra base de datos ---
// let bd = [];

// ===========================================
// Funciónes que manejan el CRUD
// ===========================================
const crearContacto = () => {
  // --- Lógica captura información de los inputs ---
  contacto = {
    id: Date.now(),
    nombre: d.querySelector(".nombre").value,
    telefono: d.querySelector(".telefono").value,
    correo: d.querySelector(".correo").value,
  };

  console.log(contacto);
};

// const leerContactos = () => {};
// const editarContacto = () => {};
// const eliminarContacto = () => {};

// ===========================================
// Delegación de Eventos + Evento "submit" (Interacción del Usuario)
// ===========================================
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  crearContacto();
});

// ===========================================
// Delegación de Eventos + Evento "click" (Interacción del Usuario)
// ===========================================
// document.addEventListener("click", (e) => {});
