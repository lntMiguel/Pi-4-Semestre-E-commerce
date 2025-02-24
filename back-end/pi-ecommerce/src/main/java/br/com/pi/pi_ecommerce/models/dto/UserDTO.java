package br.com.pi.pi_ecommerce.models.dto;

public class UserDTO {

    private String id;
    private String nome;
    private String email;
    private Boolean status;
    private String grupo;

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getStatus() {
        return status;
    }

    public String getGrupo() {
        return grupo;
    }

    public String getId() {
        return id;
    }

    public UserDTO(String nome, String email, Boolean status, String grupo, String id) {
        this.nome = nome;
        this.email = email;
        this.status = status;
        this.grupo = grupo;
        this.id = id;
    }

    public UserDTO(String nome, String email, Boolean status, String grupo) {
        this.nome = nome;
        this.email = email;
        this.status = status;
        this.grupo = grupo;
    }
}
