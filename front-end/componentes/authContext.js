"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();
const API_URL = "http://localhost:8081";

export function AuthProvider({ children }) {
   const [user, setUser] = useState(undefined);
  const [grupo, setGrupo] = useState(null);
  const [dados, setDados] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [frete, setFrete] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const router = useRouter();

  // --- Funções API (useCallback como você já tem) ---
  const fetchCarrinhoAPI = useCallback(async (idCliente) => {
    // Sua implementação existente
    if (!idCliente) return { itens: [], valorTotal: 0 };
    try {
      const response = await fetch(`${API_URL}/carrinho/${idCliente}`);
      if (!response.ok) {
        if (response.status === 404) return { itens: [], valorTotal: 0 };
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
        throw new Error(`API Erro (fetchCarrinho): ${response.statusText} - ${errorData.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error("AuthContext: Erro fetchCarrinhoAPI:", error);
      return { itens: [], valorTotal: 0 }; // Retorna um carrinho vazio em caso de erro
    }
  }, []);

  const addItemToCarrinhoAPI = useCallback(async (idCliente, idProduto, quantidade) => {
    // Sua implementação existente
    if (!idCliente) throw new Error("ID Cliente ausente (addItemToCarrinhoAPI)");
    try {
      const response = await fetch(`${API_URL}/carrinho/${idCliente}/itens`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idProduto, quantidade }), // Backend espera idProduto e quantidade
      });
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
         throw new Error(`Erro ao adicionar item na API: ${response.statusText} - ${errorData.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error("AuthContext: Erro ao adicionar item na API:", error);
      throw error;
    }
  }, []);

  // ... (updateItemQuantityAPI, removeItemFromCarrinhoAPI, clearCarrinhoAPI permanecem os mesmos) ...
  const updateItemQuantityAPI = useCallback(async (idCliente, idProduto, quantidade) => {
    if (!idCliente) throw new Error("ID do cliente ausente para atualizar quantidade (API).");
    try {
      const response = await fetch(`${API_URL}/carrinho/${idCliente}/itens/${idProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade }),
      });
       if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
         throw new Error(`Erro ao atualizar item na API: ${response.statusText} - ${errorData.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error("AuthContext: Erro ao atualizar item na API:", error);
      throw error;
    }
  }, []);

  const removeItemFromCarrinhoAPI = useCallback(async (idCliente, idProduto) => {
    if (!idCliente) throw new Error("ID do cliente ausente para remover item (API).");
    try {
      const response = await fetch(`${API_URL}/carrinho/${idCliente}/itens/${idProduto}`, {
        method: "DELETE",
      });
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
         throw new Error(`Erro ao remover item da API: ${response.statusText} - ${errorData.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error("AuthContext: Erro ao remover item da API:", error);
      throw error;
    }
  }, []);

  const clearCarrinhoAPI = useCallback(async (idCliente) => {
    if (!idCliente) throw new Error("ID do cliente ausente para limpar carrinho (API).");
    try {
      const response = await fetch(`${API_URL}/carrinho/${idCliente}`, {
        method: "DELETE",
      });
       if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
         throw new Error(`Erro ao limpar carrinho na API: ${response.statusText} - ${errorData.message}`);
      }
      return await response.json(); // Retorna o carrinho limpo (geralmente vazio)
    } catch (error) {
      console.error("AuthContext: Erro ao limpar carrinho na API:", error);
      throw error;
    }
  }, []);

   const updateUserDataInContext = useCallback((novosDadosCliente) => {
    setUser(currentUser => {
      if (currentUser && currentUser.dados) { // Se for um cliente
        const updatedUserObject = {
          ...currentUser,
          dados: {
            ...currentUser.dados, // Mantém outros dados do cliente
            ...novosDadosCliente  // Sobrescreve com os novos dados (nome, dataNasc, genero)
          }
        };
        localStorage.setItem("user", JSON.stringify(updatedUserObject)); // Atualiza localStorage
        return updatedUserObject;
      }
      return currentUser; // Retorna o usuário inalterado se não for cliente ou não houver dados
    });
    // O useEffect que observa 'user' irá então atualizar o estado 'dados' automaticamente.
  }, []); // Sem dependências se não usar nada do escopo externo que mude

  // Efeito 1: Carregar usuário do localStorage (seu código original)
  useEffect(() => {
    console.log("AuthContext [Efeito 1 - Mount]: Lendo 'user' do localStorage.");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("AuthContext [Efeito 1 - Mount]: Falha ao parsear 'user', limpando.");
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    // Carregar frete
    const storedFrete = localStorage.getItem("frete");
    if (storedFrete) { try { setFrete(JSON.parse(storedFrete)); } catch(e){console.error("Erro ao parsear frete do localStorage",e)} }
    const storedValorFrete = localStorage.getItem("valorFrete");
    if (storedValorFrete) { try { setValorFrete(JSON.parse(storedValorFrete)); } catch(e){console.error("Erro ao parsear valorFrete do localStorage",e)} }
  }, []);


  // Efeito 2: Processar o estado 'user' e SINCRONIZAR CARRINHO
  useEffect(() => {
    if (user === undefined) {
      console.log("AuthContext [Efeito 2 - User Processing]: 'user' ainda é undefined, aguardando Efeito 1.");
      return;
    }

    console.log("AuthContext [Efeito 2 - User Processing]: Iniciando processamento para 'user':", user);
    setIsLoading(true); // Inicia loading geral, pois afeta tudo
    setIsCartLoading(true); // Inicia loading do carrinho

    const processUserAndCart = async () => {
      let finalUser = null;
      let finalDados = null;
      let finalGrupo = null;
      let finalCarrinhoItens = []; // Renomeado para clareza

      const isClientStructure = user && user.dados && user.dados.id;
      const isEmployeeStructure = user && user.grupo;

      if (isClientStructure) {
        console.log("AuthContext [Efeito 2 - User Processing]: Usuário é CLIENTE:", user.dados.id);
        finalUser = user;
        finalDados = user.dados;
        finalGrupo = null;
        localStorage.setItem("user", JSON.stringify(finalUser));

        // ---- INÍCIO DA SINCRONIZAÇÃO DO CARRINHO DE CONVIDADO ----
        const guestCarrinhoRaw = localStorage.getItem("carrinho_guest");
        if (guestCarrinhoRaw) {
          try {
            const guestCarrinhoItens = JSON.parse(guestCarrinhoRaw);
            if (Array.isArray(guestCarrinhoItens) && guestCarrinhoItens.length > 0) {
              console.log("AuthContext [Efeito 2 - User Processing]: Sincronizando carrinho de convidado para cliente...");
              for (const item of guestCarrinhoItens) {
                // O carrinho de convidado salvo tem { idProduto, quantidade, ... }
                if (item && item.idProduto && typeof item.quantidade === 'number' && item.quantidade > 0) {
                  try {
                    console.log(`  Adicionando item ${item.idProduto} (qtd: ${item.quantidade}) do convidado à API para cliente ${finalDados.id}.`);
                    await addItemToCarrinhoAPI(finalDados.id, item.idProduto, item.quantidade);
                  } catch (apiError) {
                    console.error(`  Falha ao adicionar item ${item.idProduto} do convidado à API:`, apiError);
                    // Decidir como lidar com falhas parciais. Por enquanto, continua.
                  }
                }
              }
              localStorage.removeItem("carrinho_guest"); // Limpa após tentativa de sincronização
              console.log("AuthContext [Efeito 2 - User Processing]: Carrinho de convidado processado e removido do localStorage.");
            } else {
              localStorage.removeItem("carrinho_guest"); // Remove se vazio ou malformado
            }
          } catch (parseError) {
            console.error("AuthContext [Efeito 2 - User Processing]: Erro ao parsear carrinho de convidado:", parseError);
            localStorage.removeItem("carrinho_guest"); // Remove em caso de erro de parse
          }
        }
        // ---- FIM DA SINCRONIZAÇÃO ----

        // Após a sincronização (se houve), busca o carrinho ATUALIZADO da API
        const apiCarrinhoData = await fetchCarrinhoAPI(finalDados.id);
        finalCarrinhoItens = apiCarrinhoData.itens || [];

      } else if (isEmployeeStructure) {
        console.log("AuthContext [Efeito 2 - User Processing]: Usuário é FUNCIONÁRIO:", user.grupo);
        finalUser = user;
        finalDados = null;
        finalGrupo = user.grupo;
        localStorage.setItem("user", JSON.stringify(finalUser));
        finalCarrinhoItens = []; // Funcionário não tem carrinho de compras
        localStorage.removeItem("carrinho_guest"); // Garante que não haja carrinho de convidado para funcionário

      } else { // Tratar como CONVIDADO (user é null ou estrutura inválida)
        console.log("AuthContext [Efeito 2 - User Processing]: Usuário é CONVIDADO ou estrutura inválida.");
        finalUser = null;
        finalDados = null;
        finalGrupo = null;
        localStorage.removeItem("user");
        const storedGuestCarrinho = localStorage.getItem("carrinho_guest");
        if (storedGuestCarrinho) {
          try {
            const parsedGuestCarrinho = JSON.parse(storedGuestCarrinho);
            if (Array.isArray(parsedGuestCarrinho)) {
                finalCarrinhoItens = parsedGuestCarrinho;
            } else {
                console.warn("AuthContext [Efeito 2 - User Processing]: 'carrinho_guest' não é um array, resetando.");
                localStorage.removeItem("carrinho_guest");
            }
          }
          catch (e) {
            console.error("AuthContext [Efeito 2 - User Processing]: Erro ao parsear 'carrinho_guest' para convidado, resetando.", e);
            localStorage.removeItem("carrinho_guest");
          }
        }
      }

      // setUser(finalUser); // CUIDADO: Apenas se finalUser for realmente diferente de user (ex: nullificado)
      // Se 'user' é a fonte da verdade para este efeito, e finalUser é derivado,
      // evite chamar setUser(finalUser) se finalUser for o mesmo objeto que user,
      // para não causar loop. O setUser(null) no logout é o que dispara a mudança correta.
      if (user !== finalUser) { // Apenas atualiza 'user' se ele mudou (ex: de objeto para null)
          setUser(finalUser);
      }

      setDados(finalDados);
      setGrupo(finalGrupo);
      setCarrinho(finalCarrinhoItens); // Atualiza o estado do carrinho
      setIsCartLoading(false);
      setIsLoading(false);
      console.log("AuthContext [Efeito 2 - User Processing]: Processamento concluído. isLoading: false");
    };

    processUserAndCart();

  }, [user, fetchCarrinhoAPI, addItemToCarrinhoAPI]); // Adicione as dependências usadas

  // Efeito para persistir frete (seu código original)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("frete", JSON.stringify(frete));
      localStorage.setItem("valorFrete", JSON.stringify(valorFrete));
    }
  }, [frete, valorFrete, isLoading]);


  // --- Funções de Manipulação do Carrinho ---
  const adicionarAoCarrinho = useCallback(async (produto, quantidade) => {
    setIsCartLoading(true);
    let novoCarrinhoItens;
    const idClienteLogado = dados?.id; // Usa 'dados' que já está processado

    if (idClienteLogado) { // Cliente logado
      try {
        const carrinhoAtualizadoAPI = await addItemToCarrinhoAPI(idClienteLogado, produto.id, quantidade);
        novoCarrinhoItens = carrinhoAtualizadoAPI.itens || [];
      } catch (error) {
        console.error("Erro ao adicionar item (API):", error);
        setIsCartLoading(false);
        throw error;
      }
    } else if (!grupo) { // Convidado (não funcionário)
      // Cria uma cópia do carrinho atual do estado para convidados
      const carrinhoAtualLocal = carrinho ? [...carrinho] : [];
      const itemExistenteIndex = carrinhoAtualLocal.findIndex(item => item.idProduto === produto.id);

      if (itemExistenteIndex > -1) {
        carrinhoAtualLocal[itemExistenteIndex].quantidade += quantidade;
      } else {
        // O carrinho de convidado deve ter `idProduto` para ser compatível com a sincronização
        carrinhoAtualLocal.push({
            idProduto: produto.id, // Chave importante para a API
            nomeProduto: produto.nome,
            quantidade: quantidade,
            precoUnitario: produto.preco
            // Adicione outros campos que seu modal de carrinho possa precisar,
            // mas idProduto, nomeProduto, quantidade, precoUnitario são essenciais.
        });
      }
      novoCarrinhoItens = carrinhoAtualLocal;
      localStorage.setItem("carrinho_guest", JSON.stringify(novoCarrinhoItens));
    } else { // Funcionário
      console.warn("Funcionários não podem adicionar itens ao carrinho.");
      setIsCartLoading(false);
      return;
    }
    setCarrinho(novoCarrinhoItens);
    setIsCartLoading(false);
  }, [dados, grupo, carrinho, addItemToCarrinhoAPI]);

  const atualizarQuantidadeNoCarrinho = useCallback(async (idProduto, novaQuantidade) => {
    setIsCartLoading(true);
    let carrinhoResultanteItens;
    const idClienteLogado = dados?.id;

    if (idClienteLogado) { // Cliente
      try {
        if (novaQuantidade <= 0) {
          const res = await removeItemFromCarrinhoAPI(idClienteLogado, idProduto);
          carrinhoResultanteItens = res.itens || [];
        } else {
          const res = await updateItemQuantityAPI(idClienteLogado, idProduto, novaQuantidade);
          carrinhoResultanteItens = res.itens || [];
        }
      } catch (error) {
        console.error("Erro ao atualizar quantidade (API):", error);
        setIsCartLoading(false);
        throw error;
      }
    } else if (!grupo) { // Convidado
      let carrinhoAtualLocal = carrinho ? [...carrinho] : [];
      const itemIndex = carrinhoAtualLocal.findIndex(item => item.idProduto === idProduto);
      if (itemIndex > -1) {
        if (novaQuantidade <= 0) {
          carrinhoAtualLocal.splice(itemIndex, 1);
        } else {
          carrinhoAtualLocal[itemIndex].quantidade = novaQuantidade;
        }
      }
      carrinhoResultanteItens = carrinhoAtualLocal;
      localStorage.setItem("carrinho_guest", JSON.stringify(carrinhoResultanteItens));
    } else { // Funcionário
      console.warn("Funcionários não podem atualizar carrinho.");
      setIsCartLoading(false);
      return;
    }
    setCarrinho(carrinhoResultanteItens);
    setIsCartLoading(false);
  }, [dados, grupo, carrinho, removeItemFromCarrinhoAPI, updateItemQuantityAPI]);

  const removerDoCarrinho = useCallback(async (idProduto) => {
    // Simplesmente chama atualizarQuantidadeNoCarrinho com 0, que já lida com a remoção.
    await atualizarQuantidadeNoCarrinho(idProduto, 0);
  }, [atualizarQuantidadeNoCarrinho]);

  const limparCarrinho = useCallback(async () => {
    setIsCartLoading(true);
    const idClienteLogado = dados?.id;
    if (idClienteLogado) { // Cliente
      try {
        await clearCarrinhoAPI(idClienteLogado);
      } catch (error) {
        console.error("Erro ao limpar carrinho (API):", error);
        // Mesmo com erro na API, limpa localmente para consistência visual
      }
    } else if (!grupo) { // Convidado
      localStorage.removeItem("carrinho_guest");
    } else { // Funcionário
       console.warn("Funcionários não podem limpar carrinho.");
       setIsCartLoading(false);
       return;
    }
    setCarrinho([]); // Limpa o carrinho no estado
    setIsCartLoading(false);
  }, [dados, grupo, clearCarrinhoAPI]);


  // Chamada pelo componente de Login
  const processLogin = useCallback((userDataFromApi) => {
    console.log("AuthContext: processLogin chamado com:", userDataFromApi);
    // Apenas define o 'user'. O Efeito 2 (que observa 'user')
    // fará todo o processamento, incluindo a sincronização do carrinho de convidado.
    setUser(userDataFromApi);
  }, []); // Sem dependências, pois apenas chama setUser

  // Chamada pelo botão de Logout
  const handleLogout = useCallback(() => {
    console.log("AuthContext: handleLogout chamado.");

    // Salva o carrinho atual do usuário logado (se houver) como carrinho de convidado
    // ANTES de limpar os dados do usuário.
    // O 'carrinho' aqui é o estado atual, que reflete o carrinho do usuário logado.
    // Os itens já devem ter 'idProduto', 'nomeProduto', etc.
    if (carrinho && carrinho.length > 0) {
      // Garante que o carrinho salvo para convidado tenha a estrutura esperada
      // (idProduto, nomeProduto, quantidade, precoUnitario)
      const carrinhoParaConvidado = carrinho.map(item => ({
        idProduto: item.idProduto,
        nomeProduto: item.nomeProduto || item.nome, // Fallback se nomeProduto não existir
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario || item.preco // Fallback
      }));
      localStorage.setItem('carrinho_guest', JSON.stringify(carrinhoParaConvidado));
      console.log("AuthContext: Carrinho do usuário salvo como carrinho_guest no logout.");
    } else {
      localStorage.removeItem('carrinho_guest'); // Remove se não há itens
    }

    localStorage.removeItem("user");
    // Opcional: resetar frete no logout? Se sim, descomente:
    // localStorage.removeItem("frete");
    // localStorage.removeItem("valorFrete");
    // setFrete("");
    // setValorFrete(0);

    setUser(null); // Isso disparará o Efeito 2 para reprocessar como convidado e carregar o carrinho_guest.
    // Não é necessário setar dados, grupo ou carrinho aqui, o Efeito 2 cuidará disso.

    if (router) { router.push('/pgPrincipal'); }
    else if (typeof window !== "undefined") { window.location.href = '/pgPrincipal'; }

  }, [carrinho, router]); // Depende de 'carrinho' para salvá-lo, e 'router'


  const contextValue = useMemo(() => ({
    // ... (seu código original para contextValue) ...
    user, dados, grupo, carrinho, frete, setFrete, valorFrete, setValorFrete,
    isLoading, isCartLoading, handleLogout, processLogin, updateUserDataInContext,
    adicionarAoCarrinho, atualizarQuantidadeNoCarrinho, removerDoCarrinho, limparCarrinho,
  }), [
    user, dados, grupo, carrinho, frete, valorFrete,
    isLoading, isCartLoading,
    handleLogout, processLogin,
    adicionarAoCarrinho, atualizarQuantidadeNoCarrinho, removerDoCarrinho,updateUserDataInContext, limparCarrinho,
  ]);

  if (isLoading && user === undefined) { // Mostra loader apenas se o user ainda não foi determinado
     console.log("AuthContext [Render Provider]: isLoading (inicial) é true, renderizando loader.");
     return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
             <p>Carregando sessão...</p>
         </div>
     );
  }

  // console.log(`AuthContext [Render Provider]: Finalizado. User: ${user ? 'presente' : 'null'}, Dados (cliente): ${dados ? dados.id : 'null'}, Grupo (func): ${grupo || 'null'}, isLoading: ${isLoading}`);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // ... (seu código original) ...
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}