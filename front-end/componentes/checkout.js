import { useAuth } from "./authContext";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
`;

const StyledCheckout = styled.div`
   background: 
    radial-gradient(ellipse at top, rgba(48, 240, 3, 0.6) -5%, rgba(18, 60, 7, 0.95) 70%),
    repeating-linear-gradient(45deg, rgba(18, 60, 7, 0.15) 0px, rgba(18, 60, 7, 0.15) 10px, rgba(48, 240, 3, 0.1) 10px, rgba(48, 240, 3, 0.1) 20px);
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 30px 0;
`;

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  background-color: #f0f0f0;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  color: rgb(22, 77, 9);
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 700;
  border-bottom: 2px solid #28c702;
  padding-bottom: 10px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: rgb(22, 77, 9);
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
  width: 100%;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarrinhoList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
`;

const CarrinhoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  border-bottom: 1px solid #e5e5e5;
  background-color: white;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5fff5;
  }
`;

const ItemName = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: rgb(22, 77, 9);
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #28c702;
  font-weight: 500;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`;

const SummaryContainer = styled.div`
  background-color: #f5fff5;
  border-radius: 30px;
  padding: 15px;
  border: 1px solid #28c702;
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 15px;
  color: rgb(22, 77, 9);
  
  &:not(:last-child) {
    border-bottom: 1px dashed #e0e0e0;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: rgb(22, 77, 9);
  margin-top: 10px;
  padding-top: 10px;
  border-top: 2px solid #28c702;
`;

// Grid para endereços
const EnderecosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EnderecoCard = styled.div`
  border: ${props => props.selected ? "2px solid #28c702" : "1px solid #e0e0e0"};
  padding: 12px;
  background-color: ${props => props.isPadrao ? "#f0fff0" : "white"};
  border-radius: 30px;
  transition: all 0.2s;
  cursor: pointer;
  height: 140px;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    border-color: #28c702;
    box-shadow: 0 2px 8px rgba(40, 199, 2, 0.15);
  }
`;

const EnderecoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const EnderecoRadio = styled.input`
  margin-right: 10px;
  accent-color: #28c702;
`;

const EnderecoContent = styled.div`
  font-size: 14px;
  color: rgb(22, 77, 9);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EnderecoLine = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PadraoTag = styled.span`
  background-color: #28c702;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 50px;
  margin-left: 8px;
  font-weight: 500;
