package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.models.ProdutoPedido;
import br.com.pi.pi_ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component // Torna esta classe um bean gerenciado pelo Spring
public class ConsultaEstoque {

    private final ProductRepository productRepository; // Campo de instância, final para injeção via construtor

    @Autowired // Injeção de dependência via construtor (recomendado)
    public ConsultaEstoque(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Valida o estoque e o status (ativo/inativo) para uma lista de produtos pedidos.
     * Lança ResponseStatusException em caso de falha na validação.
     * @param produtosDesejados Lista de ProdutoPedido a serem validados.
     */
    public void validarEstoqueEStatus(List<ProdutoPedido> produtosDesejados) {
        if (produtosDesejados == null || produtosDesejados.isEmpty()) {
            // Considerar se uma lista vazia é um erro ou apenas não requer validação.
            // Se for um pré-requisito que a lista não seja vazia, pode lançar uma exceção aqui.
            // Ex: throw new IllegalArgumentException("A lista de produtos para validação não pode ser vazia.");
            return; // Ou simplesmente retorna se uma lista vazia for aceitável
        }

        for (ProdutoPedido itemDesejado : produtosDesejados) {
            Produto produtoEmEstoque = productRepository.findById(itemDesejado.getIdProduto())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Produto com ID '" + itemDesejado.getIdProduto() + "' não encontrado no catálogo."));


            // 2. Validar quantidade em estoque
            if (produtoEmEstoque.getQtdEstoque() < itemDesejado.getQuantidade()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Estoque insuficiente para o produto '" + produtoEmEstoque.getNome() +
                                "'. Solicitado: " + itemDesejado.getQuantidade() +
                                ", Disponível: " + produtoEmEstoque.getQtdEstoque());
            }
        }
        // Se o loop completar sem exceções, todos os itens são válidos.
    }

    /**
     * Valida o estoque e o status para um único item.
     * @param idProduto ID do produto.
     * @param quantidadeDesejada Quantidade desejada.
     */
    public void validarEstoqueEStatusParaItem(String idProduto, int quantidadeDesejada) {
        if (quantidadeDesejada <= 0) {
            // Dependendo da regra de negócio, uma quantidade 0 ou negativa pode ser um erro
            // ou simplesmente significar que não há nada a validar.
            // Ex: throw new IllegalArgumentException("Quantidade desejada deve ser maior que zero.");
            return;
        }

        Produto produtoEmEstoque = productRepository.findById(idProduto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Produto com ID '" + idProduto + "' não encontrado no catálogo."));

        if (!Boolean.TRUE.equals(produtoEmEstoque.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "O produto '" + produtoEmEstoque.getNome() + "' (ID: " + produtoEmEstoque.getId() + ") está inativo.");
        }

        if (produtoEmEstoque.getQtdEstoque() < quantidadeDesejada) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Estoque insuficiente para o produto '" + produtoEmEstoque.getNome() +
                            "'. Solicitado: " + quantidadeDesejada +
                            ", Disponível: " + produtoEmEstoque.getQtdEstoque());
        }
    }
}