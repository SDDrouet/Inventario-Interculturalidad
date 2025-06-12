const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    id_usuario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Producto', productoSchema);
