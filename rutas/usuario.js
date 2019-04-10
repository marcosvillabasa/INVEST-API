const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

var Usuario = require('../modelos/usuario');

//Obtener Usuarios
app.get('/', (req, res, next) => {

    Usuario.find({}, 'name email')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: ' error en bd cargando usuarios',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            })


});

//crear usuarios
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        name: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: ' error al crear usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'usuario creado',
            usuario: usuarioGuardado
        });
    });


});


module.exports = app;