package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ValidatorTest {
// Classe de teste para a classe Validator, que valida existência de CPFs e emails nos repositórios

    @Mock
    private UserRepository userRepository;
    // Mock do UserRepository para simular consultas no banco de usuários

    @Mock
    private ClienteRepository clienteRepository;
    // Mock do ClienteRepository para simular consultas no banco de clientes

    @InjectMocks
    private Validator validator;
    // Instância da classe Validator com os mocks injetados automaticamente

    private AutoCloseable closeable;
    // Referência para fechar o contexto de mocks após o teste

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        // Inicializa os mocks antes de cada teste e guarda referência para fechar depois
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
        // Fecha os mocks após cada teste para liberar recursos
    }

    @Test
    void deveRetornarTrueQuandoCpfExistenteNoUserRepository() {
        when(userRepository.existsByCpf(12345678901L)).thenReturn(true);
        // Configura o mock para retornar true quando buscar CPF 12345678901L

        boolean resultado = validator.isCpfExistente(12345678901L);
        // Chama o método para verificar se o CPF existe no repositório de usuários

        assertTrue(resultado);
        // Verifica que o resultado é true

        verify(userRepository).existsByCpf(12345678901L);
        // Verifica que o método existsByCpf foi realmente chamado com o CPF especificado
    }

    @Test
    void deveRetornarFalseQuandoCpfNaoExistenteOuNull() {
        assertFalse(validator.isCpfExistente(null));
        // Verifica que passar null retorna false

        when(userRepository.existsByCpf(123L)).thenReturn(false);
        // Configura o mock para retornar false para o CPF 123L

        assertFalse(validator.isCpfExistente(123L));
        // Verifica que para CPF inexistente o retorno é false
    }

    @Test
    void deveRetornarTrueQuandoEmailExistenteNoUserRepository() {
        when(userRepository.existsByEmail("teste@exemplo.com")).thenReturn(true);
        // Configura o mock para retornar true para o email teste@exemplo.com

        boolean resultado = validator.isEmailExistente("teste@exemplo.com");
        // Chama o método que verifica existência do email no repositório de usuários

        assertTrue(resultado);
        // Verifica que o resultado é true

        verify(userRepository).existsByEmail("teste@exemplo.com");
        // Verifica que o método existsByEmail foi chamado com o email especificado
    }

    @Test
    void deveRetornarFalseQuandoEmailForNuloOuVazio() {
        assertFalse(validator.isEmailExistente(null));
        // Verifica que email nulo retorna false

        assertFalse(validator.isEmailExistente(""));
        // Verifica que email vazio retorna false
    }

    @Test
    void deveRetornarTrueQuandoEmailExistenteNoClienteRepository() {
        when(clienteRepository.existsByEmail("cliente@email.com")).thenReturn(true);
        // Configura o mock para retornar true para email no repositório de clientes

        boolean resultado = validator.exiteEmailCliente("cliente@email.com");
        // Chama o método que verifica email no repositório de clientes

        assertTrue(resultado);
        // Verifica que o resultado é true
    }

    @Test
    void deveRetornarFalseQuandoEmailClienteForInexistenteOuNuloOuVazio() {
        when(clienteRepository.existsByEmail("naoexiste@email.com")).thenReturn(false);
        // Configura mock para retornar false para email inexistente

        assertFalse(validator.exiteEmailCliente("naoexiste@email.com"));
        // Verifica false para email inexistente

        assertFalse(validator.exiteEmailCliente(null));
        // Verifica false para email nulo

        assertFalse(validator.exiteEmailCliente(""));
        // Verifica false para email vazio
    }

    @Test
    void deveRetornarTrueQuandoCpfClienteExistente() {
        when(clienteRepository.existsByCpf(98765432100L)).thenReturn(true);
        // Configura mock para retornar true para CPF existente no repositório de clientes

        boolean resultado = validator.exiteCpfCliente(98765432100L);
        // Chama método para verificar CPF de cliente

        assertTrue(resultado);
        // Verifica resultado true
    }

    @Test
    void deveRetornarFalseQuandoCpfClienteNaoExistenteOuNulo() {
        when(clienteRepository.existsByCpf(123L)).thenReturn(false);
        // Configura mock para retornar false para CPF inexistente

        assertFalse(validator.exiteCpfCliente(123L));
        // Verifica false para CPF inexistente

        assertFalse(validator.exiteCpfCliente(null));
        // Verifica false para CPF nulo
    }
}
