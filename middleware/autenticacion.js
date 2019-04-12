const express = require('express');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Usuario = require('../modelos/usuario');
var SEED = require('../config/config').SEED;

exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'token incorrecto',
                errors: err
            });
        }


        req.usuario = decoded.usuario;
        next();


    });
}