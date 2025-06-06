package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.repository.ProductRepository;
import br.com.pi.pi_ecommerce.utils.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
// Habilita a extensão do Mockito para testes, permitindo o uso de @Mock e @InjectMocks
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    // Mock do repositório de produtos para simular acesso a dados

    @Mock
    private Validator validator;
    // Mock do validador para simular validação de dados (não usado diretamente aqui)

    @InjectMocks
    private ProductService productService;
    // Instância real de ProductService com os mocks injetados automaticamente

    private Produto produto;
    // Variável para armazenar um objeto Produto usado nos testes

    @BeforeEach
    void setUp() {
        produto = new Produto();
        // Cria novo objeto Produto antes de cada teste

        produto.setId("123");
        // Define o ID do produto

        produto.setNome("Produto Teste");
        // Define o nome do produto

        produto.setPreco(new BigDecimal("10.0"));
        // Define o preço do produto

        produto.setQtdEstoque(100);
        // Define a quantidade em estoque

        produto.setStatus(true);
        // Define o status do produto como ativo
    }

    @Test
    void alterarStatusProduct_comSucesso() {
        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto pelo ID, retornando o produto criado

        when(productRepository.save(any())).thenReturn(produto);
        // Simula salvar o produto, retornando o produto salvo

        Produto resultado = productService.alterarStatusProduct("123");
        // Chama o método para alterar o status do produto (ativo/inativo)

        assertNotNull(resultado);
        // Verifica que o resultado não é nulo

        assertFalse(resultado.getStatus());
        // Verifica que o status foi invertido (agora falso)
    }

    @Test
    void alterarStatusProduct_produtoNaoEncontrado() {
        when(productRepository.findById("999")).thenReturn(Optional.empty());
        // Simula busca que não encontra produto com ID "999"

        assertThrows(ResponseStatusException.class, () -> productService.alterarStatusProduct("999"));
        // Espera que lançar uma exceção ao tentar alterar status de produto inexistente
    }

    @Test
    void atualizaProduto_comSucesso() {
        when(productRepository.findByid("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto existente pelo ID "123" (atenção: "findByid" está com 'i' minúsculo, pode ser erro)

        when(productRepository.save(any())).thenReturn(produto);
        // Simula salvar o produto atualizado

        Produto resultado = productService.atualizaProduto("123", "ABC123", "Produto Atualizado",
                new BigDecimal("20.0"), 50, "Descrição nova", 4.5);
        // Chama o método para atualizar o produto com novos dados

        assertEquals("Produto Atualizado", resultado.getNome());
        // Verifica que o nome foi atualizado corretamente

        assertEquals(50, resultado.getQtdEstoque());
        // Verifica que a quantidade em estoque foi atualizada
    }

    @Test
    void atualizaProduto_produtoNaoEncontrado() {
        when(productRepository.findByid("999")).thenReturn(Optional.empty());
        // Simula busca que não encontra produto com ID "999"

        assertThrows(ResponseStatusException.class, () ->
                productService.atualizaProduto("999", "codigo", "nome", BigDecimal.TEN, 1, "desc", 3.0));
        // Espera que lançar exceção ao tentar atualizar produto inexistente
    }

    @Test
    void retornaStatusProduct_comSucesso() {
        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto existente

        boolean status = productService.retornaStatusProduct("123");
        // Chama método que retorna o status do produto

        assertTrue(status);
        // Verifica que o status retornado é true (ativo)
    }

    @Test
    void retornaStatusProduct_produtoNaoEncontrado() {
        when(productRepository.findById("999")).thenReturn(Optional.empty());
        // Simula busca que não encontra o produto

        assertThrows(ResponseStatusException.class, () -> productService.retornaStatusProduct("999"));
        // Espera exceção ao tentar obter status de produto inexistente
    }

    @Test
    void alteraQuantidade_comSucesso() {
        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto existente

        when(productRepository.save(any())).thenReturn(produto);
        // Simula salvar o produto com quantidade alterada

        Produto resultado = productService.alteraQuantidade("123", 75);
        // Chama método que altera a quantidade em estoque para 75

        assertEquals(75, resultado.getQtdEstoque());
        // Verifica que a quantidade foi alterada corretamente
    }

    @Test
    void alteraQuantidade_produtoNaoEncontrado() {
        when(productRepository.findById("999")).thenReturn(Optional.empty());
        // Simula busca que não encontra produto

        assertThrows(ResponseStatusException.class, () -> productService.alteraQuantidade("999", 10));
        // Espera exceção ao tentar alterar quantidade de produto inexistente
    }

    @Test
    void diminuiQuantidade_comSucesso() {
        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto existente

        when(productRepository.save(any())).thenReturn(produto);
        // Simula salvar o produto com quantidade reduzida

        Produto resultado = productService.diminuiQuantidade("123", 10);
        // Chama método para diminuir a quantidade em 10 unidades

        assertEquals(90, resultado.getQtdEstoque());
        // Verifica que a quantidade ficou em 90 (100 - 10)
    }

    @Test
    void diminuiQuantidade_estoqueInsuficiente() {
        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca do produto existente

        assertThrows(ResponseStatusException.class, () -> productService.diminuiQuantidade("123", 200));
        // Espera exceção porque estoque não é suficiente para diminuir 200 unidades
    }

    @Test
    void diminuiQuantidade_produtoNaoEncontrado() {
        when(productRepository.findById("999")).thenReturn(Optional.empty());
        // Simula busca que não encontra produto

        assertThrows(ResponseStatusException.class, () -> productService.diminuiQuantidade("999", 5));
        // Espera exceção ao tentar diminuir quantidade de produto inexistente
    }

    @Test
    void buscarPorId_comSucesso() {
        when(productRepository.findById("123")).thenReturn(Optional.of(produto));
        // Simula busca por ID que retorna o produto

        Produto resultado = productService.buscarPorId("123");
        // Chama método para buscar produto pelo ID

        assertEquals("Produto Teste", resultado.getNome());
        // Verifica se o nome do produto retornado está correto
    }

    @Test
    void buscarPorId_produtoNaoEncontrado() {
        when(productRepository.findById("999")).thenReturn(Optional.empty());
        // Simula busca que não encontra produto

        assertThrows(ResponseStatusException.class, () -> productService.buscarPorId("999"));
        // Espera exceção ao tentar buscar produto inexistente
    }

    @Test
    void listarTodos_semFiltro() {
        List<Produto> lista = List.of(produto);
        // Cria lista com um produto

        when(productRepository.findAll()).thenReturn(lista);
        // Simula retorno da lista completa do repositório

        List<Produto> resultado = productService.listarTodos(null);
        // Chama método para listar todos os produtos sem filtro

        assertEquals(1, resultado.size());
        // Verifica que foi retornado 1 produto
    }

    @Test
    void listarTodos_comFiltro() {
        Produto outroProduto = new Produto();
        // Cria um segundo produto

        outroProduto.setNome("Produto Especial");
        // Define nome para teste de filtro

        List<Produto> lista = List.of(produto, outroProduto);
        // Lista com dois produtos

        when(productRepository.findAll()).thenReturn(lista);
        // Simula retorno da lista completa do repositório

        List<Produto> resultado = productService.listarTodos("especial");
        // Chama método para listar produtos filtrando pela palavra "especial"

        assertEquals(1, resultado.size());
        // Verifica que só um produto foi retornado após filtro

        assertEquals("Produto Especial", resultado.get(0).getNome());
        // Verifica que o produto retornado é o esperado
    }

    @Test
    void salvar_comSucesso() {
        when(productRepository.save(any())).thenReturn(produto);
        // Simula salvar produto retornando o produto salvo

        Produto resultado = productService.salvar(produto);
        // Chama método para salvar o produto

        assertEquals(produto, resultado);
        // Verifica que o produto retornado é o mesmo passado
    }
}
