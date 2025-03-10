package br.com.pi.pi_ecommerce.controller;
//package main.java.br.com.pi.pi_ecommerce.controller;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import br.com.pi.pi_ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.pi.pi_ecommerce.models.Produto;

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
                                                   @RequestParam int quantidade,
                                                   @RequestParam String descricao,
                                                   @RequestParam Double avaliacao){
        Produto produtoAtualizado = productService.atualizaProduto(id, codigo, nome, preco, quantidade, descricao, avaliacao);
        return ResponseEntity.ok(produtoAtualizado);
    }

    @PutMapping("/{id}/quantidade")
    public ResponseEntity<Produto> alteraQuantidade(@PathVariable String id, @RequestParam int quantidade){

        Produto produtoAtualizado = productService.alteraQuantidade(id, quantidade);
        return ResponseEntity.ok(produtoAtualizado);


    }

}
