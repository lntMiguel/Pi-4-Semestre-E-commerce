package br.com.pi.pi_ecommerce.models;

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


}
