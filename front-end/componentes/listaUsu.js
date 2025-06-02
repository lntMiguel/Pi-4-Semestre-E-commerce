import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
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
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
`;

const StyledUsuario = styled.div`
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const ModalContent = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 30px;
  width: 400px;
  text-align: left;
  
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  /* margin: 5px 0; // REMOVER OU AJUSTAR SE O FormGroup FOR USADO */
  border: 1px solid #ccc;
  border-radius: 50px; // Mantendo seu estilo original
  box-sizing: border-box; // Adicionado para consistência
`;


const Box = styled.div`
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 1050px;
  height: 800px;
  
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

const Pesquisar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
  padding: 12px 15px;
  /* margin: 12px; // REMOVER OU AJUSTAR SE O FormGroup FOR USADO */
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1rem;
  transition: border 0.3s;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); // Adiciona um brilho no foco
  }

  &:disabled {
    background: #e9ecef; // Cor de desabilitado um pouco mais clara
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const AddBotoes = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: rgb(22, 77, 9);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #28c702;
  }
`;

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;

  
`;

const Th = styled.th`
  background: rgb(22, 77, 9);
  color: white;
  padding: 10px;
  text-align: center;
  
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  color: black;
`;

const TdStatus = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.status === "Ativo" ? "green" : "red")};
`;

const Tbody = styled.tbody`
  display: block;
  width: 99%;
  height: 600px;  
  overflow-y: auto; 
  overflow-x: hidden; 

  /* Scrollbar transparente */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* ou 'none' */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const Label = styled.label`
  font-size: 0.9em; // Um pouco menor que o texto padrão
  color: #333;     // Cor escura para boa legibilidade
  margin-bottom: 0.3rem; // Pequeno espaço entre o label e o input
  font-weight: 600; // Um leve negrito para destacar
  text-align: left; // Garante que o label esteja alinhado à esquerda
`;

const Tr = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

const BotaoAcao = styled.button`
  padding: 5px 15px;
  margin: 5px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
  background-color: ${(props) => (props.primary === "true" ? "#007BFF" : "#DC3545")};
  color: white;

  &:hover {
    background-color: ${(props) => (props.primary === "true" ? "#0056b3" : "#b52b27")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const BotaoRetornar = styled.button`
  position: absolute;
  top: 20px; /* Distância do topo */
  left: 20px; /* Distância da direita */
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.2); /* Um pouco transparente para se misturar */
  color: #fff; /* Cor do texto branca para contrastar com o fundo escuro */
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px; /* Espaço entre o ícone e o texto */
  transition: background-color 0.3s, border-color 0.3s;
  z-index: 100; /* Para garantir que fique sobre outros elementos */

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
  }

  /* Estilo para o ícone (pode ser um caractere de seta ou um SVG) */
  .arrow-icon {
    font-size: 18px; // Ajuste o tamanho conforme necessário
    line-height: 1;
  }
