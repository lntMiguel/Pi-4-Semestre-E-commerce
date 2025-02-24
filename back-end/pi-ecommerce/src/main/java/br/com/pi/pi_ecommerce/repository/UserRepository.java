package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.User;
import java.util.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> { 
    
    Optional<User> findByEmail(String email);
    boolean existsByCpf(Long cpf);
    boolean existsByEmail(String email);
    boolean findByid(Long id);
}

