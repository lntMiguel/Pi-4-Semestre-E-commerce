package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.EnderecoCliente;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EnderecoRepository extends MongoRepository<EnderecoCliente, String> {
    Optional<EnderecoCliente> findByIdClienteAndPadraoTrue(String idCliente);
    Optional<EnderecoCliente> findByIdClienteAndFaturamentoTrue(String idCliente);
    List<EnderecoCliente> findByIdCliente(String idCliente);

}
