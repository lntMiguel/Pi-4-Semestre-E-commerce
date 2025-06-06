package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.EnderecoCliente;
import br.com.pi.pi_ecommerce.service.EnderecoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EnderecoControllerTest {

    private MockMvc mockMvc; // Utilizado para simular chamadas HTTP ao controller

    @Mock
    private EnderecoService enderecoService; // Cria um mock do serviço de endereço

    @InjectMocks
    private EnderecoController enderecoController; // Injeta os mocks no controller

    private final ObjectMapper objectMapper = new ObjectMapper(); // Utilizado para converter objetos Java em JSON

    private AutoCloseable closeable; // Usado para fechar os mocks ao final dos testes

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this); // Inicializa os mocks
        mockMvc = MockMvcBuilders.standaloneSetup(enderecoController).build(); // Cria o mockMvc com o controller isolado
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close(); // Fecha os mocks ao final do teste
    }

    @Test
    void deveSalvarEnderecoComSucesso() throws Exception {
        EnderecoCliente endereco = new EnderecoCliente(); // Cria um endereço de teste
        endereco.setLogradouro("Rua A"); // Define o logradouro

        when(enderecoService.salvarEndereco(any(EnderecoCliente.class))).thenReturn(endereco); // Simula a resposta do serviço

        mockMvc.perform(post("/endereco") // Envia um POST para o endpoint /endereco
                        .param("idCliente", "123") // Passa o ID do cliente como parâmetro
                        .contentType(MediaType.APPLICATION_JSON) // Define o tipo de conteúdo como JSON
                        .content(objectMapper.writeValueAsString(endereco))) // Envia o corpo como JSON
                .andExpect(status().isOk()) // Espera status 200 OK
                .andExpect(jsonPath("$.logradouro").value("Rua A")); // Verifica se o logradouro na resposta é o esperado
    }

    @Test
    void deveRetornarBadRequestAoSalvarEnderecoComErro() throws Exception {
        EnderecoCliente endereco = new EnderecoCliente(); // Endereço vazio

        when(enderecoService.salvarEndereco(any())).thenThrow(new IllegalArgumentException("Erro de validação")); // Simula erro ao salvar

        mockMvc.perform(post("/endereco")
                        .param("idCliente", "123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(endereco)))
                .andExpect(status().isBadRequest()) // Espera status 400
                .andExpect(content().string("Erro de validação")); // Verifica mensagem de erro retornada
    }

    @Test
    void deveExcluirEnderecoComSucesso() throws Exception {
        EnderecoCliente endereco = new EnderecoCliente(); // Endereço para deletar
        when(enderecoService.excluirEndereco(any())).thenReturn(ResponseEntity.ok("Endereço excluído")); // Simula exclusão bem-sucedida

        mockMvc.perform(delete("/endereco") // Envia DELETE para /endereco
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(endereco)))
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(content().string("Endereço excluído")); // Verifica mensagem de sucesso
    }

    @Test
    void deveRetornarErroAoExcluirEndereco() throws Exception {
        EnderecoCliente endereco = new EnderecoCliente(); // Endereço para deletar
        when(enderecoService.excluirEndereco(any())).thenThrow(new RuntimeException("Falha ao excluir")); // Simula falha na exclusão

        mockMvc.perform(delete("/endereco")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(endereco)))
                .andExpect(status().isInternalServerError()) // Espera status 500
                .andExpect(content().string("Erro ao deletar endereco: Falha ao excluir")); // Verifica mensagem de erro
    }

    @Test
    void deveSelecionarEnderecoPrincipal() throws Exception {
        EnderecoCliente enderecoMock = new EnderecoCliente(); // Endereço de exemplo
        enderecoMock.setId("1");
        enderecoMock.setLogradouro("Rua Teste");
        enderecoMock.setPadrao(true); // Define como principal

        when(enderecoService.selecionarPrincipal(anyString(), anyString())).thenReturn(enderecoMock); // Simula troca de principal

        mockMvc.perform(put("/endereco") // Envia PUT para /endereco
                        .param("idEndereco", "1")
                        .param("idCliente", "123"))
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(content().string("Endereço Principal Alterado")); // Verifica mensagem de sucesso
    }

    @Test
    void deveRetornarErroAoSelecionarEnderecoPrincipal() throws Exception {
        // Simula erro ao tentar selecionar endereço principal
        doThrow(new RuntimeException("Erro interno")).when(enderecoService).selecionarPrincipal(anyString(), anyString());

        mockMvc.perform(put("/endereco")
                        .param("idEndereco", "1")
                        .param("idCliente", "123"))
                .andExpect(status().isInternalServerError()) // Espera status 500
                .andExpect(content().string("Erro ao mudar endereco principal: Erro interno")); // Verifica mensagem de erro
    }

    @Test
    void deveRetornarEnderecoFaturamento() throws Exception {
        EnderecoCliente endereco = new EnderecoCliente(); // Endereço de exemplo
        endereco.setLogradouro("Rua Faturamento");

        when(enderecoService.retornaFaturamento("123")).thenReturn(endereco); // Simula retorno do endereço de faturamento

        mockMvc.perform(get("/endereco/123/faturamento")) // Envia GET para o endpoint
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.logradouro").value("Rua Faturamento")); // Verifica se o logradouro é o esperado
    }

    @Test
    void deveRetornarEnderecoPrincipal() throws Exception {
        EnderecoCliente endereco = new EnderecoCliente(); // Endereço de exemplo
        endereco.setLogradouro("Rua Principal");

        when(enderecoService.retornaPrincipal("123")).thenReturn(endereco); // Simula retorno do endereço principal

        mockMvc.perform(get("/endereco/123/principal")) // Envia GET para o endpoint
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.logradouro").value("Rua Principal")); // Verifica logradouro na resposta
    }

    @Test
    void deveRetornarTodosEnderecos() throws Exception {
        EnderecoCliente e1 = new EnderecoCliente(); // Primeiro endereço
        e1.setLogradouro("Rua 1");
        EnderecoCliente e2 = new EnderecoCliente(); // Segundo endereço
        e2.setLogradouro("Rua 2");

        when(enderecoService.retornaTodos("123")).thenReturn(List.of(e1, e2)); // Simula retorno de lista de endereços

        mockMvc.perform(get("/endereco/123")) // Envia GET para listar endereços do cliente
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.length()").value(2)); // Verifica se há dois elementos no JSON
    }
}
