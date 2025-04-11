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

    public ResponseEntity<Map<String, String>> login(String email, String senha) {
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

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login feito com sucesso");

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    public Cliente salvar(Cliente cliente) {
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        cliente.setSenha(Encriptador.encriptar(cliente.getSenha()));
        return clienteRepository.save(cliente);
    }

    public Cliente atualizarDadosCliente(String id, String nome, String dataNascStr, String senha) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();

            cliente.setNome(nome);

            if (dataNascStr != null && !dataNascStr.isEmpty()) {
                try {
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    Date dataNasc = formatter.parse(dataNascStr);
                    cliente.setDataNasc(dataNasc);
                } catch (ParseException e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data inválida");
                }
            }

            if (senha != null && !senha.isEmpty()) {
                cliente.setSenha(Encriptador.encriptar(senha));
            }

            return clienteRepository.save(cliente);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }
    }


    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }
}
