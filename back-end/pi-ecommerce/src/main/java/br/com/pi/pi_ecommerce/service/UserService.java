package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.repository.UserRepository;
import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.validator.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    public List<UserDTO> listarTodos() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(user.getNome(), user.getEmail(), user.getStatus(), user.getGrupo()))
                .collect(Collectors.toList());
    }

    public User salvar(User user) {

        if (validator.isCpfExistente(user.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado!");
        }

        if (validator.isEmailExistente(user.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

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
