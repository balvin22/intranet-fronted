// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Define la URL de tu API de Backend
const API_URL = 'http://localhost:8001/api';

// 2. Crea el Contexto
const AuthContext = createContext();

// 3. Crea el "Proveedor" del contexto
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Carga el token desde localStorage

  // 4. Configura Axios AUTOMÁTICAMENTE
  // Esto se ejecuta cada vez que el 'token' cambia
  useEffect(() => {
    if (token) {
      // Guarda el token para futuras visitas
      localStorage.setItem('token', token);
      
      // ¡LA MAGIA! Añade el token a TODAS las cabeceras de Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Si no hay token, bórralo
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // 5. Función de Login: se llamará desde tu Login.jsx
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      // Guarda el token y los datos del usuario en el estado
      setToken(response.data.access_token);
      setUser(response.data.user);
      
      return response; // Devuelve la respuesta completa por si la necesitas
    } catch (error) {
      // Si falla, borra todo
      setToken(null);
      setUser(null);
      throw error; // Lanza el error para que el formulario de login lo muestre
    }
  };

  // 6. Función de Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // 7. Expone los valores al resto de la app
  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 8. Hook personalizado para consumir el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}