import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";


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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2330f003' fill-opacity='0.59' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 80px 40px;
  background-position: center;
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
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: left;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 850px;
  height: 600px;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Pesquisar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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
  margin-top: 10px;
`;

const Th = styled.th`
  background: rgb(22, 77, 9);
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  color: black;
`;

const BotaoAcao = styled.button`
  padding: 5px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
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

const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
};


function Usuario() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usuarioInvalido, setUsuarioInvalido] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmSenha: "",
    grupo: "admin",
  });
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users?nome=${searchTerm}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    let newErrors = {};
    if (!formData.nome) newErrors.nome = "Campo obrigatório";
    if (!formData.cpf) newErrors.cpf = "Campo obrigatório";
    else if (!validarCPF(formData.cpf)) newErrors.cpf = "CPF inválido";
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

    if (formData.senha !== formData.confirmSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!validarCPF(formData.cpf)) {
      setError("CPF inválido.");
      return;
    }

    if (users.some((user) => user.email === formData.email)) {
      setError("E-mail já cadastrado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: "Ativo" }),
      });

      if (response.ok) {
        setShowModal(false);
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
        setError("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setError("Erro ao cadastrar usuário.");
    }
  };

  const pesquisarUsu = (e) => {
    const query = e.target.value;
    setConsulta(query);

    if (query === '') {
      setUsuarioValido(null); 
      setUsuarioInvalido(false);
    } else {
      const UsuarioValido = usuarios.find(user => user.nome.toLowerCase().includes(query.toLowerCase()));

      if (UsuarioValido) {
        setUsuarioValido(UsuarioValido.id);
        setUsuarioInvalido(false);
      } else {
        setUsuarioValido(null);
        setUsuarioInvalido(true);
      }
    }
  };

  const enterAcionado = (e) => {
    if (e.key === "Enter") {
      pesquisarUsu(e);
    }
  };

  return (
    <StyledUsuario>
      <GlobalStyle />
      <Box>
        <Titulo>Lista de Usuários</Titulo>
        <Pesquisar>
          <Input 
            type="text" 
            placeholder="Pesquisar usuário..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddBotoes onClick={() => setShowModal(true)}>+</AddBotoes>
        </Pesquisar>

        {showModal && (
          <Modal>
            <ModalContent>
              <h2>Cadastrar Usuário</h2>
              <Input name="nome" placeholder="Nome" onChange={handleInputChange} />
              <Input name="cpf" placeholder="CPF" onChange={handleInputChange} />
              <Input name="email" type="email" placeholder="E-mail" onChange={handleInputChange} />
              <Input name="senha" type="password" placeholder="Senha" onChange={handleInputChange} />
              <Input name="confirmSenha" type="password" placeholder="Confirmar Senha" onChange={handleInputChange} />
              <Select name="grupo" onChange={handleInputChange}>
                <option value="admin">Admin</option>
                <option value="estoquista">Estoquista</option>
              </Select>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <BotaoAcao onClick={handleSave}>Cadastrar</BotaoAcao>
              <BotaoAcao onClick={() => setShowModal(false)}>Cancelar</BotaoAcao>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </StyledUsuario>
  );
}

export default Usuario;
