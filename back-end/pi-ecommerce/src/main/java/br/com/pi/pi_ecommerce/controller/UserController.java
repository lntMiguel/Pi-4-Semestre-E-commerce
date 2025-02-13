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


}
