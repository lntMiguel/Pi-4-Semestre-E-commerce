package br.com.pi.pi_ecommerce.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

 
@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;  // O MongoDB usa ObjectId como padrão, então o tipo é String.

    @Field("NR_CPF")
    private Long cpf;

    @Field("DS_EMAIL")
    private String email;

    @Field("DS_NOME")
    private String nome;

    @Field("DS_SENHA")
    private String senha;

    @Field("DS_GRUPO")
    private String grupo;

    @Field("TG_ATIVO")
    private Boolean status;

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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    // Construtor com todos os parâmetros
    public User(String nome, Long cpf, String email, String senha, String grupo) {
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.grupo = grupo;
        this.status = true; // Definido como ativo por padrão
    }

    // Construtor padrão
    public User() {
    }
}