package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class ConsultaEstoqueTest {
// Classe de teste para a funcionalidade de consulta e validação de estoque

    private ProductRepository productRepository;
    // Repositório mockado para buscar produtos

    private ConsultaEstoque consultaEstoque;
    // Classe que será testada, responsável pela lógica de validação

    @BeforeEach
    void setUp() {
        productRepository = mock(ProductRepository.class);
        // Cria mock do ProductRepository antes de cada teste

        consultaEstoque = new ConsultaEstoque(productRepository);
        // Instancia a classe que será testada com o mock injetado
    }

    @Test
    void deveValidarEstoqueComSucessoParaListaDeProdutos() {
        Produto produto = new Produto();
        // Cria um produto de exemplo

        produto.setId("123");
        // Define ID do produto

        produto.setNome("Produto Teste");
        // Define nome do produto

        produto.setQtdEstoque(10);
        // Define quantidade em estoque

        produto.setStatus(true);
        // Define produto como ativo

        ProdutoPedido pedido = new ProdutoPedido();
        // Cria um pedido de produto para testar

        pedido.setIdProduto("123");
        // Define o ID do produto pedido

        pedido.setQuantidade(5);
        // Define a quantidade solicitada no pedido

        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto pelo ID retornando o produto criado

        assertDoesNotThrow(() ->
                consultaEstoque.validarEstoqueEStatus(List.of(pedido))
        );
        // Verifica que a validação do estoque e status para a lista de pedidos NÃO lança exceção
    }

    @Test
    void deveLancarExcecaoQuandoProdutoNaoEncontrado() {
        ProdutoPedido pedido = new ProdutoPedido();
        // Cria um pedido de produto

        pedido.setIdProduto("999");
        // Define um ID que não existe no repositório

        pedido.setQuantidade(2);
        // Quantidade pedida

        when(productRepository.findById("999")).thenReturn(Optional.empty());
        // Simula que o produto não foi encontrado no repositório

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                consultaEstoque.validarEstoqueEStatus(List.of(pedido))
        );
        // Espera que a validação lance exceção por produto não encontrado

        assertEquals(404, ex.getStatusCode().value());
        // Verifica que o código HTTP da exceção é 404 (Not Found)

        assertTrue(ex.getReason().contains("Produto com ID '999' não encontrado"));
        // Verifica que a mensagem da exceção contém a informação correta
    }

    @Test
    void deveLancarExcecaoQuandoEstoqueInsuficiente() {
        Produto produto = new Produto();
        // Cria um produto de exemplo

        produto.setId("123");
        // Define o ID

        produto.setNome("Produto X");
        // Nome do produto

        produto.setQtdEstoque(1); // apenas 1 no estoque
        // Estoque baixo, insuficiente para o pedido

        produto.setStatus(true);
        // Produto ativo

        ProdutoPedido pedido = new ProdutoPedido();
        // Cria pedido

        pedido.setIdProduto("123");
        // Define ID do produto pedido

        pedido.setQuantidade(5); // quer 5
        // Quantidade solicitada maior que estoque

        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto existente

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                consultaEstoque.validarEstoqueEStatus(List.of(pedido))
        );
        // Espera exceção por estoque insuficiente

        assertEquals(400, ex.getStatusCode().value());
        // Verifica código HTTP 400 (Bad Request)

        assertTrue(ex.getReason().contains("Estoque insuficiente"));
        // Verifica mensagem da exceção referente a estoque insuficiente
    }

    @Test
    void deveValidarEstoqueEStatusParaItemComSucesso() {
        Produto produto = new Produto();
        // Produto de exemplo

        produto.setId("001");
        // ID do produto

        produto.setNome("Item A");
        // Nome do produto

        produto.setStatus(true);
        // Produto ativo

        produto.setQtdEstoque(10);
        // Estoque suficiente

        when(productRepository.findById("001")).thenReturn(Optional.of(produto));
        // Simula busca do produto

        assertDoesNotThrow(() ->
                consultaEstoque.validarEstoqueEStatusParaItem("001", 5)
        );
        // Verifica que validar estoque e status para item único não lança exceção
    }

    @Test
    void deveLancarExcecaoSeItemInativo() {
        Produto produto = new Produto();
        // Produto de exemplo

        produto.setId("002");
        // ID do produto

        produto.setNome("Item B");
        // Nome do produto

        produto.setStatus(false);
        // Produto inativo

        produto.setQtdEstoque(10);
        // Estoque disponível, mas produto está inativo

        when(productRepository.findById("002")).thenReturn(Optional.of(produto));
        // Simula busca do produto inativo

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                consultaEstoque.validarEstoqueEStatusParaItem("002", 3)
        );
        // Espera exceção ao validar produto inativo

        assertEquals(400, ex.getStatusCode().value());
        // Verifica código HTTP 400

        assertTrue(ex.getReason().contains("está inativo"));
        // Verifica mensagem da exceção indicando produto inativo
    }

    @Test
    void deveLancarExcecaoSeEstoqueInsuficienteParaItemUnico() {
        Produto produto = new Produto();
        // Produto exemplo

        produto.setId("003");
        // ID

        produto.setNome("Item C");
        // Nome

        produto.setStatus(true);
        // Produto ativo

        produto.setQtdEstoque(1);
        // Estoque insuficiente para o pedido

        when(productRepository.findById("003")).thenReturn(Optional.of(produto));
        // Simula busca do produto

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                consultaEstoque.validarEstoqueEStatusParaItem("003", 5)
        );
        // Espera exceção por estoque insuficiente

        assertEquals(400, ex.getStatusCode().value());
        // Código HTTP 400

        assertTrue(ex.getReason().contains("Estoque insuficiente"));
        // Mensagem indicando estoque insuficiente
    }

    @Test
    void deveIgnorarValidacaoSeQuantidadeForZeroOuNegativa() {
        assertDoesNotThrow(() ->
                consultaEstoque.validarEstoqueEStatusParaItem("123", 0)
        );
        // Verifica que não lança exceção para quantidade zero

        assertDoesNotThrow(() ->
                consultaEstoque.validarEstoqueEStatusParaItem("123", -1)
        );
        // Verifica que não lança exceção para quantidade negativa

        // Verifica que o método findById do repositório nunca foi chamado
        verify(productRepository, never()).findById(anyString());
    }
}
