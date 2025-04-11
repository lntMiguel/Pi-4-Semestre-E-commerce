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

    @Field("Logadouro")
    private String logadouro;

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
    private long cep;

    @Field("TG_Padrao")
    private boolean padrao;

    public void setPadrao(boolean padrao) {
        this.padrao = padrao;
    }

    public boolean isPadrao() {
        return padrao;
    }

    public String getIdCliente() {
        return idCliente;
    }
}
