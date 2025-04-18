package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Imagem;
import br.com.pi.pi_ecommerce.service.ImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/imagens")
public class ImagemController {

    @Autowired 
    private ImagemService imagemService;
 
    @PostMapping
    public ResponseEntity<String> uploadImagens(@RequestParam String idProduto,
                                                @RequestParam MultipartFile[] files,
                                                @RequestParam(required = false) String nomeImagemPrincipal) throws Exception {
        try{
            return imagemService.salvarImagens(idProduto, files, nomeImagemPrincipal);
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Erro ao salvar imagens: " + e.getMessage());
        }
    }

    @DeleteMapping("{idImagem}")
    public ResponseEntity<String> deletarImagem(@PathVariable String idImagem){

        try{
            return imagemService.excluirImagem(idImagem);
        }catch(Exception e){
            return ResponseEntity.internalServerError().body("Erro ao deletar imagem: " + e.getMessage());
        }

    }

    @GetMapping("/{idProduto}")
    public List<Imagem> listaImagem(@PathVariable String idProduto){
        return imagemService.listaImagens(idProduto);
    }

    @PutMapping
    public Imagem atualizaImagem(@RequestParam String idImagem, @RequestParam String idProduto){
        return imagemService.selecionarPrincipal(idImagem, idProduto);

    }


}
