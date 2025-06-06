import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const StyledCadastro = styled.div`
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

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.97);
  padding: 25px 30px;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(48, 240, 3, 0.2);
  text-align: left;
  width: 650px;
  max-height: 85vh;
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

const Titulo = styled.h2`
  margin-bottom: 15px;
  color: #164d09;
  font-size: 1.8rem;
  text-align: center;
  border-bottom: 2px solid #30f003;
  padding-bottom: 8px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #164d09;
  margin: 10px 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #30f003;
    margin-right: 8px;
    border-radius: 50%;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0;
`;

const Field = styled.div`
  margin-bottom: 8px;
  flex: ${props => props.flex || 1};
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 3px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #28c702;
    box-shadow: 0 0 0 2px rgba(48, 240, 3, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #28c702;
    box-shadow: 0 0 0 2px rgba(48, 240, 3, 0.2);
  }
`;

const Error = styled.p`
  color: #e60000;
  font-size: 0.75rem;
  margin-top: 2px;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
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

const BotaoPrimario = styled(Botao)`
  width: 100%;
  margin-top: 15px;
  background-color: #164d09;
  padding: 12px;
  font-size: 1rem;
  
  &:hover {
    background-color: #1a5e0a;
  }
`;

const BotaoSecundario = styled(Botao)`
  background-color: #28c702;
  flex: 1;
  
  &:hover {
    background-color: #33e003;
  }
`;

const BotoesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EnderecoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 50px;
  padding: 12px;
  margin-bottom: 15px;
  border-left: 4px solid #28c702;
