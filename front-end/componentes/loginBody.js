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
  }
`;

const StyledLogin = styled.div`
  background:
    radial-gradient(ellipse at top, rgba(48, 240, 3, 0.6) -5%, rgba(18, 60, 7, 0.95) 70%),
    repeating-linear-gradient(45deg, rgba(18, 60, 7, 0.15) 0px, rgba(18, 60, 7, 0.15) 10px, rgba(48, 240, 3, 0.1) 10px, rgba(48, 240, 3, 0.1) 20px);
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 20px;
  position: relative; /* Importante para posicionar o botão de retorno */
 `;

const Box = styled.div`
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 550px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative; // Para o Popup não vazar se o Box for menor
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
  /* Ajuste para o popup não sair da tela se o campo for muito à direita */
  right: 10px; /* Posicionar à direita do input */
  transform: translate(100%, -50%); /* Mover para fora do input */
  margin-left: 5px; /* Pequeno espaço entre o input e o popup */
  background: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border-radius: 50px; /* Mantido o raio grande */
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 10;

  /* Alternativa se o popup estiver muito largo, para posicionar acima ou abaixo */
  /* Se preferir acima/abaixo, ajuste top/bottom e remova right/transform */
  /* Exemplo:
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-5px); // Um pouco acima
  right: auto;
  */
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

const BotaoSecundario = styled(Botao)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
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


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser, setGrupo, setDados, setCarrinho, user, frete, setFrete } = useAuth();
  const [usuarioErro, setUsuarioErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);

  const handleRedirectCadastro = () => {
    router.push('/cadastro');
  };

  const handleRedirectFuncionario = () => {
    router.push('/loginFun');
  };

  const handleRetornarLoja = () => {
    router.push('/pgPrincipal');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setUsuarioErro(false);
    setSenhaErro(false);

    let hasError = false;
    if (!email.trim()) {
      setUsuarioErro(true);
      hasError = true;
    }
    if (!password.trim()) {
      setSenhaErro(true);
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await fetch("http://localhost:8081/cliente/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message || (response.status === 403 && responseData.message === "Usuário inativo" ? "Seu usuário está inativo. Contate o suporte." : "Credenciais inválidas"));
        return;
      }
      setUser(responseData);
      setGrupo(null);
      localStorage.setItem("user", JSON.stringify(responseData));
      const storedGuestCarrinho = localStorage.getItem('carrinho_guest');
      if (storedGuestCarrinho) {
        const guestCarrinho = JSON.parse(storedGuestCarrinho);
        setCarrinho(guestCarrinho);
        localStorage.setItem(`carrinho_${responseData.id}`, JSON.stringify(guestCarrinho));
        localStorage.removeItem('carrinho_guest');
      } else {
        const userCarrinho = localStorage.getItem(`carrinho_${responseData.id}`);
        setCarrinho(userCarrinho ? JSON.parse(userCarrinho) : []);
      }
      const storedfrete = localStorage.getItem('frete');
      if (storedfrete) setFrete(JSON.parse(storedfrete));
      router.push("/pgPrincipal");
    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message || "Erro ao fazer login. Verifique sua conexão.");
    }
  };

  const enterAcionado = (e) => {
    if (e.key === "Enter" && (document.activeElement.name === "password" || document.activeElement.name === "email")) {
      handleLogin(e);
    }
  };

  return (
    <StyledLogin>
      <GlobalStyle />
      {/* Botão de retornar para a loja posicionado aqui */}
      <BotaoRetornar onClick={handleRetornarLoja}>
        <span className="arrow-icon">←</span> {/* Seta para a esquerda Unicode */}
        Voltar para a Loja
      </BotaoRetornar>

      <Box>
        <Titulo>Login</Titulo>
        <InputWrapper>
          <Input
            name="email"
            type="text"
            placeholder="Nome de usuário (email)"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (e.target.value.trim()) setUsuarioErro(false); }}
            onKeyDown={enterAcionado}
          />
          {usuarioErro && <Popup>Campo obrigatório</Popup>}
        </InputWrapper>
        <InputWrapper>
          <Input
            name="password"
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
        <Botao onClick={handleRedirectCadastro}>Cadastrar</Botao>
        <Botao onClick={handleRedirectFuncionario}>Funcionário</Botao>
        {/* O botão de retornar para a loja foi movido para fora do Box */}
      </Box>
    </StyledLogin>
  );
}

export default Login;