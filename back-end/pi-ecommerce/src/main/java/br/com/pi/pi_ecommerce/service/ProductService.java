package br.com.pi.pi_ecommerce.service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public Produto atualizaProduto(String productID, String NrCodigo,String nome, BigDecimal NrPreco, int NrQuantidade, String DsDescricao,Double Avaliacao){
        Optional<Produto> productOptional = productRepository.findByid(productID);

        if(productOptional.isPresent()){
            Produto produto = productOptional.get();

            produto.setAvaliacao(Avaliacao);
            produto.setCodigo(NrCodigo);
            produto.setDescDetalhada(DsDescricao);
            produto.setNome(nome);
            produto.setPreco(NrPreco);
            produto.setQtdEstoque(NrQuantidade);
            
            return productRepository.save(produto); 
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
    }

    public boolean retornaStatusProduct(String productId){
        Optional<Produto> ProdutoOptional = productRepository.findById(productId);

        if(ProdutoOptional.isPresent()){
            Produto produto = ProdutoOptional.get();
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

}
 