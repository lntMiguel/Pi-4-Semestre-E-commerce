package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Cliente;
import br.com.pi.pi_ecommerce.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Cliente cliente) {
        try {
            Cliente novoCliente = clienteService.salvar(cliente);
            return ResponseEntity.ok(novoCliente);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/dados")
    public ResponseEntity<Cliente> atualizarDados(@PathVariable String id,
                                                  @RequestBody Map<String, String> dadosAtualizados) {
        String nome = dadosAtualizados.get("nome");
        String dataNasc = dadosAtualizados.get("dataNasc");
        String senha = dadosAtualizados.get("senha");

        Cliente atualizado = clienteService.atualizarDadosCliente(id, nome, dataNasc, senha);
        return ResponseEntity.ok(atualizado);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("password");
        return clienteService.login(email, senha);
    }
}
