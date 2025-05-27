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

// ... (todos os seus styled-components permanecem os mesmos até StepsContainer)

const StyledCheckout = styled.div`
   background: 
    radial-gradient(ellipse at top, rgba(48, 240, 3, 0.6) -5%, rgba(18, 60, 7, 0.95) 70%),
    repeating-linear-gradient(45deg, rgba(18, 60, 7, 0.15) 0px, rgba(18, 60, 7, 0.15) 10px, rgba(48, 240, 3, 0.1) 10px, rgba(48, 240, 3, 0.1) 20px);
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
 
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 3px;
  color: #333;
`;

const Field = styled.div`
  margin-bottom: 8px;
  flex: ${props => props.flex || 1};
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
  display: flex;
  justify-content: center;
  color: rgb(22, 77, 9);
  font-size: 18px;
  margin-bottom: 15px;
  /* margin-left: 175px; // REMOVER OU AJUSTAR ESSA MARGEM ESQUERDA FIXA */
  font-weight: 600;
  width: 100%; // Garantir que o título possa se centralizar
  text-align: center; // Adicionar para centralizar o texto dentro do h2
`;

const SectionTitleP = styled(SectionTitle)``; // Herda os estilos de SectionTitle, incluindo centralização
const SectionTitleC = styled(SectionTitle)``; // Herda os estilos de SectionTitle

// Componentes para formas de pagamento
const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // Ocupar a largura disponível da ColumnSection
  max-width: 600px; // Adicionar um max-width para melhor controle em telas largas
  margin: 0 auto 20px auto; // Centralizar o container e adicionar margem inferior
  /* margin-left: 175px; // REMOVER OU AJUSTAR */
`;

const PaymentMethodTabs = styled.div`
  display: flex;
  justify-content: center; // Centralizar as abas
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  width: 100%; // Ocupar a largura do PaymentMethodsContainer
`;

const PaymentTab = styled.div`
  padding: 10px 15px; // Aumentar um pouco o padding horizontal
  /* margin-left: 110px; // REMOVER MARGIN-LEFT FIXA */
  cursor: pointer;
  border-bottom: ${props => props.$active ? '3px solid #28c702' : '3px solid transparent'};
  color: ${props => props.$active ? 'rgb(22, 77, 9)' : '#777'};
  font-weight: ${props => props.$active ? '600' : '400'};  
  transition: all 0.2s;
  text-align: center; // Centralizar texto dentro da aba
  flex-grow: 1; // Fazer as abas ocuparem espaço igualmente se desejar
  max-width: 180px; // Limitar a largura de cada aba

  &:hover {
    color: rgb(22, 77, 9);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #28c702;
    box-shadow: 0 0 0 2px rgba(48, 240, 3, 0.2);
  }
`;

const CarrinhoList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  /* margin-left: 315px; // REMOVER OU AJUSTAR */
  width: 100%; // Ocupar largura disponível
  max-width: 500px; // Definir uma largura máxima para melhor visualização
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  margin-bottom: 20px; // Adicionar margem inferior
`;

const SummaryContainer = styled.div`
  background-color: #f5fff5;
  border-radius: 30px;
  padding: 15px;
  border: 1px solid #28c702;
  height: fit-content;
  width: 100%; // Ocupar largura disponível
  max-width: 500px; // Definir uma largura máxima
  /* position: sticky; // Pode remover se não for mais necessário na lateral */
  /* margin-left: 375px; // REMOVER OU AJUSTAR */
  /* top: 20px; // Pode remover se não for mais sticky */
  margin-bottom: 30px; // Adicionar margem para o botão
`;


const CheckoutButtonF = styled.button`
  display: flex;
  /* position: absolute; // REMOVER SE NÃO FOR POSICIONAMENTO ABSOLUTO */
  justify-content: center;
  align-items: center; // Para alinhar o texto verticalmente se necessário
  background-color: rgb(22, 77, 9);
  color: white;
  border: none;
  padding: 12px 25px; // Ajustar padding
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px; // Ajustar margem superior
  /* margin-left: 1002px; // REMOVER MARGIN-LEFT FIXA */
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(40, 199, 2, 0.2);
  width: auto; // Deixar o botão se ajustar ao conteúdo
  min-width: 250px; // Dar uma largura mínima

  &:hover {
    background-color: #28c702;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Verifique também o TwoColumnLayout e ColumnSection:
const TwoColumnLayout = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 350px; // Removido ou ajustado se não houver coluna lateral */
  grid-template-columns: 1fr; // Se for sempre uma coluna
  gap: 20px;
  width: 100%;
`;