`;

function Usuario() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showAlterarModal, setShowAlterarModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmSenha: "",
    grupo: "admin",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [senhaHabilitada, setSenhaHabilitada] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users?nome=${searchTerm}`);
      const data = await response.json();
      console.log(data);

      setUsers(data.map(user => ({
        ...user,
        status: user.status === true ? "Ativo" : "Inativo"
      })));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    }, [searchTerm]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  
    }));
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo"; 
  
      const response = await fetch(`http://localhost:8081/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), 
      });
  
      if (!response.ok) {
        throw new Error("Erro ao alterar status");
      }
  
      setUsers(users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    }
  };
  const handleCPFInput = (valor, setFormData) => {
  // Remove caracteres que não sejam números, pontos ou traços
  const valorLimpo = valor.replace(/[^\d.\-]/g, '');
  
  // Limita o comprimento total a 14 caracteres (CPF formatado completo)
  if (valorLimpo.length > 14) {
    return;
  }
  
  // Formata automaticamente
  const valorFormatado = formatarCPF(valorLimpo);
  
  // Atualiza o estado do formulário
  setFormData(prev => ({
    ...prev,
    cpf: valorFormatado
  }));
};

const handleCPFKeyDown = (e) => {
  // Permite: backspace, delete, tab, escape, enter, home, end, setas
  if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
      // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)) {
    return;
  }
  // Bloqueia se não for número
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
};

  const validarCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Impede CPFs com números repetidos como 111.111.111-11
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let soma = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * peso;
      peso--;
    }
    let digito1 = (soma * 10) % 11;
    if (digito1 === 10 || digito1 === 11) digito1 = 0;
    if (digito1 !== parseInt(cpf[9])) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    peso = 11;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * peso;
      peso--;
    }
    let digito2 = (soma * 10) % 11;
    if (digito2 === 10 || digito2 === 11) digito2 = 0;
    if (digito2 !== parseInt(cpf[10])) return false;

    return true;
  };

const formatarCPF = (valor) => {
  // Remove todos os caracteres não numéricos
  const numeroLimpo = valor.replace(/[^\d]/g, '');
  
  // Limita a 11 dígitos
  const numeroLimitado = numeroLimpo.slice(0, 11);
  
  // Aplica a formatação conforme o tamanho
  if (numeroLimitado.length <= 3) {
    return numeroLimitado;
  } else if (numeroLimitado.length <= 6) {
    return `${numeroLimitado.slice(0, 3)}.${numeroLimitado.slice(3)}`;
  } else if (numeroLimitado.length <= 9) {
    return `${numeroLimitado.slice(0, 3)}.${numeroLimitado.slice(3, 6)}.${numeroLimitado.slice(6)}`;
  } else {
    return `${numeroLimitado.slice(0, 3)}.${numeroLimitado.slice(3, 6)}.${numeroLimitado.slice(6, 9)}-${numeroLimitado.slice(9)}`;
  }
};

  const validateFields = () => {
    let newErrors = {};

    if (!formData.nome) newErrors.nome = "Campo obrigatório";
    if (!formData.cpf) newErrors.cpf = "Campo obrigatório";
    else if (!validarCPF (formatarCPF(formData.cpf))) newErrors.cpf = "CPF inválido";
    if (!formData.email) newErrors.email = "Campo obrigatório";
    if (!formData.senha) newErrors.senha = "Campo obrigatório";
    if (!formData.confirmSenha) newErrors.confirmSenha = "Campo obrigatório";
    else if (formData.senha !== formData.confirmSenha) newErrors.confirmSenha = "As senhas não coincidem";

    if (users.some((user) => user.email === formData.email)) {
      newErrors.email = "E-mail já cadastrado";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSave = async () => {
    setError("");

    if (!validateFields()) return;

    try {
      const response = await fetch("http://localhost:8081/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: true }),
      });

      if (response.ok) {
        handleCloseModal(false);
        setFormData({
          nome: "",
          cpf: "",
          email: "",
          senha: "",
          confirmSenha: "",
          grupo: "admin",
        });
        fetchUsers();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setError("Erro ao cadastrar usuário.");
    }
  };

  const handleAddUser = () => {
    setFormData({
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      confirmSenha: "",
      grupo: "admin", 
    });
    setShowCadastroModal(true); 
  };

  const resetForm = () => {
    setErrors({});
  };
  const handleCloseEditModal = () => {
    resetForm();
    setShowAlterarModal(false); 
  };
  const handleCloseModal = () => {
    resetForm(); 
    setShowCadastroModal(false); 
  };
  const handleRetornarLoja = () => {
    router.push('/main');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      senha: "", 
      confirmSenha: "",
      grupo: user.grupo,
    });
    setShowAlterarModal(true); 
  };

  const handleUpdate = async () => {
    setError(""); // Limpa mensagens de erro gerais
    setErrors({}); // Limpa erros específicos de campos

    let newErrors = {}; // Objeto para coletar novos erros

    // Validação de senha SOMENTE se a alteração de senha estiver habilitada
    if (senhaHabilitada) {
      if (!formData.senha) {
        newErrors.senha = "Nova senha é obrigatória.";
      }
      if (!formData.confirmSenha) {
        newErrors.confirmSenha = "Confirmação de senha é obrigatória.";
      } else if (formData.senha && formData.senha !== formData.confirmSenha) {
        newErrors.confirmSenha = "As senhas não coincidem.";
      }
    }

    // Se houver erros de validação de senha (ou outros que você possa adicionar no futuro)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Interrompe a execução se houver erros
    }
  
    const updatedData = new URLSearchParams();
    if (formData.nome) updatedData.append("nome", formData.nome);
    if (formData.cpf) updatedData.append("cpf", formData.cpf);
    if (senhaHabilitada && formData.senha) {
      updatedData.append("senha", formData.senha);
    }    if (formData.grupo) updatedData.append("grupo", formData.grupo);
  
    try {
      const response = await fetch(`http://localhost:8081/users/${editingUser.id}/dados`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Tipo correto para @RequestParam
        },
        body: updatedData.toString(), // Envia os dados corretamente
          "Content-Type": "application/json",
        },
      );
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      await fetchUsers(); 
      setShowAlterarModal(false);
      setSenhaHabilitada(false);
      const data = await response.json();
      console.log("Usuário atualizado:", data);
    } catch (error) {
      console.error(error);
      setError("Erro ao atualizar usuário");
    }
  };
  
  return (
    <StyledUsuario>
      <GlobalStyle />
      <BotaoRetornar onClick={handleRetornarLoja}>
        <span className="arrow-icon">←</span> {/* Seta para a esquerda Unicode */}
        Voltar para o Painel de controle
      </BotaoRetornar>
      <Box>
        <Titulo>Lista de Usuários</Titulo>
        <Pesquisar>
          <Input
            type="text"
            placeholder="Pesquisar usuário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddBotoes onClick={() => handleAddUser(true)}>+</AddBotoes>
        </Pesquisar>

        {showCadastroModal && (
          <Modal>
            <ModalContent>
              <h2>Cadastrar Usuário</h2>
              <Input name="nome" placeholder="Nome" onChange={handleInputChange} />
              {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
              <Input maxLength={11} name="cpf" placeholder="CPF" onChange={handleInputChange} />
              {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
              <Input name="email" type="email" placeholder="E-mail" onChange={handleInputChange} />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              <Input name="senha" type="password" placeholder="Senha" onChange={handleInputChange} />
              {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
              <Input name="confirmSenha" type="password" placeholder="Confirmar Senha" onChange={handleInputChange} />
              {errors.confirmSenha && <ErrorMessage>{errors.confirmSenha}</ErrorMessage>}
              <Select name="grupo" onChange={handleInputChange}>
                <option value="admin">Admin</option>
                <option value="estoquista">Estoquista</option>
              </Select>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <BotaoAcao onClick={handleSave}>Cadastrar</BotaoAcao>
              <BotaoAcao onClick={() => handleCloseModal()}> Cancelar</BotaoAcao>
            </ModalContent>
          </Modal>
        )}
{showAlterarModal && (
  <Modal>
  <ModalContent>
    <h2>Alterar Usuário</h2>
    <Label>Nome:</Label>
    <Input
      name="nome"
      placeholder="Nome"
      value={formData.nome}
      onChange={handleInputChange}
    />
    <Label>CPF:</Label>
    <Input
      name="cpf"
      
      value={formData.cpf}
      onChange={(e) => handleCPFInput(e.target.value, setFormData)}
      onKeyDown={handleCPFKeyDown}
      maxLength={11}
      placeholder="00000000000"
    />
    <Label>Email:</Label>
    <Input
       name="email"
       type="email"
       placeholder="E-mail"
       value={formData.email}
       onChange={handleInputChange}
       disabled={true}  
       style={{ backgroundColor: "#e0e0e0", cursor: "not-allowed" }}
    />
    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
    <label>
      <input 
        type="checkbox" 
        checked={senhaHabilitada} 
        onChange={() => setSenhaHabilitada(!senhaHabilitada)}
      /> Alterar senha
    </label>
    <Input
      name="senha"
      type="password"
      placeholder="Senha"
      value={formData.senha}
      onChange={handleInputChange}
      disabled={!senhaHabilitada}
      style={{ backgroundColor: !senhaHabilitada ? "#e0e0e0" : "white" }}
    />
     
    {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
    <Input
      name="confirmSenha"
      type="password"
      placeholder="Confirmar Senha"
      value={formData.confirmSenha}
      onChange={handleInputChange}
      disabled={!senhaHabilitada}
      style={{ backgroundColor: !senhaHabilitada ? "#e0e0e0" : "white" }}
    />
    {errors.confirmSenha && <ErrorMessage>{errors.confirmSenha}</ErrorMessage>}
    <Label>Grupo:</Label>
    <Select name="grupo" value={formData.grupo} onChange={handleInputChange}>
      <option value="admin">Admin</option>
      <option value="estoquista">Estoquista</option>
    </Select>
    {error && <ErrorMessage>{error}</ErrorMessage>}
    <BotaoAcao onClick={handleUpdate}>Salvar Alterações</BotaoAcao>
    <BotaoAcao onClick={() => handleCloseEditModal()}> Cancelar</BotaoAcao>
  </ModalContent>
</Modal>
)}
          <Tabela>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Grupo</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
          </Tabela>
          <Tabela>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.nome}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.grupo === "admin" ? "Admin" : "Estoquista"}</Td>
                  <TdStatus status={user.status}>{user.status}</TdStatus>
                  <Td>
                    <BotaoAcao primary="true" onClick={() => handleEditUser(user)}>
                      Alterar
                    </BotaoAcao>
                    <BotaoAcao onClick={() => toggleStatus(user.id, user.status)}>
                      {user.status === "Ativo" ? "Desabilitar" : "Habilitar"}
                    </BotaoAcao>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Tabela>
      </Box>
    </StyledUsuario>
  );
}

export default Usuario;