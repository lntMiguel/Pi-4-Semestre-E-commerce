package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Permite CORS apenas para essa origem
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> listarTodos(@RequestParam(required = false) String nome) {
        return userService.listarTodos(nome); // Passa o nome como filtro, se fornecido
    }

    //ResponseEntity<?> representa toda a resposta HTTP
    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody User user) {
        try {
            User novoUser = userService.salvar(user);
            return ResponseEntity.ok(novoUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/dados")
    public ResponseEntity<User> atualizarDados(@PathVariable Long id,
                                                  @RequestParam String nome,
                                                  @RequestParam Long cpf,
                                                  @RequestParam String senha) {
        User usuarioAtualizado = userService.atualizarDadosUsuario(id, nome, cpf, senha);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    // Endpoint para alterar o status do usuário
    @PutMapping("/{id}/status")
    public ResponseEntity<User> alterarStatus(@PathVariable Long id) {
        User usuarioComNovoStatus = userService.alterarStatusUsuario(id);
        return ResponseEntity.ok(usuarioComNovoStatus);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("password");
        return userService.login(email, senha);
    }
}