const ColumnSection = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-column: 1 / -1; // Não é necessário se TwoColumnLayout for 1fr */
  width: 100%; // Garante que ocupe a largura do container
  align-items: center; // Centralizar o conteúdo da etapa atual
`;

// E o StepNavigation para que os botões fiquem bem posicionados
const StepNavigation = styled.div`
  display: flex;
  justify-content: space-between; // Mantém "Voltar" à esquerda e "Continuar" à direita
  width: 100%;
  max-width: 600px; // Ou a largura que fizer sentido para seu layout
  margin: 40px auto 20px auto; // Aumentar margem superior, centralizar, margem inferior
  padding: 0 10px; // Um pequeno padding para não colar nas bordas em telas menores

  /* Se houver apenas um botão (ex: apenas "Continuar"),
     e você quiser que ele fique à direita, você pode precisar de lógica condicional
     ou um wrapper extra, mas 'space-between' geralmente funciona bem
     mesmo com um filho se o outro estiver ausente.
     Se o botão "Continuar" estiver sozinho e aparecer no meio, e você o quiser à direita:
  */
  & > button:only-child { // Se houver apenas um botão filho
    margin-left: auto; // Empurra para a direita
  }
`;

const CarrinhoListR = styled.ul`
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



const SummaryContainerR = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); // Mais responsivo
  gap: 20px; // Aumentar o gap um pouco
  width: 100%;
  max-width: 900px; // Definir uma largura máxima para a grid
  margin: 20px auto; // Centralizar a grid e adicionar margem vertical
  /* margin-left: 195px; // REMOVER */
`;

const EnderecoCard = styled.div`
  border: ${props => props.selected ? "2px solid #28c702" : "1px solid #e0e0e0"};
  padding: 15px; // Um pouco mais de padding
  background-color: ${props => props.$isPadrao ? "#f0fff0" : "white"};
  border-radius: 15px; // Reduzir um pouco o border-radius para um look mais clean
  transition: all 0.2s;
  cursor: pointer;
  min-height: 150px; // Altura mínima para consistência
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Para espaçar o conteúdo e o rádio/tag
  position: relative; // Mantido para o caso de elementos posicionados internamente
  
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
  display: flex;
  /* position: absolute; // REMOVER POSICIONAMENTO ABSOLUTO */
  justify-content: center;
  align-items: center;
  background-color: rgb(22, 77, 9);
  color: white;
  border: none;
  padding: 10px 20px; // Ajustar padding
  font-size: 15px; // Ajustar tamanho da fonte
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  margin: 20px auto 0 auto; // Centralizar o botão e adicionar margem superior
  /* margin-left: 292px; // REMOVER */
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(40, 199, 2, 0.2);
  min-width: 200px; // Largura mínima

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
  padding-bottom: 32px;
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
  justify-content: center;
  justify-items: center;
  justify-self: center;
  align-self: center;
  align-items: center;
  padding: 15px;
  padding-bottom: 242px;
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

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-around; /* Ajustado para distribuir melhor 3 itens */
  margin-bottom: 30px;
  position: relative;
`;

const StepLine = styled.div`
  position: absolute;
  top: 25px;
  left: 15%; /* Ajustado para 3 etapas */
  right: 15%; /* Ajustado para 3 etapas */
  height: 3px;
  background-color: #e0e0e0;
  z-index: 1;
`;

const StepLineProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #28c702;
  width: ${props => { // Mude aqui
    switch (props.$currentStep) { // <<<< Use $currentStep
      case 2: return '0%';
      case 3: return '50%';
      case 4: return '100%';
      default: return '0%';
    }
  }};
  transition: width 0.3s ease;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 30%; /* Ajustado para 3 etapas */
`;

const StepCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#28c702' : props.$completed ? '#28c702' : '#e0e0e0'}; {/* <<<< $active, $completed */}
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 0 10px rgba(40, 199, 2, 0.5)' : 'none'}; {/* <<<< $active */}
`;

const StepText = styled.span`
  color: ${props => props.$active ? 'rgb(22, 77, 9)' : props.$completed ? 'rgb(22, 77, 9)' : '#777'}; {/* <<<< $active, $completed */}
  font-weight: ${props => props.$active || props.$completed ? '600' : '400'}; {/* <<<< $active, $completed */}
  font-size: 14px;
  text-align: center;
