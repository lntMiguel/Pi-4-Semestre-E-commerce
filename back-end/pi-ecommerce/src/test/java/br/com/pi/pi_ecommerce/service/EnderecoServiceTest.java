package br.com.pi.pi_ecommerce.service;
import br.com.pi.pi_ecommerce.models.EnderecoCliente;
import br.com.pi.pi_ecommerce.repository.EnderecoRepository;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EnderecoServiceTest {

    @InjectMocks
    private EnderecoService enderecoService;

    @Mock
    private EnderecoRepository enderecoRepository;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        // Inicializa os mocks antes de cada teste
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        // Fecha os mocks para liberar recursos após cada teste
        closeable.close();
    }

    @Test
    void testSalvarEndereco_comEnderecoPadraoDesmarcaOutro() {
        // Testa salvar um novo endereço marcado como padrão,
        // desmarcando o endereço padrão anterior do mesmo cliente

        String idCliente = "123";

        EnderecoCliente enderecoExistente = new EnderecoCliente();
        enderecoExistente.setPadrao(true);
        enderecoExistente.setIdCliente(idCliente);

        EnderecoCliente novoEndereco = new EnderecoCliente();
        novoEndereco.setPadrao(true);
        novoEndereco.setIdCliente(idCliente);

        // Quando o repositório buscar o endereço padrão pelo idCliente,
        // retorna um Optional contendo o enderecoExistente (mockando que já existe um padrão)
        when(enderecoRepository.findByIdClienteAndPadraoTrue(idCliente))
                .thenReturn(Optional.of(enderecoExistente));

        // Quando o repositório salvar o novoEndereco, retorna ele mesmo (mock do save)
        when(enderecoRepository.save(novoEndereco)).thenReturn(novoEndereco);

        EnderecoCliente resultado = enderecoService.salvarEndereco(novoEndereco);

        assertTrue(resultado.isPadrao());
        verify(enderecoRepository).save(enderecoExistente); // Verifica que desmarcou o antigo padrão
        verify(enderecoRepository).save(novoEndereco);
        assertFalse(enderecoExistente.isPadrao()); // O antigo foi desmarcado
    }

    @Test
    void testSalvarEndereco_comEnderecoNaoPadraoNaoDesmarca() {
        // Testa salvar um endereço que NÃO é padrão,
        // portanto, não deve desmarcar outro endereço padrão

        EnderecoCliente endereco = new EnderecoCliente();
        endereco.setPadrao(false);

        // Quando o repositório salvar o endereço, retorna o mesmo objeto (mock do save)
        when(enderecoRepository.save(endereco)).thenReturn(endereco);

        EnderecoCliente resultado = enderecoService.salvarEndereco(endereco);

        assertEquals(endereco, resultado);
        // Verifica que não foi feita consulta para buscar endereço padrão (pois novo não é padrão)
        verify(enderecoRepository, never()).findByIdClienteAndPadraoTrue(any());
        verify(enderecoRepository).save(endereco);
    }

    @Test
    void testExcluirEndereco_sucesso() {
        EnderecoCliente endereco = new EnderecoCliente();

        // Mocka que o método delete do repositório não faz nada (não lança exceção)
        doNothing().when(enderecoRepository).delete(endereco);

        ResponseEntity<String> response = enderecoService.excluirEndereco(endereco);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Endereço Excluido", response.getBody());
        verify(enderecoRepository).delete(endereco);
    }

    @Test
    void testExcluirEndereco_erro() {
        EnderecoCliente endereco = new EnderecoCliente();

        // Mocka que o método delete lança uma RuntimeException simulando um erro inesperado
        doThrow(new RuntimeException("Erro inesperado"))
                .when(enderecoRepository).delete(endereco);

        ResponseEntity<String> response = enderecoService.excluirEndereco(endereco);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody().contains("Erro ao excluir endereco"));
        verify(enderecoRepository).delete(endereco);
    }

    @Test
    void testSelecionarPrincipal_enderecoExiste() {
        String idEndereco = "end1";
        String idCliente = "cli1";

        EnderecoCliente endereco = new EnderecoCliente();
        endereco.setId(idEndereco);
        endereco.setIdCliente(idCliente);
        endereco.setPadrao(false); // inicialmente não é padrão

        EnderecoCliente enderecoExistente = new EnderecoCliente();
        enderecoExistente.setPadrao(true); // endereço antigo é padrão

        // Quando o repositório buscar pelo idEndereco, retorna o endereço existente
        when(enderecoRepository.findById(idEndereco))
                .thenReturn(Optional.of(endereco));

        // Quando o repositório buscar o endereço padrão do cliente, retorna o endereçoExistente
        when(enderecoRepository.findByIdClienteAndPadraoTrue(idCliente))
                .thenReturn(Optional.of(enderecoExistente));

        // Quando salvar qualquer EnderecoCliente, retorna o objeto passado como argumento (mock genérico de save)
        when(enderecoRepository.save(any(EnderecoCliente.class))).thenAnswer(i -> i.getArgument(0));

        EnderecoCliente resultado = enderecoService.selecionarPrincipal(idEndereco, idCliente);

        assertTrue(resultado.isPadrao());
        // Verifica se desmarcou o endereço padrão antigo salvando ele
        verify(enderecoRepository).save(enderecoExistente);
        // Verifica se salvou o endereço passado marcando ele como padrão
        verify(enderecoRepository).save(endereco);
    }

    @Test
    void testSelecionarPrincipal_enderecoNaoExiste() {
        // Quando buscar endereço por id inválido, retorna vazio (Optional.empty)
        when(enderecoRepository.findById("id_invalido"))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            enderecoService.selecionarPrincipal("id_invalido", "qualquer");
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Endereco não encontrado"));
    }

    @Test
    void testRetornaPrincipal_sucesso() {
        String idCliente = "cli1";
        EnderecoCliente endereco = new EnderecoCliente();
        endereco.setPadrao(true);

        // Quando buscar o endereço padrão do cliente, retorna o endereço mockado
        when(enderecoRepository.findByIdClienteAndPadraoTrue(idCliente))
                .thenReturn(Optional.of(endereco));

        EnderecoCliente resultado = enderecoService.retornaPrincipal(idCliente);

        assertEquals(endereco, resultado);
    }

    @Test
    void testRetornaPrincipal_naoEncontrado() {
        // Quando buscar o endereço padrão do cliente "cliX", retorna vazio (não encontrado)
        when(enderecoRepository.findByIdClienteAndPadraoTrue("cliX"))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            enderecoService.retornaPrincipal("cliX");
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Nenhum endereco padrao encontrado"));
    }

    @Test
    void testRetornaFaturamento_sucesso() {
        String idCliente = "cli1";
        EnderecoCliente endereco = new EnderecoCliente();
        endereco.setFaturamento(true);

        // Quando buscar o endereço de faturamento do cliente, retorna o endereço mockado
        when(enderecoRepository.findByIdClienteAndFaturamentoTrue(idCliente))
                .thenReturn(Optional.of(endereco));

        EnderecoCliente resultado = enderecoService.retornaFaturamento(idCliente);

        assertEquals(endereco, resultado);
    }

    @Test
    void testRetornaFaturamento_naoEncontrado() {
        // Quando buscar o endereço de faturamento do cliente "cliX", retorna vazio (não encontrado)
        when(enderecoRepository.findByIdClienteAndFaturamentoTrue("cliX"))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            enderecoService.retornaFaturamento("cliX");
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Nenhum endereco de faturamento encontrado"));
    }

    @Test
    void testRetornaTodos_sucesso() {
        String idCliente = "cli1";

        List<EnderecoCliente> enderecos = Arrays.asList(new EnderecoCliente(), new EnderecoCliente());

        // Quando buscar todos os endereços pelo idCliente, retorna a lista mockada
        when(enderecoRepository.findByIdCliente(idCliente)).thenReturn(enderecos);

        List<EnderecoCliente> resultado = enderecoService.retornaTodos(idCliente);

        assertEquals(enderecos.size(), resultado.size());
    }

    @Test
    void testRetornaTodos_vazio() {
        String idCliente = "cli1";

        // Quando buscar todos os endereços do cliente, retorna lista vazia
        when(enderecoRepository.findByIdCliente(idCliente)).thenReturn(Collections.emptyList());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            enderecoService.retornaTodos(idCliente);
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Nenhum endereco encontrado"));
    }
}