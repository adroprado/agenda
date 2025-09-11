// ===========================================
// Variables que almacenan elementos del DOM
// ===========================================
const d = document,
  $formulario = d.querySelector(".formulario"),
  $tabla = d.querySelector(".tabla"),
  $plantilla = d.querySelector(".plantilla").content,
  $fragmento = d.createDocumentFragment();

// ===========================================
// Variables globales de estado
// ===========================================
const ls = localStorage;
let baseDeDatos = [];

// ===========================================
// Funciónes que manejan el CRUD
// ===========================================
// --- Lógica crear (Create) ---
const crearContacto = () => {
  // --- Capturando información de los inputs ---
  const contacto = {
    id: Date.now(),
    nombre: d.querySelector(".nombre").value,
    telefono: d.querySelector(".telefono").value,
    correo: d.querySelector(".correo").value,
  };

  // --- Almacenamos contactos en nuestra base de datos ---
  baseDeDatos.push(contacto);
  console.log(baseDeDatos);
  $formulario.reset(); // Limpia formulario para ingresar un nuevo contacto
  location.reload(); // Actualiza la página
};

// --- Almacenamos base de datos en localStorage con método "setItem(key, value)"---
const contactosSet = () => {
  ls.setItem("contactos", JSON.stringify(baseDeDatos));
};

// --- Extracción de contactos del localStorage con método "getItem(key)"---

const contactosGet = () => {
  let contactosDelAlmacenamientoLocal = JSON.parse(ls.getItem("contactos"));
  baseDeDatos = contactosDelAlmacenamientoLocal || [];
  console.log(baseDeDatos);
};
contactosGet();

// --- Lógica lectura (Read) ---

const leerContactos = () => {
  // Limpia el contenido actual de la tabla para evitar duplicados
  $tabla.querySelector("tbody").innerHTML = "";

  baseDeDatos.forEach((el) => {
    $plantilla.querySelector(".nombre").textContent = el.nombre;
    $plantilla.querySelector(".telefono").textContent = el.telefono;
    $plantilla.querySelector(".correo").textContent = el.correo;
    $plantilla.querySelector(".btn-editar").dataset.id = el.id;
    $plantilla.querySelector(".btn-eliminar").dataset.id = el.id;

    const $clon = d.importNode($plantilla, true);
    $fragmento.appendChild($clon);
  });

  $tabla.querySelector("tbody").appendChild($fragmento);
};
leerContactos();

// const editarContacto = () => {};
// const eliminarContacto = () => {};

// ===========================================
// Delegación de Eventos + Evento "submit" (Interacción del Usuario)
// ===========================================
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  crearContacto();
  contactosSet();
});

// ===========================================
// Delegación de Eventos + Evento "click" (Interacción del Usuario)
// ===========================================
// document.addEventListener("click", (e) => {});
