import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from 'react';
import axios from 'axios';

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
`;

const CardP = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
`;

const NomeP = styled.h3`
  font-size: 18px;
`;

const PrecoP = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const DetalheB = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show === "true" ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const CarrinhoTitle = styled.h3`
  margin-bottom: 10px;
`;

const CarrinhoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CarrinhoItem = styled.li`
  padding: 5px 0;
`;


const Botao = styled.button`
    padding: 5px 10px;
    margin-left: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
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

    useEffect(() => {
        axios.get('http://localhost:8081/produto')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    }, []);

    useEffect(() => {
        const totalProdutos = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        setTotal(totalProdutos + valorFrete);
    }, [carrinho, valorFrete]);

    const handleDetail = (id) => {
        const selectedProduct = produtos.find(produto => produto.id === id);
        setProductDetails(selectedProduct);
        setShowModal(true);
        setAddedMessage(''); 
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

    return (
        <StyledMain>
            <GlobalStyle />
            <Header>
                <Logo src="imagem/logo.png" alt="Logo" />
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
                            <PrecoP>R$ {produto.preco}</PrecoP>
                            <DetalheB onClick={() => handleDetail(produto.id)}>
                                Detalhes
                            </DetalheB>
                        </CardP>
                    ))}
                </Cards>
            </Container>
            {showCarrinho && (
                <ModalBackground show={showCarrinho.toString()}>
                    <ModalContent>
                        <CarrinhoTitle>Carrinho</CarrinhoTitle>
                        <CarrinhoList>
                            {carrinho.length === 0 ? (
                                <ul><li>O carrinho está vazio</li></ul>
                            ) : (
                                carrinho.map((item, index) => (
                                    <CarrinhoItem key={index}>
                                        {item.nome} - R$ {item.preco} x {item.quantidade}
                                        <Botao onClick={() => handleIncreaseQuantity(item.id)}>+</Botao>
                                        <Botao onClick={() => handleRemoveUnit(item.id)}>-</Botao>
                                        <Botao onClick={() => handleRemoveItem(item.id)}>Limpar</Botao>
                                    </CarrinhoItem>
                                ))
                            )}
                        </CarrinhoList>
                        {carrinho.length !== 0 && (
                            <>
                                <h4>Selecione o tipo de frete:</h4>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={frete === 'normal'}
                                            onChange={() => handleFreteChange('normal')}
                                        />
                                        Frete Normal - R$10,00
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={frete === 'rapida'}
                                            onChange={() => handleFreteChange('rapida')}
                                        />
                                        Frete Rápida - R$20,00
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={frete === 'retirada'}
                                            onChange={() => handleFreteChange('retirada')}
                                        />
                                        Retirada na Loja - Grátis
                                    </label>
                                </div>
                            </>
                        )}
                        <h3>Total: R$ {total.toFixed(2)}</h3>
                        <Botao onClick={() => setShowCarrinho(false)}>Fechar</Botao>
                        <Botao onClick={handleClearCarrinho}>Limpar Carrinho</Botao>
                    </ModalContent>
                </ModalBackground>
            )}
            {/* Detalhes do Produto Modal */}
            <ModalBackground show={showModal.toString()}>
                <ModalContent>
                    {productDetails && (
                        <>
                            <h2>{productDetails.nome}</h2>
                            <p><strong>Descrição:</strong> {productDetails.descDetalhada}</p>
                            <p><strong>Preço:</strong> R$ {productDetails.preco}</p>
                            <p><strong>Avaliação:</strong> {productDetails.avaliacao}</p>
                            <Botao onClick={handleAddToCart}>Adicionar ao Carrinho</Botao>
                            <p>{addedMessage}</p>
                            <Botao onClick={handleBuy}>Comprar</Botao>
                            <Botao onClick={handleCloseModal}>Fechar</Botao>
                        </>
                    )}
                </ModalContent>
            </ModalBackground>

        </StyledMain>
    );
}

export default Principal;
