package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class) // Habilita o Mockito para mocks e injeções automáticas no teste
class UserControllerTest {

    private MockMvc mockMvc;
    // MockMvc simula chamadas HTTP para os endpoints do controller

    @Mock
    private UserService userService;
    // Serviço mockado para injetar comportamento falso nos testes

    @InjectMocks
    private UserController userController;
    // Controller que será testado com o serviço mockado injetado

    private ObjectMapper objectMapper;
    // Para converter objetos Java em JSON e vice-versa

    @BeforeEach
    void setup() {
        // Configura MockMvc para trabalhar com o controller isolado
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        objectMapper = new ObjectMapper(); // Inicializa o conversor JSON
    }

    @Test
    void deveListarTodosUsuariosSemFiltro() throws Exception {
        // Cria dois usuários simulados para o teste
        UserDTO u1 = criarUserDTOMock("1", "João");
        UserDTO u2 = criarUserDTOMock("2", "Maria");

        // Quando listarTodos(null) for chamado, retorna a lista simulada
        when(userService.listarTodos(null)).thenReturn(List.of(u1, u2));

        // Realiza GET /users e verifica resposta
        mockMvc.perform(get("/users"))
                .andExpect(status().isOk()) // status 200 OK
                .andExpect(jsonPath("$.length()").value(2)) // 2 usuários retornados
                .andExpect(jsonPath("$[0].id").value("1")) // Confirma ID do primeiro usuário
                .andExpect(jsonPath("$[1].id").value("2")); // Confirma ID do segundo
    }

    @Test
    void deveListarUsuariosComFiltroNome() throws Exception {
        UserDTO u1 = criarUserDTOMock("1", "João");

        // Lista somente usuários cujo nome é "João"
        when(userService.listarTodos("João")).thenReturn(List.of(u1));

        // GET /users?nome=João
        mockMvc.perform(get("/users").param("nome", "João"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1)) // Apenas 1 resultado
                .andExpect(jsonPath("$[0].nome").value("João")); // Nome confere
    }

    @Test
    void deveSalvarUsuarioComSucesso() throws Exception {
        // Usuário para salvar (sem ID)
        User u = criarUserMock(null, "Ana");
        // Usuário retornado após salvar, já com ID
        User salvo = criarUserMock("123", "Ana");

        when(userService.salvar(any(User.class))).thenReturn(salvo);

        // POST /users com JSON do usuário
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(u)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123")) // Confirma ID gerado
                .andExpect(jsonPath("$.nome").value("Ana")); // Confirma nome
    }

    @Test
    void deveRetornarBadRequestAoSalvarUsuarioInvalido() throws Exception {
        User u = criarUserMock(null, "Invalido");

        // Simula erro de validação lançando exceção
        when(userService.salvar(any(User.class))).thenThrow(new IllegalArgumentException("Usuário inválido"));

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(u)))
                .andExpect(status().isBadRequest()) // Espera erro 400 Bad Request
                .andExpect(content().string("Usuário inválido")); // Mensagem de erro
    }

    @Test
    void deveAtualizarDadosUsuario() throws Exception {
        User atualizado = criarUserMock("123", "Carlos");

        // Simula atualização de dados do usuário com os parâmetros informados
        when(userService.atualizarDadosUsuario(eq("123"), eq("Carlos"), eq(12345678901L),
                eq("senha123"), eq("ADMIN"))).thenReturn(atualizado);

        // PUT /users/123/dados com parâmetros para atualizar usuário
        mockMvc.perform(put("/users/{id}/dados", "123")
                        .param("nome", "Carlos")
                        .param("cpf", "12345678901")
                        .param("senha", "senha123")
                        .param("grupo", "ADMIN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.nome").value("Carlos"));
    }

    @Test
    void deveAlterarStatusUsuario() throws Exception {
        User user = criarUserMock("123", "Joana");

        // Simula alteração do status do usuário
        when(userService.alterarStatusUsuario("123")).thenReturn(user);

        mockMvc.perform(put("/users/{id}/status", "123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.nome").value("Joana"));
    }

    @Test
    void deveRealizarLoginComSucesso() throws Exception {
        // Dados da requisição de login
        Map<String, String> loginRequest = Map.of("email", "user@email.com", "password", "senha");
        // Resposta simulada com token JWT
        Map<String, String> resposta = Map.of("token", "abc123");

        // Simula retorno da camada de serviço
        when(userService.login("user@email.com", "senha")).thenReturn(ResponseEntity.ok(resposta));

        // POST /users/login com JSON contendo email e senha
        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("abc123")); // Token recebido
    }

    @Test
    void deveRetornarStatusUsuario() throws Exception {
        // Simula retorno do status do usuário como ativo (true)
        when(userService.retornaStatusUsuario("123")).thenReturn(true);

        // GET /users/123/status
        mockMvc.perform(get("/users/{id}/status", "123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));
    }

    // --- Métodos auxiliares para criar mocks de usuários e DTOs ---

    private User criarUserMock(String id, String nome) {
        User u = new User();
        u.setId(id);
        u.setNome(nome);
        u.setCpf(12345678901L);
        u.setSenha("senha123");
        u.setGrupo("USER");
        u.setStatus(true);
        return u;
    }

    private UserDTO criarUserDTOMock(String id, String nome) {
        UserDTO dto = new UserDTO();
        dto.setId(id);
        dto.setNome(nome);
        dto.setCpf(12345678901L);
        dto.setGrupo("USER");
        return dto;
    }
}