package br.com.pi.pi_ecommerce.models.dto;

public class UserDTO {

    private String nome;
    private String email;
    private String status;
    private String grupo;

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }

    public String getGrupo() {
        return grupo;
    }

    public UserDTO(String nome, String email, String status, String grupo) {
        this.nome = nome;
        this.email = email;
        this.status = status;
        this.grupo = grupo;
    }
}
