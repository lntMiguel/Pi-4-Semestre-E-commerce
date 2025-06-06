package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Carrinho;
import br.com.pi.pi_ecommerce.models.Cliente;
import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.repository.CarrinhoRepository;
import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.utils.ConsultaEstoque;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;



class CarrinhoServiceTest {

    @InjectMocks
    private CarrinhoService carrinhoService;
    // Instancia a classe que está sendo testada,
    // injetando os mocks nas suas dependências

    @Mock
    private CarrinhoRepository carrinhoRepository;
    // Mock do repositório de carrinho, simula acesso ao banco

    @Mock
    private ClienteRepository clienteRepository;
    // Mock do repositório de clientes

    @Mock
    private ProductService productService;
    // Mock do serviço de produtos, usado para buscar produtos

    @Mock
    private ConsultaEstoque consultaEstoque;
    // Mock para verificar estoque, caso utilizado internamente

    private final String ID_CLIENTE = "cliente123";
    private final String ID_PRODUTO = "produto123";
    // Constantes usadas nos testes para IDs fixos

    private AutoCloseable closeable;
    // Para fechar os mocks após os testes

    private Produto produto;
    private Carrinho carrinho;
    // Objetos usados nos testes, instanciados no setup

    @BeforeEach
    void setUp() {
        // Inicializa os mocks antes de cada teste
        closeable = MockitoAnnotations.openMocks(this);

        // Cria um produto de exemplo
        produto = new Produto();
        produto.setId(ID_PRODUTO);
        produto.setNome("Produto Teste");
        produto.setPreco(new BigDecimal("100.00"));
        produto.setQtdEstoque(10);
        produto.setStatus(true);

        // Cria um carrinho vazio para o cliente
        carrinho = new Carrinho(ID_CLIENTE);

        // Simula cliente existente no repositório
        when(clienteRepository.findById(ID_CLIENTE)).thenReturn(Optional.of(new Cliente()));

        // Simula carrinho existente no repositório
        when(carrinhoRepository.findByIdCliente(ID_CLIENTE)).thenReturn(Optional.of(carrinho));
    }

    @AfterEach
    void tearDown() throws Exception {
        // Libera recursos dos mocks após cada teste
        closeable.close();
    }

    @Test
    void deveAdicionarItemAoCarrinhoComSucesso() {
        // Simula busca do produto ativo com estoque suficiente
        when(productService.buscarPorId(ID_PRODUTO)).thenReturn(produto);

        // Simula salvar carrinho e retorna ele mesmo (como no save do repositório)
        when(carrinhoRepository.save(any(Carrinho.class))).thenAnswer(i -> i.getArgument(0));

        // Chama o método real para adicionar item no carrinho
        Carrinho atualizado = carrinhoService.adicionarItemAoCarrinho(ID_CLIENTE, ID_PRODUTO, 2);

        // Verifica que o carrinho tem 1 item
        assertEquals(1, atualizado.getItens().size());

        ProdutoPedido item = atualizado.getItens().getFirst();
        // Confirma que o produto do item é o esperado
        assertEquals(ID_PRODUTO, item.getIdProduto());
        // Confirma quantidade adicionada
        assertEquals(2, item.getQuantidade());
        // Confirma o valor total do carrinho (2x 100)
        assertEquals(new BigDecimal("200.00"), atualizado.getValorTotal());
    }

    @Test
    void naoDeveAdicionarProdutoInativo() {
        // Marca o produto como inativo
        produto.setStatus(false);

        // Simula busca do produto inativo
        when(productService.buscarPorId(ID_PRODUTO)).thenReturn(produto);

        // Espera exceção ao tentar adicionar produto inativo
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> carrinhoService.adicionarItemAoCarrinho(ID_CLIENTE, ID_PRODUTO, 1));

        // Verifica que a mensagem contém "inativo"
        assertTrue(ex.getReason().contains("inativo"));
    }

    @Test
    void naoDeveAdicionarSeEstoqueInsuficiente() {
        // Ajusta estoque para 1 unidade
        produto.setQtdEstoque(1);

        when(productService.buscarPorId(ID_PRODUTO)).thenReturn(produto);

        // Adiciona 1 unidade para simular que já tem no carrinho
        carrinho.adicionarOuAtualizarItem(produto, 1);

        // Tenta adicionar mais 1, que excede estoque disponível
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> carrinhoService.adicionarItemAoCarrinho(ID_CLIENTE, ID_PRODUTO, 1));

        // Verifica que a exceção contém mensagem de estoque insuficiente
        assertTrue(ex.getReason().contains("Estoque insuficiente"));
    }

    @Test
    void deveRemoverItemDoCarrinho() {
        // Cria um item já no carrinho
        ProdutoPedido item = new ProdutoPedido();
        item.setIdProduto(ID_PRODUTO);
        item.setQuantidade(1);
        item.setPrecoUnitario(new BigDecimal("100.00"));
        carrinho.getItens().add(item);

        // Simula salvar o carrinho
        when(carrinhoRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        // Remove o item do carrinho
        Carrinho atualizado = carrinhoService.removerItemDoCarrinho(ID_CLIENTE, ID_PRODUTO);

        // Verifica que o carrinho ficou vazio
        assertTrue(atualizado.getItens().isEmpty());
        // Valor total deve ser zero após remover tudo
        assertEquals(BigDecimal.ZERO, atualizado.getValorTotal());
    }

    @Test
    void deveAtualizarQuantidadeItem() {
        // Adiciona item com quantidade 2 no carrinho
        ProdutoPedido item = new ProdutoPedido();
        item.setIdProduto(ID_PRODUTO);
        item.setQuantidade(2);
        item.setPrecoUnitario(new BigDecimal("100.00"));
        carrinho.getItens().add(item);

        // Simula busca do produto ativo
        when(productService.buscarPorId(ID_PRODUTO)).thenReturn(produto);
        // Simula salvar carrinho
        when(carrinhoRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        // Atualiza a quantidade para 5
        Carrinho atualizado = carrinhoService.atualizarQuantidadeItem(ID_CLIENTE, ID_PRODUTO, 5);

        ProdutoPedido atualizadoItem = atualizado.getItens().getFirst();
        // Verifica que quantidade foi atualizada
        assertEquals(5, atualizadoItem.getQuantidade());
    }

    @Test
    void deveVisualizarCarrinhoExistente() {
        // Apenas chama o método para visualizar o carrinho do cliente
        Carrinho visualizado = carrinhoService.visualizarCarrinho(ID_CLIENTE);

        // Confirma que o carrinho retornado pertence ao cliente correto
        assertEquals(ID_CLIENTE, visualizado.getIdCliente());
    }

    @Test
    void deveLimparCarrinho() {
        // Adiciona um item no carrinho com preço unitário 50 e quantidade 2
        ProdutoPedido item = new ProdutoPedido();
        item.setIdProduto(ID_PRODUTO);
        item.setQuantidade(2);
        item.setPrecoUnitario(new BigDecimal("50.00"));
        carrinho.getItens().add(item);

        // Simula salvar carrinho após limpeza
        when(carrinhoRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        // Chama método para limpar o carrinho
        Carrinho resultado = carrinhoService.limparCarrinho(ID_CLIENTE);

        // Verifica que carrinho está vazio
        assertTrue(resultado.getItens().isEmpty());
        // Valor total deve ser zero após limpeza
        assertEquals(BigDecimal.ZERO, resultado.getValorTotal());
    }
}