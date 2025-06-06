package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Imagem;
import br.com.pi.pi_ecommerce.repository.ImagemRepository;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ImagemServiceTest {

    @InjectMocks
    private ImagemService imagemService; // Injeta a instância real de ImagemService com os mocks

    @Mock
    private ImagemRepository imagemRepository; // Cria mock do repositório para simular comportamento

    private AutoCloseable closeable; // Para controlar o ciclo de vida dos mocks

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this); // Inicializa os mocks antes de cada teste
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close(); // Fecha os mocks após cada teste para liberar recursos
    }

    // Test salvarImagens com sucesso
    @Test
    void testSalvarImagens_sucesso() throws Exception {
        String idProduto = "prod1"; // ID fictício de produto para o teste

        // Cria dois arquivos mock MultipartFile simulando upload de imagens
        MockMultipartFile file1 = new MockMultipartFile("file1", "img1.jpg", "image/jpeg", "data".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("file2", "img2.jpg", "image/jpeg", "data".getBytes());

        // Quando salvar qualquer imagem no repositório, retorna o próprio objeto salvo (mock)
        when(imagemRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        // Chama o método salvarImagens do serviço com os arquivos e nome do principal
        ResponseEntity<String> response = imagemService.salvarImagens(idProduto, new MultipartFile[]{file1, file2}, "img1.jpg");

        // Verifica se o status da resposta é 201 Created
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Verifica se a mensagem da resposta é "Imagens salvas"
        assertEquals("Imagens salvas", response.getBody());

        // Verifica se o método save do repositório foi chamado duas vezes (uma por imagem)
        verify(imagemRepository, times(2)).save(any());
    }

    // Test salvarImagens quando ocorre exceção
    @Test
    void testSalvarImagens_erro() throws Exception {
        String idProduto = "prod1"; // ID fictício para o teste

        // Cria um arquivo mock MultipartFile simulando upload
        MockMultipartFile file = new MockMultipartFile("file", "img1.jpg", "image/jpeg", "data".getBytes());

        /*
         * Explicação do spy:
         * Um spy é um "espião" que envolve um objeto real.
         * Permite modificar comportamento de métodos específicos,
         * enquanto mantém comportamento real dos demais métodos.
         */

        ImagemService spyService = Mockito.spy(imagemService); // Cria spy do serviço para simular exceção em método específico

        // Simula exceção quando chamar salvarImagemNoSistema no spy
        doThrow(new Exception("Erro no sistema")).when(spyService)
                .salvarImagemNoSistema(anyString(), any(MultipartFile.class), anyString());

        // Chama salvarImagens no spy que agora lançará exceção no método interno
        ResponseEntity<String> response = spyService.salvarImagens(idProduto, new MultipartFile[]{file}, "img1.jpg");

        // Verifica se a resposta tem status 500 Internal Server Error
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verifica se a mensagem da resposta contém "Erro ao salvar imagens"
        assertTrue(response.getBody().contains("Erro ao salvar imagens"));
    }

    // Testa método excluirImagem com sucesso e imagem existe e não é principal
    @Test
    void testExcluirImagem_sucesso() throws IOException {
        String idImagem = "img1"; // ID fictício da imagem
        Imagem imagem = new Imagem(); // Cria instância de imagem para teste
        imagem.setId(idImagem); // Define ID
        imagem.setPrincipal(false); // Define que não é imagem principal
        imagem.setCaminhoArquivo("caminho/teste.jpg"); // Define caminho do arquivo

        // Quando buscar imagem pelo ID, retorna a imagem criada (mock)
        when(imagemRepository.findById(idImagem)).thenReturn(Optional.of(imagem));

        // Mock do método deleteById para não fazer nada (simula exclusão)
        doNothing().when(imagemRepository).deleteById(idImagem);

        // Cria objeto Path para o caminho do arquivo da imagem
        Path path = Paths.get(imagem.getCaminhoArquivo());

        // Usa MockedStatic para simular comportamento estático do Files.deleteIfExists
        try (MockedStatic<Files> filesMockedStatic = mockStatic(Files.class)) {
            // Quando Files.deleteIfExists for chamado com path, retorna true (arquivo foi excluído)
            filesMockedStatic.when(() -> Files.deleteIfExists(path)).thenReturn(true);

            // Chama o método excluirImagem do serviço
            ResponseEntity<String> response = imagemService.excluirImagem(idImagem);

            // Verifica se status da resposta é 200 OK
            assertEquals(HttpStatus.OK, response.getStatusCode());

            // Verifica se a mensagem da resposta está correta
            assertEquals("Imagem removida com sucesso!", response.getBody());

            // Verifica se o método deleteById foi chamado com o id correto
            verify(imagemRepository).deleteById(idImagem);
        }
    }

    // Testa excluirImagem quando imagem não existe
    @Test
    void testExcluirImagem_imagemNaoEncontrada() {
        // Quando buscar imagem por ID inválido, retorna Optional vazio
        when(imagemRepository.findById("idInvalido")).thenReturn(Optional.empty());

        // Chama excluirImagem com ID inválido
        ResponseEntity<String> response = imagemService.excluirImagem("idInvalido");

        // Verifica se status da resposta é 404 Not Found
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        // Verifica se a mensagem da resposta está correta
        assertEquals("Erro: Imagem não encontrada!", response.getBody());
    }

    // Testa excluirImagem quando imagem é principal e seleciona outra imagem aleatória como principal
    @Test
    void testExcluirImagem_imagemPrincipalSelecionaOutra() throws IOException {
        String idImagem = "img1"; // ID da imagem principal
        String idProduto = "prod1"; // ID do produto

        Imagem imagemPrincipal = new Imagem(); // Instancia imagem principal
        imagemPrincipal.setId(idImagem); // Define ID
        imagemPrincipal.setPrincipal(true); // Marca como principal
        imagemPrincipal.setIdProduto(idProduto); // Define o produto relacionado
        imagemPrincipal.setCaminhoArquivo("caminho/img1.jpg"); // Caminho do arquivo

        Imagem outraImagem = new Imagem(); // Instancia outra imagem para selecionar como principal
        outraImagem.setId("img2"); // ID da outra imagem
        outraImagem.setPrincipal(false); // Inicialmente não principal
        outraImagem.setIdProduto(idProduto); // Relacionada ao mesmo produto

        // Quando buscar imagem pelo ID principal, retorna a imagem principal
        when(imagemRepository.findById(idImagem)).thenReturn(Optional.of(imagemPrincipal));

        // Quando buscar imagens do produto, retorna lista com a outra imagem
        when(imagemRepository.findByIdProduto(idProduto)).thenReturn(List.of(outraImagem));

        // Mock do deleteById para não fazer nada (simula exclusão)
        doNothing().when(imagemRepository).deleteById(idImagem);

        // Quando salvar imagem no repositório, retorna o próprio objeto salvo
        when(imagemRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        Path path = Paths.get(imagemPrincipal.getCaminhoArquivo()); // Caminho da imagem principal

        // Mocka o Files.deleteIfExists para simular exclusão do arquivo
        try (MockedStatic<Files> filesMockedStatic = mockStatic(Files.class)) {
            filesMockedStatic.when(() -> Files.deleteIfExists(path)).thenReturn(true);

            // Chama o método excluirImagem para excluir imagem principal
            ResponseEntity<String> response = imagemService.excluirImagem(idImagem);

            // Verifica se status da resposta é 200 OK
            assertEquals(HttpStatus.OK, response.getStatusCode());

            // Verifica mensagem correta
            assertEquals("Imagem removida com sucesso!", response.getBody());

            // Verifica se a outra imagem foi salva como principal
            verify(imagemRepository).save(outraImagem);

            // Verifica se o deleteById foi chamado para excluir a imagem principal
            verify(imagemRepository).deleteById(idImagem);
        }
    }

    // Testa selecionarPrincipal com imagem existente
    @Test
    void testSelecionarPrincipal_sucesso() {
        String idImagem = "img1"; // ID da imagem a ser selecionada como principal
        String idProduto = "prod1"; // ID do produto

        Imagem imagem = new Imagem(); // Cria objeto imagem
        imagem.setId(idImagem); // Define ID
        imagem.setIdProduto(idProduto); // Define produto relacionado
        imagem.setPrincipal(false); // Inicialmente não é principal

        Imagem imagemDesmarcada = new Imagem(); // Outra imagem que atualmente é principal
        imagemDesmarcada.setPrincipal(true); // Marcada como principal

        // Quando buscar imagem pelo ID, retorna a imagem mockada
        when(imagemRepository.findById(idImagem)).thenReturn(Optional.of(imagem));

        // Quando buscar imagem principal atual do produto, retorna imagemDesmarcada
        when(imagemRepository.findByIdProdutoAndPrincipalTrue(idProduto)).thenReturn(Optional.of(imagemDesmarcada));

        // Quando salvar imagem, retorna o próprio objeto salvo (mock)
        when(imagemRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        // Chama método selecionarPrincipal para definir imagem como principal
        Imagem resultado = imagemService.selecionarPrincipal(idImagem, idProduto);

        // Verifica se a imagem retornada está marcada como principal
        assertTrue(resultado.isPrincipal());

        // Verifica se a imagem anteriormente principal foi salva (desmarcada)
        verify(imagemRepository).save(imagemDesmarcada);

        // Verifica se a nova imagem foi salva como principal
        verify(imagemRepository).save(imagem);
    }

    // Testa selecionarPrincipal quando imagem não existe
    @Test
    void testSelecionarPrincipal_imagemNaoEncontrada() {
        // Quando buscar imagem por ID inválido, retorna Optional vazio
        when(imagemRepository.findById("idInvalido")).thenReturn(Optional.empty());

        // Espera exceção ResponseStatusException com status 404 ao chamar selecionarPrincipal com ID inválido
        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> {
            imagemService.selecionarPrincipal("idInvalido", "qualquer");
        });

        // Verifica se o status da exceção é 404 Not Found
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());

        // Verifica se a mensagem da exceção contém "Imagem não encontrada"
        assertTrue(ex.getReason().contains("Imagem não encontrada"));
    }

    // Testa listaImagens com imagens existentes
    @Test
    void testListaImagens_comImagens() {
        String idProduto = "prod1"; // ID do produto para teste

        Imagem img1 = new Imagem(); // Cria primeira imagem
        Imagem img2 = new Imagem(); // Cria segunda imagem

        // Quando buscar imagens do produto, retorna lista com img1 e img2
        when(imagemRepository.findByIdProduto(idProduto)).thenReturn(List.of(img1, img2));

        // Chama método listaImagens do serviço
        List<Imagem> imagens = imagemService.listaImagens(idProduto);

        // Verifica se o tamanho da lista retornada é 2
        assertEquals(2, imagens.size());
    }

    // Testa listaImagens sem imagens
    @Test
    void testListaImagens_vazio() {
        String idProduto = "prod1"; // ID do produto para teste

        // Quando buscar imagens do produto, retorna lista vazia
        when(imagemRepository.findByIdProduto(idProduto)).thenReturn(List.of());

        // Chama listaImagens
        List<Imagem> imagens = imagemService.listaImagens(idProduto);

        // Verifica se a lista retornada está vazia
        assertTrue(imagens.isEmpty());
    }

}
