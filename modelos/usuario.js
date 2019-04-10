const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);