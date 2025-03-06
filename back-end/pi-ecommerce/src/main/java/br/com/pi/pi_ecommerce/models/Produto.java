package br.com.pi.pi_ecommerce.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Data
@Document(collection = "produto")
public class Produto {

    @Id
    private String id;

    @Field("DS_NOME")
    private String nome;

    @Field("NR_PRECO")
    private BigDecimal preco;

    @Field("NR_QUANTIDADE")
    private int qtdEstoque;

    @Field("DS_DESCRICAO")
    private String descDetalhada;

    @Field("NR_AVALIACAO")
    private double avaliacao;

    @Field("TG_ATIVO")
    private boolean status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public int getQtdEstoque() {
        return qtdEstoque;
    }

    public void setQtdEstoque(int qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    public String getDescDetalhada() {
        return descDetalhada;
    }

    public void setDescDetalhada(String descDetalhada) {
        this.descDetalhada = descDetalhada;
    }

    public double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
