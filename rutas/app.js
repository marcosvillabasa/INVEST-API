const express = require('express');
const app = express();
const router = express.Router();

app.get('/', (req, res, next) => {


    res.status(200).json({
        ok: true,
        mensaje: 'Peticion Get realizada correctamente'
    });

});


module.exports = app;