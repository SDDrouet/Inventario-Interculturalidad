const Producto = require('../model/productModel');

// Crear un producto
exports.createProduct = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).send(producto);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Obtener todos los productos
exports.getAllProductsUser = async (req, res) => {
    try {
        const id_usuario = req.params.idU;
        const productos = await Producto.find({ id_usuario: id_usuario });
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).send();
        }
        res.status(200).send(producto);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Actualizar un producto por ID
exports.updateProduct = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!producto) {
            return res.status(404).send();
        }
        res.status(200).send(producto);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Eliminar un producto por ID
exports.deleteProduct = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).send();
        }
        res.status(200).send(producto);
    } catch (error) {
        res.status(500).send(error);
    }
};