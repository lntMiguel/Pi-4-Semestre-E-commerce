import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
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
  }
`;

const StyledLogin = styled.div`
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
 `
const Box = styled.div`
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 550px; 
  min-height: 350px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  right: -120px; /* Distância do campo */
  transform: translateY(-50%);
  background: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const Botao = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
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

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const router = useRouter();
const { setUser, setGrupo, setDados,setCarrinho, user, frete,setFrete} = useAuth();
const [usuarioErro, setUsuarioErro] = useState(false);
const [senhaErro, setSenhaErro] = useState(false);

const handleRedirectP = () => {
  router.push('/cadastro');
};
const handleRedirectF = () => {
  router.push('/loginFun');
};

const handleLogin = async (e) => {
  e.preventDefault();
  setError(""); 

  if (!email.trim()) {
    setUsuarioErro(true);
  } else {
    setUsuarioErro(false);
  }

  if (!password.trim()) {
    setSenhaErro(true);
  } else {
    setSenhaErro(false);
  }

  if (!email.trim() || !password.trim()) {
    return; // Se qualquer um estiver vazio, não continua
  }

  try {
    const response = await fetch("http://localhost:8081/cliente/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.json();  // Lê a resposta uma vez

    // Depuração: logar a resposta
    console.log("Response status:", response.status);
    console.log("Response message:", text.message);

    if (!response.ok) {
      if (response.status === 403 && text.message === "Usuário inativo") {
        setError("Seu usuário está inativo. Contate o suporte.");
      } else {
        setError(text.message || "Credenciais inválidas");
      }
      return;
    }

    // Se login for bem-sucedido
    setUser(text); // Atualiza o estado do usuário
    setGrupo(null);
    setDados(text.dados);
    localStorage.setItem("user", JSON.stringify(text)); // Salva o usuário no localStorage

    // Verifica e transfere o carrinho do visitante, se houver
    const storedGuestCarrinho = localStorage.getItem('carrinho_guest');
    if (storedGuestCarrinho) {
      // Transfere o carrinho de visitante para o usuário logado
      const guestCarrinho = JSON.parse(storedGuestCarrinho);
      setCarrinho(guestCarrinho);  // Atualiza o estado do carrinho

      // Salva o carrinho com a chave do usuário logado
      localStorage.setItem(`carrinho_${text.id}`, JSON.stringify(guestCarrinho));
      
      // Remove o carrinho do visitante após a transferência
      localStorage.removeItem('carrinho_guest');
    }

    const storedfrete = localStorage.getItem('frete');
    if(storedfrete){
      const freteSessao = JSON.parse(storedfrete);
      setFrete(freteSessao);
    }

    // Redireciona para a página principal após login
    router.push("/pgPrincipal"); 
  } catch (error) {
    setError(error.message || "Erro ao fazer login");
  }
};




const enterAcionado = (e) => {
  if (e.key === "Enter") {
    handleLogin(e);
  }
};
  return (
    <StyledLogin>
      <GlobalStyle />
      <Box>
        <Titulo>Login</Titulo>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Nome de usuário (email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={enterAcionado}
          />
          {usuarioErro && <Popup>Campo obrigatório</Popup>}
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setSenhaErro(false); 
            }}
            onKeyDown={enterAcionado}
          />
          {senhaErro && <Popup>Campo obrigatório</Popup>}
        </InputWrapper>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Botao onClick={handleLogin}>Entrar</Botao>
        <Botao onClick={handleRedirectP}>Cadrastrar</Botao>
        <Botao onClick={handleRedirectF}>Funcionario</Botao>
      </Box>
    </StyledLogin>
  );
}

export default Login;