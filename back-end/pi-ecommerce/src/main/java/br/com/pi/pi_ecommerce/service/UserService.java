package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.repository.UserRepository;
import br.com.pi.pi_ecommerce.utils.Validator;
import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    public ResponseEntity<Map<String, String>> login(String email, String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Email Incorreto!"));
        }

        User user = userOptional.get();
        if (!BCrypt.checkpw(password, user.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Senha Incorreta"));
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login feito com sucesso");
        response.put("grupo", user.getGrupo());

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }


    public List<UserDTO> listarTodos(String nome) {
        List<User> usuarios;

        if (nome == null || nome.isEmpty()) {
            usuarios = userRepository.findAll(); // Retorna todos os usuários
        } else {
            usuarios = userRepository.findAll().stream()
                    .filter(user -> user.getNome().toLowerCase().contains(nome.toLowerCase()))
                    .collect(Collectors.toList()); // Filtra os usuários pelo nome
        }

        // Converte os usuários para DTO (caso seja necessário)
        return usuarios.stream()
                .map(user -> new UserDTO(user.getNome(), user.getEmail(), user.getStatus(), user.getGrupo(), user.getId())) // Assumindo que você tem um construtor no UserDTO que converte o User
                .collect(Collectors.toList());
    }


    public User salvar(User user) {

        if (validator.isCpfExistente(user.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }

        if (validator.isEmailExistente(user.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }
        
        String senhaHash = BCrypt.hashpw(user.getSenha(), BCrypt.gensalt());
        user.setSenha(senhaHash);

        return userRepository.save(user);
    }

    public User atualizarDadosUsuario(Long userId, String nome, Long cpf, String senha) {

        Optional<User> usuarioOptional = userRepository.findById(userId);

        if (usuarioOptional.isPresent()) {
            User user = usuarioOptional.get();

            user.setNome(nome);
            user.setCpf(cpf);
            user.setSenha(senha);

            return userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
    }

    public User alterarStatusUsuario(Long userId) {

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            user.setStatus(!Boolean.TRUE.equals(user.getStatus())); // Muda para inativo (false)

            return userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
    }

}
