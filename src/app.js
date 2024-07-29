/* CHAT COMUNITARIO 

    Realizado con Express, Express-Handlebars, Websocket

*/

import express from "express";
import { engine } from "express-handlebars"; 
import { Server } from "socket.io";

const app = express();
const PORT = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Config Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

// Routes

app.get("/", (req, res) => {
    res.render("index");

});







//Listener
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});

/* Socket.io  */

// Creamos un array para el shitorial de mensajes

let messages = [];
// Guardamos una referencia del servidor.
// Generamos una instancia de socket.io del lado del backend.

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", (data) => {
        messages.push(data);

        // Emitimos mensaje al cliente ocn el array de datos
        io.emit("logMessages", messages)
    })

    
})




