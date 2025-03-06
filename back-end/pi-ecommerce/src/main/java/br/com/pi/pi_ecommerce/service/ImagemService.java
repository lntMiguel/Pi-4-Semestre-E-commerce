package br.com.pi.pi_ecommerce.service;


import br.com.pi.pi_ecommerce.models.Imagem;
import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.repository.ImagemRepository;
import br.com.pi.pi_ecommerce.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.Objects;
import java.util.UUID;

@Service
public class ImagemService {

    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    private static final String UPLOAD_DIR = "imagens/";
    //"../../../../../imagens"

    public ResponseEntity<String> salvarImagens(String idProduto, MultipartFile[] files, String nomeImagemPrincipal) {

        try {
            for (MultipartFile file : files) {
                salvarImagemNoSistema(idProduto, file, nomeImagemPrincipal);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body("Imagens salvas");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao salvar imagens");
        }
    }

    private void salvarImagemNoSistema(String idProduto, MultipartFile file, String nomeImagemPrincipal) throws Exception {

        try {
            // Gera um novo nome único

            String novoNome = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path caminhoArquivo = Paths.get(UPLOAD_DIR, novoNome);

            // Copia o arquivo para o diretório
            Files.copy(file.getInputStream(), caminhoArquivo, StandardCopyOption.REPLACE_EXISTING);

            // Define se esta imagem será a principal
            boolean isPrincipal = Objects.equals(file.getOriginalFilename(), nomeImagemPrincipal);

            // Salva no banco
            Imagem imagem = new Imagem(idProduto, caminhoArquivo.toString(), isPrincipal);
            imagemRepository.save(imagem);
        } catch (Exception e) {
            throw new Exception("Erro ao salvar imagem" + e.getMessage(), e);
        }
    }


}
