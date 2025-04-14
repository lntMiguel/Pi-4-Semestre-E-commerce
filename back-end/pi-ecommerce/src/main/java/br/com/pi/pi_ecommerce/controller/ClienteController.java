package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Cliente;
import br.com.pi.pi_ecommerce.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
    public ResponseEntity<Map<String, String>> atualizarDados(@PathVariable String id,
                                                  @RequestParam String nome,
                                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataNasc,
                                                  @RequestParam String genero) {

        return clienteService.atualizarDadosCliente(id, nome, dataNasc, genero);
    }

    @PutMapping("/{id}/senha")
    public ResponseEntity<Map<String, String>> atualizarSenha(@PathVariable String id,
                                                              @RequestParam String senha
                                                              ) {

        return clienteService.atualizaSenha(id, senha);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("password");
        return clienteService.login(email, senha);
    }

    @GetMapping("{id}/buscar")
    public Cliente buscar(@PathVariable String id){
        return clienteService.retornaCliente(id);
    }
}
