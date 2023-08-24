
const express = require('express');
//variables de entorno
require('dotenv').config();
const { dbConnection } = require('./database/config')
const cors = require('cors');

//correr todos los procesos de node y del env
//console.log( process.env )


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio Público
//use en express es un middleware, una funcion que se ejecuta cuando alguien hace una peticion al servidor
app.use( express.static('public') ) 


//Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Areglando el problema de rutas en produccion, cualquier ruta no especificada va directamente al la ruta publica
app.use('*', (req, resp) => {
    resp.sendFile( __dirname + '/public/index.html' );
})



//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});