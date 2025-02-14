package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> listarTodos() {

        return userService.listarTodos();
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

}
