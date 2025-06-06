package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Pedido;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.models.statusPedido.StatusPedido;
import br.com.pi.pi_ecommerce.utils.ConsultaEstoque;
import br.com.pi.pi_ecommerce.repository.PedidoRepository;
import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.utils.GeradorDeNumeros;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PedidoServiceTest {

    @InjectMocks
    private PedidoService pedidoService;
    // Injeta uma instância real de PedidoService, com os mocks abaixo injetados automaticamente

    @Mock
    private PedidoRepository pedidoRepository;
    // Cria mock do repositório de pedidos para simular acesso a dados

    @Mock
    private ProductService productService;
    // Mock do serviço de produtos para simular ações relacionadas ao produto

    @Mock
    private CarrinhoService carrinhoService;
    // Mock do serviço do carrinho (não usado nos testes mostrados, mas disponível)

    @Mock
    private ClienteRepository clienteRepository;
    // Mock do repositório de clientes (não usado nos testes mostrados, mas disponível)

    @Mock
    private ConsultaEstoque consultaEstoque;
    // Mock para consulta de estoque (não usado nos testes mostrados)

    @Mock
    private GeradorDeNumeros geradorDeNumeros;
    // Mock do gerador de números para simular a geração de número de pedido

    private AutoCloseable closeable;
    // Para controlar o ciclo de vida dos mocks (abrir e fechar)

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        // Inicializa os mocks antes de cada teste
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
        // Fecha os mocks após cada teste, liberando recursos
    }

    @Test
    void testCriarPedido_comSucesso() {
        // Arrange (preparação dos dados para o teste)
        ProdutoPedido produto = new ProdutoPedido("prod1", "Produto Teste", 2, new BigDecimal("10.00"));
        // Cria um produto para o pedido com id, nome, quantidade e preço

        Pedido pedido = new Pedido();
        pedido.setProdutos(List.of(produto));
        // Cria um pedido e adiciona a lista com o produto criado

        when(geradorDeNumeros.gerarNumeroPedido()).thenReturn("20250605-0001");
        // Simula o gerador de números para sempre retornar um número fixo

        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> invocation.getArgument(0));
        // Simula o save do repositório para simplesmente retornar o pedido passado

        // Act (ação que será testada)
        Pedido resultado = pedidoService.criarPedido(pedido);
        // Chama o método que cria o pedido e armazena o resultado

        // Assert (verificações para garantir comportamento esperado)
        assertNotNull(resultado);
        // Verifica se o resultado não é nulo

        assertEquals("20250605-0001", resultado.getNumero());
        // Verifica se o número do pedido é igual ao número mockado

        verify(pedidoRepository, times(1)).save(any(Pedido.class));
        // Verifica se o método save do repositório foi chamado exatamente 1 vez

        verify(productService, times(1)).diminuiQuantidade("prod1", 2);
        // Verifica se o método que diminui a quantidade do produto foi chamado 1 vez com os parâmetros corretos
    }

    @Test
    void testRetornaTodosCliente() {
        String clienteId = "cliente1";
        // Define o id do cliente para consulta

        List<Pedido> listaPedidos = List.of(new Pedido(), new Pedido());
        // Cria uma lista com dois pedidos fictícios

        when(pedidoRepository.findByIdCliente(clienteId)).thenReturn(listaPedidos);
        // Simula o método que retorna todos pedidos de um cliente específico

        List<Pedido> resultado = pedidoService.retornaTodosCliente(clienteId);
        // Chama o método que retorna os pedidos do cliente

        assertEquals(2, resultado.size());
        // Verifica se a lista retornada tem exatamente 2 pedidos

        verify(pedidoRepository).findByIdCliente(clienteId);
        // Verifica se o método do repositório foi chamado com o clienteId
    }

    @Test
    void testRetornaTodosAdm() {
        List<Pedido> listaPedidos = List.of(new Pedido(), new Pedido(), new Pedido());
        // Cria lista com 3 pedidos fictícios

        when(pedidoRepository.findAll()).thenReturn(listaPedidos);
        // Simula o método que retorna todos os pedidos do sistema

        List<Pedido> resultado = pedidoService.retornaTodosAdm();
        // Chama o método que retorna todos os pedidos para admin

        assertEquals(3, resultado.size());
        // Verifica se a lista retornada tem 3 pedidos

        verify(pedidoRepository).findAll();
        // Verifica se o método findAll do repositório foi chamado
    }

    @Test
    void testAlterarStatus_pedidoExiste() {
        String pedidoId = "pedido123";
        // Id do pedido que será alterado

        Pedido pedidoExistente = new Pedido();
        pedidoExistente.setId(pedidoId);
        pedidoExistente.setStatus(StatusPedido.AGUARDANDO_PAGAMENTO);
        // Cria pedido com status inicial

        when(pedidoRepository.findById(pedidoId)).thenReturn(Optional.of(pedidoExistente));
        // Simula busca do pedido existente

        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedidoExistente);
        // Simula salvar o pedido retornando o mesmo pedido existente

        ResponseEntity<Map<String, String>> response = pedidoService.alterarStatus(pedidoId, StatusPedido.PAGAMENTO_COM_SUCESSO);
        // Chama método para alterar o status do pedido

        assertEquals(HttpStatus.OK, response.getStatusCode());
        // Verifica se a resposta tem status 200 OK

        assertEquals("Status Atualizado!", response.getBody().get("message"));
        // Verifica se a mensagem de retorno está correta

        assertEquals(StatusPedido.PAGAMENTO_COM_SUCESSO, pedidoExistente.getStatus());
        // Verifica se o status do pedido foi atualizado corretamente

        verify(pedidoRepository).save(pedidoExistente);
        // Verifica se o método save foi chamado para atualizar o pedido
    }

    @Test
    void testAlterarStatus_pedidoNaoExiste() {
        String pedidoId = "pedidoInvalido";
        // Id de pedido inválido (não existente)

        when(pedidoRepository.findById(pedidoId)).thenReturn(Optional.empty());
        // Simula busca que não encontra o pedido

        ResponseEntity<Map<String, String>> response = pedidoService.alterarStatus(pedidoId, StatusPedido.PAGAMENTO_COM_SUCESSO);
        // Chama método para alterar o status de pedido inexistente

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        // Verifica se a resposta tem status 404 Not Found

        assertEquals("Pedido não encontrado!", response.getBody().get("message"));
        // Verifica se a mensagem de erro está correta

        verify(pedidoRepository, never()).save(any());
        // Verifica que o método save nunca foi chamado (pois pedido não existe)
    }
}
