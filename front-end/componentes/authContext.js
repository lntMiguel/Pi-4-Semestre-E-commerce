'use client'
import { createContext, useContext, useEffect, useState } from "react";

// Criando o contexto
const AuthContext = createContext();

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// Provider para envolver a aplicação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [grupo, setGrupo] = useState(null); // Estado para armazenar a role

    // Carregar a role do sessionStorage ao iniciar a página
    useEffect(() => {
        const sessao = sessionStorage.getItem("grupoUsuario");
        if (sessao) {
            setRole(sessao);
        }
    }, []);

    // Função para fazer login e armazenar a role
    const login = (grupoUsuario) => {
        setGrupo(grupoUsuario);
        sessionStorage.setItem("grupoUsuario", grupoUsuario); // Salva na sessão
    };

    // Função para logout
    const logout = () => {
        setRole(null);
        sessionStorage.removeItem("grupoUsuario");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, grupo, setGrupo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
