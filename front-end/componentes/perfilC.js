import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { useAuth } from "./authContext";

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2330f003' fill-opacity='0.59' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 80px 40px;
  background-position: center;
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.97);
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(48, 240, 3, 0.2);
  text-align: left;
  width: 700px;
  max-height: 85vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #28c702 #f0f0f0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #28c702;
    border-radius: 10px;
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
  border-bottom: 3px solid ${props => props.active ? '#30f003' : 'transparent'};
  color: ${props => props.active ? '#164d09' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:hover {
    color: #164d09;
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 4px;
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
  border-radius: 6px;
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
  border-radius: 8px;
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

function Perfil() {
  // Estado para as abas
  const [activeTab, setActiveTab] = useState('dados');
  
  // Estado para o formulário de dados pessoais
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: 'João da Silva',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    nascimento: '1990-05-15',
    genero: 'masculino',
  });
  
  // Estado para o formulário de senha
  const [senha, setSenha] = useState({
    atual: '',
    nova: '',
    confirmar: '',
  });
  
  // Estado para endereços de entrega
  const [enderecos, setEnderecos] = useState([
    {
      id: 1,
      cep: '01234-567',
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 45',
      bairro: 'Jardim Primavera',
      cidade: 'São Paulo',
      uf: 'SP',
      principal: true
    },
    {
      id: 2,
      cep: '09876-543',
      logradouro: 'Avenida Central',
      numero: '789',
      complemento: '',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
      principal: false
    }
  ]);
  
  // Estado para novo endereço
  const [novoEndereco, setNovoEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    principal: false
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
  
  // Função para atualizar dados pessoais
  const handleDadosChange = (e) => {
    const { name, value } = e.target;
    setDadosPessoais((prev) => ({ ...prev, [name]: value }));
  };
  
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
  const salvarDadosPessoais = (e) => {
    e.preventDefault();
    // Simulação de salvamento
    setTimeout(() => {
      setFeedback({...feedback, dados: 'Dados pessoais atualizados com sucesso!'});
      // Remover feedback após 3 segundos
      setTimeout(() => {
        setFeedback({...feedback, dados: ''});
      }, 3000);
    }, 500);
  };
  
  // Validar e salvar nova senha
  const salvarSenha = (e) => {
    e.preventDefault();
    const errorsObj = {};
    
    if (!senha.atual) errorsObj.atual = 'Senha atual é obrigatória';
    if (!senha.nova) errorsObj.nova = 'Nova senha é obrigatória';
    if (senha.nova.length < 6) errorsObj.nova = 'A senha deve ter pelo menos 6 caracteres';
    if (senha.nova !== senha.confirmar) errorsObj.confirmar = 'As senhas não coincidem';
    
    if (Object.keys(errorsObj).length > 0) {
      setErrors({...errors, senha: errorsObj});
      return;
    }
    
    // Simulação de salvamento
    setTimeout(() => {
      setSenha({atual: '', nova: '', confirmar: ''});
      setErrors({...errors, senha: {}});
      setFeedback({...feedback, senha: 'Senha alterada com sucesso!'});
      
      // Remover feedback após 3 segundos
      setTimeout(() => {
        setFeedback({...feedback, senha: ''});
      }, 3000);
    }, 500);
  };
  
  // Adicionar novo endereço
  const adicionarEndereco = (e) => {
    e.preventDefault();
    const errorsObj = {};
    
    if (!novoEndereco.cep) errorsObj.cep = 'CEP é obrigatório';
    if (!novoEndereco.logradouro) errorsObj.logradouro = 'Logradouro é obrigatório';
    if (!novoEndereco.numero) errorsObj.numero = 'Número é obrigatório';
    if (!novoEndereco.bairro) errorsObj.bairro = 'Bairro é obrigatório';
    if (!novoEndereco.cidade) errorsObj.cidade = 'Cidade é obrigatória';
    if (!novoEndereco.uf) errorsObj.uf = 'UF é obrigatória';
    
    if (Object.keys(errorsObj).length > 0) {
      setErrors({...errors, endereco: errorsObj});
      return;
    }
    
    // Adicionar endereço com ID único
    const novoId = Math.max(...enderecos.map(e => e.id), 0) + 1;
    const endereco = {...novoEndereco, id: novoId};
    
    setEnderecos([...enderecos, endereco]);
    setNovoEndereco({
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      principal: false
    });
    setErrors({...errors, endereco: {}});
    setFeedback({...feedback, enderecos: 'Endereço adicionado com sucesso!'});
    
    // Remover feedback após 3 segundos
    setTimeout(() => {
      setFeedback({...feedback, enderecos: ''});
    }, 3000);
  };
  
  // Remover endereço
  const removerEndereco = (id) => {
    setEnderecos(enderecos.filter(e => e.id !== id));
  };
  
  // Definir endereço como principal
  const definirPrincipal = (id) => {
    setEnderecos(enderecos.map(e => ({
      ...e,
      principal: e.id === id
    })));
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
            active={activeTab === 'dados'} 
            onClick={() => changeTab('dados')}
          >
            Dados Pessoais
          </Tab>
          <Tab 
            active={activeTab === 'senha'} 
            onClick={() => changeTab('senha')}
          >
            Alterar Senha
          </Tab>
          <Tab 
            active={activeTab === 'enderecos'} 
            onClick={() => changeTab('enderecos')}
          >
            Endereços de Entrega
          </Tab>
        </TabsContainer>
        
        {/* Aba de Dados Pessoais */}
        <TabContent active={activeTab === 'dados'}>
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
              
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <BotaoPrimario type="submit">Salvar Alterações</BotaoPrimario>
              </div>
            </FormSection>
          </form>
        </TabContent>
        
        {/* Aba de Alterar Senha */}
        <TabContent active={activeTab === 'senha'}>
          <form onSubmit={salvarSenha}>
            <FormSection>
              <Field>
                <Label>Senha Atual</Label>
                <Input 
                  type="password" 
                  name="atual" 
                  value={senha.atual} 
                  onChange={handleSenhaChange} 
                  placeholder="Digite sua senha atual" 
                />
                {errors.senha?.atual && <Error>{errors.senha.atual}</Error>}
              </Field>
              
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
        <TabContent active={activeTab === 'enderecos'}>
          <FormSection>
            <SectionTitle>Meus Endereços</SectionTitle>
            
            {enderecos.map((endereco) => (
              <EnderecoCard key={endereco.id}>
                <EnderecoTitulo>
                  <span>
                    {endereco.principal && 
                      <span style={{ color: '#28c702', marginRight: '5px' }}>★</span>
                    }
                    {endereco.logradouro}, {endereco.numero}
                  </span>
                  <div>
                    {!endereco.principal && (
                      <BotaoSecundario 
                        type="button" 
                        onClick={() => definirPrincipal(endereco.id)}
                        style={{padding: "4px 8px", fontSize: "0.8rem", marginRight: "5px"}}
                      >
                        Definir como Principal
                      </BotaoSecundario>
                    )}
                    <BotaoSecundario 
                      type="button" 
                      onClick={() => removerEndereco(endereco.id)}
                      style={{padding: "4px 8px", fontSize: "0.8rem", backgroundColor: "#666"}}
                    >
                      Remover
                    </BotaoSecundario>
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
                    checked={novoEndereco.principal}
                    onChange={(e) => setNovoEndereco({...novoEndereco, principal: e.target.checked})}
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
      </Box>
    </StyledPerfil>
  );
}

export default Perfil;
