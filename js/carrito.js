let obrasEnCarrito = localStorage.getItem("carrito");
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
                    <small>Obra:</small>
                    <h2>${obra.nombre}</h2>
                </div>
                <div class="carrito-obra-cantidad">
                    <small>Cantidad:</small>
                    <p>${obra.cantidad}</p>
                </div>
                <div class="carrito-obra-precio">
                    <small>Precio:</small>
                    <p>$ ${obra.precio}</p>
                </div>
                <div class="carrito-obra-subtotal">
                    <small>Subtotal:</small>
                    <p>$ ${obra.precio * obra.cantidad}</p>
                </div>
                <button class="carrito-obra-eliminar" data-id="${
                  obra.id
                }">Eliminar del carrito</button>
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
    boton.addEventListener("click", () => eliminarDelCarrito(boton.dataset.id));
  });
}

function eliminarDelCarrito(id) {
  obrasEnCarrito = obrasEnCarrito.filter((obra) => obra.id != parseInt(id));

  localStorage.setItem("carrito", JSON.stringify(obrasEnCarrito));

  cargarObrasCarrito();
  actualizarTotal();
}

botonesEliminar.forEach((boton) => {
  boton.addEventListener("click", () => eliminarDelCarrito(boton.id));
});

function actualizarTotal() {
  let total = 0;

  for (const obra of obrasEnCarrito) {
    const subtotal = obra.precio * obra.cantidad;
    total += subtotal;
  }

  contenedorTotal.textContent = `$${total.toFixed(2)}`;
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  obrasEnCarrito = [];
  localStorage.setItem("carrito", JSON.stringify(obrasEnCarrito));
  cargarObrasCarrito();
  actualizarTotal();
}

botonComprar.addEventListener("click", comprarAhora);

function comprarAhora() {
  vaciarCarrito();
  mensajeCompraExitosa();
}

function mensajeCompraExitosa() {
  Toastify({
    text: "Muchas gracias por su compra. ¡Nos vemos en la función!",
    duration: 4000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#b94a93",
    },
  }).showToast();
}
