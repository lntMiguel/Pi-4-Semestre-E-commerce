import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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

const Header = styled.div`
  width: 90%;
  height: 120px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: black;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
  height: 90px;
  border-radius: 50px;
`;

const Titulo = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

const Usuario = styled.div`
  display: flex;
  align-items: center;
`;

const Carrinho = styled.div`
  font-size: 35px;
  cursor: pointer;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0px;
  background: #f0f0f0;
  border-radius: 8px;
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #164d09;
  font-size: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

const ButtonsContainerN = styled.div`
  display: flex;
  flex-direction: column;a
  margin-left: auto;
`;

const UserButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.$primary ? '#164d09' : '#f0f0f0'};
  color: ${props => props.$primary ? '#f0f0f0' : '#164d09'};
  border: 1px solid #164d09;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$primary ? '#1a5e0a' : '#f0fff0'};
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const UserButtonN = styled.button`
  margin: 1px;
  padding: 5px 10px;
  background-color: ${props => props.$primary ? '#164d09' : '#f0f0f0'};
  color: ${props => props.$primary ? '#f0f0f0' : '#164d09'};
  border: 1px solid #164d09;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$primary ? '#1a5e0a' : '#f0fff0'};
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Container = styled.div`
   width: 90%;
   height: 70%;
  margin-top: 40px; 
  background: #f0f0f0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const CardP = styled.div`
  width: 230px;
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImgProduto = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const NomeP = styled.h3`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PrecoP = styled.p`
  font-size: 20px;
  color: #ff6600;
  font-weight: bold;
  margin: 10px 0;
`;

const DetalheB = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 90%;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #f5f5f5;
  padding: 25px;
  border-radius: 12px;
  width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff0000;
  }
`;

const CarrinhoTitle = styled.h2`
  font-size: 22px;
  color: #333;
  margin-bottom: 15px;
`;

const CarrinhoList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 250px;
  overflow-y: auto;
`;

const CarrinhoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
`;

const ItemName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #007bff;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  border: none;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50px;
  margin: 0 5px;
  transition: all 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background: #ff4d4d;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.2s;

  &:hover {
    background: #cc0000;
  }
`;

const ResumoPedido = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 50px;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 20px;
  color: #333;
`;

const BotaoFinalizar = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(135deg, #218838, #1e7e34);
  }