`;


const StepButton = styled.button`
  background-color: ${props => props.back ? 'white' : 'rgb(22, 77, 9)'};
  color: ${props => props.back ? 'rgb(22, 77, 9)' : 'white'};
  border: ${props => props.back ? '1px solid rgb(22, 77, 9)' : 'none'};
  padding: 12px 25px; // Aumentar um pouco o padding para melhor toque
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px; // Garantir uma largura mínima para os botões
  text-align: center; // Garantir que o texto dentro do botão esteja centralizado

  &:hover {
    background-color: ${props => props.back ? '#f5f5f5' : '#28c702'};
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Adicionar uma leve sombra no hover
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
    border-color: #e0e0e0; // Para o botão 'back' desabilitado
  }

  
`;


// Modal de resumo do pedido
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  position: relative;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  color: rgb(22, 77, 9);
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #28c702;
  padding-bottom: 10px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: rgb(22, 77, 9);
`;

const ModalSection = styled.div`
  margin-bottom: 20px;
`;

const ModalSectionTitle = styled.h3`
  color: rgb(22, 77, 9);
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Error = styled.span`
  color: #e53935;
  font-size: 12px;
  margin-top: 2px;
  display: block;
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Checkout = () => {
  const { user, carrinho, setCarrinho, frete, valorFrete, dados } = useAuth(); // Removido setFrete, setValorFrete se não forem usados aqui
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cartão de Crédito');
  const [resposta, setResposta] = useState(null);
  const router = useRouter();
  const [novoEndereco, setNovoEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    padrao: false // Usuário logado pode querer cadastrar um novo não padrão
  });

  const [errors, setErrors] = useState({
    endereco: {},
    pagamento: {} // Adicionado para erros de pagamento
  });

  // Estados para campos do cartão
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [currentStep, setCurrentStep] = useState(2); // Inicia na etapa de Endereço
  const [cardInstallments, setCardInstallments] = useState('1');
  const [showModal, setShowModal] = useState(false);

  // Calcular total dos produtos
  const totalProdutos = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  const totalGeral = totalProdutos + valorFrete;

  // Carregar os endereços de entrega do usuário
  const fetchEnderecos = async () => {
    if (!dados || !dados.id) {
    console.warn("fetchEnderecos: dados ou dados.id ainda não disponíveis. Abortando fetch."); // Mude para warn ou log
    return;
  }
    try {
      const response = await fetch(`http://localhost:8081/endereco/${dados.id}`);
      if (!response.ok) throw new Error("Erro ao buscar endereços");
      const enderecosCliente = await response.json();
      const enderecosEntrega = enderecosCliente.filter(end => end.faturamento === false);
      setEnderecos(enderecosEntrega);
      const padrao = enderecosEntrega.find(end => end.padrao);
      if (padrao) {
        setEnderecoSelecionado(padrao);
      } else if (enderecosEntrega.length > 0) {
        setEnderecoSelecionado(enderecosEntrega[0]); // Seleciona o primeiro se não houver padrão
      }
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  };

  useEffect(() => {
     if (dados && dados.id) { // Adicione esta verificação AQUI
    fetchEnderecos();
  }
  }, [dados]); // Depender de `dados` para refazer o fetch se `dados` mudar.

  const produtosFormatados = carrinho.map((produto) => ({
    idProduto: produto.id,
    nomeProduto: produto.nome,
    quantidade: produto.quantidade,
    precoUnitario: produto.preco
  }));

  // Define o pedido de forma geral
  const pedidoBase = {
    dataPedido: new Date(),
    status: "AGUARDANDO_PAGAMENTO",
    valor: totalGeral,
    produtos: produtosFormatados,
    enderecoCliente: enderecoSelecionado, // Sempre usa enderecoSelecionado
    metodoDePagamento: paymentMethod,
    idCliente: dados ? dados.id : null // Sempre usa dados.id
  };
    
  const validatePagamento = () => {
    const newErrorsPagamento = {}; // Usar um objeto local para erros desta validação
    
    if (paymentMethod === 'Cartão de Crédito') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        newErrorsPagamento.cardNumber = 'Número de cartão inválido';
      }
      if (!cardName) {
        newErrorsPagamento.cardName = 'Nome no cartão é obrigatório';
      }
      if (!cardExpiry || cardExpiry.length < 5) { // MM/AA
        newErrorsPagamento.cardExpiry = 'Data de validade inválida';
      }
      if (!cardCVV || cardCVV.length < 3) {
        newErrorsPagamento.cardCVV = 'CVV inválido';
      }
    }
    
    setErrors(prev => ({ ...prev, pagamento: newErrorsPagamento }));
    return Object.keys(newErrorsPagamento).length === 0;
  };

  const validateEndereco = () => {
    // Se há endereços salvos e um foi selecionado
    if (enderecos.length > 0 && enderecoSelecionado) {
      setErrors(prev => ({ ...prev, endereco: {} })); // Limpa erros de endereço se um existente foi selecionado
      return true;
    }
    
    // Se está cadastrando novo endereço (enderecos.length === 0 OU nenhum selecionado e está no form de novo endereço)
    const newErrorsEndereco = {}; // Usar um objeto local para erros desta validação
    const requiredFields = ['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'];
    
    requiredFields.forEach(field => {
      if (!novoEndereco[field]) {
        newErrorsEndereco[field] = `Campo obrigatório`;
      }
    });
    
    if (novoEndereco.cep && novoEndereco.cep.replace(/\D/g, '').length < 8) {
      newErrorsEndereco.cep = 'CEP inválido';
    }
    
    if (novoEndereco.uf && novoEndereco.uf.length !== 2) {
      newErrorsEndereco.uf = 'UF deve ter 2 caracteres';
    }
    
    setErrors(prev => ({ ...prev, endereco: newErrorsEndereco }));
    return Object.keys(newErrorsEndereco).length === 0;
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem("carrinho");
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = [];
    for (let i = 0; i < digits.length && i < 16; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join(' ');
  };

  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const buscarCep = async () => {
    const cep = novoEndereco.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
        setErrors((prev) => ({ ...prev, endereco: { ...prev.endereco, cep: 'CEP deve ter 8 dígitos' } }));
        return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setNovoEndereco((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        }));
        setErrors((prev) => ({ ...prev, endereco: { ...prev.endereco, cep: '' } }));
      } else {
        setErrors((prev) => ({ ...prev, endereco: { ...prev.endereco, cep: 'CEP não encontrado' } }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, endereco: { ...prev.endereco, cep: 'Erro ao buscar CEP' } }));
    }
  };

  const handleCardNumberChange = (e) => setCardNumber(formatCardNumber(e.target.value));
  const handleExpiryChange = (e) => setCardExpiry(formatExpiryDate(e.target.value));
  const handleCVVChange = (e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 3));

  // Ordenar endereços para que o padrão apareça primeiro
  const enderecosOrdenados = [...enderecos].sort((a, b) => {
    if (a.padrao && !b.padrao) return -1;
    if (!a.padrao && b.padrao) return 1;
    return 0;
  });

  const nextStep = () => {
    if (currentStep === 2) { // Endereço
      if (!validateEndereco()) return;
      
      // Se o endereço for válido e novo (ou seja, enderecos.length === 0 e o form foi preenchido)
      // E nenhum enderecoSelecionado ainda (o que seria o caso se o form foi usado)
      if (enderecos.length === 0 && !enderecoSelecionado) {
         // Simula a adição do novo endereço à lista para que possa ser selecionado
         // No mundo real, este novo endereço seria salvo no backend e o fetchEnderecos seria chamado novamente
         // ou o novo endereço retornado pela API de salvar seria adicionado ao estado 'enderecos'
        const novoEnderecoObj = {
          ...novoEndereco,
          id: `temp-${Date.now()}`, // ID temporário
          padrao: true // Assume como padrão se for o único
        };
        // setEnderecos([novoEnderecoObj]); // Não faremos isso para não confundir com os do backend
        setEnderecoSelecionado(novoEnderecoObj); // Seleciona o endereço recém-criado
      }
    } else if (currentStep === 3) { // Pagamento
      if (!validatePagamento()) return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 2) { // Não pode voltar da etapa de endereço (2)
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleFinalizarCompra = () => {
    // Revalida o endereço e o pagamento antes de mostrar o modal
    if (!validateEndereco()) {
        setCurrentStep(2); // Volta para a etapa de endereço se inválido
        return;
    }
    if (!validatePagamento()) {
        setCurrentStep(3); // Volta para a etapa de pagamento se inválido
        return;
    }
    setShowModal(true);
  };

  const handleConcluirCompra = async () => {
    if (!dados || !dados.id) {
        alert("Erro: Dados do usuário não encontrados. Por favor, faça login novamente.");
        router.push('/login');
        return;
    }
    if (!enderecoSelecionado) {
        alert("Erro: Endereço de entrega não selecionado.");
        setCurrentStep(2);
        setShowModal(false);
        return;
    }

    const pedidoFinal = {
        ...pedidoBase,
        idCliente: dados.id, // Garante que o idCliente está atualizado
        enderecoCliente: enderecoSelecionado, // Garante que o enderecoSelecionado está atualizado
    };

    try {
      const response = await fetch("http://localhost:8081/pedidos/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoFinal)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro desconhecido ao criar o pedido");
      }

      const data = await response.json();
      setResposta(data);
      handleClearCarrinho();
      alert(`Pedido realizado com sucesso! Número do pedido: ${data.numero} \n Visite "Meus pedidos" no perfil para visualizar suas compras`);
      router.push('/pgPrincipal');
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert(`Não foi possível finalizar o pedido: ${error.message}`);
      setShowModal(false); // Fecha o modal em caso de erro também
    }
  };

  const BotaoIrParaEndereco = () => (
    <a href="/perfil?tab=enderecos" target="_blank" rel="noopener noreferrer">
      <CheckoutButton>Gerenciar Endereços</CheckoutButton>
    </a>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      // case 1 foi removido
      case 2: // Endereço
        return (
          <SectionContainer>
            <SectionTitle>Endereço de Entrega</SectionTitle>
            {/* Se não houver endereços cadastrados, mostra o formulário para novo endereço */}
            {/* Se houver, mostra a lista */}
            {enderecos.length === 0 ? (
              <>
                <p style={{textAlign: 'center', marginBottom: '15px', color: '#555'}}>
                  Nenhum endereço cadastrado. Por favor, adicione um novo endereço.
                </p>
                <FormRow>
                  <Field flex={1}>
                    <Label>CEP</Label>
                    <Input name="cep" value={novoEndereco.cep} onChange={handleEnderecoChange} onBlur={buscarCep} placeholder="00000-000" />
                    {errors.endereco?.cep && <Error>{errors.endereco.cep}</Error>}
                  </Field>
                  <Field flex={2}>
                    <Label>Logradouro</Label>
                    <Input name="logradouro" value={novoEndereco.logradouro} onChange={handleEnderecoChange} placeholder="Rua, Avenida, etc." />
                    {errors.endereco?.logradouro && <Error>{errors.endereco.logradouro}</Error>}
                  </Field>
                </FormRow>
                <FormRow>
                  <Field flex={1}>
                    <Label>Número</Label>
                    <Input name="numero" value={novoEndereco.numero} onChange={handleEnderecoChange} placeholder="Nº" />
                    {errors.endereco?.numero && <Error>{errors.endereco.numero}</Error>}
                  </Field>
                  <Field flex={2}>
                    <Label>Complemento</Label>
                    <Input name="complemento" value={novoEndereco.complemento} onChange={handleEnderecoChange} placeholder="Apto, Bloco, etc. (Opcional)" />
                  </Field>
                </FormRow>
                <FormRow>
                  <Field>
                    <Label>Bairro</Label>
                    <Input name="bairro" value={novoEndereco.bairro} onChange={handleEnderecoChange} placeholder="Bairro" />
                    {errors.endereco?.bairro && <Error>{errors.endereco.bairro}</Error>}
                  </Field>
                  <Field>
                    <Label>Cidade</Label>
                    <Input name="cidade" value={novoEndereco.cidade} onChange={handleEnderecoChange} placeholder="Cidade" />
                    {errors.endereco?.cidade && <Error>{errors.endereco.cidade}</Error>}
                  </Field>
                  <Field flex={0.5}>
                    <Label>UF</Label>
                    <Input name="uf" value={novoEndereco.uf} onChange={handleEnderecoChange} maxLength={2} placeholder="UF" />
                    {errors.endereco?.uf && <Error>{errors.endereco.uf}</Error>}
                  </Field>
                </FormRow>
                {/* <div style={{ marginTop: '10px' }}>
                    <input type="checkbox" id="padraoNovo" name="padrao" checked={novoEndereco.padrao} onChange={(e) => setNovoEndereco(prev => ({...prev, padrao: e.target.checked}))} />
                    <label htmlFor="padraoNovo" style={{ marginLeft: '5px', fontSize: '14px' }}> Definir como endereço padrão</label>
                </div> */}
                <BotaoIrParaEndereco /> {/* Sugere ir para a página de perfil para adicionar de forma mais completa */}

              </>
            ) : (
              <>
                <EnderecosGrid>
                  {enderecosOrdenados.map((endereco) => (
                    <EnderecoCard
                      key={endereco.id} // Use o ID real do endereço
                      selected={enderecoSelecionado?.id === endereco.id}
                      $isPadrao={endereco.padrao} // Use $isPadrao para props transientes em styled-components
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
                        <EnderecoLine>{endereco.complemento}</EnderecoLine>
                        <EnderecoLine>{endereco.bairro}</EnderecoLine>
                        <EnderecoLine>{endereco.cidade}/{endereco.uf}</EnderecoLine>
                        <EnderecoLine>CEP: {endereco.cep}</EnderecoLine>
                      </EnderecoContent>
                    </EnderecoCard>
                  ))}
                </EnderecosGrid>
                <BotaoIrParaEndereco />
              </>
            )}
             {/* Mensagem se nenhum endereço estiver selecionado e houver endereços */}
             {enderecos.length > 0 && !enderecoSelecionado && (
                <Error style={{ textAlign: 'center', marginTop: '15px' }}>
                    Por favor, selecione um endereço de entrega ou cadastre um novo na sua <a href="/perfil?tab=enderecos">página de perfil</a>.
                </Error>
            )}
          </SectionContainer>
        );
      
      case 3: // Pagamento
        return (
          <SectionContainer>
            <SectionTitleP>Forma de Pagamento</SectionTitleP>
            <PaymentMethodsContainer>
              <PaymentMethodTabs>
                <PaymentTab $active={paymentMethod === 'Cartão de Crédito'} onClick={() => setPaymentMethod('Cartão de Crédito')}>
                  Cartão de Crédito
                </PaymentTab>
                <PaymentTab $active={paymentMethod === 'Boleto'} onClick={() => setPaymentMethod('Boleto')}>
                  Boleto
                </PaymentTab>
                <PaymentTab $active={paymentMethod === 'Pix'} onClick={() => setPaymentMethod('Pix')}>
                  PIX
                </PaymentTab>
              </PaymentMethodTabs>

              <PaymentForm>
                {paymentMethod === 'Cartão de Crédito' && (
                  <>
                    <FormGroup>
                      <FormLabel>Número do Cartão</FormLabel>
                      <FormInput type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={handleCardNumberChange} maxLength={19} />
                      {errors.pagamento?.cardNumber && <Error>{errors.pagamento.cardNumber}</Error>}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Nome no Cartão</FormLabel>
                      <FormInput type="text" placeholder="Como aparece no cartão" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                      {errors.pagamento?.cardName && <Error>{errors.pagamento.cardName}</Error>}
                    </FormGroup>
                    <CardInputsRow>
                      <FormGroup>
                        <FormLabel>Data de Validade</FormLabel>
                        <FormInput type="text" placeholder="MM/AA" value={cardExpiry} onChange={handleExpiryChange} maxLength={5}/>
                        {errors.pagamento?.cardExpiry && <Error>{errors.pagamento.cardExpiry}</Error>}
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>CVV</FormLabel>
                        <FormInput type="text" placeholder="123" value={cardCVV} onChange={handleCVVChange} maxLength={3}/>
                        {errors.pagamento?.cardCVV && <Error>{errors.pagamento.cardCVV}</Error>}
                      </FormGroup>
                    </CardInputsRow>
                    <FormGroup>
                      <FormLabel>Parcelas</FormLabel>
                      <FormSelect value={cardInstallments} onChange={(e) => setCardInstallments(e.target.value)}>
                        {[1, 2, 3, 4, 5, 6].map(numParcelas => (
                            <option key={numParcelas} value={numParcelas.toString()}>
                                {numParcelas}x de R$ {(totalGeral / numParcelas).toFixed(2)} sem juros
                            </option>
                        ))}
                      </FormSelect>
                    </FormGroup>
                  </>
                )}
                {paymentMethod === 'Boleto' && (
                  <BoletoInfo>
                    <p>Ao finalizar a compra, você receberá o boleto para pagamento.</p>
                    <p>O prazo de entrega começa a contar a partir da confirmação do pagamento.</p>
                    <p>O boleto tem vencimento em 3 dias úteis.</p>
                  </BoletoInfo>
                )}
                {paymentMethod === 'Pix' && (
                  <QRCodeContainer>
                    <QRCodePlaceholder>QR Code do PIX será gerado ao finalizar o pedido</QRCodePlaceholder>
                    <QRCodeInfo>Faça o pagamento instantâneo com PIX</QRCodeInfo>
                    <QRCodeInfo>Após finalizar o pedido, escaneie o QR Code com o app do seu banco</QRCodeInfo>
                  </QRCodeContainer>
                )}
              </PaymentForm>
            </PaymentMethodsContainer>
          </SectionContainer>
        );
      
      case 4: // Confirmação (Resumo antes do modal)
  return (
    <SectionContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Adiciona flex para centralizar filhos */}
      <SectionTitleC>Itens do Carrinho</SectionTitleC>
      <CarrinhoList> {/* CarrinhoList precisa de ajustes de estilo abaixo */}
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

      <SectionTitleC style={{ marginTop: '30px' }}>Resumo do Pedido</SectionTitleC> {/* Adiciona margem superior */}
      {carrinho.length > 0 ? (
        <SummaryContainer> {/* SummaryContainer precisa de ajustes de estilo abaixo */}
          <SummaryRow><span>Subtotal:</span><span>R$ {totalProdutos.toFixed(2)}</span></SummaryRow>
          <SummaryRow><span>Frete ({frete}):</span><span>R$ {valorFrete.toFixed(2)}</span></SummaryRow>
          <Total><span>Total:</span><span>R$ {totalGeral.toFixed(2)}</span></Total>
        </SummaryContainer>
      ) : (
        <SummaryContainer><EmptyCartMessage>Adicione produtos ao carrinho</EmptyCartMessage></SummaryContainer>
      )}
      
      <CheckoutButtonF onClick={handleFinalizarCompra}> {/* CheckoutButtonF precisa de ajustes de estilo abaixo */}
        Revisar e Finalizar Pedido
      </CheckoutButtonF>
    </SectionContainer>
  );
      default:
        return null;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;
    
    return (
      <ModalOverlay>
        <ModalContent>
          <ModalTitle>Confirmação do Pedido</ModalTitle>
          <ModalCloseButton onClick={() => setShowModal(false)}>×</ModalCloseButton>
          <ModalSection>
            <ModalSectionTitle>Itens do Pedido</ModalSectionTitle>
            <CarrinhoListR>
              {carrinho.map((item, index) => (
                <CarrinhoItem key={index}>
                  <ItemInfo>
                    <div>
                      <ItemName>{item.nome}</ItemName>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'/*era 300px*/, fontSize: '13px' }}>
                        <span>Qtd: {item.quantidade}</span>
                        <span>Unitário: R$ {item.preco.toFixed(2)}</span>
                        <span>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                      </div>
                    </div>
                  </ItemInfo>
                </CarrinhoItem>
              ))}
            </CarrinhoListR>
          </ModalSection>
          <ModalSection>
            <ModalSectionTitle>Endereço de Entrega</ModalSectionTitle>
            <div style={{ padding: '10px', backgroundColor: '#f5fff5', borderRadius: '10px' }}>
              {enderecoSelecionado ? (
                <>
                  <p>{enderecoSelecionado.logradouro}, {enderecoSelecionado.numero} {enderecoSelecionado.complemento || ''}</p>
                  <p>{enderecoSelecionado.bairro}</p>
                  <p>{enderecoSelecionado.cidade}/{enderecoSelecionado.uf} - CEP: {enderecoSelecionado.cep}</p>
                </>
              ) : <p>Nenhum endereço selecionado.</p>}
            </div>
          </ModalSection>
          <ModalSection>
            <ModalSectionTitle>Forma de Pagamento</ModalSectionTitle>
            <div style={{ padding: '10px', backgroundColor: '#f5fff5', borderRadius: '10px' }}>
              {paymentMethod === 'Cartão de Crédito' && (
                <>
                  <p><strong>Cartão de Crédito</strong></p>
                  <p>Final: {cardNumber.slice(-4)}</p>
                  <p>Nome: {cardName}</p>
                  <p>Parcelas: {cardInstallments}x de R$ {(totalGeral / parseInt(cardInstallments)).toFixed(2)}</p>
                </>
              )}
              {paymentMethod === 'Boleto' && <p><strong>Boleto Bancário</strong></p>}
              {paymentMethod === 'Pix' && <p><strong>Pagamento via PIX</strong></p>}
            </div>
          </ModalSection>
          <ModalSection>
            <ModalSectionTitle>Resumo de Valores</ModalSectionTitle>
            <SummaryContainerR>
              <SummaryRow><span>Subtotal:</span><span>R$ {totalProdutos.toFixed(2)}</span></SummaryRow>
              <SummaryRow><span>Frete ({frete}):</span><span>R$ {valorFrete.toFixed(2)}</span></SummaryRow>
              <Total><span>Total:</span><span>R$ {totalGeral.toFixed(2)}</span></Total>
            </SummaryContainerR>
          </ModalSection>
          <ModalButtonsContainer>
            <StepButton back="true" onClick={() => setShowModal(false)}>Voltar e Revisar</StepButton>
            <StepButton onClick={handleConcluirCompra}>Confirmar e Concluir Compra</StepButton>
          </ModalButtonsContainer>
        </ModalContent>
      </ModalOverlay>
    );
  };

  // Se o user não estiver logado (hipoteticamente, pois removemos essa lógica, mas como um guarda), redirecionar.
  // Esta verificação pode ser feita no _app.js ou em um HOC para proteger a rota.
  // Por ora, confiaremos que `user` e `dados` estão presentes.
  if (!user || !dados) {
    // Idealmente, redirecionar ou mostrar um loader/mensagem de erro.
    // router.push('/login'); // Exemplo de redirecionamento
    return <StyledCheckout><CheckoutContainer><PageTitle>Carregando...</PageTitle></CheckoutContainer></StyledCheckout>;
  }

  return (
    <StyledCheckout>
      <GlobalStyle/>
      <CheckoutContainer>
        <PageTitle>Finalizar Compra</PageTitle>
        <StepsContainer>
          <StepLine>
  <StepLineProgress $currentStep={currentStep} /> {/* <<<< Passe como $currentStep */}
</StepLine>
          
          {/* Etapa 1 (Dados Pessoais) foi removida */}

          <Step>
  <StepCircle $active={currentStep === 2} $completed={currentStep > 2}> {/* <<<< $active, $completed */}
    {currentStep > 2 ? '✓' : ''}
  </StepCircle>
  <StepText $active={currentStep === 2} $completed={currentStep > 2}> {/* <<<< $active, $completed */}
    Endereço
  </StepText>
</Step>

<Step>
  <StepCircle $active={currentStep === 3} $completed={currentStep > 3}>
    {currentStep > 3 ? '✓' : ''}
  </StepCircle>
  <StepText $active={currentStep === 3} $completed={currentStep > 3}>
    Pagamento
  </StepText>
</Step>

<Step>
  <StepCircle $active={currentStep === 4} $completed={currentStep > 4}> {/* $completed aqui sempre será false */}
    {/* Ícone para 'Confirmação' pode ser diferente, ou vazio até estar ativo */}
  </StepCircle>
  <StepText $active={currentStep === 4} $completed={currentStep > 4}> {/* $completed aqui sempre será false */}
    Confirmação
  </StepText>
</Step>
        </StepsContainer>
      
        {/* O TwoColumnLayout pode não ser mais necessário se o resumo for sempre mostrado na etapa 4 */}
        {/* Ou pode ser usado para ter o conteúdo da etapa e um resumo lateral fixo */}
        {/* Por simplicidade, faremos a ColumnSection ocupar todo o espaço */}
        <ColumnSection> 
          {renderStepContent()}
          
          <StepNavigation>
            {/* Botão Voltar: aparece se currentStep > 2 (ou seja, em Pagamento ou Confirmação) */}
            {currentStep > 2 && (
              <StepButton back="true" onClick={prevStep}>Voltar</StepButton>
            )}

            {/* Botão Continuar: aparece se currentStep < 4 (ou seja, em Endereço ou Pagamento) */}
            {/* Se estiver na etapa 4 (Confirmação), o botão de finalizar já está dentro do renderStepContent */}
            {currentStep < 4 && (   
              // Garante que o botão de continuar ocupe o lado direito se o de voltar não existir
              <StepButton onClick={nextStep} style={{ marginLeft: currentStep <= 2 ? 'auto' : undefined }}> 
                Continuar
              </StepButton>  
            )}
          </StepNavigation>
        </ColumnSection>
        
        {renderModal()}
      </CheckoutContainer>
    </StyledCheckout>
  );
}

export default Checkout