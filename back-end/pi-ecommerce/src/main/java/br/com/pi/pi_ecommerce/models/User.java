package br.com.pi.pi_ecommerce.models;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.TinyIntJdbcType;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NR_CPF", unique = true, nullable = false)
    private Long cpf;

    @Column(name = "DS_EMAIL", unique = true, nullable = false)
    private String email;

    @Column(name = "DS_NOME", nullable = false)
    private String nome;

    @Column(name = "DS_SENHA", nullable = false)
    private String senha;

    @Column(name = "DS_GRUPO", nullable = false)
    private String grupo;

    @Column(name = "TG_INATIVO", nullable = false)
    @JdbcType(TinyIntJdbcType.class)
    private Boolean status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public User(String nome, Long cpf, String email, String senha, String grupo) {
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.grupo = grupo;
        this.status = true;
    }

    public User() {

    }
}
