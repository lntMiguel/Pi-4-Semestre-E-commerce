package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Imagem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
 
public interface ImagemRepository extends MongoRepository<Imagem, String> {
    List<Imagem> findByIdProduto(String idProduto);
}
