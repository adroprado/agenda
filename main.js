const d = document,
  $form = d.querySelector(".contact-form"),
  $table = d.querySelector(".contact-table"),
  $template = d.getElementById("contact-template").content,
  $fragment = d.createDocumentFragment(),
  ls = localStorage;

//evento submit - formulario
d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    // Capturando datos del formulario
    const contact = {
      key: Math.floor(Math.random() * 100) + 1,
      nombre: d.querySelector(".name").value,
      telefono: d.querySelector(".phone").value,
      correo: d.querySelector(".email").value,
    };

    // Almacenando datos en localStorage método setItem()
    const contactSet = (key, value) => {
      ls.setItem(key, JSON.stringify(value));

      // agregar el nuevo contacto al DOM.
      createContact(value);
      // vaciando los campos para ingresar un núevo dato
      $form.reset();
    };

    contactSet(contact.key, contact);
  }
});

// Obteniendo datos del localStorage método getItem()
const contactGet = () => {
  // Método key() de localStorage
  for (let i = 0; i < ls.length; i++) {
    // console.log(ls.getItem(ls.key(i)));
    let contacto = JSON.parse(ls.getItem(ls.key(i)));
    // console.log(contacto);
    createContact(contacto);
  }
};

// Crear contacto DOM
const createContact = (el) => {
  $template.querySelector(".name").textContent = el.nombre;
  $template.querySelector(".phone").textContent = el.telefono;
  $template.querySelector(".email").textContent = el.correo;
  $template.querySelector(".delete").dataset.key = el.key;

  let $clone = d.importNode($template, true);
  $fragment.appendChild($clone);

  $table.querySelector("tbody").appendChild($fragment);
};

contactGet();

//evento click btn-eliminar
d.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    //Eliminar elemento del DOM
    e.target.closest("tr").remove();
    //Eliminar elemento del localStorage
    ls.removeItem(e.target.dataset.key);
  }
});