`;

const ProductName = styled.h2`
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
  padding: 0 15px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 12px 18px;
  border: none;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background: linear-gradient(135deg, #0056b3, #003f80);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;
const SuccessMessage = styled.p`
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 50px;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
`;

const StyledSlider = styled(Slider)`
  margin: 15px 0 30px;

  .slick-prev, .slick-next {
  z-index: 1;
  width: 80px;
  height: 50px;
  border-radius: 50%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: black !important; 
  font-size: 0px;
}

.slick-prev::before,
.slick-next::before {
  color: black !important; 
  font-size: 20px;
}

  .slick-dots {
    bottom: -25px;
  }

  .slick-slide {
    display: flex !important; 
    justify-content: center; 
    align-items: center;
  }

  .slick-track {
    display: flex !important;       
  }

  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

function Principal() {
const {
    user, // Objeto user completo do AuthContext
    dados, // Dados específicos do cliente (ou null)
    grupo, // Grupo do funcionário (ou null)
    frete, setFrete, valorFrete, setValorFrete,
    handleLogout: contextLogout, // Função de logout do AuthContext
    isLoading: authIsLoading, // Flag de loading geral do AuthContext
    isCartLoading, // Flag de loading para operações de carrinho
    carrinho, // Array de itens do carrinho
    adicionarAoCarrinho,
    atualizarQuantidadeNoCarrinho,
    limparCarrinho,
    removerDoCarrinho
  } = useAuth();

  const [produtos, setProdutos] = useState([]);
  const [showModalDetalhes, setShowModalDetalhes] = useState(false); // Renomeado para clareza
  const [showModalCarrinho, setShowModalCarrinho] = useState(false); // Renomeado para clareza
  const [addedMessage, setAddedMessage] = useState('');
  const [viewingProduct, setViewingProduct] = useState(null);
  const router = useRouter();
  const [errorHandled, setErrorHandled] = useState(false); // Para lógica de tratamento de erro de sessão
  const [imagemAmpliada, setImagemAmpliada] = useState(null); // Renomeado para clareza

  // --- Funções de Redirecionamento ---
  const handleRedirectPerfil = () => router.push('/perfil');
  const handleRedirectLogin = () => router.push('/login');
  const handleRedirectCadastro = () => router.push('/cadastro');

  // --- Efeito para verificar inconsistência de sessão ---
  useEffect(() => {
    if (authIsLoading) {
      console.log("pgPrincipal: AuthContext carregando, aguardando para verificar estado.");
      return;
    }
    const userPresentButInvalid = user && !dados && !grupo;
    if (userPresentButInvalid && !errorHandled) {
      console.warn("pgPrincipal: Estado de usuário inválido detectado. Forçando logout.");
      if (typeof contextLogout === 'function') {
        contextLogout();
        setErrorHandled(true);
      }
    } else if (!userPresentButInvalid && errorHandled) {
      setErrorHandled(false);
    }
  }, [user, dados, grupo, authIsLoading, contextLogout, errorHandled]);

  // --- Função para buscar imagens de um produto ---
  const fetchImages = async (idProduto) => {
    try {
      const response = await fetch(`http://localhost:8081/imagens/${idProduto}`);
      if (!response.ok) {
        if (response.status === 404) return []; // Sem imagens, retorna array vazio
        throw new Error(`Erro ${response.status} ao buscar imagens.`);
      }
      const imagensApi = await response.json();
      return imagensApi.map(img => ({
        ...img,
        url: `http://localhost:8081/${img.caminhoArquivo}` // URL completa da imagem
      }));
    } catch (error) {
      console.error(`Erro em fetchImages para produto ${idProduto}:`, error);
      return [];
    }
  };

  // --- Efeito para carregar produtos ---
  useEffect(() => {
    axios.get('http://localhost:8081/produto')
      .then(async (response) => {
        const produtosAtivos = response.data.filter(p => p.status === true);
        const produtosComDadosDeImagem = await Promise.all(produtosAtivos.map(async (produtoBackend) => {
          const todasImagensDoProduto = await fetchImages(produtoBackend.id);
          const imagemPrincipalObj = todasImagensDoProduto.find(img => img.principal) || todasImagensDoProduto[0];
          return {
            ...produtoBackend,
            imagemPrincipalDisplay: imagemPrincipalObj ? imagemPrincipalObj.caminhoArquivo : null, // Para uso com slice, se mantiver
            imagensComUrl: todasImagensDoProduto, // Array de objetos imagem com .url completa
          };
        }));
        setProdutos(produtosComDadosDeImagem);
      })
      .catch(error => {
         console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  // --- Calcular total do carrinho com frete ---
  const totalCarrinhoComFrete = useMemo(() => {
    if (!carrinho || carrinho.length === 0) return Number(valorFrete) || 0;
    const totalProdutos = carrinho.reduce((acc, item) => {
        const precoItem = item?.precoUnitario ?? item?.preco ?? 0;
        const quantidadeItem = item?.quantidade ?? 0;
        return acc + (Number(precoItem) * Number(quantidadeItem));
    }, 0);
    return totalProdutos + (Number(valorFrete) || 0);
  }, [carrinho, valorFrete]);

  // --- Handlers para Modais e Ações ---
  const handleDetail = (produtoSelecionado) => {
    setAddedMessage('');
    // As imagens já devem estar em produtoSelecionado.imagensComUrl
    setViewingProduct(produtoSelecionado);
    setShowModalDetalhes(true);
  };

  const handleCloseModalDetalhes = () => {
    setShowModalDetalhes(false);
    setViewingProduct(null);
  };

  const handleFreteChange = (tipo) => {
    let valor = 0;
    if (tipo === 'normal') valor = 10;
    else if (tipo === 'rapida') valor = 20;
    else if (tipo === 'retirada') valor = 0;
    setValorFrete(valor);
    setFrete(tipo);
  };

  const handleAddToCartNoModal = async () => {
    if (!viewingProduct) return;
    try {
       await adicionarAoCarrinho(viewingProduct, 1);
       setAddedMessage('Produto adicionado ao carrinho!');
       setTimeout(() => setAddedMessage(''), 2000);
    } catch (error) {
       console.error("Erro ao adicionar ao carrinho (modal):", error);
       alert(`Erro: ${error.message || 'Não foi possível adicionar o item.'}`);
    }
  };

  const handleBuyNoModal = async () => {
    if (!viewingProduct) return;
     try {
        await adicionarAoCarrinho(viewingProduct, 1);
        setShowModalDetalhes(false);
        setShowModalCarrinho(true);
     } catch (error) {
        console.error("Erro ao comprar agora (modal):", error);
        alert(`Erro: ${error.message || 'Não foi possível adicionar o item para compra.'}`);
     }
  };

  const handleCarrinhoIconClick = () => setShowModalCarrinho(!showModalCarrinho);

  const handleIncreaseQuantity = async (idProduto) => {
    const item = carrinho.find(p => p.idProduto === idProduto);
    if (item) {
       try { await atualizarQuantidadeNoCarrinho(idProduto, item.quantidade + 1); }
       catch (error) { console.error("Erro ao aumentar qtd:", error); alert(`Erro: ${error.message}`); }
    }
  };

  const handleDecreaseQuantity = async (idProduto) => {
    const item = carrinho.find(p => p.idProduto === idProduto);
    if (item) {
       try { await atualizarQuantidadeNoCarrinho(idProduto, item.quantidade - 1); } // AuthContext lida com remoção se <=0
       catch (error) { console.error("Erro ao diminuir qtd:", error); alert(`Erro: ${error.message}`); }
    }
  };

  const handleRemoveItem = async (idProduto) => { // Renomeado para consistência
     try { await removerDoCarrinho(idProduto); } // removerDoCarrinho no AuthContext faz qtd = 0
     catch (error) { console.error("Erro ao remover item:", error); alert(`Erro: ${error.message}`); }
  };

  const handleClearCart = async () => { // Renomeado para consistência
     try { await limparCarrinho(); }
     catch (error) { console.error("Erro ao limpar carrinho:", error); alert(`Erro: ${error.message}`); }
  };

  const handleFinalizarCompra = () => {
    if (!carrinho || carrinho.length === 0) {
        alert("Seu carrinho está vazio."); return;
    }
    if (!dados && !grupo) { // Não é cliente nem funcionário
        alert("Você precisa estar logado para finalizar a compra.");
        localStorage.setItem('redirectToCheckoutAfterLogin', 'true');
        router.push('/login'); return;
    }
    if (!frete) {
      alert("Por favor, selecione uma opção de frete."); return;
    }
    router.push("/checkout");
  };

  useEffect(() => {
    if (dados?.id && localStorage.getItem('redirectToCheckoutAfterLogin') === 'true') { // Verifica se é cliente
        localStorage.removeItem('redirectToCheckoutAfterLogin');
        router.push('/checkout');
    }
  }, [dados, router]); // Depende de dados (para ter dados.id)

  // Configurações do Slider (se usado)
  const sliderSettings = {
    dots: true, infinite: false, speed: 500,
    slidesToShow: 1, slidesToScroll: 1, adaptiveHeight: true,
  };

  // --- Renderização ---
  if (authIsLoading) { // O isLoading do AuthContext é para o carregamento inicial da sessão
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Carregando página principal...</p>
      </div>
    );
  }

  return (
    <StyledMain>

      <GlobalStyle />
      <Header>
        <Logo src="imagens/logo.png" alt="Logo" />
        <Titulo>Turn on the beck</Titulo>
        <Usuario>
          <Carrinho title="Carrinho" onClick={handleCarrinhoIconClick}>🛒</Carrinho>
          <UserSection>
            {user ? (
              <>
                <UserGreeting>
                  <UserName>{dados?.nome || 'Usuário'}</UserName>
                </UserGreeting>
                <ButtonsContainer>
                  <UserButton onClick={handleRedirectPerfil}>Perfil</UserButton>
                  <UserButton $primary onClick={contextLogout}>Sair</UserButton>
                </ButtonsContainer>
              </>
            ) : (
              <>

                <ButtonsContainerN>
                  <UserButtonN onClick={handleRedirectLogin}>Login</UserButtonN>
                  <UserButtonN $primary onClick={handleRedirectCadastro}>Cadastrar</UserButtonN>
                </ButtonsContainerN>
              </>
            )}
          </UserSection>

        </Usuario>
      </Header>
      <Container>
        <TopBar />
        <Cards>
          {produtos.map((produtos) => (
            <CardP key={produtos.id}>
              <NomeP>{produtos.nome}</NomeP>
              <PrecoP>R$ {produtos.preco.toFixed(2)}</PrecoP>
              <ImgProduto src={produtos.imagemPrincipalDisplay.slice(22)}></ImgProduto>
              <DetalheB onClick={() => handleDetail(produtos)}>Ver Detalhes</DetalheB>
            </CardP>
          ))}
        </Cards>
      </Container>
      {showModalCarrinho && (
        <ModalBackground show={showModalCarrinho.toString()}>
          <ModalContent>
            <CloseButton onClick={() => setShowModalCarrinho(false)}>✖</CloseButton>
            <CarrinhoTitle>🛒 Carrinho de Compras</CarrinhoTitle>
            <CarrinhoList>
              {/* Verifica se carrinho é nulo ou vazio antes de mapear */}
              {!carrinho || carrinho.length === 0 ? (
                <p>O carrinho está vazio</p>
              ) : (
                carrinho.map((item, index) => {
                  // Adicionar um log para inspecionar cada item do carrinho
                  // console.log("Item no carrinho (modal):", item);

                  // Fallback para o preço e nome, e garantir que o preço é um número
                  const nomeDoItem = item.nomeProduto || item.nome || "Produto sem nome";
                  const precoDoItem = item.precoUnitario !== undefined ? item.precoUnitario : (item.preco !== undefined ? item.preco : 0);
                  const idDoItem = item.idProduto || item.id || index; // Fallback para key

                  return (
                    <CarrinhoItem key={idDoItem}>
                      <ItemInfo>
                        <div>
                          {/* USA nomeProduto ou um fallback */}
                          <ItemName>{nomeDoItem}</ItemName>
                          {/* USA precoUnitario ou um fallback e garante que é número antes de toFixed */}
                          <ItemPrice>R$ {Number(precoDoItem).toFixed(2)}</ItemPrice>
                        </div>
                      </ItemInfo>
                      <QuantityControls>
                        {/* As funções de quantidade devem usar o ID correto do item (idProduto) */}
                        <QuantityButton onClick={() => handleIncreaseQuantity(idDoItem)}>+</QuantityButton>
                        {item.quantidade || 0} {/* Fallback para quantidade */}
                        <QuantityButton onClick={() => handleDecreaseQuantity(idDoItem)}>-</QuantityButton>
                      </QuantityControls>
                      <RemoveButton onClick={() => handleRemoveItem(idDoItem)}>🗑️</RemoveButton>
                    </CarrinhoItem>
                  );
                })
              )}
            </CarrinhoList>

            {carrinho.length !== 0 && (
              <ResumoPedido>
                <h4>Selecione o tipo de frete:</h4>
                <div>
                  <label>
                    <input type="radio" name="frete" checked={frete === "normal"} onChange={() => handleFreteChange("normal")} />
                    Frete Normal - R$10,00
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="frete" checked={frete === "rapida"} onChange={() => handleFreteChange("rapida")} />
                    Frete Rápido - R$20,00
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="frete" checked={frete === "retirada"} onChange={() => handleFreteChange("retirada")} />
                    Retirada na Loja - Grátis
                  </label>
                </div>

                <Total>Total: R$ {totalCarrinhoComFrete.toFixed(2)}</Total>
                <BotaoFinalizar onClick={handleFinalizarCompra}>Finalizar Compra 💳</BotaoFinalizar>
                <RemoveButton onClick={handleClearCart} style={{marginTop: '10px', backgroundColor: '#e74c3c'}}>Limpar Carrinho</RemoveButton>
              </ResumoPedido>
            )}
          </ModalContent>
        </ModalBackground>
      )}

      {showModalDetalhes && viewingProduct && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModalDetalhes}>✖</CloseButton>

            <>
              {viewingProduct.imagensComUrl && viewingProduct.imagensComUrl.length > 0 ? (
                <StyledSlider dots={true} infinite={false} speed={500} slidesToShow={1} slidesToScroll={1} arrows={true}>
                  {viewingProduct.imagensComUrl.map((imagem, index) => (
                    <div key={index}>
                      <img
                        src={`../` + imagem.caminhoArquivo.slice(22)}
                        alt={`Imagem ${index + 1}`}
                        onClick={() => setImagemSelecionada(`../${imagem.caminhoArquivo.slice(22)}`)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </StyledSlider>
              ) : (
                <p>Sem imagens para exibir.</p>
              )}
              <ProductName>{viewingProduct.nome}</ProductName>
              <ProductDescription>{viewingProduct.descDetalhada}</ProductDescription>
              <ProductPrice>R$ {viewingProduct.preco.toFixed(2)}</ProductPrice>
              <p><strong>Avaliação:</strong> ⭐ {viewingProduct.avaliacao}</p>
              <ButtonGroup>
                <ActionButton onClick={handleAddToCartNoModal}>Adicionar ao Carrinho 🛒</ActionButton>
                {addedMessage && <SuccessMessage>{addedMessage}</SuccessMessage>}
                <ActionButton onClick={handleBuyNoModal}>Comprar Agora 💳</ActionButton>
              </ButtonGroup>
            </>

          </ModalContent>
        </Modal>
      )}

      {imagemAmpliada && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setImagemAmpliada(null)} // Clica fora para fechar
        >
          <img
            src={imagemAmpliada}
            alt="Imagem ampliada"
            style={{
              Width: "90%",
              Height: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}
    </StyledMain>
  );
}

export default Principal;
