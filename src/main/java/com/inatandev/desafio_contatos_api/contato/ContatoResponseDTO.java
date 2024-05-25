package com.inatandev.desafio_contatos_api.contato;

import java.util.Date;

public record ContatoResponseDTO(Long contato_id,String contato_nome, String contato_email, String contato_celular, String contato_telefone, char contato_sn_favorito, char contato_sn_ativo,
                                 Date contato_dh_cad) {

    public ContatoResponseDTO(Contato contato){
        this(contato.getContato_id(),
                contato.getContato_nome(),
                contato.getContato_email(),
                contato.getContato_celular(),
                contato.getContato_telefone(),
                contato.getContato_sn_favorito(),
                contato.getContato_sn_ativo(),
                contato.getContato_dh_cad());
    }
}
