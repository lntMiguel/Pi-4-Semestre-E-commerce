import { useAuth } from "./authContext";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const CarrinhoList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 250px;
  overflow-y: auto;
`;

const CarrinhoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #007bff;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  border: none;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
  transition: all 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background: #ff4d4d;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;

  &:hover {
    background: #cc0000;
  }
`;

const Total = styled.h3`
  font-size: 20px;
  color: #333;
`;

const Checkout = () => {
    const { user, carrinho, setCarrinho, frete, setFrete, dados, valorFrete, setValorFrete} = useAuth();
    const [enderecos, setEnderecos] = useState([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  
    // Calcular total dos produtos
    const totalProdutos = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    const totalGeral = totalProdutos+ valorFrete;
  
    // Carregar os endereços de entrega do usuário
    const fetchEnderecos = async () => {
      try {
        const response = await fetch(`http://localhost:8081/endereco/${dados.id}`);
        if (!response.ok) throw new Error("Erro ao buscar endereços");
        const enderecosCliente = await response.json();
        const enderecosEntrega = enderecosCliente.filter(end => end.faturamento === false);
        setEnderecos(enderecosEntrega);
      } catch (error) {
        console.error("Erro ao buscar endereços:", error);
      }
    };
  
    useEffect(() => {
      if (user) {
        fetchEnderecos();
  
        // Carregar frete salvo (se houver) no localStorage
        const userId = user.id || "guest";
        
      }
    }, [user]);
  
    useEffect(() => {
      const padrao = enderecos.find(end => end.padrao);
      if (padrao) {
        setEnderecoSelecionado(padrao);
      }
    }, [enderecos]);
  
    return (
      <>
        <h1>Resumo do Pedido</h1>
        <CarrinhoList>
          {carrinho.length === 0 ? (
            <p>O carrinho está vazio</p>
          ) : (
            carrinho.map((item, index) => (
              <CarrinhoItem key={index}>
                <ItemInfo>
                  <div>
                    <ItemName>{item.nome}</ItemName>
                    <ItemPrice>R$ {item.preco.toFixed(2)} x {item.quantidade}</ItemPrice>
                  </div>
                </ItemInfo>
              </CarrinhoItem>
            ))
          )}
        </CarrinhoList>
  
        {carrinho.length > 0 && (
          <>
            <Total>Subtotal: R$ {totalProdutos.toFixed(2)}</Total>
            <Total>Frete: R$ {valorFrete.toFixed(2)} ({frete})</Total>
            <Total><strong>Total Geral: R$ {totalGeral.toFixed(2)}</strong></Total>
          </>
        )}
  
        <h2>Endereços de Entrega</h2>
        {enderecos.length === 0 ? (
          <p>Nenhum endereço de entrega cadastrado.</p>
        ) : (
          <ul>
            {[...enderecos.filter(e => e.padrao), ...enderecos.filter(e => !e.padrao)].map((endereco, index) => (
              <li key={index} style={{
                border: enderecoSelecionado?.id === endereco.id ? "2px solid green" : "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: endereco.padrao ? "#e0ffe0" : "#fff",
                borderRadius: "8px"
              }}>
                <label>
                  <input
                    type="radio"
                    name="endereco"
                    value={endereco.id}
                    checked={enderecoSelecionado?.id === endereco.id}
                    onChange={() => setEnderecoSelecionado(endereco)}
                  />
                  {" "}
                  {endereco.logradouro}, {endereco.numero} <br />
                  {endereco.bairro} - {endereco.cidade}/{endereco.uf} <br />
                  CEP: {endereco.cep} {endereco.padrao && <strong> (Padrão)</strong>}
                </label>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

export default Checkout;