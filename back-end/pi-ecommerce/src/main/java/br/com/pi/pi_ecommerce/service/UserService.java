package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.dao.UserRepository;
import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.validator.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}
