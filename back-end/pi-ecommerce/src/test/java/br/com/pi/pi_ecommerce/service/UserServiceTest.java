package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.repository.UserRepository;
import br.com.pi.pi_ecommerce.utils.Encriptador;
import br.com.pi.pi_ecommerce.utils.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
// Habilita extensão Mockito para testes, permitindo uso de @Mock e @InjectMocks
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    // Mock do repositório de usuários para simular acesso a dados

    @Mock
    private Validator validator;
    // Mock do validador para simular validações (CPF, email, etc.)

    @InjectMocks
    private UserService userService;
    // Instância real de UserService com os mocks injetados automaticamente

    private User user;
    // Variável para armazenar objeto User usado nos testes

    @BeforeEach
    void setup() {
        user = new User();
        // Cria novo usuário antes de cada teste

        user.setId("1");
        // Define o ID do usuário

        user.setNome("João");
        // Define o nome do usuário

        user.setEmail("joao@email.com");
        // Define o email do usuário

        user.setCpf(12345678900L);
        // Define o CPF do usuário

        user.setSenha(Encriptador.encriptar("123456"));
        // Define a senha encriptada do usuário

        user.setStatus(true);
        // Define o status do usuário como ativo

        user.setGrupo("admin");
        // Define o grupo do usuário (ex: admin)
    }

    @Test
    void testLogin_Sucesso() {
        when(userRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(user));
        // Simula busca do usuário pelo email retornando o usuário criado

        ResponseEntity<Map<String, String>> response = userService.login("joao@email.com", "123456");
        // Chama o método login com email e senha corretos

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        // Verifica se o status HTTP retornado é 202 Accepted

        assertEquals("Login feito com sucesso", response.getBody().get("message"));
        // Verifica mensagem de sucesso no corpo da resposta

        assertEquals("admin", response.getBody().get("grupo"));
        // Verifica se o grupo do usuário está correto na resposta
    }

    @Test
    void testLogin_EmailIncorreto() {
        when(userRepository.findByEmail("email@errado.com")).thenReturn(Optional.empty());
        // Simula busca que não encontra usuário com email errado

        ResponseEntity<Map<String, String>> response = userService.login("email@errado.com", "123456");
        // Tenta fazer login com email incorreto

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        // Verifica que o status HTTP é 401 Unauthorized

        assertEquals("Email Incorreto!", response.getBody().get("message"));
        // Verifica a mensagem de erro para email incorreto
    }

    @Test
    void testLogin_SenhaIncorreta() {
        when(userRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(user));
        // Simula busca que encontra usuário pelo email correto

        ResponseEntity<Map<String, String>> response = userService.login("joao@email.com", "senhaerrada");
        // Tenta login com senha incorreta

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        // Verifica status HTTP 401 Unauthorized

        assertEquals("Senha Incorreta", response.getBody().get("message"));
        // Verifica mensagem de erro para senha incorreta
    }

    @Test
    void testLogin_UsuarioInativo() {
        user.setStatus(false);
        // Define status do usuário como inativo

        when(userRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(user));
        // Simula busca do usuário inativo

        ResponseEntity<Map<String, String>> response = userService.login("joao@email.com", "123456");
        // Tenta login com usuário inativo

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        // Verifica status HTTP 403 Forbidden

        assertEquals("Usuário inativo", response.getBody().get("message"));
        // Verifica mensagem de usuário inativo
    }

    @Test
    void testSalvarUsuario_Sucesso() {
        when(validator.isCpfExistente(12345678900L)).thenReturn(false);
        // Simula que o CPF não está cadastrado

        when(validator.isEmailExistente("joao@email.com")).thenReturn(false);
        // Simula que o email não está cadastrado

        when(userRepository.save(any(User.class))).thenReturn(user);
        // Simula salvar o usuário e retornar o usuário salvo

        User salvo = userService.salvar(user);
        // Chama método para salvar usuário

        assertEquals("João", salvo.getNome());
        // Verifica que o nome do usuário salvo está correto

        assertNotEquals("123456", salvo.getSenha());
        // Verifica que a senha foi encriptada e não é igual à original
    }

    @Test
    void testSalvarUsuario_CpfExistente() {
        when(validator.isCpfExistente(user.getCpf())).thenReturn(true);
        // Simula que o CPF já existe no sistema

        assertThrows(IllegalArgumentException.class, () -> userService.salvar(user));
        // Espera exceção ao tentar salvar usuário com CPF existente
    }

    @Test
    void testAtualizarDadosUsuario_Sucesso() {
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        // Simula busca do usuário existente pelo ID

        when(userRepository.save(any(User.class))).thenReturn(user);
        // Simula salvar o usuário atualizado

        User atualizado = userService.atualizarDadosUsuario("1", "Novo Nome", 98765432100L, "novaSenha", "user");
        // Chama método para atualizar dados do usuário

        assertEquals("Novo Nome", atualizado.getNome());
        // Verifica nome atualizado

        assertEquals("user", atualizado.getGrupo());
        // Verifica grupo atualizado

        assertNotEquals("novaSenha", atualizado.getSenha());
        // Verifica que a senha foi encriptada (não é a senha em texto claro)
    }

    @Test
    void testAtualizarDadosUsuario_NaoEncontrado() {
        when(userRepository.findById("1")).thenReturn(Optional.empty());
        // Simula que usuário com ID "1" não foi encontrado

        assertThrows(ResponseStatusException.class, () ->
                userService.atualizarDadosUsuario("1", "Novo", 1L, "senha", "grupo"));
        // Espera exceção ao tentar atualizar usuário inexistente
    }

    @Test
    void testAlterarStatusUsuario_Sucesso() {
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        // Simula busca do usuário existente

        when(userRepository.save(any(User.class))).thenReturn(user);
        // Simula salvar o usuário com status alterado

        User atualizado = userService.alterarStatusUsuario("1");
        // Chama método para alterar status (ativo/inativo)

        assertFalse(atualizado.getStatus());
        // Verifica que o status foi invertido (agora falso)
    }

    @Test
    void testRetornaStatusUsuario_Sucesso() {
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        // Simula busca do usuário existente

        boolean status = userService.retornaStatusUsuario("1");
        // Chama método para obter status do usuário

        assertTrue(status);
        // Verifica que o status retornado é verdadeiro (ativo)
    }

    @Test
    void testRetornaStatusUsuario_NaoEncontrado() {
        when(userRepository.findById("1")).thenReturn(Optional.empty());
        // Simula que usuário não foi encontrado

        assertThrows(ResponseStatusException.class, () -> userService.retornaStatusUsuario("1"));
        // Espera exceção ao tentar obter status de usuário inexistente
    }
}
