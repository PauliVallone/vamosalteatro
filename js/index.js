let bienvenida = prompt("Ingrese su nombre");
do {
  if (bienvenida == "") {
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
