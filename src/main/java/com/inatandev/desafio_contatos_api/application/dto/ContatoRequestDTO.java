package com.inatandev.desafio_contatos_api.application.dto;

public record ContatoRequestDTO(Long id, String nome, String email, String celular, String telefone, char favorito, char ativo) {
}
