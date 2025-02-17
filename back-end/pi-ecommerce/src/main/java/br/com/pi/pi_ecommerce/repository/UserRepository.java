package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    boolean existsByCpf(Long cpf);
    boolean existsByEmail(String email);
    boolean findByid(Long id);
}

