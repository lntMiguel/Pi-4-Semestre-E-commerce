package br.com.pi.pi_ecommerce.models;

import jakarta.validation.constraints.*;
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
    @Size(max = 200, message = "O nome do produto não pode exceder 200 caracteres.")
    private String nome;

    @Field("NR_PRECO")
    @NotNull(message = "O preço do produto não pode ser nulo.")
    @DecimalMin(value = "0.00", message = "O preço do produto deve ser no mínimo 0.00")
    private BigDecimal preco;
  
    @Field("NR_QUANTIDADE")
    @Min(value = 0, message = "A quantidade em estoque não pode ser negativa.")
    private int qtdEstoque;

    @Field("DS_DESCRICAO")
    @Size(max = 2000, message = "A descrição detalhada não pode exceder 2000 caracteres.")
    private String descDetalhada;

    @Field("NR_AVALIACAO")
    @DecimalMin(value = "1.0", message = "A avaliação deve ser no mínimo 1.0")
    @DecimalMax(value = "5.0", message = "A avaliação deve ser no máximo 5.0")
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

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
