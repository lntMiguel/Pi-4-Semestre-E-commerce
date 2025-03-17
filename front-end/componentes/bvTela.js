import styled, { keyframes } from "styled-components";
import { createGlobalStyle } from "styled-components";
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
    font-family: Arial, sans-serif;
    overflow: hidden;
  }
`;

const blink = keyframes`
  50% { opacity:0; }
`;

const StyledBemvindo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2330f003' fill-opacity='0.59' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 80px 40px;
  background-position: center;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

const Mensagem = styled.p`
  font-size: 24px; 
  font-weight: bold;
  color: #000;
  text-align: center;
  overflow-wrap: break-word; 
  max-width: 100%;
`;

const Cursor = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  animation: ${blink} 1s infinite;
`;

const Botao = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color:rgb(22, 77, 9);
  color: white;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #28c702;
  }
`;

function Bemvindo() {
  const [texto, setTexto] = useState("");
  const [mostrarCursos] = useState(true);
  const fullTexto = "BBem-vindo ao site Turn On The Beck. Adquira as melhores plantas aqui.";
  const router = useRouter();

  const handleRedirect = useCallback(() => {
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
        await new Promise(resolve => setTimeout(resolve, 50));
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
      <Box>
      <Mensagem>{texto}{mostrarCursos && <Cursor>|</Cursor>}</Mensagem>
        <Botao onClick={handleRedirect}>Ir para Login</Botao>
      </Box>
    </StyledBemvindo>
  );
}

export default Bemvindo;
