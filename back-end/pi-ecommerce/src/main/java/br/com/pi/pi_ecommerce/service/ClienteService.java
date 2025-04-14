package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Cliente;
import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.utils.Encriptador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.*;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<Map<String, Object>> login(String email, String senha) {
        Optional<Cliente> clienteOptional = clienteRepository.findByEmail(email);

        if (clienteOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Email Incorreto!"));
        }

        Cliente cliente = clienteOptional.get();

        if (!Encriptador.validarSenha(senha, cliente.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Senha Incorreta"));
        }

        Map<String, Object> response = new HashMap<>();

        response.put("message", "Login feito com sucesso");

        Map<String, Object> dadosCliente = new HashMap<>();

        dadosCliente.put("id", cliente.getId());
        dadosCliente.put("nome", cliente.getNome());
        dadosCliente.put("email", cliente.getEmail());
        dadosCliente.put("dataNasc", cliente.getDataNasc());
        dadosCliente.put("cpf", cliente.getCpf());
        dadosCliente.put("genero", cliente.getGenero());

        response.put("dados", dadosCliente);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    public Cliente salvar(Cliente cliente) {
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        cliente.setSenha(Encriptador.encriptar(cliente.getSenha()));
        return clienteRepository.save(cliente);
    }

    public ResponseEntity<Map<String, String>> atualizarDadosCliente(String id, String nome, Date dataNasc, String genero) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();


            if(nome != null){
                cliente.setNome(nome);
            }

            if(genero != null){
                cliente.setGenero(genero);
            }

            if (dataNasc != null) {
                cliente.setDataNasc(dataNasc);
            }

            clienteRepository.save(cliente);
            return  ResponseEntity.status(HttpStatus.OK)
                    .body(Collections.singletonMap("message", "Dados Atualizados!"));
        } else {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Cliente não encontrado!"));
        }
    }

    public ResponseEntity<Map<String, String>> atualizaSenha(String idCliente, String senha){
        Optional<Cliente> clienteOptional = clienteRepository.findById(idCliente);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();

            if (senha != null && !senha.isEmpty()) {
                cliente.setSenha(Encriptador.encriptar(senha));
            }

            clienteRepository.save(cliente);

            return  ResponseEntity.status(HttpStatus.OK)
                        .body(Collections.singletonMap("message", "Senha Atualizada!"));



        }
        else return  ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message", "Cliente nao encontrado!"));
    }
    public Cliente retornaCliente(String id){
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if(clienteOptional.isPresent()){
            return clienteOptional.get();
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }
}
