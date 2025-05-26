import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import { useEffect, useRef, useState } from 'react';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
`;

const StyledMain = styled.div`
   background: 
    radial-gradient(ellipse at top, rgba(48, 240, 3, 0.6) -5%, rgba(18, 60, 7, 0.95) 70%),
    repeating-linear-gradient(45deg, rgba(18, 60, 7, 0.15) 0px, rgba(18, 60, 7, 0.15) 10px, rgba(48, 240, 3, 0.1) 10px, rgba(48, 240, 3, 0.1) 20px);
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const Box = styled.div`
  background-color: #f0f0f0;
  padding: 30px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 350px;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Botao = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  background-color: rgb(22, 77, 9);
  color: #fff;
  font-size: 16px;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #28c702;
  }
`;

const PAGE_STATE = {
  INITIAL_LOADING: 'INITIAL_LOADING', // AuthContext está carregando do localStorage
  AWAITING_SESSION: 'AWAITING_SESSION', // AuthContext carregado, mas user/grupo ainda não definidos (esperando login)
  AUTHORIZED: 'AUTHORIZED',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

function Main() {
    const router = useRouter();
    const { user, grupo, handleLogout: contextLogout, dados, isLoading: authContextIsInitiallyLoading } = useAuth();
    const logoutInitiatedRef = useRef(false);
    const [pageState, setPageState] = useState(PAGE_STATE.INITIAL_LOADING);

    const PERMITTED_GROUPS = ["admin", "estoquista"];

    useEffect(() => {
        console.log("MainBody useEffect: Disparado. Current PageState:", pageState, "User:", user ? (user.grupo || user.id) : null, "GrupoCtx:", grupo, "AuthLoading:", authContextIsInitiallyLoading);

        if (authContextIsInitiallyLoading) {
            setPageState(PAGE_STATE.INITIAL_LOADING);
            console.log("MainBody useEffect: AuthContext no carregamento inicial. Estado -> INITIAL_LOADING");
            return;
        }

        if (!user || !grupo) {
            setPageState(PAGE_STATE.AWAITING_SESSION);
            console.log("MainBody useEffect: User ou Grupo é null (APÓS AuthLoading ser false). Estado -> AWAITING_SESSION.");
            // Se o objetivo é redirecionar se não estiver logado ao entrar na página:
            console.log("MainBody useEffect: Redirecionando para /loginFun pois user/grupo são nulos.");
            router.replace('/loginFun');
            return; // Adicionado return para não prosseguir
        } else {
            if (PERMITTED_GROUPS.includes(grupo.toLowerCase())) {
                console.log(`MainBody useEffect: Acesso AUTORIZADO para grupo '${grupo}'. Estado -> AUTHORIZED`);
                setPageState(PAGE_STATE.AUTHORIZED);
            } else {
                console.log(`MainBody useEffect: Grupo '${grupo}' NÃO autorizado. Estado -> UNAUTHORIZED. Redirecionando...`);
                setPageState(PAGE_STATE.UNAUTHORIZED);
                router.replace('/loginFun');
            }
        }

        // REMOVIDA A FUNÇÃO DE LIMPEZA QUE FAZIA LOGOUT AUTOMÁTICO
        // return () => {
        //     console.log("MainBody Cleanup: Componente desmontando.");
        //     // Lógica de logout automático foi removida daqui
        // };

    }, [user, grupo, authContextIsInitiallyLoading, router, contextLogout, pageState]);

    // ----- Renderização com base no pageState -----

    if (pageState === PAGE_STATE.INITIAL_LOADING) {
        console.log("MainBody Render: Estado INITIAL_LOADING");
        return ( <StyledMain><GlobalStyle /><p style={{ color: 'white', fontSize: '1.2em' }}>Carregando dados iniciais...</p></StyledMain> );
    }

    if (pageState === PAGE_STATE.AWAITING_SESSION) {
        console.log("MainBody Render: Estado AWAITING_SESSION");
        return ( <StyledMain><GlobalStyle /><p style={{ color: 'white', fontSize: '1.2em' }}>Verificando sessão do funcionário...</p></StyledMain> );
    }

    if (pageState === PAGE_STATE.UNAUTHORIZED) {
        console.log("MainBody Render: Estado UNAUTHORIZED");
        return ( <StyledMain><GlobalStyle /><p style={{ color: 'white', fontSize: '1.2em' }}>Acesso não permitido. Redirecionando...</p></StyledMain> );
    }

    if (pageState === PAGE_STATE.AUTHORIZED) {
        console.log("MainBody Render: Estado AUTHORIZED. Renderizando painel para grupo:", grupo);
        return (
            <StyledMain>
                <GlobalStyle />
                <Box>
                    <Titulo>Painel de Controle</Titulo>
                    <p style={{marginBottom: "15px", color: "#333"}}>
                        Olá, {dados?.nome || grupo?.charAt(0).toUpperCase() + grupo?.slice(1) || 'Usuário Autorizado'}
                    </p>
                    <Botao onClick={() => router.push('/produtos')} >Gerenciar Produtos</Botao>
                    {grupo === "admin" && (
                        <Botao onClick={() => router.push('/usuarios')}>Gerenciar Usuários</Botao>
                    )}
                    {(grupo === "admin" || grupo === "estoquista") && (
                        <Botao onClick={() => router.push('/gerenciaPedidos')}>Gerenciar Pedidos</Botao>
                    )}
                    <Botao onClick={contextLogout} style={{backgroundColor: "#dc3545", marginTop: '20px'}}>Sair do Painel</Botao>
                </Box>
            </StyledMain>
        );
    }

    // Fallback, não deve ser alcançado se a lógica de pageState estiver correta
    console.log("MainBody Render: Estado de página desconhecido ou fallback.");
    return ( <StyledMain><GlobalStyle /><p style={{ color: 'white', fontSize: '1.2em' }}>Ocorreu um erro ao carregar a página.</p></StyledMain> );
}



export default Main;
