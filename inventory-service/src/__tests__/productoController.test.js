const productoController = require('../controllers/productController');
const Producto = require('../model/productModel');

jest.mock('../model/productModel');

describe('Producto Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('debería crear un producto y retornar 201', async () => {
            const savedProduct = { nombre: 'Producto A', cantidad: 5, precio: 100, id_usuario: '123' };

            // Mock del constructor y del método save
            const saveMock = jest.fn().mockResolvedValue(savedProduct);
            Producto.mockImplementation(() => ({
                save: saveMock
            }));

            req.body = savedProduct;

            await productoController.createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });


        it('debería manejar errores y retornar 400', async () => {
            Producto.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Error'))
            }));

            await productoController.createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('getAllProductsUser', () => {
        it('debería retornar los productos de un usuario', async () => {
            req.params.idU = '123';
            const mockProductos = [{ nombre: 'Producto1' }];
            Producto.find.mockResolvedValue(mockProductos);

            await productoController.getAllProductsUser(req, res);

            expect(Producto.find).toHaveBeenCalledWith({ id_usuario: '123' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockProductos);
        });

        it('debería manejar errores y retornar 500', async () => {
            Producto.find.mockRejectedValue(new Error('DB error'));

            await productoController.getAllProductsUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('getProductById', () => {
        it('debería retornar un producto por ID', async () => {
            req.params.id = '1';
            const producto = { nombre: 'Producto X' };
            Producto.findById.mockResolvedValue(producto);

            await productoController.getProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(producto);
        });

        it('debería retornar 404 si no se encuentra', async () => {
            req.params.id = '1';
            Producto.findById.mockResolvedValue(null);

            await productoController.getProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('debería retornar 500 si hay error', async () => {
            Producto.findById.mockRejectedValue(new Error('Error'));

            await productoController.getProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('updateProduct', () => {
        it('debería actualizar un producto', async () => {
            req.params.id = '1';
            req.body = { nombre: 'Producto Actualizado' };
            Producto.findByIdAndUpdate.mockResolvedValue(req.body);

            await productoController.updateProduct(req, res);

            expect(Producto.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true, runValidators: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(req.body);
        });

        it('debería retornar 404 si no existe', async () => {
            Producto.findByIdAndUpdate.mockResolvedValue(null);

            await productoController.updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('debería retornar 400 si hay error', async () => {
            Producto.findByIdAndUpdate.mockRejectedValue(new Error('Error'));

            await productoController.updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('deleteProduct', () => {
        it('debería eliminar un producto', async () => {
            req.params.id = '1';
            const mockProducto = { nombre: 'Producto eliminado' };
            Producto.findByIdAndDelete.mockResolvedValue(mockProducto);

            await productoController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockProducto);
        });

        it('debería retornar 404 si no se encuentra', async () => {
            Producto.findByIdAndDelete.mockResolvedValue(null);

            await productoController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('debería retornar 500 si hay error', async () => {
            Producto.findByIdAndDelete.mockRejectedValue(new Error('Error'));

            await productoController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});
