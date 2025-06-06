package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
    boolean existsByCpf(Long cpf);
    boolean existsByEmail(String email);

    Optional<Cliente> findByEmail(String email);
    Optional<Cliente> findById(String id);
}
