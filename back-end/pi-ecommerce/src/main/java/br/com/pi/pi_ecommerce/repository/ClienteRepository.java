package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
    boolean existsByCpf(Long cpf);
    boolean existsByEmail(String email);
}
