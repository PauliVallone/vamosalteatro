const producto = (a, b) => a * b;
const costo = (x) => x * 1.1;
const getObras = async () => {
  const respuesta = await fetch("../data/data.json");
  return await respuesta.json();
};

const obras = await getObras();

const listadoCartelera = document.getElementById("listadoCartelera");

const divRow = document.createElement("div");
divRow.classList.add("row", "w-100");

for (const obra of obras) {
  const divCard = document.createElement("div");
  divCard.classList.add("card", "col-4");
  divCard.innerHTML = `
    <div class='card-body card-color'>
    <img src="${obra.imagen}" class='card-img-top' alt="${obra.nombre}" />
    <h3>Nombre: ${obra.nombre}<h3>
    <h3>Genero: ${obra.genero}<h3>
    <p>Precio: $ ${obra.precio}<p>
        <div class='card-footer'>
    <button  class='btn w-100 agregar-al-carrito' data-obra="${obra.nombre}" data-precio="${obra.precio}">Agregar al carrito</button>
    </div>
    </div>
`;
  divRow.appendChild(divCard);
}
listadoCartelera.appendChild(divRow);

function agregarAlCarrito(obra) {
  let carrito = localStorage.getItem("carrito");
  if (!carrito) {
    carrito = [];
  } else {
    carrito = JSON.parse(carrito);
  }

  const obraEnCarrito = carrito.find((item) => item.nombre === obra.nombre);

  if (obraEnCarrito) {
    obraEnCarrito.cantidad++;
  } else {
    let cantidadEntrada = Number(prompt("Ingrese cantidad de entradas"));

    let costoTotal = producto(cantidadEntrada, costo(obra.precio));

    obra.cantidad = cantidadEntrada;

    carrito.push(obra);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("agregar-al-carrito")) {
    const obraNombre = event.target.getAttribute("data-obra");
    const obraPrecio = parseFloat(event.target.getAttribute("data-precio"));

    const obra = obras.find((obra) => obra.nombre === obraNombre);

    if (obra) {
      agregarAlCarrito(obra);
      Toastify({
        text: `Se agregó "${obra.nombre}" al carrito. Toca para ir al carrito`,
        duration: 4000,
        destination: "../pages/carrito.html",
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#b94a93",
        },
      }).showToast();
    }
  }
});
