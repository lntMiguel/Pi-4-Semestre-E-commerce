package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Validator {

    @Autowired
    private static UserRepository userRepository;

    @Autowired
    private static ClienteRepository clienteRepository;

    public static boolean isCpfExistente(Long cpf) {
        return userRepository.existsByCpf(cpf);
    }

    public static boolean isEmailExistente(String email) {
        return userRepository.existsByEmail(email);
    }

    public static boolean exiteEmailCliente(String email){return clienteRepository.existsByEmail(email);}
    public static boolean exiteCpfCliente(Long cpf){return clienteRepository.existsByCpf(cpf);}

}
