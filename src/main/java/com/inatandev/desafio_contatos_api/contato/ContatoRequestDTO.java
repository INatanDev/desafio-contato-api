package com.inatandev.desafio_contatos_api.contato;

import java.util.Date;

public record ContatoRequestDTO(Long contato_id, String contato_nome, String contato_email, String contato_celular, String contato_telefone, char contato_sn_favorito, char contato_sn_ativo) {
}
