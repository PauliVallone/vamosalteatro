let bienvenida = prompt("Ingrese su nombre");
do {
  if (bienvenida == "") {
    alert("Debe ingresar un nombre");
    bienvenida = prompt("Ingrese su nombre");
  }
} while (bienvenida == "");
alert("Hola" + " " + bienvenida);
