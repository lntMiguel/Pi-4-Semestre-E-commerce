package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.repository.ClienteRepository;
import br.com.pi.pi_ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Validator {

    private final UserRepository userRepository; // Removido 'static', agora é um campo de instância
    private final ClienteRepository clienteRepository; // Removido 'static'

    // Injeção de dependência via construtor (recomendado pelo Spring)
    public Validator(UserRepository userRepository, ClienteRepository clienteRepository) {
        this.userRepository = userRepository;
        this.clienteRepository = clienteRepository;
    }

    // Métodos agora são de instância, não estáticos
    public boolean isCpfExistente(Long cpf) {
        // userRepository agora é uma instância injetada e não deve ser null
        if (cpf == null) return false; // Adicionar verificação para CPF nulo se necessário
        return userRepository.existsByCpf(cpf);
    }

    public boolean isEmailExistente(String email) {
        if (email == null || email.isEmpty()) return false; // Adicionar verificação
        return userRepository.existsByEmail(email);
    }

    public boolean exiteEmailCliente(String email) {
        if (email == null || email.isEmpty()) return false;
        return clienteRepository.existsByEmail(email);
    }

    public boolean exiteCpfCliente(Long cpf) { // Mantido Long, ajuste se CPF de cliente for String
        if (cpf == null) return false;
        return clienteRepository.existsByCpf(cpf);
    }
}