package br.com.pi.pi_ecommerce.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
  
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.service.UserService;

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
    public ResponseEntity<User> atualizarDados(@PathVariable String id,
                                               @RequestParam String nome,
                                               @RequestParam Long cpf,
                                               @RequestParam(required = false) String senha,
                                               @RequestParam(required = false) String grupo)
                                                {  // A senha é agora opcional
        User usuarioAtualizado = userService.atualizarDadosUsuario(id, nome, cpf, senha, grupo);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    // Endpoint para alterar o status do usuário
    @PutMapping("/{id}/status")
    public ResponseEntity<User> alterarStatus(@PathVariable String id) {
        User usuarioComNovoStatus = userService.alterarStatusUsuario(id);
        return ResponseEntity.ok(usuarioComNovoStatus);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("password");
        return userService.login(email, senha);
}

    @GetMapping("/{id}/status")  // Agora o parâmetro de 'id' está correto
    public ResponseEntity<Map<String, Boolean>> retornaStatusUsuario(@PathVariable String id){
        boolean status = userService.retornaStatusUsuario(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("status", status);
        return ResponseEntity.ok(response);
    }

}
