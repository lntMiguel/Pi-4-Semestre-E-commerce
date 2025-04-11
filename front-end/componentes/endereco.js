//classe feita apenas para guardar o handler de validar cep
//depois mude esta classe para uma pagina real
//se precisar altere o metodo do cep

import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

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
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

function Endereco() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState();

  const handleEndereco = async (cep) => {
    console.log(cep);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar o CEP");
      }

      const data = await response.json();
      console.log(data);
      setEndereco(data);
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Input
        type="text"
        placeholder="Digite o CEP..."
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />

      <button onClick={() => handleEndereco(cep)}>vai caraleo</button>

      {endereco && (
        <div>
          <p><strong>Rua:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
        </div>
      )}
    </>
  );
}

export default Endereco;