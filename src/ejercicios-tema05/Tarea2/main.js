let usuarios = [];

let opcion;

do {
    opcion = prompt(
        "1. Ver usuarios\n" +
        "2. Insertar usuario\n" +
        "3. Borrar usuario\n" +
        "4. Vaciar lista\n" +
        "5. Salir"
    );

    switch (opcion) {
        case "1":
            verUsuarios();
            break;

        case "2":
            insertarUsuario();
            break;

        case "3":
            borrarUsuario();
            break;

        case "4":
            usuarios = [];
            alert("Lista vaciada");
            break;

        case "5":
            alert("Fin del programa");
            break;

        default:
            alert("Opción no válida");
    }

} while (opcion !== "5");


function insertarUsuario() {
    let id = prompt("ID:");
    let nombre = prompt("Nombre:");
    let rol = prompt("Rol:");

    let usuario = {
        id: id,
        nombre: nombre,
        rol: rol
    };

    usuarios.push(usuario);
}

function borrarUsuario() {
    let id = prompt("Introduce el ID a borrar");

    let indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice !== -1) {
        usuarios.splice(indice, 1);
        alert("Usuario eliminado");
    } else {
        alert("Usuario no encontrado");
    }
}

function verUsuarios() {

    let mensaje = "ID | NOMBRE | ROL\n\n";

    for (let usuario of usuarios) {
        mensaje += usuario.id,usuario.nombre,usuario.rol ;
    }

    alert(mensaje);
}