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

function Usuario() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  const [usuarioInvalido, setUsuarioInvalido] = useState(false);


  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users?nome=${searchTerm}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Usar o useEffect para buscar os usuários assim que o componente for montado
  useEffect(() => {
    fetchUsers();
  }, [searchTerm]); // Dependência no searchTerm para atualizar a lista ao alterar a pesquisa

  // Função para alternar o status de um usuário
  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo"; // Define o novo status

      const response = await fetch(`http://localhost:8081/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus, // Envia o novo status
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao alterar status");
      }

      // Atualiza o estado com o novo status do usuário
      setUsers(users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    }
const Mensagem = styled.p`
  color: red;
  margin-top: 10px;
`;


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
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o searchTerm conforme digita
            onKeyDown={enterAcionado}

          />
          <AddBotoes>+</AddBotoes>
        </Pesquisar>

        {usuarioInvalido && <Mensagem>Nenhum usuário encontrado</Mensagem>}

        <Tabela>
          <thead>
            <tr>
              <Th>Nome</Th><Th>Email</Th><Th>Status</Th><Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <Td>{user.nome}</Td><Td>{user.email}</Td>
                <Td>{user.status === "Ativo" ? "Ativo" : "Inativo"}</Td>
                <Td>
                  <BotaoAcao primary="true">Alterar</BotaoAcao>
                  <BotaoAcao onClick={() => toggleStatus(user.id, user.status)}>

                    {user.status === "Ativo" ? "Desabilitar" : "Habilitar"}
                  </BotaoAcao>
                </Td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      </Box>
    </StyledUsuario>
  );
}

export default Usuario;
