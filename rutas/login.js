const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

var Usuario = require('../modelos/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: ' error al buscar un usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                mensaje: 'credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(500).json({
                ok: false,
                mensaje: 'credenciales incorrectas - pass',
                errors: err
            });
        }

        //token

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id
        });

    });

});

module.exports = app;