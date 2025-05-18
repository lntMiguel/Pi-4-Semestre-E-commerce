package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Pedido;
import br.com.pi.pi_ecommerce.models.statusPedido.StatusPedido;
import br.com.pi.pi_ecommerce.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public List<Pedido> retornaTodosCliente(@PathVariable String id){
        return pedidoService.retornaTodosCliente(id);
    }

    @GetMapping("/getPedido")
    public List<Pedido> retornaTodosAdm(){
        return pedidoService.retornaTodosAdm();
    }

    @PutMapping("{id}")
    public ResponseEntity<Map<String, String>> alterarStatus(@PathVariable String id, StatusPedido statusPedido){
        return pedidoService.alterarStatus(id, statusPedido);
    }


}
