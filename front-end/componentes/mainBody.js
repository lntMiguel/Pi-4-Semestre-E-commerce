import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

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

function Main() {
    const router = useRouter();
    const { grupo } = useAuth();
    const { setUser, setGrupo} = useAuth();

    const handleRedirect = () => {
        router.push('/usuarios');
      };
    const handleRedirectP = () => {
      router.push('/produtos');
    };

    const handleRedirectL = () => {
      router.push('/login');
    };
    
      const handleLogout = () => {
        localStorage.removeItem("user"); // limpa do localStorage
        setUser(null); // limpa o estado
        setGrupo(null);
        

    
        // redireciona para login ou home
        handleRedirectL();
      };

  return (
    <StyledMain>
      <GlobalStyle />
      <Box>
        <Titulo>Painel de Controle</Titulo>
        <Botao onClick={handleRedirectP} >Listar Produtos</Botao>
        {grupo === "admin" && <Botao onClick={handleRedirect}>Listar Usuários</Botao>}        
        {grupo === "estoquista" && <Botao onClick={handleRedirect}>Listar Pedidos</Botao>}   
        <Botao onClick={handleLogout}>Sair</Botao>
      </Box>
    </StyledMain>
  );
}

export default Main;
