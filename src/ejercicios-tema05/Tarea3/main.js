// Clase padre
class Empleado {
    nombre;
    apellido;
    edad; // atributo privado

    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    muestra() {
        return `Nombre: ${this.nombre} ${this.apellido}\nEdad: ${this.#edad}`;
    }
}

// Clase hija
class Profesor extends Empleado {
    constructor(nombre, apellido, edad, cargo) {
        super(nombre, apellido, edad);
        this.cargo = cargo;
    }

    muestraCargo() {
        return `Cargo: ${this.cargo}`;
    }
}

// Instanciación del objeto Profesor
const profesor1 = new Profesor(
    "Juan",
    "Pérez",
    40,
    "Profesor de Desarrollo Web"
);

// Mostrar los datos en una ventana emergente
alert(
    profesor1.muestra() + "\n" +
    profesor1.muestraCargo()
);