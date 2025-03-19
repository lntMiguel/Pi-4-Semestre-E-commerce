package br.com.pi.pi_ecommerce.service;


import br.com.pi.pi_ecommerce.models.Imagem;
import br.com.pi.pi_ecommerce.repository.ImagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImagemService {

    @Autowired
    private ImagemRepository imagemRepository;

    private static final String UPLOAD_DIR = "../../front-end/public/imagens/";

    public ResponseEntity<String> salvarImagens(String idProduto, MultipartFile[] files, String nomeImagemPrincipal) {
        try {
            for (MultipartFile file : files) {
                salvarImagemNoSistema(idProduto, file, nomeImagemPrincipal);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("Imagens salvas");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao salvar imagens: " + e.getMessage());
        }
    }

    private void salvarImagemNoSistema(String idProduto, MultipartFile file, String nomeImagemPrincipal) throws Exception {
        try {
            // Verifica se a imagem atual deve ser a principal
            boolean isPrincipal = nomeImagemPrincipal != null && Objects.equals(file.getOriginalFilename(), nomeImagemPrincipal);

            // Se for principal e já houver outra imagem principal, desmarcar a atual
            if (isPrincipal && verificaPrincipal(idProduto)) {
                desmarcarImagemComoPrincipal(idProduto);
            }
            String nomeArquivo = file.getOriginalFilename();
            Path caminhoArquivo = Paths.get(UPLOAD_DIR, nomeArquivo);

            // Copia o arquivo para o diretório
            Files.copy(file.getInputStream(), caminhoArquivo, StandardCopyOption.REPLACE_EXISTING);

            // Salva a imagem no banco de dados
            Imagem imagem = new Imagem(idProduto, caminhoArquivo.toString(), isPrincipal);
            imagemRepository.save(imagem);
        } catch (Exception e) {
            throw new Exception("Erro ao salvar imagem: " + e.getMessage(), e);
        }
    }

    private boolean verificaPrincipal(String idProduto) {
        // Verifica se já existe alguma imagem principal para o produto
        return imagemRepository.findByIdProduto(idProduto).stream().anyMatch(Imagem::isPrincipal);
    }

    private void desmarcarImagemComoPrincipal(String idProduto) {
        // Busca a imagem marcada como principal para o produto
        Optional<Imagem> imagemPrincipal = imagemRepository.findByIdProdutoAndPrincipalTrue(idProduto);

        // Se existir uma imagem principal, desmarque-a
        imagemPrincipal.ifPresent(imagem -> {
            imagem.setPrincipal(false);
            imagemRepository.save(imagem);
        });
    }


    public ResponseEntity<String> excluirImagem(String id){

        Optional<Imagem> imagemOptional = imagemRepository.findById(id);

        if (imagemOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Imagem não encontrada!");
        }

        Imagem imagem = imagemOptional.get();

        if(imagem.isPrincipal()){
            selecionarImagemAleatoriaComoPrincipal(imagem);
        }

        try {
            excluirImagemDoBanco(id);
            excluirArquivo(imagem.getCaminhoArquivo());
            return ResponseEntity.ok("Imagem removida com sucesso!");
            // Remove o arquivo do diretório

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir a imagem: " + e.getMessage());
        }

    }

    public Imagem selecionarPrincipal(String idImagem, String idProduto){

        Optional<Imagem> imagemOptional = imagemRepository.findById(idImagem);

        if (imagemOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro: Imagem não encontrada!");
        }

        desmarcarImagemComoPrincipal(idProduto);
        Imagem imagem = imagemOptional.get();
        imagem.setPrincipal(true);
        return imagemRepository.save(imagem);

    }

    private void selecionarImagemAleatoriaComoPrincipal(Imagem imagem){
        Optional<Imagem> imagemOptional = imagemRepository.findByIdProduto(imagem.getIdProduto())
                .stream()
                .findFirst();

        if(imagemOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto sem Imagem");
        }

        Imagem imagemAleatoria = imagemOptional.get();

        imagem.setPrincipal(true);

        imagemRepository.save(imagemAleatoria);

    }

    private void excluirImagemDoBanco(String id) {
        imagemRepository.deleteById(id);
    }

    private void excluirArquivo(String caminhoArquivo) throws IOException {
        Path caminho = Paths.get(caminhoArquivo);
        if (!Files.deleteIfExists(caminho)) {
            throw new IOException("Erro ao excluir a imagem, caminho não encontrado");
        }
    }

    public List<Imagem> listaImagens(String idProduto){
        List<Imagem> optionalImagens =  imagemRepository.findByIdProduto(idProduto);

        if(optionalImagens.isEmpty()){
            return Collections.emptyList();
        }

        return optionalImagens.stream().toList();


    }


}
