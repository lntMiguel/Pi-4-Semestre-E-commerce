import { useEffect, useState } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

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

const PedidoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 30px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #28c702;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;



const NenhumPedido = styled.div`
  padding: 30px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 30px;
  margin: 20px 0;
`;

const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const PedidoNumero = styled.span`
  font-weight: 600;
  color: #164d09;
  font-size: 1.1rem;
`;

const PedidoStatus = styled.span`
  background-color: ${props => {
    switch(props.status.toLowerCase()) {
      case 'entregue': return '#e8ffe8';
      case 'cancelado': return '#ffebeb';
      case 'em andamento': return '#fff8e8';
      default: return '#f0f0f0';
    }
  }};
  color: ${props => {
    switch(props.status.toLowerCase()) {
      case 'entregue': return '#028a02';
      case 'cancelado': return '#c70000';
      case 'em andamento': return '#c79400';
      default: return '#666';
    }
  }};
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
`;



const Botao = styled.button`
  padding: 10px;
  border: none;
  background-color: #164d09;
  color: #fff;
  font-size: 0.95rem;
  border-radius: 50px;
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

const DetalhesContainer = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
`;

const PedidoLabel = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  color: #666;
`;

const PedidoInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`;

const PedidoInfoItem = styled.div`
  margin: 4px 0;
`;

const PedidoValue = styled.span`
  display: block;
  font-size: 0.9rem;
`;

const ProdutosTitle = styled.div`
  font-weight: 600;
  color: #164d09;
  margin: 10px 0;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #30f003;
    margin-right: 8px;
    border-radius: 50%;
  }
`;

const ProdutosList = styled.div`
  background-color: white;
  border-radius: 30px;
  padding: 8px;
`;

const ProdutoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProdutoNome = styled.span`
  flex: 2;
`;

const ProdutoQtd = styled.span`
  flex: 1;
  text-align: center;
  color: #666;
`;

const ProdutoPreco = styled.span`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;

const PedidoValorTotal = styled.div`
  text-align: right;
  margin-top: 10px;
  font-weight: 600;
  color: #164d09;
  font-size: 1.1rem;
`;

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosExpandidos, setPedidosExpandidos] = useState([]);

  const toggleDetalhes = (pedidoId) => {
    setPedidosExpandidos(prev => 
      prev.includes(pedidoId) 
        ? prev.filter(id => id !== pedidoId) 
        : [...prev, pedidoId]
    );
  };
  useEffect(() => {
    // Só roda no client, pois localStorage não existe no servidor
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosSalvos")) || [];
    
    setPedidos(pedidosSalvos);

  }, []);

  return (
   <>
  {pedidos.length === 0 ? (
    <NenhumPedido>
      <p>Nenhum pedido encontrado.</p>
    </NenhumPedido>
  ) : (
    pedidos.map((pedido) => (
      <PedidoCard key={pedido.id}>
        <PedidoHeader>
          <PedidoNumero>Pedido #{pedido.numero}</PedidoNumero>
          <PedidoStatus status={pedido.status}>{pedido.status}</PedidoStatus>
        </PedidoHeader>

        <PedidoValorTotal>
          Total: R$ {pedido.valor.toFixed(2)}
        </PedidoValorTotal>

        <Botao onClick={() => toggleDetalhes(pedido.id)}>
          {pedidosExpandidos.includes(pedido.id) ? 'Ocultar Detalhes' : 'Ver Detalhes'}
        </Botao>

        {pedidosExpandidos.includes(pedido.id) && (
          <DetalhesContainer>
            <PedidoInfo>
              <PedidoInfoItem>
                <PedidoLabel>Data do Pedido</PedidoLabel>
                <PedidoValue>{new Date(pedido.dataPedido).toLocaleString()}</PedidoValue>
              </PedidoInfoItem>
              <PedidoInfoItem>
                <PedidoLabel>Método de Pagamento</PedidoLabel>
                <PedidoValue>{pedido.metodoDePagamento}</PedidoValue>
              </PedidoInfoItem>
              <PedidoInfoItem>
                <PedidoLabel>Endereço</PedidoLabel>
                <PedidoValue>{pedido.enderecoCliente.cep}</PedidoValue>
                <PedidoValue>
                  {pedido.enderecoCliente.logradouro + ' '}
                  {pedido.enderecoCliente.numero + ' '}
                  {pedido.enderecoCliente.complemento && pedido.enderecoCliente.complemento}
                </PedidoValue>
                <PedidoValue>
                  {pedido.enderecoCliente.bairro + ' '}
                  {pedido.enderecoCliente.cidade + ' '}
                  {pedido.enderecoCliente.uf}
                </PedidoValue>
              </PedidoInfoItem>
            </PedidoInfo>

            <ProdutosTitle>Produtos</ProdutosTitle>
            <ProdutosList>
              {pedido.produtos.map((produto, index) => (
                <ProdutoItem key={index}>
                  <ProdutoNome>{produto.nomeProduto}</ProdutoNome>
                  <ProdutoQtd>{produto.quantidade}x</ProdutoQtd>
                  <ProdutoPreco>R$ {produto.precoUnitario.toFixed(2)}</ProdutoPreco>
                </ProdutoItem>
              ))}
            </ProdutosList>
          </DetalhesContainer>
        )}
      </PedidoCard>
    ))
  )}
</>
  );
}