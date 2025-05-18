import { useEffect, useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useAuth } from "./authContext";

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

const StyledPedidos = styled.div`
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

const TableContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  text-align: center;
  max-width: 1200px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  background-color: #f0f0f0;
  color: white;

  padding: 16px 24px;
`;

const TableTitle = styled.h1`
  font-size: 24px;
  color: black;
  font-weight: bold;
  margin: 0;
`;

const TableContent = styled.div`
  padding: 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  background-color: #f9fafb;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #1f2937;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  cursor: pointer;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`;

const EditButton = styled(Button)`
  color: #059669;
  margin-right: 12px;
  &:hover {
    color: #047857;
  }
`;

const StatusButton = styled(Button)`
  color: #2563eb;
  &:hover {
    color: #1d4ed8;
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
    border: 6px solid #0C5C0C;
    border-color: #0C5C0C transparent #0C5C0C transparent;
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
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #0C5C0C;
    box-shadow: 0 0 0 2px rgba(12, 92, 12, 0.2);
  }
`;

function GPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const {dados, setDados} = useAuth();
    const [editandoStatus, setEditandoStatus] = useState(null);

    const statusOptions = [
        "Aguardando pagamento",
        "Pagamento rejeitado",
        "Pagamento com sucesso",
        "Aguardando retirada",
        "Em trânsito",
        "Entregue"
    ];
    

    useEffect(() => {
        fetchPedidos();
      }, []);

      const fetchPedidos = async () => {
        try {
            const token = localStorage.getItem("token"); // caso use autenticação
          
            const response = await fetch("http://localhost:8081/pedidos/", {
              headers: {
                "Authorization": `Bearer ${token}` // remova se sua API não usa token
              }
            });
          
            console.log("Status da resposta:", response.status); // ajuda na depuração
          
            if (!response.ok) throw new Error("Erro ao buscar pedidos");
          
            const pedidosCliente = await response.json();
            setPedidos(pedidosCliente);
          } catch (error) {
            console.error("Erro ao buscar pedidos:", error.message);
          }
          
      };


    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const handleEditarPedido = (id) => {
        // Função para editar pedido
        alert(`Editar pedido ${id}`);
    };

    const handleAlterarStatus = async (id, novoStatus) => {
        try {
            const response = await fetch(`http://localhost:8081/pedidos/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: novoStatus }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar status');
            }


            setPedidos(pedidos.map(pedido =>
                pedido.id === id ? { ...pedido, status: novoStatus } : pedido
            ));

            setEditandoStatus(null);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Aguardando pagamento":
                return {
                    background: "rgba(253, 230, 138, 0.4)",
                    color: "#854d0e"
                };
            case "Pagamento rejeitado":
                return {
                    background: "rgba(254, 202, 202, 0.4)",
                    color: "#991b1b"
                };
            case "Pagamento com sucesso":
                return {
                    background: "rgba(187, 247, 208, 0.4)",
                    color: "#166534"
                };
            case "Aguardando retirada":
                return {
                    background: "rgba(191, 219, 254, 0.4)",
                    color: "#1e40af"
                };
            case "Em trânsito":
                return {
                    background: "rgba(221, 214, 254, 0.4)",
                    color: "#5b21b6"
                };
            case "Entregue":
                return {
                    background: "rgba(209, 213, 219, 0.4)",
                    color: "#1f2937"
                };
            default:
                return {
                    background: "rgba(209, 213, 219, 0.4)",
                    color: "#1f2937"
                };
        }
    };

    return (
        <StyledPedidos>
            <GlobalStyle />

            <TableContainer>
                <TableHeader>
                    <TableTitle>Lista de Pedidos</TableTitle>
                </TableHeader>

                <TableContent>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <StyledTable>
                            <thead>
                                <TableHeaderRow>
                                    <TableHeaderCell>Data do Pedido</TableHeaderCell>
                                    <TableHeaderCell>Número do Pedido</TableHeaderCell>
                                    <TableHeaderCell>Valor Total</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell style={{ textAlign: 'right' }}>Ações</TableHeaderCell>
                                </TableHeaderRow>
                            </thead>
                            <tbody>
                                {pedidos.map((pedido) => (
                                    <TableRow key={pedido.id}>
                                        <TableCell>{formatarData(pedido.dataPedido)}</TableCell>
                                        <TableCell style={{ fontWeight: 500 }}>{pedido.numeroPedido}</TableCell>
                                        <TableCell>{formatarValor(pedido.valorTotal)}</TableCell>
                                        <TableCell>
                                            {editandoStatus === pedido.id ? (
                                                <StatusSelect
                                                    defaultValue={pedido.status}
                                                    onChange={(e) => handleAlterarStatus(pedido.id, e.target.value)}
                                                    autoFocus
                                                    onBlur={() => setEditandoStatus(null)}
                                                >
                                                    {statusOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </StatusSelect>
                                            ) : (
                                                <StatusBadge
                                                    style={getStatusStyle(pedido.status)}
                                                    onClick={() => setEditandoStatus(pedido.id)}
                                                >
                                                    {pedido.status}
                                                </StatusBadge>
                                            )}
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>
                                            <EditButton onClick={() => handleEditarPedido(pedido.id)}>
                                                Editar
                                            </EditButton>
                                            {editandoStatus !== pedido.id && (
                                                <StatusButton onClick={() => setEditandoStatus(pedido.id)}>
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