import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
    overflow: hidden;
  }
`;

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

const StyledBemvindo = styled.div`
  background: 
    radial-gradient(ellipse at top, rgba(48, 240, 3, 0.6) -5%, rgba(18, 60, 7, 0.95) 70%),
    repeating-linear-gradient(45deg, rgba(18, 60, 7, 0.15) 0px, rgba(18, 60, 7, 0.15) 10px, rgba(48, 240, 3, 0.1) 10px, rgba(48, 240, 3, 0.1) 20px);
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 90%;
  max-width: 700px;
  animation: ${fadeIn} 1s ease forwards;
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 
              0 0 15px rgba(48, 240, 3, 0.5);
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(48, 240, 3, 0.3);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 20px;
  color: #145214;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Mensagem = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: #333;
  text-align: center;
  overflow-wrap: break-word;
  max-width: 100%;
  line-height: 1.4;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Cursor = styled.span`
  font-size: 22px;
  font-weight: 500;
  color: #30F003;
  animation: ${blink} 0.8s infinite;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const Botao = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background: ${props => props.$isPrimary ? 
    'linear-gradient(45deg, #145214, #30F003)' : 
    'transparent'};
  color: ${props => props.$isPrimary ? 'white' : '#145214'};
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.$isPrimary ? 'none' : '2px solid #145214'};
  box-shadow: ${props => props.$isPrimary ? 
    '0 4px 15px rgba(48, 240, 3, 0.4)' : 
    'none'};
  
  &:hover {
    transform: translateY(-3px);
    background: ${props => props.$isPrimary ? 
      'linear-gradient(45deg, #1a6b1a, #4aff20)' : 
      'rgba(48, 240, 3, 0.1)'};
    box-shadow: ${props => props.$isPrimary ? 
      '0 7px 20px rgba(48, 240, 3, 0.5)' : 
      '0 4px 10px rgba(20, 82, 20, 0.2)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function Bemvindo() {
  const [texto, setTexto] = useState("");
  const [mostrarCursor, setMostrarCursor] = useState(true);
  const [animacaoCompleta, setAnimacaoCompleta] = useState(false);
  const fullTexto = "BBem-vindo ao site Turn On The Beck. Adquira as melhores plantas para seu jardim ou ambiente.";
  const router = useRouter();

  const handleRedirect = useCallback(() => {
    router.push('/pgPrincipal');
  }, [router]);
  
  const handleRedirectL = useCallback(() => {
    router.push('/login');
  }, [router]);

  useEffect(() => {
    let isMounted = true;
    const textoDigitado = async () => {
      let i = 0;
      setTexto("");
      while (i < fullTexto.length && isMounted) {
        setTexto((prev) => prev + fullTexto.charAt(i));
        i++;
        await new Promise(resolve => setTimeout(resolve, 40));
      }
      
      // Quando terminar de digitar
      if (isMounted) {
        setTimeout(() => {
          setAnimacaoCompleta(true);
        }, 500);
      }
    };
    
    textoDigitado();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledBemvindo>
      <GlobalStyle />
      <ContentWrapper>
        <Box>
          <Logo>Turn On The Beck</Logo>
          <Mensagem>
            {texto}{mostrarCursor && <Cursor>|</Cursor>}
          </Mensagem>
          
          <ButtonContainer style={{ 
            opacity: animacaoCompleta ? 1 : 0, 
            transform: animacaoCompleta ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s, transform 0.5s'
          }}>
            <Botao $isPrimary onClick={handleRedirect}>Ver Produtos</Botao>
            <Botao onClick={handleRedirectL}>Entrar</Botao>
          </ButtonContainer>
        </Box>
      </ContentWrapper>
    </StyledBemvindo>
  );
}

export default Bemvindo;