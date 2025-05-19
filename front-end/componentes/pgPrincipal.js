import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from 'react';
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
  object-fit: contain;
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
  margin: 15px 0;
  margin-bottom: 30px;

  .slick-prev, .slick-next {
    z-index: 1;
    color: #333;
  }

  .slick-dots {
    bottom: -25px;
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: contain;
    border-radius: 8px;
  }
`;

function Principal() {
  const { user } = useAuth();
  const { setUser, setGrupo, setDados, dados, frete, setFrete, valorFrete, setValorFrete } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { carrinho, setCarrinho } = useAuth();
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [viewingProduct, setViewingProduct] = useState(null);
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/cadastro');
  };

  const handleRedirectPedidos = () => {
    router.push('/pedidos');
  }
  const handleRedirectL = () => {
    router.push('/login');
  };

  const handleRedirectPerfil = () => {
    router.push('/perfil');
  }

  const limparPedidosSalvos = () => {
  localStorage.removeItem("pedidosSalvos");
  alert("Todos os pedidos foram removidos do histórico local.");
};

  const handleFinalizarCompra = () => {
    if (!frete) {
      alert("Por favor, selecione uma opção de frete antes de finalizar a compra.");
      return;
    }

    router.push("/checkout");
    
  };

  useEffect(() => {
    axios.get('http://localhost:8081/produto')
      .then(async (response) => {
        const produtosComImagens = await Promise.all(response.data.map(async (produto) => {
          const imagens = await fetchImages(produto.id);


          const imagemPrincipal = imagens.find(img => img.principal) || imagens[0]; // Pega a principal ou a primeira disponível
          return {
            ...produto,
            imagemPrincipal: imagemPrincipal ? imagemPrincipal.caminhoArquivo : 'url_da_imagem_padrao.jpg',
          };
        }));
        setProdutos(produtosComImagens);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setCount(1);
      });
  }, []);

  const fetchImages = async (idProduto) => {
    try {
      const response = await fetch(`http://localhost:8081/imagens/${idProduto}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar imagens");
      }
      const imagens = await response.json();
      const caminhoBase = "http://localhost:8081/";
      const imagensComCaminho = imagens.map(imagem => ({
        ...imagem,
        url: `${caminhoBase}${imagem.caminho}`,
      }));
      return imagensComCaminho;
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      return [];
    }
  };

  useEffect(() => {
    // 1. Atualiza o total
    const totalProdutos = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotal(totalProdutos + valorFrete);

    // 2. Atualiza o localStorage
    const carrinhoKey = user ? `carrinho_${user.id}` : 'carrinho_guest';
    localStorage.setItem(carrinhoKey, JSON.stringify(carrinho));
  }, [carrinho, valorFrete, user]);


  const handleDetail = async (produto) => {

    setAddedMessage('');
    const imagens = await fetchImages(produto.id); // Busca as imagens antes de atualizar o estado

    setViewingProduct({
      ...produto,
      imagens,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {

    setShowModal(false);
  };

  const handleFreteChange = (tipo) => {
    let valor = 0;
    if (tipo === 'normal') {
      valor = 10;
    } else if (tipo === 'rapida') {
      valor = 20;
    } else if (tipo === 'retirada') {
      valor = 0;
    }

    setValorFrete(valor);
    setFrete(tipo);

    localStorage.setItem("frete", JSON.stringify(tipo));
    localStorage.setItem("valorFrete", JSON.stringify(valor));

  };

  const handleAddToCart = () => {
    setCarrinho(prevCarrinho => {
      const existingProductIndex = prevCarrinho.findIndex(item => item.id === viewingProduct.id);

      if (existingProductIndex !== -1) {
        return prevCarrinho.map((item, index) =>
          index === existingProductIndex ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...viewingProduct, quantidade: 1 }];
      }
    });

    setAddedMessage('Produto adicionado ao carrinho!');
    setTimeout(() => setAddedMessage(''), 2000);
  };

  const handleBuy = () => {
    setCarrinho(prevCarrinho => {
      const existingProductIndex = prevCarrinho.findIndex(item => item.id === viewingProduct.id);

      let updatedCarrinho;
      if (existingProductIndex !== -1) {
        // Se o produto já existe, incrementa a quantidade
        updatedCarrinho = [...prevCarrinho];
        updatedCarrinho[existingProductIndex].quantidade += 1;
      } else {
        // Se o produto não existe, adiciona-o com quantidade 1
        updatedCarrinho = [...prevCarrinho, { ...viewingProduct, quantidade: 1 }];
      }

      // Salva o carrinho atualizado no localStorage
      localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));

      return updatedCarrinho;
    });

    setShowModal(false);
    setShowCarrinho(true);
  };


  const handleCarrinhoClick = () => {
    setShowCarrinho(!showCarrinho);
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosSalvos")) || [];
    console.log(pedidosSalvos);
  };

  const handleIncreaseQuantity = (id) => {
    setCarrinho(prevCarrinho =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const handleRemoveUnit = (id) => {
    setCarrinho(prevCarrinho => {
      const updatedCarrinho = prevCarrinho.map(item => {
        if (item.id === id && item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      }).filter(item => item.quantidade > 0); // Remove qualquer produto com quantidade 0

      // Salva o carrinho atualizado no localStorage
      localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
      return updatedCarrinho;
    });
  };


  const handleRemoveItem = (id) => {
    setCarrinho(prevCarrinho => {
      const updatedCarrinho = prevCarrinho.filter(item => item.id !== id);

      // Salva o carrinho atualizado no localStorage
      localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
      return updatedCarrinho;
    });
  };

  const handleClearCarrinho = () => {
    setCarrinho([]);

    // Limpa o carrinho do localStorage
    localStorage.removeItem("carrinho");
  };

  const handleLogout = () => {
    // Armazenando carrinho de visitante (caso o usuário queira retornar depois)
    localStorage.setItem('carrinho_guest', JSON.stringify(carrinho));

    localStorage.removeItem("user"); // limpa o localStorage
    setUser(null); // limpa o estado
    setGrupo(null);
    setDados(null);
    setCarrinho([]); // Limpa o carrinho no estado

    // Redireciona ou recarrega a página
    window.location.reload();
  };




  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <StyledMain>
        
      <GlobalStyle />
      <Header>
        <Logo src="imagens/logo.png" alt="Logo" />
        <Titulo>Turn on the beck</Titulo>
        <Usuario>
          <Carrinho title="Carrinho" onClick={handleCarrinhoClick}>🛒</Carrinho>
          <UserSection>
            {user ? (
              <>
                <UserGreeting>
                  <UserName>{dados.nome || 'Usuário'}</UserName>
                </UserGreeting>
                <ButtonsContainer>
                  <UserButton onClick={handleRedirectPerfil}>Perfil</UserButton>
                  <UserButton $primary onClick={handleLogout}>Sair</UserButton>
                </ButtonsContainer>
              </>
            ) : (
              <>
                
                <ButtonsContainerN>
                  <UserButtonN onClick={handleRedirectL}>Login</UserButtonN>
                  <UserButtonN $primary onClick={handleRedirect}>Cadastrar</UserButtonN>
                  <UserButtonN onClick={handleRedirectPedidos}>Meus Pedidos</UserButtonN>
                </ButtonsContainerN>
              </>
            )}
          </UserSection>

        </Usuario>
      </Header>
      <Container>
        <TopBar />
        <Cards>
          {produtos.map((produto) => (
            <CardP key={produto.id}>
              <NomeP>{produto.nome}</NomeP>
              <PrecoP>R$ {produto.preco.toFixed(2)}</PrecoP>
              <ImgProduto src={produto.imagemPrincipal.slice(22)}></ImgProduto>
              <DetalheB onClick={() => handleDetail(produto)}>Ver Detalhes</DetalheB>
            </CardP>
          ))}
        </Cards>
      </Container>
      {showCarrinho && (
        <ModalBackground show={showCarrinho.toString()}>
          <ModalContent>
            <CloseButton onClick={() => setShowCarrinho(false)}>✖</CloseButton>
            <CarrinhoTitle>🛒 Carrinho de Compras</CarrinhoTitle>
            <CarrinhoList>
              {carrinho.length === 0 ? (
                <p>O carrinho está vazio</p>
              ) : (
                carrinho.map((item, index) => (
                  <CarrinhoItem key={index}>
                    <ItemInfo>
                      <div>
                        <ItemName>{item.nome}</ItemName>
                        <ItemPrice>R$ {item.preco.toFixed(2)}</ItemPrice>
                      </div>
                    </ItemInfo>
                    <QuantityControls>
                      <QuantityButton onClick={() => handleIncreaseQuantity(item.id)}>+</QuantityButton>
                      {item.quantidade}
                      <QuantityButton onClick={() => handleRemoveUnit(item.id)}>-</QuantityButton>
                    </QuantityControls>
                    <RemoveButton onClick={() => handleRemoveItem(item.id)}>🗑️</RemoveButton>
                  </CarrinhoItem>
                ))
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

                <Total>Total: R$ {total.toFixed(2)}</Total>
                <BotaoFinalizar onClick={handleFinalizarCompra}>Finalizar Compra 💳</BotaoFinalizar>
              </ResumoPedido>
            )}
          </ModalContent>
        </ModalBackground>
      )}

      {showModal && viewingProduct && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>✖</CloseButton>

            <>
              {viewingProduct.imagens && viewingProduct.imagens.length > 0 ? (
                <StyledSlider dots={true} infinite={false} speed={500} slidesToShow={2} slidesToScroll={1}>
                  {viewingProduct.imagens.map((imagem, index) => (
                    <div key={index}>
                      <img
                        src={`../` + imagem.caminhoArquivo.slice(22)}
                        alt={`Imagem ${index + 1}`}
                        style={{ width: "100px", height: "auto", maxHeight: "300px", objectFit: "contain" }}

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
                <ActionButton onClick={handleAddToCart}>Adicionar ao Carrinho 🛒</ActionButton>
                {addedMessage && <SuccessMessage>{addedMessage}</SuccessMessage>}
                <ActionButton onClick={handleBuy}>Comprar Agora 💳</ActionButton>
              </ButtonGroup>
            </>

          </ModalContent>
        </Modal>
      )}
    </StyledMain>
  );
}

export default Principal;
