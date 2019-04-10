const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

usuarioSchema.plugin(uniqueValidator, { message: 'el correo debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);