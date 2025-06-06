package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Carrinho;
import br.com.pi.pi_ecommerce.service.CarrinhoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CarrinhoControllerTest {

    private MockMvc mockMvc; // Utilizado para simular requisições HTTP ao controller
    private AutoCloseable closeable; // Controla o ciclo de vida dos mocks

    @Mock
    private CarrinhoService carrinhoService; // Mock do serviço usado pelo controller

    @InjectMocks
    private CarrinhoController carrinhoController; // Controller que será testado

    @BeforeEach
    void setup() {
        // Inicializa os mocks e configura o MockMvc com o controller
        closeable = MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(carrinhoController).build();
    }

    @AfterEach
    void tearDown() throws Exception {
        // Fecha os mocks após cada teste
        closeable.close();
    }

    @Test
    void deveRetornarCarrinhoQuandoVisualizar() throws Exception {
        // Cenário: o cliente deseja visualizar o carrinho
        String idCliente = "123";
        Carrinho carrinho = new Carrinho();
        Mockito.when(carrinhoService.visualizarCarrinho(idCliente)).thenReturn(carrinho);

        // Executa uma requisição GET e espera status 200 (OK) e o conteúdo do carrinho no JSON
        mockMvc.perform(get("/carrinho/" + idCliente))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists()); // Verifica que a resposta tem um corpo
    }

    @Test
    void deveAdicionarItemAoCarrinho() throws Exception {
        // Cenário: adicionar um item ao carrinho
        String idCliente = "123";
        Carrinho carrinhoAtualizado = new Carrinho();

        Map<String, Object> request = new HashMap<>();
        request.put("idProduto", "456");
        request.put("quantidade", 2);

        // Simula retorno do serviço
        Mockito.when(carrinhoService.adicionarItemAoCarrinho("123", "456", 2)).thenReturn(carrinhoAtualizado);

        // Realiza POST com corpo JSON e verifica status 200 e corpo de resposta
        mockMvc.perform(post("/carrinho/" + idCliente + "/itens")
                        .contentType(MediaType.APPLICATION_JSON)//Fala que o conteudo é json
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists()); //Verifica se o corpo da resposta contém algum JSON, O símbolo $ representa o objeto JSON raiz.
    }

    @Test
    void deveAtualizarQuantidadeItem() throws Exception {
        // Cenário: atualizar a quantidade de um item no carrinho
        String idCliente = "123";
        String idProduto = "456";
        Carrinho carrinhoAtualizado = new Carrinho();

        Map<String, Object> request = new HashMap<>();
        request.put("quantidade", 3);

        //simulação do comportamento do método atualizarQuantidadeItem da classe CarrinhoService
        Mockito.when(carrinhoService.atualizarQuantidadeItem(idCliente, idProduto, 3))
                .thenReturn(carrinhoAtualizado);

        // Executa PUT com nova quantidade e verifica status e corpo
        mockMvc.perform(put("/carrinho/{idCliente}/itens/{idProduto}", idCliente, idProduto) //simulando uma chamada PUT para o endpoint
                        .contentType(MediaType.APPLICATION_JSON) //Fala que o conteudo é json
                        .content(new ObjectMapper().writeValueAsString(request)))//Serializa o request (um Map<String, Object>) para JSON.
                .andExpect(status().isOk()) //Verifica se o corpo da resposta contém algum JSON, O símbolo $ representa o objeto JSON raiz.
                .andExpect(jsonPath("$").exists()); //Verifica se o corpo da resposta contém algum JSON, O símbolo $ representa o objeto JSON raiz.
    }

    @Test
    void deveRemoverItemDoCarrinho() throws Exception {
        // Cenário: remover um item do carrinho
        String idCliente = "123";
        String idProduto = "456";
        Carrinho carrinhoAtualizado = new Carrinho();

        Mockito.when(carrinhoService.removerItemDoCarrinho(idCliente, idProduto))
                .thenReturn(carrinhoAtualizado);

        // Executa DELETE para o item e verifica status e corpo
        mockMvc.perform(delete("/carrinho/{idCliente}/itens/{idProduto}", idCliente, idProduto))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists());
    }

    @Test
    void deveLimparCarrinho() throws Exception {
        // Cenário: limpar todos os itens do carrinho do cliente
        String idCliente = "123";
        Carrinho carrinhoLimpo = new Carrinho();

        Mockito.when(carrinhoService.limparCarrinho(idCliente)).thenReturn(carrinhoLimpo);

        // Executa DELETE no carrinho do cliente e verifica retorno
        mockMvc.perform(delete("/carrinho/{idCliente}", idCliente))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists());
    }
}
