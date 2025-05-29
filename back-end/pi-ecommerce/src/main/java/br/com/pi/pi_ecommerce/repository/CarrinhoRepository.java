package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Carrinho;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarrinhoRepository extends MongoRepository<Carrinho, String> {
    Optional<Carrinho> findByIdCliente(String idCliente);
}
