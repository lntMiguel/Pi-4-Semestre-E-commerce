import { useEffect, useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";

// Cores principais
const colors = {
  primary: "#164d09", // Verde escuro
  accent: "#30f003",  // Verde neon
  lightAccent: "rgba(48, 240, 3, 0.2)",
  background: "#f8faf6",
  white: "#ffffff",
  lightGray: "#f0f0f0",
  textDark: "#1a2e12",
  textLight: "#ffffff",
  border: "#e6e8e3"
};

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
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
  }
`;

const StyledPedidos = styled.div`
  background: radial-gradient(
      ellipse at top,
      rgba(48, 240, 3, 0.6) -5%,
      rgba(22, 77, 9, 0.95) 70%
    ),
    repeating-linear-gradient(
      45deg,
      rgba(22, 77, 9, 0.15) 0px,
      rgba(22, 77, 9, 0.15) 10px,
      rgba(48, 240, 3, 0.1) 10px,
      rgba(48, 240, 3, 0.1) 20px
    );
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const TableContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  width: 90%;
  text-align: center;
  max-width: 1200px;
  max-height: 800px;
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

const TableHeader = styled.div`
  background: linear-gradient(to right, ${colors.primary}, #1a5c0e);
  color: ${colors.white};
  padding: 20px 24px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: "";
    position: absolute;
    height: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, transparent, ${colors.accent}, transparent);

    
  }
`;

const TableTitle = styled.h1`
  font-size: 26px;
  color: ${colors.white};
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableContent = styled.div`
  padding: 20px;

  
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHeaderRow = styled.tr`
  background-color: ${colors.background};
`;

const TableHeaderCell = styled.th`
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid ${colors.lightAccent};
  
  &:nth-child(2) { text-align: left; }
  &:nth-child(3) { text-align: right; }
  &:nth-child(4) { text-align: left; }
  &:nth-child(5) { text-align: right; }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.border};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(48, 240, 3, 0.05);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: ${colors.textDark};
  border-bottom: 1px solid ${colors.border};
  
  &:nth-child(1) { text-align: left; }
  &:nth-child(2) { text-align: left; }
  &:nth-child(3) { text-align: right; }
  &:nth-child(4) { text-align: left; }
  &:nth-child(5) { text-align: right; }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    background-color: currentColor;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
  }
`;

const EditButton = styled(Button)`
  color: ${colors.primary};
  margin-right: 12px;
  
  &:hover {
    color: ${colors.accent};
  }
`;

const StatusButton = styled(Button)`
  color: ${colors.primary};
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${colors.primary};
  margin-left: 10px;
  font-weight: 600;
  
  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

const SaveButton = styled(StatusButton)`
  background-color: ${colors.primary};
  color: ${colors.white};
  
  &:hover {
    background-color: transparent;
    color: ${colors.primary};
  }
