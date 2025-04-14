import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./authContext";

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2330f003' fill-opacity='0.59' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 80px 40px;
  background-position: center;
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.97);
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(48, 240, 3, 0.2);
  text-align: left;
  width: 650px;
  max-height: 85vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #28c702 #f0f0f0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #28c702;
    border-radius: 10px;
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 8px;
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
    const partes = nome.trim().split(' ');
    return (
      partes.length >= 2 &&
      partes.every((parte) => parte.length >= 3)
    );
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
    const e = {};

    if (!validateNome(form.nome)) e.nome = 'Nome inválido';
    if (!validateCPF(form.cpf)) e.cpf = 'CPF inválido';
    if (!form.email) e.email = 'Email obrigatório';
    if (!formEndereco.cepFaturamento || !formEndereco.logradouro || !formEndereco.numero || !formEndereco.bairro || !formEndereco.cidade || !formEndereco.uf) {
      e.endereco = 'Endereço de faturamento incompleto';
    }
    if (!form.senha) e.senha = "Campo obrigatório";
    if (!form.confirmSenha) e.confirmSenha = "Campo obrigatório";
    if(form.senha !== form.confirmSenha) e.senha = 'Senhas não Coincidem';
    if (entregas.length === 0) e.entrega = 'Adicione ao menos um endereço de entrega';
    if (!entregas.some((e) => e.padrao)) {
      e.entrega = 'Selecione um endereço de entrega como padrão';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
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
    if (!validarFormulario()) return;

    try {
      const response = await fetch("http://localhost:8081/cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorText = await response.text(); 
        alert("Erro ao cadastrar: " + errorText);
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

      await fetch(`http://localhost:8081/endereco?idCliente=${result.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enderecoFaturamento),
      });

      for (const endereco of entregas) {
        const payload = {
          ...endereco,
          cep: endereco.cep.replace(/\D/g, ''),
          numero: parseInt(endereco.numero),
          idCliente: result.id,
        };
        await fetch(`http://localhost:8081/endereco?idCliente=${result.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      alert("Cliente cadastrado com sucesso!");
      router.push('/login');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <StyledCadastro>
      <GlobalStyle />
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
                <Input name="cpf" value={form.cpf} onChange={handleChange} placeholder="00000000000" />
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

          <BotaoPrimario onClick={handleSubmit} type="submit">Cadastrar</BotaoPrimario>
        </form>
      </Box>
    </StyledCadastro>
  );
}

export default Cadastro;