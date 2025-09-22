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
// --- Lógica crear contacto (Create) ---
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
};

// --- Almacenamos base de datos en localStorage con método "setItem(key, value)"---
const contactosSet = () => {
  ls.setItem("contactos", JSON.stringify(baseDeDatos));
};

// --- Extracción de contactos del localStorage con método "getItem(key)"---

const contactosGet = () => {
  let contactosDelAlmacenamientoLocal = JSON.parse(ls.getItem("contactos"));
  baseDeDatos = contactosDelAlmacenamientoLocal || [];
};
contactosGet();

// --- Lógica leer contacto (Read) ---

const leerContactos = () => {
  // Limpia el contenido actual de la tabla para evitar duplicados
  $tabla.querySelector("tbody").innerHTML = "";

  baseDeDatos.forEach((el) => {
    const $clon = d.importNode($plantilla, true);

    $clon.querySelector(".nombre").textContent = el.nombre;
    $clon.querySelector(".telefono").textContent = el.telefono;
    $clon.querySelector(".correo").textContent = el.correo;

    // Agregando información de cada contacto en los botónes de acción como dataAttribute
    $clon.querySelector(".btn-editar").dataset.id = el.id;
    $clon.querySelector(".btn-eliminar").dataset.id = el.id;

    $fragmento.appendChild($clon);
  });

  $tabla.querySelector("tbody").appendChild($fragmento);
};

// --- Lógica editar contacto (Update) ---
const editarContacto = (e) => {
  if (e.target.matches(".btn-editar")) {
    console.log(e.target);

    $formulario.querySelector("h1").textContent = "Editar contacto";
    // Pasando a los inputs del formulario la información del contacto a editar que viene en un dataset.
    const ID = e.target.dataset.id;

    baseDeDatos.find((el) => {
      if (el.id === Number(ID)) {
        $formulario.nombre.value = el.nombre;
        $formulario.telefono.value = el.telefono;
        $formulario.correo.value = el.correo;
        $formulario.id.value = el.id;
      }
    });
  }
};

// --- Lógica eliminar contacto (Delete) ---
const eliminarContacto = (e) => {
  const ID = e.target.dataset.id;
  if (e.target.matches(".btn-eliminar")) {
    baseDeDatos = baseDeDatos.filter((el) => {
      if (el.id !== Number(ID)) {
        return el;
      }
    });
    contactosSet();
    leerContactos();
  }
};

// ===========================================
// Delegación de Eventos
// ===========================================
// --- "DOMContentLoaded" ---
d.addEventListener("DOMContentLoaded", leerContactos);

// --- "submit" (Interacción del Usuario) ---
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //Si el id oculto no tiene valor, vamos a crearContacto, de lo contrario editarContacto.
  const ID = e.target.elements.id.value;

  if (!ID) {
    crearContacto();
    contactosSet();
    leerContactos();
  } else {
    baseDeDatos = baseDeDatos.map((el) => {
      if (el.id === Number(ID)) {
        el.nombre = d.querySelector(".nombre").value;
        el.telefono = d.querySelector(".telefono").value;
        el.correo = d.querySelector(".correo").value;
      }
      return el;
    });

    contactosSet();
    leerContactos();
    $formulario.reset();
    $formulario.querySelector("h1").textContent = "Agregar contacto";
  }
});

// --- "click" (Interacción del Usuario) ---
document.addEventListener("click", (e) => {
  editarContacto(e);
  eliminarContacto(e);
});
