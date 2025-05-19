import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Header = styled.div`
  width: 90%;
  height: 120px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: black;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.img`
  height: 90px;
  border-radius: 50px;
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

const Container = styled.div`
   width: 90%;
   height: 70%;
  margin-top: 40px; 
  background: #f0f0f0;
  padding: 20px;
  border-radius: 50px;
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
  border-radius: 50px;
`;

const Botao = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => props.color || "#007BFF"};
  color: white;
  margin-left: 10px;
  border: none;
  border-radius: 50px;
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalConteudo = styled.div`
  background: #f0f0f0;
  padding: 25px;
  width: 450px;
  border-radius: 50px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitulo = styled.h3`
  margin-bottom: 15px;
  font-size: 22px;
  color: #333;
  font-weight: bold;
`;

const ProdutoInfo = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:disabled {
    background: #f4f4f4;
    cursor: not-allowed;
  }
`;

const GpBotoes = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const TextoArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
  resize: none;
  height: 80px;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:disabled {
    background: #f4f4f4;
    cursor: not-allowed;
  }
`;

const BotaoSalvar = styled.button`
  background: #28a745;
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }

  &:disabled {
    background: #b0b0b0;
    cursor: not-allowed;
  }
`;

const BotaoCancelar = styled.button`
  background: #dc3545;
  color: #fff;
  padding: 10px 18px;
  margin-left: 10px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c82333;
  }
`;

// Estilo do carrossel
const StyledSlider = styled(Slider)`
  margin: 15px 0;
  margin-bottom: 30px;

  .slick-prev, .slick-next {
    z-index: 1;
    color: #333;
  }

  .slick-dots {
    bottom: -25px;
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: contain;
    border-radius: 8px;
  }
