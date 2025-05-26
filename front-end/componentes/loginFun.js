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

// Novo botão para retornar à loja
const BotaoRetornar = styled.button`
  position: absolute;
  top: 20px; /* Distância do topo */
  left: 20px; /* Distância da direita */
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.2); /* Um pouco transparente para se misturar */
  color: #fff; /* Cor do texto branca para contrastar com o fundo escuro */
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px; /* Espaço entre o ícone e o texto */
  transition: background-color 0.3s, border-color 0.3s;
  z-index: 100; /* Para garantir que fique sobre outros elementos */

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
  }

  /* Estilo para o ícone (pode ser um caractere de seta ou um SVG) */
  .arrow-icon {
    font-size: 18px; // Ajuste o tamanho conforme necessário
    line-height: 1;
  }
`;

function LoginFun() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser, setGrupo, setDados } = useAuth();
  const [usuarioErro, setUsuarioErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setUsuarioErro(false);
    setSenhaErro(false);

    let hasFormError = false;
    if (!email.trim()) {
      setUsuarioErro(true);
      hasFormError = true;
    }
    if (!password.trim()) {
      setSenhaErro(true);
      hasFormError = true;
    }
    if (hasFormError) {
      return;
    }

    try {
      console.log("LoginFun: Tentando login de funcionário com:", { email });
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      console.log("LoginFun: Resposta da API de login:", { status: response.status, body: responseData });

      if (!response.ok) {
        setError(responseData.message || `Erro ${response.status}: Credenciais inválidas ou usuário inativo.`);
        return;
      }

      console.log("LoginFun: Login bem-sucedido. Dados recebidos:", responseData);
      setUser(responseData);

      // 1. Atualizar o usuário no contexto com o objeto simples da API
      setUser(responseData); // user agora é { grupo, message }

      // 2. Atualizar o GRUPO no contexto
      if (responseData.grupo) {
        setGrupo(responseData.grupo);
        console.log("LoginFun: Grupo definido no contexto:", responseData.grupo);
      } else {
        console.error("LoginFun: API NÃO RETORNOU 'grupo'. Login falhou em essência.");
        setError("Falha ao obter informações de grupo do usuário. Tente novamente.");
        // Limpar qualquer estado parcial
        setUser(null);
        setGrupo(null);
        setDados(null);
        localStorage.removeItem("user");
        return; // Não prosseguir
      }

      // 3. Como não há 'nome' ou 'dados' na resposta, setDados será null
      setDados(null);
      console.log("LoginFun: 'dados' definido como null pois API não retorna nome/dados detalhados.");

      // 4. Salvar no localStorage o objeto simples { grupo, message }
      localStorage.setItem("user", JSON.stringify(responseData));
      console.log("LoginFun: Usuário (simplificado) salvo no localStorage.");

      const targetRoute = "/main";
      console.log(`LoginFun: Redirecionando para ${targetRoute}...`);
      router.push(targetRoute);

    } catch (err) {
      console.error("LoginFun: Erro no try-catch do handleLogin:", err);
      setError(err.message || "Erro ao processar o login. Tente novamente.");
    }
  };

  const enterAcionado = (e) => {
    if (e.key === "Enter") {
      if (!usuarioErro && !senhaErro) {
         handleLogin(e);
      }
    }
  };

   const handleRetornarLoja = () => {
    router.push('/pgPrincipal');
  };

  return (
    <StyledLoginFun>
      <GlobalStyle />
       <BotaoRetornar onClick={handleRetornarLoja}>
        <span className="arrow-icon">←</span> {/* Seta para a esquerda Unicode */}
        Voltar para a Loja
      </BotaoRetornar>
      <Box>
        <Titulo>Login Funcionário</Titulo>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Email do funcionário"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (e.target.value.trim()) setUsuarioErro(false); }}
            onKeyDown={enterAcionado}
          />
          {usuarioErro && <Popup>Campo obrigatório</Popup>}
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (e.target.value.trim()) setSenhaErro(false); }}
            onKeyDown={enterAcionado}
          />
          {senhaErro && <Popup>Campo obrigatório</Popup>}
        </InputWrapper>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <Botao onClick={handleLogin}>Entrar</Botao>
      </Box>
    </StyledLoginFun>
  );
}

export default LoginFun;