`;

const LoadingSpinner = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: " ";
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 6px solid ${colors.primary};
    border-color: ${colors.primary} transparent ${colors.accent} transparent;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  background-color: ${colors.white};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.accent};
    box-shadow: 0 0 0 2px rgba(48, 240, 3, 0.2);
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: ${colors.primary};
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

function GPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dados, setDados } = useAuth();
  const [editandoStatus, setEditandoStatus] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState({});
  const router = useRouter();

  const statusMap = {
    "Aguardando pagamento": "AGUARDANDO_PAGAMENTO",
    "Pagamento rejeitado": "PAGAMENTO_REJEITADO",
    "Pagamento com sucesso": "PAGAMENTO_COM_SUCESSO",
    "Aguardando retirada": "AGUARDANDO_RETIRADA",
    "Em trânsito": "EM_TRANSITO",
    "Entregue": "ENTREGUE",
  };

  const statusOptions = Object.keys(statusMap);

  useEffect(() => {
    fetchPedidos();
  }, []);


  const fetchPedidos = async () => {
    try {
      const response = await fetch("http://localhost:8081/pedidos/getPedido");

      console.log("Status da resposta:", response.status);

      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos");
      }

      const pedidosRecebidos = await response.json();

      setPedidos(pedidosRecebidos.reverse());
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error.message);
    } finally {
      setLoading(false); // Finaliza o carregamento mesmo em caso de erro
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return (
      data.toLocaleDateString("pt-BR") +
      " " +
      data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleEditarPedido = (id) => {
    // Função para editar pedido
    alert(`Editar pedido ${id}`);
  };

  const handleRetornarLoja = () => {
    router.push('/main');
  };

  const handleAlterarStatus = async (id, novoStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8081/pedidos/${id}?statusPedido=${novoStatus}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar status");
      }

      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === id ? { ...pedido, status: novoStatus } : pedido
        )
      );

      setEditandoStatus(null);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Aguardando pagamento":
        return {
          background: "rgba(253, 230, 138, 0.2)",
          color: "#854d0e",
        };
      case "Pagamento rejeitado":
        return {
          background: "rgba(254, 202, 202, 0.2)",
          color: "#991b1b",
        };
      case "Pagamento com sucesso":
        return {
          background: "rgba(48, 240, 3, 0.2)",
          color: "#166534",
        };
      case "Aguardando retirada":
        return {
          background: "rgba(191, 219, 254, 0.2)",
          color: "#1e40af",
        };
      case "Em trânsito":
        return {
          background: "rgba(221, 214, 254, 0.2)",
          color: "#5b21b6",
        };
      case "Entregue":
        return {
          background: "rgba(22, 77, 9, 0.2)",
          color: "#164d09",
        };
      default:
        return {
          background: "rgba(209, 213, 219, 0.2)",
          color: "#1f2937",
        };
    }
  };

  const getLabelFromEnum = (enumValue) => {
    return (
      Object.entries(statusMap).find(
        ([label, value]) => value === enumValue
      )?.[0] || enumValue
    );
  };

  return (
    <StyledPedidos>
      <GlobalStyle />
      <BotaoRetornar onClick={handleRetornarLoja}>
        <span className="arrow-icon">←</span> {/* Seta para a esquerda Unicode */}
        Voltar para o Painel de controle
      </BotaoRetornar>

      <TableContainer>
        <TableHeader>
          <TableTitle>Gerenciamento de Pedidos</TableTitle>
        </TableHeader>

        <TableContent>
          {loading ? (
            <LoadingSpinner />
          ) : pedidos.length === 0 ? (
            <EmptyState>
              <h3>Nenhum pedido encontrado</h3>
              <p>Não há pedidos disponíveis para exibição no momento.</p>
            </EmptyState>
          ) : (
            <StyledTable>
              <thead>
                <TableHeaderRow>
                  <TableHeaderCell>Data do Pedido</TableHeaderCell>
                  <TableHeaderCell>Número do Pedido</TableHeaderCell>
                  <TableHeaderCell>Valor Total</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>
                    Ações
                  </TableHeaderCell>
                </TableHeaderRow>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>{formatarData(pedido.dataPedido)}</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>
                      #{pedido.numero}
                    </TableCell>
                    <TableCell>{formatarValor(pedido.valor)}</TableCell>
                    <TableCell>
                      {editandoStatus === pedido.id ? (
                        <StatusContainer>
                          <StatusSelect
                            value={statusSelecionado[pedido.id] || getLabelFromEnum(pedido.status)}
                            onChange={(e) => {
                              setStatusSelecionado({
                                ...statusSelecionado,
                                [pedido.id]: e.target.value
                              });
                            }}
                          >
                            {statusOptions.map((label) => (
                              <option key={label} value={label}>
                                {label}
                              </option>
                            ))}
                          </StatusSelect>
                          <SaveButton
                            onClick={() => {
                              const novoStatus = statusMap[statusSelecionado[pedido.id]] || pedido.status;
                              handleAlterarStatus(pedido.id, novoStatus);
                            }}
                          >
                            Salvar
                          </SaveButton>
                        </StatusContainer>
                      ) : (
                        <StatusBadge style={getStatusStyle(getLabelFromEnum(pedido.status))}>
                          {getLabelFromEnum(pedido.status)}
                        </StatusBadge>
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {editandoStatus !== pedido.id && (
                        <StatusButton
                          onClick={() => {
                            setEditandoStatus(pedido.id);
                            setStatusSelecionado({
                              ...statusSelecionado,
                              [pedido.id]: getLabelFromEnum(pedido.status)
                            });
                          }}
                        >
                          Alterar Status
                        </StatusButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          )}
        </TableContent>
      </TableContainer>

    </StyledPedidos>
  );
}

export default GPedidos;