`;

const EnderecoTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 600;
  color: #164d09;
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

function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    dataNasc: '',
    genero: '',
    senha: '',
    confirmSenha: '',
  });

  const [formEndereco, setFormEndereco] = useState({
    cepFaturamento: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    faturamento: true,
  });

  const [entregas, setEntregas] = useState([]);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'cpf') {
    const apenasNumeros = value.replace(/\D/g, ''); // \D corresponde a qualquer caractere que não seja um dígito
    // Limita o CPF a 11 dígitos
    setForm((prev) => ({ ...prev, [name]: apenasNumeros.slice(0, 11) }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  };

  const handleRetornarLoja = () => {
    router.push('/pgPrincipal');
  };

  const handleChangeEndereco = (e) => {
    const { name, value } = e.target;
    setFormEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const buscarCep = async (cep, atualizarCampos, setErro) => {
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        atualizarCampos({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        });
        setErro('');
      } else {
        setErro('CEP inválido');
      }
    } catch (err) {
      setErro('Erro ao buscar CEP');
    }
  };

  const copiarFaturamento = () => {
    const novo = {
      cep: formEndereco.cepFaturamento.replace(/\D/g, ''),
      logradouro: formEndereco.logradouro,
      numero: formEndereco.numero,
      complemento: formEndereco.complemento,
      bairro: formEndereco.bairro,
      cidade: formEndereco.cidade,
      uf: formEndereco.uf,
      padrao: true,
      faturamento: false,
    };

    const novas = entregas.map((e) => ({ ...e, padrao: false }));
    setEntregas([...novas, novo]);
  };

const validateNome = (nome) => {
  const nomeLimpo = nome.trim();

  // 1. Lida com nomes vazios ou apenas com espaços
  if (!nomeLimpo) {
    return false;
  }

  // 2. Divide o nome em partes, removendo strings vazias caso haja múltiplos espaços
  const partes = nomeLimpo.split(' ').filter(parte => parte.length > 0);

  // 3. Deve ter pelo menos duas partes no total (ex: "Ana Silva")
  //    Isso já cobre o "nome e sobrenome" básico.
  if (partes.length < 2) {
    return false;
  }

  // 4. Define uma lista de palavras curtas comuns (conectivos, artigos)
  //    que não devem ser consideradas "partes principais" do nome para a validação de tamanho.
  //    É importante mantê-las em minúsculas para comparação case-insensitive.
  const excecoes = ['da', 'de', 'do', 'dos', 'das', 'e', 'o', 'a', 'os', 'as'];

  // 5. Filtra as partes do nome, removendo as exceções.
  //    Estas são as partes que consideramos "significativas" (nome e sobrenomes).
  const partesSignificativas = partes.filter(
    (parte) => !excecoes.includes(parte.toLowerCase())
  );

  // 6. Deve haver pelo menos duas partes "significativas".
  //    Ex: "O Silva" -> partesSignificativas = ["Silva"] (inválido, falta o primeiro nome significativo)
  //    Ex: "Da Conceição" -> partesSignificativas = ["Conceição"] (inválido)
  if (partesSignificativas.length < 2) {
    return false;
  }

  // 7. Todas as partes "significativas" devem ter pelo menos 3 caracteres.
  //    Ex: "Aroldo da Silva" -> partesSignificativas = ["Aroldo", "Silva"]. Ambas >= 3. Válido.
  //    Ex: "Lu da Silva" -> partesSignificativas = ["Lu", "Silva"]. "Lu" < 3. Inválido.
  return partesSignificativas.every((parte) => parte.length >= 3);
};

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(cpf.charAt(10));
  };

 const validarFormulario = () => {
  const newErrors = {}; 

  // Validação do Nome
  if (!form.nome.trim()) {
    newErrors.nome = 'Nome Completo é obrigatório.';
  } else if (!validateNome(form.nome)) {
    newErrors.nome = 'Nome Completo inválido (mínimo 2 nomes, 3 letras cada).';
  }

  // Validação do CPF
  if (!form.cpf.trim()) {
    newErrors.cpf = 'CPF é obrigatório.';
  } else if (!validateCPF(form.cpf.replace(/\D/g, ''))) { // Validar CPF sem máscara
    newErrors.cpf = 'CPF inválido.';
  }

  // Validação do Email
  if (!form.email.trim()) {
    newErrors.email = 'E-mail é obrigatório.';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) { // Validação simples de formato de email
    newErrors.email = 'Formato de e-mail inválido.';
  }

  // Validação Data de Nascimento
  if (!form.dataNasc) {
    newErrors.dataNasc = 'Data de Nascimento é obrigatória.';
  }

  // Validação Gênero
  if (!form.genero) {
    newErrors.genero = 'Gênero é obrigatório.';
  }

  // Validação Senha
  if (!form.senha) {
    newErrors.senha = "Senha é obrigatória.";
  } 

  // Validação Confirmar Senha
  if (!form.confirmSenha) {
    newErrors.confirmSenha = "Confirmação de senha é obrigatória.";
  } else if (form.senha !== form.confirmSenha) {
    newErrors.confirmSenha = 'As senhas não coincidem.'; // Mais específico para o campo de confirmação
  }

  // Validação Endereço de Faturamento
  if (!formEndereco.cepFaturamento || !formEndereco.logradouro || !formEndereco.numero || !formEndereco.bairro || !formEndereco.cidade || !formEndereco.uf) {
    newErrors.enderecoFaturamento = 'Endereço de faturamento completo é obrigatório.';
  }

  // Validação Endereços de Entrega
  if (entregas.length === 0) {
    newErrors.entrega = 'Adicione ao menos um endereço de entrega.';
  } else {
    // Validar se todos os endereços de entrega estão completos
    entregas.forEach((entrega, index) => {
      if (!entrega.cep || !entrega.logradouro || !entrega.numero || !entrega.bairro || !entrega.cidade || !entrega.uf) {
        newErrors[`entrega_${index}`] = `Endereço de entrega #${index + 1} está incompleto.`;
      }
    });
    if (!entregas.some((e) => e.padrao)) {
      // Só adiciona este erro se não houver um erro mais geral de "nenhuma entrega"
      if (!newErrors.entrega) {
        newErrors.entregaPadrao = 'Selecione um endereço de entrega como padrão.';
      }
    }
  }

  setErrors(newErrors); // Atualiza o estado para exibir erros inline nos campos
  return newErrors;     // Retorna o objeto de erros
};

  const adicionarEntregaVazia = () => {
    setEntregas([...entregas, {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      padrao: '',
      faturamento: false
    }]);
  };

  const handleEntregaChange = (index, field, value) => {
    const novas = [...entregas];
    if (field === 'padrao') {
      novas.forEach((e, i) => (novas[i].padrao = false));
      novas[index].padrao = true;
    } else {
      novas[index][field] = field === 'cep' ? value.replace(/\D/g, '') : value;
    }
    setEntregas(novas);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const currentErrors = validarFormulario(); 
  if (Object.keys(currentErrors).length > 0) {
    // Monta a mensagem de erro para o alert
    let alertMessage = "Por favor, corrija os seguintes erros:\n\n";
    for (const key in currentErrors) {
      if (currentErrors.hasOwnProperty(key)) {
        alertMessage += `- ${currentErrors[key]}\n`;
      }
    }
    alert(alertMessage);
    return; // Impede o envio do formulário
  }

  // Se não houver erros, prossiga com o cadastro
  const dadosClienteParaEnvio = {
    ...form,
    cpf: form.cpf.replace(/[^\d]/g, '')
  };

  try {
    const response = await fetch("http://localhost:8081/cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosClienteParaEnvio),
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        alert("Erro ao cadastrar: " + (errorJson.message || errorJson.error || errorText));
      } catch (parseError) {
        alert("Erro ao cadastrar: " + errorText);
      }
      return;
    }

    const result = await response.json();

    const enderecoFaturamento = {
      cep: formEndereco.cepFaturamento.replace(/\D/g, ''),
      logradouro: formEndereco.logradouro,
      numero: parseInt(formEndereco.numero),
      complemento: formEndereco.complemento,
      bairro: formEndereco.bairro,
      cidade: formEndereco.cidade,
      uf: formEndereco.uf,
      padrao: false,
      faturamento: true,
      idCliente: result.id
    };

    // Cadastrar endereço de faturamento
    const fatResponse = await fetch(`http://localhost:8081/endereco?idCliente=${result.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enderecoFaturamento),
    });
    if (!fatResponse.ok) throw new Error('Falha ao cadastrar endereço de faturamento.');


    // Cadastrar endereços de entrega
    for (const endereco of entregas) {
      const payload = {
        ...endereco,
        cep: endereco.cep.replace(/\D/g, ''),
        numero: parseInt(endereco.numero),
        idCliente: result.id,
        faturamento: false, // Certificar que faturamento é false para entrega
        // padrao já está no objeto 'endereco'
      };
      const entregaResponse = await fetch(`http://localhost:8081/endereco?idCliente=${result.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!entregaResponse.ok) throw new Error(`Falha ao cadastrar endereço de entrega: ${endereco.logradouro}`);
    }

    alert("Cliente cadastrado com sucesso!");
    router.push('/login'); 

  } catch (error) {
    console.error("Erro no processo de cadastro:", error);
    alert(`Ocorreu um erro durante o cadastro: ${error.message}. Por favor, tente novamente.`);
  }
};

  return (
    <StyledCadastro>
      <GlobalStyle />
      <BotaoRetornar onClick={handleRetornarLoja}>
        <span className="arrow-icon">←</span> {/* Seta para a esquerda Unicode */}
        Voltar para a Loja
      </BotaoRetornar>
      <Box>
        <Titulo>Cadastro de Cliente</Titulo>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Dados Pessoais</SectionTitle>
            <Field>
              <Label>Nome Completo</Label>
              <Input name="nome" value={form.nome} onChange={handleChange} placeholder="Digite seu nome completo" />
              {errors.nome && <Error>{errors.nome}</Error>}
            </Field>
            
            <FormRow>
              <Field flex={2}>
                <Label>E-mail</Label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" />
                {errors.email && <Error>{errors.email}</Error>}
              </Field>
              <Field flex={1}>
                <Label>CPF</Label>
                <Input name="cpf" value={form.cpf} onChange={handleChange} placeholder="00000000000"   maxLength={11} />
                {errors.cpf && <Error>{errors.cpf}</Error>}
              </Field>
            </FormRow>
            
            <FormRow>
              <Field>
                <Label>Data de Nascimento</Label>
                <Input type="date" name="dataNasc" value={form.dataNasc} onChange={handleChange} />
              </Field>
              <Field>
                <Label>Gênero</Label>
                <Select name="genero" value={form.genero} onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </Select>
              </Field>
            </FormRow>

            <FormRow>
              <Field flex={1}>
                <Label>Senha</Label>
                <Input name="senha" type="password" value={form.senha} onChange={handleChange}/>
                {errors.senha && <Error>{errors.senha}</Error>}
              </Field>
              <Field flex={1}>
                <Label>Confirmar Senha</Label>
                <Input name="confirmSenha" type="password" value={form.confirmSenha} onChange={handleChange}  />
                {errors.confirmSenha && <Error>{errors.confirmSenha}</Error>}
              </Field>
            </FormRow>

          </FormSection>

          <Divider />
          
          <FormSection>
            <SectionTitle>Endereço de Faturamento</SectionTitle>
            <FormRow>
              <Field flex={1}>
                <Label>CEP</Label>
                <Input name="cepFaturamento" value={formEndereco.cepFaturamento} onChange={handleChangeEndereco} onBlur={(e) =>
    buscarCep(
      e.target.value,
      (dados) => setFormEndereco((prev) => ({ ...prev, ...dados })),
      (msg) => setErrors((prev) => ({ ...prev, cepFaturamento: msg }))
    )
  } placeholder="00000-000" />
                {errors.cepFaturamento && <Error>{errors.cepFaturamento}</Error>}
              </Field>
              <Field flex={2}>
                <Label>Logradouro</Label>
                <Input name="logradouro" value={formEndereco.logradouro} onChange={handleChangeEndereco} placeholder="Rua, Avenida, etc." />
              </Field>
            </FormRow>
            
            <FormRow>
              <Field flex={1}>
                <Label>Número</Label>
                <Input name="numero" value={formEndereco.numero} onChange={handleChangeEndereco} placeholder="Nº" />
              </Field>
              <Field flex={2}>
                <Label>Complemento</Label>
                <Input name="complemento" value={formEndereco.complemento} onChange={handleChangeEndereco} placeholder="Apto, Bloco, etc." />
              </Field>
            </FormRow>
            
            <FormRow>
              <Field>
                <Label>Bairro</Label>
                <Input name="bairro" value={formEndereco.bairro} onChange={handleChangeEndereco} placeholder="Bairro" />
              </Field>
              <Field>
                <Label>Cidade</Label>
                <Input name="cidade" value={formEndereco.cidade} onChange={handleChangeEndereco} placeholder="Cidade" />
              </Field>
              <Field flex={0.5}>
                <Label>UF</Label>
                <Input name="uf" value={formEndereco.uf} onChange={handleChangeEndereco} maxLength={2} placeholder="UF" />
              </Field>
            </FormRow>
            {errors.endereco && <Error>{errors.endereco}</Error>}
          </FormSection>

          <Divider />
          
          <FormSection>
            <SectionTitle>Endereços de Entrega</SectionTitle>
            {entregas.length === 0 && <Error>{errors.entrega || "Nenhum endereço de entrega cadastrado"}</Error>}
            
            {entregas.map((end, i) => (
              <EnderecoCard key={i}>
                <EnderecoTitulo>
                  <span>Endereço #{i + 1}</span>
                  <BotaoSecundario 
                    type="button" 
                    onClick={() => removerEndereco(i)}
                    style={{padding: "4px 8px", fontSize: "0.8rem"}}
                  >
                    Remover
                  </BotaoSecundario>
                </EnderecoTitulo>
                
                <FormGrid>
                  <Field>
                    <Label>CEP</Label>
                    <Input 
                      value={end.cep} 
                      onChange={(e) => handleEntregaChange(i, 'cep', e.target.value)}
                      onBlur={(e) =>
                        buscarCep(
                          e.target.value,
                          (dados) => {
                            const novas = [...entregas];
                            novas[i] = { ...novas[i], ...dados };
                            setEntregas(novas);
                          },
                          (msg) => setErrors((prev) => ({ ...prev, [`cepEntrega${i}`]: msg }))
                        )
                      }
                      placeholder="00000-000"
                    />
                  </Field>
                  <Field>
                    <Label>Logradouro</Label>
                    <Input 
                      value={end.logradouro} 
                      onChange={(e) => handleEntregaChange(i, 'logradouro', e.target.value)} 
                      placeholder="Rua, Avenida, etc."
                    />
                  </Field>
                  <Field>
                    <Label>Número</Label>
                    <Input 
                      value={end.numero} 
                      onChange={(e) => handleEntregaChange(i, 'numero', e.target.value)} 
                      placeholder="Nº"
                    />
                  </Field>
                  <Field>
                    <Label>Complemento</Label>
                    <Input 
                      value={end.complemento} 
                      onChange={(e) => handleEntregaChange(i, 'complemento', e.target.value)} 
                      placeholder="Apto, Bloco, etc."
                    />
                  </Field>
                  <Field>
                    <Label>Bairro</Label>
                    <Input 
                      value={end.bairro} 
                      onChange={(e) => handleEntregaChange(i, 'bairro', e.target.value)} 
                      placeholder="Bairro"
                    />
                  </Field>
                  <Field>
                    <Label>Cidade</Label>
                    <Input 
                      value={end.cidade} 
                      onChange={(e) => handleEntregaChange(i, 'cidade', e.target.value)} 
                      placeholder="Cidade"
                    />
                  </Field>
                  <Field>
                    <Label>UF</Label>
                    <Input 
                      value={end.uf} 
                      onChange={(e) => handleEntregaChange(i, 'uf', e.target.value)} 
                      maxLength={2}
                      placeholder="UF"
                    />
                  </Field>
                </FormGrid>
                <Field>
                    <label>
                    <input
                      type="checkbox"
                      checked={end.padrao || false}
                      onChange={(e) => handleEntregaChange(i, 'padrao', e.target.checked)}
                    />
                    Endereço de entrega padrão
                  </label>
                </Field>
              </EnderecoCard>
            ))}
            
            <BotoesContainer>
              <BotaoSecundario type="button" onClick={copiarFaturamento}>
                Usar Endereço de Faturamento
              </BotaoSecundario>
              <BotaoSecundario type="button" onClick={adicionarEntregaVazia}>
                Adicionar Novo Endereço
              </BotaoSecundario>
            </BotoesContainer>
          </FormSection>

          <BotaoPrimario type="submit">Cadastrar</BotaoPrimario>
        </form>
      </Box>
    </StyledCadastro>
  );
}

export default Cadastro;