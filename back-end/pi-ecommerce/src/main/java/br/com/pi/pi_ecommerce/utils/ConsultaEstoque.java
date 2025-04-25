package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class ConsultaEstoque {

    private static ProductRepository productRepository;

    @Autowired
    private ConsultaEstoque(ProductRepository productRepository) {
        ConsultaEstoque.productRepository = productRepository;
    }

    public static boolean validarEstoque(List<ProdutoPedido> produtos) {
        for (ProdutoPedido p : produtos) {
            Produto produtoEstoque = productRepository.findById(p.getIdProduto())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));


            if (produtoEstoque.getQtdEstoque() < p.getQuantidade()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade desejada do "+ produtoEstoque.getNome() + "não está disponivel em estoque");
            }
        }
        return true;
    }

}
