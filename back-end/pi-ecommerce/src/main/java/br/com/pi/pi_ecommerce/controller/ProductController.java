package br.com.pi.pi_ecommerce.controller;
import java.util.HashMap;
import java.util.Map;

import br.com.pi.pi_ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.pi.pi_ecommerce.models.Produto;

@CrossOrigin(origins = "http://localhost:3000")  // Permite CORS apenas para essa origem
@RestController
@RequestMapping("/produto")
public class ProductController {
    @Autowired
    private ProductService productService;

        
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
}
