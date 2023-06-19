let bienvenida = prompt("Ingrese su nombre");
do {
  if (bienvenida !== "") {
    alert("Hola" + " " + bienvenida);
  } else {
    alert("Debe ingresar un nombre");
    bienvenida = prompt("Ingrese su nombre");
  }
} while (bienvenida == "");
alert("Hola" + " " + bienvenida);

const producto = (a, b) => a * b;
const costo = (x) => x * 1.1;
let costoEntrada = 3000;
let cantidadEntrada = Number(prompt("Ingrese cantidad de entradas"));
let costoTotal = producto(cantidadEntrada, costo(costoEntrada));
console.log("El costo total es de $" + costoTotal);
