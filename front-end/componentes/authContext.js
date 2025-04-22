"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [dados, setDados] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [frete, setFrete] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  
  useEffect(() => {
    setIsClient(true); // Marca que estamos no cliente
  
    // Recupera carrinho do localStorage
    const storedCarrinho = localStorage.getItem("carrinho");
    if (storedCarrinho) {
      setCarrinho(JSON.parse(storedCarrinho));
    } else {
      setCarrinho([]); // inicia vazio se não tiver nada salvo
    }

    const storedFrete = localStorage.getItem("frete");
    if(storedFrete){
      setFrete(JSON.parse(storedFrete));
    } else{
      setFrete("");
    }
    console.log(storedFrete);

    const storedValorFrete = localStorage.getItem("valorFrete");
    if(storedValorFrete){
      setValorFrete(JSON.parse(storedValorFrete));
    } else{
      setFrete(0);
    }
    console.log(storedValorFrete);
  
    // Recupera usuário do localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setGrupo(parsedUser.grupo);
      setDados(parsedUser.dados);
  
      console.log(parsedUser.dados);
    }
  }, []);
  
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  }, [carrinho, isClient]);

  

  if (!isClient) {
    return null; // Retorna nada até que o cliente esteja pronto
  }

  return (
    <AuthContext.Provider value={{ user, setUser, grupo, setGrupo, dados, setDados, carrinho, setCarrinho, frete,setFrete, valorFrete,setValorFrete}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
