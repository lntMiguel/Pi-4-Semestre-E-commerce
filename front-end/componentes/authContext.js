"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [dados, setDados] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [frete, setFrete] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito 1: Carregamento inicial do localStorage (roda apenas uma vez no mount)
  useEffect(() => {
    console.log("AuthContext [Mount]: Iniciando carregamento do localStorage.");
    setIsLoading(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("AuthContext [Mount]: Usuário carregado do localStorage:", parsedUser);
        // Define user, e os useEffects abaixo lidarão com grupo e dados derivados
        setUser(parsedUser);
        // Não defina setGrupo e setDados aqui diretamente, deixe o useEffect que observa 'user' fazer isso
      } catch (error) {
        console.error("AuthContext [Mount]: Falha ao parsear usuário do localStorage:", error);
        localStorage.removeItem("user");
        setUser(null); // Garante limpeza
      }
    } else {
      console.log("AuthContext [Mount]: Nenhum usuário no localStorage.");
      setUser(null); // Garante que user é null se não houver nada
    }

    // Carregar carrinho
    const storedCarrinho = localStorage.getItem("carrinho");
    if (storedCarrinho) { try { setCarrinho(JSON.parse(storedCarrinho)); } catch (e) { console.error("AuthContext: Erro ao carregar carrinho", e); localStorage.removeItem("carrinho");} }
    else { setCarrinho([]); }

    // Carregar frete
    const storedFrete = localStorage.getItem("frete");
    if (storedFrete) { try { setFrete(JSON.parse(storedFrete)); } catch (e) { console.error("AuthContext: Erro ao carregar frete", e);}}
    else { setFrete(""); }

    // Carregar valorFrete
    const storedValorFrete = localStorage.getItem("valorFrete");
    if (storedValorFrete) { try { setValorFrete(JSON.parse(storedValorFrete)); } catch (e) { console.error("AuthContext: Erro ao carregar valorFrete", e);}}
    else { setValorFrete(0); }

    setIsLoading(false);
    console.log("AuthContext [Mount]: Carregamento do localStorage concluído.");
  }, []); // Dependência vazia para rodar apenas no mount


  // Efeito 2: Reage a mudanças no estado 'user' (seja por login, logout, ou carregamento inicial)
  // Este efeito agora é a ÚNICA fonte da verdade para derivar 'grupo' e 'dados' de 'user',
  // e para salvar 'user' no localStorage.
  useEffect(() => {
    // Não faz nada se ainda estiver no carregamento inicial do contexto (Efeito 1)
    if (isLoading) {
      console.log("AuthContext [user-effect]: Aguardando carregamento inicial.");
      return;
    }

    console.log("AuthContext [user-effect]: Estado 'user' mudou ou carregamento inicial terminou. User atual:", user);

    if (user) {
      // Define grupo e dados com base no objeto 'user' atual
      const currentGrupo = user.grupo || null;
      let currentDados = null;
      if (user.dados) { // Para clientes com objeto 'dados'
        currentDados = user.dados;
      } else if (user.nome && typeof user.nome === 'string') { // Para clientes com 'nome' no nível superior
        currentDados = { nome: user.nome };
      }
      // Se for funcionário ({grupo, message}), 'dados' permanecerá null, o que está correto.

      setGrupo(currentGrupo);
      setDados(currentDados);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("AuthContext [user-effect]: 'user' salvo no localStorage. Grupo:", currentGrupo, "Dados:", currentDados);
    } else {
      // User é null (logout ou nenhum usuário encontrado inicialmente)
      setGrupo(null);
      setDados(null);
      localStorage.removeItem("user");
      console.log("AuthContext [user-effect]: 'user' é null. Grupo e Dados definidos como null. Removido do localStorage.");
    }
  }, [user, isLoading]); // Depende de 'user' e 'isLoading'


  // Efeitos para persistir outros estados (carrinho, frete)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  }, [carrinho, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("frete", JSON.stringify(frete));
      localStorage.setItem("valorFrete", JSON.stringify(valorFrete));
    }
  }, [frete, valorFrete, isLoading]);


  const handleLogout = () => {
    console.log("AuthContext: Executando handleLogout...");
    // ... (sua lógica de logout, que parece ok) ...
    const currentCarrinho = carrinho;
    localStorage.setItem('carrinho_guest', JSON.stringify(currentCarrinho || []));
    localStorage.removeItem("user"); // O useEffect acima também faria isso, mas é bom ser explícito.
    localStorage.removeItem("frete");
    localStorage.removeItem("valorFrete");
    setUser(null); // Isso vai disparar o useEffect acima para limpar grupo, dados e localStorage.
    setCarrinho([]);
    setFrete("");
    setValorFrete(0);
    if (typeof window !== "undefined") {
        window.location.reload();
    }
  };

  if (isLoading) {
    console.log("AuthContext [Render]: isLoading é true, retornando null.");
    return null;
  }

  console.log("AuthContext [Render]: Renderizando Provider. User:", user, "Grupo:", grupo, "Dados:", dados, "isLoading:", isLoading);
  return (
    <AuthContext.Provider value={{
      user, setUser,
      grupo, // grupo é derivado, não precisa de setGrupo exposto se toda lógica estiver aqui
      dados, // dados é derivado, não precisa de setDados exposto
      // Se você precisar que LoginFun (ou outro) defina grupo/dados diretamente,
      // precisaria de setGrupo e setDados aqui e ajustar o useEffect [user, isLoading]
      // Mas é melhor ter uma única fonte da verdade (o objeto user).
      // Para simplificar e manter a lógica atual de LoginFun:
      setGrupo, // MANTENDO setGrupo e setDados expostos por enquanto
      setDados, // MANTENDO setGrupo e setDados expostos por enquanto
      carrinho, setCarrinho,
      frete, setFrete,
      valorFrete, setValorFrete,
      isLoading,
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}