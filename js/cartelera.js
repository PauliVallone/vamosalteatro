import { obras } from "./obras.js";

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
    <p>Butacas disponibles: ${obra.stock}<p>
    <div class='card-footer'>
    <button  class='btn w-100 agregar-al-carrito' data-obra="${obra.nombre}">Agregar al carrito</button>
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
    carrito.push({ nombre: obra.nombre, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("agregar-al-carrito")) {
    const obraNombre = event.target.getAttribute("data-obra");
    const obra = obras.find((obra) => obra.nombre === obraNombre);

    if (obra) {
      agregarAlCarrito(obra);
      alert(`Se agregó "${obra.nombre}" al carrito`);
    }
  }
});

const producto = (a, b) => a * b;
const costo = (x) => x * 1.1;
let costoEntrada = 3000;
let cantidadEntrada = Number(prompt("Ingrese cantidad de entradas"));
let costoTotal = producto(cantidadEntrada, costo(costoEntrada));
console.log("El costo total es de $" + Math.round(costoTotal));

class Obra {
  constructor(nombre, precio, genero) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.genero = genero.toUpperCase();
  }

  sumarCosto() {
    this.precio = this.precio * 1.1;
  }
}
/*
const obras = [];
obras.push(new Obra("la desgracia", 3500, "comedia"));
obras.push(new Obra("bajo terapia", 2500, "comedia"));
obras.push(new Obra("¿estas ahi?", 2500, "drama"));

console.log(obras);

let resultado = obras.filter((el) => el.genero == "COMEDIA");

console.log(resultado);

obras.forEach((obra) => {
  obra.sumarCosto();
});
*/