`;

function Produtos() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    preco: "",
    qtdEstoque: "",
    descDetalhada: "",
    avaliacao: "",
  });
  const [viewingProduct, setViewingProduct] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [nomeImagemPrincipal, setNomeImagemPrincipal] = useState("");
  const [imagemPrincipalIndex, setImagemPrincipalIndex] = useState(null);
  const { grupo } = useAuth();
  const [imagemPrincipal, setImagemPrincipal] =  useState(() => {
    const principal = viewingProduct?.imagens?.find(img => img.principal);
    return principal ? principal.id : null;
  }); // imagemPrincipalId deve vir do backend

  const handleImagemPrincipal = (event) => {
    const index = parseInt(event.target.value);
    
    // Atualizar o estado para definir a imagem principal
    setSelectedFiles(prevFiles => 
      prevFiles.map((file, i) => ({
        ...file,
        isPrincipal: i === index,
      }))
    );
  };

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    try{fetchProdutos();

    } catch(error) {
        console.error('Erro ao buscar produtos:', error);
        setCount(1);
      };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleStatus = async (id, currentStatus) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja alterar o status do produto para ${currentStatus === "Ativo" ? "Inativo" : "Ativo"}?`
    );

    if (!confirmacao) {
      return; // Se a confirmação for negada, não faz nada.
    }
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

      // Atualiza corretamente o estado
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, status: newStatus } : product
        )
      );

      console.log(`Status do produto ${id} alterado para ${newStatus}`);
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    }
  };

  const handleSave = async () => {
    console.log("handleSave iniciado");

    const productData = {
      nome: formData.nome,
      codigo: formData.codigo,
      preco: formData.preco,
      qtdEstoque: formData.qtdEstoque,
      descDetalhada: formData.descDetalhada,
      avaliacao: formData.avaliacao,
    };
    try {
      const response = await fetch("http://localhost:8081/produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao adicionar produto");
      }
  
      const result = await response.json();
      console.log("Produto adicionado:", result);
      const formDataImages = new FormData();
      formDataImages.append("idProduto", result.id); // Usando o ID do produto recém-criado
  
      selectedFiles.forEach((file) => {
        formDataImages.append("files", file.file);
        if (file.isPrincipal) {
          console.log(file.file.name)
          formDataImages.append("nomeImagemPrincipal", file.file.name); // Adiciona a imagem principal
        }
      });
  
      const imageUploadResponse = await fetch("http://localhost:8081/imagens", {
        method: "POST",
        body: formDataImages,
      });

      if (!imageUploadResponse.ok) {
        throw new Error("Erro ao enviar imagens");
      }
  
      alert("Produto e imagens adicionados com sucesso!");
      
      setProducts((prevProducts) => [
        {
          ...result,
          status: "Ativo",
          qtdEstoque: productData.qtdEstoque,
        },
        ...prevProducts,
      ]);

      setModalOpen(false); // Fecha o modal
      resetForm(); // Reseta o formulário
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setError("Erro ao adicionar produto");
    }
  };
  
  const resetForm = () => {
    setError({});
    setFormData({
      nome: "",
      codigo: "",
      preco: "",
      qtdEstoque: "",
      descDetalhada: "",
      avaliacao: "",
    });
    setSelectedFiles([]);  // Limpar arquivos selecionados
    setImagemPrincipalIndex(null);  // Limpar a imagem principal selecionada
    setNomeImagemPrincipal("");
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch(`http://localhost:8081/produto?nome=${searchTerm}`);
      const data = await response.json();
      console.log(data);
  
      setProducts(
        data
          .map(product => ({
            ...product,
            status: product.status === true ? "Ativo" : "Inativo"
          }))
          .reverse() // <- Aqui inverte!
      );
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleViewClick = async (product) => {

    setViewModalOpen(true); // Abre o modal primeiro
  
    const imagens = await fetchImages(product.id); // Busca as imagens antes de atualizar o estado
    
    setViewingProduct({
      ...product,
      imagens, 
    });

    const imagemPrincipal = imagens.find(img => img.principal === true);
    if (imagemPrincipal) {
      setImagemPrincipal(imagemPrincipal.id);
    } else {
      setImagemPrincipal(null); // limpa caso não tenha principal
    }
  };

  const handleCloseModal = () => {
    resetForm();
    setModalOpen(false);
  };

  const handleEditProduct = async (product) => {
    setEditingProduct(product);
    setFormData({
      nome: product.nome,
      codigo: product.codigo,
      preco: product.preco,
      qtdEstoque: product.qtdEstoque,
      descDetalhada: product.descDetalhada,
      avaliacao: product.avaliacao,
    });
    const imagens = await fetchImages(product.id);

    setViewingProduct({
      ...product,
      imagens, 
    });
    setEditModalOpen(true);
  };

  const handUpdate = async () => {
    setError("");
    const updatedData = new URLSearchParams();
  
    if (formData.nome) updatedData.append("nome", formData.nome);
    if (formData.preco) updatedData.append("preco", formData.preco);
    if (formData.codigo) updatedData.append("codigo", formData.codigo);
    if (formData.qtdEstoque) updatedData.append("qtdEstoque", formData.qtdEstoque);
    if (formData.descDetalhada) updatedData.append("descDetalhada", formData.descDetalhada);
    if (formData.avaliacao) updatedData.append("avaliacao", formData.avaliacao);
  
    console.log("Dados para atualização:", updatedData.toString());
  
    try {
      // Atualizando os dados do produto
      const response = await fetch(`http://localhost:8081/produto/${editingProduct.id}/dados`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updatedData.toString(),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro retornado da API:", errorData);
        throw new Error(errorData.error || "Erro ao atualizar produto");
      }
  
      // Se houver imagens selecionadas, faz o upload
      if (selectedFiles.length > 0) {
        const formDataImages = new FormData();
        formDataImages.append("idProduto", editingProduct.id);
        selectedFiles.forEach((file) => {
          formDataImages.append("files", file.file);
        });
  
        const imageUploadResponse = await fetch("http://localhost:8081/imagens", {
          method: "POST",
          body: formDataImages,
        });
  
        if (!imageUploadResponse.ok) {
          throw new Error("Erro ao enviar imagens");
        }
      }

      if (imagemPrincipal) {
        await fetch(`http://localhost:8081/imagens?idProduto=${editingProduct.id}&idImagem=${imagemPrincipal}`, {
          method: "PUT",
        });
      }
  
      alert("Produto atualizado com sucesso!");
  
      await fetchProdutos(); // Atualiza a lista de produtos após a atualização
      setEditModalOpen(false); // Fecha o modal de edição
  
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setError("Erro ao atualizar produto: " + error.message); // Exibe a mensagem de erro detalhado
    }
  };
  

  const handleDeleteImages = async (idImagem) => {
    try {
      const response = await fetch(`http://localhost:8081/imagens/${idImagem}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchImages(); // Atualiza a lista de imagens após a exclusão
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
      const caminhoBase = "http://localhost:8081/";
      const imagensComCaminho = imagens.map(imagem => ({
        ...imagem,
        url: `${caminhoBase}${imagem.caminho}`, 
      }));
  
      return imagensComCaminho;
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      return [];
    }
  };
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filesComPrincipal = files.map((file, index) => ({
      file,
      isPrincipal: index === 0, // Define a primeira imagem como principal por padrão
    }));
    setSelectedFiles(filesComPrincipal);

  };


  return (
    <StyledProdutos>
      <GlobalStyle />
      <Header>
        <Logo src="imagens/logo.png" alt="Logo" />
        <Titulo>Produtos</Titulo>
        <Usuario>
          <Nome>{grupo === "admin" ? "Administrador" : "Estoquista"}</Nome>
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
          <AddBotoes onClick={() => { resetForm(); setModalOpen(true); }}>
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
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <Td>{product.codigo}</Td>
                <Td>{product.nome}</Td>
                <Td>{product.qtdEstoque}</Td>
                <Td>R$ {product.preco}</Td>
                <Td>
                  <Status disabled={grupo === "estoquista"} active={product.status === "Ativo" ? "true" : undefined}>
                    {product.status}
                  </Status>
                </Td>
                <td>
                  <Botao color="#007BFF" onClick={() => handleEditProduct(product)}>
                    Alterar
                  </Botao>
                  <Botao color="#007BFF" onClick={() => handleViewClick(product)}>
                    Visualizar
                  </Botao>
                  <Botao
                    onClick={() => toggleStatus(product.id, product.status)}
                    style={{
                      backgroundColor: grupo === "estoquista" ? "gray" : (product.status === "Ativo" ? "green" : "red"),
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: grupo === "estoquista" ? "not-allowed" : "pointer",
                      opacity: grupo === "estoquista" ? 0.5 : 1,
                    }}
                    disabled={grupo === "estoquista"}
                  >
                    {product.status === "Ativo" ? "Desativar" : "Ativar"}
                  </Botao>
                </td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      </Container>
      {isModalOpen && (
        <Modal>
          <ModalConteudo>
            <ModalTitulo>Adicionar Produto</ModalTitulo>
            <Input
              type="text"
              name="nome"
              placeholder="Nome do Produto"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="codigo"
              placeholder="Código do Produto"
              value={formData.codigo}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              name="preco"
              placeholder="Preço"
              value={formData.preco}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              name="qtdEstoque"
              placeholder="Quantidade em Estoque"
              value={formData.qtdEstoque}
              onChange={handleInputChange}
            />
            <TextoArea
              name="descDetalhada"
              placeholder="Descrição Detalhada"
              value={formData.descDetalhada}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              name="avaliacao"
              placeholder="Avaliação"
              value={formData.avaliacao}
              onChange={handleInputChange}
            />
            <Input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      {selectedFiles.length > 0 && ( 
        <div>
          <h4>Imagens Selecionadas:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.file.name}<input 
              type="radio" 
              name="principal" 
              value={index}
              onChange={handleImagemPrincipal}
              checked={selectedFiles[index].isPrincipal} 
            />Principal</li>
            ))}
          </ul>
        </div>
      )}
            <GpBotoes>
              <Botao onClick={handleSave}>Salvar</Botao>
              <Botao onClick={handleCloseModal}>Cancelar</Botao>
            </GpBotoes>
          </ModalConteudo>
        </Modal>
      )}
      
      {isEditModalOpen && viewingProduct &&(
        <Modal>
        <ModalConteudo>
          <ModalTitulo>Editar Produto</ModalTitulo>
          <>
            <Input
              type="text"
              name="nome"
              placeholder="Nome do Produto"
              value={formData.nome}
              onChange={handleInputChange}
              disabled={grupo === "estoquista"}
            />
            <Input
              type="text"
              name="codigo"
              placeholder="Código do Produto"
              value={formData.codigo}
              onChange={handleInputChange}
              disabled={grupo === "estoquista"}
            />
            <Input
              type="number"
              name="preco"
              placeholder="Preço"
              value={formData.preco}
              onChange={handleInputChange}
              disabled={grupo === "estoquista"}
            />
            <Input
              type="number"
              name="qtdEstoque"
              placeholder="Quantidade em Estoque"
              value={formData.qtdEstoque}
              onChange={handleInputChange}
            />
            <TextoArea
              name="descDetalhada"
              placeholder="Descrição Detalhada"
              value={formData.descDetalhada}
              onChange={handleInputChange}
              disabled={grupo === "estoquista"}
            />
            <Input
              type="number"
              name="avaliacao"
              placeholder="Avaliação"
              value={formData.avaliacao}
              onChange={handleInputChange}
              disabled={grupo === "estoquista"}
            />

<h3>Imagens do Produto</h3>
{viewingProduct.imagens && viewingProduct.imagens.length > 0 ? (
  <StyledSlider dots={true} infinite={false} speed={500} slidesToShow={2} slidesToScroll={1}>
    {viewingProduct.imagens.map((imagem, index) => (
      <div key={index}>
        {/* Container relativo para cada slide */}
        <div style={{ position: "relative", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img 
            src={`../${imagem.caminhoArquivo.slice(22)}`} 
            alt={`Imagem ${index + 1}`} 
            style={{
              width: "100px",
              height: "100px",
              border: imagem.id === imagemPrincipal ? "3px solid green" : "1px solid #ccc",
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />

          {/* Tag "Principal" — só aparece se for a principal */}
          {imagem.id === imagemPrincipal && (
            <div style={{
              position: "absolute",
              top: 5,
              left: 5,
              backgroundColor: "green",
              color: "white",
              padding: "2px 6px",
              fontSize: "12px",
              borderRadius: "4px",
              zIndex: 10
            }}>
              Principal
            </div>
          )}

          {/* Botões */}
          <div style={{ marginTop: "5px", display: "flex", gap: "5px" }}>
            {imagem.id !== imagemPrincipal && (
              <button onClick={() => setImagemPrincipal(imagem.id)}>
                Definir como Principal
              </button>
            )}
            <button onClick={() => handleDeleteImages(imagem.id)}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    ))}
  </StyledSlider>
) : (
  <p>Sem imagens para exibir.</p>
)}
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange} 
          accept="image/*" 
        />
            </>
            <GpBotoes>
          <BotaoSalvar onClick={handUpdate}>Salvar</BotaoSalvar>
          <BotaoCancelar onClick={() => setEditModalOpen(false)}>Cancelar</BotaoCancelar>
        </GpBotoes>
      </ModalConteudo>
        </Modal>
      )}
{isViewModalOpen && viewingProduct && (
  <Modal>
  <ModalConteudo>
    <ModalTitulo>Detalhes do Produto</ModalTitulo>
    <ProdutoInfo><strong>Nome:</strong> {viewingProduct.nome}</ProdutoInfo>
    <ProdutoInfo><strong>Código:</strong> {viewingProduct.codigo}</ProdutoInfo>
    <ProdutoInfo><strong>Preço:</strong> R$ {viewingProduct.preco}</ProdutoInfo>
    <ProdutoInfo><strong>Quantidade em Estoque:</strong> {viewingProduct.qtdEstoque}</ProdutoInfo>
    <ProdutoInfo><strong>Descrição:</strong> {viewingProduct.descDetalhada}</ProdutoInfo>
    <ProdutoInfo><strong>Avaliação:</strong> {viewingProduct.avaliacao} ⭐</ProdutoInfo>

    {viewingProduct.imagens && viewingProduct.imagens.length > 0 ? (
      <StyledSlider dots={true} infinite={false} speed={500} slidesToShow={1} slidesToScroll={1}>
        {viewingProduct.imagens.map((imagem, index) => (
          <div key={index}>
            <img 
              src={`../` + imagem.caminhoArquivo.slice(22)} 
              alt={`Imagem ${index + 1}`} 
            />
          </div>
        ))}
      </StyledSlider>
    ) : (
      <ProdutoInfo>Sem imagens disponíveis.</ProdutoInfo>
    )}

    <GpBotoes>
      <BotaoCancelar onClick={() => setViewModalOpen(false)}>Fechar</BotaoCancelar>
    </GpBotoes>
  </ModalConteudo>
</Modal>
)}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              backgroundColor: currentPage === index + 1 ? "green" : "lightgray",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </StyledProdutos>
  );
}

export default Produtos;