package br.com.pi.pi_ecommerce.models;

import br.com.pi.pi_ecommerce.models.statusPedido.StatusPedido;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Document(collection = "pedido")
public class Pedido {

    @Id
    private String id;
    private String numero;
    private String idCliente;
    private Date dataPedido;
    private BigDecimal valor;
    private StatusPedido status;
    private List<ProdutoPedido> produtos;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public Date getDataPedido() {
        return dataPedido;
    }

    public void setDataPedido(Date dataPedido) {
        this.dataPedido = dataPedido;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public StatusPedido getStatus() {
        return status;
    }

    public void setStatus(StatusPedido status) {
        this.status = status;
    }

    public List<ProdutoPedido> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ProdutoPedido> produtos) {
        this.produtos = produtos;
    }
}
