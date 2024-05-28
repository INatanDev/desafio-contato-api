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
@EqualsAndHashCode(of = "id")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contato_id")
    private Long id;

    @Column(name = "contato_nome")
    private String nome;

    @Column(name = "contato_email")
    private String email;

    @Column(name = "contato_celular")
    private String celular;

    @Column(name = "contato_telefone")
    private String telefone;

    @Column(name = "contato_sn_favorito")
    private char favorito;

    @Column(name = "contato_sn_ativo")
    private char ativo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "contato_dh_cad")
    private Date cadastro;

    public Contato(ContatoRequestDTO data) {
        this.nome = data.nome();
        this.email = data.email();
        this.celular = data.celular();
        this.telefone = data.telefone();
        this.favorito = data.favorito();
        this.ativo = data.ativo();
    }
}
