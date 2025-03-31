import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2330f003' fill-opacity='0.59' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 80px 40px;
  background-position: center;
`;

const Header = styled.div`
  width: 90%;
  height: 120px;
  background-color:#fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
  height: 90px;
  border-radius: 30px;
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
  margin-right:20px;
  cursor: pointer;
`;

const BotaoLogin = styled.button`
  background-color: #30f003;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const Container = styled.div`
   width: 90%;
   height: 70%;
  margin-top: 40px; 
  background: white;
  padding: 20px;
  border-radius: 10px;
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
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
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
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
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
  display: ${props => (props.show === "true" ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-radius: 5px;
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
  border-radius: 5px;
  transition: all 0.2s;

  &:hover {
    background: #cc0000;
  }
`;

const ResumoPedido = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
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
  border-radius: 8px;
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
  border-radius: 8px;
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
  border-radius: 5px;
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
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [frete, setFrete] = useState(null);
  const [valorFrete, setValorFrete] = useState(0);
  const [viewingProduct, setViewingProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/produto')
      .then(response => {
        setProdutos(response.data);
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
    const totalProdutos = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotal(totalProdutos + valorFrete);
  }, [carrinho, valorFrete]);

  const handleDetail = async (id) => {
    const selectedProduct = produtos.find(produto => produto.id === id);
    setProductDetails(selectedProduct);
    setViewingProduct(selectedProduct);
    setShowModal(true);
    setAddedMessage('');
    try {
      const imagens = await fetchImages(selectedProduct.id);
      setViewingProduct(prev => ({
        ...prev,
        imagens,
      }));
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFreteChange = (tipo) => {
    if (tipo === 'normal') {
      setValorFrete(10);
      setFrete('normal');
    } else if (tipo === 'rapida') {
      setValorFrete(20);
      setFrete('rapida');
    } else if (tipo === 'retirada') {
      setValorFrete(0);
      setFrete('retirada');
    }
  };

  const handleAddToCart = () => {
    setCarrinho(prevCarrinho => {
      const existingProductIndex = prevCarrinho.findIndex(item => item.id === productDetails.id);

      if (existingProductIndex !== -1) {
        const updatedCarrinho = [...prevCarrinho];
        updatedCarrinho[existingProductIndex].quantidade += 1;
        return updatedCarrinho;
      } else {
        return [...prevCarrinho, { ...productDetails, quantidade: 1 }];
      }
    });
    setAddedMessage('Produto adicionado ao carrinho!');
    setTimeout(() => setAddedMessage(''), 2000);
  };

  const handleBuy = () => {
    setCarrinho(prevCarrinho => {
      const existingProductIndex = prevCarrinho.findIndex(item => item.id === productDetails.id);

      if (existingProductIndex !== -1) {
        const updatedCarrinho = [...prevCarrinho];
        updatedCarrinho[existingProductIndex].quantidade += 1;
        return updatedCarrinho;
      } else {
        return [...prevCarrinho, { ...productDetails, quantidade: 1 }];
      }
    });
    setShowModal(false);
    setShowCarrinho(true);
  };

  const handleCarrinhoClick = () => {
    setShowCarrinho(!showCarrinho);
  };

  const handleIncreaseQuantity = (id) => {
    setCarrinho(prevCarrinho => {
      const updatedCarrinho = prevCarrinho.map(item => {
        if (item.id === id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      return updatedCarrinho;
    });
  };

  const handleRemoveUnit = (id) => {
    setCarrinho(prevCarrinho => {
      const updatedCarrinho = [...prevCarrinho];
      const existingProductIndex = updatedCarrinho.findIndex(item => item.id === id);
      if (existingProductIndex !== -1 && updatedCarrinho[existingProductIndex].quantidade > 1) {
        updatedCarrinho[existingProductIndex].quantidade -= 1;
      } else {
        updatedCarrinho.splice(existingProductIndex, 1);
      }
      return updatedCarrinho;
    });
  };

  const handleRemoveItem = (id) => {
    setCarrinho(prevCarrinho => prevCarrinho.filter(item => item.id !== id));
  };

  const handleClearCarrinho = () => {
    setCarrinho([]);
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
          <BotaoLogin>Login</BotaoLogin>
        </Usuario>
      </Header>
      <Container>
        <TopBar />
        <Cards>
          {produtos.map((produto) => (
            <CardP key={produto.id}>
              <NomeP>{produto.nome}</NomeP>
              <PrecoP>R$ {produto.preco.toFixed(2)}</PrecoP>
              <DetalheB onClick={() => handleDetail(produto.id)}>Ver Detalhes</DetalheB>
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
                <BotaoFinalizar>Finalizar Compra 💳</BotaoFinalizar>
              </ResumoPedido>
            )}
          </ModalContent>
        </ModalBackground>
      )}
      <ModalBackground show={showModal.toString()}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>✖</CloseButton>
          {productDetails && viewingProduct && (
            <>
              {viewingProduct.imagens && viewingProduct.imagens.length > 0 ? (
                <StyledSlider {...settings}>
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
              <ProductName>{productDetails.nome}</ProductName>
              <ProductDescription>{productDetails.descDetalhada}</ProductDescription>
              <ProductPrice>R$ {productDetails.preco.toFixed(2)}</ProductPrice>
              <p><strong>Avaliação:</strong> ⭐ {productDetails.avaliacao}</p>
              <ButtonGroup>
                <ActionButton onClick={handleAddToCart}>Adicionar ao Carrinho 🛒</ActionButton>
                {addedMessage && <SuccessMessage>{addedMessage}</SuccessMessage>}
                <ActionButton onClick={handleBuy}>Comprar Agora 💳</ActionButton>
              </ButtonGroup>
            </>
          )}
        </ModalContent>
      </ModalBackground>
    </StyledMain>
  );
}

export default Principal;
