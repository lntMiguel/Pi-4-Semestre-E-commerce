import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

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
  flex-direction: column;
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

const Pesquisar = styled.input`
  padding: 8px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Botao = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => props.color || "#007BFF"};
  color: white;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const AddBotoes = styled.button`
  width: 40px;
  padding: 8px;
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
  overflow-y: auto; 
  overflow-x: hidden; 
  
`;

const Th = styled.th`
  padding: 10px;
  background-color: rgb(22, 77, 9);
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

const ModalConteudo = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitulo = styled.h3`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextoArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const GpBotoes = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Produtos(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Produto A", quantity: 10, price: 100, active: true },
    { id: 2, name: "Produto B", quantity: 5, price: 50, active: false },
    { id: 3, name: "Produto C", quantity: 8, price: 75, active: true },
  ]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchProdutos = async () => {
    try{
      const response = await fetch(`http://localhost:8081/produto?nome=${searchTerm}`);
      const data = await response.json();
      console.log(data);
      
      setProducts(data.map(product => ({
        ...product,
        status: product.status === true ? "Ativo" : "Inativo"
      })))      
    } catch(error){
      console.error("Erro ao buscar produtos:", error);
    }
  }

  useEffect(() => {
    fetchProdutos();
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
  
      const response = await fetch(`http://localhost:8081/produto/${id}/status`, {
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

  const validateFields = () => {
    let newErrors = {};
    if (!formData.nome) newErrors.nome = "Campo obrigatório";
    if (!formData.preco) newErrors.preco = "Campo obrigatório";
    if (!formData.codigo) newErrors.codigo = "Campo obrigatório";
    if (!formData.qtdEstoque) newErrors.qtdEstoque = "Campo obrigatório";
    if (!formData.descDetalhada) newErrors.descDetalhada = "Campo obrigatório";
    if (!formData.avaliacao) newErrors.avaliacao = "Campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    setError("");

    if (!validateFields()) return;

    try {
      const response = await fetch("http://localhost:8081/produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: true }),
      });

      if (response.ok) {
        handleCloseModal(false);
        setFormData({
          nome: "",
          preco: "",
          codigo: "",
          qtdEstoque: "",
          descDetalhada: "" ,
          avaliacao: "",
           
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

  const handleAddProduct = () => {
    setFormData({
      nome: "",
      preco: "",
      codigo: "",
      qtdEstoque: "",
      descDetalhada: "" ,
      avaliacao: "", 
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

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      nome: product.nome,
      preco: product.preco,
      codigo: product.codigo,
      qtdEstoque: product.qtdEstoque,
      descDetalhada: product.descDetalhada,
      avaliacao: product.avaliacao, 
    });
    setShowAlterarModal(true); 
  };

  const handUpdate = async () => {
    setError("");

    const updatedData = new URLSearchParams();
    
    if(formData.nome) updatedData.append("nome",formData.nome);
    if(formData.preco) updatedData.append("preco",formData.preco);
    if(formData.codigo) updatedData.append("codigo",formData.codigo);
    if(formData.qtdEstoque) updatedData.append("qtdEstoque",formData.qtdEstoque);
    if(formData.descDetalhada) updatedData.append("descDetalhada",formData.descDetalhada);
    if(formData.avaliacao)updatedData.append("avaliacao",formData.avaliacao);

    try {
      const response = await fetch(`http://localhost:8081/produto/${editingProduct.id}/dados`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Tipo correto para @RequestParam
        },
        body: updatedData.toString(), // Envia os dados corretamente
          "Content-Type": "application/json",
        },
      );
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      await fetchProdutos(); 
      setShowAlterarModal(false);
  
      const data = await response.json();
      console.log("Produto atualizado:", data);
    } catch (error) {
      console.error(error);
      setError("Erro ao atualizar produto");
    }

  };

 const handleUploadImages = async () => {
  setError(""); // Limpa erros anteriores

  if (!selectedFiles.length || !idProduto) {
    setError("Selecione pelo menos uma imagem e informe o ID do produto.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("idProduto", idProduto);
    
    // Adiciona todas as imagens ao formData
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    // Se houver uma imagem principal selecionada
    if (nomeImagemPrincipal) {
      formData.append("nomeImagemPrincipal", nomeImagemPrincipal);
    }

    const response = await fetch("http://localhost:8081/imagens", {
      method: "POST",
      body: formData, // Envia o FormData
    });

    if (response.ok) {
      setSelectedFiles([]); // Limpa os arquivos selecionados
      setIdProduto(""); // Limpa o ID do produto
      setNomeImagemPrincipal(""); // Limpa o nome da imagem principal
      fetchImagens(); // Atualiza a lista de imagens (caso tenha uma função para isso)
    } else {
      const errorMessage = await response.text();
      setError(errorMessage || "Erro ao fazer upload das imagens.");
    }
  } catch (error) {
    console.error("Erro ao enviar imagens:", error);
    setError("Erro ao fazer upload das imagens.");
  }
};

const handleDeleteImages = async (idImagem) => {
  try {
    const response = await fetch(`http://localhost:8081/imagens/${idImagem}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchImagens(); // Atualiza a lista de imagens após a exclusão
    } else {
      const errorMessage = await response.text();
      setError(errorMessage || "Erro ao excluir imagem.");
    }
  } catch (error) {
    console.error("Erro ao excluir imagem:", error);
    setError("Erro ao excluir imagem.");
  }
};

const fetchImages = async (idProduto) => {
  try {
    const response = await fetch(`http://localhost:8081/imagens/${idProduto}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar imagens");
    }

    const imagens = await response.json();
    return imagens; // Retorna a lista de imagens
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return [];
  }
};
    
  


  return (
    <StyledProdutos>
      <GlobalStyle />
      <Header>
        <Logo src="imagem/logo.png" alt="Logo" />
        <Titulo>Produtos</Titulo>
        <Usuario>
          <Nome>Usuário</Nome>
          <Sair>Sair</Sair>
        </Usuario>
      </Header>

      <Container>
        <TopBar>
          <div>
            <Pesquisar 
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> 
            <Botao color="rgb(22, 77, 9)">Buscar</Botao>
          </div>
          <AddBotoes onClick={() => setModalOpen(true)}>
          +
          </AddBotoes>
        </TopBar>

        <Tabela>
          <thead>
           <tr>
              
           <Th style={{ width: "10%" }}>Código</Th>
          <Th style={{ width: "40%" }}>Nome</Th>
          <Th style={{ width: "10%" }}>Quantidade</Th>
          <Th style={{ width: "10%" }}>Preço</Th>
          <Th style={{ width: "10%" }}>Status</Th>
          <Th style={{ width: "20%" }}>Ações</Th>
           
            </tr>
          </thead>
          <tbody>
          {filteredProducts.map((product) => (
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
                  <Botao color="#007BFF">Alterar</Botao>{() => handleEditClick(product)}
                  <Botao color="#007BFF">Visualizar</Botao>{" "}
                  <Botao color={product.active ? "#dc3545" : "#28a745"}>
                    {product.active ? "Desativar" : "Ativar"}
                  </Botao>
                </Td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      </Container>

      {isModalOpen && (
        <Modal>
          <ModalConteudo>
            <ModalTitulo>Adicionar Produto</ModalTitulo>
            <Input type="text" placeholder="Nome do produto" />
            <Input type="number" placeholder="Preço" />
            <Input type="number" placeholder="Estoque" />
            <TextoArea rows="3" placeholder="Descrição detalhada"></TextoArea>
            <Input type="number" placeholder="Avaliação (1-5)" />
            <Botao color="#007BFF">Adicionar Imagem</Botao>
            <GpBotoes>
              <Botao color="rgb(22, 77, 9)">Concluir</Botao>
              <Botao color="#dc3545" onClick={() => setModalOpen(false)}>
                Cancelar
              </Botao>
            </GpBotoes>
          </ModalConteudo>
        </Modal>
      )}

      
    </StyledProdutos>
  );
}

export default Produtos;