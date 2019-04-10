// requires
const express = require('express');
var mongoose = require('mongoose');



//inicializar variables
const app = express();


//conexion a la bd
mongoose.connection.openUri('mongodb://localhost:27017/InvestDB', (err, res) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos online');
});

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion Get realizada correctamente'
    })
});


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000 online');
});