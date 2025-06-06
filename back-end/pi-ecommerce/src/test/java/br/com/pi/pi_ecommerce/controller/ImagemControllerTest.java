package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Imagem;
import br.com.pi.pi_ecommerce.service.ImagemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class) // Habilita a extensão do Mockito para usar anotações como @Mock e @InjectMocks nos testes
class ImagemControllerTest {

    private MockMvc mockMvc; // Objeto usado para simular requisições HTTP ao controller

    @Mock
    private ImagemService imagemService; // Cria um mock do serviço de imagem

    @InjectMocks
    private ImagemController imagemController; // Injeta o mock do serviço dentro do controller

    @BeforeEach
    void setUp() {
        // Inicializa o MockMvc com o controller configurado
        mockMvc = MockMvcBuilders.standaloneSetup(imagemController).build();
    }

    @Test
    void deveFazerUploadDeImagensComSucesso() throws Exception {
        String idProduto = "123"; // ID do produto usado no teste
        String nomeImagemPrincipal = "imagemPrincipal.jpg"; // Nome da imagem principal

        // Cria dois arquivos simulados para upload
        MockMultipartFile file1 = new MockMultipartFile("files", "file1.jpg", "image/jpeg", "conteudo1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "file2.jpg", "image/jpeg", "conteudo2".getBytes());

        // Simula o retorno do serviço ao salvar as imagens
        when(imagemService.salvarImagens(eq(idProduto), any(MultipartFile[].class), eq(nomeImagemPrincipal)))
                .thenReturn(ResponseEntity.ok("Imagens salvas com sucesso"));

        // Executa a requisição multipart de upload e valida a resposta
        mockMvc.perform(multipart("/imagens")
                        .file(file1)
                        .file(file2)
                        .param("idProduto", idProduto)
                        .param("nomeImagemPrincipal", nomeImagemPrincipal)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(content().string("Imagens salvas com sucesso"));
    }

    @Test
    void deveTratarErroAoFazerUploadDeImagens() throws Exception {
        String idProduto = "123"; // ID do produto

        // Cria um arquivo de imagem simulado
        MockMultipartFile file = new MockMultipartFile("files", "file.jpg", "image/jpeg", "conteudo".getBytes());

        // Simula uma exceção ao salvar a imagem
        when(imagemService.salvarImagens(eq(idProduto), any(MultipartFile[].class), isNull()))
                .thenThrow(new RuntimeException("Erro inesperado"));

        // Executa a requisição e espera erro 500
        mockMvc.perform(multipart("/imagens")
                        .file(file)
                        .param("idProduto", idProduto)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Erro ao salvar imagens: Erro inesperado"));
    }

    @Test
    void deveDeletarImagemComSucesso() throws Exception {
        String idImagem = "img123"; // ID da imagem a ser deletada

        // Simula retorno de sucesso ao excluir imagem
        when(imagemService.excluirImagem(idImagem))
                .thenReturn(ResponseEntity.ok("Imagem excluída"));

        // Executa o DELETE e valida o retorno
        mockMvc.perform(delete("/imagens/{idImagem}", idImagem))
                .andExpect(status().isOk())
                .andExpect(content().string("Imagem excluída"));
    }

    @Test
    void deveTratarErroAoDeletarImagem() throws Exception {
        String idImagem = "img123"; // ID da imagem a ser deletada

        // Simula erro ao tentar excluir imagem
        when(imagemService.excluirImagem(idImagem))
                .thenThrow(new RuntimeException("Falha ao excluir"));

        // Executa o DELETE e espera erro 500
        mockMvc.perform(delete("/imagens/{idImagem}", idImagem))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Erro ao deletar imagem: Falha ao excluir"));
    }

    @Test
    void deveRetornarListaDeImagens() throws Exception {
        String idProduto = "123"; // ID do produto

        // Cria imagens simuladas
        Imagem img1 = new Imagem();
        img1.setId("1");
        img1.setIdProduto(idProduto);
        img1.setCaminhoArquivo("caminho1.jpg");
        img1.setPrincipal(false);

        Imagem img2 = new Imagem();
        img2.setId("2");
        img2.setIdProduto(idProduto);
        img2.setCaminhoArquivo("caminho2.jpg");
        img2.setPrincipal(true);

        List<Imagem> lista = List.of(img1, img2); // Lista de imagens simulada

        // Simula retorno da lista pelo serviço
        when(imagemService.listaImagens(idProduto)).thenReturn(lista);

        // Executa GET e valida os campos das imagens retornadas
        mockMvc.perform(get("/imagens/{idProduto}", idProduto))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].idProduto").value(idProduto))
                .andExpect(jsonPath("$[0].caminhoArquivo").value("caminho1.jpg"))
                .andExpect(jsonPath("$[0].principal").value(false))
                .andExpect(jsonPath("$[1].id").value("2"))
                .andExpect(jsonPath("$[1].idProduto").value(idProduto))
                .andExpect(jsonPath("$[1].caminhoArquivo").value("caminho2.jpg"))
                .andExpect(jsonPath("$[1].principal").value(true));
    }

    @Test
    void deveAtualizarImagem() throws Exception {
        String idImagem = "img123"; // ID da imagem a ser marcada como principal
        String idProduto = "prod456"; // ID do produto da imagem

        // Cria uma imagem atualizada simulada
        Imagem imagemAtualizada = new Imagem();
        imagemAtualizada.setId(idImagem);
        imagemAtualizada.setIdProduto(idProduto);
        imagemAtualizada.setCaminhoArquivo("imagemPrincipal.jpg");
        imagemAtualizada.setPrincipal(true);

        // Simula retorno da imagem atualizada ao selecionar como principal
        when(imagemService.selecionarPrincipal(idImagem, idProduto)).thenReturn(imagemAtualizada);

        // Executa PUT e valida se os dados retornados são os esperados
        mockMvc.perform(put("/imagens")
                        .param("idImagem", idImagem)
                        .param("idProduto", idProduto))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(idImagem))
                .andExpect(jsonPath("$.idProduto").value(idProduto))
                .andExpect(jsonPath("$.caminhoArquivo").value("imagemPrincipal.jpg"))
                .andExpect(jsonPath("$.principal").value(true));
    }
}