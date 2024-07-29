console.log("Si funciona");

const socket = io();

//Crear una variable para guardar el nombre del user

let user;
const chatBox = document.getElementById("chatBox");


// Utilizamos Sweet Alert para el mensaje de bienvenida
//Invocamos a swal, objeto global que nos permite usar los métodos de la libreria.
// Fire es un método que nos poermite configurar el alerta.

Swal.fire({
    title: "Indentificate",
    input:"text",
    text:"Ingresa un usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar";

    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
    
})

chatBox.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        if(chatBox.value.trim().length > 0) {
            // Trim saca los espacios en blanaco del inicio y del final de un string.
            socket.emit("message", {user: user, message: chatBox.value} );
            chatBox.value = "";

        }
    }
})


// Mostrar los mensajes en la pantalla del navegador

socket.on("logMessages", data => {
    const log = document.getElementById("logMessages")
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    });

    log.innerHTML = messages;

})