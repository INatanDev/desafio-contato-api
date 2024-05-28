package com.inatandev.desafio_contatos_api.application.services;

import com.inatandev.desafio_contatos_api.domain.model.Contato;
import com.inatandev.desafio_contatos_api.domain.repositors.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository repository;

    public Optional<Contato> findbyContatoCelular(String celular) {
        return repository.findByCelular(celular);
    }
}
