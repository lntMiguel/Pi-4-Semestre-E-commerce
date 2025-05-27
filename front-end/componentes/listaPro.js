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

const imageButtonsContainerStyles = {
  marginTop: "auto",
  display: "flex",
  flexDirection: 'column',
  gap: "5px",
  width: '100%',
};

const imageActionButtonStyles = {
  fontSize: '11px',
  padding: '5px 8px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  width: '100%',
  transition: 'background-color 0.2s',
};

const deleteButtonStyles = {
  ...imageActionButtonStyles,
  backgroundColor: '#ffdddd',
  borderColor: '#ffaaaa',
  color: '#d8000c', 
};

const principalButtonStyles = {
  ...imageActionButtonStyles,
  color: 'white', 
  borderColor: 'rgb(39, 180, 7)',
  backgroundColor: 'rgb(22, 77, 9)',
}

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

const imagePreviewStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover', // 'cover' preenche o espaço, 'contain' mostra a imagem inteira
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '5px',
};

const principalImageBorder = '3px solid green'; // Para imagem principal existente
const principalNewImageBorder = '3px solid blue'; // Para nova imagem marcada como principal

const imageItemContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  border: '1px solid #eee',
  padding: '10px',
  borderRadius: '8px',
  width: '130px', // Largura total do card da imagem
  position: 'relative', // Para a tag "Principal"
  margin: '5px',
};

const imageNameStyles = {
  fontSize: '12px',
  wordBreak: 'break-all',
  height: '30px', // Para garantir altura consistente mesmo com nomes curtos/longos
  overflow: 'hidden',
  marginBottom: '5px',
};

const imageButtonStyles = {
  fontSize: '10px',
  padding: '3px 6px',
  margin: '0 2px',
  cursor: 'pointer',
};

const principalTagStyles =  {
  position: 'absolute',
  top: '5px',
  left: '5px',
  backgroundColor: 'rgba(0,0,0,0.6)',
  color: 'white',
  padding: '2px 5px',
  fontSize: '10px',
  borderRadius: '3px',
  zIndex: 1,
};

const Header = styled.div`
  width: 90%;
  height: 120px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 35px;
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
  
  /* Scrollbar transparente */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* ou 'none' */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const ModalConteudo = styled.div`
  background: #f0f0f0;
  padding: 25px;
  width: 550px;
  border-radius: 50px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;

  /* Scrollbar transparente */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* ou 'none' */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
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
  width: 40%;
  padding: 10px;
  margin: 12px;
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
  border-radius: 20px;
  font-size: 16px;
  resize: none;
  height: 80px;
  transition: border 0.3s;

  /* Scrollbar transparente */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* ou 'none' */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

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
  margin: 15px 0 30px;

  .slick-prev, .slick-next {
  z-index: 1;
  width: 80px;
  height: 50px;
  border-radius: 50%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: black !important; 
  font-size: 0px;
}

.slick-prev::before,
.slick-next::before {
  color: black !important; 
  font-size: 20px;
}

  .slick-dots {
    bottom: -25px;
  }

  .slick-slide {
    display: flex !important; 
    justify-content: center; 
    align-items: center;
    height: 220px;
  }

  .slick-track {
    display: flex !important;       
  }

  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }
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
  const [nomeImagemPrincipal, setNomeImagemPrincipal] = useState("");
  const [imagemPrincipalIndex, setImagemPrincipalIndex] = useState(null);
  const { grupo } = useAuth();
  const [imagemPrincipal, setImagemPrincipal] =  useState(() => {
    const principal = viewingProduct?.imagens?.find(img => img.principal);
    return principal ? principal.id : null;
  }); // imagemPrincipalId deve vir do backend
  const [isDeletingImage, setIsDeletingImage] = useState(false); // Novo estado para feedback
  const [deleteImageMessage, setDeleteImageMessage] = useState(""); // Para mensagens de sucesso/erro
