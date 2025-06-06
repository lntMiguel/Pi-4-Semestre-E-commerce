package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class) // Habilita o uso de anotações do Mockito como @Mock e @InjectMocks
class ProductControllerTest {

    private MockMvc mockMvc; // Usado para simular requisições HTTP no controller

    @Mock
    private ProductService productService; // Mock do serviço de produtos

    @InjectMocks
    private ProductController productController; // Injeta o mock do serviço no controller

    private ObjectMapper objectMapper; // Serializa objetos Java em JSON

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build(); // Inicializa o MockMvc com o controller
        objectMapper = new ObjectMapper(); // Instancia o serializador
    }

    @Test
    void deveListarTodosProdutosSemFiltro() throws Exception {
        // Cria dois produtos simulados
        Produto p1 = criarProdutoMock("1", "Produto A");
        Produto p2 = criarProdutoMock("2", "Produto B");

        // Define comportamento do mock
        when(productService.listarTodos(null)).thenReturn(List.of(p1, p2));

        // Faz GET na rota /produto sem filtros
        mockMvc.perform(get("/produto"))
                .andExpect(status().isOk()) // Espera status 200
                .andExpect(jsonPath("$.length()").value(2)) // Espera dois produtos
                .andExpect(jsonPath("$[0].id").value("1")) // Verifica ID do primeiro
                .andExpect(jsonPath("$[1].id").value("2")); // Verifica ID do segundo
    }

    @Test
    void deveListarProdutosComFiltroNome() throws Exception {
        Produto p1 = criarProdutoMock("1", "Produto A");

        // Define retorno com filtro "A"
        when(productService.listarTodos("A")).thenReturn(List.of(p1));

        // Faz GET com parâmetro "nome"
        mockMvc.perform(get("/produto").param("nome", "A"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1)) // Apenas um produto
                .andExpect(jsonPath("$[0].nome").value("Produto A")); // Nome do produto
    }

    @Test
    void deveSalvarProdutoComSucesso() throws Exception {
        Produto p = criarProdutoMock(null, "Produto Novo"); // Produto sem ID
        Produto salvo = criarProdutoMock("123", "Produto Novo"); // Simulado com ID

        when(productService.salvar(any(Produto.class))).thenReturn(salvo); // Mock de retorno

        // Faz POST enviando o produto em JSON
        mockMvc.perform(post("/produto")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123")) // Verifica se foi salvo com ID
                .andExpect(jsonPath("$.nome").value("Produto Novo")); // Verifica nome
    }

    @Test
    void deveRetornarBadRequestAoSalvarProdutoInvalido() throws Exception {
        Produto p = criarProdutoMock(null, "Produto Inválido");

        // Define que salvar um produto inválido lança exceção
        when(productService.salvar(any(Produto.class))).thenThrow(new IllegalArgumentException("Produto inválido"));

        mockMvc.perform(post("/produto")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isBadRequest()) // Espera erro 400
                .andExpect(content().string("Produto inválido")); // Mensagem de erro
    }

    @Test
    void deveAlterarStatusProduto() throws Exception {
        Produto p = criarProdutoMock("123", "Produto Status");

        // Simula alteração de status
        when(productService.alterarStatusProduct("123")).thenReturn(p);

        mockMvc.perform(put("/produto/{id}/status", "123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123")); // Confirma ID do produto alterado
    }

    @Test
    void deveRetornarStatusProduto() throws Exception {
        // Simula status = true
        when(productService.retornaStatusProduct("123")).thenReturn(true);

        mockMvc.perform(get("/produto/{id}/status", "123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true)); // Espera status true no JSON
    }

    @Test
    void deveAtualizarDadosProduto() throws Exception {
        Produto atualizado = criarProdutoMock("123", "Produto Atualizado");

        // Simula atualização completa com múltiplos parâmetros
        when(productService.atualizaProduto(eq("123"), eq("codigo123"), eq("Produto Atualizado"),
                eq(new BigDecimal("100.00")), eq(10), eq("Descrição atualizada"), eq(4.5)))
                .thenReturn(atualizado);

        mockMvc.perform(put("/produto/{id}/dados", "123")
                        .param("codigo", "codigo123")
                        .param("nome", "Produto Atualizado")
                        .param("preco", "100.00")
                        .param("qtdEstoque", "10")
                        .param("descDetalhada", "Descrição atualizada")
                        .param("avaliacao", "4.5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.nome").value("Produto Atualizado"));
    }

    @Test
    void deveAlterarQuantidadeProduto() throws Exception {
        Produto atualizado = criarProdutoMock("123", "Produto Quantidade");

        // Simula alteração de quantidade
        when(productService.alteraQuantidade("123", 15)).thenReturn(atualizado);

        mockMvc.perform(put("/produto/{id}/quantidade", "123")
                        .param("qtdEstoque", "15"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"));
    }

    @Test
    void deveDiminuirQuantidadeProduto() throws Exception {
        Produto atualizado = criarProdutoMock("123", "Produto Diminuir");

        // Simula desconto de quantidade
        when(productService.diminuiQuantidade("123", 5)).thenReturn(atualizado);

        mockMvc.perform(put("/produto/{id}/descontar", "123")
                        .param("qtdDescontada", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"));
    }

    // Método auxiliar para criar um Produto simulado
    private Produto criarProdutoMock(String id, String nome) {
        Produto p = new Produto();
        p.setId(id);
        p.setCodigo("codigo");
        p.setNome(nome);
        p.setPreco(new BigDecimal("50.00"));
        p.setQtdEstoque(20);
        p.setDescDetalhada("Descrição");
        p.setAvaliacao(4.0);
        p.setStatus(true);
        return p;
    }
}