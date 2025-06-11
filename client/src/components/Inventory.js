import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchProductsAPI, addProductAPI, updateProductAPI, deleteProductAPI } from '../api/productosAPI';

function Inventory() {
  const { token, userId, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: '', cantidad: 0, precio: 0 });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const data = await fetchProductsAPI(token, userId);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e, isNewProduct = true) => {
    const { name, value } = e.target;
    if (isNewProduct) {
      setNewProduct({ ...newProduct, [name]: value });
    } else {
      setEditingProduct({ ...editingProduct, [name]: value });
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const success = await addProductAPI(token, userId, newProduct);
    if (success) {
      fetchProducts();
      setNewProduct({ nombre: '', cantidad: 0, precio: 0 });
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const success = await updateProductAPI(token, editingProduct);
    if (success) {
      fetchProducts();
      setEditingProduct(null);
    }
  };

  const deleteProduct = async (id) => {
    const success = await deleteProductAPI(token, id);
    if (success) {
      fetchProducts();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
      
      {/* Formulario para añadir nuevo producto */}
      <form onSubmit={addProduct} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <input
            type="text"
            name="nombre"
            value={newProduct.nombre}
            onChange={handleInputChange}
            placeholder="Nombre del producto"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="cantidad"
            value={newProduct.cantidad}
            onChange={handleInputChange}
            placeholder="Cantidad"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="precio"
            value={newProduct.precio}
            onChange={handleInputChange}
            placeholder="Precio"
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Añadir Producto
        </button>
      </form>

      {/* Lista de productos */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
        <ul>
          {products.map(product => (
            <li key={product._id} className="mb-4 p-4 border-b">
              {editingProduct && editingProduct._id === product._id ? (
                <form onSubmit={updateProduct}>
                  <input
                    type="text"
                    name="nombre"
                    value={editingProduct.nombre}
                    onChange={(e) => handleInputChange(e, false)}
                    className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                    type="number"
                    name="cantidad"
                    value={editingProduct.cantidad}
                    onChange={(e) => handleInputChange(e, false)}
                    className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                    type="number"
                    name="precio"
                    value={editingProduct.precio}
                    onChange={(e) => handleInputChange(e, false)}
                    step="0.01"
                    className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Guardar
                  </button>
                  <button onClick={() => setEditingProduct(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <p><strong>Nombre:</strong> {product.nombre}</p>
                  <p><strong>Cantidad:</strong> {product.cantidad}</p>
                  <p><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
                  <button onClick={() => startEditing(product)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2 mt-2">
                    Editar
                  </button>
                  <button onClick={() => deleteProduct(product._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={logout} className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Inventory;
