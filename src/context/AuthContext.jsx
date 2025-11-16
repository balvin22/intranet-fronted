import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Define la URL de tu API de Backend
const API_URL = 'http://localhost:8001/api';

// 2. Crea el Contexto
const AuthContext = createContext();

// 3. Crea el "Proveedor" del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 4. 👇 ¡ESTE ES EL HOOK CORREGIDO! 👇
  // Este hook se ejecutará cada vez que la app cargue, o cuando el 'token' cambie.
  useEffect(() => {
    
    // Función interna para cargar los datos del usuario
    const fetchUser = async () => {
      try {
        // 3. Con el token, pedimos los datos del usuario a la ruta /me
        // (Axios ya tiene el token gracias a la línea de abajo)
        const response = await axios.get(`${API_URL}/me`);
        
        // 4. ¡Guardamos los datos del usuario en el estado!
        setUser(response.data); 
        
      } catch (error) {
        // 5. Si el token es inválido (ej. 401) o expiró, borramos todo
        console.error("Token inválido o expirado. Cerrando sesión.", error);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    };

    if (token) {
      // 1. Si hay un token, lo guardamos en localStorage
      localStorage.setItem('token', token);
      
      // 2. ¡LA MAGIA! Lo ponemos en las cabeceras de Axios para FUTURAS peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // E intentamos cargar los datos del usuario
      fetchUser();
      
    } else {
      // 6. Si NO hay token, nos aseguramos de que todo esté limpio
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      // No llamamos setUser(null) aquí para evitar renders en cascada
    }
  }, [token]); // 👈 Este hook se dispara cada vez que el 'token' cambia

  // Limpia el usuario si no hay token
  // (El efecto principal ya maneja la limpieza del usuario, así que este efecto es redundante y puede eliminarse)

  // 5. Función de Login: (Esta ya la teníamos, está perfecta)
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      // Guarda el token y los datos del usuario en el estado
      // ESTO DISPARARÁ el useEffect de arriba, pero está bien.
      setToken(response.data.access_token);
      setUser(response.data.user);
      
      return response; 
    } catch (error) {
      setToken(null);
      setUser(null);
      throw error;
    }
  };

  // 6. Función de Logout (Ahora limpia el token y el usuario)
  const logout = () => {
    setToken(null);
    setUser(null); // Esto también dispara el useEffect y limpia todo
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

// 8. Hook personalizado (sin cambios)
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}