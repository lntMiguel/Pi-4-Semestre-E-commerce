package br.com.pi.pi_ecommerce.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Data
@Document(collection = "carrinho")
public class Carrinho {
    @Id
    private String id;

    @Field("ID_CLIENTE")
    private String idCliente; // ID do cliente associado

    @Field("ITENS")
    private List<ProdutoPedido> itens;

    @Field("VL_TOTAL")
    private BigDecimal valorTotal;

    @Field("DT_CRIACAO")
    private Date dataCriacao;

    @Field("DT_ATUALIZACAO")
    private Date dataAtualizacao;

    public Carrinho() {
        this.itens = new ArrayList<>();
        this.valorTotal = BigDecimal.ZERO;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    public Carrinho(String idCliente) {
        this(); // Chama o construtor padrão
        this.idCliente = idCliente;
    }

    // Método para calcular o valor total
    public void calcularValorTotal() {
        this.valorTotal = BigDecimal.ZERO;
        for (ProdutoPedido item : this.itens) {
            if (item.getPrecoUnitario() != null && item.getQuantidade() > 0) {
                this.valorTotal = this.valorTotal.add(
                        item.getPrecoUnitario().multiply(new BigDecimal(item.getQuantidade()))
                );
            }
        }
        this.dataAtualizacao = new Date();
    }

    // Método para adicionar ou atualizar item
    public void adicionarOuAtualizarItem(Produto produto, int quantidade) {
        if (produto == null || quantidade <= 0) {
            return; // Ou lançar exceção
        }

        Optional<ProdutoPedido> itemExistente = this.itens.stream()
                .filter(item -> item.getIdProduto().equals(produto.getId()))
                .findFirst();

        if (itemExistente.isPresent()) {
            ProdutoPedido pp = itemExistente.get();
            pp.setQuantidade(pp.getQuantidade() + quantidade); // Incrementa a quantidade
            // O preço unitário pode ter mudado, então atualizamos se necessário,
            // mas para um carrinho, geralmente se mantém o preço do momento da adição.
            // Se quiser sempre o preço mais atual: pp.setPrecoUnitario(produto.getPreco());
        } else {
            ProdutoPedido novoItem = new ProdutoPedido();
            novoItem.setIdProduto(produto.getId());
            novoItem.setNomeProduto(produto.getNome()); // Snapshot do nome
            novoItem.setPrecoUnitario(produto.getPreco()); // Snapshot do preço
            novoItem.setQuantidade(quantidade);
            this.itens.add(novoItem);
        }
        calcularValorTotal();
    }

    // Método para atualizar a quantidade de um item específico
    public void atualizarQuantidadeItem(String idProduto, int novaQuantidade) {
        Optional<ProdutoPedido> itemParaAtualizar = this.itens.stream()
                .filter(item -> item.getIdProduto().equals(idProduto))
                .findFirst();

        if (itemParaAtualizar.isPresent()) {
            ProdutoPedido pp = itemParaAtualizar.get();
            if (novaQuantidade <= 0) {
                this.itens.remove(pp); // Remove se a quantidade for zero ou negativa
            } else {
                pp.setQuantidade(novaQuantidade);
            }
        } else {
            // Poderia lançar uma exceção: Item não encontrado no carrinho
            System.err.println("WARN: Tentativa de atualizar quantidade de produto não existente no carrinho: " + idProduto);
            return;
        }
        calcularValorTotal();
    }


    // Método para remover item
    public void removerItem(String idProduto) {
        this.itens.removeIf(item -> item.getIdProduto().equals(idProduto));
        calcularValorTotal();
    }

    // Método para limpar o carrinho
    public void limparItens() {
        this.itens.clear();
        calcularValorTotal(); // valorTotal será ZERO
        this.dataAtualizacao = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public List<ProdutoPedido> getItens() {
        return itens;
    }

    public void setItens(List<ProdutoPedido> itens) {
        this.itens = itens;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Date getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(Date dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
}
