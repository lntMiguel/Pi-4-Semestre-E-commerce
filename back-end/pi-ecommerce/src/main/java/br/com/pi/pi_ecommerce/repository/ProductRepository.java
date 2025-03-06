package br.com.pi.pi_ecommerce.repository;

import java.util.Optional;
import br.com.pi.pi_ecommerce.models.Produto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Produto,String> {
    boolean findByid(Long id);
}
 