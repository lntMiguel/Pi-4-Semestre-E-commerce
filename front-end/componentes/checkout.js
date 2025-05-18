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

const FormRow2 = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0;
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
  color: rgb(22, 77, 9);
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
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

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
`;

const StepLine = styled.div`
  position: absolute;
  top: 25px;
  left: 10%;
  right: 10%;
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
  width: ${props => {
    switch (props.currentStep) {
      case 1: return '0%';
      case 2: return '33.3%';
      case 3: return '66.6%';
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
  width: 20%;
`;

const StepCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#28c702' : props.completed ? '#28c702' : '#e0e0e0'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 0 10px rgba(40, 199, 2, 0.5)' : 'none'};
`;

const StepText = styled.span`
  color: ${props => props.active ? 'rgb(22, 77, 9)' : props.completed ? 'rgb(22, 77, 9)' : '#777'};
  font-weight: ${props => props.active || props.completed ? '600' : '400'};
  font-size: 14px;
  text-align: center;
`;

// Botões de navegação entre etapas
const StepNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const StepButton = styled.button`
  background-color: ${props => props.back ? 'white' : 'rgb(22, 77, 9)'};
  color: ${props => props.back ? 'rgb(22, 77, 9)' : 'white'};
  border: ${props => props.back ? '1px solid rgb(22, 77, 9)' : 'none'};
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.back ? '#f5f5f5' : '#28c702'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
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
  const { user, carrinho, setCarrinho, frete, setFrete, dados, valorFrete, setValorFrete } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cartao');
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
    padrao: false
  });
  const [usuarioSemLogin , setUsuarioSemLogin] = useState({
    nome: '',
    cpf:'',
    email:''
  });
   const [errors, setErrors] = useState({
    endereco: {}
  });
  // Estados para campos do cartão
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [cardInstallments, setCardInstallments] = useState('1');
  const [showModal, setShowModal] = useState(false);
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


  const produtosFormatados = carrinho.map((produto) => ({
    idProduto: produto.id,
    nomeProduto: produto.nome,
    quantidade: produto.quantidade,
    precoUnitario: produto.preco
  }));

  // Define o pedido de forma geral, com dados comuns
  const pedidoBase = {
    dataPedido: new Date(),
    status: "AGUARDANDO_PAGAMENTO",
    valor: totalGeral,
    produtos: produtosFormatados,
    enderecoCliente: user ? enderecoSelecionado : novoEndereco,
  };

  if (user != null) {
    // Usuário logado: idCliente do usuário logado
    pedidoBase.idCliente = dados.id;
  } else {
    // Usuário não logado: idCliente pode ser CPF ou outro identificador
    pedidoBase.idCliente = usuarioSemLogin.cpf;
  }

 
  
    
    const validatePagamento = () => {
      const newErrors = { pagamento: {} };
      
      if (paymentMethod === 'cartao') {
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
          newErrors.pagamento.cardNumber = 'Número de cartão inválido';
        }
        
        if (!cardName) {
          newErrors.pagamento.cardName = 'Nome no cartão é obrigatório';
        }
        
        if (!cardExpiry || cardExpiry.length < 5) {
          newErrors.pagamento.cardExpiry = 'Data de validade inválida';
        }
        
        if (!cardCVV || cardCVV.length < 3) {
          newErrors.pagamento.cardCVV = 'CVV inválido';
        }
      }
      
      setErrors(prev => ({ ...prev, ...newErrors }));
      return Object.keys(newErrors.pagamento).length === 0;
    };

    const validateEndereco = () => {
      // Se há endereços salvos e um foi selecionado
      if (enderecos.length > 0 && enderecoSelecionado) {
        return true;
      }
      
      // Se está cadastrando novo endereço
      const newErrors = { endereco: {} };
      const requiredFields = ['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'];
      
      requiredFields.forEach(field => {
        if (!novoEndereco[field]) {
          newErrors.endereco[field] = `Campo obrigatório`;
        }
      });
      
      if (novoEndereco.cep && novoEndereco.cep.length < 8) {
        newErrors.endereco.cep = 'CEP inválido';
      }
      
      if (novoEndereco.uf && novoEndereco.uf.length !== 2) {
        newErrors.endereco.uf = 'UF deve ter 2 caracteres';
      }
      
      setErrors(prev => ({ ...prev, ...newErrors }));
      return Object.keys(newErrors.endereco).length === 0;
    };


    const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(cpf.charAt(10));
  };

   const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleRedirect = () => {
    router.push('/pgPrincipal');
  };

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

   const buscarCep = async () => {
    const cep = novoEndereco.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;

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
        setErrors((prev) => ({ 
          ...prev, 
          endereco: { ...prev.endereco, cep: '' } 
        }));
      } else {
        setErrors((prev) => ({ 
          ...prev, 
          endereco: { ...prev.endereco, cep: 'CEP inválido' } 
        }));
      }
    } catch (err) {
      setErrors((prev) => ({ 
        ...prev, 
        endereco: { ...prev.endereco, cep: 'Erro ao buscar CEP' } 
      }));
    }
  };

  const validateDadosPessoais = () => {
    const newErrors = {};
    
    if (!usuarioSemLogin.nome) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!usuarioSemLogin.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(usuarioSemLogin.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!usuarioSemLogin.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (usuarioSemLogin.cpf.length !== 11) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSemLogin((prev) => ({ ...prev, [name]: value }));
  };

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

  const nextStep = () => {
    if (currentStep === 1 && !user) {
      // Validar dados pessoais para usuário não logado
      if (!validateDadosPessoais()) return;
    } else if (currentStep === 2) {
      // Validar endereço
      if (!validateEndereco()) return;
      
      // Se o endereço for válido e novo, adiciona à lista
      if (enderecos.length === 0) {
        const novoEnderecoObj = {
          ...novoEndereco,
          id: 1,
          padrao: true
        };
        setEnderecos([novoEnderecoObj]);
        setEnderecoSelecionado(novoEnderecoObj);
      }
    } else if (currentStep === 3) {
      // Validar pagamento
      if (!validatePagamento()) return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Função para voltar para a etapa anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Função para abrir o modal de resumo do pedido
  const handleFinalizarCompra = () => {
    setShowModal(true);
  };
   const handleConcluirCompra = () => {
    // Aqui você implementaria a lógica para salvar o pedido
    alert('Pedido realizado com sucesso!');
    router.push('/perfil?tab=enderecos');
    setShowModal(false);
    // Reiniciar o processo ou redirecionar
  };

  const BotaoIrParaEndereco = () => {
    return (
      <a href="/perfil?tab=enderecos">
        <CheckoutButton>Adicionar Endereço</CheckoutButton>
      </a>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SectionContainer>
            {user ? (
              // Se o usuário está logado, mostra apenas os itens do carrinho e avança
              <>
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
              </>
            ) : (
              // Se o usuário não está logado, pede os dados pessoais
              <>
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

                <SectionTitle style={{ marginTop: '20px' }}>Dados Pessoais</SectionTitle>
                <Field>
                  <Label>Nome Completo</Label>
                  <Input 
                    name="nome" 
                    value={usuarioSemLogin.nome} 
                    onChange={handleChange} 
                    placeholder="Digite seu nome completo" 
                  />
                  {errors.nome && <Error>{errors.nome}</Error>}
                </Field>
                
                <FormRow>
                  <Field flex={2}>
                    <Label>E-mail</Label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={usuarioSemLogin.email} 
                      onChange={handleChange} 
                      placeholder="seu@email.com" 
                    />
                    {errors.email && <Error>{errors.email}</Error>}
                  </Field>
                  <Field flex={1}>
                    <Label>CPF</Label>
                    <Input 
                      name="cpf" 
                      value={usuarioSemLogin.cpf} 
                      onChange={handleChange} 
                      placeholder="00000000000" 
                    />
                    {errors.cpf && <Error>{errors.cpf}</Error>}
                  </Field>
                </FormRow>
              </>
            )}
          </SectionContainer>
        );
      
      case 2:
        return (
          <SectionContainer>
            <SectionTitle>Endereço de Entrega</SectionTitle>
            {enderecos.length === 0 ? (
              <>
                <FormRow>
                  <Field flex={1}>
                    <Label>CEP</Label>
                    <Input 
                      name="cep" 
                      value={novoEndereco.cep} 
                      onChange={handleEnderecoChange} 
                      onBlur={buscarCep}
                      placeholder="00000-000" 
                    />
                    {errors.endereco?.cep && <Error>{errors.endereco.cep}</Error>}
                  </Field>
                  <Field flex={2}>
                    <Label>Logradouro</Label>
                    <Input 
                      name="logradouro" 
                      value={novoEndereco.logradouro} 
                      onChange={handleEnderecoChange} 
                      placeholder="Rua, Avenida, etc." 
                    />
                    {errors.endereco?.logradouro && <Error>{errors.endereco.logradouro}</Error>}
                  </Field>
                </FormRow>
                
                <FormRow>
                  <Field flex={1}>
                    <Label>Número</Label>
                    <Input 
                      name="numero" 
                      value={novoEndereco.numero} 
                      onChange={handleEnderecoChange} 
                      placeholder="Nº" 
                    />
                    {errors.endereco?.numero && <Error>{errors.endereco.numero}</Error>}
                  </Field>
                  <Field flex={2}>
                    <Label>Complemento</Label>
                    <Input 
                      name="complemento" 
                      value={novoEndereco.complemento} 
                      onChange={handleEnderecoChange} 
                      placeholder="Apto, Bloco, etc." 
                    />
                  </Field>
                </FormRow>
                
                <FormRow>
                  <Field>
                    <Label>Bairro</Label>
                    <Input 
                      name="bairro" 
                      value={novoEndereco.bairro} 
                      onChange={handleEnderecoChange} 
                      placeholder="Bairro" 
                    />
                    {errors.endereco?.bairro && <Error>{errors.endereco.bairro}</Error>}
                  </Field>
                  <Field>
                    <Label>Cidade</Label>
                    <Input 
                      name="cidade" 
                      value={novoEndereco.cidade} 
                      onChange={handleEnderecoChange} 
                      placeholder="Cidade" 
                    />
                    {errors.endereco?.cidade && <Error>{errors.endereco.cidade}</Error>}
                  </Field>
                  <Field flex={0.5}>
                    <Label>UF</Label>
                    <Input 
                      name="uf" 
                      value={novoEndereco.uf} 
                      onChange={handleEnderecoChange} 
                      maxLength={2}
                      placeholder="UF" 
                    />
                    {errors.endereco?.uf && <Error>{errors.endereco.uf}</Error>}
                  </Field>
                </FormRow>
              </>
            ) : (
              <EnderecosGrid>
                {enderecosOrdenados.map((endereco, index) => (
                  <EnderecoCard
                    key={index}
                    selected={enderecoSelecionado?.id === endereco.id}
                    $isPadrao={endereco.padrao}
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
        );
      
      case 3:
        return (
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
                      {errors.pagamento?.cardNumber && <Error>{errors.pagamento.cardNumber}</Error>}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Nome no Cartão</FormLabel>
                      <FormInput
                        type="text"
                        placeholder="Como aparece no cartão"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      {errors.pagamento?.cardName && <Error>{errors.pagamento.cardName}</Error>}
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
                        {errors.pagamento?.cardExpiry && <Error>{errors.pagamento.cardExpiry}</Error>}
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
                        {errors.pagamento?.cardCVV && <Error>{errors.pagamento.cardCVV}</Error>}
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
        );
      
      case 4:
        return (
          <SectionContainer>
            <SectionTitle>Resumo da Compra</SectionTitle>
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
            <CarrinhoList>
              {carrinho.map((item, index) => (
                <CarrinhoItem key={index}>
                  <ItemInfo>
                    <div>
                      <ItemName>{item.nome}</ItemName>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                        <span>Qtd: {item.quantidade}</span>
                        <span>Unitário: R$ {item.preco.toFixed(2)}</span>
                        <span>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                      </div>
                    </div>
                  </ItemInfo>
                </CarrinhoItem>
              ))}
            </CarrinhoList>
          </ModalSection>
          
          <ModalSection>
            <ModalSectionTitle>Endereço de Entrega</ModalSectionTitle>
            <div style={{ padding: '10px', backgroundColor: '#f5fff5', borderRadius: '10px' }}>
              {enderecoSelecionado ? (
                <>
                  <p>{enderecoSelecionado.logradouro}, {enderecoSelecionado.numero} {enderecoSelecionado.complemento}</p>
                  <p>{enderecoSelecionado.bairro}</p>
                  <p>{enderecoSelecionado.cidade}/{enderecoSelecionado.uf}</p>
                  <p>CEP: {enderecoSelecionado.cep}</p>
                </>
              ) : (
                <p>Nenhum endereço selecionado</p>
              )}
            </div>
          </ModalSection>
          
          <ModalSection>
            <ModalSectionTitle>Forma de Pagamento</ModalSectionTitle>
            <div style={{ padding: '10px', backgroundColor: '#f5fff5', borderRadius: '10px' }}>
              {paymentMethod === 'cartao' && (
                <>
                  <p><strong>Cartão de Crédito</strong></p>
                  <p>Final: {cardNumber.slice(-4)}</p>
                  <p>Nome: {cardName}</p>
                  <p>Parcelas: {cardInstallments}x de R$ {(totalGeral / parseInt(cardInstallments)).toFixed(2)}</p>
                </>
              )}
              
              {paymentMethod === 'boleto' && (
                <p><strong>Boleto Bancário</strong></p>
              )}
              
              {paymentMethod === 'pix' && (
                <p><strong>Pagamento via PIX</strong></p>
              )}
            </div>
          </ModalSection>
          
          <ModalSection>
            <ModalSectionTitle>Resumo de Valores</ModalSectionTitle>
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
            </SummaryContainer>
          </ModalSection>
          
          <ModalButtonsContainer>
            <StepButton $back onClick={() => setShowModal(false)}>
              Voltar e Revisar
            </StepButton>
            <StepButton onClick={handleConcluirCompra}>
              Confirmar e Concluir Compra
            </StepButton>
          </ModalButtonsContainer>
        </ModalContent>
      </ModalOverlay>
    );
  };

  return (
    
    <StyledCheckout>
      <GlobalStyle/>
    <CheckoutContainer>
      <PageTitle>Finalizar Compra</PageTitle>
      
      {/* Sistema de etapas */}
      <StepsContainer>
        <StepLine>
          <StepLineProgress currentstep={currentStep} />
        </StepLine>
        
        <Step>
          <StepCircle active={currentStep === 1 ? "true" : undefined} completed={currentStep > 1 ? "true" : undefined}>
            {currentStep > 1 ? '✓' : '1'}
          </StepCircle>
          <StepText active={currentStep === 1 ? "true" : undefined} completed={currentStep > 1 ? "true" : undefined}>
            {user ? 'Carrinho' : 'Identificação'}
          </StepText>
        </Step>
        
        <Step>
          <StepCircle active={currentStep === 2 ? "true" : undefined} completed={currentStep > 2 ? "true" : undefined}>
            {currentStep > 2 ? '✓' : '2'}
          </StepCircle>
          <StepText active={currentStep === 2 ? "true" : undefined} completed={currentStep > 2 ? "true" : undefined}>
            Endereço
          </StepText>
        </Step>
        
        <Step>
          <StepCircle active={currentStep === 3 ? "true" : undefined} completed={currentStep > 3 ? "true" : undefined}>
            {currentStep > 3 ? '✓' : '3'}
          </StepCircle>
          <StepText active={currentStep === 3 ? "true" : undefined} completed={currentStep > 3 ? "true" : undefined}>
            Pagamento
          </StepText>
        </Step>
        
        <Step>
          <StepCircle active={currentStep === 4 ? "true" : undefined} completed={currentStep > 4 ? "true" : undefined}>
            4
          </StepCircle>
          <StepText active={currentStep === 4 ? "true" : undefined} completed={currentStep > 4 ? "true" : undefined}>
            Confirmação
          </StepText>
        </Step>
      </StepsContainer>
      
      <TwoColumnLayout>
        <ColumnSection>
          {renderStepContent()}
          
          {/* Navegação entre etapas */}
          <StepNavigation>
            {currentStep > 1 && (
              <StepButton back="true" onClick={prevStep}>
                Voltar
              </StepButton>
            )}
            
            {currentStep < 4 && (
              <StepButton onClick={nextStep}>
                Continuar
              </StepButton>
            )}
          </StepNavigation>
        </ColumnSection>
        
        {/* Coluna do resumo - sempre visível */}
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
            </SummaryContainer>
          ) : (
            <SummaryContainer>
              <EmptyCartMessage>Adicione produtos ao carrinho</EmptyCartMessage>
            </SummaryContainer>
          )}
        </ColumnSection>
      </TwoColumnLayout>
      
      {/* Modal de confirmação do pedido */}
      {renderModal()}
    </CheckoutContainer>
    </StyledCheckout>
  );
}

export default Checkout