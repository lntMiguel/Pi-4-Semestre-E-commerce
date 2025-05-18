package br.com.pi.pi_ecommerce.service;


import br.com.pi.pi_ecommerce.models.Pedido;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.models.statusPedido.StatusPedido;
import br.com.pi.pi_ecommerce.repository.PedidoRepository;
import br.com.pi.pi_ecommerce.utils.ConsultaEstoque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static br.com.pi.pi_ecommerce.utils.GeradorDeNumeros.gerarNumeroPedido;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ProductService productService;

    public Pedido criarPedido(Pedido pedido) {

        if(!ConsultaEstoque.validarEstoque(pedido.getProdutos())){
            return null;
        }

        diminuirQuantidade(pedido.getProdutos());

        String numeroPedido = gerarNumeroPedido();
        pedido.setNumero(numeroPedido); // Definir o número do pedido gerado
        return pedidoRepository.save(pedido); // Salvar o pedido no banco de dados
    }

    public List<Pedido> retornaTodosCliente(String idCliente){

        List<Pedido> optional = pedidoRepository.findByIdCliente(idCliente);

        return optional.stream().toList();


    }

    public List<Pedido> retornaTodosAdm(){

        List<Pedido> optional = pedidoRepository.findAll();

        return optional.stream().toList();


    }


    private void diminuirQuantidade(List<ProdutoPedido> produtos){
        for(ProdutoPedido p : produtos){
            productService.diminuiQuantidade(p.getIdProduto(), p.getQuantidade());
        }
    }

    public ResponseEntity<Map<String, String>> alterarStatus(String id, StatusPedido status) {
        Optional<Pedido> optional = pedidoRepository.findById(id);

        if(optional.isPresent()){
            Pedido pedido = optional.get();

            pedido.setStatus(status);
            pedidoRepository.save(pedido);
            return  ResponseEntity.status(HttpStatus.OK)
                    .body(Collections.singletonMap("message", "Status Atualizado!"));
        }

        else return  ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message", "Pedido não encontrado!"));
    }
}
