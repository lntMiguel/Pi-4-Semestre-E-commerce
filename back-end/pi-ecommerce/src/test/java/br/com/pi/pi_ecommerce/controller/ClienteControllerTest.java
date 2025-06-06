package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Cliente;
import br.com.pi.pi_ecommerce.service.ClienteService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

class ClienteControllerTest {
    private MockMvc mockMvc; // Usado para simular requisições HTTP ao controller

    @Mock
    private ClienteService clienteService; // Mock do serviço ClienteService

    @InjectMocks
    private ClienteController clienteController; // Injeta o mock do serviço no controller

    private final ObjectMapper objectMapper = new ObjectMapper(); // Usado para converter objetos em JSON

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this); // Inicializa as anotações do Mockito
        mockMvc = MockMvcBuilders.standaloneSetup(clienteController).build(); // Configura o MockMvc com o controller isolado
    }

    @Test
    void deveListarTodosClientes() throws Exception {
        List<Cliente> clientes = List.of(new Cliente(), new Cliente()); // Cria uma lista simulada de 2 clientes
        when(clienteService.listarTodos()).thenReturn(clientes); // Simula o retorno da lista no serviço

        mockMvc.perform(get("/cliente")) // Realiza uma requisição GET para o endpoint /cliente
                .andExpect(status().isOk()) // Verifica se o status da resposta é 200
                .andExpect(jsonPath("$.length()").value(2)); // Verifica se o JSON tem dois elementos
    }

    @Test
    void deveSalvarClienteComSucesso() throws Exception {
        Cliente cliente = new Cliente(); // Cria um cliente simulado
        cliente.setNome("João"); // Define o nome do cliente

        when(clienteService.salvar(any(Cliente.class))).thenReturn(cliente); // Simula a resposta do serviço ao salvar

        mockMvc.perform(post("/cliente") // Faz um POST para /cliente
                        .contentType(MediaType.APPLICATION_JSON) // Define o tipo de conteúdo como JSON
                        .content(objectMapper.writeValueAsString(cliente))) // Converte o cliente para JSON
                .andExpect(status().isOk()) // Espera resposta 200 OK
                .andExpect(jsonPath("$.nome").value("João")); // Verifica se o nome no JSON retornado é "João"
    }

    @Test
    void deveRetornarBadRequestAoSalvarClienteComErro() throws Exception {
        Cliente cliente = new Cliente(); // Cria cliente inválido (vazio)

        when(clienteService.salvar(any(Cliente.class))).thenThrow(new IllegalArgumentException("Erro de validação")); // Simula exceção ao tentar salvar

        mockMvc.perform(post("/cliente")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(status().isBadRequest()) // Espera status 400 Bad Request
                .andExpect(content().string("Erro de validação")); // Verifica se o corpo da resposta tem a mensagem esperada
    }

    @Test
    void deveAtualizarDadosDoCliente() throws Exception {
        Map<String, String> resposta = Map.of("mensagem", "Dados atualizados"); // Mapa com a resposta esperada
        String id = "123";
        String nome = "Maria";
        String data = "2000-05-10";
        String genero = "Feminino";

        when(clienteService.atualizarDadosCliente(any(), any(), any(), any())).thenReturn(ResponseEntity.ok(resposta)); // Simula resposta do serviço

        mockMvc.perform(put("/cliente/{id}/dados", id) // Faz PUT para o endpoint
                        .param("nome", nome)
                        .param("dataNasc", data)
                        .param("genero", genero))
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.mensagem").value("Dados atualizados")); // Verifica se a mensagem no JSON está correta
    }

    @Test
    void deveAtualizarSenha() throws Exception {
        Map<String, String> resposta = Map.of("mensagem", "Senha atualizada"); // Mapa com resposta simulada
        String id = "123";
        String senha = "novaSenha123";

        when(clienteService.atualizaSenha(id, senha)).thenReturn(ResponseEntity.ok(resposta)); // Simula a resposta do serviço

        mockMvc.perform(put("/cliente/{id}/senha", id) // Faz PUT para o endpoint de senha
                        .param("senha", senha))
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.mensagem").value("Senha atualizada")); // Verifica mensagem no JSON
    }

    @Test
    void deveRealizarLoginComSucesso() throws Exception {
        Map<String, Object> resposta = Map.of("sucesso", true, "clienteId", "abc123"); // Resposta simulada do login

        Map<String, String> request = new HashMap<>(); // Dados de login
        request.put("email", "teste@email.com");
        request.put("password", "123");

        when(clienteService.login("teste@email.com", "123")).thenReturn(ResponseEntity.ok(resposta)); // Simula login bem-sucedido

        mockMvc.perform(post("/cliente/login") // Faz POST para /cliente/login
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))) // Converte o login em JSON
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.sucesso").value(true)) // Verifica valor de "sucesso"
                .andExpect(jsonPath("$.clienteId").value("abc123")); // Verifica o clienteId retornado
    }

    @Test
    void deveBuscarClientePorId() throws Exception {
        Cliente cliente = new Cliente(); // Cliente simulado
        cliente.setNome("Carlos"); // Define o nome

        when(clienteService.retornaCliente("999")).thenReturn(cliente); // Simula a resposta do serviço

        mockMvc.perform(get("/cliente/999/buscar")) // Faz GET para o endpoint com ID 999
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.nome").value("Carlos")); // Verifica o nome retornado
    }
}
