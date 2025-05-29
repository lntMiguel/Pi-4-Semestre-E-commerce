package br.com.pi.pi_ecommerce.controller;

import br.com.pi.pi_ecommerce.models.Carrinho;
import br.com.pi.pi_ecommerce.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // Ajuste conforme necessário
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    // DTO para adicionar item
    public static class AddItemRequest {
        private String idProduto;
        private int quantidade;

        // Getters e Setters
        public String getIdProduto() { return idProduto; }
        public void setIdProduto(String idProduto) { this.idProduto = idProduto; }
        public int getQuantidade() { return quantidade; }
        public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    }

    // DTO para atualizar quantidade
    public static class UpdateQuantidadeRequest {
        private int quantidade;

        public int getQuantidade() { return quantidade; }
        public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    }


    @GetMapping("/{idCliente}")
    public ResponseEntity<Carrinho> visualizarCarrinho(@PathVariable String idCliente) {
        Carrinho carrinho = carrinhoService.visualizarCarrinho(idCliente);
        return ResponseEntity.ok(carrinho);
    }

    @PostMapping("/{idCliente}/itens")
    public ResponseEntity<Carrinho> adicionarItem(
            @PathVariable String idCliente,
            @RequestBody AddItemRequest request) {
        Carrinho carrinhoAtualizado = carrinhoService.adicionarItemAoCarrinho(
                idCliente, request.getIdProduto(), request.getQuantidade());
        return ResponseEntity.ok(carrinhoAtualizado);
    }

    @PutMapping("/{idCliente}/itens/{idProduto}")
    public ResponseEntity<Carrinho> atualizarQuantidadeItem(
            @PathVariable String idCliente,
            @PathVariable String idProduto,
            @RequestBody UpdateQuantidadeRequest request) {
        Carrinho carrinhoAtualizado = carrinhoService.atualizarQuantidadeItem(
                idCliente, idProduto, request.getQuantidade());
        return ResponseEntity.ok(carrinhoAtualizado);
    }

    @DeleteMapping("/{idCliente}/itens/{idProduto}")
    public ResponseEntity<Carrinho> removerItem(
            @PathVariable String idCliente,
            @PathVariable String idProduto) {
        Carrinho carrinhoAtualizado = carrinhoService.removerItemDoCarrinho(idCliente, idProduto);
        return ResponseEntity.ok(carrinhoAtualizado);
    }

    @DeleteMapping("/{idCliente}")
    public ResponseEntity<Carrinho> limparCarrinho(@PathVariable String idCliente) {
        Carrinho carrinhoLimpo = carrinhoService.limparCarrinho(idCliente);
        return ResponseEntity.ok(carrinhoLimpo);
    }
}
