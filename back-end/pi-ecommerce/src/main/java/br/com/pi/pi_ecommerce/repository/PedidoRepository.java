package br.com.pi.pi_ecommerce.repository;

import br.com.pi.pi_ecommerce.models.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByIdCliente(String idCliente);
}
