package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Pedido;
import br.com.pi.pi_ecommerce.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/criar")
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        Pedido pedidoCriado = pedidoService.criarPedido(pedido);
        return new ResponseEntity<>(pedidoCriado, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public List<Pedido> retornaTodos(@PathVariable String id){
        return pedidoService.retornaTodos(id);
    }
}
