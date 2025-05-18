package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByIdCliente(String idCliente);
    Optional<Pedido> findById(String id);
}
