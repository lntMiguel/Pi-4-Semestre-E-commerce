package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Cliente;
import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.utils.Encriptador;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClienteServiceTest {

    @InjectMocks
    private ClienteService clienteService;
    // Instancia a classe que está sendo testada,
    // injetando os mocks nas dependências

    @Mock
    private ClienteRepository clienteRepository;
    // Mock do repositório de clientes, simula acesso a dados

    private AutoCloseable closeable;
    // Para fechar os mocks após os testes

    @BeforeEach
    void setUp() {
        // Inicializa os mocks antes de cada teste
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        // Libera recursos dos mocks após cada teste
        closeable.close();
    }

    private Cliente gerarClienteFake() {
        // Método utilitário para gerar um cliente fake para testes
        Cliente cliente = new Cliente();
        cliente.setId("123");
        cliente.setNome("João");
        cliente.setEmail("joao@email.com");
        cliente.setSenha(Encriptador.encriptar("senha123")); // Senha já encriptada
        cliente.setCpf(12345678901L);
        cliente.setDataNasc(new Date());
        cliente.setGenero("M");
        return cliente;
    }

    @Test
    void deveFazerLoginComSucesso() {
        // Prepara um cliente válido retornado pelo mock do repositório
        Cliente cliente = gerarClienteFake();
        when(clienteRepository.findByEmail(cliente.getEmail())).thenReturn(Optional.of(cliente));

        // Chama o método login com a senha correta
        ResponseEntity<Map<String, Object>> response = clienteService.login(cliente.getEmail(), "senha123");

        // Verifica que o status HTTP é 202 (aceito) e mensagem correta
        assertEquals(202, response.getStatusCode().value());
        assertEquals("Login feito com sucesso", response.getBody().get("message"));
    }

    @Test
    void deveFalharLoginEmailInvalido() {
        // Simula que o email não existe no banco
        when(clienteRepository.findByEmail("invalido@email.com")).thenReturn(Optional.empty());

        // Tenta login com email inválido
        ResponseEntity<Map<String, Object>> response = clienteService.login("invalido@email.com", "senha");

        // Verifica retorno HTTP 401 (não autorizado) e mensagem de email incorreto
        assertEquals(401, response.getStatusCode().value());
        assertEquals("Email Incorreto!", response.getBody().get("message"));
    }

    @Test
    void deveFalharLoginSenhaIncorreta() {
        // Simula cliente válido no banco
        Cliente cliente = gerarClienteFake();
        when(clienteRepository.findByEmail(cliente.getEmail())).thenReturn(Optional.of(cliente));

        // Tenta login com senha errada
        ResponseEntity<Map<String, Object>> response = clienteService.login(cliente.getEmail(), "senhaErrada");

        // Verifica retorno 401 e mensagem de senha incorreta
        assertEquals(401, response.getStatusCode().value());
        assertEquals("Senha Incorreta", response.getBody().get("message"));
    }

    @Test
    void deveSalvarClienteComSucesso() {
        // Cria cliente com senha em texto plano para salvar
        Cliente cliente = gerarClienteFake();
        cliente.setSenha("senha123");

        // Simula que email não está cadastrado ainda
        when(clienteRepository.findByEmail(cliente.getEmail())).thenReturn(Optional.empty());

        // Simula salvar o cliente e retorna o mesmo cliente
        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        // Chama o método salvar cliente
        Cliente salvo = clienteService.salvar(cliente);

        // Verifica que o cliente foi salvo (não nulo)
        assertNotNull(salvo);

        // Verifica que o método save foi chamado exatamente uma vez
        verify(clienteRepository, times(1)).save(any(Cliente.class));
    }

    @Test
    void deveFalharSalvarClienteEmailRepetido() {
        // Simula cliente com email já cadastrado
        Cliente cliente = gerarClienteFake();
        when(clienteRepository.findByEmail(cliente.getEmail())).thenReturn(Optional.of(cliente));

        // Tenta salvar cliente com email repetido, espera exceção IllegalArgumentException
        assertThrows(IllegalArgumentException.class, () -> clienteService.salvar(cliente));
    }

    @Test
    void deveAtualizarDadosClienteComSucesso() {
        // Simula cliente existente para atualização
        Cliente cliente = gerarClienteFake();
        when(clienteRepository.findById("123")).thenReturn(Optional.of(cliente));

        // Chama método para atualizar dados do cliente
        ResponseEntity<Map<String, String>> response = clienteService.atualizarDadosCliente(
                "123", "Novo Nome", new Date(), "F"
        );

        // Verifica resposta HTTP 200 e mensagem de sucesso
        assertEquals(200, response.getStatusCode().value());
        assertEquals("Dados Atualizados!", response.getBody().get("message"));
    }

    @Test
    void deveFalharAtualizacaoClienteNaoEncontrado() {
        // Simula cliente não encontrado no banco
        when(clienteRepository.findById("naoexiste")).thenReturn(Optional.empty());

        // Tenta atualizar cliente que não existe
        ResponseEntity<Map<String, String>> response = clienteService.atualizarDadosCliente(
                "naoexiste", "Nome", new Date(), "F"
        );

        // Verifica resposta HTTP 404 e mensagem de cliente não encontrado
        assertEquals(404, response.getStatusCode().value());
        assertEquals("Cliente não encontrado!", response.getBody().get("message"));
    }

    @Test
    void deveAtualizarSenhaComSucesso() {
        // Simula cliente existente
        Cliente cliente = gerarClienteFake();
        when(clienteRepository.findById("123")).thenReturn(Optional.of(cliente));

        // Atualiza senha do cliente
        ResponseEntity<Map<String, String>> response = clienteService.atualizaSenha("123", "novaSenha");

        // Verifica resposta HTTP 200 e mensagem de sucesso
        assertEquals(200, response.getStatusCode().value());
        assertEquals("Senha Atualizada!", response.getBody().get("message"));
    }

    @Test
    void deveFalharAtualizacaoSenhaClienteNaoEncontrado() {
        // Simula cliente não encontrado
        when(clienteRepository.findById("naoexiste")).thenReturn(Optional.empty());

        // Tenta atualizar senha de cliente inexistente
        ResponseEntity<Map<String, String>> response = clienteService.atualizaSenha("naoexiste", "senha");

        // Verifica resposta HTTP 404 e mensagem de cliente não encontrado
        assertEquals(404, response.getStatusCode().value());
        assertEquals("Cliente nao encontrado!", response.getBody().get("message"));
    }

    @Test
    void deveRetornarClientePorId() {
        // Simula cliente existente para retorno
        Cliente cliente = gerarClienteFake();
        when(clienteRepository.findById("123")).thenReturn(Optional.of(cliente));

        // Chama método que retorna cliente
        Cliente resultado = clienteService.retornaCliente("123");

        // Verifica que cliente não é nulo e nome confere
        assertNotNull(resultado);
        assertEquals("João", resultado.getNome());
    }

    @Test
    void deveLancarExcecaoClienteNaoEncontrado() {
        // Simula cliente não encontrado no banco
        when(clienteRepository.findById("naoexiste")).thenReturn(Optional.empty());

        // Espera que ao buscar cliente inexistente, lance exceção
        assertThrows(ResponseStatusException.class, () -> clienteService.retornaCliente("naoexiste"));
    }

    @Test
    void deveListarTodosOsClientes() {
        // Simula uma lista com 2 clientes
        List<Cliente> lista = List.of(gerarClienteFake(), gerarClienteFake());

        // Simula findAll retornando a lista
        when(clienteRepository.findAll()).thenReturn(lista);

        // Chama método para listar todos clientes
        List<Cliente> resultado = clienteService.listarTodos();

        // Verifica que o resultado tem tamanho esperado
        assertEquals(2, resultado.size());
    }
}