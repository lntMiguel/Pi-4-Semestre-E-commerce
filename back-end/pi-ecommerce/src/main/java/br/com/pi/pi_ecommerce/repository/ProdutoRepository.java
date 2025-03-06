package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Produto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProdutoRepository extends MongoRepository<Produto,String> {
}