const [selectedFiles, setSelectedFiles] = useState([]); // Array de objetos: { file: FileObject, preview: string, idTemporal: string }
  const [imagemPrincipalNovaId, setImagemPrincipalNovaId] = useState(null); // Armazena o idTemporal da NOVA imagem que é principal
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
      if (selectedFiles.length > 0) {
    const formDataImages = new FormData();
    formDataImages.append("idProduto", result.id);

    let nomeDaImagemPrincipalEnviada = null;
    selectedFiles.forEach((sf) => {
      formDataImages.append("files", sf.file);
      if (sf.idTemporal === imagemPrincipalNovaId) {
        nomeDaImagemPrincipalEnviada = sf.file.name;
      }
    });

    if (nomeDaImagemPrincipalEnviada) {
      formDataImages.append("nomeImagemPrincipal", nomeDaImagemPrincipalEnviada);
    } else if (selectedFiles.length > 0) {
      // Se nenhuma foi marcada explicitamente, mas há imagens, envia a primeira como principal
      formDataImages.append("nomeImagemPrincipal", selectedFiles[0].file.name);
    }

      const imageUploadResponse = await fetch("http://localhost:8081/imagens", {
        method: "POST",
        body: formDataImages,
      });
    if (!imageUploadResponse.ok) {
        throw new Error("Erro ao enviar imagens");
      }
  
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

  const refreshProductImages = async (productId) => {
    if (!productId) return;
    try {
      const novasImagens = await fetchImages(productId);
      setViewingProduct(prev => {
        if (prev && prev.id === productId) {
          // Verifica se a imagem principal ainda existe na nova lista
          const imagemPrincipalAtual = novasImagens.find(img => img.id === imagemPrincipal);
          if (!imagemPrincipalAtual && novasImagens.length > 0) {
            // Se a principal foi excluída e há outras imagens, define a primeira como principal
            // ou limpa se não houver mais imagens.
            // Esta lógica pode precisar de ajuste dependendo de como você quer lidar com a principal.
            setImagemPrincipal(novasImagens[0]?.id || null);
          } else if (novasImagens.length === 0) {
            setImagemPrincipal(null);
          }
          return { ...prev, imagens: novasImagens };
        }
        return prev;
      });
    } catch (error) {
      console.error("Erro ao atualizar imagens do produto:", error);
      // Tratar erro de atualização de UI aqui se necessário
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
    setSelectedFiles([]);
    setImagemPrincipalNovaId(null);
    setImagemPrincipalIndex(null);  // Limpar a imagem principal selecionada
    setNomeImagemPrincipal("");
    if (isEditModalOpen) {
      setImagemPrincipal(null);
  }
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
    setSelectedFiles([]); // Limpa NOVAS imagens selecionadas de edições anteriores
    setImagemPrincipalNovaId(null); // Limpa a principal das NOVAS imagens
    setDeleteImageMessage("");
    setError("");
    const imagensAtuais = await fetchImages(product.id);
    setViewingProduct({ ...product, imagens: imagensAtuais });

    const principalExistente = imagensAtuais.find(img => img.principal);
    setImagemPrincipal(principalExistente ? principalExistente.id : null); // 'imagemPrincipal' guarda o ID da imagem EXISTENTE que é principal
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

      let nomeDaImagemPrincipalEnviadaPeloUpload = null;
      selectedFiles.forEach((sf) => {
        formDataImages.append("files", sf.file);
        if (sf.idTemporal === imagemPrincipalNovaId) { // Se esta NOVA imagem foi marcada como principal
          nomeDaImagemPrincipalEnviadaPeloUpload = sf.file.name;
        }
      });

      // Se uma NOVA imagem é a principal, seu nome é enviado para o backend.
      if (nomeDaImagemPrincipalEnviadaPeloUpload) {
        formDataImages.append("nomeImagemPrincipal", nomeDaImagemPrincipalEnviadaPeloUpload);
      }

const imageUploadResponse = await fetch("http://localhost:8081/imagens", {
        method: "POST",
        body: formDataImages,
      });      if (!imageUploadResponse.ok) throw new Error("Erro ao enviar novas imagens");
    }

    // Atualizar a imagem principal no backend SE:
    // 1. Uma imagem EXISTENTE foi definida como principal (`imagemPrincipal` tem um ID do backend)
    // E
    // 2. NENHUMA NOVA imagem foi definida como principal (`imagemPrincipalNovaId` é null ou não corresponde a `imagemPrincipal`)
    if (imagemPrincipal && !imagemPrincipal.startsWith('temp-') && !imagemPrincipalNovaId) {
      await fetch(`http://localhost:8081/imagens?idProduto=${editingProduct.id}&idImagem=${imagemPrincipal}`, { method: "PUT" });
    }

      if (imagemPrincipal) {
        await fetch(`http://localhost:8081/imagens?idProduto=${editingProduct.id}&idImagem=${imagemPrincipal}`, {
          method: "PUT",
        });
      }
  
      alert("Produto atualizado com sucesso!");
    setSelectedFiles([]);
    setImagemPrincipalNovaId(null);
    // setImagemPrincipal(null); // Resetar a principal existente se a lógica exigir
      await fetchProdutos(); // Atualiza a lista de produtos após a atualização
      setEditModalOpen(false); // Fecha o modal de edição
  
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setError("Erro ao atualizar produto: " + error.message); // Exibe a mensagem de erro detalhado
    }
  };
  

   const handleDeleteImages = async (idImagemParaExcluir) => {
    if (!viewingProduct || !viewingProduct.id) {
      console.error("ID do produto não encontrado para exclusão de imagem.");
      setError("Não foi possível identificar o produto para excluir a imagem.");
      return;
    }

    const confirmacao = window.confirm("Tem certeza que deseja excluir esta imagem?");
    if (!confirmacao) return;

    setIsDeletingImage(true); // Ativa o estado de "carregando/excluindo"
    setDeleteImageMessage(""); // Limpa mensagens anteriores
    setError(""); // Limpa erros anteriores

    try {
      const response = await fetch(`http://localhost:8081/imagens/${idImagemParaExcluir}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteImageMessage("Imagem excluída com sucesso!");
        console.log("Imagem excluída, atualizando lista de imagens...");
        // Atualiza a lista de imagens do produto que está sendo visualizado/editado
        await refreshProductImages(viewingProduct.id);

        // Opcional: Limpar mensagem após alguns segundos
        setTimeout(() => setDeleteImageMessage(""), 3000);

      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Erro ao excluir imagem.");
        setDeleteImageMessage(""); // Limpa mensagem de sucesso em caso de erro
        console.error("Falha ao excluir imagem no backend:", errorMessage);
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão de imagem:", error);
      setError("Erro de conexão ao excluir imagem.");
      setDeleteImageMessage("");
    } finally {
      setIsDeletingImage(false); // Desativa o estado de "carregando/excluindo"
    }
  };
  const fetchImages = async (idProduto) => {
    if (!idProduto) {
      console.warn("fetchImages chamado sem idProduto");
      return [];
    }
    try {
      const response = await fetch(`http://localhost:8081/imagens/${idProduto}`);
      if (!response.ok) {
        // Se for 404 (sem imagens), não é necessariamente um erro fatal, apenas retorna array vazio
        if (response.status === 404) return [];
        throw new Error(`Erro ao buscar imagens: ${response.statusText}`);
      }
      const imagens = await response.json();
      const caminhoBase = "http://localhost:8081/"; // Certifique-se que esta é a base correta
      return imagens.map(imagem => ({
        ...imagem,
        // url: `${caminhoBase}${imagem.caminho}`, // Mantenha se usar 'url'
        // Se 'caminhoArquivo' já for o caminho completo ou relativo correto para o src da img, pode não precisar de 'url'
      }));
    } catch (error) {
      console.error(`Erro ao buscar imagens para o produto ${idProduto}:`, error);
      return []; // Retorna array vazio em caso de erro para não quebrar a UI
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

   const handleRetornarLoja = () => {
    router.push('/main');
  };
  
  const handleFileChange = (event) => {
  const novosArquivosInput = Array.from(event.target.files);

  if (novosArquivosInput.length === 0) return;

  const arquivosFormatados = novosArquivosInput.map(file => ({
    file,
    preview: URL.createObjectURL(file),
    idTemporal: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }));

  setSelectedFiles(prevFiles => {
    const todosOsNovosArquivos = [...prevFiles, ...arquivosFormatados];
    // Se nenhuma nova imagem foi marcada como principal E esta é a primeira leva de novas imagens,
    // marca a primeira nova imagem como candidata a principal (entre as novas).
    if (!imagemPrincipalNovaId && todosOsNovosArquivos.length > 0 && prevFiles.length === 0) {
      setImagemPrincipalNovaId(todosOsNovosArquivos[0].idTemporal);
    }
    return todosOsNovosArquivos;
  });

  event.target.value = null; // Permite selecionar os mesmos arquivos novamente
};

const handleRemoveNewFile = (idTemporalParaRemover) => {
  setSelectedFiles(prevFiles => {
    const restantes = prevFiles.filter(f => f.idTemporal !== idTemporalParaRemover);
    // Se a imagem removida era a principal das novas, limpa a seleção de principal nova
    if (imagemPrincipalNovaId === idTemporalParaRemover) {
      setImagemPrincipalNovaId(restantes.length > 0 ? restantes[0].idTemporal : null);
    }
    return restantes;
  });
};

const handleSetNewFileAsPrincipal = (idTemporalParaDefinir) => {
  setImagemPrincipalNovaId(idTemporalParaDefinir);
  // No modal de edição, também precisamos desmarcar qualquer imagem existente como principal
  if (isEditModalOpen) {
      setImagemPrincipal(null); // Limpa a seleção de principal existente
  }
};

const handleSetExistingImageAsPrincipal = (idImagemExistente) => {
    setImagemPrincipal(idImagemExistente); // Define a existente como principal
    setImagemPrincipalNovaId(null);      // Garante que nenhuma NOVA imagem esteja marcada como principal
};

  return (
    <StyledProdutos>
      <GlobalStyle />
      <BotaoRetornar onClick={handleRetornarLoja}>
        <span className="arrow-icon">←</span> {/* Seta para a esquerda Unicode */}
        Voltar para o Painel de controle
      </BotaoRetornar>
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
           <h4>Imagens Selecionadas para Novo Produto:</h4>
           {/* Loop para mostrar selectedFiles com botões "Remover" e "Principal" */}
           {selectedFiles.map((sf) => (
             <div key={sf.idTemporal}>
               <img src={sf.preview} alt={sf.file.name} style={{width: '80px', height: '80px', objectFit: 'cover', border: sf.idTemporal === imagemPrincipalNovaId ? '2px solid blue' : '1px solid #ddd'}} />
               <p>{sf.file.name.substring(0,15)}...</p>
               {sf.idTemporal !== imagemPrincipalNovaId && (
                 <button onClick={() => handleSetNewFileAsPrincipal(sf.idTemporal)}>Principal</button>
               )}
               <button onClick={() => handleRemoveNewFile(sf.idTemporal)}>Remover</button>
             </div>
           ))}
         </div>
      )}
            <GpBotoes>
              <Botao onClick={handleSave}>Salvar</Botao>
              <Botao onClick={handleCloseModal}>Cancelar</Botao>
            </GpBotoes>
          </ModalConteudo>
        </Modal>
      )}
      
      {isEditModalOpen && viewingProduct && (
  <Modal> {/* Seu componente Modal */}
    <ModalConteudo style={{ maxHeight: '90vh', overflowY: 'auto' }}> {/* Seu componente ModalConteudo */}
      <ModalTitulo>Editar Produto</ModalTitulo> {/* Seu componente ModalTitulo */}

      {deleteImageMessage && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{deleteImageMessage}</p>}
      {error && !deleteImageMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}

      <>
        <Input // Seu componente Input
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
        <TextoArea // Seu componente TextoArea
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

        <h3 style={{ marginTop: '25px', marginBottom: '10px', borderTop: '1px solid #eee' }}>Imagens Salvas</h3>
        {viewingProduct.imagens && viewingProduct.imagens.length > 0 ? (
          <StyledSlider // Seu componente StyledSlider
            dots={true}
            infinite={viewingProduct.imagens.length > 2} // Exemplo de prop
            speed={500} // Exemplo de prop
            slidesToShow={Math.min(viewingProduct.imagens.length, 3)} // Exemplo de prop
            slidesToScroll={1} // Exemplo de prop
            adaptiveHeight={true} // Exemplo de prop
          >
            {viewingProduct.imagens.map((imagem) => (
              <div key={imagem.id}>
                <div style={imageItemContainerStyles}>
                  {imagem.id === imagemPrincipal && (
                    <div style={{...principalTagStyles, backgroundColor: 'green'}}>Principal</div>
                  )}
                  <img
                    src={`../${imagem.caminhoArquivo.slice(22)}`}
                    alt={`Imagem ${imagem.id}`}
                    style={{
                      ...imagePreviewStyles,
                      border: imagem.id === imagemPrincipal ? principalImageBorder : imagePreviewStyles.border,
                    }}
                  />
                  <p style={imageNameStyles} title={imagem.nomeOriginal || `Imagem ${imagem.id}`}>
                      {imagem.nomeOriginal || `Imagem ${imagem.id}`}
                  </p>
                  <div style={imageButtonsContainerStyles}>
                    {imagem.id !== imagemPrincipal && (
                      <button
                        onClick={() => handleSetExistingImageAsPrincipal(imagem.id)}
                        disabled={isDeletingImage}
                        style={principalButtonStyles}
                      >
                        Tornar Principal
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteImages(imagem.id)}
                      disabled={isDeletingImage}
                      style={deleteButtonStyles}
                    >
                      {isDeletingImage ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </StyledSlider>
        ) : (
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>Nenhuma imagem salva para este produto.</p>
        )}

        <h3 style={{ marginTop: '25px', marginBottom: '10px', borderTop: '1px solid #eee', paddingTop: '1px' }}>Adicionar Novas Imagens</h3>
        <Input // Use seu componente Input ou <input>
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'block', margin: '10px auto 20px auto', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        {selectedFiles.length > 0 && (
          <div>
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Imagens para Upload ({selectedFiles.length}):</h4>
            <StyledSlider // Seu componente StyledSlider
                dots={true}
                infinite={selectedFiles.length > 2} // Exemplo
                speed={500} // Exemplo
                slidesToShow={Math.min(selectedFiles.length, 3)} // Exemplo
                slidesToScroll={1} // Exemplo
                adaptiveHeight={true} // Exemplo
                // Adicione/remova props conforme sua configuração original do StyledSlider
            >
              {selectedFiles.map((sf) => (
                <div key={sf.idTemporal}>
                  <div style={imageItemContainerStyles}>
                    {sf.idTemporal === imagemPrincipalNovaId && (
                      <div style={{...principalTagStyles, backgroundColor: 'blue'}}>Principal</div>
                    )}
                    <img
                      src={sf.preview}
                      alt={sf.file.name}
                      style={{
                        ...imagePreviewStyles,
                        border: sf.idTemporal === imagemPrincipalNovaId ? principalNewImageBorder : imagePreviewStyles.border,
                      }}
                      onClick={() => handleSetNewFileAsPrincipal(sf.idTemporal)}
                    />
                    <p style={imageNameStyles} title={sf.file.name}>
                        {sf.file.name.length > 20 ? sf.file.name.substring(0, 17) + "..." : sf.file.name}
                    </p>
                    <div style={imageButtonsContainerStyles}>
                      {sf.idTemporal !== imagemPrincipalNovaId && (
                          <button
                            onClick={() => handleSetNewFileAsPrincipal(sf.idTemporal)}
                            style={principalButtonStyles}
                          >
                              Tornar Principal
                          </button>
                      )}
                      <button
                        onClick={() => handleRemoveNewFile(sf.idTemporal)}
                        style={deleteButtonStyles}
                      >
                          Remover da Fila
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </StyledSlider>
          </div>
        )}
      </>

      <GpBotoes style={{ marginTop: '30px' }}> {/* Seu componente GpBotoes */}
        <BotaoSalvar onClick={handUpdate}>Salvar Alterações</BotaoSalvar> {/* Seu componente BotaoSalvar */}
        <BotaoCancelar onClick={() => { {/* Seu componente BotaoCancelar */}
            setEditModalOpen(false);
            setSelectedFiles([]);
            setImagemPrincipal(null);
            setImagemPrincipalNovaId(null);
        }}>
            Cancelar
        </BotaoCancelar>
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