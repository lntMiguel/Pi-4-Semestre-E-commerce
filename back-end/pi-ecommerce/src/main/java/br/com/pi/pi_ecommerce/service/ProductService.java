package br.com.pi.pi_ecommerce.service;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.repository.ProductRepository;
import br.com.pi.pi_ecommerce.utils.Validator;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private Validator validator;

    public Produto alterarStatusProduct(String productID){
       Optional<Produto> productOptional = productRepository.findById(productID);
       
       if(productOptional.isPresent()){
            Produto produto = productOptional.get();

            produto.setStatus(!Boolean.TRUE.equals(produto.getStatus()));

            return productRepository.save(produto);
       }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
       }
    }

    public Produto atualizaProduto(String id, String codigo,String nome, BigDecimal preco, int quantidade, String descricao,Double avaliacao){
        Optional<Produto> productOptional = productRepository.findByid(id);
        

        if(productOptional.isPresent()){
            Produto produto = productOptional.get();

            produto.setAvaliacao(avaliacao);
            produto.setCodigo(codigo);
            produto.setDescDetalhada(descricao);
            produto.setNome(nome);
            produto.setPreco(preco);
            produto.setQtdEstoque(quantidade);
            
            return productRepository.save(produto); 
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
    }

    public boolean retornaStatusProduct(String productId){
        Optional<Produto> produtoOptional = productRepository.findById(productId);

        if(produtoOptional.isPresent()){
            Produto produto = produtoOptional.get();
            return produto.getStatus();
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
    }

    public List<Produto> listarTodos(String nome) {
        List<Produto> produtos;

        if (nome == null || nome.isEmpty()) {
            produtos = productRepository.findAll();
        } else {
            produtos = productRepository.findAll().stream()
                    .filter(produto -> produto.getNome().toLowerCase().contains(nome.toLowerCase()))
                    .collect(Collectors.toList());
        }

        return produtos;
    }

    public Produto salvar(Produto prod) {
        return productRepository.save(prod);
    }

    public Produto alteraQuantidade(String id, int quantidade ){
        Optional<Produto> produtoOptional = productRepository.findById(id);

        if(produtoOptional.isPresent()){
            Produto produto = produtoOptional.get();

            produto.setQtdEstoque(quantidade);
            return productRepository.save(produto);
        }

        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
    }
}
 