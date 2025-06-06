package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Pedido;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.models.statusPedido.StatusPedido;
import br.com.pi.pi_ecommerce.service.PedidoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class) // Habilita a extensão do Mockito para suporte a @Mock e @InjectMocks
class PedidoControllerTest {

    private MockMvc mockMvc; // Usado para simular requisições HTTP ao controller

    @Mock
    private PedidoService pedidoService; // Cria um mock do serviço de pedidos

    @InjectMocks
    private PedidoController pedidoController; // Injeta o mock do serviço no controller

    private ObjectMapper objectMapper; // Usado para converter objetos Java em JSON e vice-versa

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(pedidoController).build(); // Inicializa o MockMvc com o controller isolado
        objectMapper = new ObjectMapper(); // Instancia o ObjectMapper para serialização
        objectMapper.registerModule(new JavaTimeModule()); // Suporte a tipos de data/hora do Java 8+
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // Configura para não serializar datas como timestamps
    }

    @Test
    void deveCriarPedidoComSucesso() throws Exception {
        Pedido pedido = criarPedidoMock(); // Cria um pedido de exemplo para envio
        Pedido pedidoCriado = criarPedidoMock(); // Simula o retorno do pedido já com ID
        pedidoCriado.setId("pedido123");

        when(pedidoService.criarPedido(any(Pedido.class))).thenReturn(pedidoCriado); // Define o comportamento do mock

        // Executa POST para criar pedido e verifica se os dados estão corretos na resposta
        mockMvc.perform(post("/pedidos/criar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pedido))) // Converte o objeto para JSON
                .andExpect(status().isCreated()) // Espera status 201
                .andExpect(jsonPath("$.id").value("pedido123")) // Verifica ID
                .andExpect(jsonPath("$.idCliente").value(pedido.getIdCliente())); // Verifica ID do cliente
    }

    @Test
    void deveRetornarTodosPedidosDoCliente() throws Exception {
        String idCliente = "cliente123";

        // Cria dois pedidos simulados
        Pedido pedido1 = criarPedidoMock();
        pedido1.setId("p1");
        Pedido pedido2 = criarPedidoMock();
        pedido2.setId("p2");

        List<Pedido> pedidos = List.of(pedido1, pedido2); // Lista simulada

        when(pedidoService.retornaTodosCliente(idCliente)).thenReturn(pedidos); // Mock do service

        // Executa GET para buscar pedidos do cliente
        mockMvc.perform(get("/pedidos/{id}", idCliente))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2)) // Verifica quantidade
                .andExpect(jsonPath("$[0].id").value("p1")) // Verifica primeiro pedido
                .andExpect(jsonPath("$[1].id").value("p2")); // Verifica segundo pedido
    }

    @Test
    void deveRetornarTodosPedidosParaAdm() throws Exception {
        // Cria dois pedidos simulados
        Pedido pedido1 = criarPedidoMock();
        pedido1.setId("p1");
        Pedido pedido2 = criarPedidoMock();
        pedido2.setId("p2");

        List<Pedido> pedidos = List.of(pedido1, pedido2); // Lista de pedidos

        when(pedidoService.retornaTodosAdm()).thenReturn(pedidos); // Mock do método para admin

        // Executa GET para buscar todos pedidos
        mockMvc.perform(get("/pedidos/getPedido"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("p1"))
                .andExpect(jsonPath("$[1].id").value("p2"));
    }

    @Test
    void deveAlterarStatusPedido() throws Exception {
        String idPedido = "pedido123";

        // Simula resposta de sucesso do serviço
        Map<String, String> resposta = Map.of("message", "Status alterado com sucesso");

        when(pedidoService.alterarStatus(eq(idPedido), any(StatusPedido.class)))
                .thenReturn(ResponseEntity.ok(resposta));

        // Executa PUT para alterar o status do pedido
        mockMvc.perform(put("/pedidos/{id}", idPedido)
                        .param("statusPedido", "ENTREGUE")) // Envia status como parâmetro da requisição
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Status alterado com sucesso"));
    }

    // Método auxiliar para criar um Pedido simulado
    private Pedido criarPedidoMock() {
        Pedido pedido = new Pedido();
        pedido.setIdCliente("cliente123"); // ID do cliente
        pedido.setNumero("12345"); // Número do pedido
        pedido.setDataPedido(new Date()); // Data atual
        pedido.setValor(new BigDecimal("150.00")); // Valor total
        pedido.setStatus(StatusPedido.AGUARDANDO_PAGAMENTO); // Status inicial
        pedido.setMetodoDePagamento("Cartão"); // Método de pagamento

        // Adiciona um produto ao pedido
        ProdutoPedido produtoPedido = new ProdutoPedido("prod123", "Produto Teste", 2, new BigDecimal("75.00"));
        pedido.setProdutos(List.of(produtoPedido));

        return pedido;
    }
}