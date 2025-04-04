package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.EnderecoCliente;
import br.com.pi.pi_ecommerce.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public EnderecoCliente salvarEndereco(EnderecoCliente enderecoCliente){
        if(enderecoCliente.isPadrao()){
            desmarcarPrincipal(enderecoCliente.getIdCliente());
        }
        return enderecoRepository.save(enderecoCliente);
    }

    public ResponseEntity<String> excluirEndereco(EnderecoCliente enderecoCliente){
        try{
            enderecoRepository.delete(enderecoCliente);
            return ResponseEntity.status(HttpStatus.OK).body("Endereço Excluido");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao excluir endereco: " + e.getMessage());
        }
    }

    private  void desmarcarPrincipal(String idCliente){
        Optional<EnderecoCliente>  enderecoPrincipal = enderecoRepository.findByIdClienteAndPadraoTrue(idCliente);
        enderecoPrincipal.ifPresent( endereco -> {
            endereco.setPadrao(false);
            enderecoRepository.save(endereco);
        });
    }

    public EnderecoCliente selecionarPrincipal(String idEndereco, String idCliente){
        Optional<EnderecoCliente> enderecoOptional = enderecoRepository.findById(idEndereco);
        if(enderecoOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro: Endereco não encontrado!");

        }

        desmarcarPrincipal(idCliente);
        EnderecoCliente enderecoCliente = enderecoOptional.get();
        enderecoCliente.setPadrao(true);
        return enderecoRepository.save(enderecoCliente);
    }


}
