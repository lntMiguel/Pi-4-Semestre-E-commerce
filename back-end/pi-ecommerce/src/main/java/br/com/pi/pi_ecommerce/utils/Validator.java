package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Validator {

    @Autowired
    private UserRepository userRepository;

    public boolean isCpfExistente(Long cpf) {
        return userRepository.existsByCpf(cpf);
    }

    public boolean isEmailExistente(String email) {
        return userRepository.existsByEmail(email);
    }


}
