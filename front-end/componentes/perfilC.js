import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const StyledPerfil = styled.div`
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

const Box = styled.div`
  background-color: #f0f0f0;
  padding: 25px 30px;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(48, 240, 3, 0.2);
  text-align: left;
  width: 700px;
  max-height: 85vh;
  overflow-y: auto;
  /* Scrollbar transparente */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* ou 'none' */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const PerfilHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #30f003;
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #164d09;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border: 3px solid #30f003;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h2`
  margin: 0;
  color: #164d09;
  font-size: 1.8rem;
`;

const UserEmail = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.$active ? '#30f003' : 'transparent'};
  color: ${props => props.$active ? '#164d09' : '#666'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:hover {
    color: #164d09;
  }
`;

const TabContent = styled.div`
  display: ${props => props.$active ? 'block' : 'none'};
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #164d09;
  margin: 10px 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #30f003;
    margin-right: 8px;
    border-radius: 50%;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0;
`;

const Field = styled.div`
  margin-bottom: 8px;
  flex: ${props => props.flex || 1};
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 3px;
  color: #333;
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

const Select = styled.select`
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

const Error = styled.p`
  color: #e60000;
  font-size: 0.75rem;
  margin-top: 2px;
`;

const Success = styled.p`
  color: #028a02;
  font-size: 0.85rem;
  margin-top: 10px;
  background-color: #e8ffe8;
  padding: 8px;
  border-radius: 50px;
  border-left: 3px solid #28c702;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
`;

const Botao = styled.button`
  padding: 10px;
  border: none;
  background-color: #164d09;
  color: #fff;
  font-size: 0.95rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  
  &:hover {
    background-color: #28c702;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BotaoPrimario = styled(Botao)`
  min-width: 200px;
  margin-top: 15px;
  background-color: #164d09;
  padding: 12px;
  font-size: 1rem;
  
  &:hover {
    background-color: #1a5e0a;
  }
`;

const BotaoSecundario = styled(Botao)`
  background-color: #28c702;
  flex: 1;
  
  &:hover {
    background-color: #33e003;
  }
`;

const EnderecoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 30px;
  padding: 12px;
  margin-bottom: 15px;
  border-left: 4px solid #28c702;
`;

const EnderecoTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 600;
  color: #164d09;
`;

const EnderecoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const EnderecoInfo = styled.div`
  margin: 4px 0;
`;

const EnderecoLabel = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  color: #666;
`;

const EnderecoValue = styled.span`
  display: block;
  font-size: 0.9rem;
`;

const BotoesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PedidoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 30px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #28c702;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const PedidoNumero = styled.span`
  font-weight: 600;
  color: #164d09;
  font-size: 1.1rem;
`;

const PedidoStatus = styled.span`
  background-color: ${props => {
    switch(props.status.toLowerCase()) {
      case 'entregue': return '#e8ffe8';
      case 'cancelado': return '#ffebeb';
      case 'em andamento': return '#fff8e8';
      default: return '#f0f0f0';
    }
  }};
  color: ${props => {
    switch(props.status.toLowerCase()) {
      case 'entregue': return '#028a02';
      case 'cancelado': return '#c70000';
      case 'em andamento': return '#c79400';
      default: return '#666';
    }
  }};
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PedidoInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`;

const PedidoInfoItem = styled.div`
  margin: 4px 0;
`;

const PedidoLabel = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  color: #666;
`;

const PedidoValue = styled.span`
  display: block;
  font-size: 0.9rem;
`;

const ProdutosTitle = styled.div`
  font-weight: 600;
  color: #164d09;
  margin: 10px 0;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #30f003;
    margin-right: 8px;
    border-radius: 50%;
  }
`;

const ProdutosList = styled.div`
  background-color: white;
  border-radius: 30px;
  padding: 8px;
`;

const ProdutoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProdutoNome = styled.span`
  flex: 2;
`;

const ProdutoQtd = styled.span`
  flex: 1;
  text-align: center;
  color: #666;
`;

const ProdutoPreco = styled.span`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;

const PedidoValorTotal = styled.div`
  text-align: right;
  margin-top: 10px;
  font-weight: 600;
  color: #164d09;
  font-size: 1.1rem;
`;

const NenhumPedido = styled.div`
  padding: 30px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 30px;
  margin: 20px 0;
`;

const DetalhesContainer = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
`;

