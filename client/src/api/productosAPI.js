// api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3121/api';

async function request(path, { method = 'GET', body = null, token } = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = { };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(
      payload?.message ||
      `Error ${response.status}: ${response.statusText}`
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

// productosAPI.js
export const fetchProductsAPI = (token, userId) =>
  request(`/productos/${userId}`, { token });

export const addProductAPI = (token, userId, newProduct) =>
  request('/productos', {
    method: 'POST',
    token,
    body: { ...newProduct, id_usuario: userId },
  });

export const updateProductAPI = (token, { _id, ...product }) =>
  request(`/productos/${_id}`, {
    method: 'PUT',
    token,
    body: product,
  });

export const deleteProductAPI = (token, id) =>
  request(`/productos/${id}`, { method: 'DELETE', token });
