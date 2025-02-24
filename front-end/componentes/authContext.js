import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [isClient, setIsClient] = useState(false); // Estado para verificar se está no cliente

  useEffect(() => {
    setIsClient(true); // Atualiza para indicar que o código está sendo executado no cliente

    // Acessa o localStorage apenas no cliente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setGrupo(parsedUser.grupo);
    }
  }, []);

  // Se ainda não estiver no cliente, retorna null para evitar erros na renderização do servidor
  if (!isClient) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, grupo, setGrupo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
