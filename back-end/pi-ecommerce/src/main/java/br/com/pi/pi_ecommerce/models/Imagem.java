package br.com.pi.pi_ecommerce.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
 
@Data
@Document(collection = "imagem")
public class Imagem {

    @Id
    private String id;

    @Field("ID_PRODUTO")
    private String idProduto;

    @Field("DS_CAMINHO")
    private String caminhoArquivo;

    @Field("TG_PRINCIPAL")
    private boolean principal;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(String idProduto) {
        this.idProduto = idProduto;
    }

    public String getCaminhoArquivo() {
        return caminhoArquivo;
    }

    public void setCaminhoArquivo(String caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
    }

    public boolean isPrincipal() {
        return principal;
    }

    public void setPrincipal(boolean principal) {
        this.principal = principal;
    }

    public Imagem(String idProduto, String caminhoArquivo, boolean principal) {
        this.idProduto = idProduto;
        this.caminhoArquivo = caminhoArquivo;
        this.principal = principal;
    }
}
