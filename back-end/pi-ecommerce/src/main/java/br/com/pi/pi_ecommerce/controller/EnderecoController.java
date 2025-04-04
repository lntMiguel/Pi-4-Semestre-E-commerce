package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.EnderecoCliente;
import br.com.pi.pi_ecommerce.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody EnderecoCliente enderecoCliente){
        try{
            EnderecoCliente novoEnd = enderecoService.salvarEndereco(enderecoCliente);
            return ResponseEntity.ok(novoEnd);
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping
    public ResponseEntity<String> excluirEnd(@RequestBody EnderecoCliente enderecoCliente){
        try{
            return enderecoService.excluirEndereco(enderecoCliente);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao deletar endereco: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<String> selecionarPrincipal(@RequestParam String idEndereco, @RequestParam String idCliente){
        try{
            enderecoService.selecionarPrincipal(idEndereco,idCliente);
            return ResponseEntity.status(HttpStatus.OK).body("Endereço Principal Alterado");
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Erro ao mudar endereco principal: " + e.getMessage());
        }


    }

}
