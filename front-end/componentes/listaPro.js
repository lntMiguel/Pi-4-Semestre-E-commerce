import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";

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

const StyledProdutos = styled.div`
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

const Nome = styled.span`
  margin-right: 10px;
`;

const Sair = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;
const Container = styled.div`
   width: 90%;
  margin-top: 80px; 
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

const SearchInput = styled.input`
  padding: 8px;
  width: 200px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => props.color || "#007BFF"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Status = styled.span`
  color: ${(props) => (props.active ? "green" : "red")};
  font-weight: bold;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Produtos(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: "Produto A", quantity: 10, price: 100, active: true },
    { id: 2, name: "Produto B", quantity: 5, price: 50, active: false },
  ]);

  return (
    <StyledProdutos>
      <GlobalStyle />
      <Header>
        <Logo src="logo.png" alt="Logo" />
        <Titulo>Produtos</Titulo>
        <Usuario>
          <Nome>Usuário</Nome>
          <Sair>Sair</Sair>
        </Usuario>
      </Header>

      <Container>
        <TopBar>
          <div>
            <SearchInput type="text" placeholder="Buscar produto..." />
            <Button color="#28a745">Buscar</Button>
          </div>
          <Button color="#17a2b8" onClick={() => setModalOpen(true)}>
            Adicionar Produto
          </Button>
        </TopBar>

        <Table>
          <thead>
            <tr>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Quantidade</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.quantity}</Td>
                <Td>R$ {product.price}</Td>
                <Td>
                  <Status active={product.active}>
                    {product.active ? "Ativo" : "Inativo"}
                  </Status>
                </Td>
                <Td>
                  <Button color="#ffc107">Alterar</Button>{" "}
                  <Button color="#007BFF">Visualizar</Button>{" "}
                  <Button color={product.active ? "#dc3545" : "#28a745"}>
                    {product.active ? "Desativar" : "Ativar"}
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>Adicionar Produto</ModalTitle>
            <Input type="text" placeholder="Nome do produto" />
            <Input type="number" placeholder="Preço" />
            <Input type="number" placeholder="Estoque" />
            <TextArea rows="3" placeholder="Descrição detalhada"></TextArea>
            <Input type="number" placeholder="Avaliação (1-5)" />
            <Button color="#6c757d">Adicionar Imagem</Button>
            <ButtonGroup>
              <Button color="#28a745">Concluir</Button>
              <Button color="#dc3545" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </StyledProdutos>
  );
}

export default Produtos;