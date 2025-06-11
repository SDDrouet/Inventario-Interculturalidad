export const fetchProductsAPI = async (token, userId) => {
    try {
      const response = await fetch(`http://localhost:3121/api/productos/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error al obtener productos');
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  
  export const addProductAPI = async (token, userId, newProduct) => {
    try {
      const response = await fetch('http://localhost:3121/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newProduct, id_usuario: userId })
      });
      if (response.ok) {
        return true;
      } else {
        console.error('Error al añadir producto');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  
  export const updateProductAPI = async (token, editingProduct) => {
    try {
      const response = await fetch(`http://localhost:3121/api/productos/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingProduct)
      });
      if (response.ok) {
        return true;
      } else {
        console.error('Error al actualizar producto');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  
  export const deleteProductAPI = async (token, id) => {
    try {
      const response = await fetch(`http://localhost:3121/api/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        return true;
      } else {
        console.error('Error al eliminar producto');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  