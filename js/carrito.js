let obrasEnCarrito = localStorage.getItem("obras-en-carrito");
obrasEnCarrito = JSON.parse(obrasEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoObras = document.querySelector("#carrito-obras");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-obras-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarObrasCarrito() {
  if (obrasEnCarrito && obrasEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoObras.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoObras.innerHTML = "";

    obrasEnCarrito.forEach((obra) => {
      const div = document.createElement("div");
      div.classList.add("carrito-obra");
      div.innerHTML = `
                
                <div class="carrito-obra-titulo">
                    <small>Título</small>
                    <h3>${obra.titulo}</h3>
                </div>
                <div class="carrito-obra-cantidad">
                    <small>Cantidad</small>
                    <p>${obra.cantidad}</p>
                </div>
                <div class="carrito-obra-precio">
                    <small>Precio</small>
                    <p>$${obra.precio}</p>
                </div>
                <div class="carrito-obra-subtotal">
                    <small>Subtotal</small>
                    <p>$${obra.precio * obra.cantidad}</p>
                </div>
                <button class="carrito-obra-eliminar" id="${obra.id}"></button>
            `;

      contenedorCarritoObras.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTotal();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoObras.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
}

cargarObrasCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-obra-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}
