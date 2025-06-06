package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.models.sequence.DatabaseSequence;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class GeradorDeNumerosTest {
// Classe de teste para a classe GeradorDeNumeros que gera números formatados para pedidos

    @Mock
    private MongoOperations mongoOperations;
    // Mock do MongoOperations para simular operações no banco MongoDB

    @InjectMocks
    private GeradorDeNumeros geradorDeNumeros;
    // Instância da classe GeradorDeNumeros com o mock injetado automaticamente

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
    void deveGerarNumeroDePedidoFormatadoCorretamente() {
        // Arrange (preparação dos dados para o teste)
        String dataHoje = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        // Data atual formatada no padrão yyyyMMdd

        String idSequenciaEsperado = "pedido-" + dataHoje;
        // Id da sequência esperado para buscar no banco, no formato "pedido-yyyyMMdd"

        DatabaseSequence sequence = new DatabaseSequence();
        sequence.setSeq(42L);
        // Cria uma sequência simulada com valor 42 para ser retornada pelo mock

        // Configura o comportamento do mock mongoOperations para retornar a sequência simulada
        when(mongoOperations.findAndModify(
                argThat(query -> query.getQueryObject().get("_id").equals(idSequenciaEsperado)),
                // Verifica se a query tem o _id esperado
                any(Update.class),
                // Aceita qualquer Update
                any(FindAndModifyOptions.class),
                // Aceita qualquer FindAndModifyOptions
                eq(DatabaseSequence.class)
                // Classe esperada para o retorno
        )).thenReturn(sequence);

        // Act (ação a ser testada)
        String numeroPedido = geradorDeNumeros.gerarNumeroPedido();
        // Chama o método que gera o número do pedido

        // Assert (verificações)
        assertNotNull(numeroPedido);
        // Verifica que o número do pedido não é nulo

        assertTrue(numeroPedido.matches("\\d{8}-\\d{4}"));
        // Verifica que o número do pedido segue o formato esperado: 8 dígitos (data) + hífen + 4 dígitos (sequência)

        assertEquals(dataHoje + "-0042", numeroPedido);
        // Verifica que o número do pedido corresponde à data concatenada com o número 42 formatado com zeros à esquerda
    }

    @Test
    void deveUsarSequencia1QuandoDatabaseSequenceForNull() {
        // Arrange
        // Simula retorno null para o findAndModify, ou seja, não há sequência no banco ainda
        when(mongoOperations.findAndModify(any(Query.class), any(Update.class),
                any(FindAndModifyOptions.class), eq(DatabaseSequence.class)))
                .thenReturn(null);

        String dataHoje = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        // Data atual formatada no padrão yyyyMMdd

        // Act
        String numeroPedido = geradorDeNumeros.gerarNumeroPedido();
        // Gera o número do pedido quando não há sequência anterior

        // Assert
        assertEquals(dataHoje + "-0001", numeroPedido);
        // Verifica que o número gerado usa sequência 1 formatada com zeros à esquerda
    }
}
