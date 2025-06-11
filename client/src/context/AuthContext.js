import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    return { token, username, userId };
  });

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('username', auth.username);
      localStorage.setItem('userId', auth.userId);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
  }, [auth]);

  const login = async (username, password) => {
    const response = await fetch('http://localhost:3120/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Error en el inicio de sesión');
    }

    const data = await response.json();
    setAuth({
      token: data.token,
      username: data.username,
      userId: data._id
    });
  };

  const register = async (username, password) => {
    const response = await fetch('http://localhost:3120/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Error en el registro');
    }

    // Aquí puedes manejar la respuesta del registro si es necesario
    // Normalmente, después del registro exitoso, redirigirías al usuario a la página de inicio de sesión
  };

  const logout = () => {
    setAuth({ token: null, username: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};