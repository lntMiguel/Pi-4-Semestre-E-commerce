import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation"; 
import { useState } from "react";

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
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  background-color: #30f003;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #28c702;
  }
`;
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleLogin = async () => {
    // Lógica fictícia de autenticação e verificação de role (admin ou estoquista)
    
    // Aqui, vamos simular que após a autenticação, o banco retorna um usuário com um role
    const userFromDb = {
      username: "admin",  // Simulação de nome de usuário
      role: "admin",      // Pode ser 'admin' ou 'estoquista'
    };

    // Se o usuário fornecer credenciais válidas (simulando verificação)
    if (username === "admin" && password === "admin123") {
      // Em um cenário real, você faria a verificação no banco de dados
      // Example: const user = await apiLogin(username, password);
      
      // Aqui, vamos simular a verificação de role
      if (userFromDb.role === "admin") {
        // Redireciona para a página de admin
        router.push("/main"); // Página de admin, que você pode criar
      } else if (userFromDb.role === "estoquista") {
        // Redireciona para a página do estoquista
        router.push("/main"); // Página de estoquista, que você pode criar
      }
    } else {
      setError("Credenciais inválidas!");
    }
  };

  return (
    <StyledLogin>
      <GlobalStyle />
      <Box>
        <Title>Login</Title>
        <Input 
          type="text" 
          placeholder="Nome de usuário" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button onClick={handleLogin}>Entrar</Button>
      </Box>
    </StyledLogin>
  );
}

export default Login;