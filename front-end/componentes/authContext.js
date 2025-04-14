"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [dados, setDados] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marca que estamos no cliente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setGrupo(parsedUser.grupo);
      setDados(parsedUser.dados)
    }
  }, []);

  if (!isClient) {
    return null; // Retorna nada até que o cliente esteja pronto
  }

  return (
    <AuthContext.Provider value={{ user, setUser, grupo, setGrupo, dados, setDados }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
