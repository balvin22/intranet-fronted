import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// 1. Define la URL de tu API de Backend
const API_URL = "http://localhost:8001/api";
axios.defaults.baseURL = API_URL;

// 2. Crea el Contexto
const AuthContext = createContext();

// 3. Crea el "Proveedor" del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 4. 👇 ¡ESTE ES EL HOOK CORREGIDO! 👇
  // Este hook se ejecutará cada vez que la app cargue, o cuando el 'token' cambie.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 3. Ahora solo necesitas llamar a '/me', no a la URL completa
        const response = await axios.get("/me");
        setUser(response.data);
      } catch (error) {
        console.error("Token inválido o expirado. Cerrando sesión.", error);
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    };

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      // setUser(null) removed to avoid cascading renders
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // 4. Ahora solo necesitas llamar a '/users/login'
      const response = await axios.post("/users/login", {
        email,
        password,
      });

      setToken(response.data.access_token);
      setUser(response.data.user);
      return response;
    } catch (error) {
      setToken(null);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 8. Hook personalizado (sin cambios)
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
