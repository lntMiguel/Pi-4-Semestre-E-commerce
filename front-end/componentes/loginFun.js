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

const StyledLoginFun = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh; /* Garante que cobre toda a tela */
  /* Background SVG */
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2330f003' fill-opacity='0.59' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 80px 40px;
  background-position: center;
 `
const Box = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
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
  border-radius: 5px;
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
  border-radius: 5px;
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
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #28c702;
  }
`;

function LoginFun() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const router = useRouter();
const { setUser, setGrupo } = useAuth();
const [usuarioErro, setUsuarioErro] = useState(false);
const [senhaErro, setSenhaErro] = useState(false);


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
    const response = await fetch("http://localhost:8081/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const errorText = await response.json();  // Lê a resposta uma vez

    // Depuração: logar a resposta
    console.log("Response status:", response.status);
    console.log("Response message:", errorText.message);

    if (!response.ok) {
      if (response.status === 403 && errorText.message === "Usuário inativo") {
        setError("Seu usuário está inativo. Contate o suporte.");
      } else {
        setError(errorText.message || "Credenciais inválidas");
      }
      return;
    }

    // Se login for bem-sucedido
    setUser(errorText);
    setGrupo(errorText.grupo); 
    localStorage.setItem("user", JSON.stringify(errorText));

    router.push("/main"); 
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
    <StyledLoginFun>
      <GlobalStyle />
      <Box>
        <Titulo>Login Funcionario</Titulo>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Nome de usuário"
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
      </Box>
    </StyledLoginFun>
  );
}

export default LoginFun;