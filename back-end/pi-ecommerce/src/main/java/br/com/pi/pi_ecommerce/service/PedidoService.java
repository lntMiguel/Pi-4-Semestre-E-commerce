package br.com.pi.pi_ecommerce.service;


import br.com.pi.pi_ecommerce.models.Pedido;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.repository.PedidoRepository;
import br.com.pi.pi_ecommerce.utils.ConsultaEstoque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Pedido> retornaTodos(String idCliente){

        List<Pedido> optional = pedidoRepository.findByIdCliente(idCliente);

        return optional.stream().toList();


    }

    private void diminuirQuantidade(List<ProdutoPedido> produtos){
        for(ProdutoPedido p : produtos){
            productService.diminuiQuantidade(p.getIdProduto(), p.getQuantidade());
        }
    }

}
