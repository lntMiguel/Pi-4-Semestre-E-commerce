package br.com.pi.pi_ecommerce.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document("EnderecoCliente")
public class EnderecoCliente {

    @Id
    private String id;

    @Field("IdCliente")
    private String idCliente;

    @Field("logradouro")
    private String logradouro;

    @Field("Numero")
    private int numero;

    @Field("Complemento")
    private String complemento;

    @Field("Bairro")
    private String bairro;

    @Field("Cidade")
    private String cidade;

    @Field("Uf")
    private String uf;

    @Field("CEP")
    private String cep;

    @Field("TG_Padrao")
    private boolean padrao;

    @Field("TG_Faturamento")
    private boolean faturamento;

    public void setPadrao(boolean padrao) {
        this.padrao = padrao;
    }

    public boolean isPadrao() {
        return padrao;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public boolean isFaturamento() {
        return faturamento;
    }

    public void setFaturamento(boolean faturamento) {
        this.faturamento = faturamento;
    }
}
