package com.inatandev.desafio_contatos_api.domain.model;

import com.inatandev.desafio_contatos_api.application.dto.ContatoRequestDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "contatos")
@Table(name = "contato", schema = "desafio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "contato_id")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contato_id;

    private String contato_nome;
    private String contato_email;
    private String contato_celular;
    private String contato_telefone;
    private char contato_sn_favorito;
    private char contato_sn_ativo;
    @Temporal(TemporalType.TIMESTAMP)
    private Date contato_dh_cad;


    public Contato(ContatoRequestDTO data) {
        this.contato_nome = data.contato_nome();
        this.contato_email = data.contato_email();
        this.contato_celular = data.contato_celular();
        this.contato_telefone = data.contato_telefone();
        this.contato_sn_favorito = data.contato_sn_favorito();
        this.contato_sn_ativo = data.contato_sn_ativo();
    }

}