function Perfil() {
  // Estado para as abas
  const [activeTab, setActiveTab] = useState('dados');
  const {dados, setDados} = useAuth();
  const [pedidosExpandidos, setPedidosExpandidos] = useState([]);
  const router = useRouter();

  const dataFormatada = new Date(dados.dataNasc).toISOString().slice(0, 10);

  // Estado para o formulário de dados pessoais
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: dados.nome,
    email: dados.email,
    cpf: dados.cpf,
    nascimento: dataFormatada,
    genero: dados.genero,
  });
  
  // Estado para o formulário de senha
  const [senha, setSenha] = useState({
    
    nova: '',
    confirmar: '',
  });
  
  // Estado para endereços de entrega
  const [enderecos, setEnderecos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  
  // Estado para novo endereço
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
  
  // Estado para mensagens
  const [feedback, setFeedback] = useState({
    dados: '',
    senha: '',
    enderecos: ''
  });
  
  // Estado para erros
  const [errors, setErrors] = useState({
    dados: {},
    senha: {},
    endereco: {}
  });

  // Função para mudar de aba
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const toggleDetalhes = (pedidoId) => {
    setPedidosExpandidos(prev => 
      prev.includes(pedidoId) 
        ? prev.filter(id => id !== pedidoId) 
        : [...prev, pedidoId]
    );
  };

  useEffect(() => {
    // Verifica se há um parâmetro 'tab' na URL
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    // Se houver e for uma tab válida, ativa-a
    if (tabParam && ['dados', 'senha', 'enderecos', 'pedidos'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'enderecos') {
  
      fetchEnderecos();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'pedidos') {
  
      fetchPedidos();
    }
  }, [activeTab]);
    
  const fetchPedidos = async () => {
      try{
        const response = await fetch(`http://localhost:8081/pedidos/${dados.id}`);

        if(!response.ok){
          throw new Error("Erro ao buscar pedidos");
  
        }

        const pedidosCliente = await response.json();
        setPedidos(pedidosCliente);
        
      }catch(error){
        console.error("Erro ao buscar pedidos:", error)
      }
  }
  const fetchEnderecos = async () => {

    try{
      const response = await fetch(`http://localhost:8081/endereco/${dados.id}`);

      if(!response.ok){
        throw new Error("Erro ao buscar enderecos");

      }
      const enderecosCliente = await response.json();
      setEnderecos(enderecosCliente);

    }catch (error) {
      console.error("Erro ao buscar enderecos:", error);
      return [];
    }

  }

  const togglePrincipal = async (idEndereco, idCliente) => {
    try {
      const response = await fetch(`http://localhost:8081/endereco?idEndereco=${idEndereco}&idCliente=${idCliente}`, {
        method: 'PUT',
      });
  
      if (!response.ok) {
        throw new Error("Erro ao definir endereço como principal");
      }
  
      const msg = await response.text();
      console.log(msg); // ou setFeedback(msg);
    } catch (error) {
      console.error("Erro ao atualizar endereço principal:", error);
    }
    fetchEnderecos();
  }

  // Função para atualizar dados pessoais
  const handleDadosChange = (e) => {
    const { name, value } = e.target;
    setDadosPessoais((prev) => ({ ...prev, [name]: value }));
  };

  const handleRedirect = useCallback(() => {
      router.push('/pgPrincipal');
    }, [router]);
  
  // Função para atualizar senha
  const handleSenhaChange = (e) => {
    const { name, value } = e.target;
    setSenha((prev) => ({ ...prev, [name]: value }));
  };
  
  // Função para atualizar novo endereço
  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco((prev) => ({ ...prev, [name]: value }));
  };
  
  // Buscar CEP
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

  // Salvar dados pessoais
  const salvarDadosPessoais = async (e) => {
    e.preventDefault(); // Para evitar reload da página
  
    setFeedback({ ...feedback, dados: '' });
    setErrors({ ...errors, dados: {} });
  
    const updatedData = new URLSearchParams();
    if (dadosPessoais.nome) updatedData.append("nome", dadosPessoais.nome);
    if (dadosPessoais.nascimento) updatedData.append("dataNasc", dadosPessoais.nascimento);
    if (dadosPessoais.genero) updatedData.append("genero", dadosPessoais.genero);
  
    try {
      const response = await fetch(`http://localhost:8081/cliente/${dados.id}/dados`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updatedData.toString(),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar cliente");
      }
  
      setFeedback({ ...feedback, dados: "Dados atualizados com sucesso!" });
      setDados(prev => ({
        ...prev,
        nome: dadosPessoais.nome,
        dataNasc: dadosPessoais.nascimento,
        genero: dadosPessoais.genero
      }));
      
  
    } catch (error) {
      console.error(error);
      setFeedback({ ...feedback, dados: "Erro ao atualizar cliente" });
    }
  };
  
 
  const salvarSenha = async (e) => {
    e.preventDefault(); // Para evitar reload da página

    const errorsObj = {};
    
    if (!senha.nova) errorsObj.nova = 'Nova senha é obrigatória';
    if (senha.nova !== senha.confirmar) errorsObj.confirmar = 'As senhas não coincidem';
    
    if (Object.keys(errorsObj).length > 0) {
      setErrors({...errors, senha: errorsObj});
      return;
    }
    
  
    setFeedback({ ...feedback, dados: '' });
    setErrors({ ...errors, dados: {} });
  
    try {
      const senhaData = new URLSearchParams();
      senhaData.append("senha", senha.nova);
      const response = await fetch(`http://localhost:8081/cliente/${dados.id}/senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: senhaData.toString(),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors({ ...errors, senha: errorData.errors });
        }
        throw new Error("Erro ao atualizar senha");
      }
      alert("Senha atualizada!");
    }catch (error) {
      console.error('Erro ao atualizar senha:', error);
      alert('Erro ao atualizar senha!');
    }
  };
 
  
  // Adicionar novo endereço
  const adicionarEndereco = async (e) => {
    e.preventDefault();
    const payload = {
      cep: novoEndereco.cep,
      logradouro: novoEndereco.logradouro,
      numero: novoEndereco.numero,
      complemento: novoEndereco.complemento,
      bairro: novoEndereco.bairro,
      cidade: novoEndereco.cidade,
      uf: novoEndereco.uf,
      padrao: novoEndereco.padrao,
    };
  
    try {
      const response = await fetch(`http://localhost:8081/endereco?idCliente=${dados.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        alert("erro ao cadastrar Endereço")
        throw new Error("Erro ao cadastrar endereço");
      }
  
      // Limpar o formulário após o cadastro
      setNovoEndereco({
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        padrao: false,
      });
      alert("Endereço cadastrado")
    fetchEnderecos()
  } catch (error) {
      alert("erro ao cadastrar Endereço")

        console.error("Erro ao cadastrar endereco:", error);
      }
    };
  
    const deletarEndereco = async (endereco) => {
      try {
        const response = await fetch('http://localhost:8081/endereco', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(endereco) // o corpo da requisição DELETE
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
    
        const mensagem = await response.text();
        alert("Endereço excluído com sucesso: " + mensagem);
        fetchEnderecos();
      } catch (error) {
        console.error("Erro ao excluir endereço:", error);
        alert("Erro ao excluir endereço: " + error.message);
      }
    };
  
  // Obter primeira letra do nome para o avatar
  const getInitial = () => {
    return dadosPessoais.nome.charAt(0).toUpperCase();
  };



  return (
    
    <StyledPerfil>
      <GlobalStyle />
      <Box>
        <PerfilHeader>
          <Avatar>{getInitial()}</Avatar>
          <UserInfo>
            <Username>{dadosPessoais.nome}</Username>
            <UserEmail>{dadosPessoais.email}</UserEmail>
          </UserInfo>
        </PerfilHeader>
        
        <TabsContainer>
          <Tab 
            $active={activeTab === 'dados'} 
            onClick={() => changeTab('dados')}
          >
            Dados Pessoais
          </Tab>
          <Tab 
            $active={activeTab === 'senha'} 
            onClick={() => changeTab('senha')}
          >
            Alterar Senha
          </Tab>
          <Tab 
            $active={activeTab === 'enderecos'} 
            onClick={() => changeTab('enderecos')}
          >
            Endereços de Entrega
          </Tab>
          <Tab 
            $active={activeTab === 'pedidos'} 
            onClick={() => changeTab('pedidos')}
          >
            Meus Pedidos
          </Tab>
          
        </TabsContainer>
        
        {/* Aba de Dados Pessoais */}
        <TabContent $active={activeTab === 'dados'}>
          <form onSubmit={salvarDadosPessoais}>
            <FormSection>
              <Field>
                <Label>Nome Completo</Label>
                <Input 
                  name="nome" 
                  value={dadosPessoais.nome} 
                  onChange={handleDadosChange} 
                />
                {errors.dados?.nome && <Error>{errors.dados.nome}</Error>}
              </Field>
              
              <FormRow>
                <Field>
                  <Label>E-mail</Label>
                  <Input 
                    name="email" 
                    value={dadosPessoais.email} 
                    onChange={handleDadosChange}
                    disabled
                  />
                  <Error>O e-mail não pode ser alterado</Error>
                </Field>
                <Field>
                  <Label>CPF</Label>
                  <Input 
                    name="cpf" 
                    value={dadosPessoais.cpf} 
                    onChange={handleDadosChange}
                    disabled
                  />
                  <Error>O CPF não pode ser alterado</Error>
                </Field>
              </FormRow>
              
              <FormRow>
                <Field>
                  <Label>Data de Nascimento</Label>
                  <Input 
                    type="date" 
                    name="nascimento" 
                    value={dadosPessoais.nascimento} 
                    onChange={handleDadosChange} 
                  />
                </Field>
                <Field>
                  <Label>Gênero</Label>
                  <Select 
                    name="genero" 
                    value={dadosPessoais.genero} 
                    onChange={handleDadosChange}
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </Select>
                </Field>
              </FormRow>
              
              {feedback.dados && <Success>{feedback.dados}</Success>}
              
              <div style={{ textAlign: 'center', marginTop: '20px'}}>
                <BotaoPrimario type="submit">Salvar Alterações</BotaoPrimario>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px'}}>
              <BotaoPrimario onClick={handleRedirect}>Voltar</BotaoPrimario>
              </div>
            </FormSection>
          </form>
        </TabContent>
        
        {/* Aba de Alterar Senha */}
        <TabContent $active={activeTab === 'senha'}>
          <form onSubmit={salvarSenha}>
            <FormSection>
             
              
              <Field>
                <Label>Nova Senha</Label>
                <Input 
                  type="password" 
                  name="nova" 
                  value={senha.nova} 
                  onChange={handleSenhaChange} 
                  placeholder="Digite a nova senha" 
                />
                {errors.senha?.nova && <Error>{errors.senha.nova}</Error>}
              </Field>
              
              <Field>
                <Label>Confirmar Nova Senha</Label>
                <Input 
                  type="password" 
                  name="confirmar" 
                  value={senha.confirmar} 
                  onChange={handleSenhaChange} 
                  placeholder="Confirme a nova senha" 
                />
                {errors.senha?.confirmar && <Error>{errors.senha.confirmar}</Error>}
              </Field>
              
              {feedback.senha && <Success>{feedback.senha}</Success>}
              
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <BotaoPrimario type="submit">Alterar Senha</BotaoPrimario>
              </div>
            </FormSection>
          </form>
        </TabContent>
        
        {/* Aba de Endereços de Entrega */}
        <TabContent $active={activeTab === 'enderecos'}>
          <FormSection>
            <SectionTitle>Meus Endereços</SectionTitle>
            
            {enderecos.map((endereco) => (
  <EnderecoCard key={endereco.id}>
    <EnderecoTitulo>
      <span>
        {endereco.padrao && (
          <span style={{ color: '#28c702', marginRight: '5px' }}>★ Principal</span>
        )}
        {endereco.faturamento && (
          <span style={{ color: '#007bff', marginRight: '5px' }}>📄 Faturamento</span>
        )}
        {endereco.logradouro}, {endereco.numero}
      </span>
      <div>
        {!endereco.padrao && !endereco.faturamento && (
          <BotaoSecundario 
            type="button" 
            onClick={() => togglePrincipal(endereco.id, dados.id)}
            style={{padding: "4px 8px", fontSize: "0.8rem", marginRight: "5px"}}
          >
            Definir como Principal
          </BotaoSecundario>
        )}
        {/* Exibe o botão de remover apenas se o endereço não for de faturamento */}
        {!endereco.faturamento && (
          <BotaoSecundario 
            type="button" 
            onClick={() => deletarEndereco(endereco)}
            style={{padding: "4px 8px", fontSize: "0.8rem", backgroundColor: "#666"}}
          >
            Remover
          </BotaoSecundario>
        )}
      </div>
    </EnderecoTitulo>

    <EnderecoGrid>
      <EnderecoInfo>
        <EnderecoLabel>CEP:</EnderecoLabel>
        <EnderecoValue>{endereco.cep}</EnderecoValue>
      </EnderecoInfo>
      <EnderecoInfo>
        <EnderecoLabel>Bairro:</EnderecoLabel>
        <EnderecoValue>{endereco.bairro}</EnderecoValue>
      </EnderecoInfo>
      <EnderecoInfo>
        <EnderecoLabel>Cidade:</EnderecoLabel>
        <EnderecoValue>{endereco.cidade}</EnderecoValue>
      </EnderecoInfo>
      <EnderecoInfo>
        <EnderecoLabel>UF:</EnderecoLabel>
        <EnderecoValue>{endereco.uf}</EnderecoValue>
      </EnderecoInfo>
      {endereco.complemento && (
        <EnderecoInfo>
          <EnderecoLabel>Complemento:</EnderecoLabel>
          <EnderecoValue>{endereco.complemento}</EnderecoValue>
        </EnderecoInfo>
      )}
    </EnderecoGrid>
  </EnderecoCard>
))}
            
            <Divider />
            
            <SectionTitle>Adicionar Novo Endereço</SectionTitle>
            <form onSubmit={adicionarEndereco}>
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
              
              <FormRow>
                <Field style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <input
                    type="checkbox"
                    id="enderecoPrincipal"
                    name="principal"
                    checked={novoEndereco.padrao}
                    onChange={(e) => setNovoEndereco({...novoEndereco, padrao: e.target.checked})}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="enderecoPrincipal">Definir como endereço principal</label>
                </Field>
              </FormRow>
              
              {feedback.enderecos && <Success>{feedback.enderecos}</Success>}
              
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <BotaoPrimario type="submit">Adicionar Endereço</BotaoPrimario>
              </div>
            </form>
          </FormSection>
        </TabContent>

        <TabContent $active={activeTab === 'pedidos'}>
    {pedidos.length === 0 ? (
      <NenhumPedido>
        <p>Nenhum pedido encontrado.</p>
      </NenhumPedido>
    ) : (
      pedidos.map((pedido) => (
        <PedidoCard key={pedido.id}>
          <PedidoHeader>
            <PedidoNumero>Pedido #{pedido.numero}</PedidoNumero>
            <PedidoStatus status={pedido.status}>{pedido.status}</PedidoStatus>
          </PedidoHeader>

          <PedidoInfoItem>
                  <PedidoLabel>Data do Pedido</PedidoLabel>
                  <PedidoValue>{new Date(pedido.dataPedido).toLocaleString()}</PedidoValue>
                </PedidoInfoItem>
          
          <PedidoValorTotal>
            Total: R$ {pedido.valor.toFixed(2)}
          </PedidoValorTotal>
          
          <Botao 
            onClick={() => toggleDetalhes(pedido.id)}
          >
            {pedidosExpandidos.includes(pedido.id) ? 'Ocultar Detalhes' : 'Ver Detalhes'}
          </Botao>
          
          {pedidosExpandidos.includes(pedido.id) && (
            <DetalhesContainer>
              <PedidoInfo>
                <PedidoInfoItem>
                  <PedidoLabel>Data do Pedido</PedidoLabel>
                  <PedidoValue>{new Date(pedido.dataPedido).toLocaleString()}</PedidoValue>
                </PedidoInfoItem>
                <PedidoInfoItem>
                  <PedidoLabel>Método de Pagamento</PedidoLabel>
                  <PedidoValue>{pedido.metodoDePagamento}</PedidoValue>
                </PedidoInfoItem>

                <PedidoInfoItem>
                  <PedidoLabel>Endereço</PedidoLabel>
                  <PedidoValue>{pedido.enderecoCliente.cep}</PedidoValue>
                  <PedidoValue>
                    {pedido.enderecoCliente.logradouro + " "}
                    {pedido.enderecoCliente.numero+ " "}
                    {pedido.enderecoCliente.complemento && pedido.enderecoCliente.complemento}                  </PedidoValue>
                  <PedidoValue>
                    {pedido.enderecoCliente.bairro+ " "}
                    {pedido.enderecoCliente.cidade+ " "}
                    {pedido.enderecoCliente.uf}
                    </PedidoValue>
                  
                </PedidoInfoItem>

              </PedidoInfo>
              
              <ProdutosTitle>Produtos</ProdutosTitle>
              <ProdutosList>
                {pedido.produtos.map((produto, index) => (
                  <ProdutoItem key={index}>
                    <ProdutoNome>{produto.nomeProduto}</ProdutoNome>
                    <ProdutoQtd>{produto.quantidade}x</ProdutoQtd>
                    <ProdutoPreco>R$ {produto.precoUnitario.toFixed(2)}</ProdutoPreco>
                  </ProdutoItem>
                ))}
              </ProdutosList>
            </DetalhesContainer>
          )}
        </PedidoCard>
      ))
    )}
  </TabContent>
      </Box>
    </StyledPerfil>
  );
}

export default Perfil;
