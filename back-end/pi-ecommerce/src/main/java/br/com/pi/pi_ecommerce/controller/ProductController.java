package br.com.pi.pi_ecommerce.controller;
//package main.java.br.com.pi.pi_ecommerce.controller;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pi.pi_ecommerce.models.Produto;
import br.com.pi.pi_ecommerce.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")  // Permite CORS apenas para essa origem
@RestController
@RequestMapping("/produto")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Produto> listarTodos(@RequestParam(required = false) String nome) {
        return productService.listarTodos(nome);
    }
    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Produto prod) {
        try {
            Produto novoProd = productService.salvar(prod);
            return ResponseEntity.ok(novoProd);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
        
    @PutMapping("/{id}/status")
    public ResponseEntity<Produto> alterarStatus(@PathVariable String id) {
        Produto produtoComNovoStatus = productService.alterarStatusProduct(id);
        return ResponseEntity.ok(produtoComNovoStatus);
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, Boolean>> retornaStatusProduct(@PathVariable String id){
        boolean status = productService.retornaStatusProduct(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("status", status);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/dados")
    public ResponseEntity<Produto> atualizaProduto(@PathVariable String id,
                                                   @RequestParam String codigo,
                                                   @RequestParam String nome,
                                                   @RequestParam BigDecimal preco,
                                                   @RequestParam int qtdEstoque,
                                                   @RequestParam String descDetalhada,
                                                   @RequestParam Double avaliacao){
        Produto produtoAtualizado = productService.atualizaProduto(id, codigo, nome, preco, qtdEstoque, descDetalhada, avaliacao);
        return ResponseEntity.ok(produtoAtualizado);
    }

    @PutMapping("/{id}/quantidade")
    public ResponseEntity<Produto> alteraQuantidade(@PathVariable String id, @RequestParam int qtdEstoque){

        Produto produtoAtualizado = productService.alteraQuantidade(id, qtdEstoque);
        return ResponseEntity.ok(produtoAtualizado);


    }

    @PutMapping("/{id}/descontar")
    public ResponseEntity<Produto> diminuiQuantidade(@PathVariable String id, @RequestParam int qtdDescontada){

        Produto produtoAtualizado = productService.diminuiQuantidade(id, qtdDescontada);
        return ResponseEntity.ok(produtoAtualizado);


    }



}
