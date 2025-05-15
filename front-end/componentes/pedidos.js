import { useEffect, useState } from 'react';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Só roda no client, pois localStorage não existe no servidor
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosSalvos")) || [];
    setPedidos(pedidosSalvos);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pedidos Salvos (Cliente Não Logado)</h1>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido salvo encontrado.</p>
      ) : (
        pedidos.map((pedido, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h2>Pedido #{pedido.numero || 'sem número'}</h2>
            <p><strong>Data:</strong> {new Date(pedido.dataPedido).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {pedido.status}</p>
            <p><strong>Valor Total:</strong> R$ {pedido.valor.toFixed(2)}</p>

            <h3>Produtos:</h3>
            <ul>
              {pedido.produtos.map((produto, i) => (
                <li key={i}>
                  {produto.nomeProduto} - {produto.quantidade} x R$ {produto.precoUnitario.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}