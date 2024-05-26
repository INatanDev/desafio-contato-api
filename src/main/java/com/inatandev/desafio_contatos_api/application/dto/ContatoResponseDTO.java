package com.inatandev.desafio_contatos_api.application.dto;

import com.inatandev.desafio_contatos_api.domain.model.Contato;

import java.util.Date;

public record ContatoResponseDTO(Long id,String nome, String email, String celular, String telefone, char favorito, char ativo,
                                 Date cadastro) {

    public ContatoResponseDTO(Contato contato){
        this(contato.getId(),
                contato.getNome(),
                contato.getEmail(),
                contato.getCelular(),
                contato.getTelefone(),
                contato.getFavorito(),
                contato.getAtivo(),
                contato.getCadastro());
    }
}
