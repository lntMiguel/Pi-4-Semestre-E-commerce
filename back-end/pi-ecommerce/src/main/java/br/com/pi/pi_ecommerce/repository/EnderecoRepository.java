package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.EnderecoCliente;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnderecoRepository extends MongoRepository<EnderecoCliente, String> {
}
