package br.com.pi.pi_ecommerce.service;

import br.com.pi.pi_ecommerce.models.Carrinho;
import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.repository.CarrinhoRepository;
import br.com.pi.pi_ecommerce.repository.ClienteRepository; // Para verificar se o cliente existe
import br.com.pi.pi_ecommerce.utils.ConsultaEstoque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
public class CarrinhoService {
    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ProductService productService; // Para buscar detalhes do produto

    @Autowired
    private ClienteRepository clienteRepository; // Para validar cliente

    @Autowired
    private ConsultaEstoque consultaEstoque;

    // Obtém o carrinho do cliente ou cria um novo se não existir
    private Carrinho getCarrinhoPorClienteOuCriar(String idCliente) {
        // Valida se o cliente existe
        clienteRepository.findById(idCliente)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado: " + idCliente));

        return carrinhoRepository.findByIdCliente(idCliente)
                .orElseGet(() -> {
                    Carrinho novoCarrinho = new Carrinho(idCliente);
                    return carrinhoRepository.save(novoCarrinho);
                });
    }

    public Carrinho adicionarItemAoCarrinho(String idCliente, String idProduto, int quantidade) {
        consultaEstoque.validarEstoqueEStatusParaItem(idProduto, quantidade);

        Produto produto = productService.buscarPorId(idProduto); // Lança exceção se não achar

        if (!produto.getStatus()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto " + produto.getNome() + " está inativo e não pode ser adicionado ao carrinho.");
        }
        if (produto.getQtdEstoque() < quantidade) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estoque insuficiente para o produto: " + produto.getNome() + ". Disponível: " + produto.getQtdEstoque());
        }

        Carrinho carrinho = getCarrinhoPorClienteOuCriar(idCliente);
        carrinho.adicionarOuAtualizarItem(produto, quantidade);
        carrinho.setDataAtualizacao(new Date());
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho removerItemDoCarrinho(String idCliente, String idProduto) {
        Carrinho carrinho = getCarrinhoPorClienteOuCriar(idCliente); // Garante que o carrinho exista
        // Verifica se o produto a ser removido realmente existe no carrinho para evitar operações desnecessárias
        boolean itemExisteNoCarrinho = carrinho.getItens().stream().anyMatch(item -> item.getIdProduto().equals(idProduto));
        if (!itemExisteNoCarrinho) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto com ID " + idProduto + " não encontrado no carrinho do cliente " + idCliente);
        }
        carrinho.removerItem(idProduto);
        carrinho.setDataAtualizacao(new Date());
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho atualizarQuantidadeItem(String idCliente, String idProduto, int novaQuantidade) {

        Carrinho carrinho = getCarrinhoPorClienteOuCriar(idCliente);
        Produto produto = productService.buscarPorId(idProduto); // Para verificar estoque

        consultaEstoque.validarEstoqueEStatusParaItem(idProduto, novaQuantidade);

        if (novaQuantidade > 0 && produto.getQtdEstoque() < novaQuantidade) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estoque insuficiente para o produto: " + produto.getNome() + ". Disponível: " + produto.getQtdEstoque());
        }

        // Verifica se o item existe antes de tentar atualizar para dar um erro mais específico
        carrinho.getItens().stream()
                .filter(item -> item.getIdProduto().equals(idProduto))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto com ID " + idProduto + " não encontrado no carrinho para atualização."));

        carrinho.atualizarQuantidadeItem(idProduto, novaQuantidade); // Se novaQuantidade for 0, o item é removido.
        carrinho.setDataAtualizacao(new Date());
        return carrinhoRepository.save(carrinho);
    }

    public Carrinho visualizarCarrinho(String idCliente) {
        return getCarrinhoPorClienteOuCriar(idCliente);
    }

    public Carrinho limparCarrinho(String idCliente) {
        Carrinho carrinho = getCarrinhoPorClienteOuCriar(idCliente);
        carrinho.limparItens();
        carrinho.setDataAtualizacao(new Date());
        return carrinhoRepository.save(carrinho);
    }
}
