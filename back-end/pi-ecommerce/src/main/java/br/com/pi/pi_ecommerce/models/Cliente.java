package br.com.pi.pi_ecommerce.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document(collection = "cliente")
public class Cliente {

    @Id
    private String id;

    @Field("DS_NOME")
    private String nome;

    @Field("DataNasc")
    private Date dataNasc;

    @Field("TG_Genero")
    private String genero;

    @Field("DS_SENHA")
    private String senha;

    @Field("NR_CPF")
    private Long cpf;

    @Field("DS_EMAIL")
    private String email;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCpf() {
        return cpf;
    }

    public void setCpf(Long cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Date getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(Date dataNasc) {
        this.dataNasc = dataNasc;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Cliente(String nome, Date dataNasc, String genero, String senha,
                   Long cpf, String email) {
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.genero = genero;
        this.senha = senha;
        this.cpf = cpf;
        this.email = email;
    }

    public Cliente() {
    }
}
