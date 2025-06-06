package br.com.pi.pi_ecommerce.models;

import java.math.BigDecimal;


public class ProdutoPedido {

    private String idProduto;        // ID do produto comprado
    private String nomeProduto;      // Nome do produto (snapshotted)
    private int quantidade;          // Quantidade comprada
    private BigDecimal precoUnitario; // Preço na hora da compra

    public ProdutoPedido(String idProduto, String nomeProduto, int quantidade, BigDecimal precoUnitario) {
        this.idProduto = idProduto;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    public ProdutoPedido() {
    }

    public String getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(String idProduto) {
        this.idProduto = idProduto;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
}
