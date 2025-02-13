package br.com.pi.pi_ecommerce.dao;

import br.com.pi.pi_ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByCpf(Long cpf);
    boolean existsByEmail(String email);

}