`;

const CheckoutButton = styled.button`
  background-color: rgb(22, 77, 9);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.2s;
  width: 100%;
  box-shadow: 0 4px 6px rgba(40, 199, 2, 0.2);

  &:hover {
    background-color: #28c702;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyCartMessage = styled.p`
  color: #777;
  font-size: 15px;
  text-align: center;
  padding: 20px;
`;

const SectionContainer = styled.div`
  margin-bottom: 25px;
`;

// Componentes para formas de pagamento
const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const PaymentMethodTabs = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const PaymentTab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: ${props => props.$active ? '3px solid #28c702' : '3px solid transparent'};
  color: ${props => props.$active ? 'rgb(22, 77, 9)' : '#777'};
  font-weight: ${props => props.$active ? '600' : '400'};  
  transition: all 0.2s;
  
  &:hover {
    color: rgb(22, 77, 9);
  }
`;

const PaymentForm = styled.div`
  padding: 15px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  color: rgb(22, 77, 9);
  margin-bottom: 5px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 50px;
  font-size: 14px;
  transition: border 0.2s;
  
  &:focus {
    outline: none;
    border-color: #28c702;
    box-shadow: 0 0 0 2px rgba(40, 199, 2, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 50px;
  font-size: 14px;
  background-color: white;
  transition: border 0.2s;
  
  &:focus {
    outline: none;
    border-color: #28c702;
    box-shadow: 0 0 0 2px rgba(40, 199, 2, 0.1);
  }
`;

const CardInputsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 1px dashed #28c702;
  border-radius: 50px;
  background-color: #f9f9f9;
`;

const QRCodePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  background-color: #e9e9e9;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  padding: 10px;
`;

const QRCodeInfo = styled.p`
  font-size: 14px;
  color: rgb(22, 77, 9);
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
`;

const BoletoInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px dashed #28c702;
  border-radius: 50px;
  background-color: #f9f9f9;
`;

const BoletoButton = styled.button`
  background-color: #28c702;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.2s;
  align-self: center;
  
  &:hover {
    background-color: rgb(22, 77, 9);
  }
`;

const Checkout = () => {
  const { user, carrinho, setCarrinho, frete, setFrete, dados, valorFrete, setValorFrete } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [resposta, setResposta] = useState(null);
  const router = useRouter();
  

  // Estados para campos do cartão
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardInstallments, setCardInstallments] = useState('1');

  // Calcular total dos produtos
  const totalProdutos = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  const totalGeral = totalProdutos + valorFrete;

  // Carregar os endereços de entrega do usuário
  const fetchEnderecos = async () => {
    try {
      const response = await fetch(`http://localhost:8081/endereco/${dados.id}`);
      if (!response.ok) throw new Error("Erro ao buscar endereços");
      const enderecosCliente = await response.json();
      const enderecosEntrega = enderecosCliente.filter(end => end.faturamento === false);
      setEnderecos(enderecosEntrega);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  };

  const handleFinalizarCompra = async () => {
    if (!enderecoSelecionado) {
      alert("Por favor, selecione um endereço de entrega");
      return;
    }

    // Validação de cartão
    if (paymentMethod === 'cartao') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        alert("Por favor, preencha todos os dados do cartão");
        return;
      }
    }

    const produtosFormatados = carrinho.map((produto) => ({
      idProduto: produto.id,
      nomeProduto: produto.nome,
      quantidade: produto.quantidade,
      precoUnitario: produto.preco
    }));

    const pedido = {
      idCliente: dados.id,
      dataPedido: new Date(),
      status: "AGUARDANDO_PAGAMENTO",
      valor: totalGeral,
      produtos: produtosFormatados
    };

    try {
      const response = await fetch("http://localhost:8081/pedidos/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro desconhecido ao criar o pedido");
      }

      const data = await response.json();
      setResposta(data);

      handleClearCarrinho();
      alert(`Pedido realizado com sucesso! Número do pedido: ${data.numero} \n Visite "Meus pedidos" no perfil para visualisar suas compras`);
      handleRedirect();
      
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert(`Não foi possível finalizar o pedido: ${error.message}`);
    }
  };

  const handleRedirect = () => {
    router.push('/pgPrincipal');
  }

  const handleClearCarrinho = () => {
    setCarrinho([]);

    // Limpa o carrinho do localStorage
    localStorage.removeItem("carrinho");
  };

  // Formatação do número do cartão
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = [];

    for (let i = 0; i < digits.length && i < 16; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }

    return groups.join(' ');
  };

  // Formatação da data de validade
  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardExpiry(formatted);
  };

  const handleCVVChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    console.log(carrinho);
    setCardCVV(digits.slice(0, 3));
  };

  useEffect(() => {
    if (user) {
      fetchEnderecos();
    }
  }, [user]);

  useEffect(() => {
    const padrao = enderecos.find(end => end.padrao);
    if (padrao) {
      setEnderecoSelecionado(padrao);
    }
  }, [enderecos]);

  // Ordenar endereços para que o padrão apareça primeiro
  const enderecosOrdenados = [...enderecos].sort((a, b) => {
    if (a.padrao) return -1;
    if (b.padrao) return 1;
    return 0;
  });

  const BotaoIrParaEndereco = () => {
    return (
      <a href="/perfil?tab=enderecos">
        <CheckoutButton>Adicionar Endereço</CheckoutButton>
      </a>
    );
  };

  return (
    <StyledCheckout>
      <GlobalStyle />
      <CheckoutContainer>
        <PageTitle>Finalizar Compra</PageTitle>

        <TwoColumnLayout>
          <ColumnSection>
            <SectionContainer>
              <SectionTitle>Itens do Carrinho</SectionTitle>
              <CarrinhoList>
                {carrinho.length === 0 ? (
                  <EmptyCartMessage>Seu carrinho está vazio</EmptyCartMessage>
                ) : (
                  carrinho.map((item, index) => (
                    <CarrinhoItem key={index}>
                      <ItemInfo>
                        <div>
                          <ItemName>{item.nome}</ItemName>
                          <ItemPrice>R$ {item.preco.toFixed(2)} x {item.quantidade}</ItemPrice>
                        </div>
                      </ItemInfo>
                    </CarrinhoItem>
                  ))
                )}
              </CarrinhoList>
            </SectionContainer>

            <SectionContainer>
              <SectionTitle>Endereço de Entrega</SectionTitle>
              {enderecos.length === 0 ? (
                <EmptyCartMessage>Nenhum endereço de entrega cadastrado.</EmptyCartMessage>
              ) : (
                <EnderecosGrid>
                  {enderecosOrdenados.map((endereco, index) => (
                    <EnderecoCard
                      key={index}
                      selected={enderecoSelecionado?.id === endereco.id}
                      $selected={true} $isPadrao={endereco.padrao}
                      onClick={() => setEnderecoSelecionado(endereco)}
                    >
                      <EnderecoHeader>
                        <EnderecoRadio
                          type="radio"
                          name="endereco"
                          value={endereco.id}
                          checked={enderecoSelecionado?.id === endereco.id}
                          onChange={() => setEnderecoSelecionado(endereco)}
                        />
                        {endereco.padrao && <PadraoTag>Padrão</PadraoTag>}
                      </EnderecoHeader>
                      <EnderecoContent>
                        <EnderecoLine>{endereco.logradouro}, {endereco.numero}</EnderecoLine>
                        <EnderecoLine>{endereco.bairro}</EnderecoLine>
                        <EnderecoLine>{endereco.cidade}/{endereco.uf}</EnderecoLine>
                        <EnderecoLine>CEP: {endereco.cep}</EnderecoLine>
                      </EnderecoContent>
                    </EnderecoCard>
                  ))}
                  <BotaoIrParaEndereco/>
                </EnderecosGrid>
              )}
            </SectionContainer>

            {/* Seção de formas de pagamento */}
            <SectionContainer>
              <SectionTitle>Forma de Pagamento</SectionTitle>
              <PaymentMethodsContainer>
                <PaymentMethodTabs>
                  <PaymentTab
                    $active={paymentMethod === 'cartao'}
                    onClick={() => setPaymentMethod('cartao')}
                  >
                    Cartão de Crédito
                  </PaymentTab>
                  <PaymentTab
                    $active={paymentMethod === 'boleto'}
                    onClick={() => setPaymentMethod('boleto')}
                  >
                    Boleto
                  </PaymentTab>
                  <PaymentTab
                    $active={paymentMethod === 'pix'}
                    onClick={() => setPaymentMethod('pix')}
                  >
                    PIX
                  </PaymentTab>
                </PaymentMethodTabs>

                <PaymentForm>
                  {paymentMethod === 'cartao' && (
                    <>
                      <FormGroup>
                        <FormLabel>Número do Cartão</FormLabel>
                        <FormInput
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Nome no Cartão</FormLabel>
                        <FormInput
                          type="text"
                          placeholder="Como aparece no cartão"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </FormGroup>

                      <CardInputsRow>
                        <FormGroup>
                          <FormLabel>Data de Validade</FormLabel>
                          <FormInput
                            type="text"
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            maxLength={5}
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel>CVV</FormLabel>
                          <FormInput
                            type="text"
                            placeholder="123"
                            value={cardCVV}
                            onChange={handleCVVChange}
                            maxLength={3}
                          />
                        </FormGroup>
                      </CardInputsRow>

                      <FormGroup>
                        <FormLabel>Parcelas</FormLabel>
                        <FormSelect
                          value={cardInstallments}
                          onChange={(e) => setCardInstallments(e.target.value)}
                        >
                          <option value="1">1x de R$ {totalGeral.toFixed(2)} sem juros</option>
                          <option value="2">2x de R$ {(totalGeral / 2).toFixed(2)} sem juros</option>
                          <option value="3">3x de R$ {(totalGeral / 3).toFixed(2)} sem juros</option>
                          <option value="4">4x de R$ {(totalGeral / 4).toFixed(2)} sem juros</option>
                          <option value="5">5x de R$ {(totalGeral / 5).toFixed(2)} sem juros</option>
                          <option value="6">6x de R$ {(totalGeral / 6).toFixed(2)} sem juros</option>
                        </FormSelect>
                      </FormGroup>
                    </>
                  )}

                  {paymentMethod === 'boleto' && (
                    <BoletoInfo>
                      <p>Ao finalizar a compra, você receberá o boleto para pagamento.</p>
                      <p>O prazo de entrega começa a contar a partir da confirmação do pagamento.</p>
                      <p>O boleto tem vencimento em 3 dias úteis.</p>
                      <BoletoButton>Gerar Boleto</BoletoButton>
                    </BoletoInfo>
                  )}

                  {paymentMethod === 'pix' && (
                    <QRCodeContainer>
                      <QRCodePlaceholder>
                        QR Code do PIX será gerado ao finalizar o pedido
                      </QRCodePlaceholder>
                      <QRCodeInfo>
                        Faça o pagamento instantâneo com PIX
                      </QRCodeInfo>
                      <QRCodeInfo>
                        Após finalizar o pedido, escaneie o QR Code com o app do seu banco
                      </QRCodeInfo>
                    </QRCodeContainer>
                  )}
                </PaymentForm>
              </PaymentMethodsContainer>
            </SectionContainer>
          </ColumnSection>

          {/* Coluna do resumo */}
          <ColumnSection>
            <SectionTitle>Resumo do Pedido</SectionTitle>
            {carrinho.length > 0 ? (
              <SummaryContainer>
                <SummaryRow>
                  <span>Subtotal:</span>
                  <span>R$ {totalProdutos.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Frete ({frete}):</span>
                  <span>R$ {valorFrete.toFixed(2)}</span>
                </SummaryRow>
                <Total>
                  <span>Total:</span>
                  <span>R$ {totalGeral.toFixed(2)}</span>
                </Total>

                <CheckoutButton onClick={handleFinalizarCompra}>
                  Finalizar Pedido
                </CheckoutButton>
              </SummaryContainer>
            ) : (
              <SummaryContainer>
                <EmptyCartMessage>Adicione produtos ao carrinho</EmptyCartMessage>
              </SummaryContainer>
            )}
          </ColumnSection>
        </TwoColumnLayout>
      </CheckoutContainer>
    </StyledCheckout>
  );
};

export default Checkout;